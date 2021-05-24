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

  let name;
  if (stores.modelStore.selectedPart) {
    name =
      Object.keys(stores.modelStore.selectedPart).length === 0
        ? "Объект не выбран"
        : stores.modelStore.selectedPart.name;
  }

  const { jsx, title } = partData[stores.modelStore.infoKey] || {
    jsx: "Nothing",
    title: "Nothing",
  };
  return (
    <Typography>
      {name}
      <Title>{title}</Title>
      <Paragraph>{jsx}</Paragraph>
    </Typography>
  );
};

export default withStore(Info);
