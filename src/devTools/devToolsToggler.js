import React, { useEffect, async } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Toggler = styled.div`
  display: flex;
  background-color: ${(props) => props.togglerColor};
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
    <Toggler togglerColor={props.toggleState ? "green" : "red"}>
      <Label onClick={props.onClick}>{props.setting}</Label>
      <State toggleState={props.toggleState}>{toggleState()}</State>
    </Toggler>
  );
}

export default DevToolsToggler;
