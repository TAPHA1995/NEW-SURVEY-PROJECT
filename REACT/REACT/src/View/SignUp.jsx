import { Link } from "react-router-dom";
import axiosClient from "../axios.js";
import { useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function SignUp() {
  const {setCurrentUser, setUserToken} = useStateContext();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState({__html:''});

  const onSubmit = (ev)=>{
    ev.preventDefault();
    setError({__html:''})

    axiosClient.post('/signup',{
      name:nom,
      email,
      password,
      password_confirmation:passwordConfirmation
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
       console.log(finalErrors)
       setError({__html:finalErrors.join('<br>')})
      }
     console.log(error);
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
          
          <div class="container signIn">
          <p className=""><strong>Inscription</strong></p>
          {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}
            <div class="row inputs " >
          
            <div class="">
                  <label htmlFor="">Nom Complet</label><br />
                    <input type="text" class="" id="NomComplet" aria-label="NomComplet" placeholder="Nom Complet" name="nom" required
                    value={nom}
                    onChange={ev => setNom(ev.target.value)}
                     
                     />
                </div><br />
                <div class="">
                  <label htmlFor="">Email</label><br />
                    <input type="email" class="" id="inputEmail" aria-label="Email" placeholder="Email" name="email" required
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    />
                  
                </div><br />
                <div class="">
                  <label htmlFor="">Mot de passe</label><br />
                    <input type="password" class="" id="inputPassword" aria-label="Password" placeholder="Mot de passe" name="password" required
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    />
                </div><br />
                <div class="">
                  <label htmlFor=""> Confirmation</label><br />
                    <input type="password" class="" id="inputPasswordConfirmation" aria-label="PasswordConfirmation" placeholder="Confirmation du mot de passe" name="password_confirmation" required
                     value={passwordConfirmation}
                     onChange={ev => setPasswordConfirmation(ev.target.value)}
                    />
                </div><br />
                <Link className="" to="/Login" style={alreadyhave}>Already have an account !</Link>
                <button type="submit" className="hover:shadow-slate-300" style={submit}>S'inscrir</button>
              </div>
            <div class="row sign-in2">
            </div>
          </div>
        </form>
       </section>
    </div>
  )
}
