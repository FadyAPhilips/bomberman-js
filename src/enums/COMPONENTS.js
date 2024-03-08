import Component_Place from "../engine/ecs/components/Component_Place";
import Component_Movement from "../engine/ecs/components/Component_Movement";
import Component_Bounding from "../engine/ecs/components/Component_Bounding";
import Component_Lifespan from "../engine/ecs/components/Component_Lifespan";
import Component_Animation from "../engine/ecs/components/Component_Animation";

const COMPONENTS = {
  ANIMATION: Component_Animation,
  PLACE: Component_Place,
  MOVEMENT: Component_Movement,
  BOUNDING: Component_Bounding,
  LIFESPAN: Component_Lifespan,
};

export default COMPONENTS;
