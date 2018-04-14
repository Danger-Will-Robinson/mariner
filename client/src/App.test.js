import React from 'react';
import App from './App.jsx';
import renderer from 'react-test-renderer';

test('App renders', () => {
  const component = renderer.create(<App />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});