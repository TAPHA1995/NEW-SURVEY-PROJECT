import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import  '../App.css';
import { useStateContext } from '../Contexts/ContextProvider';
import axiosClient from '../axios';


export default function DefaultLayout() {
const{currentUser, userToken, setCurrentUser, setUserToken} = useStateContext();

 
  if (!userToken) {
    return <Navigate to='login'/>
  }
  const logout = (ev) => {
    ev.preventDefault();
   axiosClient.post('/logout').then((res)=>{
    setCurrentUser({});
    setUserToken(null);
   });
  };

  return (
    <div>
    <nav className='bg-white text-black '> 
       <div className="menu-container">
           <div className="menu-container">
                <div>
                    <ul className="home bg-black p-2">
                    <li><Link to="/" className=' text-white '>Home</Link></li>
                    </ul>
                </div>
                <div>
                    <ul className=" nav">
                        <li><Link to="Survey">Surveys</Link></li>
                        <li><Link>Login</Link></li>
                        <li><Link>SignUp</Link></li>
                        | <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                          </li>
                        <li>{currentUser.name}</li>
                        <li><Link onClick={(ev) => logout(ev)}>logout</Link></li>
                    </ul>
                </div>
            </div>
        </div> 
    </nav>
    <hr /> 
      <Outlet/>
    </div>
  )
}
