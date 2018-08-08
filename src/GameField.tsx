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
`;

const CellStyle = styled.div`
  background-color: red;
  width: ${(props: { width: number }) => props.width}%;
  height: ${(props: { width: number }) => props.width}%;
  display: inline-block;
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
