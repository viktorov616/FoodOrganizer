import * as React              from 'react';

import Button                  from 'components/Button';
import Input                   from 'components/forms/common/Input';
import ValidateForm            from 'components/forms/validation/ValidateForm';

import { action,
         observable }          from 'mobx';
import { observer,
         inject }              from 'mobx-react';
// @ts-ignore
import { userStore }           from 'stores/user';

interface ChangePasswordFormProps {
  togglePasswordForm?: () => void;
  token?: string;
  userStore?: userStore;
}

interface ChangePasswordFormState {
  data: {
    password: string;
    'password-confirm': string;
  };
}

@inject('userStore')
@observer
class ChangePasswordForm extends React.Component<ChangePasswordFormProps, ChangePasswordFormState> {
  @observable data = {
    password: '',
    'password-confirm': '',
  };

  @action.bound
  handleFormDataChange(name: string, value: string) {
    this.data[name] = value;
  }

  handleSubmit = async (e) => {
    const {
      togglePasswordForm,
      token,
      userStore: {
        changePassword,
        user,
      },
    } = this.props;
    e.preventDefault();

    await changePassword({
      ...this.data,
      ...(token ? { token } : { userId: '123' }),
    });
    console.log(togglePasswordForm);
    if (togglePasswordForm) togglePasswordForm()
  }

  render() {
    const {
      togglePasswordForm,
      userStore: { isSendingRequest },
    } = this.props;

    return (
      <div className="g--6">
        <ValidateForm>
          <Input
            id="password"
            label="New password"
            name="password"
            type="password"
            onChange={this.handleFormDataChange}
            value={this.data.password}
            validationRules={[
              { name: 'notEmpty' },
              { name: 'same', additionalValue: this.data['password-confirm'] }
            ]}
            validationErrors={{
              notEmpty: 'This field shoud be filled up',
              same: 'The password not match with the password confirm'
            }}
          />

          <Input
            id="password-confirm"
            label="Confirm Password"
            name="password-confirm"
            type="password"
            onChange={this.handleFormDataChange}
            value={this.data['password-confirm']}
            validationRules={[
              { name: 'notEmpty' },
              { name: 'same', additionalValue: this.data.password }
            ]}
            validationErrors={{
              notEmpty: 'This field shoud be filled up',
              same: 'The password not match with the password confirm'
            }}
          />

          { togglePasswordForm
            ? (<Button
              onClick={togglePasswordForm}
              text="Cancel"
              modifiers="raised withIconSize gray mr20"
            />)
            : null }

          <Button
            icon="send"
            isLoading={isSendingRequest}
            onClick={this.handleSubmit}
            text="Change password"
          />
        </ValidateForm>
      </div>
    );
  }
}

export default ChangePasswordForm;
