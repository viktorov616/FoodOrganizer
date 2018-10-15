import notificationsStore from './notifications';
// @ts-ignore
import * as api           from 'api';
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
  sendPasswordToken: (data: {}) => any; // TODO вынести интерфейс из формы
  changePassword: (data: {}) => any; // TODO вынести интерфейс из формы
  updateAccount: (data: {}) => any; // TODO вынести интерфейс из формы
  user: user|null;
  userWasFetched: boolean;
  validateToken: (data: {}) => any // TODO вынести интерфейс из формы
}

class UserStore<userStore> {
  @observable isSendingRequest = false;
  @observable user = null;
  @observable userWasFetched = false;

  @action.bound
  async login(data) {
    this.isSendingRequest = true;

    const response = await api.login(data);

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

    const response = await api.logout();

    runInAction(() => {
      this.isSendingRequest = false;
      if (response.status === 200) this.user = null;

      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async register(data) {
    this.isSendingRequest = true;

    const response = await api.register(data);

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

    const response = await api.getUser();

    runInAction(() => {
      this.isSendingRequest = false;
      this.userWasFetched = true;

      this.user = response.data;
    });
  }

  @action.bound
  async updateAccount(data) {
    this.isSendingRequest = true;

    const response = await api.updateAccount(data);

    runInAction(() => {
      this.isSendingRequest = false;

      this.user = response.data;
    });
  }

  @action.bound
  async sendPasswordToken(data) {
    this.isSendingRequest = true;

    const response = await api.sendPasswordToken(data);

    runInAction(() => {
      this.isSendingRequest = false;

      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async changePassword(data) {
    this.isSendingRequest = true;

    const response = await api.changePassword(data);

    runInAction(() => {
      this.isSendingRequest = false;

      notificationsStore.handleErrors(response);
      this.user = response.data.user;
    });
  }

  @action.bound
  async validateToken(formData) {
    this.isSendingRequest = true;

    const { data } = await api.validateToken(formData);

    runInAction(() => {
      this.isSendingRequest = false;

      notificationsStore.handleErrors(data);
    });

    return data;
  }
}

export default new UserStore();
