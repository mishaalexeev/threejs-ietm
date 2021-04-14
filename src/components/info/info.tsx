import React, { FunctionComponent as FC } from "react";
import { Typography } from "antd";
import { RootStore } from "store";
import withStore from "hocs/withStores";

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

  console.log(stores.modelStore.selectedPart);
  return (
    <Typography>
      <Title>{name}</Title>
      <Paragraph>
        In the process of internal desktop applications development, many
        different design specs and implementations would be involved, which
        might cause designers and developers difficulties and duplication and
        reduce the efficiency of development.
      </Paragraph>
      <button type="button" onClick={() => stores.modelStore.startAnimation()}>
        Анимация
      </button>
    </Typography>
  );
};

export default withStore(Info);
