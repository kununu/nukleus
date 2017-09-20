import React from 'react';
import toJson from 'enzyme-to-json';
import {mount} from 'enzyme';
import Modal from 'Modal'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Modal without crashing', () => {
  const component = mount(
    <Modal
      actionText="Ok"
      cancelText="Cancel"
      closeText="Close"
      onAction={() => {}}
      onExit={() => {}}
      open
      titleText="Modal">
      <p>Hello world</p>
    </Modal>
  );

  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
