import React, { FunctionComponent as FC } from "react";
import { Typography } from "antd";
import { RootStore } from "store";
import withStore from "hocs/withStores";
import partData from "data/partsData";

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

  return (
    <Typography>
      <Title>{name}</Title>
      <Paragraph>
        {jsx}
        <hr />
        In the process of internal desktop applications development, many
        different design specs and implementations would be involved, which
        might cause designers and developers difficulties and duplication and
        reduce the efficiency of development.
      </Paragraph>
    </Typography>
  );
};

export default withStore(Info);
