import React, { FunctionComponent as FC, useEffect, useState } from "react";
import {
  EyeOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  SyncOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";
import { RootStore, ModelStore } from "store";
import withStores from "hocs/withStores";
import ModelViewerSlider from "components/model-viewer-slider/model-viewer-slider";
import * as THREE from "three";
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
  const [explosion, setExplosion] = useState(false);

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
    store.fitToView(0, 0, true);
    store.hiddenObjects.forEach((el) => {
      el.visible = true;
    });
    store.hiddenObjects = [];
    store.setSelectedObjectToDefault();
  };
  const handleRotateClicked = (): void => {
    store.viewerData.controls.autoRotate = !store.viewerData.controls
      .autoRotate;
  };
  const handleFullscreenClicked = () => {
    store.toggleFullscreen();
  };
  const handleExplosionClicked = () => {
    if (!explosion) {
      store.loadAnimation("/models/gearboxExplosion.glb").then(() => {
        setExplosion(true);
        store.mixer.timeScale = 2;
        store.mixer.setTime(0);
        store.actions.forEach((a) => {
          a.loop = THREE.LoopOnce;
          a.play();
          a.clampWhenFinished = true;
          store.mixer.addEventListener("loop", (e) => {
            if (explosion) {
              store.mixer.timeScale = 0;
            }
          });
        });
      });
    } else {
      setExplosion(false);
      store.stopAnimations();
    }
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
                <ExpandAltOutlined
                  onClick={handleExplosionClicked}
                  className="FABMenu-icon"
                />
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
