import React, { useEffect, async } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Toggler = styled.div`
  display: flex;
  margin: 10px;
  background-color: ${(props) => props.togglercolor};
  border: 1px black solid;
  border-radius: 6px;
  transition: 0.15s ease-in-out;
`;

const Label = styled.div`
  font-size: 16px;
  padding: 6px;
  color: white;
  border-radius: 6px 0px 0px 6px;
  border-right: 1px black solid;
`;

const State = styled.div`
  font-size: 16px;
  padding: 6px;
  border-radius: 6px;
  color: white;
`;

function DevToolsToggler(props) {
  const toggleState = () => {
    if (props.toggleState) {
      return "ON";
    } else {
      return "OFF";
    }
  };

  return (
    <Toggler
      togglercolor={props.toggleState ? "green" : "red"}
      onClick={props.onClick}
    >
      <Label>{props.setting}</Label>
      <State toggleState={props.toggleState}>{toggleState()}</State>
    </Toggler>
  );
}

export default DevToolsToggler;
