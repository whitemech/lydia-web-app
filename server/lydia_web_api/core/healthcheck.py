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

"""Health-check."""

from flask import jsonify
from flask_cors import cross_origin

from lydia_web_api._global import app
from lydia_web_api.decorators import request_handler


@app.route("/api/")
@request_handler
def check():
    """Return success (health-check)."""
    return jsonify(status=200)
