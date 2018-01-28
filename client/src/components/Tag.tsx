import * as React   from 'react';

import Button       from 'components/Button';

import { getClass } from 'utils/getClass';

interface TagProps {
  id: string;
  modifiers?: string;
  deleteTag: (id) => any;
  text: string;
}

const Tag: React.SFC<TagProps> = ({
  id,
  modifiers,
  deleteTag,
  text,
}) => {
  function handleDeleteTag() {
    deleteTag(id);
  }

  return (
    <div className={getClass('tag', modifiers)}>
      <p className="tag__text">
        { text }
      </p>

      <Button
        className="tag__button"
        icon="close"
        iconModifiers="md-18"
        onClick={handleDeleteTag}
      />
    </div>
  );
};

export default Tag;
