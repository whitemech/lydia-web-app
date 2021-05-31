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

"""Return the version of the tech stack."""


# Return a Json list of triplets [[tool,version,url],...].
import logging
from platform import python_version

from flask import __version__ as flask_version
from flask import jsonify

from lydia_web_api._global import app, configuration
from lydia_web_api.decorators import cachecontrol, request_handler
from lydia_web_api.helpers import assert_, run_cli

logger = logging.getLogger(__name__)


@app.route("/versions")
@cachecontrol()
@request_handler
def version():
    """Return the version of the dependencies."""
    logger.info("Request /api/versions")
    try:
        dot = run_cli([configuration.DOT_BIN_PATH, "-V"])
        (out, err) = dot.communicate(timeout=0.5)
        assert_(dot.returncode == 0)
        dot_version = err.split(b"\n")[0].split(b"version ")[1].decode("utf-8")
    except Exception as e:
        logger.error(f"Dot version failed: {e}")
        dot_version = "missing"

    try:
        lydia = run_cli([configuration.LYDIA_BIN_PATH, "--version"])
        (out, err) = lydia.communicate(timeout=0.5)
        assert_(lydia.returncode == 0)
        lydia_version = out.decode("utf-8").strip()
    except Exception as e:
        logger.error(f"Lydia version failed: {e}")
        lydia_version = "missing"

    return jsonify(
        [
            ("Lydia", lydia_version, "https://github.com/whitemech/lydia.git"),
            ("Python", python_version(), "https://www.python.org/"),
            ("Flask", flask_version, "http://flask.pocoo.org/"),
            ("GraphViz", dot_version, "https://graphviz.gitlab.io/"),
        ]
    )
