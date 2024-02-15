class Entity {
  constructor(type, subtype) {
    this.type = type;
    this.subtype = subtype;
    this.components = [];
  }

  addComponent(component) {
    this.components.push(component);
  }

  getComponent(component) {}
}
