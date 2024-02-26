import COMPONENTS from "../../enums/COMPONENTS";

class Entity {
  constructor(type, subtype) {
    this._class = type;
    this._subtype = subtype;
    this._components = [];
  }

  toPlainObject() {
    const obj = {
      class: this._class,
      subtype: this._subtype,
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
}

export default Entity;
