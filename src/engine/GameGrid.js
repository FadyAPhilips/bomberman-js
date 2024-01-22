import styled from "styled-components";

const Grid = styled.div`
  background-color: aliceblue;
  width: xd;
  height: yd;
`;

function GameGrid(props) {
  let xd = props.xSize ? props.xSize : 1280;
  let yd = props.ySize ? props.ySize : 720;

  let startingX = props.xSize ? props.xSize : 0;
  let startingY = props.ySize ? props.ySize : 0;

  console.log(xd, yd);

  return (
    <Grid>
      <h1>Game Grid</h1>
    </Grid>
  );
}

export default GameGrid;
