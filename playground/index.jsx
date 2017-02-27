import React from 'react';
import {render} from 'react-dom';
import {Route, Router, browserHistory} from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies

import 'font-awesome-webpack'; // eslint-disable-line import/no-extraneous-dependencies
import 'main.scss';

import App from './app';

const getRoutes = () => (
  <Route path="/playground" component={App} >
    <Route path="2" component={App} />
    <Route path="3" component={App} />
  </Route>
);

render(
  <Router
    routes={getRoutes()}
    history={browserHistory} />,
  document.getElementById('nukleus-playground')
);
