import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

export const ContactItem = ({ arrayOfContacts, deleteFunction }) =>
  arrayOfContacts.map(contact => (
    <li className={css.listItem} key={contact.id}>
      <span>
        {contact.name}: {contact.number}{' '}
      </span>
      <button className={css.button} onClick={() => deleteFunction(contact.id)}>
        Delete
      </button>
    </li>
  ));

ContactItem.propTypes = {
  arrayOfContacts: PropTypes.array,
  deleteFunction: PropTypes.func,
};
