import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { IconAt , IconLock } from '@tabler/icons-react';
import { Input , Button } from '@mantine/core';

function Login() {
    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e){
        e.preventDefault();
        
        try{
            
            await axios.post("http://localhost:8000/",{
                email,
                password
            })
            .then(res=>{
                if(res.data=="exist"){
                    history("/home")
                }
                else if(res.data=="notexist"){
                    alert("user have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
        }
        catch(e){
            console.log(e);
        }

    }

    return (
        <div className="login">
            <center>
            <br/>
            <h1>Login</h1><br/><br/><br/><br/>
            <form action="POST">
                <label>Enter Email : </label>
                <Input type="email" onChange={(e)=>{setEmail(e.target.value)}} name="" id="" placeholder="Enter Your Email" size="xs" icon={<IconAt />} style={{ width: '200px' }} />
                <br/><br/><label>Password : </label>
                <Input type="password" onChange={(e)=>{setPassword(e.target.value)}} name="" id="" placeholder="Password" size="xs" icon={<IconLock />} style={{ width: '200px' }} />
                <br/><br/>
                <Button type="submit" onClick={submit} color="dark" >Login</Button>
            </form>
            
            <br/>
            <p>OR</p>
            <br/>
            <Link to="/signup">Register</Link>
            </center>
        </div>

    )
}

export default Login