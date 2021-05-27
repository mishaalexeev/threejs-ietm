import * as THREE from "three";

function isolateParts(root, partsNames) {
  const prts = [];
  partsNames.forEach((name) => {
    root.getObjectByName(name).traverse((n) => {
      if (n.type === "Mesh" || n.type === "LineSegments") {
        const { parent } = n;
        if (prts.indexOf(parent) < 0) prts.push(parent);
      }
    });
  });

  const hiddenPrts = [];
  root.traverse((n) => {
    if (n.type === "Mesh" || n.type === "LineSegments") {
      const { parent } = n;
      if (prts.indexOf(parent) < 0 && hiddenPrts.indexOf(parent) < 0)
        hiddenPrts.push(parent);
    }
  });

  return hiddenPrts.map((p) => p.name);
}

function appendActionsOilchange(scene, mixer) {
  const infinity = 999999999999999;
  const anims = [
    {
      name: ["Нижняя_часть_корпуса"],
      highlight: {
        times: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 17, 20, 47, 48, 49, 50],
        values: [
          null,
          new THREE.Color("#ffb300"),
          null,
          new THREE.Color("#ffb300"),
          null,
          new THREE.Color("#ffb300"),
          null,
          new THREE.Color("#ffb300"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      },
      actions: [],
    },
    {
      name: ["Верхняя_часть_корпуса"],
      highlight: {
        times: [29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34],
        values: [
          null,
          new THREE.Color("#ffb300"),
          null,
          new THREE.Color("#ffb300"),
          null,
          new THREE.Color("#ffb300"),
          null,
          new THREE.Color("#ffb300"),
          null,
          new THREE.Color("#ffb300"),
          null,
        ],
      },
      actions: [],
    },
  ];

  anims.forEach((a) => {
    a.name.forEach((objName) => {
      scene
        .getObjectByName("Редуктор")
        .getObjectByName(objName)
        .traverse((n) => {
          if (n.type === "Mesh" || n.type === "LineSegments") {
            const clip = new THREE.AnimationClip(null, -1, []);

            if (a.highlight) {
              const origCol = n.material.color.clone();

              const colorTrackVals = a.highlight.values.flatMap((c) => {
                const color = c === null ? origCol : c;
                return [color.r, color.g, color.b];
              });

              const colorTrack = new THREE.ColorKeyframeTrack(
                ".color",
                a.highlight.times,
                colorTrackVals
              );
              clip.tracks.push(colorTrack);
            }

            if (a.visible) {
              const opacityTrack = new THREE.NumberKeyframeTrack(
                ".opacity",
                a.visible.times,
                a.visible.values
              );
              clip.tracks.push(opacityTrack);
            }

            if (a.transparent) {
              const transparentTrack = new THREE.BooleanKeyframeTrack(
                ".transparent",
                a.transparent.times,
                a.transparent.values
              );
              clip.tracks.push(transparentTrack);
            }

            clip.resetDuration();

            // clip.duration = 200;
            const action = mixer.clipAction(clip, n.material);
            a.actions.push(action);
          }
        });
    });
  });

  const times = [0, 6, 11, 23, 25, 29, 38, 45];
  const helper = new THREE.Object3D();
  helper.name = "__StepHelper";
  scene.add(helper);

  const vals = [0, 1, 2, 3, 4, 5, 6, 7];

  const track = new THREE.NumberKeyframeTrack(".x", times, vals);
  track.interpolation = THREE.InterpolateDiscrete;

  const clip = new THREE.AnimationClip(null, -1, [track]);
  clip.duration = 228;

  const a = mixer.clipAction(clip, helper.position);

  const actions = [];
  actions.push(a);
  anims.forEach((anim) => actions.push(...anim.actions));

  return actions;
}

export default appendActionsOilchange;
