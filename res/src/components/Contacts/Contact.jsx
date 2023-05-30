import { Link } from "react-router-dom";
const Contact = ({contact, confirm}) =>{
    return(
        <div className="contact-wrapper">
            <div className="contact">
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
                    </ul>
                    <ul className="contact__links">
                        <li className="contact__link">
                            <Link className="contact__edit" to={`/contacts/edit/${contact.id}`}>Edit</Link>
                        </li>
                        <li className="contact__link contact__view">
                            <Link className="contact__view" to={`/contacts/${contact.id}`}>View</Link>
                        </li>
                        <li className="contact__link contact__delete">
                            <button onClick={confirm} className="contact__delete">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    )
}
export default Contact;