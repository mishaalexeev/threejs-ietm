import React, { FunctionComponent as FC } from "react";
import { Slider, Typography } from "antd";
import { RootStore } from "store";
import withStore from "hocs/withStores";
import partData from "data/partsData";
import "./info.css";
const { Title, Paragraph } = Typography;

type Props = {
  stores: RootStore;
};

const Info: FC<Props> = ({ stores }) => {
  if (!stores.modelStore.modelReady) {
    return null;
  }
  // @ts-ignore
  const name =
    Object.keys(stores.modelStore.selectedPart).length === 0
      ? "Объект не выбран"
      : stores.modelStore.selectedPart.userData.name;

  let jsx: JSX.Element | null = null;
  if (partData[name]) {
    jsx = partData[name].jsx;
  }
  function millisToMinutesAndSeconds(ms) {
    const mins = ~~(((ms / 1000) % 3600) / 60);
    const secs = ~~(ms / 1000) % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  }
  return (
    <Typography>
      <Title>{name}</Title>
      <Paragraph>{jsx}</Paragraph>
      <Slider
        value={stores.modelStore.time}
        min={0}
        step={0.1}
        tooltipVisible={false}
        onChange={(value) => stores.modelStore.mixer.setTime(value)}
        max={stores.modelStore.mixer._actions[0]._clip.duration}
      />
      {millisToMinutesAndSeconds(+stores.modelStore.time * 1000)} /
      {stores.modelStore.mixer._actions[0]._clip.duration}
    </Typography>
  );
};

export default withStore(Info);
