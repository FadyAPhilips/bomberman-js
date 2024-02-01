import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEntities } from "../../redux/slices/levelDataSlice";
import Movement from "../movement";

const useGameLoop = () => {
  const dispatch = useDispatch();
  const entityList = useSelector((state) => state.levelState.entityList);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("New Frame");

      const updatedEntities = entityList.map((entity) => {
        if (entity.movement) {
          return Movement.updatePosition(entity);
        }
        return entity;
      });

      dispatch(setEntities(updatedEntities));
    }, 16.67);

    return () => clearInterval(intervalId);
  }, [entityList, dispatch]);
};

export default useGameLoop;
