import * as React     from 'react';

import Button         from 'components/Button';
import Input          from 'components/forms/common/Input';
import ValidateForm   from 'components/forms/validation/ValidateForm';

// @ts-ignore
import { userStore }  from 'stores/user';
import { action,
         observable } from 'mobx';
import { observer,
         inject }     from 'mobx-react';

interface ProfileEditModeProps {
  toggleEditMode: () => void;
  userStore?: userStore;
}

interface ProfileEditModeState {
  formData: {
    name: string;
    email: string;
  };
}

@inject('userStore')
@observer
class ProfileEditMode extends React.Component<ProfileEditModeProps, ProfileEditModeState> {
  @observable formData = {
    name: this.props.userStore.user.name,
    email: this.props.userStore.user.email,
  };

  @action.bound
  handleFormDataChange(name: string, value: string) {
    this.formData[name] = value;
  }

  handleSubmit = async (e) => {
    const {
      userStore: { updateAccount },
      toggleEditMode,
    } = this.props;
    e.preventDefault();

    await updateAccount(this.formData);
    toggleEditMode();
  }

  render() {
    const {
      userStore: { isSendingRequest },
    } = this.props;

    return (
      <section className="g--6">
        <ValidateForm>
          <Input
            id="name"
            label="Name"
            name="name"
            onChange={this.handleFormDataChange}
            value={this.formData.name}
            validationRules={[
              { name: 'notEmpty' },
            ]}
            validationErrors={{
              notEmpty: 'This field shoud be filled up',
            }}
          />

          <Input
            autofocus
            id="email"
            label="Email"
            name="email"
            onChange={this.handleFormDataChange}
            value={this.formData.email}
            validationRules={[
              { name: 'notEmpty' },
              { name: 'isEmail' },
            ]}
            validationErrors={{
              notEmpty: 'This field shoud be filled up',
              isEmail: 'Email is invalid',
            }}
          />

          <Button
            icon="send"
            isLoading={isSendingRequest}
            onClick={this.handleSubmit}
            text="Save"
          />
        </ValidateForm>
      </section>
    );
  }
}

export default ProfileEditMode;
