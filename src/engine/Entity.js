import styled from "styled-components";
import gameConfig from "../gameData/gameConfig.json";

const config = JSON.parse(JSON.stringify(gameConfig))[0];

const GridItem = styled.div`
  background-color: red;
  /* border: black solid 1px; */
  position: absolute;
  left: ${(props) => props.posx}px;
  top: ${(props) => props.posy}px;
  height: ${config.gridCellSize}px;
  width: ${config.gridCellSize}px;
`;

function Entity(props) {
  return (
    <GridItem
      posx={props.posx}
      posy={props.posy}
      gridCellSize={props.gridCellSize}
    >
      {props.children}
    </GridItem>
  );
}

export default Entity;
