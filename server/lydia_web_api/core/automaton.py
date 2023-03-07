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

"""Translate a formula."""
import logging
import tempfile
from pathlib import Path
from typing import Any, Callable, Dict, cast

import logaut
from flask import jsonify, request
from flask_cors import cross_origin
from pylogics.parsers import parse_ldl, parse_ltl
from pylogics.syntax.base import Formula
from pythomata.impl.symbolic import SymbolicDFA

from lydia_web_api._global import app
from lydia_web_api.decorators import cachecontrol, request_handler

logger = logging.getLogger(__name__)


def get_parser(formalism: str) -> Callable[[str], Formula]:
    """
    Get Pylogic parser associated to the formalism.

    :param formalism: one of 'ltlf' and 'ldlf'
    :return: the parser function
    """
    return dict(ltlf=parse_ltl, ldlf=parse_ldl)[formalism]


def automaton_to_dot(dfa: SymbolicDFA) -> str:
    """Transform a SymbolicDFA to DOT."""
    return dfa.to_graphviz().source


def automaton_to_svg(dfa: SymbolicDFA) -> str:
    """Transform a SymbolicDFA to SVG."""
    with tempfile.TemporaryDirectory() as tempdir:
        output_file = Path(tempdir, "output")
        dfa.to_graphviz().render(str(output_file), format="svg")
        file_content = output_file.with_suffix(".svg").read_bytes().decode()
        return file_content


def automaton_to_json(dfa: SymbolicDFA) -> dict:
    """Transform a SymbolicDFA to JSON."""
    transition_function: Dict = {}
    initial_state = dfa.initial_state
    final_states = list(dfa.accepting_states)
    for (start, guard, end) in dfa.get_transitions():
        transition_function.setdefault(start, {})[str(guard)] = end
    return dict(
        transition_function=transition_function,
        initial_state=initial_state,
        final_states=final_states,
    )


def serialize_automaton(dfa: SymbolicDFA, output_format: str) -> Any:
    """
    Serialize an automaton in a format.

    :param dfa: a SymbolicDFA instance.
    :param output_format: the output format (one of: dot, svg, json)
    :return: the serialized DFA.
    """
    return dict(dot=automaton_to_dot, svg=automaton_to_svg, json=automaton_to_json)[
        output_format
    ](dfa)


@app.route("/api/translate")
@cachecontrol()
@request_handler
def automaton():
    """Translate an LDLf formula."""
    data = request.json
    formalism = data.get("formalism")
    formula = data.get("formula")
    output_formats = data.get("output_formats")
    res = {}
    formula = get_parser(formalism)(formula)
    result: SymbolicDFA = cast(SymbolicDFA, logaut.ldl2dfa(formula=formula))
    for output_format in output_formats:
        res[output_format] = serialize_automaton(result, output_format)
    return jsonify(res)
