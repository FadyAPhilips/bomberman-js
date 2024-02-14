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

const useGameLoop = () => {
  const dispatch = useDispatch();
  const levelData = useSelector((state) => state.levelState);
  const controlsList = useSelector((state) => state.inputsState);
  const cameraState = useSelector((state) => state.cameraState);
  const pauseState = useSelector((state) => state.pauseState);
  const config = JSON.parse(JSON.stringify(gameConfig))[0];

  const entityList = levelData.entityList;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!pauseState.pauseStatus) {
        Logger.log("GameFrame", "Game Frame");
        const updatedEntities = entityList.map((entity) => {
          if (entity.class === "pc") {
            //update player movement controls
            if (controlsList.moveRight) {
              entity = Movement.moveRight(entity);
            }
            if (controlsList.moveLeft) {
              entity = Movement.moveLeft(entity);
            }
            if (controlsList.moveUp) {
              entity = Movement.moveUp(entity);
            }
            if (controlsList.moveDown) {
              entity = Movement.moveDown(entity);
            }

            entity = Movement.decelerate(entity);

            //camera Controls on Player
            if (cameraState.type === "follow-box") {
              const camera = Camera.followBoxCamera(
                entity,
                config.gameWindow,
                cameraState,
                levelData.gridSizeX,
                levelData.gridSizeY,
                config.gridCellSize
              );
              dispatch(setCameraPosition(camera));
            }

            entity = Movement.updatePosition(entity);

            //update Collisions of Player entity
            entityList.forEach((entity2, i) => {
              if (entity2.class === "block") {
                let overlap = Physics.getOverlap(entity, entity2);
                console.log(entity.pos);
                console.log(entity2.pos);
                if (overlap.x > 0 && overlap.y > 0) {
                  // console.log("OVERLAP");
                  entity = Physics.wallCollision(entity, entity2, overlap);
                }
              }
            });
          }

          return entity;
        });
        dispatch(setEntities(updatedEntities));
      }

      if (controlsList.pause) {
        if (pauseState.pauseToggler) {
          dispatch(togglePause());
        }
      } else {
        dispatch(resetToggler());
      }
    }, 16.67);

    return () => clearInterval(intervalId);
  }, [entityList, pauseState, dispatch, controlsList.pause]);
};

export default useGameLoop;
