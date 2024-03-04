import ClassEntity from "../Entity";
import COMPONENTS from "../../../enums/COMPONENTS";

class EntityManager {
  static entityListFromPlainObj(plainObj) {
    const entityList = {};
    Object.keys(plainObj).forEach((element) => {
      entityList[element] = plainObj[element].map((e) => {
        const entity = new ClassEntity(e.class, e.subtype);
        e.components.forEach((component) => {
          const newComponent = new COMPONENTS[component](e[component]);
          entity.addComponent(newComponent);
        });
        return entity;
      });
    });
    return entityList;
  }

  static createEntity(entityList, e) {
    const newEntityList = { ...entityList };
    const entity = new ClassEntity(e.class, e.subtype);
    e.components.forEach((component) => {
      const newComponent = new component(e[component]);
      entity.addComponent(newComponent);
    });
    newEntityList[entity.class].push(entity.toPlainObject());
    return newEntityList;
  }

  static destroyEntity(entityList, entity) {
    const newEntityList = {};
    Object.keys(entityList).forEach((classList) => {
      newEntityList[classList] = entityList[classList];
      classList.forEach((ent) => {
        if (ent === entity) {
          const index = newEntityList.indexOf(ent);
          newEntityList.splice(index, 1);
        }
      });
    });
    return newEntityList;
  }
}

export default EntityManager;
