import React from 'react';

import Modal from 'components/Modal';
import Button from 'components/Button';

export default class ModalImplementation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      success: false
    };
  }

  render () {
    return (
      <div>
        <h1>Modal is open: {JSON.stringify(this.state.modalOpen)}</h1>
        <Button
          type="primary"
          text="Open Modal"
          onClick={() => this.setState({modalOpen: true})} />
        <Modal
          titleText="dafuq"
          open={this.state.modalOpen}
          state={this.state}
          actionText="Ok"
          cancelText="Cancel"
          onCancel={() => this.setState({modalOpen: false})}
          onAction={() => this.setState({
            modalOpen: false,
            success: true
          })}>
          <p>O rly ?</p>
        </Modal>
      </div>
    );
  }

}
