import React from 'react';

import Modal from '../../components/Modal';
import Button from '../../components/Button';

export default class ModalImplementation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      success: false
    };
  }

  onAction = () => new Promise(resolve => {
    this.setState({
      success: true
    }, resolve);
  });

  onExit = () => {
    this.setState({modalOpen: false});
  }

  render () {
    return (
      <div>
        <h1>Modal is open: {JSON.stringify(this.state.modalOpen)}</h1>
        <Button
          type="primary"
          text="Open Modal"
          id="toggle-modal"
          onClick={() => this.setState({modalOpen: true})} />
        <Modal
          titleText="dafuq"
          open={this.state.modalOpen}
          state={this.state}
          actionText="Ok"
          cancelText="Cancel"
          onExit={this.onExit}
          onAction={this.onAction}>
          <p>O rly ?</p>
        </Modal>
      </div>
    );
  }

}
