import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import { useState } from "react";
import Contacts from "./components/Contacts/Contacts";
import { createContact, deleteContact, getAllContacts, getAllGroups } from "./services/contactService";
import ViewContact from "./components/Contacts/ViewContact";
import AddContact from "./components/Contacts/AddContact";
import EditContact from "./components/Contacts/EditContact";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { ContactContext } from "./context/contactContext";
import { contactSchema } from "./components/validations/contactValidation";
const App = () =>{
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([])
  useState(()=>{
    const fetchData = async () =>{
      setLoading(true);
      try{
        const {data: contactsData} = await getAllContacts();
        const {data: groupsData} = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      }
      catch(err){
        console.log(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [])
  const onChangeInfo = (event) =>{
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    })
  }
  const createContactForm = async (e) =>{
    e.preventDefault();
    let allContacts = [...contacts];
    setLoading(true);
    try{
      await contactSchema.validate(contact, {abortEarly: false});
      allContacts = [...contacts, contact]
      setContacts(allContacts);
      setFilteredContacts(allContacts)
      const {status} = await createContact(contact);
      console.log(status)
      if(status===201) {
        navigate("/");
        setLoading(false);
      }
    }
    catch(err) {
      setLoading(false);
      setErrors(err.inner);
      setContacts(allContacts);
    }
  }
  const removeContact = async (contactId) =>{
    setLoading(true);
    let allContacts = [...contacts];
    try{
      allContacts = allContacts.filter(contact=> contact.id !== contactId)
      setContacts(allContacts);
      setFilteredContacts(allContacts)
      const {status} = await deleteContact(contactId);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      setContacts(allContacts);
    }
  }
  const confirmDelete = (fullname, contactId) =>{
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                removeContact(contactId)
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });
  }
  let timeout;
  const searchContact = (query) =>{
    clearTimeout(timeout);
    if(!query) return setFilteredContacts([...contacts]) 
    let allContacts = [...contacts];
    timeout = setTimeout(() => {
      allContacts = allContacts.filter(contact =>{
        return contact.fullname.toLowerCase().includes(query.toLowerCase());
      })
      setFilteredContacts(allContacts);
      console.log(allContacts)
    }, 1000);
  }
  return(
    <ContactContext.Provider value={{
      searchContact
    }}>
      <div>
        <Navbar/>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={"/contacts"}/>}
          />
          <Route
            path="/contacts"
            element={<Contacts
              contacts={filteredContacts}
              loading={loading}
              confirmDelete={confirmDelete}
            />}
          />
          <Route
            path="/contacts/:contactId"
            element={<ViewContact
              loading={loading}
              setLoading={setLoading}
              groups={groups}
            />}
          />
          <Route
            path="/contacts/add"
            element={<AddContact
              contact={contact}
              groups={groups}
              createContactForm={createContactForm}
              onChangeInfo={onChangeInfo}
              errors={errors}
            />}
          />
          <Route
            path="/contacts/edit/:contactId"
            element={<EditContact
              groups={groups}
              contacts={contacts}
              setContacts={setContacts}

            />}
          />
        </Routes>
      </div>
    </ContactContext.Provider>
    
  )
}
export default App;