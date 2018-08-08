import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GameField} from "./GameField";
import './index.css';
import {createGameField} from "./init";
import registerServiceWorker from './registerServiceWorker';
import { inherits } from 'util';


ReactDOM.render(
    <GameField
                items={createGameField(8)}/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
