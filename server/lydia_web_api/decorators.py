# -*- coding: utf-8 -*-
# Copyright (C) 2021 WhiteMech
#
# This application is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 3 of the
# License, or (at your option) any later version.
#
# This application is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

"""Decorators."""
import logging
import pprint
from functools import wraps

import flask
import werkzeug.exceptions
from flask import Flask, Response, abort, request
from flask_cors import cross_origin

from lydia_web_api.base import Problem
from lydia_web_api.exceptions import LydiaApiException
from lydia_web_api.helpers import composed

logger = logging.getLogger(__name__)


# TODO increase default age when ready
def cachecontrol(max_age=1):
    """
    Decorate Flask handlers for cache control.

    :param max_age: the number of ages (see Flask docs)
    :return: the wrapper
    """

    def decorate_f(f):
        @wraps(f)
        def wrapped_f(*args, **kwargs):
            response = f(*args, **kwargs)
            if (type(response) is Flask.response_class) and (
                response.status_code == 200
            ):
                response.cache_control.max_age = max_age
            return response

        return wrapped_f

    return decorate_f


def log(func):
    """Decorate function so to log the inputs and the outputs."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        """Wrap the method function so to log inputs and outputs."""
        try:
            json_body = request.json
        except werkzeug.exceptions.BadRequest:
            json_body = {}
        logger.info(
            f"Method '{func.__module__}.{func.__name__}' called with parameters: "
            f"'{args}' and '{kwargs}', query parameters: '{request.args}',"
            f"body parameters: '{json_body}'"
        )
        response: Response = func(*args, **kwargs)
        logger.info(
            f"Returned response: status code: {response.status_code},"
            f" body: '{pprint.pformat(response.json)}'"
        )
        return response

    return wrapper


def handle_error(func):
    """Handle errors in request processing."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        """Wrap the function."""
        try:
            return func(*args, **kwargs)
        except LydiaApiException as e:
            problem = Problem("API error", 400, f"{str(e)}")
            abort(400, problem.json)
        except Exception as e:
            detail = f"{type(e).__name__}: {str(e)}"
            problem = Problem("generic error", 400, detail)
            abort(400, problem.json)

    return wrapper


request_handler = composed(cross_origin(), log, handle_error)
