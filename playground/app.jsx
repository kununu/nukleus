import React from 'react';
import {DynaReactComponentShowcase} from 'dyna-react-component-showcase'; // eslint-disable-line import/no-extraneous-dependencies

import './app.scss';

const logo = (
  <div>Nukleus logo</div>
);

const showcase = ({
  baseUrl: 'playground',
  logo,
  views: [
    {
      center: true,
      component: (
        <div>
          <h1>About Nukleus</h1>
        </div>
      ),
      slug: 'about',
      title: 'About Nukleus'
    }
  ]
});

const App = () => (
  <div className="app-container container">
    <DynaReactComponentShowcase
      showcase={showcase} />
  </div>
);

export default App;
