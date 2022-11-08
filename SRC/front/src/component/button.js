import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: ${(props) => props.width || `50%`};
  background-color: rgb(52, 152, 219);
  color: #fff;
  border: 0;
  border-radius: 5px;
  height: 2rem;
  font-weight: 700;
  margin: ${(props) => props.margin};
  cursor: pointer;
`;

export default function Button(props) {
  return (
    <StyledButton
      onClick={props.buttonEvent}
      margin={props.margin}
      width={props.width}
    >
      {props.buttonName}
    </StyledButton>
  );
}
