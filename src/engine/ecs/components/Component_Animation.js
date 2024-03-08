class Component_Animation {
  constructor(params) {
    this._currentState = params.currentState ? params.currentState : "default";
    this._statesList = params.statesList;
    this._assetsList = params.assetsList;
  }

  get everything() {
    return {
      currentState: this._currentState,
      statesList: this._statesList,
      assetsList: this._assetsList,
    };
  }

  get statesList() {
    return this._statesList;
  }

  get currentState() {
    return this._currentState;
  }

  set currentState(newState) {
    this._currentState = newState;
  }

  get assetsList() {
    return this._assetsList;
  }

  resetState() {
    this._currentState = "default";
  }
}

export default Component_Animation;
