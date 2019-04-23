import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {DropDown, DropDownItem} from 'DropDown'; // eslint-disable-line import/no-unresolved
import * as themeable from '../utils/theming';

themeable.default = () => (...args) => Array.isArray(args) ? args.join(' ') : args;

test('Renders DropDown without crashing', () => {
  const component = renderer.create((
    <DropDown title="Products">
      <DropDownItem>
        <a href="/">Bathroom</a>
      </DropDownItem>
      <DropDownItem>
        <a href="/">Bedroom</a>
      </DropDownItem>
      <DropDownItem>
        <a href="/">Cooking</a>
      </DropDownItem>
      <DropDownItem>
        <a href="/">Decoration</a>
      </DropDownItem>
      <DropDownItem>
        <a href="/">Home Electronics</a>
      </DropDownItem>
    </DropDown>
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders with pullRight and showOnHover false', () => {
  const component = renderer.create((
    <DropDown
      pullRight
      showOnHover={false}
      title={(
        <span>
          Österreich
          <span
            aria-label="at"
            role="img"
          >
            🇦🇹
          </span>
        </span>
      )}
    >
      <DropDownItem
        icon={(
          <span
            aria-label="at"
            role="img"
          >
            🇦🇹
          </span>
        )}
      >
        <a href="/">Österreich</a>
      </DropDownItem>
      <DropDownItem
        icon={(
          <span
            aria-label="de"
            role="img"
          >
            🇩🇪
          </span>
        )}
      >
        <a href="/de">Deutschland</a>
      </DropDownItem>
      <DropDownItem
        icon={(
          <span
            aria-label="ch"
            role="img"
          >
            🇨🇭
          </span>
        )}
      >
        <a href="/ch">Schweiz</a>
      </DropDownItem>
      <DropDownItem
        icon={(
          <span
            aria-label="us"
            role="img"
          >
            🇺🇸
          </span>
        )}
      >
        <a href="/us">United States</a>
      </DropDownItem>
    </DropDown>
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders with direction up', () => {
  const component = renderer.create((
    <DropDown
      direction="up"
      title={(
        <span>
          Österreich
          <span
            aria-label="at"
            role="img"
          >
            🇦🇹
          </span>
        </span>
      )}
    >
      <DropDownItem
        icon={(
          <span
            aria-label="us"
            role="img"
          >
            🇺🇸
          </span>
        )}
      >
        <a href="/us">United States</a>
      </DropDownItem>
    </DropDown>
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders menu when button is clicked', () => {
  const component = mount((
    <DropDown
      showOnHover={false}
      title={(
        <span>
          United States
          <span
            aria-label="us"
            role="img"
          >
            🇺🇸
          </span>
        </span>
      )}
    >
      <DropDownItem
        icon={(
          <span
            aria-label="at"
            role="img"
          >
            🇦🇹
          </span>
        )}
      >
        <a href="/">Österreich</a>
      </DropDownItem>
    </DropDown>
  ));

  component.find('.container button').simulate('click');

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});

test('Renders menu when hovered', () => {
  const component = mount((
    <DropDown title="Österreich">
      <DropDownItem>
        <a href="/ch">Schweiz</a>
      </DropDownItem>
    </DropDown>
  ));

  component.find('.container button').simulate('mouseenter');

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});

test('Closes menu when not hovered', () => {
  const component = mount((
    <DropDown title="Österreich">
      <DropDownItem>
        <a href="/ch">Schweiz</a>
      </DropDownItem>
    </DropDown>
  ));

  component.find('.container button').simulate('mouseenter');
  component.find('.container button').simulate('mouseleave');

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});

test('Does not open menu when hovered while showOnHover is enabled', () => {
  const component = mount((
    <DropDown
      showOnHover={false}
      title="Österreich"
    >
      <DropDownItem>
        <a href="/ch">Schweiz</a>
      </DropDownItem>
    </DropDown>
  ));

  component.find('.container button').simulate('mouseenter');
  component.find('.container button').simulate('mouseleave');

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});

test('Renders correctly when no icon is provided', () => {
  const component = renderer.create((
    <DropDown
      showOnHover={false}
      title="Österreich"
    >
      <DropDownItem>
        <a href="/ch">Schweiz</a>
      </DropDownItem>
    </DropDown>
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders with light shade', () => {
  const component = renderer.create((
    <DropDown
      direction="up"
      shade="light"
      showOnHover={false}
      pullRight
      title={(
        <span>
United States
          <img
            title="American Flag"
            alt="American Flag"
            src="https://assets.kununu.com/images/footer/us.png"
          />
        </span>
)}
    >
      <DropDownItem icon={(
        <img
          title="American Flag"
          alt="American Flag"
          src="https://assets.kununu.com/images/footer/us.png"
        />
)}
      >
        <a href="/us">United States</a>
      </DropDownItem>
    </DropDown>
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Unmount triggers lifecycle method', () => {
  const component = mount((
    <DropDown title="Österreich">
      <DropDownItem>
        <a href="/ch">Schweiz</a>
      </DropDownItem>
    </DropDown>
  ));

  component.unmount();

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});
