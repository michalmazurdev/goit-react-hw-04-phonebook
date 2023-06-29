import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ onSubmit, onChange }) => (
  <form className={css.form} onSubmit={onSubmit}>
    <label className={css.label}>
      Name
      <input
        className={css.input}
        onChange={onChange}
        type="text"
        name="name"
        pattern="^[a-zA-Z]+(([' \u2013][a-zA-Z])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </label>
    <label className={css.label}>
      Number
      <input
        className={css.input}
        onChange={onChange}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
    </label>
    <button className={css.button} type="submit">
      Add contact
    </button>
  </form>
);

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
