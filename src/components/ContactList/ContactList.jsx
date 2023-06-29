import css from './ContactList.module.css';
export const ContactList = ({ children }) => (
  <div className={css.contactListContainer}>
    <ul className={css.list}>{children}</ul>
  </div>
);
