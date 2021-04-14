import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "mobx-react";
import stores from "store";
import App from "./App";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider stores={stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);
