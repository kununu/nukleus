import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from 'kununu-logo';
import {Route, Link, Switch} from 'react-router-dom';

import AutocompleteDocs from 'components/AutocompleteDocs';
import ButtonDocs from 'components/ButtonDocs';
import ChoiceDocs from 'components/ChoiceDocs';
import ComboboxDocs from 'components/ComboboxDocs';
import DatePickerDocs from 'components/DatePickerDocs';
import DropDownDocs from 'components/DropDownDocs';
import ErrorDocs from 'components/ErrorDocs';
import InfoTextDocs from 'components/InfoTextDocs';
import MultipleChoiceDocs from 'components/MultipleChoiceDocs';
import ModalDocs from 'components/ModalDocs';
import PaginatorDocs from 'components/PaginatorDocs';
import SelectDocs from 'components/SelectDocs';
import StarsDocs from 'components/StarsDocs';
import TabsDocs from 'components/TabsDocs';
import TableDocs from 'components/TableDocs';
import TextFieldDocs from 'components/TextFieldDocs';
import ToolTipDocs from 'components/ToolTipDocs';
import NotificationDocs from 'components/NotificationDocs';

import styles from './index.scss';

const components = [
  'Autocomplete',
  'Button',
  'Choice',
  'Combobox',
  'DatePicker',
  'DropDown',
  'Error',
  'InfoText',
  'Modal',
  'MultipleChoice',
  'Notification',
  'Paginator',
  'Select',
  'Stars',
  'Table',
  'Tabs',
  'TextField',
  'ToolTip'
];

export default class App extends Component {
  state = {
    components: components.map(component => ({
      name: component,
      visible: false
    })),
    menuVisible: false
  }

  componentDidUpdate () {
    Prism.highlightAll();
  }

  onClickToggleComponent = name => {
    this.setState({
      components: this.state.components.map(comp =>
        comp.name !== name ?
          comp :
          {...comp, visible: !comp.visible})
    });
  }

  onClickToggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

  onClickCloseMenu = () => {
    this.setState({
      menuVisible: false
    });
  }

  render () {
    const {
      location: {pathname}
    } = this.props;

    const componentList = components.map(component => ({
      link: `/${component.replace(/((?!^)[A-Z])/g, '-$1').toLowerCase()}`,
      name: component
    }));

    return (
      <main role="main">
        <div className="app-container container-fluid">
          <header className={`${styles.header} navbar navbar-fixed-top`}>
            <div className="container-fluid">
              <div className={styles.flexMenuContainer}>
                <button
                  className={styles.mobileMenuButton}
                  onClick={this.onClickToggleMenu}>
                  <i className="fa fa-bars" aria-hidden="true" />
                </button>
                <div>
                  <Logo
                    shade="light"
                    link={
                      <Link
                        to={{pathname: '/'}}>
                        nukleus docs
                      </Link>
                    } />
                </div>
              </div>
            </div>
          </header>
          <div className={`panel padding-bottom clearfix container-fluid ${styles.container}`}>
            <div className={styles.flexContainer}>
              <div className={`${styles.flexChild} ${styles.menuContainer}`}>
                <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                  onClick={this.onClickCloseMenu}
                  className={`${styles.menu} ${this.state.menuVisible && styles.open}`}>
                  <nav>
                    <ul className={styles.navigation}>
                      {componentList.map(({name, link}, index) =>
                        (
                          <li
                            key={name}
                            className={this.state.components.filter(comp => comp.name === name)[0].visible ? styles.activeMobile : undefined}>
                            <Link
                              to={link}
                              onClick={(() => this.onClickToggleComponent(name))}
                              className={`${(pathname === link || (pathname === '/' && !index)) ? styles.active : undefined} ${styles.link}`}>{name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className={`${styles.flexChild}`}>
                <Switch>
                  <Route exact path="/" component={AutocompleteDocs} />
                  <Route path="/autocomplete" component={AutocompleteDocs} />
                  <Route path="/button" component={ButtonDocs} />
                  <Route path="/choice" component={ChoiceDocs} />
                  <Route path="/combobox" component={ComboboxDocs} />
                  <Route path="/date-picker" component={DatePickerDocs} />
                  <Route path="/drop-down/:country?" component={DropDownDocs} />
                  <Route path="/error" component={ErrorDocs} />
                  <Route path="/multiple-choice" component={MultipleChoiceDocs} />
                  <Route path="/paginator" component={PaginatorDocs} />
                  <Route path="/text-field" component={TextFieldDocs} />
                  <Route path="/stars" component={StarsDocs} />
                  <Route path="/info-text" component={InfoTextDocs} />
                  <Route path="/notification" component={NotificationDocs} />
                  <Route path="/select" component={SelectDocs} />
                  <Route path="/table" component={TableDocs} />
                  <Route path="/tabs/:page?" component={TabsDocs} />
                  <Route path="/tool-tip" component={ToolTipDocs} />
                  <Route path="/modal" component={ModalDocs} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired
};
