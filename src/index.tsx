import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { ApolloProvider, Query, Mutation } from "react-apollo";

import client from "./apollo/setup";
import { callCellMutation, gameFieldQuery } from "./graphql";
import { GameField } from "./GameField";
import "./index.css";
import { initialize } from "./init";
import registerServiceWorker from "./registerServiceWorker";

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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={gameFieldQuery}>
      {data => (
        <Mutation mutation={callCellMutation}>
          {mutation => (
            <AppStyle>
              <GameFieldWrapStyle>
                <GameField items={initialize(8, 8).cells} />
              </GameFieldWrapStyle>
            </AppStyle>
          )}
        </Mutation>
      )}
    </Query>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
