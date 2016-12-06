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
    }))
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
              <Logo shade="light" />
            </div>
          </header>
          <div className="panel padding-top padding-bottom clearfix container-fluid">
            <div className={styles.flexContainer}>
              <div className={`container-fluid ${styles.flexChild}`}>
                <navigation>
                  <ul className={styles.navigation}>
                    {componentList.map(({name, link}, index) =>
                      <li key={name} className={this.state.components.find(comp => comp.name === name).visible && styles.activeMobile}>
                        <Link
                          to={link}
                          onClick={(() => this.onClickToggleComponent(name))}
                          className={`${(pathname === link || (pathname === '/' && !index)) && styles.active} ${styles.link}`}>{name}
                          <i className={`fa fa-caret-${this.state.components.find(comp => comp.name === name).visible ? 'up' : 'down'} visible-xs`} />
                        </Link>

                        { this.state.components.find(comp => comp.name === name).visible &&
                          <div className={`visible-xs ${styles.mobileContent}`}>
                            {children}
                          </div>
                          }
                      </li>
                    )}
                  </ul>
                </navigation>
              </div>
              <div className={`container-fluid hidden-xs ${styles.flexChild}`}>
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
