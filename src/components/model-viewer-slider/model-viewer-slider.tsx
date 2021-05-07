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

  const handleMixerPause = () => {
    stores.modelStore.mixer.timeScale = 0;
    setPaused(true);
  };

  const handleMixerPlay = () => {
    stores.modelStore.mixer.timeScale = 1;
    setPaused(false);
  };
  const handleSliderChange = (value: number) => {
    const { timeScale } = stores.modelStore.mixer;
    if (timeScale === 0) handleMixerPlay();
    stores.modelStore.mixer.setTime(value);
    if (timeScale === 0) handleMixerPause();
  };

  return (
    <Space>
      {paused ? (
        <Button
          onClick={handleMixerPlay}
          type="primary"
          shape="circle"
          icon={<PlayButton />}
        />
      ) : (
        <Button
          onClick={handleMixerPause}
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
