/* -*- coding: utf-8 -*-
 ** Copyright (C) 2018-2020 Laboratoire de Recherche et Développement de
 ** l'Epita.
 **
 ** This application is free software; you can redistribute it and/or
 ** modify it under the terms of the GNU General Public License as
 ** published by the Free Software Foundation; either version 3 of the
 ** License, or (at your option) any later version.
 **
 ** This application is distributed in the hope that it will be useful,
 ** but WITHOUT ANY WARRANTY; without even the implied warranty of
 ** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 ** General Public License for more details.
 **
 ** You should have received a copy of the GNU General Public License
 ** along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import SVGInline from 'react-svg-inline';
import Switch from '@material-ui/core/Switch';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  toplevel: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  },
  help: {
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    width: 640 - 2 * theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
    '& h2': { color: theme.palette.primary.main },
  },
  helptop: {
    padding: 4,
  },
  helpexpanded: {
    margin: 0,
    '&:before': {
      opacity: 1,
    },
  },
  optable: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
  },
  oppair: {
    display: 'block',
    padding: 2,
    margin: 2,
    backgroundColor: '#EEEEEE',
  },
  opdesc: {
    float: 'left',
  },
  opsyn: {
    float: 'right',
  },
  root: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    width: 640 - 2 * theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  progress: {
    display: 'block',
    margin: 'auto',
  },
  optionstrans: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  tab: {
    maxWidth: 150,
    minWidth: 50,
  },
  tablabel: {
    fontSize: theme.typography.pxToRem(14),
  },
  fclvertical: {
    marginRight: 0,
  },
  pre: {
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    width: '100%',
  },
  LdlfInput: {
    width: '100%',
    overflow: 'hidden',
  },
  ltlsyntax: {},
  helperText: {
    marginTop: 0,
  },
  borderedgroupprimary: {
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: theme.palette.primary.main,
    '& legend': {
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: 'white',
      color: theme.palette.primary.light,
    },
  },
  borderedgroupsecondary: {
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: theme.palette.secondary.main,
    '& legend': {
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: 'white',
      color: theme.palette.secondary.light,
    },
    '& legend$focused': {
      color: theme.palette.secondary.main,
    },
  },
  flexhoriz: {
    flexDirection: 'row',
  },
  focused: {},

  choicemenuitem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  unabbrev: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  unabbrevboxroot: {
    marginRight: '16px',
    marginBottom: '-8px',
    marginTop: '-8px',
  },
  unabbrevboxlabel: {
    marginLeft: '-8px',
  },
  parseerror: {
    color: theme.palette.error.main,
  },
  textField: {
    overflow: 'hidden',
  },
  textField1: {
    overflow: 'hidden',
    backgroundColor: '#b2ffff',
  },
  textField2: {
    overflow: 'hidden',
    backgroundColor: '#ffccff',
  },
  update: {
    width: '100px',
    float: 'right',
  },
  winicons: {
    float: 'right',
  },
  helpiconsdiv: {
    overflow: 'auto',
  },
  helpicons: {
    float: 'right',
    marginRight: theme.spacing.unit,
  },
  menu: {},
  versions: {
    float: 'right',
    marginTop: '8px',
  },
  vendiag: {
    float: 'right',
  },
  versiontable: {},
  results: {
    width: '100%',
    padding: theme.spacing.unit,
    overflow: 'auto',
  },
  hierarchy_svg: {
    float: 'right',
  },
  hierarchydiv: {
    paddingBottom: 10,
  },
  satisfiabilitydiv: {
    paddingBottom: 10,
  },
  stutterdiv: {},
  indexdiv: {
    paddingBottom: 10,
  },
  livenessdiv: {
    paddingBottom: 10,
  },
  wordtable: {
    width: 'auto',
  },
  wordtablerow: {
    height: 'auto',
  },
  wordtablecell: {
    borderBottom: 'none',
  },
  wordtablecellw: {
    borderBottom: 'none',
    fontWeight: 'bold',
  },
  automaton_svg: {
    overflow: 'auto',
    marginLeft: -4,
    marginRight: -4,
  },
});

function NoteIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4.47,21h15.06c1.54,0,2.5-1.67,1.73-3L13.73,4.99c-0.77-1.33-2.69-1.33-3.46,0L2.74,18C1.97,19.33,2.93,21,4.47,21z M12,14L12,14c-0.55,0-1-0.45-1-1v-2c0-0.55,0.45-1,1-1h0c0.55,0,1,0.45,1,1v2C13,13.55,12.55,14,12,14z M13,18h-2v-2h2V18z" />
    </SvgIcon>
  );
}
function DupeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M14.59,2.59C14.21,2.21,13.7,2,13.17,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8.83 c0-0.53-0.21-1.04-0.59-1.41L14.59,2.59z M15,16h-2v2c0,0.55-0.45,1-1,1h0c-0.55,0-1-0.45-1-1v-2H9c-0.55,0-1-0.45-1-1v0 c0-0.55,0.45-1,1-1h2v-2c0-0.55,0.45-1,1-1h0c0.55,0,1,0.45,1,1v2h2c0.55,0,1,0.45,1,1v0C16,15.55,15.55,16,15,16z M13,8V3.5 L18.5,9H14C13.45,9,13,8.55,13,8z" />
    </SvgIcon>
  );
}
function CloseIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M18.3,5.71L18.3,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,10.59L7.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41L10.59,12L5.7,16.89c-0.39,0.39-0.39,1.02,0,1.41h0c0.39,0.39,1.02,0.39,1.41,0L12,13.41l4.89,4.89 c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L13.41,12l4.89-4.89C18.68,6.73,18.68,6.09,18.3,5.71z" />
    </SvgIcon>
  );
}

function NoteText(props) {
  return (
    <Typography>
      <table>
        <tr>
          <td>
            <NoteIcon {...props} />
          </td>
          <td>{props.text}</td>
        </tr>
      </table>
    </Typography>
  );
}

function api_endpoint() {
  console.log(
    process.env.REACT_APP_API_HOSTNAME + process.env.REACT_APP_API_ENDPOINT,
  );
  return (
    window.location.protocol +
    '//' +
    process.env.REACT_APP_API_HOSTNAME +
    process.env.REACT_APP_API_ENDPOINT
  );
}

function renderError(msg) {
  console.log(msg);
  if (!msg.startsWith('500 ')) return <pre>{msg}</pre>;
  return (
    <React.Fragment>
      <pre>{msg}</pre>
      <Typography color="error">
        Our server automatically kills requests that require too much resources
        in terms of memory or time.
        <br /> If you do <i>not</i> think that is the case here, please send a
        screenshot and any helpful detail to{' '}
        <a href="mailto:favorito@diag.uniroma1.it">the maintainers.</a>
        .<br />
        If you <i>do</i> think that is the case, please consider{' '}
        <a href="https://github.com/whitemech/lydia.git">installing Lydia</a> to
        run your experiments locally; this is a shared service.
      </Typography>
    </React.Fragment>
  );
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.status + ' ' + response.statusText);
  }
  return response.json();
}
function handleErrorsAndClearTimer(timer) {
  return response => {
    clearTimeout(timer);
    if (!response.ok) {
      throw Error(response.status + ' ' + response.statusText);
    }
    return response.json();
  };
}

class LdlfInput extends React.Component {
  state = {
    tmpformula: this.props.defaultValue || '',
    formula: this.props.defaultValue || '',
  };

  handleChange = e => {
    this.setState({ tmpformula: e.target.value });
  };

  updateFormula = () => {
    let fmt = this.state.tmpformula;
    this.setState({ formula: fmt });
    this.props.setFormula(fmt);
  };

  handleKey = e => {
    if (e.key === 'Enter') this.updateFormula();
  };

  randomizeFormula = () => {
    let url = new URL(api_endpoint() + 'random');
    console.log(this.props.expert);
    if (this.props.expert)
      // turn on PSL generation
      url.searchParams.append('p', 1);
    fetch(url)
      .then(handleErrors)
      .then(fmt => {
        this.setState({ tmpformula: fmt, formula: fmt });
        this.props.setFormula(fmt);
      });
  };

  render() {
    return (
      <div className={this.props.classes.LdlfInput}>
        <TextField
          error={Boolean(this.props.formulaerr)}
          className={this.props.className}
          fullWidth
          value={this.state.tmpformula}
          label={this.props.label}
          autoFocus={this.props.autoFocus}
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
          onBlur={this.updateFormula}
        />
        <FormHelperText className={this.props.classes.helperText}>
          {this.state.tmpformula !== this.state.formula && (
            <span>
              Hit <i>Enter</i> or <i>Tab</i> to update the results.
            </span>
          )}
        </FormHelperText>
        {this.props.formulalbt && (
          <NoteText text={'Assuming a syntax for LDLf (see help)'} />
        )}
        {this.props.formulaerr && (
          <pre className={this.props.classes.parseerror}>
            {this.props.formulaerr}
          </pre>
        )}
      </div>
    );
  }
}

class Versions extends React.Component {
  state = {
    anchorEl: null,
    versions: [],
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    fetch(api_endpoint() + 'versions')
      .then(handleErrors)
      .then(vers => {
        vers.push(['React', React.version, 'https://reactjs.org/']);
        this.setState({ versions: vers });
      })
      .catch(error =>
        this.setState({ versions: [[error.message, null, null]] }),
      );
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          className={this.props.classes.versions}
          color="secondary"
          onClick={this.handleOpen}
        >
          Versions
        </Button>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Table className={classes.versiontable}>
            <TableBody>
              {this.state.versions.map(([tool, version, url]) => {
                return (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <a href={url}>{tool}</a>
                    </TableCell>
                    <TableCell>{version}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Menu>
      </div>
    );
  }
}

class LydiaResult extends React.Component {
  render() {
    return (
      <Paper className={this.props.classes.results}>{this.props.result}</Paper>
    );
  }
}

class LdlfTranslate extends React.Component {
  timer = null;

  state = {
    result: null,
    showfile: 0,
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  showfilehoa = () => {
    console.log('showfile:', this.state.showfile);
    console.log('showfile:', this.state.showfile === 1);
    let newval = this.state.showfile === 1 ? 0 : 1;
    console.log('showfile:', newval);
    this.setState({ showfile: newval });
    console.log('showfile:', this.state.showfile);
  };
  showfilespin = () => {
    this.setState({ showfile: this.state.showfile === 2 ? 0 : 2 });
    console.log('showfile:', this.state.showfile);
  };

  buildResult(res) {
    // Return a lambda so we capture res, and can easily re-render
    // the results on events (such as clicking on HOA or
    // NeverClaim).
    return () => {
      return (
        <React.Fragment>
          {'states' in res && (
            <Typography>
              {res['det'] ? 'D' : 'Non-d'}
              eterministic automaton with {res['states']} state
              {res['states'] > 1 ? 's' : ''} and {res['edges']} edge
              {res['edges'] > 1 ? 's' : ''}.
            </Typography>
          )}
          {'note' in res && res['note'].map(note => <NoteText text={note} />)}
          {'automaton_svg' in res && (
            <SVGInline
              className={this.props.classes.automaton_svg}
              component="div"
              svg={res['automaton_svg']}
            />
          )}
        </React.Fragment>
      );
    };
  }

  updateResult() {
    if (this.props.formula === '') {
      this.setState({ result: '' });
      return;
    }
    let url = new URL(
      api_endpoint() + 'translate/' + encodeURIComponent(this.props.formula),
    );

    this.timer = setTimeout(() => {
      this.setState({
        result: () => (
          <CircularProgress className={this.props.classes.progress} />
        ),
      });
    }, 800);
    fetch(url)
      .then(handleErrorsAndClearTimer(this.timer))
      .then(res => {
        this.props.handleAnyParseError(res);
        this.setState({ result: this.buildResult(res) });
      })
      .catch(error => {
        clearTimeout(this.timer);
        this.setState({ result: () => renderError(error.message) });
      });
  }

  componentDidMount() {
    this.updateResult();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.formula !== this.props.formula ||
      prevProps.acc !== this.props.acc ||
      prevProps.autpref !== this.props.autpref ||
      prevProps.transopts !== this.props.transopts ||
      prevProps.minmax !== this.props.minmax ||
      prevProps.oddeven !== this.props.oddeven ||
      prevProps.optlevel !== this.props.optlevel
    ) {
      this.updateResult();
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.result && (
          <LydiaResult
            classes={this.props.classes}
            result={this.state.result()}
          />
        )}
      </React.Fragment>
    );
  }
}

class LydiaApp extends React.Component {
  state = {
    action: 3,
    formula: '',
    formula2: '',
    formulaerr: null,
    formulalbt: false,
  };

  setFormulaError = val => {
    this.setState({ formulaerr: val });
  };

  handleAnyParseError = res => {
    if ('error' in res) this.setFormulaError(res['error']);
    else this.setFormulaError(null);
  };

  changeAction = (event, value) => {
    this.setState({ action: value });
  };
  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleChangeFormula = str => {
    this.setState({ formula: str });
  };
  handleChangeFormula2 = str => {
    this.setState({ formula2: str });
  };

  render() {
    return (
      <Paper className={this.props.classes.root}>
        {this.props.topright}
        {this.state.expert && <Versions classes={this.props.classes} />}
        <div className="title-label">
          <b>Lydia Online Translator</b>
        </div>
        {(this.state.expert || this.state.hideoptions) && (
          <FormControlLabel
            control={
              <Switch
                checked={this.state.hideoptions}
                disabled={this.state.action === 1 || this.state.action === 2}
                onChange={this.handleChecked('hideoptions')}
                color="secondary"
                value="hideoptions"
              />
            }
            label="Hide all options"
          />
        )}
        <LdlfInput
          classes={this.props.classes}
          className={
            this.state.action === 2
              ? this.props.classes.textField1
              : this.props.classes.textField
          }
          label={this.state.action === 2 ? 'First formula' : 'Input formula'}
          expert={this.state.expert}
          autoFocus
          setFormula={this.handleChangeFormula}
          formulalbt={this.state.formulalbt}
          formulaerr={this.state.formulaerr}
        />
        {this.state.action === 3 && (
          <LdlfTranslate
            classes={this.props.classes}
            hideoptions={this.state.hideoptions}
            acc={this.state.acc}
            expert={this.state.expert}
            formula={this.state.formula}
            changeAcc={this.changeAcc}
            changeAutpref={this.changeAutpref}
            changeOptLevel={this.changeOptLevel}
            autpref={this.state.autpref}
            optlevel={this.state.optlevel}
            transopts={this.state.transopts}
            handleChangeTransOpts={this.handleChangeTransOpts}
            handleAnyParseError={this.handleAnyParseError}
            minmax={this.state.minmax}
            oddeven={this.state.oddeven}
            changeMinMax={this.changeMinMax}
            changeOddEven={this.changeOddEven}
          />
        )}
        {
          //<div> {JSON.stringify(...)} </div>
        }
      </Paper>
    );
  }
}

function OpTable(array, width, classes) {
  return (
    <div className={classes.optable}>
      {array.map(value => {
        return (
          <div className={classes.oppair} style={{ width: width }}>
            <div className={classes.opdesc}>{value[0]}:</div>
            <div className={classes.opsyn}>{value[1]}</div>
          </div>
        );
      })}
    </div>
  );
}

function Ldlf(props) {
  return (
    <code>
      <b>{props.f}</b>
    </code>
  );
}

function code_fmt(props) {
  return (
    <code>
      <b>{props.text}</b>
    </code>
  );
}

class Help extends React.Component {
  render() {
    return (
      <Paper className={this.props.classes.help}>
        <div className={this.props.classes.helpiconsdiv}>
          <IconButton
            className={this.props.classes.helpicons}
            color="primary"
            onClick={this.props.onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="headline"
            color="primary"
            align="center"
            className={this.props.classes.helptop}
            gutterBottom
          >
            Help
          </Typography>
        </div>

        <ExpansionPanel classes={{ expanded: this.props.classes.helpexpanded }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">About</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Typography variant="body1" gutterBottom>
                This web application is built using the{' '}
                <a href="https://github.com/whitemech/lydia.git">Lydia</a>{' '}
                running on a shared computer. For serious uses, we suggest
                installing and using the tool locally.
              </Typography>
              <Typography variant="body1" gutterBottom>
                The source code for this application can be found{' '}
                <a href="https://github.com/whitemech/lydia.git">on GitHub</a>,
                and is distributed under the{' '}
                <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
                  GNU GPL v3
                </a>{' '}
                license.
              </Typography>
              <Typography variant="body1" gutterBottom>
                For any question not answered in this small help text, or for
                reporting any bug, please send an email to{' '}
                <a href="mailto:favorito@diag.uniroma1.it">the authors</a> with
                tag "[lydia]".
              </Typography>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel classes={{ expanded: this.props.classes.helpexpanded }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">Operation modes</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1">
              Currently, the only supported mode of interaction is to construct
              a deterministic finite automaton equivalent to a given LDLf
              formula. In the future, we aim to provide other features such as
              analysis of the provided formula and performing LDLf synthesis, as
              well as support for other temporal logic formalisms like LTLf,
              PLTLf and PLDLf.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel classes={{ expanded: this.props.classes.helpexpanded }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">LDLf Syntax</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Typography variant="body1" gutterBottom>
                In this section it is described the grammar accepted by the
                Lydia parser to encode LDLf formulas. It follows the syntax
                proposed in (Brafman et al. 2018) (see the references section
                below).
              </Typography>
              <Typography variant="body2" color="primary">
                Atomic propositions
              </Typography>
              <Typography variant="body1" gutterBottom>
                Use alphanumeric identifiers for atomic propositions, and
                parentheses for grouping. Identifiers cannot start with a digit,
                and can only contain the underscore <code_fmt text="_" />.
                Moreover, there are reserved words such as
                <Ldlf f="tt" />, <Ldlf f="ff" />, <Ldlf f="true" />,{' '}
                <Ldlf f="false" />,
                <Ldlf f="end" />, <Ldlf f="last" />. More details in the next
                sections.
              </Typography>
              <Typography variant="body2" color="primary">
                Boolean constants
              </Typography>
              <Typography variant="body1" gutterBottom>
                Use <Ldlf f="tt" /> and <Ldlf f="ff" /> to denote LDLf true and
                false, respectively. Notice that it is different from the{' '}
                <it>propositional booleans</it>, which you can define using{' '}
                <Ldlf f="true" /> or <Ldlf f="false" />.
              </Typography>
              <Typography variant="body2" color="primary">
                Boolean operators
              </Typography>
              <Typography variant="body1" gutterBottom>
                The following Boolean operators are supported:
                {OpTable(
                  [
                    [
                      'and',
                      <>
                        <Ldlf f="&amp;" />, <Ldlf f="&amp;&amp;" />
                      </>,
                    ],
                    [
                      'or',
                      <>
                        <Ldlf f="|" />, <Ldlf f="||" />
                      </>,
                    ],
                    [
                      'not',
                      <>
                        <Ldlf f="!" /> (prefix), <Ldlf f="~" /> (prefix)
                      </>,
                    ],
                    [
                      'implies',
                      <>
                        <Ldlf f="->" />, <Ldlf f="=>" />
                      </>,
                    ],
                    [
                      'equivalent',
                      <>
                        <Ldlf f="<->" />, <Ldlf f="<=>" />
                      </>,
                    ],
                  ],
                  '150px',
                  this.props.classes,
                )}
              </Typography>
              <Typography variant="body2" color="primary">
                Temporal Operators
              </Typography>
              <Typography variant="body1" gutterBottom>
                The following binary operators are supported:
                {OpTable(
                  [
                    ['Diamond formula', <Ldlf f="<regex>formula" />],
                    ['Box formula', <Ldlf f="[regex]formula" />],
                  ],
                  '250px',
                  this.props.classes,
                )}
                The following abbreviations are supported:
                <Ldlf f="end" /> for <Ldlf f="[true]ff" />
                and <Ldlf f="last" /> for <Ldlf f="[true]end" />.
              </Typography>
              <Typography variant="body2" color="primary">
                Regular Expressions
              </Typography>
              <Typography variant="Regular expressions" gutterBottom>
                The following regular expressions are supported:
                {OpTable(
                  [
                    [
                      'propositionals, e.g.',
                      <>
                        <Ldlf f="p" />, <Ldlf f="p &amp; q" />,{' '}
                        <Ldlf f="p | q" />,
                        <Ldlf f="!p" />
                      </>,
                    ],
                    [
                      'sequence',
                      <>
                        <Ldlf f="r1 ; r2" />
                      </>,
                    ],
                    [
                      'union',
                      <>
                        <Ldlf f="r1 + r2" />
                      </>,
                    ],
                    [
                      'star',
                      <>
                        <Ldlf f="r*" />
                      </>,
                    ],
                    [
                      'test',
                      <>
                        <Ldlf f="formula?" />
                      </>,
                    ],
                  ],
                  '300px',
                  this.props.classes,
                )}
                Where <Ldlf f="formula" /> is an LDLf formula.
              </Typography>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel classes={{ expanded: this.props.classes.helpexpanded }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">References</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Typography variant="body1" gutterBottom>
                Follows a list of references about LDLf:
                <ul>
                  <li>
                    De Giacomo, Giuseppe, and Moshe Y. Vardi. "Linear temporal
                    logic and linear dynamic logic on finite traces." IJCAI'13
                    Proceedings of the Twenty-Third international joint
                    conference on Artificial Intelligence. Association for
                    Computing Machinery, 2013.
                  </li>
                  <li>
                    De Giacomo, Giuseppe, and Moshe Vardi. "Synthesis for LTL
                    and LDL on finite traces." Twenty-Fourth International Joint
                    Conference on Artificial Intelligence. 2015.
                  </li>
                  <li>
                    De Giacomo, Giuseppe, and Moshe Y. Vardi. "LTLf and LDLf
                    Synthesis under Partial Observability." IJCAI. 2016.
                  </li>
                  <li>
                    Brafman, Ronen I., Giuseppe De Giacomo, and Fabio Patrizi.
                    "LTLf/LDLf Non-Markovian Rewards." AAAI. 2018.
                  </li>
                </ul>
              </Typography>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    );
  }
}

class LydiaApps extends React.Component {
  state = {
    instances: 1,
    show_help: 0,
  };

  handleDup = () => {
    this.setState({ instances: 2 });
  };

  showHelp = () => {
    this.setState({ show_help: 1 });
  };

  unshowHelp = () => {
    this.setState({ show_help: 0 });
  };

  handleClose = () => {
    this.setState({ instances: 1 });
  };

  render() {
    return (
      <div className={this.props.classes.toplevel}>
        <LydiaApp
          classes={this.props.classes}
          topright={
            <React.Fragment>
              <IconButton
                disabled={this.state.show_help === 1}
                color="primary"
                onClick={this.showHelp}
                className={this.props.classes.winicons}
                aria-label="help"
              >
                <HelpIcon />
              </IconButton>
              <IconButton
                disabled={this.state.instances === 2}
                color="primary"
                onClick={this.handleDup}
                className={this.props.classes.winicons}
                aria-label="dup"
              >
                <DupeIcon />
              </IconButton>
            </React.Fragment>
          }
        />
        {this.state.instances === 2 && (
          <LydiaApp
            classes={this.props.classes}
            topright={
              <IconButton
                className={this.props.classes.winicons}
                color="primary"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            }
          />
        )}
        {this.state.show_help === 1 && (
          <Help classes={this.props.classes} onClose={this.unshowHelp} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LydiaApps);
