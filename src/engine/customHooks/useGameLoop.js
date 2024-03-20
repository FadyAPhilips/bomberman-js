import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logger from "../../devTools/logger";
import { setEntities } from "../../redux/slices/levelDataSlice";
import { setCameraPosition } from "../../redux/slices/cameraSlice";
import {
  togglePause,
  resetToggler,
  incrementFrame,
  calculateFrameRate,
} from "../../redux/slices/gameStateSlice";
import { setInputSwitch } from "../../redux/slices/inputsSlice";
import Camera from "../ecs/systems/camera";
import Movement from "../ecs/systems/movement";
import Physics from "../ecs/systems/physics";
import EntityManager from "../ecs/systems/EntityManager";
import Bombs from "../ecs/systems/bombs";
import ENTITY_CLASSES from "../../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../../enums/ENTITY_SUBTYPES";
import COMPONENTS from "../../enums/COMPONENTS";
import SOUNDS from "../../enums/SOUNDS";
import gameConfig from "../../gameData/gameConfig.json";
import assetsMap from "../../gameData/assets.json";

const assets = JSON.parse(JSON.stringify(assetsMap))[0];
const config = JSON.parse(JSON.stringify(gameConfig))[0];

const useGameLoop = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const devSettings = useSelector((state) => state.DevSettingState.devSetting);
  const levelData = useSelector((state) => state.levelState);
  const controlsList = useSelector((state) => state.inputsState);
  const cameraState = useSelector((state) => state.cameraState);

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
          const entityAnimation = entity.getComponent(COMPONENTS.ANIMATION);
          let currentAnimation = entityAnimation.statesList.DEFAULT;
          let currentPosition = {
            ...entity.getComponent(COMPONENTS.PLACE).position,
          };

          //update player movement controls
          if (controlsList.moveRight.state) {
            Movement.moveRight(entity);
            currentAnimation = entityAnimation.statesList.RUN;
            entity.getComponent(COMPONENTS.PLACE).directionX = 1;
          }
          if (controlsList.moveLeft.state) {
            Movement.moveLeft(entity);
            currentAnimation = entityAnimation.statesList.RUN;
            entity.getComponent(COMPONENTS.PLACE).directionX = -1;
          }
          if (controlsList.moveUp.state) {
            Movement.moveUp(entity);
          }
          if (controlsList.moveDown.state) {
            Movement.moveDown(entity);
          }

          currentPosition = Movement.decelerate(entity, currentPosition);

          //handles player actions
          if (controlsList.action.state && controlsList.action.switch) {
            console.log("ACTION");
            dispatch(setInputSwitch("action"));

            newEntityList = Bombs.spawnBombFromEntity(
              entity,
              newEntityList,
              gameState.frameCount
            );
          }

          //Check Collision with the level bounds.
          currentPosition = Physics.levelEdgeCollision(
            entity,
            levelData.gridSizeX,
            levelData.gridSizeY,
            config.gridCellSize,
            currentPosition
          );

          //update Collisions of Player entity
          if (devSettings.collisionsToggle) {
            entityList[ENTITY_CLASSES.BLOCK].forEach((entity2, i) => {
              let overlap = Physics.getOverlap(
                entity,
                entity2,
                currentPosition
              );
              if (overlap.x > 0 && overlap.y > 0) {
                currentPosition = Physics.wallCollision(
                  entity,
                  entity2,
                  currentPosition,
                  overlap
                );
              }
            });
            entityList[ENTITY_CLASSES.ITEM].forEach((entity2, i) => {
              let overlap = Physics.getOverlap(
                entity,
                entity2,
                currentPosition
              );
              if (overlap.x > 0 && overlap.y > 0) {
                if (entity2.subtype === ENTITY_SUBTYPES.COIN) {
                  entity2.destroyEntity();
                }
              }
            });
          }

          //check entity lifespan
          EntityManager.checkEntityLifespan(entity, gameState.frameCount);

          //Sets Entity Position
          entity.getComponent(COMPONENTS.PLACE).position = currentPosition;

          //handles player animations
          if (
            entity.getComponent(COMPONENTS.MOVEMENT).velocity.y > 0 ||
            entity.getComponent(COMPONENTS.MOVEMENT).velocity.y < 0
          ) {
            currentAnimation = entityAnimation.statesList.JUMPING;
          }
          entityAnimation.setCurrentState(
            currentAnimation,
            gameState.frameCount
          );

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

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });

        entityList[ENTITY_CLASSES.NPC].forEach((entity) => {
          const entityAnimation = entity.getComponent(COMPONENTS.ANIMATION);
          let currentAnimation = entityAnimation.statesList.DEFAULT;

          //check entity lifespan
          EntityManager.checkEntityLifespan(entity, gameState.frameCount);

          // Sets Entity Animations
          entityAnimation.setCurrentState(
            currentAnimation,
            gameState.frameCount
          );

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });

        entityList[ENTITY_CLASSES.ITEM].forEach((entity) => {
          const entityAnimation = entity.getComponent(COMPONENTS.ANIMATION);
          let currentAnimation = entityAnimation.statesList.DEFAULT;

          //check entity lifespan
          EntityManager.checkEntityLifespan(entity, gameState.frameCount);

          entityAnimation.setCurrentState(
            currentAnimation,
            gameState.frameCount
          );

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });

        entityList[ENTITY_CLASSES.BLOCK].forEach((entity) => {
          const entityAnimation = entity.getComponent(COMPONENTS.ANIMATION);
          let currentAnimation = entityAnimation.statesList.DEFAULT;

          //check entity lifespan
          EntityManager.checkEntityLifespan(entity, gameState.frameCount);

          //Handle On Entity Expiry Functionality
          if (!entity.alive) {
            if (entity.subtype === ENTITY_SUBTYPES.BOMB) {
              newEntityList = Bombs.explodeBomb(
                entity,
                newEntityList,
                gameState.frameCount
              );
            }
          }

          entityAnimation.setCurrentState(
            currentAnimation,
            gameState.frameCount
          );

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });

        entityList[ENTITY_CLASSES.DECORATION].forEach((entity) => {
          const entityAnimation = entity.getComponent(COMPONENTS.ANIMATION);
          let currentAnimation = entityAnimation.statesList.DEFAULT;

          //check entity lifespan
          EntityManager.checkEntityLifespan(entity, gameState.frameCount);

          entityAnimation.setCurrentState(
            currentAnimation,
            gameState.frameCount
          );

          if (entity.alive) {
            newEntityList[entity.class].push(entity.toPlainObject());
          }
        });

        dispatch(setEntities(newEntityList));
        if (gameState.frameCount % 20 === 0) {
          dispatch(calculateFrameRate());
        }
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
