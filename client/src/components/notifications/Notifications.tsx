import * as React             from 'react';

import Notification           from 'components/notifications/Notification';

import { notificationsStore } from 'stores/notifications';
import { inject,
         observer }           from 'mobx-react';

interface NotificationsProps {
  notificationsStore;
}

@inject('notificationsStore')
@observer
class Notifications extends React.Component<NotificationsProps> {
  render() {
    const {
      notificationsStore: {
        errors,
        removeNotifications,
      },
    } = this.props;

    if (!errors.length) return null;

    return (
      <div className="notifications">
        <Notification
          texts={errors}
          removeNotifications={removeNotifications}
        />
      </div>
    );
  }
}

export default Notifications;
