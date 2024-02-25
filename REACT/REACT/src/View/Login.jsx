import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../Contexts/ContextProvider";

export default function Login() {
  const {setCurrentUser, setUserToken} = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({__html:''});


  const onSubmit = (ev)=>{
    ev.preventDefault();
    setError({__html:''})

    axiosClient.post('/login',{
      email,
      password,
    })
    .then(({data})=>
    {
      setCurrentUser(data.user)
      setUserToken(data.token)
    })
    .catch((error)=>
    {
      if(error.response){
       const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
       setError({__html:finalErrors.join('<br>')})
      }
     console.error(error);
    })
  }


  const alreadyhave={
    color:'blue',
   }
   const sectionSignup={
     display:"flex",
     justifyContent:"center",
     
   }
   const submit={
    hover:'green',
    marginTop:'10px',
    backgroundColor:'white',
    color:'black',
    padding:'10px',
    fontSize:'20px'
    }
  return (
    <div>
     <section style={sectionSignup}>
        <form onSubmit={onSubmit} action="#" methode="POST">
        <p className=""><strong>Connexion</strong></p>
            <div class="container signIn">
            {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}
              <div class="row inputs " >
                  <div class="">
                    <label htmlFor="email">Email</label><br />
                      <input type="email" class="input-email" id="inputEmail" aria-label="Email" placeholder="Email"

                      value={email}
                      onChange={ev => setEmail(ev.target.value)}
                      
                      />
                  </div><br />
                  <div class="">
                    <label htmlFor="password">Password</label><br />
                      <input type="password" class="input-password" id="inputPassword" aria-label="Password" placeholder="Password"
                      
                      value={password}
                      onChange={ev => setPassword(ev.target.value)}

                      />
                  </div><br />
                  <Link className="" to="/Signup" style={alreadyhave}>Don't have an account, register!</Link><br />
                  <button type="submit" class="btn btn-primary button-create-account">Se connecter</button>
                </div>
              <div class="row sign-in2">
              </div>
            </div>
          </form>
       </section>
    </div>
  )
}
