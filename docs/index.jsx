import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

import App from 'components/App';

import '../main.scss';

render(
  <Router>
    <Route
      path="/"
      component={App} />
  </Router>,
  document.getElementById('nukleus-docs')
);
