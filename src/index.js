import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from "./App.jsx";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>, 
  document.getElementById('root')
);


serviceWorker.unregister();
