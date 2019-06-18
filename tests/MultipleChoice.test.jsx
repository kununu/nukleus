import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import MultipleChoice from 'MultipleChoice'; // eslint-disable-line import/no-unresolved

import * as themeable from '../utils/theming';

themeable.default = () => (...args) => Array.isArray(args) ? args.join(' ') : args;

const spyFunc = jest.fn();

const deprecatedMultipleChoice = (
  <MultipleChoice
    name="choice[]"
    heading="Test"
    isRequired
    onChange={spyFunc}
    choices={
    [
      {
        id: 'option-1',
        isChecked: false,
        label: 'test',
        value: 'test',
      },
    ]
  }
  />
);

const multipleChoice = (
  <MultipleChoice
    name="choice[]"
    label="Test"
    isRequired
    onChange={spyFunc}
    options={
    [
      {
        id: 'option-1',
        isChecked: false,
        label: 'test',
        value: 'test',
      },
    ]
  }
  />
);

const multipleChoiceWithButton = (
  <MultipleChoice
    name="choice[]"
    label="Button Choice"
    inputStyle="buttons"
    isRequired
    options={
    [
      {
        id: 'option-1',
        isChecked: false,
        label: 'test',
        value: 'test',
      },
    ]
  }
  />
);

const multipleChoices = (
  <MultipleChoice
    name="choice[]"
    label="MultipleChoice"
    options={
    [{
      id: 'option-1',
      isChecked: false,
      label: 'option 1',
      value: 'option-1',
    },
    {
      id: 'option-2',
      isChecked: false,
      label: 'option 2',
      value: 'option-2',
    },
    {
      id: 'option-3',
      isChecked: false,
      label: 'option 3',
      value: 'option-2',
    },
    {
      id: 'option-4',
      isChecked: false,
      label: 'option 4',
      value: 'option-4',
    }]}
  />
);

test('Renders deprecated MultipleChoice without crashing', () => {
  const component = renderer.create(deprecatedMultipleChoice);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders MultipleChoice without crashing', () => {
  const component = renderer.create(multipleChoice);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Changes status on MultipleChoice onChange', () => {
  const component = mount(multipleChoice);

  component.find('input').simulate('change');
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders MultipleCoices without crashing', () => {
  const component = renderer.create(multipleChoices);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders MultipleChoice with inputStyle buttons without crashing', () => {
  const component = renderer.create(multipleChoiceWithButton);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Change status of MultipleChoice on onChange with lots of options', () => {
  const component = mount(multipleChoices);

  component.find({value: 'option-1'}).simulate('change');
  component.find({value: 'option-4'}).simulate('change');
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders an error if errors prop is set', () => {
  const component = mount(<MultipleChoice
    name="choice[]"
    label="Button Choice"
    inputStyle="buttons"
    error="error"
    errorSubInfo="Subinfo"
    isRequired
    options={
      [
        {
          id: 'option-1',
          isChecked: false,
          label: 'test',
          value: 'test',
        },
      ]
    }
  />);

  expect(toJson(component)).toMatchSnapshot();
});

test('Fires on change function', () => {
  const component = mount(multipleChoice);

  component.find('input').simulate('click');
  expect(spyFunc).toHaveBeenCalled();
});

test('Changing a MultipleChoice returns correct values in onChange Event', (done) => {
  const initialOptions = [
    {
      id: 'option-1',
      isChecked: false,
      label: 'test',
      value: 'option-1',
    },
    {
      id: 'option-2',
      isChecked: false,
      label: 'test',
      value: 'option-2',
    },
    {
      id: 'option-3',
      isChecked: false,
      label: 'test',
      value: 'option-3',
    },
  ];

  const updatedOptions = initialOptions.map((ch) => {
    if (ch.id === 'option-2') {
      return {
        ...ch,
        isChecked: true,
      };
    }
    return ch;
  });

  const component = mount(<MultipleChoice
    name="choice[]"
    label="Button Choice"
    inputStyle="buttons"
    isRequired
    onChange={(ch, allOptions) => {
      expect(allOptions).toEqual(updatedOptions);
      done();
    }}
    options={initialOptions}
  />);

  component.find({value: 'option-2'}).simulate('change');
});

test('Correctly renders MultipleChoice with disabled inputs', () => {
  const choices = [
    {
      id: 'option-1',
      isChecked: false,
      label: 'option 1',
    },
    {
      id: 'option-2',
      isChecked: true,
      label: 'option 2',
    },
  ];

  const allDisabled = renderer.create(
    <MultipleChoice
      inputStyle="buttons"
      name="choices"
      choices={choices}
      disabled="all"
    />,
  );

  expect(allDisabled.toJSON()).toMatchSnapshot();

  const checkedDisabled = renderer.create(
    <MultipleChoice
      name="choices"
      choices={choices}
      disabled="checkedOnly"
    />,
  );

  expect(checkedDisabled.toJSON()).toMatchSnapshot();

  const uncheckedDisabled = renderer.create(
    <MultipleChoice
      inputStyle="buttons"
      name="choices"
      choices={choices}
      disabled="uncheckedOnly"
    />,
  );

  expect(uncheckedDisabled.toJSON()).toMatchSnapshot();
});

describe('MultipleChoice Events', () => {
  const initialOptions = [
    {
      id: 'option-1',
      isChecked: false,
      label: 'test',
      value: 'option-1',
    },
    {
      id: 'option-2',
      isChecked: false,
      label: 'test',
      value: 'option-2',
    },
    {
      id: 'option-3',
      isChecked: false,
      label: 'test',
      value: 'option-3',
    },
  ];

  it('Focusing a MultipleChoice calls the onFocus Event', () => {
    spyFunc.mockClear();
    const component = mount(<MultipleChoice
      name="test[]"
      label="Button Choice"
      inputStyle="buttons"
      isRequired
      onFocus={spyFunc}
      options={initialOptions}
    />);

    component.find('[type="checkbox"]').first().simulate('focus');
    expect(spyFunc.mock.calls.length).toBe(1);
  });

  it('Bluring a MultipleChoice calls the onBlur Event', () => {
    spyFunc.mockClear();
    const component = mount(<MultipleChoice
      name="test[]"
      label="Button Choice"
      inputStyle="buttons"
      isRequired
      onBlur={spyFunc}
      options={initialOptions}
    />);

    component.find('[type="checkbox"]').first().simulate('focus');
    component.find('[type="checkbox"]').first().simulate('blur');
    expect(spyFunc.mock.calls.length).toBe(1);
  });
});
