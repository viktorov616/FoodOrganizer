import * as React                from 'react';

import Image, { ImagePropsType } from 'components/images/Image';
import MaterialIcon              from 'components/icons/MaterialIcon';

import { getClass }              from 'utils/getClass';

interface FileInputProps {
  id: string;
  label?: string;
  labelModifiers?: string;
  modifiers?: string;
  name: string;
  onChange: (name: string, value: string) => void;
  photoToDisplay?: string;
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
      text,
      photoToDisplay,
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

          { (photoToDisplay || fileName)
            ? (<span className="file-input__file-name-wrapper">
              <MaterialIcon
                baseClass="file-input__file-name-icon"
                icon="photo"
              />

              <span className="file-input__file-name">{ fileName || photoToDisplay }</span>
            </span>)
            : null }

          { (photoToDisplay && !fileName)
            ? (<Image
              alt="Recipe image"
              name={photoToDisplay}
              type={ImagePropsType.WITH_NAME}
              uploadType="user"
              wrapperClass="file-input__image-wrapper"
            />)
            : null }

          <span className="file-input__text-wrapper">
            <span className="file-input__text">{ text }</span>

            <MaterialIcon
              baseClass="file-input__upload-icon"
              icon="file_upload"
            />
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
