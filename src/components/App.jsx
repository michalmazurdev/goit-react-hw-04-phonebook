import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactItem } from './ContactItem/ContactItem';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';
class App extends Component {
  state = {
    contacts: [],
    name: '',
    filter: '',
    number: '',
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('contacts')) !== null) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  addContact = event => {
    event.preventDefault();
    const { name, number } = this.state;

    if (localStorage.getItem('contacts') !== null) {
      const currentlySaved = JSON.parse(localStorage.getItem('contacts'));
      const contactNames = currentlySaved.map(contact => contact.name);
      if (contactNames.includes(name)) {
        return alert(`${name} is alredy in contacts`);
      }
      currentlySaved.push({
        id: nanoid(),
        name,
        number: number.toString(),
      });
      localStorage.setItem('contacts', JSON.stringify(currentlySaved));
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      });
    } else {
      localStorage.setItem(
        'contacts',
        JSON.stringify([{ id: nanoid(), name, number: number.toString() }])
      );
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      });
    }

    event.target.reset();
  };

  handleChnage = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  filterArrayByName = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = id => {
    const currentlySaved = JSON.parse(localStorage.getItem('contacts'));
    localStorage.setItem(
      'contacts',
      JSON.stringify(currentlySaved.filter(contact => contact.id !== id))
    );
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contacts')),
    });
  };

  render() {
    console.log('render');
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1 className={css.heading}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} onChange={this.handleChnage} />
        <h2 className={css.secondaryHeading}>Contacts</h2>
        <Filter onChange={this.handleChnage} />
        <ContactList>
          <ContactItem
            arrayOfContacts={this.filterArrayByName()}
            deleteFunction={this.removeContact}
          />
        </ContactList>
      </div>
    );
  }
}
export default App;
