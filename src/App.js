import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
   return (
      <div className="">
         <Header></Header>
         <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
         </Routes>
         <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={true}
         ></ToastContainer>
         <Footer></Footer>
      </div>
   );
}

export default App;
