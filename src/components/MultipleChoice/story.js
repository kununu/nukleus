import React, {useState} from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withKnobs, text} from '@storybook/addon-knobs/react';
import {withInfo} from '@storybook/addon-info';

import ThemeProvider from '../ThemeProvider';

import customTheme from './customTheme.scss';

import MultipleChoice from './index';

const Test = () => {
  const stuff = [
    {
      id: 'option-a',
      isChecked: false,
      label: 'option a',
      value: true,
    },
    {
      id: 'option-b',
      isChecked: true,
      label: 'option b',
      value: false,
    }
  ];

  const [test, setTest] = useState(stuff);
  const updateTest = () => {
    setTest([
      ...stuff,
      {
        id: 'option-c',
        isChecked: true,
        label: 'option c',
        value: false,
      }
    ]);
  }
  return (
    <>
      <button onClick={() => updateTest()}>hi</button>
      <MultipleChoice
        name="choices"
        label={text('label', 'MultipleChoice')}
        options={test}
      />
    </>
  )
};

storiesOf('MultipleChoice', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The MultipleChoice component!')(story)(context))
  .add('basics', () => (
    <Test />
  ))
  .add('Button style', () => (
    <MultipleChoice
      label={text('label', 'MultipleChoice')}
      name="choices[]"
      inputStyle="buttons"
      options={
      [{
        id: 'option-1',
        isChecked: true,
        label: 'Elephant',
        value: 'option-1',
      },
      {
        id: 'option-2',
        isChecked: false,
        label: 'Fox',
        value: 'option-2',
      },
      {
        id: 'option-3',
        isChecked: false,
        label: 'Dog',
        value: 'option-3',
      },
      {
        id: 'option-4',
        isChecked: false,
        label: 'Dasypus novemcinctus',
        value: 'option-4',
      },
      {
        id: 'option-5',
        isChecked: false,
        label: 'Horse',
        value: 'option-5',
      },
      {
        id: 'option-6',
        isChecked: false,
        label: 'Chimpanzee',
        value: 'option-6',
      },
      {
        id: 'option-7',
        isChecked: false,
        label: 'Goldfish',
        value: 'option-7',
      }]}
    />
  ))
  .add('Custom', () => (
    <ThemeProvider theme={customTheme}>
      <MultipleChoice
        label={text('label', 'MultipleChoice')}
        name="choices[]"
        inputStyle="buttons"
        options={
        [{
          id: 'option-1',
          isChecked: true,
          label: 'Elephant',
          value: 'option-1',
        },
        {
          id: 'option-2',
          isChecked: false,
          label: 'Fox',
          value: 'option-2',
        },
        {
          id: 'option-3',
          isChecked: false,
          label: 'Dog',
          value: 'option-3',
        },
        {
          id: 'option-4',
          isChecked: false,
          label: 'Dasypus novemcinctus',
          value: 'option-4',
        },
        {
          id: 'option-5',
          isChecked: false,
          label: 'Horse',
          value: 'option-5',
        },
        {
          id: 'option-6',
          isChecked: false,
          label: 'Chimpanzee',
          value: 'option-6',
        },
        {
          id: 'option-7',
          isChecked: false,
          label: 'Goldfish',
          value: 'option-7',
        }]}
      />
    </ThemeProvider>
  ));
