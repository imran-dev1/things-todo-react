import React from "react";
import { FcGoogle } from "react-icons/fc";
import auth from "../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Loading from "../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
const Login = () => {
   const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

   const navigate = useNavigate();

   if (loading) {
      return <Loading></Loading>;
   }
   if (user) {
      navigate("/");
   }

   return (
      <div>
         <div className="shadow-lg rounded-lg border p-10">
            <h2 className="text-2xl mb-10">Login</h2>
            <button
               onClick={() => signInWithGoogle()}
               class="btn btn-secondary tracking-widest hover:text-white"
            >
               <FcGoogle className="text-3xl mr-2"></FcGoogle>
               Continue with Google
            </button>
         </div>
      </div>
   );
};

export default Login;
