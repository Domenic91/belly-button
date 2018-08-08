import * as React from 'react';
import styled from 'styled-components';
import {GameCellInterface} from "./types";


const CellStyle = styled.div`
  border-radius: 4px
  display: inline-flex;
  justify-content: center
  align-items: center;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  border-style: inset;
  &:hover{
    color:red;
    border: 1px solid red;
  }
`;

export function GameCell({props, fn}:{props:GameCellInterface, fn: ()=>void}) {
    return(
        <CellStyle onClick={fn}>
            {props.value}
        </CellStyle>
    )
}