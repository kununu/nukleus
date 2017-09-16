import React, {PropTypes} from 'react';
import {DynaReactComponentShowcase} from 'dyna-react-component-showcase'; // eslint-disable-line import/no-extraneous-dependencies

import './app.scss';

const logo = (
  <div>Nukleus logo</div>
);

const showcase = (pathname, query) => ({
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

const App = ({location: {pathname, query}}) => (
  <div className="app-container container">
    <DynaReactComponentShowcase
      showcase={showcase(pathname, query)} />
  </div>
);

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default App;
