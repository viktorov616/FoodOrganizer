import * as React            from 'react';

import * as cx               from 'classnames';
import Button                from 'components/Button';
import Input, { InputProps } from 'components/forms/Input';
import Tag                   from 'components/Tag';

import { getClass }          from 'utils/getClass';

interface TagInputProps {
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  tagInputLabel?: string;
  inputs: InputProps[];
}

interface TagInputState {
  inputsValues: { [key: string]: string };
  tags: Tag[];
}

interface Tag {
  id: string;
  text: string;
}

class TagInput extends React.Component<TagInputProps, TagInputState> {
  state = {
    inputsValues: this.getInitialInputsValues(),
    tags: [],
  };

  getInitialInputsValues() {
    const { inputs } = this.props;
    const values = inputs.reduce((result, input) => ({ ...result, [input.name]: '' }), {});

    return values;
  }

  addTag() {
    const { inputsValues, tags } = this.state;
    const { inputs } = this.props;
    const tag = {
      text: inputs.map(input => inputsValues[input.name]).join(' '),
      id: this.generateTagId(),
    };

    this.setState({ inputsValues: this.getInitialInputsValues(), tags: [...tags, tag] });
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

  handleInputChange = (e, name: string) => {
    const { inputsValues } = this.state;
    const { onChange } = this.props;
    console.log(e.target);
    this.setState({ inputsValues: { ...inputsValues, [name]: e.target.value } });

    if (onChange) {
      onChange(e);
    }
  }

  handleKeyDown = (e, name: string) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.addTag();
    }
  }

  render() {
    const {
      inputsValues,
      tags,
    } = this.state;
    const {
      inputs,
      onChange,
      tagInputLabel,
    } = this.props;

    return (
      <div className="tag-input">
        <p className="tag-input__label">
          { tagInputLabel }
        </p>

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

        { inputs.map(({
          id,
          label,
          labelModifiers,
          name,
          tagModifiers,
          type,
        }) => {
          const changeHandler = e => this.handleInputChange(e, name);
          const keyDownHandler = e => this.handleKeyDown(e, name);
          const inputValue = this.state.inputsValues[name];

          return (
            <Input
              key={id}
              id={id}
              label={label}
              labelModifiers={cx(labelModifiers)}
              tagModifiers={cx(tagModifiers, 'tag-input')}
              name={name}
              onChange={changeHandler}
              onKeyDown={keyDownHandler}
              type={type}
              value={inputValue}
            />
          );
        }) }
      </div>
    );
  }
}

export default TagInput;
