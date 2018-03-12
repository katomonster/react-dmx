import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dmx from './components/Dmx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Dmx />, document.getElementById('root'));
registerServiceWorker();
