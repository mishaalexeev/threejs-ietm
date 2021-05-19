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
  const infinity = 999999999999999;
  const anims = [
    {
      name: ["Пробка"],
      visible: {
        times: [0, 6, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [0, 4, 6, infinity],
        values: [false, true, true, true],
      },
      // highlight: {
      //   times: [2, 2.5, 3, 3.5, 4],
      //   values: [
      //     null,
      //     new THREE.Color("#ff0202"),
      //     null,
      //     new THREE.Color("#f80606"),
      //     null,
      //   ],
      // },
      actions: [],
    },
    {
      name: ["Прокладка"],
      visible: {
        times: [6, 10, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [6, 8, 10, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Щуп"],
      visible: {
        times: [10, 20, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [14, 18, 20, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_M3x0,5x6__"],
      visible: {
        times: [20, 27, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [20, 25, 27, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_M3x0,5x6005"],
      visible: {
        times: [20, 27, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [20, 25, 27, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_M3x0,5x6____"],
      visible: {
        times: [20, 27, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [20, 25, 27, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_M3x0,5x6_001"],
      visible: {
        times: [20, 27, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [20, 25, 27, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Крышка_щупа"],
      visible: {
        times: [27, 31, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [27, 29, 31, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Прокладка__"],
      visible: {
        times: [31, 36, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [31, 34, 36, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Отдушина"],
      visible: {
        times: [38, 43, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [38, 41, 43, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_M3x0,5x6"],
      visible: {
        times: [43, 50, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [43, 48, 50, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_M3x0,5x6_____"],
      visible: {
        times: [43, 50, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [43, 48, 50, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_M3x0,5x6___"],
      visible: {
        times: [43, 50, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [43, 48, 50, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_M3x0,5x6_"],
      visible: {
        times: [43, 50, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [43, 48, 50, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Люк"],
      visible: {
        times: [50, 56, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [50, 54, 56, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_М4х0,7х8______"],
      visible: {
        times: [56, 62, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [56, 60, 62, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_М4х0,7х8_______003"],
      visible: {
        times: [56, 62, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [56, 60, 62, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_М4х0,7х8_______"],
      visible: {
        times: [56, 62, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [56, 60, 62, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Оболочка038"],
      visible: {
        times: [56, 62, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [56, 60, 62, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },

    {
      name: ["Винт_М4х0,7х8________"],
      visible: {
        times: [56, 62, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [56, 60, 62, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_М4х0,7х8_____________"],
      visible: {
        times: [56, 62, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [56, 60, 62, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_М4х0,7х8___________001"],
      visible: {
        times: [56, 62, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [56, 60, 62, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Винт_М4х0,7х8"],
      visible: {
        times: [56, 62, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [56, 60, 62, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Боковая_крышка__"],
      visible: {
        times: [62, 72, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [62, 70, 72, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Боковая_крышка_"],
      visible: {
        times: [62, 72, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [62, 70, 72, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Манжетное_уплотнение"],
      visible: {
        times: [62, 72, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [62, 70, 72, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },

    {
      name: [
        "Оболочка141",
        "Оболочка147",
        "Оболочка145",
        "Оболочка143",
        "Оболочка142",
        "Оболочка144",
        "Оболочка146",
        "Оболочка149",
        "Оболочка148",
      ],
      visible: {
        times: [77, 83, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [77, 81, 83, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Оболочка138",
        "Оболочка139",
        "Оболочка137",
        "Оболочка135",
        "Оболочка133",
        "Оболочка134",
        "Оболочка136",
        "Оболочка132",
        "Оболочка140",
      ],
      visible: {
        times: [77, 83, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [77, 81, 83, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },

    {
      name: ["Кольцо002", "Кольцо004"],
      visible: {
        times: [83, 89, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [83, 87, 89, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Шестерня"],
      visible: {
        times: [87, 95, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [87, 93, 95, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Шпонка___", "Ведущий_вал"],
      visible: {
        times: [95, 98, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [95, 96, 98, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },

    {
      name: [
        "Винт_М4х0,7х8___",
        "Винт_М4х0,7х8____",
        "Винт_М4х0,7х8__003",
        "Bинт_М4х0,7х8____",
        "Винт_М4х0,7х8_",
        "Винт_М4х0,7х8__________",
        "Винт_М4х0,7х8____________",
        "Винт_М4х0,7х8_____",
      ],
      visible: {
        times: [98, 105, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [98, 103, 105, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Боковая_крышка_______", "Боковая_крышка"],
      visible: {
        times: [105, 111, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [105, 109, 111, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },

    {
      name: [
        "Гайка_BS_EN_24035_М10005",
        "Гайка_BS_EN_24035_M10_",
        "Гайка_BS_EN_24035_M10___",
        "Гайка_BS_EN_24035_М10____",
        "Гайка_BS_EN_24035_M10",
        "Оболочка117",
        "Гайка_BS_EN_24035_M10__",
        "Гайка_BS_EN_24035_М10__",
      ],
      visible: {
        times: [111, 117, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [111, 115, 117, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Болт_ГОСТ_7796-70_М10-6gx30__",
        "Болт_ГОСТ_7796-70_M10-6gx70",
        "Болт_ГОСТ_7796-70_M10-6gx70_",
        "Болт_ГОСТ_7796-70_М10-6gx30",
        "Болт_ГОСТ_7796-70_M10-6gx30_____",
        "Болт_ГОСТ_7796-70_M10-6gx70_______",
        "Болт_ГОСТ_7796-70_M10-6gx70______",
        "Болт_ГОСТ_7796-70_М10-6gx30___",
      ],
      visible: {
        times: [117, 123, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [111, 121, 123, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Верхняя_часть_корпуса"],
      visible: {
        times: [123, 130, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [123, 128, 130, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Оболочка072",
        "Оболочка064",
        "Оболочка070",
        "Оболочка068",
        "Оболочка066",
        "Оболочка065",
        "Оболочка067",
        "Оболочка069",
        "Оболочка071",
        "Оболочка073",
        "Оболочка074",
        "Оболочка083",
        "Оболочка080",
        "Оболочка078",
        "Оболочка076",
        "Оболочка077",
        "Оболочка079",
        "Оболочка081",
        "Оболочка075",
        "Оболочка084",
        "Оболочка082",
        "Оболочка085",
      ],
      visible: {
        times: [135, 143, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [135, 141, 143, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Кольцо", "Кольцо_________"],
      visible: {
        times: [143, 148, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [143, 146, 148, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Зубчатое_колесо"],
      visible: {
        times: [148, 154, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [148, 152, 154, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Шестерня___"],
      visible: {
        times: [154, 161, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [154, 159, 161, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Шпонка", "Шпонка__", "Промежуточный_вал"],
      visible: {
        times: [161, 164, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [160, 162, 164, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Винт_М4х0,7х8________001",
        "Винт_М4х0,7х8_____________001",
        "Винт_М4х0,7х8______________",
        "Винт_М4х0,7х8_________",
        "Bинт_М4х0,7х8_____",
        "Bинт_М4х0,7х8___",
        "Винт_М4х0,7х8___________",
        "Винт_М4х0,7х8__",
      ],
      visible: {
        times: [164, 169, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [164, 167, 169, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Боковая_крышка____", "Боковая_крышка___"],
      visible: {
        times: [169, 180, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [169, 178, 180, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Манжетное_уплотнение_"],
      visible: {
        times: [169, 180, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [169, 178, 180, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Гайка_BS_EN_24035_М10",
        "Гайка_BS_EN_24035_M10______",
        "Гайка_BS_EN_24035_M10_______",
        "Гайка_BS_EN_24035_М10003",
        "Гайка_BS_EN_24035_М10_",
        "Гайка_BS_ЕN_24035_M10____",
        "Гайка_BS_EN_24035_M10____",
        "Гайка_BS_EN_24035_М10____001",
      ],
      visible: {
        times: [180, 185, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [180, 183, 185, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Болт_ГОСТ_7796-70_M10-6gx30____",
        "Болт_ГОСТ_7796-70_M10-6gx70____",
        "Болт_ГОСТ_7796-70_M10-6gx70__________",
        "Болт_ГОСТ_7796-70_M10-6gx30___",
        "Болт_ГОСТ_7796-70_M10-6gx30__",
        "Болт_ГОСТ_7796-70_M10-6gx70__",
        "Болт_ГОСТ_7796-70_M10-6gx70___",
        "Болт_ГОСТ_7796-70_M10-6gx30_",
      ],
      visible: {
        times: [185, 190, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [185, 188, 190, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Средняя_часть_корпуса"],
      visible: {
        times: [190, 197, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [190, 195, 197, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: [
        "Оболочка094",
        "Оболочка091",
        "Оболочка093",
        "Оболочка095",
        "Оболочка086",
        "Оболочка092",
        "Оболочка090",
        "Оболочка088",
        "Оболочка087",
        "Оболочка089",
        "Оболочка096",
        "Оболочка105",
        "Оболочка098",
        "Оболочка099",
        "Оболочка101",
        "Оболочка103",
        "Оболочка097",
        "Оболочка106",
        "Оболочка104",
        "Оболочка102",
        "Оболочка100",
        "Оболочка107",
      ],
      visible: {
        times: [200, 210, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [200, 208, 210, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Кольцо______", "Кольцо_______"],
      visible: {
        times: [210, 216, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [210, 214, 216, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Зубчатое_колесо___"],
      visible: {
        times: [216, 221, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [216, 219, 221, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Паразитное_колесо"],
      visible: {
        times: [220, 228, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [220, 226, 228, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
    {
      name: ["Шпонка_", "Шпонка____", "Ведомый_вал"],
      visible: {
        times: [228, 231, infinity],
        values: [1, 0, 0],
      },
      transparent: {
        times: [228, 229, 231, infinity],
        values: [false, true, true, true],
      },
      actions: [],
    },
  ];

  anims.forEach((a) => {
    console.log(scene);
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
