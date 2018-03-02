import * as React   from 'react';

import Notification from 'components/notifications/Notification';

import { inject,
         observer } from 'mobx-react';

interface NotificationsProps {

}

@inject('recipesStore')
@observer
class Notifications extends React.Component<NotificationsProps> {
  render() {
    return (
      <div className="notifications">
        <Notification texts={['error1', 'ugly looking error']} />
      </div>
    );
  }
}

export default Notifications;
