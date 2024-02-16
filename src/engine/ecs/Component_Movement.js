class Component_Movement {
  constructor(params) {
    this.velocity = params.velocity ? params.velocity : { x: 0, y: 0 };
    this.acceleration = params.acceleration;
    this.maxVel = params.maxVel;
  }

  getVelocity() {
    return this.velocity;
  }

  getAcceleration() {
    return this.acceleration;
  }

  getMaxVelocity() {
    return this.maxVel;
  }

  setVelocity(newVel) {
    if (Math.abs(newVel.x) > this.maxVel.x) {
      this.velocity.x = this.maxVel.x;
    } else {
      this.velocity.x = newVel.x;
    }

    if (Math.abs(newVel.y) > this.maxVel.y) {
      this.velocity.y = this.maxVel.y;
    } else {
      this.velocity.y = newVel.y;
    }
  }
}

export default Component_Movement;
