import React from 'react';
import renderer from 'react-test-renderer';
import DatePicker from 'DatePicker'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

jest.mock('react-datepicker', () => 'Datepicker');
jest.mock('moment', () => 'Moment');

test('Renders datepicker without crashing', () => {
  const component = renderer.create(
    <DatePicker
      id="date-picker"
      name="date-picker"
      title="DatePicker" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
