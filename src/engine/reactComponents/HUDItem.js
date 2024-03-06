import styled from "styled-components";

import { useSelector } from "react-redux";

const Item = styled.div`
  position: absolute;
  border: ${(props) => props.border};
  margin: ${(props) => props.margin};
  top: ${(props) => props.top}px;
  bottom: ${(props) => props.bottom}px;
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
  height: ${(props) => props.sizeY}px;
  width: ${(props) => props.sizeX}px;
  user-select: none;
`;

function HUDItem(props) {
  const devSettings = useSelector((state) => state.DevSettingState.devSetting);

  return (
    <Item
      top={props.top}
      bottom={props.bottom}
      left={props.left}
      right={props.right}
      sizeY={props.size.y}
      sizeX={props.size.x}
      border={devSettings.HUDBorderToggle ? "black solid 1px" : ""}
      margin={devSettings.HUDBorderToggle ? "-1px" : "0"}
    >
      {props.children}
    </Item>
  );
}

export default HUDItem;
