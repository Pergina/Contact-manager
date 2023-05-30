import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";
import { useContext } from "react";

const AddContact = ({createContactForm, onChangeInfo, groups, errors, contact}) =>{
// console.log(errors)
    return(
        <div className="contact-form-wrapper">
            <h1>Add Contact</h1>
            {errors?.map((error, index)=>(
                <p key={index} style={{color: "red"}}>{error.message}</p>
            ))}
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
                    value={contact.group}
                >
                    <option>Choose your Group</option>
                    {groups.map((g,index)=>(
                        <option value={g.id} key={index}>{g.name}</option>
                    ))}
                </select>
                <input
                    className=""
                    type={"submit"}
                />
                <Link className="contact-form__cancle" to={"/"}>Cancle</Link>
            </form>
        </div>
    )
}
export default AddContact;