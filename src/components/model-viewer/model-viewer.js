import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import withStores from "../../hocs/withStores";

class ModelViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0.625 * window.innerWidth
        }
    }

    loadViewer = (scene, axesHelper, light, renderer, camera, highlightData) => {
        scene.add(axesHelper)
        scene.add(light);
        camera.position.z = 450;
        camera.position.x = 250;
        
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.setSize(this.state.width, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        this.mount.appendChild(renderer.domElement);
        const loader = new GLTFLoader()
        loader.setDRACOLoader(new DRACOLoader().setDecoderPath('/draco/'));
        new Promise((res, rej) => {
            loader.load(
                '/models/gear222.glb',
                function (gltf) {
                    gltf.scene.traverse(function (child) {
                        if ((child).isMesh) {
                            let m = child
                            //the sphere and plane will not be mouse picked. THe plane will receive shadows while everything else casts shadows.
                            m.castShadow = true
                            highlightData.pickableObjects.push(m)
                            //store reference to original materials for later
                            highlightData.originalMaterials[m.name] = (m).material;
                        }
                    })

                    scene.add(gltf.scene);
                    res();
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
                },
                (error) => {
                    console.log(error);
                }
            );
        }).then(()=> {

        })
    }

    componentDidMount() {
        const { modelStore } = this.props.stores;
        modelStore.initializeViewer(window);
        const { scene, axesHelper, light, renderer, controls, camera, highlightData } = modelStore.viewerData;
        this.loadViewer(scene, axesHelper, light, renderer, camera, highlightData);

        // Добавление слушателя на изменения размера окна для изменения aspect камеры и размеров viewer.
        const onWindowResize = () => {
            camera.aspect = this.state.width / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(this.state.width, window.innerHeight);
            render();
        }
        window.addEventListener('resize', onWindowResize, false)

        //Вывод сцены на экран
        const render = () => {
            renderer.render(scene, camera);
        }

        // Three js loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            render();
        };

        animate();
    }

    onMouseMove = (event) => {
        const { viewerData } = this.props.stores.modelStore;
        let { hoveredPart } = this.props.stores.modelStore;
        const { renderer, camera, highlightData } = viewerData;
        let { pickableObjects, intersectedObject, raycaster, intersects } = highlightData;
        
        const offset = {
            left: document.querySelector(".ant-col-4").offsetWidth,
            right: document.querySelector(".ant-col-5").offsetWidth,
        }
       
        raycaster.setFromCamera({
            x: ((event.clientX - offset.left) / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
            z: 0.5
        }, camera);
        intersects = raycaster.intersectObjects(pickableObjects, false);

        if (intersects.length > 0) {
            intersectedObject = intersects[0].object
        } else {
            intersectedObject = null
        }

        hoveredPart = intersectedObject;
        
        pickableObjects.forEach((o, i) => {
            if (intersectedObject && intersectedObject.name === o.name ) {
                
                pickableObjects[i].material.transparent = true;
                pickableObjects[i].material.opacity = 0.8;
            } else {
                pickableObjects[i].material.transparent = false;
            }
        })
    }

    onModelClick = (event) => {
        const { renderer, camera, highlightData } = this.props.stores.modelStore.viewerData;
        let { pickableObjects, intersectedObject, raycaster, intersects } = highlightData;
        let { selectedPart } = this.props.stores.modelStore;

        const offset = {
            left: document.querySelector(".ant-col-4").offsetWidth,
        }
       
        raycaster.setFromCamera({
            x: ((event.clientX - offset.left) / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
            z: 0.5
        }, camera);
        intersects = raycaster.intersectObjects(pickableObjects, false);

        if (intersects.length > 0) {
            intersectedObject = intersects[0].object
        } else {
            intersectedObject = null
            return
        }
        
        pickableObjects.forEach((o, i) => {
            if (intersectedObject && intersectedObject.name === o.name) {
                selectedPart = intersectedObject;
                pickableObjects[i].material.transparent = true;
                pickableObjects[i].material.color = new THREE.Color('red');
            } else{
                pickableObjects[i].material.color = new THREE.Color('1,1,1');
            }
        })
    }
    render() {
        return (
            <div ref={ref => (this.mount = ref)} onMouseMove={this.onMouseMove} onClick={this.onModelClick}/>
        )
    }
}

export default withStores(ModelViewer);
