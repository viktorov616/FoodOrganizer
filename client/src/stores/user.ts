import notificationsStore from './notifications';

import { register,
         getUser,
         login,
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
  userWasFetched: boolean;
  login: () => any;
  logout: () => any;
  register: () => any;
  getUser: () => any;
  user: user|null;
}

class UserStore<userStore>  {
  @observable isSendingRequest = false;
  @observable user = null;
  @observable userWasFetched = false;

  @action.bound
  async login(data) {
    this.isSendingRequest = true;

    const response = await login(data);

    runInAction(() => {
      this.isSendingRequest = false;
      if (response.status === 200) {
        this.user = response.data;
      }

      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async logout() {
    this.isSendingRequest = true;

    const response = await logout();

    runInAction(() => {
      this.isSendingRequest = false;
      if (response.status === 200) this.user = null;

      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async register(data) {
    this.isSendingRequest = true;

    const response = await register(data);

    runInAction(() => {
      this.isSendingRequest = false;
      if (response.status === 200) {
        this.user = response.data;

      }

      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async getUser() {
    this.isSendingRequest = true;

    const response = await getUser();

    runInAction(() => {
      this.isSendingRequest = false;
      this.userWasFetched = true;

      this.user = response.data;
    });
  }
}

export default new UserStore();
