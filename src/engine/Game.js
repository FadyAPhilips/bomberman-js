import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "../redux/slices/levelDataSlice";
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
  const dispatch = useDispatch();

  useEffect(() => {
    gameInit();
  }, []);

  const gameInit = () => {
    console.log("INITIALIZING");
    document.addEventListener("keydown", handleInputs);
    document.addEventListener("keyup", handleInputs);

    const gridSizeX = Math.max(...level.map((item) => item.x));
    const gridSizeY = Math.max(...level.map((item) => item.y));

    const entityList = loadEntities(level);

    const levelState = {
      gridSizeX: gridSizeX,
      gridSizeY: gridSizeY,
      entityList: entityList,
    };

    dispatch(setLevel(levelState));
  };

  const loadEntities = (data) => {
    const levelEntities = level.map((E) => {
      return (
        <Entity posx={E.x} posy={E.y}>
          {E.text}
        </Entity>
      );
    });
    return levelEntities;
  };

  const handleInputs = (event) => {
    console.log(event.type, event.key);
  };

  const entityList = useSelector((state) => state.levelState.entityList);

  return (
    <GameWindow>
      <GameGrid>{entityList}</GameGrid>
    </GameWindow>
  );
}

export default Game;
