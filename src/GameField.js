// @flow
import * as React from 'react';
import styled from 'styled-components';

import { GameCell } from './GameCell';

const GameFieldStyle = styled.div`
  width: 100%;
  height: 100%;
  border: 0px solid red;
  border-radius: 4px;
  user-select: none;
`;

const CellStyle = styled.div`
  width: ${props => props.width}%;
  height: ${props => props.width}%;
  display: inline-block;
  cursor: pointer;
  padding: 4px;
  box-sizing: border-box;
`;

export default ({ items, onCellPressed, path, botNext }) => {
  const calcWidth = () => {
    return 100 / Math.sqrt(items.length);
  };
  return (
    <GameFieldStyle>
      {items.map(c => (
        <CellStyle key={c.id} width={calcWidth()}>
          <GameCell
            fn={onCellPressed}
            props={c}
            isBlue={path.has(c.id)}
            highlight={botNext === c.id}
          />
        </CellStyle>
      ))}
    </GameFieldStyle>
  );
};
