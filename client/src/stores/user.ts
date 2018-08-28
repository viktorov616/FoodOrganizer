import notificationsStore from './notifications';

// @ts-ignore
import { register }       from 'api';
import { action,
         observable,
         runInAction }    from 'mobx';


export interface userStore {
  isSendingRequest: boolean;
}

class UserStore<userStore>  {
  @observable isSendingRequest = false;

  @action.bound
  async register(data) {
    this.isSendingRequest = true;

    const response = await register(data);

    runInAction(() => {
      this.isSendingRequest = false;

      notificationsStore.handleErrors(response);
    });
  }
}

export default new UserStore();
