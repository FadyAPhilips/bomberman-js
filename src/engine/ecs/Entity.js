class Entity {
  #class;
  #subtype;
  #components;

  constructor(type, subtype) {
    this.#class = type;
    this.#subtype = subtype;
    this.#components = [];
  }

  addComponent(component) {
    this.#components.push(component);
  }

  getComponent(componentName) {
    return this.#components.find(
      (component) => component.constructor.name === componentName
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
