import React from 'react';
import {render} from 'react-dom';

import 'font-awesome-webpack'; // eslint-disable-line import/no-extraneous-dependencies
import 'main.scss';

import App from './app';

render(
  <App />,
  document.getElementById('nukleus-playground')
);
