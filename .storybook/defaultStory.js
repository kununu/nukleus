import React from 'react';
import {storiesOf} from '@storybook/react';
import {withOptions} from '@storybook/addon-options';
import {defaultOptions} from './defaultOptions';
import ReactMarkdown from 'react-markdown';
import Readme from '../README.md';

import styles from './defaultStoryStyles.scss';

storiesOf('Introduction', module)
  .addDecorator(
    withOptions({
      ...defaultOptions,
      showAddonPanel: false,
    })
  )
  .add('welcome', () => (
    <div>
      <div className={styles.logoContainer}>
        <img src="https://assets.kununu.com/nukleus/logo.svg" className={styles.logo} />
      </div>
      <div className={styles.contentWrapper}>
        <ReactMarkdown escapeHtml={false} source={Readme} />
      </div>
    </div>
  ));
