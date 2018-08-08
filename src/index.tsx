import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from "styled-components";
import {GameField} from "./GameField";
import './index.css';
import {initialize} from "./init";
import registerServiceWorker from './registerServiceWorker';


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
    <AppStyle>
        <GameFieldWrapStyle>
            <GameField
                items={initialize(8,8).cells}/>
        </GameFieldWrapStyle>
    </AppStyle>
    ,document.getElementById('root') as HTMLElement
);
registerServiceWorker();
