import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, number} from '@storybook/addon-knobs/react';

import Stars from './index';

storiesOf('Stars', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The star component!')(story)(context))
  .add('basics', () => (
    <div>
      <h3>
        Basic star (not selectable)
      </h3>

      <p>
        You can customize star colors by passing an array of hex colors including the hash to the colors property. The amount of items in the array must match the totalStars count (default 5)
      </p>

      <Stars
        colors={[
          '#ff464e',
          '#fe8e17',
          '#fec327',
          '#7cb532',
          '#96d04a']}
        name="stars"
        onChange={action('onChange')}
        onClick={action('onClick')}
        totalStars={number('totalStars', 5)}
        value={1}
      />

      <Stars
        colors={[
          '#ff464e',
          '#fe8e17',
          '#fec327',
          '#7cb532',
          '#96d04a']}
        name="stars"
        onChange={action('onChange')}
        onClick={action('onClick')}
        totalStars={number('totalStars', 5)}
        value={2}
      />

      <Stars
        colors={[
          '#ff464e',
          '#fe8e17',
          '#fec327',
          '#7cb532',
          '#96d04a']}
        name="stars"
        onChange={action('onChange')}
        onClick={action('onClick')}
        totalStars={number('totalStars', 5)}
        value={3}
      />

      <Stars
        colors={[
          '#ff464e',
          '#fe8e17',
          '#fec327',
          '#7cb532',
          '#96d04a']}
        name="stars"
        onChange={action('onChange')}
        onClick={action('onClick')}
        totalStars={number('totalStars', 5)}
        value={4}
      />

      <Stars
        colors={[
          '#ff464e',
          '#fe8e17',
          '#fec327',
          '#7cb532',
          '#96d04a']}
        name="stars"
        onChange={action('onChange')}
        onClick={action('onClick')}
        totalStars={number('totalStars', 5)}
        value={5}
      />

      <br />
      <hr />

      <h3>
        Selectable star
      </h3>
      <p>
        The selectable stars will fill the width of the container so it is important to size the container appropriately. One awesome feature is that the stars are completely user friendly for all users and can be used with just keyboard
      </p>

      <div style={{maxWidth: '300px'}}>
        <Stars
          colors={[
            '#ff464e',
            '#fe8e17',
            '#fec327',
            '#7cb532',
            '#96d04a']}
          name="stars2"
          selectable
        />
      </div>

      <br />
      <hr />

      <h3>
        Star with half values
      </h3>

      <Stars
        name="stars"
        onChange={action('onChange')}
        onClick={action('onClick')}
        totalStars={5}
        value={2.3}
      />
    </div>
  ));
