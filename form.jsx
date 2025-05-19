
import React ,{useEffect, useState} from "react";
import axios from 'axios';

const Form = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
   
    const [message, setMessage] = useState('');
    const [profiles, setProfiles] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/getUsers')
        .then(response=>{
            setProfiles(response.data);
        })
    })

    const handeleSubmit = async(e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/add',{name,email})
        .then(response=>{
            setMessage('User succesfully saved');
        })
        .catch(error => {
            setMessage('failed tosave new user');
        })
    }

    return(
        <>
        <div className="form">
            <form onSubmit={handeleSubmit}>
                <label>Enter Name</label><br/>
                <input 
                type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                /><br /><br />

                <label>Email</label><br/>
                <input 
                type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                /><br/><br />
                <button type="submit">Send</button>

                {profiles.map(profile => (
                <div key={profile._id}>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </div>
                ))}


            </form>
        </div>
        </>
    )
}

export default Form;