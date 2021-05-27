import { Menu, Tree } from "antd";
import React, { FC } from "react";
import "./menu.css";
import RcTree from "rc-tree";
import { DownOutlined } from "@ant-design/icons";
import withStores from "hocs/withStores";
import { RootStore } from "store";
import { treeData } from "data/treeData";
import { Key } from "antd/es/table/interface";
import debounce from "lodash.debounce";
import { EventDataNode } from "rc-tree/lib/interface";

type Props = {
  stores: RootStore;
};

const MenuMain: FC<Props> = ({ stores }) => {
  const treeRef = React.createRef<RcTree>();

  const handleItemSelect = (selectedKeys: Key[]) => {
    if (selectedKeys.length > 1) throw new Error("Выбрано больше 1 элемента");
    const [key] = selectedKeys;

    let modelName;
    switch (key) {
      case "Разборка редуктора":
        modelName = "/models/gearboxDissassemblingSlowlyLAST.glb";
        stores.modelStore.loadAnimation(modelName).then(() => {
          stores.modelStore.startAnimation(modelName);
        });
        break;
      case "Необычные неравномерные шумы при работе":
        modelName = "/models/gearboxOilchange.glb";
        stores.modelStore.loadAnimation(modelName).then(() => {
          stores.modelStore.startAnimation(modelName);
        });
        break;
      case "Пробивание масла в местах соединения частей корпуса":
        modelName = "/models/gearboxWorking.glb";
        stores.modelStore.loadAnimation(modelName).then(() => {
          stores.modelStore.startAnimation(modelName);
        });
        break;
      default:
        const { modelStore: store } = stores;
        if (store.isAnimationActive) {
          store.isAnimationActive = false;
          store.isAnimationPlaying = false;
          store.mixer.stopAllAction();
          const mainCam = store.viewerData.scene.getObjectByName(
            "MainFreePerspectiveCamera"
          );
          store.onWindowResize();
          store.changeCamera(mainCam);
        }
        if (store.selectedPart) {
          store.selectedPart = null;
        }

        store.infoKey = key as string;
        store.setSelectedPartById(+key);
        break;
    }
  };

  const expandFolderNode = (
    event: React.MouseEvent<HTMLElement>,
    node: any
  ) => {
    const { isLeaf } = node;

    if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
      return;
    }

    // Call internal rc-tree expand function
    // https://github.com/ant-design/ant-design/issues/12567
    treeRef.current?.onNodeExpand(event as any, node);
  };

  const onDebounceExpand = debounce(expandFolderNode, 200, {
    leading: true,
  });

  const handleItemClick = (
    event: React.MouseEvent<HTMLElement>,
    node: EventDataNode
  ) => {
    onDebounceExpand(event, node);
  };

  return (
    <Tree
      showLine
      showIcon
      switcherIcon={<DownOutlined />}
      onSelect={handleItemSelect}
      onClick={handleItemClick}
      height={window.innerHeight}
      ref={treeRef}
      treeData={treeData}
      className="tree-view"
    />
  );
};

export default withStores(MenuMain);
