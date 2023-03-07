#!/usr/bin/python3
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

"""Start the app."""

import logging

from flask_cors import CORS

from lydia_web_api._global import app, configuration

logging.basicConfig(
    level=logging.DEBUG, format="[%(asctime)s][%(name)s][%(levelname)s] %(message)s"
)

app.add_api("apispec.yml")


@app.app.route("/")
def index():
    """Return the index."""
    return app.app.send_static_file("index.html")


if __name__ == "__main__":
    CORS_RESOURCES = {r"/api/*": {"origins": "*"}}
    CORS(app.app, resources=CORS_RESOURCES)
    app.run(
        host=configuration.FLASK_RUN_HOST,
        port=int(configuration.FLASK_RUN_PORT),
        debug=False,
    )
