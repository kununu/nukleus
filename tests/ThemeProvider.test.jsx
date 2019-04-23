import React from 'react';
import renderer from 'react-test-renderer';
import Button from 'Button'; // eslint-disable-line import/no-unresolved
import * as themeable from '../utils/theming';
import ThemeProvider from 'ThemeProvider';


test('Renders correctly themed nukleus component', () => {
  const component = renderer.create(<ThemeProvider theme={{button: 'customTheme---button-14235'}}>
    <div>
      <Button text="Test" />
    </div>
  </ThemeProvider>);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
