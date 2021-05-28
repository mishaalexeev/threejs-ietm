import ModelStore from "./model";

class RootStore {
  public modelStore: ModelStore;
  public storage: Storage;

  constructor() {
    this.storage = localStorage;
    this.modelStore = new ModelStore(this);
  }
}

export { RootStore, ModelStore };
export default new RootStore();
