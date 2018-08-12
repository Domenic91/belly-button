import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ApolloProvider, Query, Mutation } from 'react-apollo';

import client from './apollo/setup';
import { callCellMutation, gameFieldQuery } from './graphql';
import { IGameField } from './types';
import { GameField } from './GameField';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { gameWon } from './win';

const AppStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameFieldWrapStyle = styled.div`
  width: 80vw;
  height: 80vh;
  max-width: 80vh;
  max-height: 80vw;
`;

interface IGameFieldQuery {
  gameField: IGameField;
  clicks: number;
}

class GameFieldQuery2 extends Query<IGameFieldQuery> {}

ReactDOM.render(
  <ApolloProvider client={client}>
    <GameFieldQuery2 query={gameFieldQuery}>
      {({ data }) => {
        return (
          data && (
            <Mutation mutation={callCellMutation}>
              {mutation => {
                const path = gameWon(data.gameField);
                if (path.won) {
                  alert(`You did it - only ${data.clicks} clicks`);
                }
                return (
                  <AppStyle>
                    <GameFieldWrapStyle>
                      <GameField
                        path={path.path}
                        items={data.gameField.cells}
                        onCellPressed={id => {
                          mutation({ variables: { id } });
                        }}
                      />
                    </GameFieldWrapStyle>
                  </AppStyle>
                );
              }}
            </Mutation>
          )
        );
      }}
    </GameFieldQuery2>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
// registerServiceWorker();
