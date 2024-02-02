import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEntities } from "../../redux/slices/levelDataSlice";
import Movement from "../movement";

const useGameLoop = () => {
  const dispatch = useDispatch();
  const entityList = useSelector((state) => state.levelState.entityList);
  const controlsList = useSelector((state) => state.InputsState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("New Frame");

      const updatedEntities = entityList.map((entity) => {
        //update player movement controls
        if (entity.class === "pc") {
          if (controlsList.moveRight) {
            entity = Movement.moveRight(entity);
          }
          if (controlsList.moveLeft) {
            entity = Movement.moveLeft(entity);
          }
          if (controlsList.moveUp) {
            entity = Movement.moveUp(entity);
          }
          if (controlsList.moveDown) {
            entity = Movement.moveDown(entity);
          }

          entity = Movement.decelerate(entity);
        }

        //updates position of an entity
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
