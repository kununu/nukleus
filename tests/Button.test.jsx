import React from 'react';
import {Link} from 'react-router-dom';
import {StaticRouter} from 'react-router'
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import Button from 'Button'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders button without crashing', () => {
  const component = renderer.create(<Button text="Test" onClick={() => {}} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders simple anchor button without crashing', () => {
  const component = renderer.create(<Button
    text="Test"
    link={<a href="/">Button</a>} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders react-router anchor button without crashing', () => {
  const component = renderer.create((
    <StaticRouter location="test" context={{}}>
      <Button
        text="Test"
        link={<Link to={{pathname: '/test'}}>Button</Link>} />
    </StaticRouter>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a disabled Button', () => {
  const component = renderer.create(<Button text="Test" onClick={() => {}} disabled />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Button with outline', () => {
  const component = renderer.create(<Button text="Test" onClick={() => {}} outline />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a full width button', () => {
  const component = renderer.create(<Button text="Test" onClick={() => {}} fullWidth />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Renders a mobile full width button', () => {
  const component = renderer.create(<Button text="Test" onClick={() => {}} mobileFullWidth />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a custom theme button', () => {
  const component = renderer.create(<Button text="Test" onClick={() => {}} type="custom" customTheme="customCssModuleClass" />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Fires onClick function when clicked', () => {
  const spyFunc = jest.fn();
  const component = mount(<Button text="Test" onClick={spyFunc} />);

  component.find('.button').simulate('click');
  expect(spyFunc).toHaveBeenCalled();
});

test('Does not fire onClick function when clicked if the button is disabled', () => {
  const spyFunc = jest.fn();
  const component = mount(<Button text="Test" onClick={spyFunc} disabled />);

  component.find('.button').simulate('click');
  expect(spyFunc).not.toHaveBeenCalled();
});
