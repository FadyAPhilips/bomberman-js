import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEntities } from "../../redux/slices/levelDataSlice";

const useGameLoop = () => {
  const dispatch = useDispatch();
  const entityList = useSelector((state) => state.levelState.entityList);

  function gameloop() {
    console.log("Function executed every 16.67 milliseconds");
  }
  setInterval(gameloop, 16.67);
};

export default useGameLoop;
