import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';

import Tabs from './index';

function updateUrl (e, path) {
  e.preventDefault();
  const queryString = window.parent.location.search;

  window.parent.history.pushState({}, 'new', `${path}${queryString}`);
  window.history.go('/');
}

storiesOf('Tabs', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator((story, context) => withInfo('The tabs component! Comes in two flavors - a minimal default theme and a block theme. The component supports link components such as react-router link as well as simple anchor tags shown here. You can also pass url hashs to the component via the hash prop.')(story)(context))
  .add('basics', () => (
    <div>
      <h3>
        Default tab theme
      </h3>
      <Tabs
        items={[
          <a
            onClick={e => updateUrl(e, '/')}
            href="/"
          >
            First Tab
          </a>,
          <a
            onClick={e => updateUrl(e, '/2')}
            href="/2"
          >
            Second Tab
          </a>,
          <a
            onClick={e => updateUrl(e, '/3')}
            href="/3"
          >
            Third Tab
          </a>,
        ]}
        pathname={window.parent.location.pathname}
        theme="default"
      />

      <br />
      <br />
      <br />

      <h3>
        Block tab theme
      </h3>
      <Tabs
        items={[
          <a
            onClick={e => updateUrl(e, '/')}
            href="/"
          >
            First Tab
          </a>,
          <a
            onClick={e => updateUrl(e, '/2')}
            href="/2"
          >
            Second Tab
          </a>,
          <a
            onClick={e => updateUrl(e, '/3')}
            href="/3"
          >
            Third Tab
          </a>,
        ]}
        pathname={window.parent.location.pathname}
        theme="block"
      />
    </div>
  ));
