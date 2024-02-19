import styled from "styled-components";
import { useSelector } from "react-redux";
import gameConfig from "../../gameData/gameConfig.json";

const config = JSON.parse(JSON.stringify(gameConfig))[0];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.width},
    ${config.gridCellSize}px
  );
  grid-template-rows: repeat(
    ${(props) => props.height},
    ${config.gridCellSize}px
  );
  position: relative;
  transform: translate(
    ${(props) => props.cameraX}px,
    ${(props) => props.cameraY}px
  );
`;
const GridCell = styled.div`
  background-color: rgba(71, 245, 39, 0.25);
  border: #444 solid 1px;
  grid-column: ${(props) => props.posx};
  grid-row: ${(props) => props.posy};
`;

function GameGrid(props) {
  const gridSizeX = useSelector((state) => state.levelState.gridSizeX);
  const gridSizeY = useSelector((state) => state.levelState.gridSizeY);
  const cameraPosX = useSelector((state) => state.cameraState.x) * -1;
  const cameraPosY = useSelector((state) => state.cameraState.y) * -1;
  const devSettings = useSelector((state) => state.DevSettingState.devSetting);

  const CreateGuideGrid = (x, y) => {
    if (devSettings.gameGridToggle) {
      let cellArray = [];
      for (let iY = 1; iY <= y; iY++) {
        for (let iX = 1; iX <= x; iX++) {
          cellArray.push(
            <GridCell posx={iX} posy={iY}>
              {iX},{iY}
            </GridCell>
          );
        }
      }
      return cellArray;
    }
  };

  return (
    <Grid
      width={gridSizeX}
      height={gridSizeY}
      cameraX={cameraPosX}
      cameraY={cameraPosY}
    >
      {CreateGuideGrid(gridSizeX, gridSizeY)}
      {props.children}
    </Grid>
  );
}

export default GameGrid;
