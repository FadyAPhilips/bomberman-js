import React, { useEffect, async } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import gameConfig from "../../gameData/gameConfig.json";
import ENTITY_CLASSES from "../../enums/ENTITY_CLASSES";

import useGameInputHandler from "../customHooks/useInputHandler";
import useGameLoop from "../customHooks/useGameLoop";

import GameGrid from "./GameGrid";
import Entity from "./Entity";
import HUDItem from "./HUDItem";

import EntityManager from "../ecs/systems/EntityManager";

const GameWindow = styled.div`
  width: ${(props) => props.gameWindow.width}px;
  height: ${(props) => props.gameWindow.height}px;
  overflow: hidden;
  margin: 30px;
  background-color: green;
  position: relative;
`;

function Game() {
  const config = JSON.parse(JSON.stringify(gameConfig))[0];

  const levelData = useSelector((state) => state.levelState);

  const entityPlainObj = levelData.entityList;

  const entityList = EntityManager.entityListFromPlainObj(entityPlainObj);
  const devSettings = useSelector((state) => state.DevSettingState.devSetting);

  useGameInputHandler();
  useGameLoop();

  const loadEntities = (data) => {
    const levelEntities = [];
    //load all decoration
    entityList[ENTITY_CLASSES.DECORATION].forEach((entity) => {
      levelEntities.push(<Entity entityData={entity} />);
    });

    //load all blocks
    entityList[ENTITY_CLASSES.BLOCK].forEach((entity) => {
      levelEntities.push(<Entity entityData={entity} />);
    });

    //load all items
    entityList[ENTITY_CLASSES.ITEM].forEach((entity) => {
      levelEntities.push(<Entity entityData={entity} />);
    });

    //load all NPCs
    entityList[ENTITY_CLASSES.NPC].forEach((entity) => {
      levelEntities.push(<Entity entityData={entity} />);
    });

    //load all PCs
    entityList[ENTITY_CLASSES.PC].forEach((entity) => {
      levelEntities.push(<Entity entityData={entity} />);
    });
    return levelEntities;
  };

  const calcGameWindowSize = () => {
    const levelWidthPix = levelData.gridSizeX * config.gridCellSize;
    const levelHeightPix = levelData.gridSizeY * config.gridCellSize;
    const windowWidth = Math.min(levelWidthPix, config.gameWindow.width);
    const windowHeight = Math.min(levelHeightPix, config.gameWindow.height);

    return { width: windowWidth, height: windowHeight };
  };

  const loadHUD = () => {
    if (!devSettings.HideHUD) {
      return (
        <>
          <HUDItem top={30} left={30} size={{ x: 50, y: 300 }}>
            HUD 1
          </HUDItem>
          <HUDItem bottom={30} right={30} size={{ x: 300, y: 64 }}>
            HUD 2
          </HUDItem>
          <HUDItem top={30} right={30} size={{ x: 300, y: 64 }}>
            HUD 3
          </HUDItem>
        </>
      );
    }
  };

  return (
    <GameWindow gameWindow={calcGameWindowSize()}>
      <GameGrid>{loadEntities(entityList)}</GameGrid>
      {loadHUD()}
    </GameWindow>
  );
}

export default Game;
