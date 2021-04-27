import * as React from "react";
import "./App.css";
import { Row, Col, Tree } from "antd";
import ModelViewer from "components/model-viewer";
import Menu from "./components/menu";
import Info from "./components/info";
import { FC } from "react";

const App: FC = () => (
  <div className="App">
    <div
      style={{ position: "absolute", zIndex: 100, background: "transparent" }}
    >
      <Menu />
    </div>
    <Row>
      <Col span={17} style={{ overflow: "hidden" }}>
        <ModelViewer />
      </Col>
      <Col span={6} id="info">
        <Info />
      </Col>
    </Row>
  </div>
);

export default App;
