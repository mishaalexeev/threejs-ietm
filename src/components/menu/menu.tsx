// это самая актуальная версия

import { Menu } from "antd";
import React, { FC } from "react";

import {
  ApartmentOutlined,
  MailOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  // @ts-ignore
} from "@ant-design/icons";
import withStores from "hocs/withStores";
import { RootStore } from "store";

type Props = {
  stores: RootStore;
};

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ["sub1"];

const MenuMain: FC<Props> = ({ stores }) => {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleItemClicked = ({ key }) => {
    switch (key) {
      case "Разборка редуктора":
        stores.modelStore.startAnimation();
        break;
      default:
        stores.modelStore.setSelectedPartById(+key);
        break;
    }
  };
  const menu = [
    {
      key: "sub1",
      icon: <ApartmentOutlined />,
      title: "Назначение и описание",
      children: [
        {
          key: "sub11",
          icon: <ApartmentOutlined />,
          title: "Назначение",
        },
        {
          key: "sub12",
          icon: <ApartmentOutlined />,
          title: "Компоненты (дерево модели)",
          children: [
            {
              key: "Корпус",
              icon: <ApartmentOutlined />,
              title: "Корпус",
              children: [
                {
                  key: 362,
                  title: "Верхняя часть корпуса",
                },
                {
                  key: 357,
                  title: "Крышка промежуточная верхняя",
                },
                {
                  key: 352,
                  title: "Средняя часть корпуса",
                },
                {
                  key: 401,
                  title: "Крышка промежуточная средняя",
                },
                {
                  key: 447,
                  title: "Нижняя часть корпуса",
                },
                {
                  key: 358,
                  title: "Крышка промежуточная нижняя",
                },
              ],
            },
            {
              key: 352,
              title: "Зубчатые зацепления",
              icon: <ApartmentOutlined />,
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
              key: 447,
              title: "Валы",
              icon: <ApartmentOutlined />,
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
              key: 446,
              title: "Подшипники",
              icon: <ApartmentOutlined />,
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
              icon: <ApartmentOutlined />,
              children: [
                {
                  key: 507,
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
                  key: 438,
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
    // {
    //   key: "sub2",
    //   icon: <ThunderboltOutlined />,
    //   title: "Анимация",
    //   children: [
    //     {
    //       key: "Разборка редуктора",
    //       icon: <ToolOutlined />,
    //       title: "Разборка редуктора",
    //     },
    //   ],
    // },
    {
      key: "sub2",
      icon: <ThunderboltOutlined />,
      title: "Эксплуатация",
      children: [
        {
          key: "Процедуры обслуживания",
          icon: <ToolOutlined />,
          title: "Процедуры обслуживания",
          children: [
            {
              key: "Ремонтные работы",
              title: "Ремонтные работы",
              children: [
                {
                  key: "Разборка редуктора",
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
      icon: <ThunderboltOutlined />,
      title: "Демонтаж и установка",
      children: [
        {
          key: "Разборка редуктора",
          icon: <ToolOutlined />,
          title: "Разборка редуктора",
        },
      ],
    },
    {
      key: "sub4",
      icon: <ThunderboltOutlined />,
      title: "Типовые неисправности",

      children: [
        {
          key: "Необычные неравномерные шумы при работе",
          icon: <ToolOutlined />,
          title: "Необычные неравномерные шумы при работе",
        },
        {
          key: "Равномерный повышенный уровень шума при работе",
          icon: <ToolOutlined />,
          title: "Равномерный повышенный уровень шума при работе",
        },
        {
          key: "Пробивание масла в местах соединения частей корпуса",
          icon: <ToolOutlined />,
          title: "Пробивание масла в местах соединения частей корпуса",
        },
        {
          key: "Перегрев подшипников",
          icon: <ToolOutlined />,
          title: "Перегрев подшипников",
        },
        {
          key: "При включении привода валы редуктора не вращаются",
          icon: <ToolOutlined />,
          title: "При включении привода валы редуктора не вращаются",
        },
      ],
    },
  ];

  const madeRecursiveJSXMenu = (menuProps) =>
    menuProps.map((menuItem) => {
      if (menuItem.children) {
        return (
          <Menu.SubMenu
            key={menuItem.key}
            icon={menuItem.icon}
            title={menuItem.title}
            className={menuItem.className}
          >
            {madeRecursiveJSXMenu(menuItem.children)}
          </Menu.SubMenu>
        );
      }
      return <Menu.Item key={menuItem.key}>{menuItem.title}</Menu.Item>;
    });

  const JSXMenu = madeRecursiveJSXMenu(menu);

  return (
    <Menu
      mode="inline"
      inlineIndent={10}
      style={{ margin: "2px" }}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={handleItemClicked}
    >
      {JSXMenu}
    </Menu>
  );
};

export default withStores(MenuMain);
