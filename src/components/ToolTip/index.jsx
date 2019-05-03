import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import InfoBox from '../InfoBox';

import styles from './index.scss';

export default class ToolTip extends React.Component {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    icon: PropTypes.element,
    label: PropTypes.string,
    position: PropTypes.oneOf([
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
    ]),
  };

  static defaultProps = {
    content: '',
    icon: (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 75 75"
        xmlSpace="preserve"
      >
        <path
          d="M37.5,20.398c-1.648,0-3,1.352-3,3c0,1.649,1.352,3,3,3c1.648,0,3-1.351,3-3C40.5,21.75,39.148,20.398,37.5,20.398z M39.75,52.648V34.051c0-1.274-0.977-2.25-2.25-2.25c-1.273,0-2.25,0.976-2.25,2.25v18.602c0,1.273,0.977,2.25,2.25,2.25 C38.773,54.902,39.75,53.852,39.75,52.648z M37.5,3.75C18.824,3.75,3.75,18.824,3.75,37.5S18.824,71.25,37.5,71.25 S71.25,56.176,71.25,37.5S56.176,3.75,37.5,3.75z M37.5,8.25c16.125,0,29.25,13.125,29.25,29.25S53.625,66.75,37.5,66.75 S8.25,53.625,8.25,37.5S21.375,8.25,37.5,8.25"
        />
      </svg>
    ),
    label: undefined,
    position: 'topLeft',
  };

  state = {
    active: false,
    clickActivated: false,
  };

  componentDidMount () {
    document.addEventListener('click', this.detectClickInside);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.detectClickInside);
  }

  onMouseEnter = () => {
    this.showInfoBox();
  }

  onMouseLeave = () => {
    const {clickActivated} = this.state;

    // Hide Info Box if it wasn't activated via click or touch
    if (!clickActivated) {
      this.hideInfoBox();
    }
  }

  onClick = (ev) => {
    const {
      active,
      clickActivated,
    } = this.state;

    ev.target.blur();
    // Hide Info Box if it was activated via click
    if (active && clickActivated) {
      this.hideInfoBox();
      return;
    }
    this.showInfoBox(true);
  }

  detectClickInside = (ev) => {
    const {active} = this.state;

    if (!active) return;

    let node = ev.target;
    let clickInside = node === this.container;

    while (!clickInside && node.parentNode) {
      node = node.parentNode;
      clickInside = node === this.container;
    }

    if (!clickInside) {
      this.hideInfoBox();
    }
  }

  hideInfoBox () {
    this.setState({
      active: false,
      clickActivated: false,
    });
  }

  // eslint-disable-next-line react/destructuring-assignment
  showInfoBox (clickActivated = this.state.clickActivated) {
    this.setState({
      active: true,
      clickActivated,
    });
  }

  render () {
    const {
      content,
      icon,
      label,
      position,
    } = this.props;
    const {active} = this.state;

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...styles, ...context});

          return (
            <div
              ref={(container) => { this.container = container; }}
              className={theme('toolTipContainer')}
            >
              <button
                className={theme('toolTipButton')}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                title={label}
                type="button"
              >
                {icon}
              </button>
              {active && (
              <InfoBox
                content={content}
                position={position}
              />
              )}
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
