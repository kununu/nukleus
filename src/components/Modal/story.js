import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Button from '../Button';

import Modal from './index';

class ModalExample extends Component {
  constructor (props) {
    super(props);

    this.state = {
      modalOpen: false // eslint-disable-line react/no-unused-state
    };
  }

  render () {
    return (
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
    );
  }
}

storiesOf('Modal', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
    <ModalExample />
  ));
