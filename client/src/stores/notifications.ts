import { action,
         observable,
         toJS,
         runInAction } from 'mobx';

export interface notificationsStore {
  errors: string[];
}

class NotificationsStore<notificationsStore> {
  @observable errors = [];

  @action.bound
  handleErrors(response) {
    if (!response || !response.data || !response.data.errors) return false;

    this.errors = response.data.errors;
    window.scrollTo(0, 0);
  }
}

export default new NotificationsStore();
