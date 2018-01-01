import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FlowDemo from './FlowDemo';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FlowDemo />, document.getElementById('root'));
registerServiceWorker();
