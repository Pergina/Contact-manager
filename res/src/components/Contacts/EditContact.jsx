import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateContact, getGroup, getContact } from "../../services/contactService";
import Spinner from "../Spinner";
import { contactSchema } from "../validations/contactValidation";
const EditContact = ({groups, contacts, setContacts}) =>{
    const {contactId} = useParams();
    const [state, setState] = useState({
        contact: {},
        group: {},
        loading: false
    })
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async () =>{
            setState({
                ...state,
                loading: true
            })
            try{
                const {data: contactData} = await getContact(contactId);
                const {data: groupData} = await getGroup(contactData.group);
                setState({
                    ...state,
                    contact: contactData,
                    group: groupData,
                    loading: false
                })
            }
            catch(err) {
                setState({
                    ...state,
                    loading: false
                })
            }
        }
        fetchData();
    }, [])
    const onChangeInfo = (event) =>{
        setState({
            ...state,
            contact:{
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }
    const createContactForm = async (event) =>{
        event.preventDefault();
        setState({...state, loading: true});
        let allContacts = [...contacts];
        try{
            await contactSchema.validate(contact, {abortEarly: false});
            const {data: contactData} = await updateContact(state.contact, contactId);
            let index = allContacts.findIndex(contact=> contact.id === parseInt(contactId));
            allContacts[index] = contactData;
            console.log(allContacts)
            setContacts(allContacts);
            setState({...state, loading: false});
            navigate("/")
        }catch(err) {
            setState({...state, loading: false});
            setContacts(allContacts);
        }
    }
    const {contact, group, loading} = state;
    return(
        <>
        {loading ? <Spinner/> : (
            <div className="contact-form-wrapper">
                <h1>Edit Contact</h1>
                <form className="contact-form" action="" onSubmit={createContactForm}>
                    <input
                        type={"text"}
                        name={"fullname"}
                        placeholder={"Fullname"}
                        onChange={onChangeInfo}
                        value={contact.fullname}
                    />
                    <input
                        type={"text"}
                        name={"photo"}
                        placeholder={"Photo address"}
                        onChange={onChangeInfo}
                        value={contact.photo}
                    />
                    <input
                        type={"email"}
                        name={"email"}
                        placeholder={"Email"}
                        onChange={onChangeInfo}
                        value={contact.email}
                    />
                    <input
                        type={"number"}
                        name={"mobile"}
                        placeholder={"Mobile"}
                        onChange={onChangeInfo}
                        value={contact.mobile}
                    />
                    <input
                        type={"text"}
                        name={"job"}
                        placeholder={"Job"}
                        onChange={onChangeInfo}
                        value={contact.job}
                    />
                    <select
                        className="contact-form__groups"
                        name="group"
                        onChange={onChangeInfo}
                        value={group.id}
                    >
                        {groups.map(g=>(
                            <option value={g.id} key={g.id}>{g.name}</option>
                        ))}
                    </select>
                    <input
                        className=""
                        type={"submit"}
                    />
                    <Link className="contact-form__cancle" to={"/"}>Cancle</Link>
                </form>
            
            </div>
        )}
        </>
    )
}
export default EditContact;