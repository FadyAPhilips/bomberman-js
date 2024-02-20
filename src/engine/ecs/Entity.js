import COMPONENTS from "../../enums/COMPONENTS";

class Entity {
  #class;
  #subtype;
  #components;

  constructor(type, subtype) {
    this.#class = type;
    this.#subtype = subtype;
    this.#components = [];
  }

  toPlainObject() {
    const obj = {
      class: this.#class,
      subtype: this.#subtype,
      components: [],
    };
    this.#components.forEach((component) => {
      let componentKey = null;
      for (const [key, value] of Object.entries(COMPONENTS)) {
        if (value === component.constructor) {
          componentKey = key;
          break;
        }
      }
      obj.components.push(componentKey);
      obj[componentKey] = component.getEverything();
    });
    return obj;
  }

  addComponent(component) {
    this.#components.push(component);
  }

  getComponent(componentName) {
    return this.#components.find(
      (component) => component.constructor.name === componentName.name
    );
  }

  getClass() {
    return this.#class;
  }

  getSubtype() {
    return this.#subtype;
  }
}

export default Entity;
