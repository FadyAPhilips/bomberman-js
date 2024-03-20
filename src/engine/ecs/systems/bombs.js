import COMPONENTS from "../../../enums/COMPONENTS";
import ENTITY_CLASSES from "../../../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../../../enums/ENTITY_SUBTYPES";
import SOUNDS from "../../../enums/SOUNDS";
import assetsMap from "../../../gameData/assets.json";
import EntityManager from "./EntityManager";

const assets = JSON.parse(JSON.stringify(assetsMap))[0];

class Bombs {
  static spawnBombFromEntity(entity, entityList, frameCount) {
    SOUNDS.BOMB_PLACE.currentTime = 0;
    SOUNDS.BOMB_PLACE.play();

    const newList = { ...entityList };
    const newPosition = entity.getComponent(COMPONENTS.PLACE).gridPosition;
    const bombSize = entity.getComponent(COMPONENTS.STATUS).bombSize;

    const newEntity = {
      class: ENTITY_CLASSES.BLOCK,
      subtype: ENTITY_SUBTYPES.BOMB,
      components: [
        COMPONENTS.PLACE,
        COMPONENTS.BOUNDING,
        COMPONENTS.LIFESPAN,
        COMPONENTS.ANIMATION,
        COMPONENTS.STATUS,
      ],
      [COMPONENTS.PLACE]: {
        pos: { x: newPosition.x, y: newPosition.y },
        size: { x: 64, y: 64 },
      },
      [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
      [COMPONENTS.LIFESPAN]: {
        birthFrame: frameCount,
        lifespan: 160,
      },
      [COMPONENTS.ANIMATION]: {
        statesList: {
          DEFAULT: "default",
        },
        assetsList: {
          default: assets.bomb,
        },
      },
      [COMPONENTS.STATUS]: {
        bombSize: bombSize,
      },
    };

    return EntityManager.createEntity(newList, newEntity);
  }

  static returnFireEntity(newPosition, frameCount, blockList) {
    let newFireEntity = {
      class: ENTITY_CLASSES.ITEM,
      subtype: ENTITY_SUBTYPES.FIRE,
      components: [
        COMPONENTS.PLACE,
        COMPONENTS.BOUNDING,
        COMPONENTS.LIFESPAN,
        COMPONENTS.ANIMATION,
      ],
      [COMPONENTS.PLACE]: {
        pos: { x: newPosition.x, y: newPosition.y },
        size: { x: 64, y: 64 },
      },
      [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
      [COMPONENTS.LIFESPAN]: {
        birthFrame: frameCount,
        lifespan: 70,
      },
      [COMPONENTS.ANIMATION]: {
        statesList: {
          DEFAULT: "default",
        },
        assetsList: {
          default: assets.fire,
        },
      },
    };

    if (blockList) {
      blockList.forEach((block) => {
        const blockPos = block.getComponent(COMPONENTS.PLACE).gridPosition;
        if (blockPos.x === newPosition.x && blockPos.y === newPosition.y) {
          newFireEntity = false;
          if (block.subtype === ENTITY_SUBTYPES.BRICKS) {
            block.destroyEntity();
          }
        }
      });
    }

    return newFireEntity;
  }

  static explodeBomb(bombEntity, entityList, frameCount, blockList) {
    SOUNDS.BOMB_BLAST.currentTime = 0;
    SOUNDS.BOMB_BLAST.play();
    let newList = { ...entityList };

    const bombPosition = bombEntity.getComponent(COMPONENTS.PLACE).gridPosition;
    const bombSize = bombEntity.getComponent(COMPONENTS.STATUS).bombSize;

    const newFireEntity = Bombs.returnFireEntity(bombPosition, frameCount);
    newList = EntityManager.createEntity(newList, newFireEntity);

    //Right Bomb Lines
    for (let index = 1; index <= bombSize; index++) {
      const newFirePosition = { x: bombPosition.x + index, y: bombPosition.y };
      const newFireEntity = Bombs.returnFireEntity(
        newFirePosition,
        frameCount,
        blockList
      );

      if (newFireEntity) {
        newList = EntityManager.createEntity(newList, newFireEntity);
      } else {
        break;
      }
    }

    //Left Bomb Lines
    for (let index = 1; index <= bombSize; index++) {
      const newFirePosition = { x: bombPosition.x - index, y: bombPosition.y };
      const newFireEntity = Bombs.returnFireEntity(
        newFirePosition,
        frameCount,
        blockList
      );

      if (newFireEntity) {
        newList = EntityManager.createEntity(newList, newFireEntity);
      } else {
        break;
      }
    }

    //Top Bomb Lines
    for (let index = 1; index <= bombSize; index++) {
      const newFirePosition = { x: bombPosition.x, y: bombPosition.y - index };
      const newFireEntity = Bombs.returnFireEntity(
        newFirePosition,
        frameCount,
        blockList
      );
      if (newFireEntity) {
        newList = EntityManager.createEntity(newList, newFireEntity);
      } else {
        break;
      }
    }

    //Bottom Bomb Lines
    for (let index = 1; index <= bombSize; index++) {
      const newFirePosition = { x: bombPosition.x, y: bombPosition.y + index };
      const newFireEntity = Bombs.returnFireEntity(
        newFirePosition,
        frameCount,
        blockList
      );
      if (newFireEntity) {
        newList = EntityManager.createEntity(newList, newFireEntity);
      } else {
        break;
      }
    }

    return newList;
  }
}

export default Bombs;
