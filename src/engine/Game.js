import React, { useEffect, async } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setEntities } from "../redux/slices/levelDataSlice";
import level from "../gameData/level.json";

import useGameInputHandler from "./customHooks/useInputHandler";
import useGameLoop from "./customHooks/useGameLoop";

import GameGrid from "./GameGrid";
import Entity from "./Entity";

const GameWindow = styled.div`
  /* width: 1280px;
  height: 720px; */
  overflow: scroll;
  margin: 30px;
`;

function Game() {
  useGameInputHandler();

  useGameLoop();

  const loadEntities = (data) => {
    const levelEntities = entityList.map((E) => {
      return <Entity entityData={E} />;
    });
    return levelEntities;
  };

  const entityList = useSelector((state) => state.levelState.entityList);

  return (
    <GameWindow>
      <GameGrid>{loadEntities(entityList)}</GameGrid>
    </GameWindow>
  );
}

export default Game;
