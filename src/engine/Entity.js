import styled from "styled-components";
import gameConfig from "../gameData/gameConfig.json";
import assetsMap from "../gameData/assets.json";
import bomberman from "../assets/megaman.png";

const config = JSON.parse(JSON.stringify(gameConfig))[0];
const assets = JSON.parse(JSON.stringify(assetsMap))[0];

const GridItem = styled.div`
  /* background-color: red; */
  /* border: black solid 1px; */
  position: absolute;
  left: ${(props) => props.posx}px;
  top: ${(props) => props.posy}px;
  height: ${config.gridCellSize}px;
  width: ${config.gridCellSize}px;
`;

const Sprite = styled.img`
  height: ${config.gridCellSize}px;
  width: ${config.gridCellSize}px;
  object-fit: scale-down;
`;

function Entity(props) {
  const handleAnimations = (entity) => {
    let currentAnimation;

    if (entity.type === "player1") {
      if (entity.movement.velocity.x != 0) {
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
      posx={props.entityData.pos.x - 1}
      posy={props.entityData.pos.y - 1}
      gridCellSize={props.gridCellSize}
    >
      <Sprite src={currentAnimationImage} />
    </GridItem>
  );
}

export default Entity;
