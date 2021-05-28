import React from "react";

import {
  Cube3DIcon,
  GearsIcon,
  BoltIcon,
  NutIcon,
  OilChangeIcon,
  BearingIcon,
  PackIcon,
  Pack2Icon,
  TruckIcon,
  WrenchIcon,
  RecycleIcon,
  AlertIcon,
  Wrench2Icon,
  ShaftIcon,
  DovelIcon,
} from "assets/icons";

type TreeItem = {
  title: string;
  key: string | number;
  icon?: React.ReactNode;
  switcherIcon?: React.ReactNode;
  selectable?: boolean;
  children?: TreeItem[];
};

const treeData: TreeItem[] = [
  {
    title: "Назначение и описание",
    key: "0-0",
    selectable: false,
    children: [
      {
        title: "Дерево модели",
        key: "0-0-0",
        selectable: false,
        children: [
          {
            title: "Корпус",
            key: "0-0-0-0",
            selectable: false,
            children: [
              {
                key: 381,
                title: "Верхняя часть корпуса",
                switcherIcon: <Cube3DIcon />,
              },
              {
                key: 357,
                title: "Крышка промежуточная верхняя",
                switcherIcon: <Cube3DIcon />,
              },
              {
                key: 376,
                title: "Средняя часть корпуса",
                switcherIcon: <Cube3DIcon />,
              },
              {
                key: 401,
                title: "Крышка промежуточная средняя",
                switcherIcon: <Cube3DIcon />,
              },
              {
                key: 447,
                title: "Нижняя часть корпуса",
                switcherIcon: <Cube3DIcon />,
              },
              {
                key: 358,
                title: "Крышка промежуточная нижняя",
                switcherIcon: <Cube3DIcon />,
              },
            ],
          },
          {
            key: "Поменять тут",
            title: "Зубчатые зацепления",
            selectable: false,
            children: [
              {
                key: 365,
                title: "Шестерни",
                switcherIcon: <GearsIcon />,
              },
              {
                key: 366,
                title: "Зубчатые колеса",
                switcherIcon: <GearsIcon />,
              },
              {
                key: 351,
                title: "Колесо для подачи масла",
                switcherIcon: <GearsIcon />,
              },
            ],
          },
          {
            key: "Поменять тут тоже",
            title: "Валы",
            selectable: false,
            children: [
              {
                key: 346,
                title: "Ведущий вал",
                switcherIcon: <ShaftIcon />,
              },
              {
                key: 347,
                title: "Промежуточный вал",
                switcherIcon: <ShaftIcon />,
              },
              {
                key: 345,
                title: "Ведомый вал",
                switcherIcon: <ShaftIcon />,
              },
            ],
          },
          {
            key: "Подшипники",
            title: "Подшипники",
            selectable: false,
            children: [
              {
                key: 507,
                title: "Подшипник 206 ГОСТ 8338-75",
                switcherIcon: <BearingIcon />,
              },
              {
                key: 531,
                title: "Подшипник 208 ГОСТ 8338-75",
                switcherIcon: <BearingIcon />,
              },
            ],
          },
          {
            key: 449,
            title: "Крепежные детали",
            selectable: false,
            children: [
              {
                key: "Болты",
                title: "Болты",
                children: [
                  {
                    key: 400,
                    title: "Болт ГОСТ 7796-70 М10-6gx70>",
                    switcherIcon: <BoltIcon />,
                  },
                  {
                    key: 385,
                    title: "Болт ГОСТ 7796-70 М10-6gx30",
                    switcherIcon: <BoltIcon />,
                  },
                ],
              },
              {
                key: "Гайки",
                title: "Гайки",
                selectable: false,
                children: [
                  {
                    key: 438,
                    title: "Гайка ISO 4035-М10BS",
                    switcherIcon: <NutIcon />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "sub2",
    title: "Эксплуатация",
    selectable: false,
    children: [
      {
        key: "Процедуры обслуживания",
        title: "Процедуры обслуживания",
        children: [
          {
            key: "Ремонтные работы",
            title: "Ремонтные работы",
            children: [
              {
                key: "Разборка редуктораа",
                title: "Сборка, разборка (анимация)",
                switcherIcon: <WrenchIcon />,
              },
              {
                key: "Замена масла (анимация)",
                title: "Замена масла (анимация)",
                switcherIcon: <OilChangeIcon />,
              },
            ],
          },
          {
            key: "Транспортировка",
            title: "Транспортировка",
            selectable: false,
            children: [
              {
                key: "Упаковка",
                title: "Упаковка",
                switcherIcon: <PackIcon />,
              },
              {
                key: "Комплектность поставки",
                title: "Комплектность поставки",
                switcherIcon: <Pack2Icon />,
              },
              {
                key: "Перевозка",
                title: "Перевозка",
                switcherIcon: <TruckIcon />,
              },
            ],
          },
          {
            key: "Демонтаж и установка",
            title: "Демонтаж и установка",
            selectable: false,
            children: [
              {
                key: "Установка",
                title: "Установка",
                switcherIcon: <WrenchIcon />,
              },
              {
                key: "Демонтаж",
                title: "Демонтаж",
                switcherIcon: <Wrench2Icon />,
              },
              {
                key: "Утилизация",
                title: "Утилизация",
                switcherIcon: <RecycleIcon />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "sub3",
    title: "Демонтаж и установка",
    selectable: false,
    children: [
      {
        key: "Разборка редуктора",
        title: "Разборка редуктора",
        switcherIcon: <DovelIcon />,
      },
    ],
  },
  {
    key: "sub4",
    title: "Типовые неисправности",
    selectable: false,
    children: [
      {
        key: "Необычные неравномерные шумы при работе",
        title: "▶ Необычные неравномерные шумы при работе",
        switcherIcon: <AlertIcon />,
      },
      {
        key: "Равномерный повышенный уровень шума при работе",
        title: "▶ Равномерный повышенный уровень шума при работе",
        switcherIcon: <AlertIcon />,
      },
      {
        key: "Пробивание масла в местах соединения частей корпуса",
        title: "▷ Пробивание масла в местах соединения частей корпуса",
        switcherIcon: <AlertIcon />,
      },
      {
        key: "Перегрев подшипников",
        title: "Перегрев подшипников",
        switcherIcon: <AlertIcon />,
      },
      {
        key: "При включении привода валы редуктора не вращаются",
        title: "При включении привода валы редуктора не вращаются",
        switcherIcon: <AlertIcon />,
      },
    ],
  },
];

export { treeData };
