import { useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
// import * as storage from "../Servises/localStorage";
import { useSelector, useDispatch } from 'react-redux';
//import { setContacts, addContacts, deleteContacts } from '../Redux/Contacts/contactsActions';
//import * as actions from 'redux/cities/citiesActions';
import { contactsActions} from '../Redux/Contacts';
import {
  getContacts,
  addContact,
  deleteContact,
} from "../Redux/Contacts/contactsOperations";
import { toast } from 'react-toastify';



import { nanoid } from "nanoid";


const App = () => {
  


  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);


  ////////додає контакт

  const addContacts1 = ({ name, number }) => {
    if (
      contacts.some(
        (contact) =>
          contact.name?.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`name "${name}" is already in list`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      phone: number,
    };
    console.log(newContact);
    dispatch(addContact(newContact));

  };
  // шукає контакт

  const handleFilterChange = (value) => {
    filter(value);
  };

  ////видаляє контакт


  const deleteContacts1 = (id) => () => {
  dispatch(deleteContact(id));
  };
 
  return (
    <div>
      <h1>Phonebooc</h1>
      <ContactForm onSubmit={addContacts1} />

      <Filter
        //value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />

      <ContactList
        onDelete={deleteContacts1}
        // filteredContacts={getFilteredContacts()}
      />
    </div>
  );
};

export default App;
