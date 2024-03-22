import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import  '../App.css';
import { useStateContext } from '../Contexts/ContextProvider';
import axiosClient from '../axios';
import Toasts from './Toasts';


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
  useEffect(()=> {
    axiosClient.get('/me')
    .then(({data})=>{
      setCurrentUser(data)
    })

  },[])
  return (
    <div>
      <nav class="bg-white shadow-lg">
            <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
                <div class="flex justify-between items-center">
                  <div class="text-1xl font-bold text-gray-800 md:text-1xl">
                        <a href="#">FORM</a>
                  </div>
                    <div class="md:hidden">
                        <button type="button" class="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none">
                            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path class="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"/>
                                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row hidden md:block -mx-2">
                    <Link to="/" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Accueil</Link>
                    <Link to="Survey" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Survey
                    </Link>
                    <a href="#" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">A propos</a>
                    <a href="#" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">Contact</a><span className='text-black'>|</span>
                    <a href="#" class="text-gray-800 rounded py-2 px-2 md:mx-2">{currentUser.name}</a>
                    <Link onClick={(ev) => logout(ev)} className='text-black'>logout</Link>
                </div>
            </div>
        </nav>
    {/* <nav className='bg-white text-black '> 
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
    </nav> */}
    <hr /> 
      <Outlet/>
      <Toasts/>
    </div>
  )
}
