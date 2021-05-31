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

"""Base module."""
import logging
import os
import shutil
from dataclasses import dataclass

from lydia_web_api.constants import ABOUT_BLANK

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class Configuration:
    """Class to seamlessly read configuration from the code and from OS environment."""

    FLASK_RUN_HOST: str = "0.0.0.0"
    FLASK_RUN_PORT: int = 5000
    LYDIA_BIN_PATH: str = shutil.which("lydia") or "lydia"
    DOT_BIN_PATH: str = shutil.which("dot") or "dot"
    LYDIA_API_CACHE_MAX_AGE: int = 1

    def __getattribute__(self, var_name: str):
        """Get var_name from os.environ, else None."""
        value = os.environ.get(var_name, None)
        try:
            default = super(Configuration, self).__getattribute__(var_name)
        except AttributeError:
            default = None
        return value if value else default


@dataclass(frozen=True)
class Problem:
    """A class to represent a problem during a request handling."""

    title: str
    status: int
    detail: str
    # TODO store URI references of error schemas in some subpath
    type_: str = ABOUT_BLANK
    instance: str = ABOUT_BLANK

    @property
    def json(self):
        """Transform the object to JSON."""
        return dict(
            title=self.title,
            type=self.type_,
            status=self.status,
            detail=self.detail,
            instance=self.instance,
        )
