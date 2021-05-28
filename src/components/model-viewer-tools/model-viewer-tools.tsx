import React, { FunctionComponent as FC, useEffect, useState } from "react";
import { Button, Slider, Space, Alert } from "antd";
import {
  EyeOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { RootStore, ModelStore } from "store";
import withStores from "hocs/withStores";
import ModelViewerSlider from "components/model-viewer-slider/model-viewer-slider";
import "./model-viewer-tools.css";

type Props = {
  stores: RootStore;
};
const ModelViewerTools: FC<Props> = ({ stores }) => {
  const [open, setOpen] = useState<boolean>(() => {
    const open: boolean | null = JSON.parse(
      stores.storage.getItem("toolsOpen") as string
    );
    return open === null ? false : open;
  });

  useEffect(() => {
    stores.storage.setItem("toolsOpen", open.toString());
  }, [open, stores.storage]);

  const store: ModelStore = stores.modelStore;
  if (!store.modelReady) {
    return null;
  }

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
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
  const handleFullscreenClicked = () => {
    store.toggleFullscreen();
  };

  return (
    <section className="viewer-tools">
      {!store.isAnimationActive ? (
        <div className="FABMenu">
          <input
            className={`input-tools ${open ? "tools-open" : ""}`}
            type="checkbox"
            onClick={toggleOpen}
          />
          <div className="hamburger">
            <div className="dots">
              <span className="first" />
              <span className="second" />
              <span className="third" />
            </div>
          </div>
          <div className="action_items_bar">
            <div className="action_items">
              <span className="first_item">
                <EyeOutlined
                  onClick={handleRestoreVisibilityClicked}
                  className="FABMenu-icon"
                />
              </span>
              <span className="second_item">
                <SyncOutlined
                  onClick={handleRotateClicked}
                  className="FABMenu-icon"
                />
              </span>
              <span className="third_item">
                {store.isFullscreen ? (
                  <FullscreenExitOutlined
                    onClick={handleFullscreenClicked}
                    className="FABMenu-icon"
                  />
                ) : (
                  <FullscreenOutlined
                    onClick={handleFullscreenClicked}
                    className="FABMenu-icon"
                  />
                )}
              </span>
              <span className="fourth_item">
                <EyeOutlined className="FABMenu-icon" />
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {store.isAnimationActive ? <ModelViewerSlider /> : null}
    </section>
  );
};

export default withStores(ModelViewerTools);
