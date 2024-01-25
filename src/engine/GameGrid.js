import styled from "styled-components";
import { useSelector } from "react-redux";

const Grid = styled.div`
  background-color: aliceblue;
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 64px);
  grid-template-rows: repeat(${(props) => props.height}, 64px);
`;
const GridCell = styled.div`
  background-color: yellow;
  border: #444 solid 1px;
  grid-column: ${(props) => props.posx};
  grid-row: ${(props) => props.posy};
`;

function GameGrid(props) {
  const gridSizeX = useSelector((state) => state.levelState.gridSizeX);
  const gridSizeY = useSelector((state) => state.levelState.gridSizeY);

  const populateGride = (x, y) => {
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
  };

  //   const xd = props.xSize ? props.xSize : 1280;
  //   const yd = props.ySize ? props.ySize : 720;

  //   const startingX = props.xStart ? props.xStart : 0;
  //   const startingY = props.yStart ? props.yStart : 0;

  return (
    <Grid width={gridSizeX} height={gridSizeY}>
      {populateGride(gridSizeX, gridSizeY)}
      {props.children}
    </Grid>
  );
}

export default GameGrid;
