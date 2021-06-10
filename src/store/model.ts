import { observable, makeObservable, action } from "mobx";
import * as THREE from "three";
import { Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RootStore } from "store/index";
import { getAppendActions } from "animations";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  stepDataDisassembling,
  stepDataOilchange,
  stepDataWorking,
  stepDataBallbearing,
} from "data/stepData";

type ViewerData = {
  scene: Scene;
  axesHelper: THREE.AxesHelper | null;
  camera: THREE.Camera | null;
  light: THREE.Light | null;
  renderer: THREE.Renderer | null;
  controls: OrbitControls | null;
};
type HighlightData = {
  pickableObjects: Array<THREE.Mesh> | null;
  intersectedObject: THREE.Mesh;
  originalMaterials: THREE.Material[] | null;
  highlightedMaterial: THREE.Material | null;
  raycaster: THREE.Raycaster | null;
};
export default class ModelStore {
  @observable viewerData: ViewerData = {
    scene: null,
    axesHelper: null,
    camera: null,
    light: null,
    renderer: null,
    controls: null,
  };
  @observable modelReady = false;
  @observable isAnimationPlaying = false;
  @observable isAnimationActive = false;
  @observable time = 0;
  @observable infoKey = "Введение";
  @observable contextMenuOpen = false;
  @action setTime() {
    this.time = this.mixer.time;
  }
  @action setCurrentStep() {
    this.currentStep = this.viewerData.scene.getObjectByName(
      "__StepHelper"
    ).position.x;
  }
  @observable currentStep = 0;

  @observable stepData: Array<string> = [];

  @observable highlightData: HighlightData = {
    pickableObjects: null,
    intersectedObject: null,
    originalMaterials: null,
    highlightedMaterial: null,
    raycaster: null,
  };

  // anim
  @observable mixer: THREE.Mixer | null = null;

  @observable modelName = "/models/gearboxDissassemblingLAST2.glb";

  @observable actions: Array<any> = [];

  public selectedPart: THREE.Mesh = {};

  @observable intersectedObject: THREE.Mesh = {};

  @observable hiddenObjects: THREE.Mesh[] = [];

  @observable isFullscreen = false;

  private rootStore: RootStore;

  @action setModelReady() {
    this.modelReady = true;
  }
  @action loadAnimation(modelPath: string) {
    this.mixer.stopAllAction();
    const loader = new GLTFLoader();
    this.actions = [];
    return new Promise((res) => {
      loader.load(modelPath, (gltf) => {
        const clips = gltf.animations;
        clips.forEach((clip) => {
          const action = this.mixer.clipAction(
            clip.optimize(),
            this.viewerData.scene
          );
          this.actions.push(action);
        });
        res(modelPath);
      });
    });
  }

