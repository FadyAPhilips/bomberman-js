import React, { useEffect, async } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import gameConfig from "../gameData/gameConfig.json";

import useGameInputHandler from "./customHooks/useInputHandler";
import useGameLoop from "./customHooks/useGameLoop";

import GameGrid from "./GameGrid";
import Entity from "./Entity";

const GameWindow = styled.div`
  width: ${(props) => props.gameWindow.width}px;
  height: ${(props) => props.gameWindow.height}px;
  overflow: hidden;
  margin: 30px;
  background-color: green;
`;

function Game() {
  const config = JSON.parse(JSON.stringify(gameConfig))[0];

  useGameInputHandler();
  // useGameLoop();

  const loadEntities = (data) => {
    const levelEntities = entityList.map((E) => {
      return <Entity entityData={E} />;
    });
    return levelEntities;
  };

  const levelData = useSelector((state) => state.levelState);
  const entityList = levelData.entityList;

  const calcGameWindowSize = () => {
    const levelWidthPix = levelData.gridSizeX * config.gridCellSize;
    const levelHeightPix = levelData.gridSizeY * config.gridCellSize;
    const windowWidth = Math.min(levelWidthPix, config.gameWindow.width);
    const windowHeight = Math.min(levelHeightPix, config.gameWindow.height);

    return { width: windowWidth, height: windowHeight };
  };

  return (
    <GameWindow gameWindow={calcGameWindowSize()}>
      <GameGrid>{loadEntities(entityList)}</GameGrid>
    </GameWindow>
  );
}

export default Game;
