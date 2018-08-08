import * as React from 'react';
import styled from 'styled-components';

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
    // value from 0 to 1
    const hue = ((1 - (value / 8)) * 120).toString(10);
    return ["hsl(", hue, ",96%,69%)"].join("");
};
export function GameCell({ props, fn, isBlue }: { props: any; fn: any, isBlue: boolean }) {
    return <CellStyle onClick={() => fn(props.id)} bgColor={isBlue ? "blue" : colorScaled(props.value)}>{props.value} </CellStyle>;
}
