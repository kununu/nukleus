import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import MultipleChoice from 'MultipleChoice'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const spyFunc = jest.fn();

const choice = (
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
        value: 'test'
      }
    ]
  } />
);

const choiceWithButton = (
  <MultipleChoice
    name="choice[]"
    heading="Button Choice"
    inputStyle="buttons"
    isRequired
    choices={
    [
      {
        id: 'option-1',
        isChecked: false,
        label: 'test',
        value: 'test'
      }
    ]
  } />
);

const choices = (
  <MultipleChoice
    name="choice[]"
    heading="MultipleChoice"
    choices={
    [{
      id: 'option-1',
      isChecked: false,
      label: 'option 1',
      value: 'option-1'
    },
    {
      id: 'option-2',
      isChecked: false,
      label: 'option 2',
      value: 'option-2'
    },
    {
      id: 'option-3',
      isChecked: false,
      label: 'option 3',
      value: 'option-2'
    },
    {
      id: 'option-4',
      isChecked: false,
      label: 'option 4',
      value: 'option-4'
    }]} />
);

test('Renders choice without crashing', () => {
  const component = renderer.create(choice);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Changes status on choice change', () => {
  const component = mount(choice);
  component.find('input').simulate('change');
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders choices without crashing', () => {
  const component = renderer.create(choices);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders choices with inputStyle buttons withouth crashing', () => {
  const component = renderer.create(choiceWithButton);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Change status of choices change', () => {
  const component = mount(choices);
  component.find({value: 'option-1'}).simulate('change');
  component.find({value: 'option-4'}).simulate('change');
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders an error if errors prop is set', () => {
  const component = mount(
    <MultipleChoice
      name="choice[]"
      heading="Button Choice"
      inputStyle="buttons"
      error="error"
      errorSubInfo="Subinfo"
      isRequired
      choices={
      [
        {
          id: 'option-1',
          isChecked: false,
          label: 'test',
          value: 'test'
        }
      ]
    } />
  );
  expect(toJson(component)).toMatchSnapshot();
});

test('Fires on change function', () => {
  const component = mount(choice);
  component.find('input').simulate('click');
  expect(spyFunc).toHaveBeenCalled();
});

test('Changing a choice returns correct values in onChange Event', done => {
  const initialChoices = [
    {
      id: 'option-1',
      isChecked: false,
      label: 'test',
      value: 'option-1'
    },
    {
      id: 'option-2',
      isChecked: false,
      label: 'test',
      value: 'option-2'
    },
    {
      id: 'option-3',
      isChecked: false,
      label: 'test',
      value: 'option-3'
    }
  ];

  const updatedChoices = initialChoices.map(ch => {
    if (ch.id === 'option-2') {
      return {
        ...ch,
        isChecked: true
      };
    }
    return ch;
  });

  const component = mount(<MultipleChoice
    name="choice[]"
    heading="Button Choice"
    inputStyle="buttons"
    isRequired
    onChange={(ch, allChoices) => {
      expect(allChoices).toEqual(updatedChoices);
      done();
    }}
    choices={initialChoices} />
  );
  component.find({value: 'option-2'}).simulate('change');
});

describe('Multiple Choice Events', () => {
  const initialChoices = [
    {
      id: 'option-1',
      isChecked: false,
      label: 'test',
      value: 'option-1'
    },
    {
      id: 'option-2',
      isChecked: false,
      label: 'test',
      value: 'option-2'
    },
    {
      id: 'option-3',
      isChecked: false,
      label: 'test',
      value: 'option-3'
    }
  ];

  it('Focusing a MultipleChoice calls the onFocus Event', () => {
    const mocked = jest.fn();
    const component = mount(
      <MultipleChoice
        name="test[]"
        heading="Button Choice"
        inputStyle="buttons"
        isRequired
        onFocus={mocked}
        choices={initialChoices} />
      );

      component.find('[type="checkbox"]').first().simulate('focus');
      expect(mocked.mock.calls.length).toBe(1);
    });

    it('Bluring a MultipleChoice calls the onBlur Event', () => {
      const mocked = jest.fn();
      const component = mount(
        <MultipleChoice
          name="test[]"
          heading="Button Choice"
          inputStyle="buttons"
          isRequired
          onBlur={mocked}
          choices={initialChoices} />
        );

        component.find('[type="checkbox"]').first().simulate('focus');
        component.find('[type="checkbox"]').first().simulate('blur');
        expect(mocked.mock.calls.length).toBe(1);
      });
})
