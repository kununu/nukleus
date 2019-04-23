import React from 'react';
import {Link} from 'react-router-dom';
import {StaticRouter} from 'react-router';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import Button from 'Button'; // eslint-disable-line import/no-unresolved
import * as themeable from '../utils/theming';
import { isArray } from 'util';

describe('Button tests: ', () => {
  beforeEach(() => {
    themeable.default = () => (...args) => Array.isArray(args) ? args.join(' ') : args;
  });

  it('Renders button without crashing', () => {
    const component = renderer.create(<Button
      text="Test"
      onClick={() => {}}
    />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders simple anchor button without crashing', () => {
    const component = renderer.create(<Button
      text="Test"
      link={<a href="/">Button</a>}
    />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders react-router anchor button without crashing', () => {
    const component = renderer.create((
      <StaticRouter
        location="test"
        context={{}}
      >
        <Button
          text="Test"
          link={<Link to={{pathname: '/test'}}>Button</Link>}
        />
      </StaticRouter>
    ));

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders a disabled Button', () => {
    const component = renderer.create(<Button
      text="Test"
      onClick={() => {}}
      disabled
    />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders Button with outline', () => {
    const component = renderer.create(<Button
      text="Test"
      onClick={() => {}}
      outline
    />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders a full width button', () => {
    const component = renderer.create(<Button
      text="Test"
      onClick={() => {}}
      fullWidth
    />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });


  it('Renders a mobile full width button', () => {
    const component = renderer.create(<Button
      text="Test"
      onClick={() => {}}
      mobileFullWidth
    />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders a custom theme button', () => {
    const component = renderer.create(<Button
      text="Test"
      onClick={() => {}}
      type="custom"
      customTheme="customCssModuleClass"
    />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Fires onClick function when clicked', () => {
    const spyFunc = jest.fn();
    const component = mount(<Button
      text="Test"
      onClick={spyFunc}
    />);

    component.find('.button').simulate('click');
    expect(spyFunc).toHaveBeenCalled();
  });

  it('Does not fire onClick function when clicked if the button is disabled', () => {
    const spyFunc = jest.fn();
    const component = mount(<Button
      text="Test"
      onClick={spyFunc}
      disabled
    />);

    component.find('.button').simulate('click');
    expect(spyFunc).not.toHaveBeenCalled();
  });

  it('can have optional ID attribute', () => {
    const component = renderer.create(<Button
      text="Test"
      onClick={() => {}}
      id="someId"
    />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
})
