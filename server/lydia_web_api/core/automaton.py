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
import base64
import logging
import tempfile
from pathlib import Path
from typing import Any, Callable, Dict, cast

import logaut  # noqa: I201
from flask import jsonify, request  # noqa: I100,I201
from pylogics.parsers import parse_ldl, parse_ltl  # noqa: I201
from pylogics.syntax.base import Formula  # noqa: I201
from pythomata.impl.symbolic import SymbolicDFA  # noqa: I201

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
    return base64.urlsafe_b64encode(dfa.to_graphviz().source.encode()).decode()


def automaton_to_svg(dfa: SymbolicDFA) -> str:
    """Transform a SymbolicDFA to SVG."""
    with tempfile.TemporaryDirectory() as tempdir:
        output_file = Path(tempdir, "output")
        dfa.to_graphviz().render(str(output_file), format="svg")
        file_content = output_file.with_suffix(".svg").read_bytes()
        return base64.urlsafe_b64encode(file_content).decode()


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
    formalism = request.args.get("formalism")
    formula = request.args.get("formula")
    output_formats = request.args.getlist("output_format")
    res = {}
    formula = get_parser(formalism)(formula)
    result: SymbolicDFA = cast(SymbolicDFA, logaut.ldl2dfa(formula=formula))
    for output_format in output_formats:
        res[output_format] = serialize_automaton(result, output_format)
    return jsonify(res)
