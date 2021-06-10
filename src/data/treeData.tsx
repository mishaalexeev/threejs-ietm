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
  InfoIcon,
  BlueprintIcon,
  GearWorkingIcon,
  HelmetIcon,
  MaintenanceIcon,
  ToolboxIcon,
  WarehouseIcon,
  SearchIcon,
  EtaIcon,
  LipsealIcon,
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
    title: "Техническое описание",
    key: "0-0",
    selectable: false,
    children: [
      {
        title: "Введение",
        key: "Введение",
      },
      {
        title: "Назначение",
        key: "Назначение",
        switcherIcon: <InfoIcon />,
      },
      {
        title: "Состав изделия",
        key: "0-0-0",
        selectable: false,
        children: [
          {
            title: "Корпус",
            key: "0-0-0-0",
            selectable: false,
            children: [
              {
                key: "Верхняя_часть_корпуса",
                title: "Верхняя часть корпуса",
                switcherIcon: <Cube3DIcon />,
              },
              {
                key: 357,
                title: "Крышка промежуточная верхняя",
                switcherIcon: <Cube3DIcon />,
              },
              {
                key: "Средняя_часть_корпуса",
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
            key: "Зубчатые зацепления",
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
            key: "Валы",
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
            key: "Смотровое окно",
            title: "Смотровое окно",
            selectable: false,
            children: [
              {
                key: 507,
                title: "Люк",
              },
              {
                key: "Отдушина",
                title: "Отдушина",
              },
            ],
          },
          {
            key: "Маслоуказатель",
            title: "Маслоуказатель",
            selectable: false,
            children: [
              {
                key: 507,
                title: "Щуп",
              },
              {
                key: "Крышка щупа",
                title: "Крышка щупа",
              },
              {
                key: "Прокладка",
                title: "Прокладка",
              },
            ],
          },
          {
            key: "Сливное отверстие",
            title: "Сливное отверстие",
            selectable: false,
            children: [
              {
                key: 507,
                title: "Пробка",
              },
              {
                key: "Прокладка",
                title: "Прокладка",
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
              {
                key: "Винты",
                title: "Винты",
                children: [
                  {
                    key: "Винт 1",
                    title: "Винт 1",
                    switcherIcon: <BoltIcon />,
                  },
                  {
                    key: "Винт 2",
                    title: "Винт 2",
                    switcherIcon: <BoltIcon />,
                  },
                ],
              },
              {
                key: "Шпонки",
                title: "Шпонки",
                children: [
                  {
                    key: "Шпонка 1",
                    title: "Шпонка 1",
                    switcherIcon: <BoltIcon />,
                  },
                  {
                    key: "Шпонка 2",
                    title: "Шпонка 2",
                    switcherIcon: <BoltIcon />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Конструкция",
        key: "Конструкция",
        switcherIcon: <BlueprintIcon />,
      },
      {
        title: "Характеристики",
        key: "Характеристики",
        switcherIcon: <EtaIcon />,
      },
      {
        title: "▶ Принцип работы",
        key: "Принцип работы",
        switcherIcon: <GearWorkingIcon />,
      },
    ],
  },
  {
    key: "sub2",
    title: "Эксплуатация",
    selectable: false,
    children: [
      {
        title: "Техника безопасности",
        key: "Техника безопасности",
        switcherIcon: <HelmetIcon />,
      },
      {
        title: "Использование по назначению",
        key: "Использование по назначению",
        switcherIcon: <GearsIcon />,
      },
      {
        title: "Техническое обслуживание",
        key: "Техническое обслуживание",
        // switcherIcon: <MaintenanceIcon />,
        switcherIcon: <WrenchIcon />,
      },
      {
        key: "Ремонтные работы",
        title: "Ремонтные работы",
        children: [
          {
            key: "Перечень инструментов",
            title: "Перечень инструментов",
            switcherIcon: <ToolboxIcon />,
          },
          {
            key: "Разборка редуктора",
            title: "▶ Разборка редуктора",
            switcherIcon: <WrenchIcon />,
          },
          {
            key: "Замена масла",
            title: "▶ Замена масла",
            switcherIcon: <OilChangeIcon />,
          },
          {
            key: "Замена подшипников",
            title: "▶ Замена подшипников",
            switcherIcon: <BearingIcon />,
          },
          {
            key: "Замена уплотнений",
            title: "▶ //Замена уплотнений",
            switcherIcon: <LipsealIcon />,
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
          {
            key: "Хранение",
            title: "Хранение",
            switcherIcon: <WarehouseIcon />,
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
  // {
  //   key: "sub3",
  //   title: "Демонтаж и установка",
  //   selectable: false,
  //   children: [
  //     {
  //       key: "Разборка редуктора",
  //       title: "Разборка редуктора",
  //       switcherIcon: <DovelIcon />,
  //     },
  //   ],
  // },
  {
    key: "sub4",
    title: "Типовые неисправности",
    selectable: false,
    children: [
      {
        key: "Диагностика неисправностей",
        title: "Диагностика неисправностей",
        switcherIcon: <SearchIcon />,
      },
      {
        key: "Типовые неисправности",
        title: "Типовые неисправности",
        switcherIcon: <AlertIcon />,
      },
    ],
  },
];

export { treeData };
