import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import ToolTip from 'ToolTip';

// requestAnimationFrame isn't supported by node
if (!window.requestAnimationFrame) {
  const targetTime = 0;
  window.requestAnimationFrame = function requestAnimationFrame (callbackFun) {
    const currentTime = +new Date();
    function timeoutCb () { callbackFun(+new Date()); }
    return window.setTimeout(timeoutCb, Math.max(targetTime + 16, currentTime) - currentTime);
  };
}

test('Renders ToolTip component without crashing', () => {
  const component = renderer.create(<ToolTip label="Test" content="More Test Info" />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders ToolTip component with content as Object', () => {
  const component = renderer.create(<ToolTip label="Test" content={<span>More Test <span>Info</span></span>} />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Hovering on the ToolTip Button shows an InfoBox', () => {
  const component = mount(<ToolTip label="Test" content="More Test Info" />);
  component.find('button').simulate('mouseenter');
  expect(toJson(component)).toMatchSnapshot();
});

test('Hovering on the ToolTip Button shows an InfoBox with Content as Object', () => {
  const component = mount(<ToolTip label="Test" content={<span>More Test <span>Info</span></span>} />);
  component.find('button').simulate('mouseenter');
  expect(toJson(component)).toMatchSnapshot();
});

test('Hovering and then leaving the ToolTip Button shows an InfoBox', () => {
  const component = mount(<ToolTip label="Test" content="More Test Info" />);
  component.find('button').simulate('mouseenter');
  component.find('button').simulate('mouseleave');
  expect(toJson(component)).toMatchSnapshot();
});

test('Clicking on the ToolTip Button shows an InfoBox', () => {
  const component = mount(<ToolTip label="Test" content="More Test Info" />);
  component.find('button').simulate('click');
  expect(toJson(component)).toMatchSnapshot();
});

test('Clicking twice on a ToolTip Button hides the InfoBox', () => {
  const component = mount(<ToolTip label="Test" content="More Test Info" />);
  component.find('button').simulate('click');
  component.find('button').simulate('click');
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders correct position bottomRight', () => {
  const component = mount(<ToolTip label="Test" position="bottomRight" content="More Test Info" />);
  component.find('button').simulate('click');
  expect(toJson(component)).toMatchSnapshot();
});
