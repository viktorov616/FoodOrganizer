import {  observable } from 'mobx';

export interface userStore {
  isSendingRequest: boolean;
}

class UserStore<userStore>  {
  @observable isSendingRequest = false;
}

export default new UserStore();
