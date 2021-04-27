import React, { FunctionComponent as FC } from "react";
import { Button, Space } from "antd";
import { EyeOutlined, SyncOutlined } from "@ant-design/icons";
import { RootStore, ModelStore } from "store";
import withStores from "hocs/withStores";

type Props = {
  stores: RootStore;
};
const ModelViewerTools: FC<Props> = ({ stores }) => {
  const store: ModelStore = stores.modelStore;

  const handleRestoreVisibilityClicked = (): void => {
    const { pickableObjects } = store.highlightData;
    if (pickableObjects) {
      store.viewerData.controls?.reset();
      store.hiddenObjects.forEach((el) => {
        el.visible = true;
      });
      store.hiddenObjects = [];
    }
  };
  const handleRotateClicked = (): void => {
    store.viewerData.controls.autoRotate = !store.viewerData.controls
      .autoRotate;
  };

  return (
    <Space className="viewer-tools">
      <Button
        type="default"
        icon={<EyeOutlined />}
        size="large"
        onClick={handleRestoreVisibilityClicked}
      />
      <Button
        type="default"
        icon={<SyncOutlined />}
        size="large"
        onClick={handleRotateClicked}
      />
    </Space>
  );
};

export default withStores(ModelViewerTools);
