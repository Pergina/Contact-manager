import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchContact from "./Contacts/SearchContact";
const Navbar = () =>{
    
    const location = useLocation();
    return(
        <div className="nav">
            <h1>The Office</h1>
            {location.pathname === "/contacts" ? (<SearchContact/>) : null}
        </div>
    )
}
export default Navbar;