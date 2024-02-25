import { Navigate, Outlet } from "react-router-dom";
import  '../App.css';
import { useStateContext } from "../Contexts/ContextProvider";
// import img from "../assets/Logo.png";
export default function GuestLayout(){
    const{userToken} = useStateContext();

    if (userToken) {
        return <Navigate to="/"/>
    }
return(
    <div>
        <div>
            {/* <img src={img} alt="" /> */}
        </div>
        <Outlet/>
    </div>
   )
}