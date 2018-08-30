import notificationsStore from './notifications';

import { register,
         getUser,
         // @ts-ignore
         logout    }      from 'api';
import { action,
         observable,
         runInAction }    from 'mobx';

export interface user {
  _id: string;
  name: string;
  email: string;
}

export interface userStore {
  isSendingRequest: boolean;
  logout: () => any;
  register: () => any;
  getUser: () => any;
  user: user|null;
}

class UserStore<userStore>  {
  @observable isSendingRequest = false;
  @observable user = null;

  @action.bound
  async logout() {
    this.isSendingRequest = true;

    const response = await logout();

    runInAction(() => {
      this.isSendingRequest = false;

      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async register(data) {
    this.isSendingRequest = true;

    const response = await register(data);

    runInAction(() => {
      this.isSendingRequest = false;

      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async getUser() {
    this.isSendingRequest = true;

    const response = await getUser();

    runInAction(() => {
      this.isSendingRequest = false;

      this.user = response.data;
    })
  }
}

export default new UserStore();
