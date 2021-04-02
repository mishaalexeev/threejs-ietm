import ModelStore from "./model";

class RootStore {
  public modelStore: ModelStore;

  constructor() {
    this.modelStore = new ModelStore(this);
  }
}

export { RootStore, ModelStore };
export default new RootStore();
