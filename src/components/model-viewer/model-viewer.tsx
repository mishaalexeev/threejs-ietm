import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { Spin } from "antd";
import ModelStore from "store/model";

import { RootStore } from "store";
import ModelViewerTools from "components/model-viewer-tools/model-viewer-tools";
import withStores from "hocs/withStores";
import ContextMenu from "../contextmenu";
import "./model-viewer.css";

type Props = {
  stores: RootStore;
};

type State = {
  widthCoefficient: number;
  isLoading: boolean;
};

class ModelViewer extends Component<Props, State> {
  private readonly store: ModelStore;

  private mount: HTMLDivElement = {} as HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      widthCoefficient: 0.625,
      isLoading: true,
    };
    this.store = props.stores.modelStore;
  }

  componentDidMount() {
    this.store.initializeViewer(window);
    const { viewerData } = this.store;
    this.loadViewer(
      viewerData.scene,
      viewerData.axesHelper,
      viewerData.light,
      viewerData.renderer,
      viewerData.camera,
      this.store.highlightData
    );

    // Вывод сцены на экран
    const render = () => {
      viewerData.renderer.render(viewerData.scene, viewerData.camera);
    };

    // Добавление слушателя на изменения размера окна для изменения aspect камеры и размеров viewer.
    const onWindowResize = () => {
      this.store.onWindowResize();
      render();
    };
    window.addEventListener("resize", onWindowResize, false);

    onWindowResize();
    const clock: THREE.Clock = new THREE.Clock();
    // Three js loop
    const animate = () => {
      requestAnimationFrame(animate);
      viewerData.controls.update();
      const { modelStore: store } = this.props.stores;
      if (store.isAnimationActive) {
        store.setCurrentStep();
      }
      if (!this.state.isLoading) store.mixer.update(clock.getDelta());
      this.store.setTime();
      render();
    };

    animate();
  }

  loadViewer = (scene, axesHelper, light, renderer, camera, highlightData) => {
    scene.add(axesHelper);
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const keyLight = new THREE.DirectionalLight(
      new THREE.Color("hsl(30, 100%, 75%)"),
      1.0
    );
    keyLight.position.set(-100, 0, 100);

    const fillLight = new THREE.DirectionalLight(
      new THREE.Color("hsl(240, 100%, 75%)"),
      0.75
    );
    fillLight.position.set(100, 0, 100);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(ambient, keyLight, fillLight, backLight);

    // scene.position.set(100, 50, 80);

    camera.translateZ(350);
    camera.translateX(300);
    camera.translateY(200);

    scene.add(camera);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(
      window.innerWidth * this.state.widthCoefficient,
      window.innerHeight
    );
    document.body.appendChild(renderer.domElement);

    this.mount.appendChild(renderer.domElement);
    const loader = new GLTFLoader();
    loader.setDRACOLoader(
      new DRACOLoader().setDecoderPath("three/examples/js/libs/draco/")
    );
    new Promise((res, rej) => {
      loader.load(
        this.props.stores.modelStore.modelName,
        (gltf) => {
          // gltf.scene.children[0].position.set(70, 60, 200);

          gltf.scene.traverse((child) => {
            if (child.isMesh) {
              const m = child;
              m.castShadow = true;
              highlightData.pickableObjects.push(m);
              // store reference to original materials for later
              m.material.polygonOffset = true;
              m.depthTest = true;
              m.material.polygonOffsetFactor = 0.5;
              m.material.polygonOffsetUnits = 1;
              m.material.color.convertSRGBToLinear();
              const mat = m.material.clone();
              m.material = mat.clone();
              // m.position.set(120, 19, 253);
              highlightData.originalMaterials[m.id] = mat;
            }
          });

          scene.add(gltf.scene);
          this.props.stores.modelStore.mixer = new THREE.AnimationMixer(
            gltf.scene
          );
          //FreeCam
          const manualCameraObj = scene.getObjectByName("ManualCamera");
          const manualCamera = manualCameraObj.getObjectByName(
            "ManualCamera_Orientation"
          );

          const mainTrackTo = scene.getObjectByName("TrackTo").clone();
          mainTrackTo.name = "MainTrackTo";

          const manualFreeCamera = manualCamera.clone();
          manualFreeCamera.name = "ManualFreeCamera";
          manualFreeCamera.position.copy(manualCameraObj.position.clone());
          manualFreeCamera.rotation.copy(manualCameraObj.rotation.clone());
          manualFreeCamera.quaternion.copy(manualCameraObj.quaternion.clone());
          scene.add(manualFreeCamera, mainTrackTo);

          let totalDuration = 0;
          const clips = gltf.animations;
          clips.forEach((clip) => {
            totalDuration = Math.max(totalDuration, clip.duration);
            const action = this.store.mixer.clipAction(
              clip.optimize(),
              this.store.viewerData.scene
            );
            // action.loop = THREE.LoopRepeat;
            this.store.actions.push(action);
          });

          this.props.stores.modelStore.viewerData.controls?.saveState();

          res(true);
        },
        (xhr) => {
          console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        (error) => {
          console.log(error);
          rej();
        }
      );
    }).then(() => {
      this.props.stores.modelStore.setModelReady();
      console.log(this.store.modelReady);
      this.setState({
        isLoading: false,
      });
    });
  };

  onMouseMove = (event) => {
    if (this.props.stores.modelStore.isAnimationActive) {
      return;
    }
    const { selectedPart, highlightData, intersectedObject } = this.store;
    const { pickableObjects } = highlightData;
    const intersects = this.store.getIntersects(event.clientX, event.clientY);
    const intersect = intersects.find(
      (el) => this.store.hiddenObjects.indexOf(el.object) === -1
    );
    if (intersect) {
      this.store.setIntersectedObject(intersect);
    } else {
      this.store.setObjectToDefault();
    }
    this.mount.style.cursor = intersect ? "pointer" : "default";
  };

  onModelClick = ({ clientX, clientY }) => {
    if (this.store.isAnimationActive) {
      return;
    }
    this.store.setSelectedObjectToDefault();
    const { highlightData, intersectedObject, selectedPart } = this.store;
    const { pickableObjects } = highlightData;

    const intersects = this.store.getIntersects(clientX, clientY);
    if (intersects.length < 1) {
      return;
    }
    this.store.setSelectedObject(intersects);
    this.mount.style.cursor = intersectedObject ? "pointer" : "default";

    this.store.fitToView(clientX, clientY);
  };
  onMouseOut = () => {
    if (!this.store.intersectedObject) {
      return;
    }
    this.store.setObjectToDefault();
  };
  handleClick = () => {
    this.store.contextMenuOpen = false;
  };
  menuItemClicked = (key: string, xPos: number, yPos: number) => {
    const { hiddenObjects, highlightData } = this.store;
    const { pickableObjects } = highlightData;

    switch (key) {
      case "1": {
        const intersects: THREE.Intersection[] = this.store.getIntersects(
          xPos,
          yPos
        );

        this.store.setIntersectedObject(intersects);
        this.mount.style.cursor = highlightData.intersectedObject
          ? "pointer"
          : "default";

        if (intersects.length > 0) {
          const intersect = intersects.find(
            (el) => hiddenObjects.indexOf(el.object) === -1
          );

          if (typeof intersect === "undefined") {
            this.mount.style.cursor = "default";
            highlightData.intersectedObject = null;
          } else {
            this.mount.style.cursor = "pointer";
            this.mount.style.cursor = "pointer";
            highlightData.intersectedObject = intersect.object;
            this.store.hiddenObjects.push(highlightData.intersectedObject);
          }
        } else {
          highlightData.intersectedObject = null;
          return;
        }

        pickableObjects?.forEach((o, i) => {
          if (
            highlightData.intersectedObject &&
            highlightData.intersectedObject.name === o.name
          ) {
            if (pickableObjects) {
              pickableObjects[i].parent.visible = false;
            }
            this.store.hiddenObjects.push(o.parent);
          } else if (highlightData.originalMaterials) {
            o.material = highlightData.originalMaterials[o.id];
            o.material.color = highlightData.originalMaterials[o.id].color;
          }
        });
        break;
      }
      // Изоляция детали
      case "2":
        const visibleObjects = this.store.fitToView(xPos, yPos);
        if (!visibleObjects) return;

        this.store.viewerData.scene
          .getObjectByName("Редуктор")
          .traverse((n) => {
            if (n.type === "Mesh" || n.type === "LineSegments") {
              if (visibleObjects.indexOf(n) < 0) {
                n.visible = false;
                this.store.hiddenObjects.push(n);
              }
            }
          });

        visibleObjects.forEach((n) => {
          n.visible = true;
        });
        break;
      // Выделение детали
      case "3":
        this.onModelClick({ clientX: xPos, clientY: yPos });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Spin spinning={this.state.isLoading} size="large">
        <ContextMenu menuItemClicked={this.menuItemClicked}>
          {/* eslint-disable-next-line */}
          <div
            ref={(el) => {
              this.mount = el as HTMLDivElement;
            }}
            onMouseMove={this.onMouseMove}
            onClick={this.handleClick}
            onKeyDown={this.handleClick}
            onDoubleClick={this.onModelClick}
            onMouseOut={this.onMouseOut}
            onBlur={() => void 0}
          />
        </ContextMenu>
        <ModelViewerTools />
      </Spin>
    );
  }
}

export default withStores(ModelViewer);
