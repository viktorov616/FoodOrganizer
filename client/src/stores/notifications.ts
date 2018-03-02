import { action,
         observable,
         toJS,
         runInAction } from 'mobx';

interface notificationsStore {
  errors: string[];
}

class NotificationsStore<notificationsStore> {
  @observable errors = [];

  @action.bound
  handleErrors(response) {
    console.log(response);
    if (!response || response.data || !response.data.errors) return false;

    this.errors = [...this.errors, ...response.data.errors];
  }
}

export default new NotificationsStore();
