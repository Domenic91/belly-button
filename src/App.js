// @flow

import React, { Component } from 'react';
import { Router } from '@reach/router';

import GameView from './views/GameView';
import Menu from './views/Menu';

import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Menu path="/" />
        <GameView path="/game/:seed" />
      </Router>
    );
  }
}

export default App;
