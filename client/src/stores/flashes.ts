import { action,
         observable,
         toJS,
         runInAction } from 'mobx';

interface flahesStore {
  messages: string[];
}

class FlashesStore<flahesStore> {
  @observable messages = [];

  @action.bound
  handleErrors(response) {
    console.log(response);
    if (!response || response.data || !response.data.errors) return false;

    this.messages = [...this.messages, ...response.data.errors];
  }
}

export default new FlashesStore();
