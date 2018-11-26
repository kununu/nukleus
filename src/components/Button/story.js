import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';

import Button from './index';

storiesOf('Button', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The button component!')(story)(context))
  .add('basics', () => (
    <div>
      <h3>
        Primary button
      </h3>
      <Button
        type="primary"
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
        mobileFullWidth={boolean('mobileFullWidth', false)}
        onClick={action('click')}
        outline={boolean('outline', false)}
        text={text('text', 'button')} />

      <hr />

      <h3>
      Secondary button
      </h3>
      <Button
        type="secondary"
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
        mobileFullWidth={boolean('mobileFullWidth', false)}
        onClick={action('click')}
        outline={boolean('outline', false)}
        text={text('text', 'button')} />

      <hr />

      <h3>
      Info button
      </h3>
      <Button
        type="info"
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
        mobileFullWidth={boolean('mobileFullWidth', false)}
        onClick={action('click')}
        outline={boolean('outline', false)}
        text={text('text', 'button')} />

      <hr />

      <h3>
      Danger button
      </h3>
      <Button
        type="danger"
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
        mobileFullWidth={boolean('mobileFullWidth', false)}
        onClick={action('click')}
        outline={boolean('outline', false)}
        text={text('text', 'button')} />

      <hr />

      <h3>
      Default button
      </h3>
      <Button
        type="default"
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
        mobileFullWidth={boolean('mobileFullWidth', false)}
        onClick={action('click')}
        outline={boolean('outline', false)}
        text={text('text', 'button')} />

      <hr />
    </div>
  ))
  .add('custom', () => (
    <div>
      <h3>
      Button that is an link
      </h3>
      <Button
        type="primary"
        link={<a href="/">{text('link text', 'I am a link!')}</a>}
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
        mobileFullWidth={boolean('mobileFullWidth', false)}
        onClick={action('click')}
        outline={boolean('outline', false)}
        text={text('text', 'button')} />

      <hr />

      <h3>
      Custom button with no styling
      </h3>
      <Button
        type="custom"
        disabled={boolean('disabled', false)}
        fullWidth={boolean('fullWidth', false)}
        mobileFullWidth={boolean('mobileFullWidth', false)}
        onClick={action('click')}
        outline={boolean('outline', false)}
        text={text('text', 'button')} />

    </div>
  ));
