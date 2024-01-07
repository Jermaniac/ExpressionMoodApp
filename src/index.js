import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'

const Root = (
    <App />
);

const rootElement = document.getElementById('root');

ReactDOM.render(
  Root,
  rootElement
);
