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
      const left = document.getElementById("menu")?.offsetWidth;
      const right = document.getElementById("info")?.offsetWidth;
      if (!(left && right)) {
        return;
      }

      this.store.setOffset(left);

      camera.aspect = (window.innerWidth - left - right) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth - left - right, window.innerHeight);
      render();
    };
    window.addEventListener("resize", onWindowResize, false);

    onWindowResize();
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
        "/models/gearboxAnimated.glb",
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

          gltf.animations.forEach((el) => {
            this.props.stores.modelStore.actions.push(el);
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
        if (intersectedObject === selectedPart) {
          return;
        }
        o.material = new THREE.MeshBasicMaterial();
        o.material.transparent = true;
        o.material.opacity = 0.7;
        o.material.color = new THREE.Color("#000128");
      } else {
        if (o === selectedPart) {
          return;
        }
        // @ts-ignore
        o.material = highlightData.originalMaterials[o.id];
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
          o.material = new THREE.MeshBasicMaterial();
          o.material.transparent = true;
          o.material.opacity = 0.9;
          o.material.color = new THREE.Color("#9a3737");
        }
      } else if (highlightData.originalMaterials) {
        o.material = highlightData.originalMaterials[o.id];
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
          } else if (highlightData.originalMaterials) {
            o.material = highlightData.originalMaterials[o.id];
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
              this.mount = el as HTMLDivElement;
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