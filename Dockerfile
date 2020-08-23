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
# TODO remove all of these in favor of GH releases
# CUDD
RUN git clone https://github.com/KavrakiLab/cudd &&\
    cd cudd &&\
    autoreconf -i &&\
    ./configure --enable-silent-rules --enable-obj --enable-dddmp &&\
    make &&\
    make install


# Flex & Bison & Graphviz
RUN apt-get install -y flex && \
    apt-get install -y bison && \
    apt-get install -y libgraphviz-dev


# MONA
RUN wget https://github.com/cs-au-dk/MONA/archive/1.4-18.tar.gz &&\
    tar -xf 1.4-18.tar.gz &&\
    cd MONA-1.4-18 &&\
    ./configure &&\
    make &&\
    make install


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
RUN cp /server/lydia-bin /usr/local/bin/lydia

WORKDIR /server

# TODO it takes too much time
# RUN cd lydia && rm -rf build && mkdir build && cd build &&\
#     cmake -DCMAKE_BUILD_TYPE=Release .. &&\
#     make lydia-bin &&\
#     make install

RUN pip3 install .
CMD FLASK_STATIC_FOLDER=/client/build gunicorn --bind 0.0.0.0:$PORT wsgi
