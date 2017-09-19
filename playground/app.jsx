import React from 'react';
import {DynaReactComponentShowcase} from 'dyna-react-component-showcase'; // eslint-disable-line import/no-extraneous-dependencies

import showcase from './showcase';

import './app.scss';

const App = () => (
  <div className="app-container container">
    <DynaReactComponentShowcase
      baseUrl="playground"
      showcase={showcase} />
  </div>
);

export default App;
