import React, {Component} from 'react';

import {Modal, Button} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

class ModalDocs extends Component {
  constructor (props) {
    super(props);

    this.state = {
      modalOpen: false // eslint-disable-line react/no-unused-state
    };
  }

  render () {
    return (
      <DocsRoot
        title="Modal"
        component={
          <div>
            <p>Use this button, to show the modal</p>
            <Button
              type="primary"
              text="Open Modal"
              onClick={() => this.setState({modalOpen: true})} />
            <Modal
              titleText="Nukleus Modal"
              open={this.state.modalOpen}
              state={this.state}
              actionText="Ok"
              cancelText="Cancel"
              onExit={() => this.setState({modalOpen: false})}
              onAction={() => this.setState({
                modalOpen: false,
                success: true // eslint-disable-line react/no-unused-state
              })}>
              <p>With dynamic content</p>
            </Modal>
          </div>
        }
        example={example}
        propsDefinition={propsDefinition}
        propsDefault={propsDefault} />
    );
  }
}

export default ModalDocs;
