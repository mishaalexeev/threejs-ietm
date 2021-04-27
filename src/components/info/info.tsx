import React, { FunctionComponent as FC } from "react";
import { Typography } from "antd";
import { RootStore } from "store";
import withStore from "hocs/withStores";
import partData from "data/partsData";
import "./info.css";
const { Title, Paragraph } = Typography;

type Props = {
  stores: RootStore;
};

const Info: FC<Props> = ({ stores }) => {
  // @ts-ignore
  const name =
    Object.keys(stores.modelStore.selectedPart).length === 0
      ? "Объект не выбран"
      : stores.modelStore.selectedPart.userData.name;

  let jsx: JSX.Element | null = null;
  if (partData[name]) {
    jsx = partData[name].jsx;
  }
  const handleClick = () => {
    stores.modelStore.modelName = "/models/1.glb";
  };

  return (
    <Typography>
      <Title>{name}</Title>
      <Paragraph>{jsx}</Paragraph>
      <button onClick={handleClick}>Start</button>
    </Typography>
  );
};

export default withStore(Info);
