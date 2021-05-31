# Lydia API Server

This project consists of a Flask server exposing APIs to
access to the Lydia features via HTTP requests.

## Endpoints

Follows a very short summary of the services exposed:

- `/api/`: healthcheck endpoint.
- `/api/versions`: the list of tool versions of the tech stack
- `/api/translate/{ldlf_formula}`: 
  - *Input:* an LDLf formula following a specific syntax. The standardization
             of such syntax is in the agenda.
  - *Output:*: An SVG file representing the automaton.

## Development 

- Create virtual environment with Pipenv:
```
pipenv shell --python=3.7 && pipenv install --dev
```

- To run tests:
```
tox -e py3.7
```

- To run linters:
```
tox -e bandit
tox -e black-check
tox -e isort-check
tox -e flake8
tox -e mypy
```

## Run

To run the app:
```
python lydia_api/app.py
```

You can change the port and the listening address
in `.env` FLASK_RUN_PORT` and `FLASK_RUN_HOST`.

The app assumes both the Lydia executable 
and the DOT executable are reachable from the 
OS path. You can specify a different 
path by editing the `.env` file and changing
the variables `LYDIA_BIN_PATH` and `DOT_BIN_PATH`, respectively.

## Docker

We also provide a Docker image to run the server:
```
docker build -t lydia-web-app-server .
docker run -p 5000:5000 -it lydia-web-app-server
```

However, we suggest using Docker Compose, introduced in the README 
of the project root. 
