import styled from "styled-components";
import gameConfig from "../../gameData/gameConfig.json";
import assetsMap from "../../gameData/assets.json";
import COMPONENTS from "../../enums/COMPONENTS";

import { useSelector } from "react-redux";

const config = JSON.parse(JSON.stringify(gameConfig))[0];
const assets = JSON.parse(JSON.stringify(assetsMap))[0];

const GridItem = styled.div`
  border: ${(props) => props.border};
  margin: ${(props) => props.margin};
  position: absolute;
  left: ${(props) => props.posx}px;
  top: ${(props) => props.posy}px;
  height: ${(props) => props.sizeY}px;
  width: ${(props) => props.sizeX}px;
  user-select: none;
`;

const Sprite = styled.img`
  position: relative;
  object-fit: scale-down;
  left: 0;
  top: 0;
`;

function Entity(props) {
  const devSettings = useSelector((state) => state.DevSettingState.devSetting);
  const entityInstance = props.entityData;
  const entityPosition = entityInstance.getComponent(COMPONENTS.PLACE).position;
  const entitySize = entityInstance.getComponent(COMPONENTS.PLACE).size;

  const handleAnimations = (entity) => {
    let currentAnimation;

    if (entity.subtype === "player1") {
      if (entity.getComponent(COMPONENTS.MOVEMENT).velocity.y != 0) {
        currentAnimation = assets.playerJump;
      } else {
        currentAnimation = assets.player;
      }
    } else {
      currentAnimation = assets.block;
    }

    return currentAnimation;
  };

  const currentAnimation = handleAnimations(props.entityData);
  const currentAnimationImage = require("../../assets/" +
    currentAnimation.texturePath);

  return (
    <GridItem
      posx={entityPosition.x}
      posy={entityPosition.y}
      sizeY={entitySize.y}
      sizeX={entitySize.x}
      border={devSettings.borderToggle ? "black solid 1px" : ""}
      margin={devSettings.borderToggle ? "-1px" : "0"}
    >
      <Sprite
        src={currentAnimationImage}
        height={entitySize.y}
        width={entitySize.x}
        draggable="false"
      ></Sprite>
    </GridItem>
  );
}

export default Entity;
