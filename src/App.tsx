import * as React from "react";
import "./App.css";
import { Row, Col, Tree } from "antd";
import ModelViewer from "components/model-viewer";
import Menu from "./components/menu";
import Info from "./components/info";
import { FC } from "react";

const App: FC = () => (
  <div className="App">
    <div className="menu">
      <Menu />
    </div>
    <Row>
      <Col span={17} style={{ overflow: "hidden" }}>
        <ModelViewer />
      </Col>
      <Col span={7} id="info">
        <Info />
      </Col>
    </Row>
  </div>
);

export default App;
