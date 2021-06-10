import THREE from "three";
import { ThisExpression } from "typescript";
import appendActionsDisassembling from "./animationDisassembling";
import appendActionsOilchange from "./animationOilchange";
import appendActionsBallbearing from "./animationsBallbearing";
import appendActionsWorking from "./animationWorking";

type appendActions = (
  scene: THREE.Scene,
  mixer: THREE.Mixer
) => THREE.AnimationAction[];

const getAppendActions = (animationName: string): appendActions | null => {
  switch (animationName) {
    case "/models/gearboxDissassemblingSlowlyLAST.glb":
      return appendActionsDisassembling;
      break;
    case "/models/gearboxOilchange.glb":
      return appendActionsOilchange;
      break;
    case "/models/gearboxWorking.glb":
      return appendActionsWorking;
      break;
    case "/models/gearboxBallbearing.glb":
      return appendActionsBallbearing;
      break;
    default:
      return null;
      break;
  }
};

export { getAppendActions };
