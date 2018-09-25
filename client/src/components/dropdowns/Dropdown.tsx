import * as React   from 'react';

import Button       from 'components/Button';

interface DropdownProps {
  className: string;
  items: JSX.Element;
}

interface DropdownState {
  active: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  state = { active: false };

  hancleClick = () => this.toggleDropdown();

  handleMouseLeave = () => {
    this.toggleDropdown(true);
  }

  toggleDropdown(active = this.state.active) {
    this.setState({ active: !active })
  }

  render() {
    const { active } = this.state;
    const {
      className,
      children,
      items,
    } = this.props;

    console.log(active)

    return (
      <div
        className={className}
        onMouseLeave={this.handleMouseLeave}
      >
        <Button
          modifiers="dropdown"
          ariaExpanded={active}
          ariaHaspopup={true}
          onClick={this.hancleClick}
          text={children}
          icon="keyboard_arrow_down"
        />

        { active
          ? (<div
              className={`${className}_items`}
              role="menu"
            >
            { items }
          </div>)
          : null }
      </div>
    )
  }
}

export default Dropdown;
