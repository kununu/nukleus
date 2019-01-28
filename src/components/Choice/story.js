import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {
  withKnobs, text, boolean, number,
} from '@storybook/addon-knobs/react';

import Choice from './index';

storiesOf('Choice', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The choice component should be used to replace radio groups in forms. This component can work with up to 7 options per row, any more and it will start to look bad. With our radio groups you can even deselect unless you provide the required true option')(story)(context))
  .add('basics', () => (
    <div>
      <h3>Basic choice with 3 options</h3>
      <Choice
        label={text('label', 'Choice')}
        labelHidden={boolean('labelHidden', false)}
        name="basic"
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
        onClick={action('onClick')}
        checked={text('checked', 'option-a')}
        optionsPerRow={number(
          'optionsPerRow',
          '3',
          {
            max: 7,
            min: 1,
            range: true,
          },
        )}
        options={[
          {
            id: 'option-a',
            label: 'Option A',
            value: 'option-a',
          },
          {
            id: 'option-b',
            label: 'Option B',
            value: 'option-b',
          },
          {
            id: 'option-c',
            label: 'Option C',
            value: 'option-c',
          },
        ]}
      />

      <br />
      <hr />

      <h3>Basic required choice with 6 options</h3>
      <Choice
        label="Choice"
        labelHidden={boolean('labelHidden', false)}
        name="multiple-rows"
        disabled={boolean('disabled', false)}
        required
        requiredLabel={text('requiredLabel', 'required')}
        onChange={action('onChange')}
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
        onClick={action('onClick')}
        optionsPerRow={number(
          'optionsPerRow',
          '3',
          {
            max: 7,
            min: 1,
            range: true,
          },
        )}
        checked="option-per-row-a"
        options={[
          {
            id: 'option-per-row-a',
            label: 'Option A',
            value: 'option-per-row-a',
          },
          {
            id: 'option-per-row-b',
            label: 'Option B',
            value: 'option-per-row-b',
          },
          {
            id: 'option-per-row-c',
            label: 'Option C',
            value: 'option-per-row-c',
          },
          {
            id: 'option-per-row-d',
            label: 'Option D',
            value: 'option-per-row-d',
          },
          {
            id: 'option-per-row-e',
            label: 'Option E',
            value: 'option-per-row-e',
          },
          {
            id: 'option-per-row-f',
            label: 'Option F',
            value: 'option-per-row-f',
          },
        ]}
      />
    </div>
  ));
