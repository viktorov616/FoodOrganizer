import * as React        from 'react';

import Button            from 'components/Button';
import Input             from 'components/forms/common/Input';
import ValidateForm      from 'components/forms/validation/ValidateForm';

import { action,
         observable }    from 'mobx';
import { observer,
         inject }        from 'mobx-react';
// @ts-ignore
import { userStore     } from 'stores/recipes';

interface RegisterFormProps {
  userStore?: userStore;
}

interface RegisterFormState {
  data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

@inject('userStore')
@observer
class RegisterForm extends React.Component<RegisterFormProps, RegisterFormState> {
  @observable data = {
    name: '',
    email: '', // login
    password: '',
    confirmPassword: '',
  };

  @action.bound
  handleFormDataChange(name: string, value: string) {
    this.data[name] = value;
  }

  handleSubmit = () => {
    console.log('submitted');
  }

  render() {
    const {
      userStore: { isSendingRequest },
    } = this.props;

    return (
      <div className="g--6">
        <ValidateForm>
          <Input
            autofocus
            id="name"
            label="Name"
            name="name"
            onChange={this.handleFormDataChange}
            value={this.data.name}
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
            value={this.data.email}
            validationRules={[
              { name: 'notEmpty' },
            ]}
            validationErrors={{
              notEmpty: 'This field shoud be filled up',
            }}
          />

          <Input
            autofocus
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={this.handleFormDataChange}
            value={this.data.password}
            validationRules={[
              { name: 'notEmpty' },
            ]}
            validationErrors={{
              notEmpty: 'This field shoud be filled up',
            }}
          />

          <Input
            autofocus
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={this.handleFormDataChange}
            value={this.data.password}
            validationRules={[
              { name: 'notEmpty' },
            ]}
            validationErrors={{
              notEmpty: 'This field shoud be filled up',
            }}
          />

          <Button
            icon="send"
            isLoading={isSendingRequest}
            onClick={this.handleSubmit}
            text="Register"
          />
        </ValidateForm>
      </div>
    );
  }
}

export default RegisterForm;
