import { Menu, Tree } from "antd";
import React, { FC } from "react";
import "./menu.css";
import {
  ApartmentOutlined,
  DownOutlined,
  MailOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  // @ts-ignore
} from "@ant-design/icons";
import withStores from "hocs/withStores";
import { RootStore } from "store";
import { treeData } from "data/treeData";

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

  return (
    <Tree
      showLine
      showIcon
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      className="tree-view"
    />
  );
};

export default withStores(MenuMain);
