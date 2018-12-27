import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {isBrowser} from 'utils/executionEnvironment';

import DropDownSelector from './DropDownSelector';
import DropDownItems from './DropDownItems';
import styles from './index.scss';

export default class DropDown extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]).isRequired,
    direction: PropTypes.oneOf(['up', 'down']),
    showOnHover: PropTypes.bool
  }

  static defaultProps = {
    align: 'left',
    direction: 'down',
    showOnHover: true
  }

  state = {isOpen: false}

  componentWillMount () {
    if (!isBrowser) return;
    document.addEventListener('click', this.onClickDocument, false);
    document.addEventListener('touchend', this.onClickDocument, false);
  }

  componentWillUnmount () {
    if (!isBrowser) return;
    document.removeEventListener('click', this.onClickDocument, false);
    document.removeEventListener('touchend', this.onClickDocument, false);
  }

  // Property initializer binds method to class instance
  onMouseEnter = () => {
    const {showOnHover} = this.props;

    if (!showOnHover) return;
    this.open();
  }

  onMouseLeave = () => {
    const {showOnHover} = this.props;

    if (!showOnHover) return;
    this.close();
  }

  onClick = () => this.toggle();

  onClickDocument = e => {
    if (this.node.contains(e.target)) return;

    setTimeout(() => {
      this.setState({isOpen: false});
    }, 100);
  }

  toggle () {
    this.setState({isOpen: !this.state.isOpen});
  }

  open () {
    this.setState({isOpen: true});
  }

  close () {
    this.setState({isOpen: false});
  }

  renderChildren (childType) {
    const {children} = this.props;
    let options = '';

    React.Children.forEach(children, child => {
      if (child.type === childType) {
        options = React.cloneElement(child);
      }
    });

    return options;
  }

  render () {
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    const {direction, align} = this.props;
    const {isOpen} = this.state;

    return (
      <div
        className={`${styles.container} ${styles[direction]} ${styles[align]}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
        ref={node => this.node = node}>
        {this.renderChildren(DropDownSelector)}
        {isOpen &&
          this.renderChildren(DropDownItems)}
      </div>
    );
  }
}
