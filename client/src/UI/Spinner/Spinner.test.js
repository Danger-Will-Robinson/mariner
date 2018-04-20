import React from 'react';
import Spinner from './Spinner.jsx';
import renderer from 'react-test-renderer';

test('Spinner renders', () => {
  const component = renderer.create(<Spinner />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});