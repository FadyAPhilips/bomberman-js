import styled from "styled-components";

const Grid = styled.div`
  background-color: aliceblue;
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 64px);
  grid-template-rows: repeat(${(props) => props.height}, 64px);
`;
const GridCell = styled.div`
  background-color: yellow;
  border: black solid 1px;
  grid-column: ${(props) => props.posx};
  grid-row: ${(props) => props.posy};
`;

const GridItem = styled.div`
  background-color: red;
  border: black solid 1px;
  grid-column: ${(props) => props.posx};
  grid-row: ${(props) => props.posy};
`;

function GameGrid(props) {
  const getGridSize = (sizePixel) => {
    return Math.floor(sizePixel / 64);
  };

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

  const xd = props.xSize ? props.xSize : 1280;
  const yd = props.ySize ? props.ySize : 720;

  const startingX = props.xStart ? props.xStart : 0;
  const startingY = props.yStart ? props.yStart : 0;

  const gridSizeX = getGridSize(xd);
  const gridSizeY = getGridSize(yd);

  return (
    <Grid width={gridSizeX} height={gridSizeY}>
      {populateGride(gridSizeX, gridSizeY)}
      <GridItem posx={4} posy={5}>
        Player
      </GridItem>
      <GridItem posx={30} posy={30}>
        Tester
      </GridItem>
    </Grid>
  );
}

export default GameGrid;
