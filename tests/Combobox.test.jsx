import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Combobox from 'Combobox'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const combobox = (
  <Combobox
    name="name"
    label="Combobox"
    id="name"
    required
    placeholder="Type m"
    keyName="name"
    items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
);

test('Renders Combobox without crashing', () => {
  const component = renderer.create(combobox);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Causes dropdown to show when input is focused', () => {
  const component = mount(combobox);
  component.find('input#name').simulate('focus');
  expect(toJson(component)).toMatchSnapshot();
});
