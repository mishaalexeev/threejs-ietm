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
      const right = document.getElementById("info")?.offsetWidth;
      if (!right) {
        return;
      }

      viewerData.camera.aspect =
        (window.innerWidth - right) / window.innerHeight;
      viewerData.camera.updateProjectionMatrix();
      viewerData.renderer.setSize(
        window.innerWidth - right,
        window.innerHeight
      );
      render();
    };
    window.addEventListener("resize", onWindowResize, false);

    onWindowResize();
    const clock: THREE.Clock = new THREE.Clock();
    // Three js loop
    const animate = () => {
      requestAnimationFrame(animate);
      viewerData.controls.update();
      if (!this.state.isLoading)
        this.props.stores.modelStore.mixer.update(clock.getDelta());
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
    camera.position.set(180, 50, 100);

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
          // gltf.scene.children[0].position.set(100, 50, 80);

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

          let totalDuration = 0;
          const clips = gltf.animations;
          clips.forEach((clip) => {
            totalDuration = Math.max(totalDuration, clip.duration);
            const action = this.store.mixer.clipAction(
              clip.optimize(),
              this.store.viewerData.scene
            );
            action.loop = THREE.LoopOnce;
            this.store.actions.push(action);
            if (clips.length === 1) {
              this.store.mixer.addEventListener("finished", (e) => {
                if (e.action === action) {
                  this.store.mixer.setTime(0.1);
                  this.store.actions.forEach((a) => {
                    a.reset();
                    a.time = this.store.mixer.time;
                    a.play();
                  });
                  this.store.mixer.timeScale = 1.0;
                  this.store.mixer.update(0.00001);
                }
              });
            }
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
    const { selectedPart, highlightData, intersectedObject } = this.store;
    const { pickableObjects } = highlightData;

    const intersects = this.store.getIntersects(event.clientX, event.clientY);
    this.store.setIntersectedObject(intersects);
    this.mount.style.cursor = intersectedObject ? "pointer" : "default";

    pickableObjects?.forEach((o) => {
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
        o.material;
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
    console.log(intersects);
    if (intersects.length < 1) {
      return;
    }
    this.store.setSelectedObject(intersects);
    this.mount.style.cursor = intersectedObject ? "pointer" : "default";

    pickableObjects?.forEach((o) => {
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
        const intersects: THREE.Intersection[] = this.store.getIntersects(
          xPos,
          yPos
        );

        const visibleObjects: THREE.Object3D[] = [];

        this.store.setIntersectedObject(intersects);
        this.mount.style.cursor = highlightData.intersectedObject
          ? "pointer"
          : "default";

        if (intersects.length > 0) {
          const intersect = intersects.find(
            (el) => hiddenObjects.indexOf(el.object) === -1
          );

          const { x, y, z } = intersect.object.parent.position;
          this.store.viewerData.controls?.target.set(x, y, z);
          intersect.object.traverse((n) => {
            if (n.type === "Mesh" || n.type === "LineSegments")
              visibleObjects.push(n);
          });

          let index = 0;
          while (
            index < intersects.length &&
            !intersect.object.parent.visible
          ) {
            index++;
          }
          if (intersect) {
            const leaf = intersect.object.parent;
            if (!leaf) return;

            const boundBox = new THREE.Box3();
            boundBox.setFromObject(leaf);
            const size = new THREE.Vector3();
            boundBox.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);

            const offset =
              maxDim /
              (2.0 *
                Math.tan(
                  this.store.viewerData.controls.object.fov * (Math.PI / 360.0)
                ));

            // this.store.viewerData.controls.object = this.store.viewerData.scene.getObjectByName(
            //   "PerspectiveCamera"
            // );

            const cam = this.store.viewerData.camera;

            //let cam = this.viewer.scene.getObjectByName('__CatalogCamera');

            const pln = new THREE.Plane();
            const lookAtVector = new THREE.Vector3(0, 0, -1);
            lookAtVector.applyQuaternion(cam.quaternion.clone()).normalize();

            pln.setFromNormalAndCoplanarPoint(
              lookAtVector,
              this.store.viewerData.controls.target
            );
            const projectedPoint = new THREE.Vector3();
            const center = new THREE.Vector3();
            boundBox.getCenter(center);
            pln.projectPoint(center, projectedPoint);
            const dCamera = projectedPoint.sub(
              this.store.viewerData.controls.target
            );

            const newCamPose = cam.position.clone().add(dCamera);
            const dist = center.clone().sub(newCamPose);

            this.store.viewerData.controls.target.copy(center.clone());
            dist.setLength(dist.length() - offset * 1.8);
            const finalPose = newCamPose.add(dist);

            const track2 = new THREE.VectorKeyframeTrack(
              ".position",
              [0, 0.3],
              [...cam.position.toArray(), ...finalPose.toArray()],
              THREE.InterpolateSmooth
            );

            const clip2 = new THREE.AnimationClip(null, 0.3, [track2]);
            const action2 = this.store.mixer.clipAction(clip2, cam);

            action2.loop = THREE.LoopOnce;
            //action2.clampWhenFinished = true;

            // action.play();
            //this.viewer.catalogActions.push(action2);
            action2.play();

            this.store.mixer.addEventListener("finished", (e) => {
              if (e.action === action2) {
                e.action.stop();
                this.store.viewerData.camera.position.copy(finalPose.clone());
                this.store.viewerData.controls.object = this.store.viewerData.camera;
              }
            });
          }

          this.store.viewerData.scene.children[5].children[0].traverse((n) => {
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
        } else {
          highlightData.intersectedObject = null;
          return;
        }
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
