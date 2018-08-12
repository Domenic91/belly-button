import React from 'react';

import { reducer } from './utils';
import gameWon from './win';
import runBot from './bot';

export default class GameState extends React.Component {
  state = {
    gameField: this.props.gameField,
    clicks: 0,
    gamePath: gameWon(this.props.gameField),
    bot: runBot(this.props.gameField),
  };

  clickField = idx => {
    this.setState(({ gameField, clicks }) => {
      const newGameField = reducer(idx, gameField);
      return {
        gameField: newGameField,
        clicks: clicks + 1,
        gamePath: gameWon(newGameField),
      };
    });
  };

  componentDidUpdate() {
    const { onGameEnd } = this.props;
    const {
      clicks,
      gamePath: { won },
    } = this.state;
    if (won) {
      // hacky
      setTimeout(() => {
        alert(`You did it - only ${clicks} clicks`);
        onGameEnd();
      }, 1);
    }
  }

  render() {
    const { children } = this.props;
    const {
      gameField,
      gamePath: { path },
      bot,
      clicks,
    } = this.state;

    return children({
      clickField: this.clickField,
      gameField,
      path,
      bot,
      clicks,
    });
  }
}
