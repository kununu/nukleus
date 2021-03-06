import React from 'react';
import toJson from 'enzyme-to-json';
import {mount} from 'enzyme';
import Modal from 'Modal'; // eslint-disable-line import/no-unresolved

import * as themeable from '../utils/theming';

themeable.default = () => (...args) => Array.isArray(args) ? args.join(' ') : args;

test('Renders Modal without crashing', () => {
  const component = mount((
    <Modal
      actionText="Ok"
      cancelText="Cancel"
      closeText="Close"
      applicationNode="#test"
      onAction={() => {}}
      onExit={() => {}}
      open
      titleText="Modal"
    >
      <p>Hello world</p>
    </Modal>
  ));

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});

test('Calls onEnter, when the modal is mounted', () => {
  const onEnter = window.spyOn(Modal.prototype, 'onEnter');

  mount((
    <Modal
      actionText="Ok"
      cancelText="Cancel"
      closeText="Close"
      applicationNode="#test"
      onAction={() => {}}
      onExit={() => {}}
      open
      titleText="Modal"
    >
      <p>Hello world</p>
    </Modal>
  ));

  expect(onEnter).toHaveBeenCalled();
});

test('Closes the modal, when the close button is clicked', () => {
  const onExit = window.spyOn(Modal.prototype, 'onExit');
  const component = mount((
    <Modal
      actionText="Ok"
      cancelText="Cancel"
      closeText="Close"
      applicationNode="#test"
      onAction={() => {}}
      onExit={() => {}}
      open
      titleText="Modal"
    >
      <p>Hello world</p>
    </Modal>
  ));

  component.find('#nukleus-modal-close').simulate('click');
  expect(onExit).toHaveBeenCalled();
});

/**
 * It would be cool, if we could rewrite this test in the future, so that it also tests,
 * if onExit was called, when onAction is a promise
 */
test('Fires the onAction when the action button is clicked', () => {
  const spyFunc = jest.fn();

  const component = mount((
    <Modal
      actionText="Ok"
      cancelText="Cancel"
      closeText="Close"
      applicationNode="#test"
      onAction={async () => spyFunc()}
      onExit={() => {}}
      open
      titleText="Modal"
    >
      <p>Hello world</p>
    </Modal>
  ));

  component.find('footer button.primary').hostNodes().simulate('click');

  setTimeout(() => {
    expect(spyFunc).toHaveBeenCalled();
  }, 250);
});

test('Fires the onExit when the close button is clicked', () => {
  const onExit = window.spyOn(Modal.prototype, 'onExit');

  const component = mount((
    <Modal
      actionText="Ok"
      cancelText="Cancel"
      closeText="Close"
      applicationNode="#test"
      onAction={() => {}}
      onExit={() => {}}
      open
      titleText="Modal"
    >
      <p>Hello world</p>
    </Modal>));

  component.find('footer button').last().simulate('click');

  setTimeout(() => {
    expect(onExit).toHaveBeenCalled();
  }, 250);
});
