import React, { FunctionComponent as FC, useEffect, useState } from "react";
import { Button, Slider, Space } from "antd";
import {
  PauseOutlined as PauseButton,
  CaretRightOutlined as PlayButton,
} from "@ant-design/icons";
import { RootStore, ModelStore } from "store";
import withStores from "hocs/withStores";

function millisToMinutesAndSeconds(ms) {
  const mins = ~~(((ms / 1000) % 3600) / 60);
  const secs = ~~(ms / 1000) % 60;
  return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
}

type Props = {
  stores: RootStore;
};
const ModelViewerSlider: FC<Props> = ({ stores }) => {
  const store: ModelStore = stores.modelStore;
  const [paused, setPaused] = useState(false);

  const changeToFreeCamera = () => {
    const manualFreeCam = stores.modelStore.viewerData.scene.getObjectByName(
      "ManualFreeCamera"
    );
    const manualCam = stores.modelStore.viewerData.scene.getObjectByName(
      "ManualCamera"
    );

    manualFreeCam.position.copy(manualCam.position.clone());
    manualFreeCam.rotation.copy(manualCam.rotation.clone());
    manualFreeCam.quaternion.copy(manualCam.quaternion.clone());
    manualFreeCam.scale.copy(manualCam.scale.clone());
    stores.modelStore.viewerData.camera = manualFreeCam;

    stores.modelStore.viewerData.controls.object = manualFreeCam;
    stores.modelStore.viewerData.controls.target.copy(
      stores.modelStore.viewerData.scene
        .getObjectByName("TrackTo")
        .position.clone()
    );
    stores.modelStore.mixer.update(1 / 60);
    stores.modelStore.onWindowResize();
  };
  const pauseMixer = () => {
    stores.modelStore.mixer.timeScale = 0;
    setPaused(true);
  };
  const playMixer = () => {
    stores.modelStore.mixer.timeScale = 1;
    setPaused(false);
  };
  const handleMixerPauseBtnClicked = () => {
    pauseMixer();
    changeToFreeCamera();
  };

  const handleMixerPlayBtnClicked = () => {
    playMixer();
    const { modelStore: store } = stores;
    const manualCam = store.viewerData.scene.getObjectByName(
      "ManualCamera_Orientation"
    );
    store.onWindowResize();
    store.changeCamera(manualCam);
  };
  const handleSliderChange = (value: number) => {
    const { timeScale } = stores.modelStore.mixer;
    if (timeScale === 0) playMixer();
    stores.modelStore.mixer.setTime(value);
    if (timeScale === 0) pauseMixer();
  };

  return (
    <Space>
      {paused ? (
        <Button
          onClick={handleMixerPlayBtnClicked}
          type="primary"
          shape="circle"
          icon={<PlayButton />}
        />
      ) : (
        <Button
          onClick={handleMixerPauseBtnClicked}
          type="primary"
          shape="circle"
          icon={<PauseButton />}
        />
      )}
      <Slider
        value={store.time}
        className="viewer-tools__slider"
        min={0}
        step={0.1}
        tooltipVisible={false}
        onChange={handleSliderChange}
        max={store.mixer._actions[0]._clip.duration}
      />
      <div className="viewer-tools__time">
        {millisToMinutesAndSeconds(+store.time * 1000)} /
        {store.mixer._actions[0]._clip.duration}
      </div>
    </Space>
  );
};

export default withStores(ModelViewerSlider);
