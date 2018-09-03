import * as React   from 'react';

import * as cx      from 'classnames';

import { getClass } from 'utils/getClass';

interface RatingPickerProps {
  label?: string;
  modifiers?: string;
  name?: string;
  onChange?: (name: string, rating: number) => any;
  ratingList: number[];
  readOnly?: boolean;
  value?: number;
}

interface RatingPickerState {
  rating: number;
}

class RatingPicker extends React.Component<RatingPickerProps, RatingPickerState> {
  static defaultProps = {
    modifiers: '',
    name: 'rating',
    number: 0,
    readOnly: false,
  };

  state = {
    rating: this.props.value,
  };

  handleRatingChange = (e, num) => {
    const { rating } = this.state;
    const { onChange, name } = this.props;
    const newRating = (e.target.checked || rating !== num) ? num : 0;

    this.setState({ rating: newRating });

    if (onChange) {
      onChange(name, num);
    }
  }

  render() {
    const { rating } = this.state;
    const {
      label,
      modifiers,
      name,
      ratingList,
      readOnly,
    } = this.props;

    return (
      <div className={getClass('rating-picker', cx(modifiers, { 'read-only': readOnly }))}>
        { (label)
          ? (<p className="rating-picker__label">
            { label }
          </p>)
          : null }

        { ratingList.map((num) => {
          const handleClick = e => this.handleRatingChange(e, num);

          return (
            <React.Fragment key={num}>
              <input
                checked={num <= rating}
                className="rating-picker__input"
                id={`${name}-${num}`}
                name={name}
                onChange={handleClick}
                readOnly={readOnly}
                type="checkbox"
              />

              <label
                className="rating-picker__input-label"
                htmlFor={`${name}-${num}`}
              >
                { num }
              </label>
            </React.Fragment>
          );
        }) }
      </div>
    );
  }
}

export default RatingPicker;
