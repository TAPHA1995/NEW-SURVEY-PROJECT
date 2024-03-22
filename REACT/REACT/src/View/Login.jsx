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
    marginTop:'0px',
    backgroundColor:'white',
    color:'black',
    padding:'10px',
    fontSize:'20px'
    }
  return (
    <div>
       <div class=" bg-white " style={{height:'600px', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
            <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">Build Your New <span class="text-indigo-600">Idea</span></h2>
                    <p class="mt-2 text-sm text-gray-500 md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates. Cumque debitis dignissimos id quam vel!</p>
                    <div class="flex justify-center lg:justify-center mt-6">
                        <a class="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="#">Apprendre plus</a>
                    </div>
                </div>
            </div>
            <div class=" lg:block lg:w-1/2">
                <div class="flex justify-center bg-[#cfc2c2]" >
                    <div class=" ">
                    <p className="absolute ml-[200px] mt-[50px]"><strong>Connexion</strong></p>
                      <form onSubmit={onSubmit} action="#" methode="POST">
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
                    </div>
                </div>
            </div>
        </div>
     {/* <section style={sectionSignup}>
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
       </section> */}
    </div>
  )
}
