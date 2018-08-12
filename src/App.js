// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { ApolloProvider, Query, Mutation } from 'react-apollo';

import client from './apollo/setup';
import { callCellMutation, gameFieldQuery } from './graphql';
import { GameField } from './GameField';
import './index.css';
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

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={gameFieldQuery}>
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
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
