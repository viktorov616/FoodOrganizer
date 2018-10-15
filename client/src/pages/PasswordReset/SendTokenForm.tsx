import * as React     from 'react';

import Button         from 'components/Button';
import Input          from 'components/forms/common/Input';
import ValidateForm   from 'components/forms/validation/ValidateForm';

import { action,
         observable } from 'mobx';
import { observer,
         inject }     from 'mobx-react';
// @ts-ignore
import { userStore }  from 'stores/user';

interface SendTokenFormProps {
  userStore?: userStore;
}

interface SendTokenFormState {
  data: {
    email: string;
  };
}

@inject('userStore')
@observer
class SendTokenForm extends React.Component<SendTokenFormProps, SendTokenFormState> {
  @observable data = {
    email: '',
  };

  @action.bound
  handleFormDataChange(name: string, value: string) {
    this.data[name] = value;
  }

  handleSubmit = (e) => {
    const {
      userStore: { sendPasswordToken },
    } = this.props;
    e.preventDefault();

    sendPasswordToken(this.data);
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
            id="email"
            label="Email"
            name="email"
            onChange={this.handleFormDataChange}
            value={this.data.email}
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
            text="Send password reset email"
          />
        </ValidateForm>
      </div>
    );
  }
}

export default SendTokenForm;
