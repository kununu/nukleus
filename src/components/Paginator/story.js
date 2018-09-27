import React from 'react';
import {storiesOf} from '@storybook/react';
import {Link} from 'react-router-dom';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Paginator from './index';

storiesOf('Paginator', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
    <Paginator
      totalPages={10}
      pathname="/"
      query={{}}
      baseLink={<a href="/">hi</a>} />
  ));
