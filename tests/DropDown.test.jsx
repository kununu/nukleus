import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import {
  DropDown,
  DropDownSelector,
  DropDownItems,
  DropDownItem
} from 'DropDown'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders DropDown without crashing', () => {
  const component = renderer.create(
    <DropDown>
      <DropDownSelector>
        <DropDownItem isActive>
          <a href="/">Products</a>
        </DropDownItem>
      </DropDownSelector>
      <DropDownItems>
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
      </DropDownItems>
    </DropDown>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders with align right and showOnHover false', () => {
  const component = renderer.create(
    <DropDown
      align="right"
      showOnHover={false}>
      <DropDownSelector>
        <DropDownItem
          isActive={true}
          icon={<span aria-label="at" role="img">🇦🇹</span>}>
          <a href="/">Österreich</a>
        </DropDownItem>
      </DropDownSelector>
      <DropDownItems>
        <DropDownItem
          icon={<span aria-label="at" role="img">🇦🇹</span>}>
          <a href="/">Österreich</a>
        </DropDownItem>
        <DropDownItem
          icon={<span aria-label="de" role="img">🇩🇪</span>}>
          <a href="/de">Deutschland</a>
        </DropDownItem>
        <DropDownItem
          icon={<span aria-label="ch" role="img">🇨🇭</span>}>
          <a href="/ch">Schweiz</a>
        </DropDownItem>
        <DropDownItem
          icon={<span aria-label="us" role="img">🇺🇸</span>}>
          <a href="/us">United States</a>
        </DropDownItem>
      </DropDownItems>
    </DropDown>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders with direction up', () => {
  const component = renderer.create(
    <DropDown
      direction="up">
      <DropDownSelector>
        <DropDownItem
          isActive={true}
          icon={<span aria-label="at" role="img">🇦🇹</span>}>
          <a href="/">Österreich</a>
        </DropDownItem>
      </DropDownSelector>
      <DropDownItems>
        <DropDownItem
          icon={<span aria-label="us" role="img">🇺🇸</span>}>
          <a href="/us">United States</a>
        </DropDownItem>
      </DropDownItems>
    </DropDown>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders menu when button is clicked', () => {
  const component = mount(
    <DropDown showOnHover={false}>
      <DropDownSelector>
        <DropDownItem
          isActive={true}
          icon={<span aria-label="us" role="img">🇺🇸</span>}>
          <a href="/us">United States</a>
        </DropDownItem>
      </DropDownSelector>
      <DropDownItems>
        <DropDownItem
          icon={<span aria-label="at" role="img">🇦🇹</span>}>
          <a href="/">Österreich</a>
        </DropDownItem>
      </DropDownItems>
    </DropDown>
  );

  component.find('div.selectedItem a').simulate('click');
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('Closes menu when document is clicked', () => {
  const component = mount(
    <DropDown showOnHover={false}>
      <DropDownSelector>
        <DropDownItem
          isActive={true}
          icon={<span aria-label="de" role="img">🇩🇪</span>}>
          <a href="/de">Deutschland</a>
        </DropDownItem>
      </DropDownSelector>
      <DropDownItems>
        <DropDownItem
          icon={<span aria-label="ch" role="img">🇨🇭</span>}>
          <a href="/ch">Schweiz</a>
        </DropDownItem>
      </DropDownItems>
    </DropDown>
  );

  component.find('div.selectedItem a').simulate('click');
  component.find('div.selectedItem a').simulate('click');

  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test.skip('Renders menu when hovered', () => {
  const component = mount(
    <DropDown>
      <DropDownSelector>
        <DropDownItem>
          <a href="/">Österreich</a>
        </DropDownItem>
      </DropDownSelector>
      <DropDownItems>
        <DropDownItem>
          <a href="/ch">Schweiz</a>
        </DropDownItem>
      </DropDownItems>
    </DropDown>
  );

  console.log(component.debug());
  component.find('div.selectedItem a').simulate('mouseenter');
  console.log(component.debug());
  // component.find('div.selectedItem a').simulate('click');

  // const tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

test.skip('Renders menu when hovered', () => {
  const component = mount(
    <DropDown showOnHover={false}>
      <DropDownSelector>
        <DropDownItem>
          <a href="/">Österreich</a>
        </DropDownItem>
      </DropDownSelector>
      <DropDownItems>
        <DropDownItem>
          <a href="/ch">Schweiz</a>
        </DropDownItem>
      </DropDownItems>
    </DropDown>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders correctly when no icon is provided', () => {
  const component = renderer.create(
    <DropDown showOnHover={false}>
      <DropDownSelector>
        <DropDownItem>
          <a href="/">Österreich</a>
        </DropDownItem>
      </DropDownSelector>
      <DropDownItems>
        <DropDownItem>
          <a href="/ch">Schweiz</a>
        </DropDownItem>
      </DropDownItems>
    </DropDown>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
