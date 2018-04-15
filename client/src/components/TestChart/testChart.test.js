import React from 'react';
import TestChart from './testChart.jsx';
import renderer from 'react-test-renderer';

test('Chart renders', () => {
  const component = renderer.create(<TestChart />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});