import React from 'react';
import { Link } from '@reach/router';
import Chance from 'chance';

import styled from 'styled-components';

const chance = Chance();

const LinkStyle = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <LinkStyle>
    <Link to={`game/${chance.word()}`}>New Game</Link>
  </LinkStyle>
);
