import React, { FunctionComponent as FC } from "react";
import { Button, Slider, Space } from "antd";
import { EyeOutlined, SyncOutlined } from "@ant-design/icons";
import { RootStore, ModelStore } from "store";
import withStores from "hocs/withStores";
import ModelViewerSlider from "components/model-viewer-slider/model-viewer-tools";

type Props = {
  stores: RootStore;
};
const ModelViewerTools: FC<Props> = ({ stores }) => {
  const store: ModelStore = stores.modelStore;
  if (!store.modelReady) {
    return null;
  }

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
    <section className="viewer-tools">
      <Space className="viewer-tools__buttons">
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
      {store.isAnimationPlaying ? <ModelViewerSlider /> : null}
    </section>
  );
};

export default withStores(ModelViewerTools);
