import THREE from "three";
import { ThisExpression } from "typescript";
import appendActionsDisassembling from "./animationDisassembling";

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
      return appendActionsDisassembling;
      break;
    default:
      return null;
      break;
  }
};

export { getAppendActions };
