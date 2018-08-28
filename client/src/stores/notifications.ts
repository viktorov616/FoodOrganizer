import { action,
         observable,
         toJS,
         runInAction } from 'mobx';

export interface notificationsStore {
  errors: string[];
  handleErrors: (response) => void;
  removeNotifications: (type: string) => void;
}

class NotificationsStore<notificationsStore> {
  @observable errors = [];

  @action.bound
  removeNotifications(type) {
    this[type] = [];
  }

  @action.bound
  handleErrors(response) {
    console.log(response);
    if (!response || !response.data || !response.data.errors) return false;

    this.errors = response.data.errors;
    window.scrollTo(0, 0);
  }
}

export default new NotificationsStore();
