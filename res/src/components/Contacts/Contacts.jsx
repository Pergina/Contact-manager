import Spinner from "../Spinner";
import Contact from "./Contact";
import { Link } from "react-router-dom";
const Contacts = ({contacts, loading, confirmDelete}) =>{
    return(
        <div className="inner-container">
            <Link className="contacts__create" to={"/contacts/add"}>Create Contact</Link>
            <div className="contacts">
                {loading ? <Spinner/> : contacts.length > 0 ? (
                    contacts.map(c=> <Contact confirm={(e)=> confirmDelete(c.fullname, c.id)} contact={c} key={c.id} />)
                ) : (
                    <div className="contacts__img">

                        <img src={require("../../assets/no-found.gif")} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}
export default Contacts;