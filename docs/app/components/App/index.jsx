import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Logo} from 'nukleus';

import styles from './index.scss';

const components = [
  'CheckboxGroup',
  'Combobox',
  'DatePicker',
  'InfoText',
  'Logo',
  'Notification',
  'Paginator',
  'Select',
  'Stars',
  'Table',
  'Tabs',
  'TextField'
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
          {...comp, visible: !comp.visible}
      )
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
      children,
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
                  <Logo shade="light" />
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
                  <navigation>
                    <ul className={styles.navigation}>
                      {componentList.map(({name, link}, index) =>
                        <li
                          key={name}
                          className={this.state.components.find(comp => comp.name === name).visible && styles.activeMobile}>
                          <Link
                            to={link}
                            onClick={(() => this.onClickToggleComponent(name))}
                            className={`${(pathname === link || (pathname === '/' && !index)) && styles.active} ${styles.link}`}>{name}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </navigation>
                </div>
              </div>
              <div className={`${styles.flexChild}`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object
};
