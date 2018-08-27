import * as React        from 'react';

import Button            from 'components/Button';
import Input             from 'components/forms/common/Input';
import ValidateForm      from 'components/forms/validation/ValidateForm';

import { action,
         observable,
         toJS        }   from 'mobx';
import { observer,
         inject }        from 'mobx-react';
// @ts-ignore
import { userStore     } from 'stores/recipes';

interface LoginFormProps {
  userStore?: userStore;
}

interface LoginFormState {
  data: {
    login: string;
    password: string;
  };
}

@inject('userStore')
@observer
class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  @observable data = {
    login: '',
    password: '',
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
            id="login"
            label="Username"
            name="login"
            onChange={this.handleFormDataChange}
            value={this.data.login}
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

          <Button
            icon="send"
            isLoading={isSendingRequest}
            onClick={this.handleSubmit}
            text="Login"
          />
        </ValidateForm>
      </div>
    );
  }
}

export default LoginForm;
