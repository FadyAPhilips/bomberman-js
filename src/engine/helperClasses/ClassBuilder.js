import ClassEntity from "../ecs/Entity";
import COMPONENTS from "../../enums/COMPONENTS";

class ClassBuilder {
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
}

export default ClassBuilder;
