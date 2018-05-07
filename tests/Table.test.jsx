import React from 'react';
import {Link} from 'react-router-dom';
import {StaticRouter} from 'react-router';
import renderer from 'react-test-renderer';
import Table from 'Table'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies


test('Renders Table without crashing', () => {
  const component = renderer.create((
    <StaticRouter location="test" context={{}}>
      <Table
        items={{
          id: [1, 2, 3, 4, 5],
          'in hiragana': ['いち', 'に', 'さん', 'よん', 'ご'],
          'in kanji': ['一', '二', '三', '四', '五'],
          'in words': ['one', 'two', 'three', 'four', 'five'],
          link: [
            <Link to="/playground/">One</Link>,
            <Link to="/playground/">Two</Link>,
            <Link to="/playground/">Three</Link>,
            'Four',
            <Link to="/playground/">Five</Link>
          ]
        }} />
    </StaticRouter>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders empty Table without crashing', () => {
  const component = renderer.create(<Table />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

