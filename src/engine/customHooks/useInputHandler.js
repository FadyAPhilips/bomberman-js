import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEntities } from "../../redux/slices/levelDataSlice";

const useGameInputHandler = () => {
  const dispatch = useDispatch();
  const entityList = useSelector((state) => state.levelState.entityList);

  const handleInputs = (event) => {
    if (event.type === "keydown" && event.code === "KeyD") {
      console.log("Move Right");

      let pc = JSON.parse(JSON.stringify(entityList));

      pc[0].pos.x += 20;

      dispatch(setEntities(pc));

      //this to set input state to true
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
