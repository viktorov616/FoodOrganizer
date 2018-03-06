import * as React   from 'react';

import Button       from 'components/Button';

import { getClass } from 'utils/getClass';

interface NotificationProps {
  removeNotifications: (type: string) => any;
  type?: string;
  texts: string[];
}

const Notification: React.SFC<NotificationProps> = ({
  removeNotifications,
  texts,
  type = 'errors',
}) => {
  function handleRemoveNotifications() {
    removeNotifications(type);
  }

  function renderSingleText() {
    return (
      <p className="notification__text">
        { texts[0] }
      </p>
    );
  }

  function renderTextList() {
    return (
      <ul className="notification__text-list">
        { texts.map(text => (
          <li
            key={text}
            className="notification__text-list-item"
          >
            { text }
          </li>
        )) }
      </ul>
    );
  }

  return (
    <div className={getClass('notification', type)}>
      { (texts.length === 1) ? renderSingleText() : renderTextList() }

      <Button
        className="notification__button"
        icon="close"
        onClick={handleRemoveNotifications}
      />
    </div>
  );
};

export default Notification;
