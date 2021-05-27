import React, { FunctionComponent as FC, useRef, useState } from "react";
import { Slider, Typography } from "antd";
import { RootStore } from "store";
import withStore from "hocs/withStores";
import partData from "data/partsData";
import "./info.css";
import { PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
const { Title, Paragraph } = Typography;

type Props = {
  stores: RootStore;
};

const Info: FC<Props> = ({ stores }) => {
  const [pause, setPause] = useState(false);
  const componentToPrint = useRef<HTMLElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentToPrint.current,
  });
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
    <>
      <Typography className="info-tools">
        <PrinterOutlined
          onClick={handlePrint}
          className="info-icons icon-print"
        />
      </Typography>
      <hr className="hr-divider" />
      <section ref={componentToPrint}>
        <Typography>
          {name}
          <Title>{title}</Title>
          <Paragraph>{jsx}</Paragraph>
        </Typography>
      </section>
    </>
  );
};

export default withStore(Info);
