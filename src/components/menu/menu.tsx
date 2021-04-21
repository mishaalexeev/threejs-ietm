import { Menu, Tree } from "antd";
import React, { FC } from "react";
import "./menu.css";
import { DownOutlined } from "@ant-design/icons";
import withStores from "hocs/withStores";
import { RootStore } from "store";
import { treeData } from "data/treeData";
import { Key } from "antd/es/table/interface";

type Props = {
  stores: RootStore;
};

const MenuMain: FC<Props> = ({ stores }) => {
  const handleItemSelect = (selectedKeys: Key[]) => {
    if (selectedKeys.length > 1) throw new Error("Выбрано больше 1 элемента");
    const [key] = selectedKeys;
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
      onSelect={handleItemSelect}
      treeData={treeData}
      className="tree-view"
    />
  );
};

export default withStores(MenuMain);
