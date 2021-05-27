import { observable, makeObservable, action } from "mobx";
import * as THREE from "three";
import { Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RootStore } from "store/index";
import { getAppendActions } from "animations";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  @observable infoKey = "Назначение и описание";
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
    this.viewerData.renderer.setPixelRatio(
      window.devicePixelRatio > 1 ? 1 : window.devicePixelRatio
    );
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
    if (
      this.highlightData.originalMaterials &&
      id &&
      this.selectedPart.id !== id
    ) {
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

  @action setSelectedObject(intersects) {
    if (intersects.length > 0) {
      const intersect = intersects.find(
        (el) => this.hiddenObjects.indexOf(el.object) === -1
      );
      this.selectedPart = intersect ? intersect.object : null;
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
    });
  }
}
