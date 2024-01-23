import styled from "styled-components";
import level from "../gameData/level.json";

import GameGrid from "./GameGrid";
import Entity from "./Entity";

const GameWindow = styled.div`
  width: 1280px;
  height: 720px;
  overflow: scroll;
  margin: 30px;
`;

function Game() {
  const getGridSize = (levelSizeX, levelSizeY) => {
    const maxX = Math.max(...levelSizeX);
    const maxY = Math.max(...levelSizeY);

    return [maxX, maxY];
  };

  const loadEntities = (data) => {
    const LevelEntities = level.map((E) => {
      return (
        <Entity posx={E.x} posy={E.y}>
          {E.text}
        </Entity>
      );
    });
    return LevelEntities;
  };

  const levelSizeX = level.map((item) => item.x);
  const levelSizeY = level.map((item) => item.y);

  const [gridSizeX, gridSizeY] = getGridSize(levelSizeX, levelSizeY);
  const EntityList = loadEntities(level);

  return (
    <GameWindow>
      <GameGrid gridSizeX={gridSizeX} gridSizeY={gridSizeY}>
        {EntityList}
      </GameGrid>
    </GameWindow>
  );
}

export default Game;
