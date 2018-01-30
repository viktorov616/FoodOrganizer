import * as React            from 'react';

import * as cx               from 'classnames';
import Button                from 'components/Button';
import Input, { InputProps } from 'components/forms/Input';
import Tag                   from 'components/Tag';

import { getClass }          from 'utils/getClass';

interface TagInputProps {
  btn?: string;
  inputs: InputProps[];
  label?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface TagInputState {
  focused: boolean;
  inputsValues: { [key: string]: string };
  tags: Tag[];
}

interface Tag {
  id: string;
  text: string;
  [key: string]: string;
}

class TagInput extends React.Component<TagInputProps, TagInputState> {
  state = {
    focused: false,
    inputsValues: this.getInitialInputsValues(),
    tags: [],
  };

  getInitialInputsValues() {
    const { inputs } = this.props;
    const values = inputs.reduce((result, input) => ({ ...result, [input.name]: '' }), {});

    return values;
  }

  addTag = () => {
    const { inputsValues, tags } = this.state;
    const { inputs } = this.props;
    const tag = {
      text: inputs.map(input => inputsValues[input.name]).join(' '),
      id: this.generateTagId(),
      ...inputsValues,
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

  handleFocus = (e) => {
    this.setState({ focused: e.type === 'focus' });
  }

  handleInputChange = (e, name: string) => {
    const { inputsValues } = this.state;
    const { onChange } = this.props;

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
      focused,
      inputsValues,
      tags,
    } = this.state;
    const {
      btn,
      inputs,
      label,
      onChange,
    } = this.props;

    return (
      <div className="tag-input">
        <p className={getClass('tag-input__label', cx({ focused }))}>
          { label }
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

        <div className="tag-input__inputs">
          { inputs.map((input) => {
            const changeHandler = e => this.handleInputChange(e, input.name);
            const keyDownHandler = e => this.handleKeyDown(e, input.name);
            const inputValue = this.state.inputsValues[input.name];

            return (
              <Input
                { ...input }
                key={input.id}
                modifiers={cx(input.modifiers, 'tag-input')}
                onBlur={this.handleFocus}
                onChange={changeHandler}
                onFocus={this.handleFocus}
                onKeyDown={keyDownHandler}
                tagModifiers={cx(input.tagModifiers, 'tag-input')}
                value={inputValue}
              />
            );
          }) }
        </div>

        { (btn)
          ? (<Button
            modifiers="raised without-margin"
            onClick={this.addTag}
            text={btn}
            type="button"
          />)
          : null }
      </div>
    );
  }
}

export default TagInput;
