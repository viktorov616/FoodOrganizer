import * as React   from 'react';

import * as cx      from 'classnames';
import Button       from 'components/Button';
import Input        from 'components/forms/Input';
import Tag          from 'components/Tag';

import { getClass } from 'utils/getClass';

interface TagInputProps {
  id: string;
  inputTagModifiers?: string;
  label?: string;
  labelModifiers?: string;
  name?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  type?: string;
}

interface TagInputState {
  inputValue: string;
  tags: Tag[];
}

interface Tag {
  id: string;
  text: string;
}

class TagInput extends React.Component<TagInputProps, TagInputState> {
  state = {
    inputValue: '',
    tags: [],
  };

  addTag() {
    const { inputValue, tags } = this.state;

    if (!inputValue) return;

    const tag = {
      text: inputValue,
      id: this.generateTagId(),
    };

    this.setState({ inputValue: '', tags: [...tags, tag] });
  }

  deleteTag = (tagId: string) => {
    const { tags } = this.state;
    const updatedTags = tags.filter(({ id }) => id !== tagId);

    this.setState ({ tags: updatedTags });
  }

  generateTagId() {
    const { tags } = this.state;

    return tags.length;
  }

  handleInputChange = (e) => {
    const { onChange } = this.props;

    this.setState({ inputValue: e.target.value });

    if (onChange) {
      onChange(e);
    }
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.addTag();
    }
  }

  render() {
    const {
      inputValue,
      tags,
    } = this.state;
    const {
      id,
      inputTagModifiers,
      label,
      labelModifiers,
      name,
      onChange,
      type,
    } = this.props;
    console.log(tags);

    return (
      <div className="tag-input">
        <Input
          id={id}
          label={label}
          labelModifiers={cx(labelModifiers)}
          tagModifiers={cx(inputTagModifiers, 'tag-input')}
          name={name}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          type={type}
          value={inputValue}
        >
          <div className="tag-input__tags">
            { tags.map(({ id, text }) => (
              <Tag
                key={id}
                text={text}
                id={id}
                deleteTag={this.deleteTag}
              />
            )) }
          </div>
        </Input>
      </div>
    );
  }
}

export default TagInput;
