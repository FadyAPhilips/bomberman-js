import React, { useEffect, async } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDevSetting,
  toggleLoggerSetting,
} from "../redux/slices/DevToolsSettingsSlice";
import Logger from "./logger";

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

  const changeLoggerState = (setting) => {
    dispatch(toggleLoggerSetting(setting));
    Logger.toggleLoggerState(setting);
  };

  const devSettingsTogglers = Object.keys(devSettings).map((setting) => {
    return (
      <DevToolsToggler
        toggleState={devSettings[setting]}
        setting={setting}
        onClick={() => dispatch(toggleDevSetting(setting))}
      />
    );
  });

  const loggerSettingsTogglers = Object.keys(loggerSettings).map((setting) => {
    return (
      <DevToolsToggler
        toggleState={loggerSettings[setting]}
        setting={setting}
        onClick={() => changeLoggerState(setting)}
      />
    );
  });

  return (
    <DevTools>
      <h1>Dev Tools</h1>
      <h2>Dev Settings</h2>
      <TogglersDiv>{devSettingsTogglers}</TogglersDiv>
      <h2>Logger Settings</h2>
      <TogglersDiv>{loggerSettingsTogglers}</TogglersDiv>
    </DevTools>
  );
}

export default DevToolsDash;
