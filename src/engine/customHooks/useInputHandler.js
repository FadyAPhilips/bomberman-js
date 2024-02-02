import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInputToTrue,
  setInputToFalse,
} from "../../redux/slices/inputsSlice";
import CONTROLS from "../CONTROLS";

const useGameInputHandler = () => {
  const dispatch = useDispatch();

  const handleInputs = (event) => {
    if (event.type === "keydown") {
      if (CONTROLS[event.code]) {
        console.log(CONTROLS[event.code]);
        dispatch(setInputToTrue(CONTROLS[event.code]));
      } else {
        console.log("Button Unmapped");
      }
    }
    if (event.type === "keyup") {
      if (CONTROLS[event.code]) {
        dispatch(setInputToFalse(CONTROLS[event.code]));
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
