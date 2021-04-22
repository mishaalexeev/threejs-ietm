import React from "react";
import Icon from "@ant-design/icons";
import Cube3D from "assets/icons/cube3D";

type TreeItem = {
  title: string;
  key: string | number;
  icon?: React.ReactNode;
  switcherIcon?: React.ReactNode;
  children?: TreeItem[];
};

const Item3DIcon = (props) => <Icon component={Cube3D} {...props} />;

const treeData: TreeItem[] = [
  {
    title: "Назначение и описание",
    key: "0-0",
    children: [
      {
        title: "Дерево модели",
        key: "0-0-0",
        children: [
          {
            title: "Корпус",
            key: "0-0-0-0",
            children: [
              {
                key: 362,
                title: "Верхняя часть корпуса",
                switcherIcon: <Item3DIcon />,
              },
              {
                key: 357,
                title: "Крышка промежуточная верхняя",
                switcherIcon: <Item3DIcon />,
              },
              {
                key: 352,
                title: "Средняя часть корпуса",
                switcherIcon: <Item3DIcon />,
              },
              {
                key: 401,
                title: "Крышка промежуточная средняя",
                switcherIcon: <Item3DIcon />,
              },
              {
                key: 447,
                title: "Нижняя часть корпуса",
                switcherIcon: <Item3DIcon />,
              },
              {
                key: 358,
                title: "Крышка промежуточная нижняя",
                switcherIcon: <Item3DIcon />,
              },
            ],
          },
          {
            key: "Поменять тут",
            title: "Зубчатые зацепления",
            children: [
              {
                key: 365,
                title: "Шестерни",
              },
              {
                key: 366,
                title: "Зубчатые колеса",
              },
              {
                key: 351,
                title: "Колесо для подачи масла",
              },
            ],
          },
          {
            key: "Поменять тут тоже",
            title: "Валы",
            children: [
              {
                key: 346,
                title: "Ведущий вал",
              },
              {
                key: 347,
                title: "Промежуточный вал",
              },
              {
                key: 345,
                title: "Ведомый вал",
              },
            ],
          },
          {
            key: "Подшипники",
            title: "Подшипники",
            children: [
              {
                key: 507,
                title: "Подшипник 206 ГОСТ 8338-75",
              },
              {
                key: 531,
                title: "Подшипник 208 ГОСТ 8338-75",
              },
            ],
          },
          {
            key: 449,
            title: "Крепежные детали",
            children: [
              {
                key: "Болты",
                title: "Болты",
                children: [
                  {
                    key: 400,
                    title: "Болт ГОСТ 7796-70 М10-6gx70>",
                  },
                  {
                    key: 385,
                    title: "Болт ГОСТ 7796-70 М10-6gx30",
                  },
                ],
              },
              {
                key: "Гайки",
                title: "Гайки",
                children: [
                  {
                    key: 438,
                    title: "Гайка ISO 4035-М10BS",
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
              },
              {
                key: "Замена масла (анимация)",
                title: "Замена масла (анимация)",
              },
            ],
          },
          {
            key: "Транспортировка",
            title: "Транспортировка",
            children: [
              {
                key: "Упаковка",
                title: "Упаковка",
              },
              {
                key: "Комплектность поставки",
                title: "Комплектность поставки",
              },
              {
                key: "Перевозка",
                title: "Перевозка",
              },
            ],
          },
          {
            key: "Демонтаж и установка",
            title: "Демонтаж и установка",
            children: [
              {
                key: "Установка",
                title: "Установка",
              },
              {
                key: "Демонтаж",
                title: "Демонтаж",
              },
              {
                key: "Утилизация",
                title: "Утилизация",
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
    children: [
      {
        key: "Разборка редуктора",
        title: "Разборка редуктора",
      },
    ],
  },
  {
    key: "sub4",
    title: "Типовые неисправности",

    children: [
      {
        key: "Необычные неравномерные шумы при работе",
        title: "Необычные неравномерные шумы при работе",
      },
      {
        key: "Равномерный повышенный уровень шума при работе",
        title: "Равномерный повышенный уровень шума при работе",
      },
      {
        key: "Пробивание масла в местах соединения частей корпуса",
        title: "Пробивание масла в местах соединения частей корпуса",
      },
      {
        key: "Перегрев подшипников",
        title: "Перегрев подшипников",
      },
      {
        key: "При включении привода валы редуктора не вращаются",
        title: "При включении привода валы редуктора не вращаются",
      },
    ],
  },
];

export { treeData };
