import React from 'react';
import {storiesOf} from '@storybook/react';
// import {Link} from 'react-router-dom';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, number, boolean} from '@storybook/addon-knobs/react';

import Paginator from './index';
console.log('SERAC', window.parent.location.search);
storiesOf('Paginator', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The paginator component! The query param needs to either be the ```window.location.search``` value or an object that contains the query params. The ``pathname`` is only necessary if you want to change the base url. The ``queryKey`` allows you to define what the url param will be - defaults to "page". Lastly, the ``baseLink`` prop allows you to use different link components from your desired library such as react-router Link or next/link from next.js. You can also just use a plain old ``<a>`` tag.')(story)(context))
  .add('basics', () => (
    <Paginator
      totalPages={number('totalPages', 5)}
      query={window.parent.location.search}
      baseLink={<a href="/">baselink</a>} />
  ));
