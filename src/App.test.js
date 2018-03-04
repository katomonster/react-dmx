import React from 'react';
import ReactDOM from 'react-dom';
import Dmx from './Dmx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dmx />, div);
  ReactDOM.unmountComponentAtNode(div);
});
