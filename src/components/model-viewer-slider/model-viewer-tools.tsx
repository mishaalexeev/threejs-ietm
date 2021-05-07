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
  useEffect(() => {
    store.mixer.timeScale = +!paused;
  }, [paused, store.mixer]);

  const handlePlayPauseClick = (): void => {
    setPaused((prev) => !prev);
  };
  const handleSliderChange = (value: number) => {
    const initialPaused = paused;
    if (initialPaused) handlePlayPauseClick();
    store.mixer.setTime(value);
    if (initialPaused) handlePlayPauseClick();
  };

  return (
    <Space>
      <Button
        onClick={handlePlayPauseClick}
        type="primary"
        shape="circle"
        icon={paused ? <PlayButton /> : <PauseButton />}
      />
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
