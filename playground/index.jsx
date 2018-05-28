import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; // eslint-disable-line import/no-extraneous-dependencies

import 'main.scss';

import App from './app';

render(
  <Router>
    <Switch>
      <Route
        path="/playground"
        component={App} />
    </Switch>
  </Router>,
  document.getElementById('nukleus-playground')
);
