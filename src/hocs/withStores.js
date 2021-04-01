import { observer, inject } from "mobx-react";

const withStores = (Component) => inject("stores")(observer(Component));
export default withStores;
