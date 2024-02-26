class Component_Movement {
  constructor(params) {
    this._velocity = params.velocity ? params.velocity : { x: 0, y: 0 };
    this._acceleration = params.acceleration;
    this._maxVel = params.maxVel;
  }

  get everything() {
    return {
      velocity: this._velocity,
      acceleration: this._acceleration,
      maxVel: this._maxVel,
    };
  }

  get velocity() {
    return this._velocity;
  }

  get acceleration() {
    return this._acceleration;
  }

  get maxVelocity() {
    return this._maxVel;
  }

  set velocity(newVel) {
    let newX, newY;
    if (Math.abs(newVel.x) > this._maxVel.x) {
      if (newVel.x > 0) {
        newX = this._maxVel.x;
      } else {
        newX = this._maxVel.x * -1;
      }
    } else {
      newX = newVel.x;
    }

    if (Math.abs(newVel.y) > this._maxVel.y) {
      if (newVel.y > 0) {
        newY = this._maxVel.y;
      } else {
        newY = this._maxVel.y * -1;
      }
    } else {
      newY = newVel.y;
    }

    this._velocity = { x: newX, y: newY };
  }
}

export default Component_Movement;
