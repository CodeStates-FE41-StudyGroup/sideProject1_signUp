import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.3rem;
  border-radius: 5px;
  border: 1px solid #bbb;
  margin: ${(props) => props.margin};
`;

export default function TextArea(props) {
  return (
    <StyledInput
      type={props.type}
      id={props.name}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      required={props.required}
      onChange={props.onChangeEvent}
      disabled={props.disabled}
      margin={props.margin}
      onKeyDown={props.onKeyDownEvent}
    ></StyledInput>
  );
}
