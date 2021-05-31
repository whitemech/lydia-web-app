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

"""Helper module."""
import logging
import subprocess
from typing import Callable

logger = logging.getLogger(__name__)


def assert_(condition, message: str = "") -> None:
    """
    Assert condition, to replace Python's built-in.

    This is needed as built-in 'assert' statements
    are replaced when optimizing the code.
    """
    if not condition:
        raise AssertionError(message)


def run_cli(cmd, *args, **kwargs) -> subprocess.Popen:
    """Run a CLI command."""
    logger.info(f"Running command: {cmd}")
    return subprocess.Popen(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, **kwargs
    )


def composed(*decs: Callable):
    """Compose a list of decoraors."""

    def deco(f):
        for dec in reversed(decs):
            f = dec(f)
        return f

    return deco
