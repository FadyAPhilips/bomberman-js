import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logger from "../../devTools/logger";
import {
  setInputToTrue,
  setInputToFalse,
  resetInputSwitch,
} from "../../redux/slices/inputsSlice";
import CONTROLS from "../../gameData/controlsMap";

const useGameInputHandler = () => {
  const dispatch = useDispatch();

  const handleInputs = (event) => {
    if (event.type === "keydown") {
      if (event.key === " ") {
        event.preventDefault();
      }
      if (CONTROLS[event.code]) {
        Logger.log("Controls", CONTROLS[event.code]);
        dispatch(setInputToTrue(CONTROLS[event.code]));
      } else {
        Logger.log("Controls", "Button Unmapped");
      }
    }
    if (event.type === "keyup") {
      if (CONTROLS[event.code]) {
        dispatch(setInputToFalse(CONTROLS[event.code]));
        dispatch(resetInputSwitch(CONTROLS[event.code]));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleInputs);
    document.addEventListener("keyup", handleInputs);
    return () => {
      document.removeEventListener("keydown", handleInputs);
      document.removeEventListener("keyup", handleInputs);
    };
  }, [handleInputs]);
};

export default useGameInputHandler;
