import React from 'react';
import styled from 'styled-components';

import GameField from '../GameField';
import createGameField from '../init';
import GameState from '../GameState';
import { height, width } from '../config';

const AppStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameFieldWrapStyle = styled.div`
  width: 80vw;
  height: 80vh;
  max-width: 80vh;
  max-height: 80vw;
`;

const CounterStyle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 72px;
  color: purple;
`;

const BotStyle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 72px;
  color: green;
`;

const BotPathTextStyle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 36px;
  color: green;
`;

const BotPathStyle = styled.div`
  position: fixed;
  right: 0;
  top: 0;
`;

export default ({ seed, navigate }) => {
  return (
    <GameState
      gameField={createGameField(width, height)(seed)}
      onGameEnd={() => navigate('/')}
    >
      {({ clickField, gameField, path, clicks, bot }) => {
        return (
          <AppStyle>
            <CounterStyle>{clicks}</CounterStyle>
            <GameFieldWrapStyle>
              <GameField
                path={path}
                items={gameField.cells}
                onCellPressed={clickField}
                botNext={bot.path.length > clicks && bot.path[clicks]}
              />
            </GameFieldWrapStyle>
            <BotStyle>{bot.count}</BotStyle>
            <BotPathStyle>
              {bot.path.map(item => (
                <BotPathTextStyle>{item}</BotPathTextStyle>
              ))}
            </BotPathStyle>
          </AppStyle>
        );
      }}
    </GameState>
  );
};
