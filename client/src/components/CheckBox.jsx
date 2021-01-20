import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  display: flex;
  align-self: center;
  fill: none;
  stroke: #2d62f3;
  stroke-width: 0.4vh;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  border: 0.1vh solid grey;
  border-radius: 5vh;
  height: 2vh;
  width: 2vh;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  background: ${(props) => (props.checked ? "salmon" : "papayawhip")}
  color: grey;
  transition: all 150ms;
  border: 0.1vh solid grey;
  border-radius: 5vh;
  height: 2.2vh;
  width: 2.2vh;
  
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 0.3vh #2d62f3;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")}
  }
`;

const CheckBox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default CheckBox;
