import styled from "styled-components";

import GameGrid from "./GameGrid";

const GameWindow = styled.div`
  background-color: blue;
  width: 1280px;
  height: 720px;
  overflow: scroll;
  margin: 30px;
`;

function Game() {
  return (
    <GameWindow>
      <GameGrid />
    </GameWindow>
  );
}

export default Game;
