import * as React from 'react';

import { getClass } from 'utils/getClass';

interface RatingPickerProps {
  ratingList: number[];
  name?: string;
  label?: string;
  modifiers?: string;
}

interface RatingPickerState {
  rating: number;
}

class RatingPicker extends React.Component<RatingPickerProps> {
  static defaultProps = {
    modifiers: '',
    name: 'rating',
  };

  state = {
    rating: 0,
  };

  handleRatingChange = (e, num) => {
    const { rating } = this.state;
    const newRating = (e.target.checked || rating !== num) ? num : 0;

    this.setState({ rating: newRating });
  }

  render() {
    const { rating } = this.state;
    const {
      ratingList,
      label,
      modifiers,
      name,
    } = this.props;

    return (
      <div className={getClass('rating-picker', modifiers)}>
        { (label)
          ? (<p className="rating-picker__label">
            { label }
          </p>)
          : null }

        { ratingList.map((num) => {
          const handleClick = e => this.handleRatingChange(e, num);

          return (
            <React.Fragment key={num}>
              <label
                htmlFor={`${name}-${num}`}
                className="rating-picker__input-label"
              >
                { num }
              </label>

              <input
                id={`${name}-${num}`}
                type="checkbox"
                name={name}
                checked={num <= rating}
                onClick={handleClick}
              />
            </React.Fragment>
          );
        }) }
      </div>
    );
  }
}

export default RatingPicker;
