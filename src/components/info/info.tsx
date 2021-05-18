import React, { FunctionComponent as FC, useState } from "react";
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
  const [pause, setPause] = useState(false);
  if (!stores.modelStore.modelReady) {
    return null;
  }
  // @ts-ignore
  const name =
    Object.keys(stores.modelStore.selectedPart).length === 0
      ? "Объект не выбран"
      : stores.modelStore.selectedPart.name;

  let jsx: JSX.Element | null = null;
  if (partData[name]) {
    jsx = partData[name].jsx;
  }
  return (
    <Typography>
      <Title>{name}</Title>
      <Paragraph>{jsx}</Paragraph>
    </Typography>
  );
};

export default withStore(Info);
