import * as React from 'react';
import styled from "styled-components";
import {GameCell} from "./GameCell";
import {IGameCell} from "./init";

const log = () => {
    // tslint:disable-next-line:no-console
    console.log('test')
};

const GameFieldStyle = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const CellStyle = styled.div`
  background-color: red;
`;

export const GameField = ({items}: {items: IGameCell[]}) => {
    return(
        <GameFieldStyle>
            {items.map((c:any) =>
                (
                    <CellStyle>
                        <GameCell
                                fn={log}
                                props={c}
                                key={c.id}/>
                    </CellStyle>
                ))}
        </GameFieldStyle>
    )
};
