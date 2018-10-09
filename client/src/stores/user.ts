import notificationsStore from './notifications';

import { register,
         getUser,
         login,
         updateAccount,
         resetPassword,
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
  getUser: () => any;
  isSendingRequest: boolean;
  login: (data: {}) => any; // TODO вынести интерфейс из LoginForm
  logout: () => any;
  register: () => any;
  resetPassword: (data: {}) => any; // TODO вынести интерфейс из формы
  updateAccount:(data: {}) => any; // TODO вынести интерфейс из формы
  user: user|null;
  userWasFetched: boolean;
}

class UserStore<userStore> {
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

  @action.bound
  async updateAccount(data) {
    this.isSendingRequest = true;

    const response = await updateAccount(data);

    runInAction(() => {
      this.isSendingRequest = false;

      this.user = response.data;
    });
  }

  @action.bound
  async resetPassword(data) {
    this.isSendingRequest = true;

    await resetPassword(data);

    runInAction(() => {
      this.isSendingRequest = false;
    });
  }
}

export default new UserStore();
