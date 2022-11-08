import React from 'react';
import styled from 'styled-components';

const StyledDropDown = styled.select`
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 2rem;
  padding: 0.3rem;
  margin: ${(props) => props.margin};
`;

export default function DropDown(props) {
  return (
    <StyledDropDown
      required={props.required}
      onChange={props.onChangeEvent}
      key={props.defaultValue}
      defaultValue={props.defaultValue}
      name={props.name}
      margin={props.margin}
    >
      {props.optionList.map((el) => {
        return (
          <option value={el.optionValue} key={el.id}>
            {el.optionName}
          </option>
        );
      })}
    </StyledDropDown>
  );
}
