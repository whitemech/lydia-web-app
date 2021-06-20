FROM ubuntu:20.04

USER root

ENV DEBIAN_FRONTEND=noninteractive 
ENV LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH

RUN apt-get update && \
    apt-get install -y dialog && \
    apt-get install -y apt-utils && \
    apt-get upgrade -y && \
    apt-get install -y sudo

# other dependencies
RUN apt-get install -y build-essential && \
    apt-get install -y python3 && \
    apt-get install -y python3-pip && \
    apt-get install -y wget && \
    apt-get install -y git && \
    apt-get install -y cmake && \
    apt-get install -y automake && \
    apt-get install -y libtool && \
    apt-get install -y graphviz

# Lydia build dependencies 

# CUDD
RUN wget https://github.com/whitemech/cudd/releases/download/v3.0.0/cudd_3.0.0_linux-amd64.tar.gz &&\
    tar -xf cudd_3.0.0_linux-amd64.tar.gz &&\
    cd cudd_3.0.0_linux-amd64 &&\
    sudo cp -P lib/* /usr/local/lib/ &&\
    sudo cp -Pr include/* /usr/local/include

# Flex & Bison & Graphviz
RUN apt-get install -y flex && \
    apt-get install -y bison && \
    apt-get install -y libgraphviz-dev

# MONA
RUN wget https://github.com/whitemech/MONA/releases/download/v1.4-19.dev0/mona_1.4-19.dev0_linux-amd64.tar.gz && \
    tar -xf mona_1.4-19.dev0_linux-amd64.tar.gz && \
    cd mona_1.4-19.dev0_linux-amd64 && \
    sudo cp -P lib/* /usr/local/lib/ && \
    sudo cp -Pr include/* /usr/local/include

# Syft
RUN wget https://github.com/whitemech/Syft/releases/download/v0.1.0/syft-3.0.0_ubuntu-20.04.tar.gz && \
    tar -xf syft-3.0.0_ubuntu-20.04.tar.gz && \
    cd syft-3.0.0_ubuntu-20.04 && \
    sudo cp -P lib/* /usr/local/lib/

# Install Lydia binary
RUN wget https://github.com/whitemech/lydia/releases/download/v0.1.2/lydia &&\
    sudo chmod u+x lydia &&\
    cp lydia /usr/local/bin/lydia


# helper tools
RUN apt-get install -y curl && \
    apt-get install -y gnupg

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install -y yarn

RUN pip3 install gunicorn

RUN mkdir /server
RUN mkdir /client
COPY ./server /server
COPY ./client /client

ARG REACT_APP_API_ENDPOINT=/api/
ARG REACT_APP_API_HOSTNAME=localhost

RUN cd /client && yarn install
RUN cd /client && yarn build

WORKDIR /server

# TODO it takes too much time
# RUN cd lydia && rm -rf build && mkdir build && cd build &&\
#     cmake -DCMAKE_BUILD_TYPE=Release .. &&\
#     make lydia-bin &&\
#     make install

RUN pip3 install .
CMD FLASK_STATIC_FOLDER=/client/build gunicorn --bind 0.0.0.0:$PORT wsgi
