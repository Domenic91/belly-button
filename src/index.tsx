import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GameField} from "./GameField";
import './index.css';
import {createGameField} from "./init";
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <GameField
                items={createGameField(8)}/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
