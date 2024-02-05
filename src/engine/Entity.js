import styled from "styled-components";
import gameConfig from "../gameData/gameConfig.json";
import assetsMap from "../gameData/assets.json";

const config = JSON.parse(JSON.stringify(gameConfig))[0];
const assets = JSON.parse(JSON.stringify(assetsMap))[0];

const GridItem = styled.div`
  position: absolute;
  left: ${(props) => props.posx}px;
  top: ${(props) => props.posy}px;
  height: ${(props) => props.sizeY}px;
  width: ${(props) => props.sizeX}px;
`;

const Sprite = styled.img`
  object-fit: scale-down;
`;

function Entity(props) {
  const handleAnimations = (entity) => {
    let currentAnimation;

    if (entity.type === "player1") {
      if (entity.movement.velocity.y != 0) {
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
  const currentAnimationImage = require("../assets/" +
    currentAnimation.texturePath);

  return (
    <GridItem
      posx={props.entityData.pos.x}
      posy={props.entityData.pos.y}
      gridCellSize={props.gridCellSize}
      sizeX={props.entityData.bounding.sizeX}
      sizeY={props.entityData.bounding.sizeY}
    >
      <Sprite
        src={currentAnimationImage}
        height={props.entityData.bounding.sizeY}
        width={props.entityData.bounding.sizeX}
      />
    </GridItem>
  );
}

export default Entity;
