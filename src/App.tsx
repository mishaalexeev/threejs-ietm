import * as React from "react";
import "./App.css";
import { Row, Col, Tree } from "antd";
import ModelViewer from "components/model-viewer";
import Menu from "./components/menu";
import Info from "./components/info";
import { FC } from "react";
import withStores from "hocs/withStores";
import { RootStore } from "store";
import StepView from "components/step-view/step-view";

type Props = {
  stores: RootStore;
};
const App: FC<Props> = ({ stores }) => {
  const { modelStore: store } = stores;
  return (
    <div className="App">
      <div className="menu">
        <Menu />
      </div>
      <section
        className={`content-section ${store.isFullscreen ? "fullscreen" : ""}`}
      >
        <div id="viewer">
          <ModelViewer />
        </div>
        <div id="info">{store.isAnimationActive ? <StepView /> : <Info />}</div>
      </section>
    </div>
  );
};

export default withStores(App);
