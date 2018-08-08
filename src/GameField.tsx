import * as React from 'react';
import styled from "styled-components";
import {GameCell} from "./GameCell";
import {GameCellInterface} from "./types";

const log = () => {
    // tslint:disable-next-line:no-console
    console.log('test')
};

const GameFieldStyle = styled.div`
  width: 100%;
  height: 100%;
  border: 0px solid red
  border-radius: 4px
`;

const CellStyle = styled.div`
  width: ${(props: {width: number}) => props.width}%; 
  height: ${(props: {width: number}) => props.width}%; 
  display: inline-block;
  cursor: pointer;
  padding: 2px
  box-sizing: border-box
`;

export const GameField = ({items}: {items: GameCellInterface[]}) => {

    const calcWidth = () => {
        return 100 / Math.sqrt(items.length)
    };

    return(
        <GameFieldStyle>
            {items.map((c:GameCellInterface) =>
                (
                    <CellStyle
                        key={c.id}
                        width={calcWidth()}>
                        <GameCell
                                fn={log}
                                props={c}/>
                    </CellStyle>
                ))}
        </GameFieldStyle>
    )
};
