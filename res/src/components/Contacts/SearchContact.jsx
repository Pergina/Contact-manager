import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
const SearchContact = () =>{
    const {searchContact} = useContext(ContactContext);
    return(
        <div className="nav__search">
            <input
                type={"text"}
                onChange={(e)=> searchContact(e.target.value)}
            />
            <span>search</span>
        </div>
    )
}
export default SearchContact;