  @action stopAnimations() {
    this.isAnimationActive = false;
    this.isAnimationPlaying = false;
    this.mixer.stopAllAction();
    this.viewerData.camera = this.viewerData.scene.getObjectByName(
      "MainFreePerspectiveCamera"
    );
  }
  @action initializeViewer(window) {
    this.viewerData.scene = new THREE.Scene();
    this.viewerData.axesHelper = new THREE.AxesHelper(0);
    let right = document.getElementById("info")?.clientWidth;
    if (!right) {
      right = 0;
    }

    this.viewerData.camera = new THREE.PerspectiveCamera(
      75,
      (window.innerWidth - right) / window.innerHeight,
      0.1,
      3000
    );
    this.viewerData.camera.name = "MainFreePerspectiveCamera";

    // this.viewerData.light = new THREE.AmbientLight();
    this.viewerData.light = new THREE.DirectionalLight(
      new THREE.Color("hsl(30,100%,75%)"),
      0.8
    );
    this.viewerData.light.position.set(-100, 0, -100);

    this.viewerData.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.viewerData.renderer.setPixelRatio(1);
    this.viewerData.renderer.setClearColor(new THREE.Color("ghostwhite"));

    this.viewerData.controls = new OrbitControls(
      this.viewerData.camera,
      this.viewerData.renderer.domElement
    );

    this.highlightData.pickableObjects = [];
    this.highlightData.originalMaterials = [];
    this.highlightData.highlightedMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x00ff00,
    });
    this.highlightData.raycaster = new THREE.Raycaster();

    // animations
    this.mixer = new THREE.AnimationMixer();
  }

  @action startAnimation(animationName) {
    if (!this.isAnimationActive) {
      this.isAnimationPlaying = true;
      this.isAnimationActive = true;
    }

    const appendActions = getAppendActions(animationName);
    if (!appendActions) return;

    const appActions: THREE.AnimationAction[] = appendActions(
      this.viewerData.scene,
      this.mixer
    );
    this.actions.push(...appActions);

    this.viewerData.camera = this.viewerData.scene.getObjectByName(
      "ManualCamera_Orientation"
    );
    this.mixer.setTime(0);
    this.actions.forEach((a: THREE.AnimationAction) => {
      a.play();
    });

    switch (animationName) {
      case "/models/gearboxDissassemblingSlowlyLAST.glb":
        this.stepData = stepDataDisassembling;
        break;
      case "/models/gearboxOilchange.glb":
        this.stepData = stepDataOilchange;
        break;
      case "/models/gearboxWorking.glb":
        this.stepData = stepDataWorking;
        break;
      case "/models/gearboxBallbearing.glb":
        this.stepData = stepDataBallbearing;
        break;
      default:
        return null;
        break;
    }

    this.onWindowResize();
  }

  @action highlightPart = (part: THREE.Mesh) => {
    this.highlightData.pickableObjects!.forEach((o, i) => {
      if (part && part.name === o.name) {
        o.material = new THREE.MeshBasicMaterial();
        o.material.transparent = true;
        o.material.opacity = 0.9;
        o.material.color = new THREE.Color("#9a3737");
      } else if (this.highlightData.originalMaterials) {
        o.material = this.highlightData.originalMaterials[o.id];
        o.material.color = this.highlightData.originalMaterials[o.id].color;
      }
    });
  };

  @action setSelectedPartById = (id: number) => {
    const selectedPart = this.viewerData.scene
      .getObjectByName("Редуктор")
      .getObjectById(id);
    if (selectedPart) {
      this.selectedPart = selectedPart;
      this.highlightPart(this.selectedPart);
    }
  };

  // Получить массив объектов на которые наведена мышь
  @action getIntersects(
    clientX: number,
    clientY: number
  ): THREE.Intersection[] {
    const { raycaster, pickableObjects } = this.highlightData;
    const { renderer, camera } = this.viewerData;
    raycaster.setFromCamera(
      {
        x: (clientX / renderer.domElement.clientWidth) * 2 - 1,
        y: -(clientY / renderer.domElement.clientHeight) * 2 + 1,
        z: 0.5,
      },
      camera
    );
    return raycaster.intersectObjects(pickableObjects, false);
  }

  @action setObjectToDefault() {
    if (this.intersectedObject == null) {
      return;
    }

    const { id } = this.intersectedObject;
    let test;
    if (this.selectedPart) {
      test = this.selectedPart.id !== id;
    } else {
      test = true;
    }
    if (this.highlightData.originalMaterials && id && test) {
      this.intersectedObject.material = this.highlightData.originalMaterials[
        id
      ];
      this.intersectedObject.material.color = this.highlightData.originalMaterials[
        id
      ].color;
      this.intersectedObject.material.transparent = false;
      this.intersectedObject = null;
    }
  }

  @action setIntersectedObject(intersect: THREE.Intersection) {
    if (this.selectedPart === intersect.object) {
      this.setObjectToDefault();
      return;
    }
    if (!intersect.object) {
      return;
    }
    if (this.intersectedObject !== intersect.object) {
      this.setObjectToDefault();
      this.intersectedObject = intersect.object;
      this.intersectedObject.material = new THREE.MeshBasicMaterial();
      this.intersectedObject.material.transparent = true;
      this.intersectedObject.material.opacity = 0.7;
      this.intersectedObject.material.color = new THREE.Color("#000128");
    }
  }

  @action setSelectedObjectToDefault() {
    if (
      this.selectedPart &&
      this.selectedPart.id &&
      this.highlightData.originalMaterials
    ) {
      this.selectedPart.material = this.highlightData.originalMaterials[
        this.selectedPart.id
      ];
      this.selectedPart.material.color = this.highlightData.originalMaterials[
        this.selectedPart.id
      ].color;
    }
    this.selectedPart = null;
  }

  @action setSelectedObject(intersects) {
    if (intersects.length > 0) {
      const intersect = intersects.find(
        (el) => this.hiddenObjects.indexOf(el.object) === -1
      );

      this.setSelectedObjectToDefault();

      this.selectedPart = intersect ? intersect.object : null;
      if (this.selectedPart) {
        this.selectedPart.material = new THREE.MeshBasicMaterial();
        this.selectedPart.material.transparent = true;
        this.selectedPart.material.opacity = 0.9;
        this.selectedPart.material.color = new THREE.Color("#9a3737");
        this.infoKey = this.selectedPart.name;
      }
    } else {
      this.selectedPart = null;
    }
  }

  @action toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    this.onWindowResize();
  }

  @action onWindowResize() {
    let width = !this.isFullscreen
      ? 0.7 * window.innerWidth
      : window.innerWidth;
    if (!width) {
      width = 0;
    }

    this.viewerData.camera.aspect = width / window.innerHeight;
    this.viewerData.camera.updateProjectionMatrix();
    this.viewerData.renderer.setSize(width, window.innerHeight);
  }

  @action changeCamera(camera: THREE.PerspectiveCamera) {
    this.viewerData.camera = camera;
  }

  @action fitToView(xPos: number, yPos: number, returnToMain = false) {
    let intersects: THREE.Intersection[];

    if (!returnToMain) {
      intersects = this.getIntersects(xPos, yPos);
      this.setIntersectedObject(intersects);
    } else {
      intersects = [];
    }

    if (returnToMain || intersects.length > 0) {
      const intersect = returnToMain
        ? this.viewerData.scene.getObjectByName("Редуктор")
        : intersects.find((el) => this.hiddenObjects.indexOf(el.object) === -1)
            .object;

      const { x, y, z } = intersect.parent.position;
      this.viewerData.controls?.target.set(x, y, z);

      let index = 0;
      while (index < intersects.length && !intersect.parent.visible) {
        index++;
      }
      const visibleObjects: THREE.Object3D[] = [];
      if (intersect) {
        const leaf = intersect.parent;
        if (!leaf) return;

        const boundBox = new THREE.Box3();
        boundBox.setFromObject(leaf);
        const size = new THREE.Vector3();
        boundBox.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const offset =
          maxDim /
          (2.0 *
            Math.tan(this.viewerData.controls.object.fov * (Math.PI / 360.0)));

        const cam = this.viewerData.camera;

        const pln = new THREE.Plane();
        const lookAtVector = new THREE.Vector3(0, 0, -1);
        lookAtVector.applyQuaternion(cam.quaternion.clone()).normalize();
        intersect.traverse((n) => {
          if (n.type === "Mesh" || n.type === "LineSegments")
            visibleObjects.push(n);
        });

        pln.setFromNormalAndCoplanarPoint(
          lookAtVector,
          this.viewerData.controls.target
        );
        const projectedPoint = new THREE.Vector3();
        const center = new THREE.Vector3();
        boundBox.getCenter(center);
        pln.projectPoint(center, projectedPoint);
        const dCamera = projectedPoint.sub(this.viewerData.controls.target);

        const newCamPose = cam.position.clone().add(dCamera);
        const dist = center.clone().sub(newCamPose);

        this.viewerData.controls.target.copy(center.clone());
        dist.setLength(dist.length() - offset * 1.8);
        const finalPose = newCamPose.add(dist);

        const track2 = new THREE.VectorKeyframeTrack(
          ".position",
          [0, 0.5],
          [...cam.position.toArray(), ...finalPose.toArray()],
          THREE.QuaternionLinearInterpolant
        );

        const clip2 = new THREE.AnimationClip(null, 0.5, [track2]);
        const action2 = this.mixer.clipAction(clip2, cam);

        action2.loop = THREE.LoopOnce;
        action2.play();
        this.mixer.addEventListener("finished", (e) => {
          if (e.action === action2) {
            e.action.stop();
            this.viewerData.camera.position.copy(finalPose.clone());
            this.viewerData.controls.object = this.viewerData.camera;
          }
        });
        return visibleObjects;
      }
    } else {
      this.highlightData.intersectedObject = null;
      return;
    }
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      viewerData: observable,
      selectedPart: observable,
      hiddenObjects: observable,
      getIntersects: action,
      setIntersectedObject: action,
      setSelectedObject: action,
      initializeViewer: action,
      startAnimation: action,
      mixer: observable,
      actions: observable,
      modelReady: observable,
      setModelReady: action,
      time: observable,
      setTime: action,
      isAnimationPlaying: observable,
      onWindowResize: action,
      changeCamera: action,
      currentStep: observable,
      isAnimationActive: observable,
      setCurrentStep: action,
      infoKey: observable,
      stopAnimations: action,
      toggleFullscreen: action,
      isFullscreen: observable,
      setObjectToDefault: action,
      contextMenuOpen: observable,
      stepData: observable,
      setSelectedObjectToDefault: action,
    });
  }
}
