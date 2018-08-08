import * as React from 'react';
import styled from 'styled-components';
import { GameCell } from './GameCell';
import { IGameCell } from './types';

const log = () => {
  // tslint:disable-next-line:no-console
  console.log('test');
};

const GameFieldStyle = styled.div`
  width: 100%;
  height: 100%;
  border: 0px solid red
  border-radius: 4px
  
  //.noselect 
  -webkit-touch-callout: none; /* iOS Safari */ 
    -webkit-user-select: none; /* Safari */ 
     -khtml-user-select: none; /* Konqueror HTML */ 
       -moz-user-select: none; /* Firefox */ 
        -ms-user-select: none; /* Internet Explorer/Edge */ 
            user-select: none; /* Non-prefixed version, currently 
                                  supported by Chrome and Opera */ 
`;

const CellStyle = styled.div`
  width: ${(props: {width: number}) => props.width}%; 
  height: ${(props: {width: number}) => props.width}%; 
  display: inline-block;
  cursor: pointer;
  padding: 4px
  box-sizing: border-box
`;

export const GameField = ({
  items,
  onCellPressed,
}: {
  items: IGameCell[];
  onCellPressed: (id: number | string) => any;
}) => {
  const calcWidth = () => {
    return 100 / Math.sqrt(items.length);
  };

  return (
    <GameFieldStyle>
      {items.map((c: IGameCell) => (
        <CellStyle key={c.id} width={calcWidth()}>
          <GameCell fn={onCellPressed} props={c} />
        </CellStyle>
      ))}
    </GameFieldStyle>
  );
};
