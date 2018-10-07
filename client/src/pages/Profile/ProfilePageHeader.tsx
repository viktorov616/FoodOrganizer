import * as React from 'react';

import Title      from 'components/typography/Title';
import Button     from 'components/Button';

interface ProfilePageHeaderProps {
  editModeActive: boolean;
  toggleEditMode: () => void;
}

const ProfilePageHeader:React.SFC<ProfilePageHeaderProps> = ({
  editModeActive,
  toggleEditMode,
}) => (
  <div>
    <Title
      text={ editModeActive ? 'Profile editing' : 'Profile'}
      modifiers="inline-block align-middle space-right"
    />

    <Button
      iconAriaHidden={false}
      modifiers="only-icon mt15"
      onClick={toggleEditMode}
      icon={editModeActive ? 'close' : 'edit'}
    />
  </div>
);

export default ProfilePageHeader;
