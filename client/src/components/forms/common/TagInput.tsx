import * as React            from 'react';

import * as cx               from 'classnames';
import Button                from 'components/Button';
import Input, { InputProps } from 'components/forms/common/Input';
import Tag                   from 'components/Tag';

import { getClass }          from 'utils/getClass';

interface TagInputProps {
  addTagOnBlur?: boolean;
  additionalClass?: string;
  btn?: string;
  inputs: InputProps[];
  label?: string;
  modifiers?: string;
  name: string;
  onChange?: (name: string, value: string) => void;
  onTagsUpdate?: (name: string, tags: { [key: string]: string }[]) => void;
  tags?: Tag[];
  withoutTags?: boolean;
}

interface TagInputState {
  focused: boolean;
  inputsValues: { [key: string]: string };
  inputsValidationResult: { [key: string]: boolean };
  tags: Tag[];
}

interface Tag {
  _id: number;
  _text: string;
  [key: string]: string|number;
}

class TagInput extends React.Component<TagInputProps, TagInputState> {
  static defaultProps = {
    tags: [],
  };

  state = {
    focused: false,
    inputsValues: this.getInitialInputsValues(),
    inputsValidationResult: this.getInitialInputsValidationResult(),
    tags: this.props.tags,
  };

  getInitialInputsValues() {
    const { inputs } = this.props;
    const values = inputs.reduce((result, input) => ({ ...result, [input.name]: '' }), {});

    return values;
  }

  getInitialInputsValidationResult() {
    const { inputs } = this.props;
    const values = inputs.reduce((result, input) => ({ ...result, [input.name]: false }), {});

    return values;
  }

  addTag = () => {
    const {
      inputsValues,
      tags,
    } = this.state;
    const { inputs, onTagsUpdate } = this.props;
    const tag = {
      _text: inputs.map(input => inputsValues[input.name]).join(' '),
      _id: this.generateTagId(),
      ...inputsValues,
    };

    if (!tag._text) return;

    const updatedTags = [...tags, tag];

    this.setState({ inputsValues: this.getInitialInputsValues(), tags: updatedTags });

    if (onTagsUpdate) {
      this.handleTagUpdate(updatedTags);
    }
  }

  checkInputsValidation() {
    const { inputsValidationResult } = this.state;

    return Object.values(inputsValidationResult).some((valid: boolean) => valid);
  }

  deleteTag = (tagId: number) => {
    const { tags } = this.state;
    const { onTagsUpdate } = this.props;
    const updatedTags = tags.filter(({ _id }) => _id !== tagId);

    this.setState({ tags: updatedTags });

    if (onTagsUpdate) {
      this.handleTagUpdate(updatedTags);
    }
  }

  generateTagId() {
    const { tags } = this.state;

    return tags.length;
  }

  handleFocus = (e) => {
    const { addTagOnBlur } = this.props;

    this.setState({ focused: e.type === 'focus' });

    if (e.type === 'blur' && addTagOnBlur) {
      this.addTag();
    }
  }

  handleInputChange = (name: string, value: string) => {
    const { inputsValues } = this.state;
    const { onChange } = this.props;

    this.setState({ inputsValues: { ...inputsValues, [name]: value } });

    if (onChange) {
      onChange(name, value);
    }
  }

  handleKeyDown = (e, name: string) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.addTag();
    }
  }

  handleTagUpdate(tags: Tag[]) {
    const {
      name,
      onTagsUpdate,
    } = this.props;
    const tagsToExport = tags.map((tag: Tag) => (
      Object.entries(tag).reduce(
        (result, [key, value]) => (/_id|_text/.test(key) ? result : { ...result, [key]: value }),
        {},
      )
    ));

    onTagsUpdate(name, tagsToExport);
  }

  setValidationResult = (name, result) => {
    const { inputsValidationResult } = this.state;

    this.setState({ inputsValidationResult: { ...inputsValidationResult, name: result } });
  }

  render() {
    const {
      focused,
      inputsValues,
      tags,
    } = this.state;
    const {
      additionalClass,
      btn,
      inputs,
      label,
      modifiers,
      withoutTags,
    } = this.props;

    return (
      <div className={cx(getClass('tag-input', modifiers), additionalClass)}>
        <p className={getClass('tag-input__label', cx({ focused }))}>
          { label }
        </p>

        { (withoutTags)
          ? null
          : (<div className="tag-input__tags">
            { tags.map(({ _id, _text }) => (
              <Tag
                key={_id}
                text={_text}
                id={_id}
                deleteTag={this.deleteTag}
              />
            )) }
          </div>) }

        <div className="tag-input__inputs">
          { inputs.map((input) => {
            const keyDownHandler = e => this.handleKeyDown(e, input.name);
            const inputValue = this.state.inputsValues[input.name];

            return (
              <Input
                { ...input }
                key={input.id}
                modifiers={cx(input.modifiers, 'tag-input')}
                onBlur={this.handleFocus}
                onChange={this.handleInputChange}
                onFocus={this.handleFocus}
                onKeyDown={keyDownHandler}
                tagModifiers={cx(input.tagModifiers, 'tag-input')}
                value={inputValue}
                validationRules={[
                  {
                    name: 'providedNotEmpty',
                    additionalValue: Object.values(inputsValues),
                  },
                ]}
                validationErrors={{
                  providedNotEmpty: 'All fields shoud be filled up',
                }}
                afterValidationCallback={this.setValidationResult}
              />
            );
          }) }
        </div>

        { (btn)
          ? (<Button
            modifiers="raised without-margin"
            disabled={!this.checkInputsValidation()}
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
