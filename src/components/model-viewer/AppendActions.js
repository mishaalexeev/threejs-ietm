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

function appendActions(scene, mixer) {
  const anims = [
    {
      name: ["Крышка_промежуточная_верхняя001"],
      visible: {
        times: [0, 4, 150],
        values: [1, 0, 0],
      },
      transparent: {
        times: [0, 4, 150],
        values: [false, true, true],
      },
      highlight: {
        times: [2, 2.5, 3, 3.5, 4],
        values: [
          null,
          new THREE.Color("#ff0202"),
          null,
          new THREE.Color("#f80606"),
          null,
        ],
      },
      actions: [],
    },
  ];

  anims.forEach((a) => {
    a.name.forEach((objName) => {
      scene.children[4].children[0].getObjectByName(objName).traverse((n) => {
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
          action.loop = THREE.LoopOnce;
          a.actions.push(action);
        }
      });
    });
  });

  const times = [0, 8, 16, 24, 32, 40, 48, 56, 64, 70, 88, 92, 116, 140, 164];
  const helper = new THREE.Object3D();
  helper.name = "__StepHelper";
  scene.add(helper);
  const vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const track = new THREE.NumberKeyframeTrack(".x", times, vals);
  track.interpolation = THREE.InterpolateDiscrete;

  const clip = new THREE.AnimationClip(null, -1, [track]);
  clip.duration = 200;

  const a = mixer.clipAction(clip, helper.position);

  const actions = [];
  actions.push(a);
  anims.forEach((anim) => actions.push(...anim.actions));

  return actions;
}

export default appendActions;
