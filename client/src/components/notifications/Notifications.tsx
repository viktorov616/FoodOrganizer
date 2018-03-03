import * as React             from 'react';

import Notification           from 'components/notifications/Notification';

import { notificationsStore } from 'stores/notifications';
import { inject,
         observer }           from 'mobx-react';
         import { toJS } from 'mobx'

interface NotificationsProps {
  notificationsStore;
}

@inject('notificationsStore')
@observer
class Notifications extends React.Component<NotificationsProps> {
  render() {
    const { notificationsStore: { errors } } = this.props;
    console.log(toJS(errors));
    if (!errors.length) return null;

    return (
      <div className="notifications">
        <Notification texts={errors} />
      </div>
    );
  }
}

export default Notifications;
