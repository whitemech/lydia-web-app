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

"""Package-wide constants."""
import inspect
import os
from pathlib import Path

from dotenv import load_dotenv

CURRENT_DIRECTORY = Path(os.path.dirname(inspect.getfile(inspect.currentframe())))  # type: ignore
ROOT_SERVER_DIRECTORY = str(Path(CURRENT_DIRECTORY).parent)
DOTENV_FILE = os.path.join(ROOT_SERVER_DIRECTORY, ".env")
load_dotenv(DOTENV_FILE)
TIMEOUT = 5

ABOUT_BLANK = "about:blank"
