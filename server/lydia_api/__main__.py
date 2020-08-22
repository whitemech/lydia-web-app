#!/usr/bin/python3
# -*- coding: utf-8 -*-
# Copyright (C) 2020 WhiteMech
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

import base64
import inspect
import os
import re
import shutil
import subprocess
import tempfile
from functools import wraps
from pathlib import Path
from platform import python_version
from time import time

from flask import Flask
from flask import __version__ as flask_version
from flask import request
from flask.json import jsonify
from flask_cors import CORS

CURRENT_DIRECTORY = os.path.dirname(inspect.getfile(inspect.currentframe()))
ROOT_SERVER_DIRECTORY = str(Path(CURRENT_DIRECTORY).parent)
app = Flask(__name__)
CORS(app)
TIMEOUT = 5

LYDIA_BIN_PATH: str = str(Path(ROOT_SERVER_DIRECTORY, "binaries", "lydia").absolute())
DOT_BIN_PATH: str = str(shutil.which("dot"))


def assert_(condition, message: str = ""):
    """Custom assert function to replace Python's built-in."""
    if not condition:
        raise AssertionError(message)


def run_cli(cmd, *args, **kwargs) -> subprocess.Popen:
    """Run a CLI command."""
    app.logger.info(f"Running command: {cmd}")
    return subprocess.Popen(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, **kwargs
    )


# TODO increase when ready
def cachecontrol(max_age=1):
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


def warn(res, msg):
    if "note" in res:
        res["note"].append(msg)
    else:
        res["note"] = [msg]


# Return a Json list of triplets [[tool,version,url],...].
@app.route("/api/versions")
@cachecontrol()
def versions():
    app.logger.info("Request /api/versions")
    try:
        dot = run_cli([DOT_BIN_PATH, "-V"])
        (out, err) = dot.communicate(timeout=0.5)
        assert_(dot.returncode == 0)
        dot_version = err.split(b"\n")[0].split(b"version ")[1].decode("utf-8")
    except Exception as e:
        app.logger.logger(f"Dot version failed: {e}")
        dot_version = "missing"

    try:
        lydia = run_cli([LYDIA_BIN_PATH, "--version"])
        (out, err) = lydia.communicate(timeout=0.5)
        assert_(lydia.returncode == 0)
        lydia_version = out.decode("utf-8").strip()
    except Exception as e:
        app.logger.error(f"Lydia version failed: {e}")
        lydia_version = "missing"

    return jsonify(
        [
            ("Lydia", lydia_version, "https://github.com/whitemech/lydia.git"),
            ("Python", python_version(), "https://www.python.org/"),
            ("Flask", flask_version, "http://flask.pocoo.org/"),
            ("GraphViz", dot_version, "https://graphviz.gitlab.io/"),
        ]
    )


# Input parameters
#
# the LDLf formula
#
# Output
#
# on error: { "error": "text" }
# on success:
# { "automaton_svg": '<svg...'
#   "note": ['text1','text2',...]             (optional)
# }
@app.route("/api/translate/<path:ldlf_formula>")
@cachecontrol()
def translate(ldlf_formula, method="GET"):
    app.logger.info(f"Request /api/translate with formula {ldlf_formula}")
    res = {}
    with tempfile.TemporaryDirectory() as tmp:

        path_to_formula = os.path.join(tmp, "formula.ldlf")
        path_to_svg = os.path.join(tmp, "output")
        app.logger.info(f"Writing formula to path {path_to_formula}")
        with open(path_to_formula, "w") as fp:
            fp.write(ldlf_formula)

        try:
            app.logger.info(f"Writing formula to path {path_to_formula}")
            cmd = [LYDIA_BIN_PATH, "-f", path_to_formula, "-g", path_to_svg]
            process = run_cli(cmd)
            (out, err) = process.communicate(timeout=5)
            assert_(
                process.returncode == 0,
                f"Lydia exited with error code {process.returncode}.",
            )
        except subprocess.TimeoutExpired:
            return jsonify({"error": f"The program didn't finish in {TIMEOUT}."}), 400
        except AssertionError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            return jsonify({"error": f"Generic error: {e}"}), 400

        with open(path_to_svg + ".svg", "rb") as fp:
            content = fp.read()
            res["automaton_svg"] = content.decode("utf-8")

    return jsonify(res)


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True, use_debugger=False)
