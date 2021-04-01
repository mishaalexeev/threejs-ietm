import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { Provider } from "mobx-react"
import App from "./App"
import "antd/dist/antd.css"
import stores from "./store"

ReactDOM.render(
  <Provider stores={stores}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
)
