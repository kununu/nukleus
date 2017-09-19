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
        <h1>{JSON.stringify(this.state.modalOpen)}</h1>
        <Button
          type="primary"
          text="Open Modal"
          onClick={() => this.setState({modalOpen: true})} />
        <Modal
          titleText="dafuq"
          open={this.state.modalOpen}
          state={this.state}
          onClose={() => this.setState({modalOpen: false})}
          onSuccess={() => this.setState({success: true})}>
          <p>O rly ?</p>
        </Modal>
      </div>
    );
  }

}
