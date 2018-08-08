import * as React from 'react';
import styled from 'styled-components';
import { GameCellInterface } from "./types";


const CellStyle = styled.div`
  border-radius: 4px
  display: inline-flex;
  justify-content: center;
  font-size: 2em;
  align-items: center;
  border: 2px solid black;
  width: 100%;
  height: 100%;
  border-style: inset;
  &:hover{
    color:red;
    border: 2px solid red;
  }
  background-color: ${(props: { bgColor: string }) => props.bgColor};
`;


const colorScaled = (value: number) => {
    //value from 0 to 1
    var hue = ((1 - (value / 8)) * 120).toString(10);
    return ["hsl(", hue, ",96%,69%)"].join("");
};

export function GameCell({ props, fn }: { props: any, fn: () => void }) {
    return (
        <CellStyle
            bgColor={colorScaled(props.value)}
            onClick={fn}>
            {props.value}
        </CellStyle>
    )
}