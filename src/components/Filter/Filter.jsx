import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ onChange }) => (
  <label className={css.label}>
    Find contacts by name
    <input
      className={css.input}
      onChange={onChange}
      type="text"
      name="filter"
      pattern="^[a-zA-Z]+(([' \u2013][a-zA-Z])?[a-zA-Z]*)*$"
    />
  </label>
);

Filter.propTypes = {
  onChange: PropTypes.func,
};
