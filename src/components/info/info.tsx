import React, { FunctionComponent as FC, useRef, useState } from "react";
import { Slider, Typography } from "antd";
import { RootStore } from "store";
import withStore from "hocs/withStores";
import partData from "data/partsData";
import "./info.css";
import { CloseOutlined, PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
const { Title, Paragraph } = Typography;

type Props = {
  stores: RootStore;
};

const Info: FC<Props> = ({ stores }) => {
  const componentToPrint = useRef<HTMLElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentToPrint.current,
  });
  const { modelStore: store } = stores;
  if (!store.modelReady) {
    return null;
  }
  const handleFullscreenExit = () => {
    store.toggleFullscreen();
  };
  //console.log(store.selectedPart.name);

  let name;
  if (store.selectedPart) {
    name =
      Object.keys(stores.modelStore.selectedPart).length === 0
        ? null
        : store.selectedPart.name;
  }
  // eslint-disable-next-line prefer-const
  let { jsx, title } = partData[store.infoKey] || {
    jsx: "Nothing",
    title: "Nothing",
  };

  if (typeof jsx === "function") {
    jsx = jsx(stores.modelStore);
  }

  return (
    <>
      <Typography className="info-tools">
        <PrinterOutlined
          onClick={handlePrint}
          className="info-icon icon-print"
        />
        <h3 className="info-title">{title}</h3>
        <CloseOutlined
          className="info-icon icon-close"
          onClick={handleFullscreenExit}
        />
      </Typography>
      <hr className="hr-divider" />
      <section className="info-scroll" ref={componentToPrint}>
        <Typography>
          {/* {name} */}
          <h3 className="info-title-print">{title}</h3>
          <section className="info-jsx">{jsx}</section>
        </Typography>
      </section>
    </>
  );
};

export default withStore(Info);
