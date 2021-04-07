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

  private mount: any;

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
    const {
      scene,
      axesHelper,
      light,
      renderer,
      controls,
      camera,
    } = this.store.viewerData;
    this.loadViewer(
      scene,
      axesHelper,
      light,
      renderer,
      camera,
      this.store.highlightData
    );

    // Вывод сцены на экран
    const render = () => {
      renderer.render(scene, camera);
    };

    // Добавление слушателя на изменения размера окна для изменения aspect камеры и размеров viewer.
    const onWindowResize = () => {
      camera.aspect =
        (window.innerWidth * this.state.widthCoefficient) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        window.innerWidth * this.state.widthCoefficient,
        window.innerHeight
      );
      render();
    };
    window.addEventListener("resize", onWindowResize, false);

    const clock: THREE.Clock = new THREE.Clock();
    // Three js loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      if (!this.state.isLoading)
        this.props.stores.modelStore.mixer.update(clock.getDelta());
      render();
    };

    animate();
  }

  loadViewer = (scene, axesHelper, light, renderer, camera, highlightData) => {
    scene.add(axesHelper);

    const ambientLight = new THREE.AmbientLight();
    const directionalLight1 = new THREE.DirectionalLight(
      new THREE.Color("hsl(64, 33%, 83%)"),
      0.8
    );
    directionalLight1.position.set(-100, 0, -100);

    const directionalLight2 = new THREE.DirectionalLight(
      new THREE.Color("hsl(64, 33%, 83%)"),
      0.8
    );
    directionalLight2.position.set(100, 100, -100);

    scene.add(ambientLight, directionalLight1, directionalLight2);

    camera.position.z = 250;
    camera.position.x = 250;

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
        "/models/animations2.gltf",
        (gltf) => {
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

              highlightData.originalMaterials[m.id] = mat;
            }
          });

          scene.add(gltf.scene);
          this.props.stores.modelStore.mixer = new THREE.AnimationMixer(
            gltf.scene
          );
          this.props.stores.modelStore.actions.push();
          gltf.animations.forEach((el) => {
            this.props.stores.modelStore.actions.push(el);
            // const action = this.props.stores.modelStore.mixer.clipAction(el);
            // console.log(action);
            // action.play();
          });

          res(1);
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
      this.setState({
        isLoading: false,
      });
    });
  };

  onMouseMove = (event) => {
    const { selectedPart, highlightData, intersectedObject } = this.store;
    const { pickableObjects } = highlightData;

    const intersects = this.store.getIntersects(event.clientX, event.clientY);
    this.store.setIntersectedObject(intersects);
    this.mount.style.cursor = intersectedObject ? "pointer" : "default";

    pickableObjects!.forEach((o) => {
      const isSelected = o === selectedPart;
      if (isSelected) {
        // o.material.transparent = false;
      }

      if (intersectedObject && intersectedObject.name === o.name) {
        o.material.transparent = true;
        o.material.opacity = 0.8;
        // this.props.stores.modelStore.hoveredPart = intersectedObject;

        if (intersectedObject === selectedPart) {
          return;
        }
        o.material.color = new THREE.Color("blue");
      } else {
        if (o === selectedPart) {
          return;
        }

        // @ts-ignore
        o.material.color = highlightData.originalMaterials[o.id].color;
        o.material.transparent = false;
      }
    });
  };

  onModelClick = (event) => {
    const { highlightData, intersectedObject, selectedPart } = this.store;
    const { pickableObjects } = highlightData;

    const intersects = this.store.getIntersects(event.clientX, event.clientY);

    this.store.setSelectedObject(intersects);
    this.mount.style.cursor = intersectedObject ? "pointer" : "default";

    pickableObjects!.forEach((o, i) => {
      if (selectedPart && intersectedObject.name === o.name) {
        if (pickableObjects) {
          pickableObjects[i].material.transparent = true;
          pickableObjects[i].material.color = new THREE.Color("#df1b1b");
        }
      } else if (highlightData.originalMaterials) {
        o.material.color = highlightData.originalMaterials[o.id].color;
      }
    });
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
            highlightData.intersectedObject = intersect.object;
            hiddenObjects.push(highlightData.intersectedObject);
          }
        } else {
          highlightData.intersectedObject = null;
          return;
        }

        pickableObjects!.forEach((o, i) => {
          if (
            highlightData.intersectedObject &&
            highlightData.intersectedObject.name === o.name
          ) {
            if (pickableObjects) {
              pickableObjects[i].parent.visible = false;
            }
            this.store.hiddenObjects.push(o);
          } else {
            // @ts-ignore
            o.material.color = highlightData.originalMaterials[o.id].color;
          }
        });
        break;
      }
      // Изоляция детали
      case "2":
        break;
      // Выделение детали
      case "3":
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Spin spinning={this.state.isLoading} size="large">
        <ContextMenu menuItemClicked={this.menuItemClicked}>
          <div
            ref={(el) => {
              this.mount = el;
            }}
            onMouseMove={this.onMouseMove}
            onDoubleClick={this.onModelClick}
          />
        </ContextMenu>
        <ModelViewerTools />
      </Spin>
    );
  }
}

export default withStores(ModelViewer);
