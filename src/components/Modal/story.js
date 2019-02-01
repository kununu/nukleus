import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text} from '@storybook/addon-knobs/react';

import Button from '../Button';

import Modal from './index';

class ModalExample extends Component {
  constructor (props) {
    super(props);

    this.state = {modalOpen: false}; // eslint-disable-line react/no-unused-state
  }

  render () {
    const {modalOpen} = this.state;

    return (
      <div>
        <p>Use this button, to show the modal</p>
        <Button
          type="primary"
          text="Open Modal"
          onClick={() => this.setState({modalOpen: true})}
        />
        <Modal
          titleText={text('titleText', 'Nukleus Modal')}
          open={modalOpen}
          state={this.state}
          actionText={text('actionText', 'Ok')}
          cancelText={text('cancelText', 'Cancel')}
          onExit={() => this.setState({modalOpen: false})}
          onAction={() => this.setState({
            modalOpen: false,
            success: true, // eslint-disable-line react/no-unused-state
          })}
        >
          <p>{text('dynamic text content', 'dynamic text content')}</p>
        </Modal>
      </div>
    );
  }
}

storiesOf('Modal', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The modal component! You can wrap any children components that you like in this fabulous modal.')(story)(context))
  .add('basics', () => (
    <ModalExample />
  ));
