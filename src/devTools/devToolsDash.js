import React, { useEffect, async } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleDevSetting } from "../redux/slices/DevToolsSettingsSlice";

import DevToolsToggler from "./devToolsToggler";

const DevTools = styled.div`
  border: 2px green solid;
  background-color: #ded;
  margin: 30px;
  width: 85vw;
`;

const TogglersDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

function DevToolsDash() {
  const dispatch = useDispatch();
  const devSettings = useSelector((state) => state.DevSettingState.devSetting);
  const loggerSettings = useSelector((state) => state.DevSettingState.logger);

  const devSettingsTogglers = Object.keys(devSettings).map((setting) => {
    return (
      <DevToolsToggler
        toggleState={devSettings[setting]}
        setting={setting}
        onClick={() => dispatch(toggleDevSetting(setting))}
      />
    );
  });

  return (
    <DevTools>
      <h1>Dev Tools</h1>
      <h2>Dev Settings</h2>
      <TogglersDiv>{devSettingsTogglers}</TogglersDiv>
      <h2>Logger Settings</h2>
      <TogglersDiv></TogglersDiv>
    </DevTools>
  );
}

export default DevToolsDash;
