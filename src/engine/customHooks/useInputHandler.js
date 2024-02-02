import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEntities } from "../../redux/slices/levelDataSlice";
import {
  setInputToTrue,
  setInputToFalse,
} from "../../redux/slices/inputsSlice";

const useGameInputHandler = () => {
  const dispatch = useDispatch();
  const entityList = useSelector((state) => state.levelState.entityList);

  const handleInputs = (event) => {
    if (event.type === "keydown") {
      dispatch(setInputToTrue(event.code));
    }
    if (event.type === "keyup") {
      dispatch(setInputToFalse(event.code));
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
