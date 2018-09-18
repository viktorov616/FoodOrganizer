import * as React from 'react';

interface DropdownProps {
  className: string;
  items: any; // ! change to React component
}

class Dropdown extends React.Component<DropdownProps> {
  state = { active: false };

  toggleDropdown = () => {
    const { active } = this.state;

    this.setState({ active: !active })
  }

  render() {
    const { active } = this.state;
    const {
      className,
      children,
      items,
    } = this.props;

    return (
      <div className={className}>
        { children }
        { active ? items : null }
      </div>
    )
  }
}

export default Dropdown;
