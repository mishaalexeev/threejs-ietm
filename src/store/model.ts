import { observable, makeObservable, action } from "mobx";
import * as THREE from "three";
import { Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RootStore } from "store/index";

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
type Offsets = {
  left: number;
  right: number;
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

  @observable highlightData: HighlightData = {
    pickableObjects: null,
    intersectedObject: null,
    originalMaterials: null,
    highlightedMaterial: null,
    raycaster: null,
  };

  @observable offset: Offsets = {
    left: 0,
    right: 0,
  };

  public selectedPart: THREE.Mesh = {};

  @observable intersectedObject: THREE.Mesh = {};

  @observable hiddenObjects: THREE.Mesh[] = [];

  private rootStore: RootStore;

  @action initializeViewer(window) {
    this.viewerData.scene = new THREE.Scene();
    this.viewerData.axesHelper = new THREE.AxesHelper(100);
    this.viewerData.camera = new THREE.PerspectiveCamera(
      75,
      (0.625 * window.innerWidth) / window.innerHeight,
      0.1,
      3000
    );
    // this.viewerData.light = new THREE.AmbientLight();
    this.viewerData.light = new THREE.DirectionalLight(
      new THREE.Color("hsl(30,100%,75%)"),
      0.8
    );
    this.viewerData.light.position.set(-100, 0, -100);
    this.offset = {
      // @ts-ignore
      left: document.querySelector(".ant-col-4")!.offsetWidth,
      // @ts-ignore
      right: document.querySelector(".ant-col-5")!.offsetWidth,
    };

    this.viewerData.renderer = new THREE.WebGLRenderer();
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
  }

  // Получить массив объектов на которые наведена мышь
  @action getIntersects(
    clientX: number,
    clientY: number
  ): THREE.Intersection[] {
    const { raycaster, pickableObjects } = this.highlightData;
    const { renderer, camera } = this.viewerData;
    raycaster.setFromCamera(
      {
        x:
          ((clientX - this.offset.left) / renderer.domElement.clientWidth) * 2 -
          1,
        y: -(clientY / renderer.domElement.clientHeight) * 2 + 1,
        z: 0.5,
      },
      camera
    );
    return raycaster.intersectObjects(pickableObjects, false);
  }

  @action setIntersectedObject(intersects: THREE.Intersection[]) {
    if (intersects.length > 0) {
      const intersect = intersects.find(
        (el) => this.hiddenObjects.indexOf(el.object) === -1
      );
      this.intersectedObject = intersect ? intersect.object : null;
    } else {
      this.intersectedObject = null;
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

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      viewerData: observable,
      selectedPart: observable,
      offset: observable,
      hiddenObjects: observable,
      getIntersects: action,
      setIntersectedObject: action,
      setSelectedObject: action,
      initializeViewer: action,
    });
  }
}
