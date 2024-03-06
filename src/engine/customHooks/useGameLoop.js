import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logger from "../../devTools/logger";
import { setEntities } from "../../redux/slices/levelDataSlice";
import { setCameraPosition } from "../../redux/slices/cameraSlice";
import {
  togglePause,
  resetToggler,
  incrementFrame,
} from "../../redux/slices/gameStateSlice";
import { setInputSwitch } from "../../redux/slices/inputsSlice";
import Camera from "../ecs/systems/camera";
import Movement from "../ecs/systems/movement";
import Physics from "../ecs/systems/physics";
import gameConfig from "../../gameData/gameConfig.json";
import ENTITY_CLASSES from "../../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../../enums/ENTITY_SUBTYPES";
import EntityManager from "../ecs/systems/EntityManager";
import COMPONENTS from "../../enums/COMPONENTS";

const useGameLoop = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const levelData = useSelector((state) => state.levelState);
  const controlsList = useSelector((state) => state.inputsState);
  const cameraState = useSelector((state) => state.cameraState);
  const config = JSON.parse(JSON.stringify(gameConfig))[0];

  const entityPlainObj = levelData.entityList;
  const entityList = EntityManager.entityListFromPlainObj(entityPlainObj);
  let newEntityList = {};
  Object.values(ENTITY_CLASSES).forEach((element) => {
    newEntityList[element] = [];
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!gameState.pauseStatus) {
        console.log("================== Game Frame ==================");

        entityList[ENTITY_CLASSES.PC].forEach((entity) => {
          //update player movement controls

          if (controlsList.moveRight.state) {
            Movement.moveRight(entity);
          }
          if (controlsList.moveLeft.state) {
            Movement.moveLeft(entity);
          }
          if (controlsList.moveUp.state) {
            Movement.moveUp(entity);
          }
          if (controlsList.moveDown.state) {
            Movement.moveDown(entity);
          }

          if (controlsList.action.state && controlsList.action.switch) {
            console.log("ACTION");
            dispatch(setInputSwitch("action"));

            let newPosition = entity.getComponent(
              COMPONENTS.PLACE
            ).gridPosition;

            const newEntity = {
              class: ENTITY_CLASSES.BLOCK,
              subtype: ENTITY_SUBTYPES.WALL_BLOCK,
              components: [
                COMPONENTS.PLACE,
                COMPONENTS.BOUNDING,
                COMPONENTS.LIFESPAN,
              ],
              [COMPONENTS.PLACE]: {
                pos: { x: newPosition.x, y: newPosition.y },
                size: { x: 64, y: 64 },
              },
              [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
              [COMPONENTS.LIFESPAN]: {
                birthFrame: gameState.frameCount,
                lifespan: 210,
              },
            };

            const newList = { ...newEntityList };
            newEntityList = EntityManager.createEntity(newList, newEntity);
          }

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
          //update Collisions of Player entity

          entityList[ENTITY_CLASSES.BLOCK].forEach((entity2, i) => {
            let overlap = Physics.getOverlap(entity, entity2);
            if (overlap.x > 0 && overlap.y > 0) {
              // console.log("OVERLAP");
              Physics.wallCollision(entity, entity2, overlap);
            }
          });

          Movement.decelerate(entity);

          //check entity lifespan
          if (entity.getComponent(COMPONENTS.LIFESPAN)) {
            const lifeTime = entity
              .getComponent(COMPONENTS.LIFESPAN)
              .checkLifeTime(gameState.frameCount);
            if (lifeTime === 0) {
              entity.destroyEntity();
            }
          }

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });
        entityList[ENTITY_CLASSES.NPC].forEach((entity) => {
          //check entity lifespan
          if (entity.getComponent(COMPONENTS.LIFESPAN)) {
            const lifeTime = entity
              .getComponent(COMPONENTS.LIFESPAN)
              .checkLifeTime(gameState.frameCount);
            if (lifeTime === 0) {
              entity.destroyEntity();
            }
          }

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });
        entityList[ENTITY_CLASSES.ITEM].forEach((entity) => {
          //check entity lifespan
          if (entity.getComponent(COMPONENTS.LIFESPAN)) {
            const lifeTime = entity
              .getComponent(COMPONENTS.LIFESPAN)
              .checkLifeTime(gameState.frameCount);
            if (lifeTime === 0) {
              entity.destroyEntity();
            }
          }

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });
        entityList[ENTITY_CLASSES.BLOCK].forEach((entity) => {
          //check entity lifespan
          if (entity.getComponent(COMPONENTS.LIFESPAN)) {
            const lifeTime = entity
              .getComponent(COMPONENTS.LIFESPAN)
              .checkLifeTime(gameState.frameCount);
            if (lifeTime === 0) {
              entity.destroyEntity();
            }
          }

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });
        entityList[ENTITY_CLASSES.DECORATION].forEach((entity) => {
          //check entity lifespan
          if (entity.getComponent(COMPONENTS.LIFESPAN)) {
            const lifeTime = entity
              .getComponent(COMPONENTS.LIFESPAN)
              .checkLifeTime(gameState.frameCount);
            if (lifeTime === 0) {
              entity.destroyEntity();
            }
          }

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });

        dispatch(setEntities(newEntityList));
        dispatch(incrementFrame());
      }

      if (controlsList.pause.state) {
        if (gameState.pauseToggler) {
          dispatch(togglePause());
        }
      } else {
        dispatch(resetToggler());
      }
    }, 16.67);

    return () => clearInterval(intervalId);
  }, [entityList, gameState, dispatch, controlsList]);
};

export default useGameLoop;
