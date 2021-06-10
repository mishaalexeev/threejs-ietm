import * as THREE from "three";

function appendActionsRuin(scene, mixer) {
  const Infinity = 999999999999999;
  const anims = [
    {
      name: ["Пробка"],
      visible: {
        times: [0, 6, Infinity],
        values: [1, 1, 1],
      },
      transparent: {
        times: [0, 4, 6, Infinity],
        values: [false, false, false, false],
      },
      highlight: {
        times: [2, 2.5],
        values: [null, null],
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

  const times = [
    0,
    10,
    38,
    56,
    77,
    83,
    87,
    95,
    98,
    111,
    135,
    143,
    148,
    154,
    161,
    164,
    180,
    200,
    210,
    216,
    221,
    228,
  ];
  const helper = new THREE.Object3D();
  helper.name = "__StepHelper";
  scene.add(helper);

  const vals = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
  ];

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

export default appendActionsRuin;
