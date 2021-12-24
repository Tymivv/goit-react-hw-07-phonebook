import './ContactList.css';
import { useSelector } from 'react-redux';
// import { contactsActions } from '../Redux/Contacts';

  


const ContactList = ({  onDelete }) => {

  const filter = useSelector((state) => state.contacts.filter);
  const contacts = useSelector(state => state.contacts.items);
  
  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    console.log(contacts)

    return contacts.filter(({ name }) =>
      name?.toLowerCase().includes(normalizedFilter)
    );
  };


  return (


    <ul className="list">
      {filteredContacts().map(({ id, name, phone  }) => (
        <>
          <li className="item" key={id}>
            {name} : {phone}
          </li>
          <button className="button9" type="button" onClick={onDelete(id)}>
            Delete {name}
          </button>
        </>
      ))}
    </ul>
  );

  
}
export default ContactList;
