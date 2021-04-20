import * as React from "react";
import "./App.css";
import { Row, Col } from "antd";
import ModelViewer from "components/model-viewer";
import Menu from "./components/menu";
import Info from "./components/info";
import { FC } from "react";

const App: FC = () => (
  <div className="App">
    <Row>
      <Col span={4} id="menu">
        <Menu />
      </Col>
      <Col span={15} style={{ overflow: "hidden" }}>
        <ModelViewer />
      </Col>
      <Col span={5} id="info">
        <Info />
      </Col>
    </Row>
  </div>
);

export default App;
