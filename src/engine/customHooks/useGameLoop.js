import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logger from "../../devTools/logger";
import { setEntities } from "../../redux/slices/levelDataSlice";
import { setCameraPosition } from "../../redux/slices/cameraSlice";
import { togglePause, resetToggler } from "../../redux/slices/pauseSlice";
import Camera from "../helperClasses/camera";
import Movement from "../helperClasses/movement";
import Physics from "../helperClasses/physics";
import gameConfig from "../../gameData/gameConfig.json";
import ENTITY_CLASSES from "../../enums/ENTITY_CLASSES";
import ClassBuilder from "../helperClasses/ClassBuilder";
import COMPONENTS from "../../enums/COMPONENTS";

const useGameLoop = () => {
  const dispatch = useDispatch();
  const levelData = useSelector((state) => state.levelState);
  const controlsList = useSelector((state) => state.inputsState);
  const cameraState = useSelector((state) => state.cameraState);
  const pauseState = useSelector((state) => state.pauseState);
  const config = JSON.parse(JSON.stringify(gameConfig))[0];

  const entityPlainObj = levelData.entityList;
  const entityList = ClassBuilder.entityListFromPlainObj(entityPlainObj);
  const newEntityList = {};
  Object.values(ENTITY_CLASSES).forEach((element) => {
    newEntityList[element] = [];
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!pauseState.pauseStatus) {
        // console.log("GameFrame", "Game Frame");
        entityList[ENTITY_CLASSES.PC].forEach((entity) => {
          //update player movement controls
          let newPosition = entity.getComponent(COMPONENTS.PLACE).position;
          if (controlsList.moveRight) {
            newPosition = Movement.moveRight(entity);
          }
          if (controlsList.moveLeft) {
            newPosition = Movement.moveLeft(entity);
          }
          if (controlsList.moveUp) {
            newPosition = Movement.moveUp(entity);
          }
          if (controlsList.moveDown) {
            newPosition = Movement.moveDown(entity);
          }
          newPosition = Movement.decelerate(entity);

          //camera Controls on Player
          // if (cameraState.type === "follow-box") {
          //   const camera = Camera.followBoxCamera(
          //     entity,
          //     config.gameWindow,
          //     cameraState,
          //     levelData.gridSizeX,
          //     levelData.gridSizeY,
          //     config.gridCellSize
          //   );
          //   dispatch(setCameraPosition(camera));
          // }
          // entity = Movement.updatePosition(entity);
          //update Collisions of Player entity
          // entityList.forEach((entity2, i) => {
          //   if (entity2.class === "block") {
          //     let overlap = Physics.getOverlap(entity, entity2);
          //     if (overlap.x > 0 && overlap.y > 0) {
          //       // console.log("OVERLAP");
          //       entity = Physics.wallCollision(entity, entity2, overlap);
          //     }
          //   }
          // });

          newEntityList[entity.class].push(entity.toPlainObject());
        });
        entityList[ENTITY_CLASSES.NPC].forEach((entity) => {
          newEntityList[entity.class].push(entity.toPlainObject());
        });
        entityList[ENTITY_CLASSES.ITEM].forEach((entity) => {
          newEntityList[entity.class].push(entity.toPlainObject());
        });
        entityList[ENTITY_CLASSES.BLOCK].forEach((entity) => {
          newEntityList[entity.class].push(entity.toPlainObject());
        });
        entityList[ENTITY_CLASSES.DECORATION].forEach((entity) => {
          newEntityList[entity.class].push(entity.toPlainObject());
        });
      }
      dispatch(setEntities(newEntityList));

      // if (controlsList.pause) {
      //   if (pauseState.pauseToggler) {
      //     dispatch(togglePause());
      //   }
      // } else {
      //   dispatch(resetToggler());
      // }
    }, 16.67);

    return () => clearInterval(intervalId);
  }, [entityList, pauseState, dispatch, controlsList]);
};

export default useGameLoop;
