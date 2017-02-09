import React, {Component, PropTypes} from 'react';
// import ReactDOM from 'react-dom';

import styles from './index.scss';

export default class Dropdown extends Component {

  static propTypes = {
    items: PropTypes.array
  };

  static defaultProps = {
    items: []
  }

  state = {
    isMounted: true,
    isOpen: false,
    selected: this.getSelection()
  }


  componentWillMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  onButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onItemClick = item => {
    this.setState({
      selected: item
    });
  }

  getSelection () {
    const selected = this.props.items.filter(item => item.active);
    return selected.length ? selected : this.props.items[0];
  }

  isButtonElement (e) {
    return this.node.contains(e.target);
  }

  handleDocumentClick = e => {
    if (this.state.isMounted && !this.isButtonElement(e)) {
      this.setState({
        isOpen: false
      });
    }
  }

  render () {
    const {
      items
    } = this.props;

    return (
      <div className={styles.container}>
        <button
          ref={node => this.node = node}
          id="cheese"
          className={styles.selection}
          onClick={this.onButtonClick}>
          {this.state.selected.value}
        </button>
        <ul className={`${styles.menu} ${this.state.isOpen ? styles.open : ''}`}>
          {items.map((item, index) =>
            <li // eslint-disable-line
              key={index}
              onClick={() => this.onItemClick(item)}>{item.value}</li>
          )}
        </ul>
      </div>
    );
  }
}
