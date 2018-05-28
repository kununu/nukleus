import React from 'react';
import {Link} from 'react-router-dom';
import {StaticRouter} from 'react-router';
import renderer from 'react-test-renderer';
import Paginator from 'Paginator'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Paginator with react-router links without crashing', () => {
  const component = renderer.create((
    <StaticRouter location="test" context={{}}>
      <Paginator
        totalPages={10}
        pathname="test"
        queryKey="pagination"
        baseLink={<Link to={{pathname: '/test/'}}>1</Link>} />
    </StaticRouter>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Paginator with react-router links without crashing', () => {
  const component = renderer.create(<Paginator
    totalPages={10}
    query={{test: 'react-router'}}
    pathname="test"
    queryKey="pagination"
    baseLink={<a href="/test/">1</a>} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
