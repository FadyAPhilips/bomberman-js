class Component_Movement {
  constructor(vel = { x: 0, y: 0 }, acc, maxVel) {
    this.vel = vel;
    this.acc = acc;
    this.maxVel = maxVel;
  }

  getVelocity() {
    return this.vel;
  }

  getAcceleration() {
    return this.acc;
  }

  getMaxVelocity() {
    return this.maxVel;
  }

  setVelocity(newVel) {
    if (Math.abs(newVel.x) > this.maxVel.x) {
      this.vel.x = this.maxVel.x;
    } else {
      this.vel.x = newVel.x;
    }

    if (Math.abs(newVel.y) > this.maxVel.y) {
      this.vel.y = this.maxVel.y;
    } else {
      this.vel.y = newVel.y;
    }
  }
}

export default Component_Movement;
