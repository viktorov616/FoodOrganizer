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

interface PasswordResetFormProps {
  userStore?: userStore;
  token: string;
}

interface PasswordResetFormState {
  data: {
    email: string;
  };
}

@inject('userStore')
@observer
class PasswordResetForm extends React.Component<PasswordResetFormProps, PasswordResetFormState> {
  @observable data = {
    password: '',
    'password-confirm': '',
    token: this.props.token,
  };

  @action.bound
  handleFormDataChange(name: string, value: string) {
    this.data[name] = value;
  }

  handleSubmit = (e) => {
    const {
      userStore: { changePassword },
    } = this.props;
    e.preventDefault();

    changePassword(this.data);
  }

  render() {
    const {
      userStore: { isSendingRequest },
    } = this.props;

    return (
      <div className="g--6">
        <ValidateForm>
          <Input
            id="password"
            label="Password"
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

export default PasswordResetForm;
