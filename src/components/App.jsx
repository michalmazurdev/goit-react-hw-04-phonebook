import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactItem } from './ContactItem/ContactItem';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('contacts')) !== null) {
      setContacts(JSON.parse(localStorage.getItem('contacts')));
    }
  }, []);

  const addContact = event => {
    event.preventDefault();

    if (localStorage.getItem('contacts') !== null) {
      const currentlySaved = JSON.parse(localStorage.getItem('contacts'));
      const contactNames = currentlySaved.map(contact => contact.name);
      if (contactNames.includes(name)) {
        return alert(`${name} is alredy in contacts`);
      }
      currentlySaved.push({
        id: nanoid(),
        name: name,
        number: number.toString(),
      });
      localStorage.setItem('contacts', JSON.stringify(currentlySaved));
      setContacts(JSON.parse(localStorage.getItem('contacts')));
    } else {
      localStorage.setItem(
        'contacts',
        JSON.stringify([{ id: nanoid(), name, number: number.toString() }])
      );
      setContacts(JSON.parse(localStorage.getItem('contacts')));
    }

    event.target.reset();
  };

  const handleChnage = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      case 'filter':
        setFilter(event.target.value);
        break;
      default:
        console.log('something went wrong');
    }
  };

  const filterArrayByName = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = id => {
    const currentlySaved = JSON.parse(localStorage.getItem('contacts'));
    localStorage.setItem(
      'contacts',
      JSON.stringify(currentlySaved.filter(contact => contact.id !== id))
    );
    setContacts(JSON.parse(localStorage.getItem('contacts')));
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 className={css.heading}>Phonebook</h1>
      <ContactForm onSubmit={addContact} onChange={handleChnage} />
      <h2 className={css.secondaryHeading}>Contacts</h2>
      <Filter onChange={handleChnage} />
      <ContactList>
        <ContactItem
          arrayOfContacts={filterArrayByName()}
          deleteFunction={removeContact}
        />
      </ContactList>
    </div>
  );
};
