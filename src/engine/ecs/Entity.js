import COMPONENTS from "../../enums/COMPONENTS";

class Entity {
  constructor(type, subtype, alive) {
    this._class = type;
    this._subtype = subtype;
    this._components = [];
    this._alive = alive ? alive : true;
  }

  toPlainObject() {
    const obj = {
      class: this._class,
      subtype: this._subtype,
      alive: this._alive,
      components: [],
    };
    this._components.forEach((component) => {
      let componentKey = null;
      for (const [key, value] of Object.entries(COMPONENTS)) {
        if (value === component.constructor) {
          componentKey = key;
          break;
        }
      }
      obj.components.push(componentKey);
      obj[componentKey] = component.everything;
    });
    return obj;
  }

  addComponent(component) {
    this._components.push(component);
  }

  getComponent(componentName) {
    return this._components.find(
      (component) => component.constructor.name === componentName.name
    );
  }

  get class() {
    return this._class;
  }

  get subtype() {
    return this._subtype;
  }

  get alive() {
    return this._alive;
  }

  destroyEntity() {
    this._alive = false;
  }
}

export default Entity;
