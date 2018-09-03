import * as React   from 'react';

interface DropdownProps {
  text: string;
}

class Dropdown extends React.Component<DropdownProps> {
  render() {
    const {
      children,
      text,
    } = this.props;

    return (
      <div className="dropdown">
        { text }
        <ul>
          { children }
        </ul>
      </div>
    );
  }
}

export default Dropdown;
