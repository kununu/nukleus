import React from 'react';
import {Link} from 'react-router';
import renderer from 'react-test-renderer';
import Tabs from 'Tabs'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Tabs with react-router links as items without crashing', () => {
  const component = renderer.create(
    <Tabs
      items={[
        <Link to={{pathname: '/playground/'}}>First Tab</Link>,
        <Link to={{pathname: '/playground/2'}}>Second Tab</Link>,
        <Link to={{pathname: '/playground/3'}}>Third Tab</Link>
      ]}
      pathname={'test'} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Tabs with simple links as items without crashing', () => {
  const component = renderer.create(
    <Tabs
      items={[
        <a href="/playground/">First Tab</a>,
        <a href="/playground/2">Second Tab</a>,
        <a href="/playground/3">Third Tab</a>
      ]}
      pathname={'test'} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Tabs using kununuNav theme without crashing', () => {
  const component = renderer.create(
    <Tabs
      items={[
        <a href="/playground/">First Tab</a>,
        <a href="/playground/2">Second Tab</a>,
        <a href="/playground/3">Third Tab</a>
      ]}
      pathname={'test'}
      theme="kununuNav" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Throws error when not supported theme given', () => {
  global.console = {
    error: jest.fn()
  };
  renderer.create(
    <Tabs
      items={[
        <a href="/playground/">First Tab</a>,
        <a href="/playground/2">Second Tab</a>,
        <a href="/playground/3">Third Tab</a>
      ]}
      pathname={'test'}
      theme="NOT_EXISTENT_THEME" />
  );
  // eslint-disable-line no-console
  expect(console.error).toHaveBeenCalled();
});
