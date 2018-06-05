import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import DropDown from 'DropDown'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies


const items = [
  {
    active: false,
    icon: <img
      alt="Austrian flag"
      src="austrianflag.jpg" />,
    link: <a href="/at" alt="hi">Austria</a>,
    value: 'Austria'
  },
  {
    active: true,
    icon: <img alt="German flag" src="germanflag.jpg" />,
    link: <a href="/de">German</a>,
    value: 'German'
  }
];

test('Renders DropDown without crashing', () => {
  const component = renderer.create(<DropDown
    items={items} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders correct default selection', () => {
  const component = renderer.create(<DropDown
    items={[
        {
          active: true,
          icon: <img alt="Austrian flag" src="austrianflag.jpg" />,
          link: <a href="/at" alt="hi">Austria</a>,
          value: 'Austria'
        },
        {
          active: false,
          icon: <img alt="German flag" src="germanflag.jpg" />,
          link: <a href="/de">German</a>,
          value: 'German'
        }
      ]} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders menu when button is clicked', () => {
  const component = mount(<DropDown
    items={items} />);
  component.find('button').simulate('click');
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('Closes menu when document is clicked', () => {
  const component = mount(<DropDown
    items={items} />);
  component.find('button').simulate('click');
  component.find('button').simulate('click');
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('Renders correctly when no icon is provided', () => {
  const component = renderer.create(<DropDown
    items={[
        {
          active: true,
          link: <a href="/at" alt="hi">Austria</a>,
          value: 'Austria'
        },
        {
          active: false,
          link: <a href="/de">German</a>,
          value: 'German'
        }
      ]} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Updates selection on item click', () => {
  const component = mount(<DropDown
    items={items} />);
  component.last('li').simulate('click');
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
