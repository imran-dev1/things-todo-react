import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import logo from "../images/things-todo-logo.svg";

const Header = () => {
   const [user] = useAuthState(auth);
   console.log(user);
   return (
      <div className="py-5 text-center">
         <Link to="/">
            <img src={logo} alt="" className="mx-auto max-w-[250px]" />
         </Link>
         {!user ? (
            <Link to="/login" className="btn btn-accent">
               Login to add ToDo
            </Link>
         ) : (
            <button onClick={() => signOut(auth)} className="btn btn-accent">
               <img
                  src={user?.photoURL}
                  alt=""
                  className=" w-8 rounded-full mr-2"
               />
               Logout
            </button>
         )}
      </div>
   );
};

export default Header;
