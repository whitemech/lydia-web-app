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

"""
Define the app and the configuration objects.

The purpose of this module is to avoid circular imports between
the base module and the modules where the API handlers are defined.
"""
import connexion

from lydia_web_api.base import Configuration

configuration = Configuration()
"""Globally available configuration object."""

app = connexion.App(__name__, specification_dir="spec/")
