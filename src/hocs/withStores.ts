import { observer, inject } from "mobx-react";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";

const withStores = (Component: IReactComponent) =>
  inject("stores")(observer(Component));
export default withStores;
