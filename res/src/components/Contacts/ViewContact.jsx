import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getContact, getGroup } from "../../services/contactService";
import { Link } from "react-router-dom";

const ViewContact = ({setLoading, loading, groups}) =>{
    const {contactId} = useParams();
    const [contact, setContact] = useState({});
    const [group, setGroup] = useState({});
    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true);
            try{
                const {data: contactData} = await getContact(contactId);
                const {data: groupData} = await getGroup(contactData.group);
                setContact(contactData);
                setGroup(groupData)
                setLoading(false);
            }
            catch(err) {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    return(
        <div className="contact-wrapper">
            <h1>{contact.fullname}</h1>
            <div className="contact-view">
                <div className="contact__img">
                    <img src={contact.photo} alt="" />
                </div>
                <div className="contact__texts">
                    <ul>
                        <li>
                            Fullname: {contact.fullname}
                        </li>
                        <li>
                            Email: {contact.email}
                        </li>
                        <li>
                            Mobile: {contact.mobile}
                        </li>
                        <li>
                            Job: {contact.job}
                        </li>
                        <li>
                            group: {group.name}
                        </li>
                    </ul>
                    <ul className="contact__links">
                        <li className="contact__link">
                            <Link className="contact__edit" to={`/contacts/edit/${contact.id}`}>Edit</Link>
                        </li>
                        <li className="contact__link contact__view">
                            <Link className="contact__view" to={`/contacts/${contact.id}`}>View</Link>
                        </li>
                        <li className="contact__link contact__delete">
                            <button className="contact__delete">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    )
}
export default ViewContact;