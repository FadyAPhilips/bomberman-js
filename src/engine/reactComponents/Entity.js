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
  object-fit: cover;
  object-position: ${(props) => props.currentSlice}%;
  transform: scaleX(${(props) => props.dirX});
  z-index: 10;
`;

const BoundingBox = styled.div`
  border: 1px solid red;
  margin: -1px;
  height: ${(props) => props.sizeY}px;
  width: ${(props) => props.sizeX}px;
  position: absolute;
  z-index: 11;
  left: ${(props) => props.posx}px;
  top: ${(props) => props.posy}px;
`;

function Entity(props) {
  const devSettings = useSelector((state) => state.DevSettingState.devSetting);
  const gameState = useSelector((state) => state.gameState);
  const entityInstance = props.entityData;
  const entityPosition = entityInstance.getComponent(
    COMPONENTS.PLACE
  ).edgePosition;
  const entitySize = entityInstance.getComponent(COMPONENTS.PLACE).size;
  const entityBounding = entityInstance.getComponent(
    COMPONENTS.BOUNDING
  ).bounding;
  const entityDirX = entityInstance.getComponent(COMPONENTS.PLACE).directionX;
  const entityAnimation = entityInstance.getComponent(COMPONENTS.ANIMATION);

  const currentAnimation = entityAnimation.currentAsset;
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
        currentSlice={entityAnimation.getAnimationSlice(gameState.frameCount)}
        dirX={entityDirX}
      ></Sprite>
      {devSettings.collisionBoxToggle ? (
        <BoundingBox
          sizeY={entityBounding.y}
          sizeX={entityBounding.x}
          posx={(entitySize.x - entityBounding.x) / 2}
          posy={(entitySize.y - entityBounding.y) / 2}
        />
      ) : null}
    </GridItem>
  );
}

export default Entity;
