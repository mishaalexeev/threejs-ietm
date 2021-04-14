import { Menu } from "antd";
import React, { FC } from "react";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UnorderedListOutlined,
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
    stores.modelStore.setSelectedPartById(+key);
  };
  const menu = [
    {
      key: "sub1",
      icon: <UnorderedListOutlined />,
      title: "Дерево модели",
      children: [
        {
          key: "Корпус",
          icon: <MailOutlined />,
          title: "Корпус",
          children: [
            {
              key: 384,
              title: "Верхняя часть корпуса",
            },
            {
              key: 404,
              title: "Средняя часть корпуса",
            },
            {
              key: 402,
              title: "Нижняя часть корпуса",
            },
          ],
        },
        {
          key: "Болты",
          icon: <MailOutlined />,
          title: "Болт",
          children: [
            {
              key: "4",
              title: "lorem",
            },
            {
              key: "5",
              title: "upsum",
            },
            {
              key: "6",
              title: "down",
            },
          ],
        },
      ],
    },
  ];

  const madeRecursiveJSXMenu = (menuProps) =>
    menuProps.map((menuItem) => {
      if (menuItem.children) {
        return (
          <SubMenu
            key={menuItem.key}
            icon={menuItem.icon}
            title={menuItem.title}
          >
            {madeRecursiveJSXMenu(menuItem.children)}
          </SubMenu>
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
