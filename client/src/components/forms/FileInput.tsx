import * as React   from 'react';

import { getClass } from 'utils/getClass';

interface FileInputProps {
  id: string;
  label?: string;
  labelModifiers?: string;
  modifiers?: string;
  name: string;
  onChange: (name: string, value: string) => void;
  tagModifiers?: string;
  text?: string;
}

interface FileInputState {
  fileName: string;
}

class FileInput extends React.Component<FileInputProps, FileInputState> {
  static defaultProps = {
    labelModifiers: '',
    modifiers: '',
    text: 'Click to upload',
  };

  state = {
    fileName: '',
  };

  handleChange = (e) => {
    const {
      name,
      onChange,
    } = this.props;
    const file = e.target.files[0];

    this.setState({ fileName: file.name });
    onChange(name, file);
  }

  render() {
    const { fileName } = this.state;
    const {
      id,
      label,
      labelModifiers,
      modifiers,
      name,
      tagModifiers,
      text,
    } = this.props;

    return (
      <div className={getClass('file-input', modifiers)}>
        <label
          htmlFor={id}
          className="file-input__label"
        >
          { (label)
            ? <span className={getClass('file-input__label-text', labelModifiers)}>{ label }</span>
            : null }

          { (fileName)
            ? (<span className="file-input__file-name-wrapper">
              <i className="material-icons file-input__file-name-icon">photo</i>
              <span className="file-input__file-name">{ fileName }</span>
            </span>)
            : null }

          <span className="file-input__text-wrapper">
            <span className="file-input__text">{ text }</span>
            <i className="material-icons file-input__upload-icon">file_upload</i>
          </span>

          <input
            className="file-input__tag"
            id={id}
            name={name}
            onChange={this.handleChange}
            type="file"
          />
        </label>
      </div>
    );
  }
}

export default FileInput;
