import * as THREE from "three";

function appendActionsWorking(scene, mixer) {
  const anims = [
    {
      name: [
        "Верхняя_часть_корпуса",
        "Боковая_крышка__",
        "Оболочка038",
        "Винт_М4х0,7х8______",
        "Винт_М4х0,7х8_______003",
        "Винт_М4х0,7х8_______",
      ],
      visible: {
        times: [0, 2, Infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [0, 1, 2, Infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Средняя_часть_корпуса",
        "Боковая_крышка",
        "Боковая_крышка____",
        "Винт_М4х0,7х8___",
        "Винт_М4х0,7х8____",
        "Винт_М4х0,7х8__003",
        "Bинт_М4х0,7х8____",
        "Болт_ГОСТ_7796-70_M10-6gx30_____",
        "Болт_ГОСТ_7796-70_M10-6gx70_______",
        "Болт_ГОСТ_7796-70_M10-6gx70______",
        "Болт_ГОСТ_7796-70_М10-6gx30___",
        "Болт_ГОСТ_7796-70_М10-6gx30__",
        "Болт_ГОСТ_7796-70_M10-6gx70",
        "Болт_ГОСТ_7796-70_M10-6gx70_",
        "Болт_ГОСТ_7796-70_М10-6gx30",
        "Гайка_BS_EN_24035_М10005",
        "Гайка_BS_EN_24035_M10_",
        "Гайка_BS_EN_24035_M10___",
        "Гайка_BS_EN_24035_М10____",
        "Гайка_BS_EN_24035_M10",
        "Оболочка117",
        "Гайка_BS_EN_24035_M10__",
        "Гайка_BS_EN_24035_М10__",
        "Болт_ГОСТ_7796-70_M10-6gx30__",
        "Болт_ГОСТ_7796-70_M10-6gx70__",
        "Болт_ГОСТ_7796-70_M10-6gx70___",
        "Болт_ГОСТ_7796-70_M10-6gx30_",
        "Болт_ГОСТ_7796-70_M10-6gx30____",
        "Болт_ГОСТ_7796-70_M10-6gx70____",
        "Болт_ГОСТ_7796-70_M10-6gx70__________",
        "Болт_ГОСТ_7796-70_M10-6gx30___",
        "Гайка_BS_EN_24035_М10",
        "Гайка_BS_EN_24035_M10______",
        "Гайка_BS_EN_24035_M10_______",
        "Гайка_BS_EN_24035_М10003",
        "Гайка_BS_EN_24035_М10_",
        "Гайка_BS_ЕN_24035_M10____",
        "Гайка_BS_EN_24035_M10____",
        "Гайка_BS_EN_24035_М10____001",
        "Винт_М4х0,7х8________001",
        "Винт_М4х0,7х8_____________001",
        "Винт_М4х0,7х8______________",
        "Винт_М4х0,7х8_________",
      ],
      visible: {
        times: [0, 9, 11, Infinity],
        values: [1, 1, 0, 0],
      },
      transparent: {
        times: [0, 9, 10, 11, Infinity],
        values: [false, false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Нижняя_часть_корпуса",
        "Винт_М4х0,7х8________",
        "Винт_М4х0,7х8",
        "Винт_М4х0,7х8_____________",
        "Винт_М4х0,7х8___________001",
        "Винт_М4х0,7х8_",
        "Винт_М4х0,7х8__________",
        "Винт_М4х0,7х8_____",
        "Винт_М4х0,7х8____________",
        "Винт_М4х0,7х8__",
        "Bинт_М4х0,7х8_____",
        "Bинт_М4х0,7х8___",
        "Винт_М4х0,7х8___________",
        "Крышка_щупа",
        "Щуп",
        "Винт_M3x0,5x6005",
        "Винт_M3x0,5x6__",
        "Винт_M3x0,5x6____",
        "Винт_M3x0,5x6_001",
        "Прокладка__",
        "Пробка",
        "Прокладка",
        "Люк",
        "Отдушина",
        "Винт_M3x0,5x6_____",
        "Винт_M3x0,5x6___",
        "Винт_M3x0,5x6_",
        "Винт_M3x0,5x6",
      ],
      visible: {
        times: [0, 25, 29, Infinity],
        values: [1, 1, 0, 0],
      },
      transparent: {
        times: [0, 25, 28, 29, Infinity],
        values: [false, false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Боковая_крышка_", "Боковая_крышка_______", "Боковая_крышка___"],
      visible: {
        times: [0, 25, 29, Infinity],
        values: [1, 1, 0, 0],
      },
      transparent: {
        times: [0, 25, 28, 29, Infinity],
        values: [false, false, true, true, true],
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

export default appendActionsWorking;
