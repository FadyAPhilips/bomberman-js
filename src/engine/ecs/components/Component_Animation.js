class Component_Animation {
  constructor(params) {
    this._currentState = params.currentState ? params.currentState : "default";
    this._statesList = params.statesList;
    this._assetsList = params.assetsList;
    this._animationStartFrame = params.animationStartFrame
      ? params.animationStartFrame
      : 0;
  }

  get everything() {
    return {
      currentState: this._currentState,
      statesList: this._statesList,
      assetsList: this._assetsList,
      animationStartFrame: this._animationStartFrame,
    };
  }

  get statesList() {
    return this._statesList;
  }

  get currentState() {
    return this._currentState;
  }

  setCurrentState(newState, frameCount) {
    if (this._currentState != newState) {
      this._currentState = newState;
      this._animationStartFrame = frameCount;
    }
  }

  get assetsList() {
    return this._assetsList;
  }

  get currentAsset() {
    return this._assetsList[this._currentState];
  }

  getAnimationSlice(frameCount) {
    const animationSlices =
      this._assetsList[this._currentState].animationSlices - 1;

    const currentFrame =
      Math.floor(
        (frameCount - this._animationStartFrame) /
          this._assetsList[this._currentState].framesPerSlice
      ) % animationSlices;

    return (currentFrame / animationSlices) * 100;
  }
}

export default Component_Animation;
