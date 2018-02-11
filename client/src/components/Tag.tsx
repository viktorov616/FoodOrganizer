import * as React   from 'react';

import Button       from 'components/Button';
import * as cx      from 'classnames';

import { getClass } from 'utils/getClass';

interface TagProps {
  id?: string;
  modifiers?: string;
  deleteTag?: (id) => any;
  text: string;
  withButton?: boolean;
}

const Tag: React.SFC<TagProps> = ({
  deleteTag,
  id,
  modifiers,
  text,
  withButton,
}) => {
  function handleDeleteTag() {
    deleteTag(id);
  }

  return (
    <div className={getClass('tag', cx(modifiers, { 'without-button': !withButton }))}>
      <p className="tag__text">
        { text }
      </p>

      { (withButton)
        ? (<Button
          className="tag__button"
          icon="close"
          iconModifiers="md-18"
          onClick={handleDeleteTag}
        />)
        : null }
    </div>
  );
};

Tag.defaultProps = {
  withButton: true,
};

export default Tag;
