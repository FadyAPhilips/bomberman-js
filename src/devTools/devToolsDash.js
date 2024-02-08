import React, { useEffect, async } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import DevToolsToggler from "./devToolsToggler";

function DevToolsDash() {
  return (
    <div>
      <h1>Dev Tools</h1>
      <DevToolsToggler
        toggleState={true}
        setting={"Toggle Entity Borders"}
        onClick={() => console.log("Toggle Entity Borders")}
      />
    </div>
  );
}

export default DevToolsDash;
