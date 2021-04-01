import ModelStore from "src/store/model";

class RootStore {
  constructor() {
    this.modelStore = new ModelStore(this);
  }
}

export { RootStore };
export default new RootStore();
