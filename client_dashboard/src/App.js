import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard.js';
import Error from './Error.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Dashboard/>
  );
}

export default App;
