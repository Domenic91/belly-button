import * as React from 'react';
import styled from 'styled-components';

const CellStyle = styled.div`
  background-color: green;
`;

export function GameCell({ props, fn }: { props: any; fn: any }) {
  return <CellStyle onClick={() => fn(props.id)}>{props.value}</CellStyle>;
}
