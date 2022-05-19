import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsCheck2Square } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import auth from "../firebase.init";
import { toast } from "react-toastify";

const Home = () => {
   const [loading, setLoading] = useState(false);
   const [lists, setLists] = useState([]);
   const [user] = useAuthState(auth);
   console.log(lists);
   const email = user?.email;
   useEffect(() => {
      fetch(`https://things-todo-react.herokuapp.com/list?userEmail=${email}`)
         .then((res) => res.json())
         .then((data) => setLists(data));
   }, [lists, email]);

   // Add list
   const addTodo = (e) => {
      setLoading(true);
      e.preventDefault();
      const list = e.target.todo_list.value;
      const note = e.target.note.value;
      const userEmail = user?.email;

      const todo = {
         userEmail,
         list,
         note,
      };
      if (user) {
         if (list !== "") {
            fetch("https://things-todo-react.herokuapp.com/list", {
               method: "POST",
               headers: {
                  "content-type": "application/json",
               },
               body: JSON.stringify(todo),
            })
               .then((res) => res.json())
               .then((data) => {
                  toast.success("Todo Added!");
                  e.target.todo_list.value = "";
                  e.target.note.value = "";
                  setLoading(false);
               });
         } else {
            setLoading(false);
            toast.error("Please write your todo!");
         }
      } else {
         toast.error("Please Login to add todo!");
         setLoading(false);
      }
   };

   // Mark as complete

   const markAsComplete = (id) => {
      fetch(`https://things-todo-react.herokuapp.com/list/${id}`, {
         method: "PATCH",
         body: JSON.stringify({
            status: "complete",
         }),
         headers: {
            "Content-type": "application/json; charset=UTF-8",
         },
      })
         .then((response) => response.json())
         .then((json) => toast.success("Todo completed!"));
   };

   // Delete List
   const deleteList = (id) => {
      fetch(`https://things-todo-react.herokuapp.com/list/${id}`, {
         method: "DELETE",
      })
         .then((res) => res.json())
         .then((data) => toast.success("Todo deleted!"));
   };
   return (
      <div className=" px-5">
         <form
            onSubmit={addTodo}
            action=""
            className="max-w-md w-full mx-auto flex flex-col gap-2 items-end justify-center my-10"
         >
            <input
               type="text"
               name="todo_list"
               placeholder="✍️ Add list here..."
               class="input input-bordered w-full bg-[#e2d5fc] text-lg text-black"
            />

            <input
               type="text"
               name="note"
               placeholder="Short note"
               class="input input-bordered w-full bg-[#e2d5fc] text-lg text-black"
            />
            <button className="btn w-32" type="submit">
               {loading ? "Adding..." : "Add"}
            </button>
         </form>

         <div class="mx-auto overflow-x-auto max-w-3xl w-full mb-28">
            <table class="table table-zebra w-full">
               <thead>
                  <tr>
                     <th className="">Todo items</th>
                     <th className="w-24">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {lists.map((item) => (
                     <tr key={item._id}>
                        <td>
                           <p
                              className={`${
                                 item.status && "line-through text-green-700"
                              } text-md font-medium`}
                           >
                              {item.list}
                           </p>{" "}
                           <span
                              className={`${
                                 item.status && "line-through text-green-700"
                              } text-slate-400 text-sm`}
                           >
                              {item.note}
                           </span>
                        </td>
                        <td className=" w-24">
                           <p className="flex text-2xl gap-2">
                              <BsCheck2Square
                                 onClick={() => markAsComplete(item._id)}
                                 className=" cursor-pointer hover:scale-110 transition-all hover:text-green-800"
                              ></BsCheck2Square>
                              <AiOutlineDelete
                                 onClick={() => deleteList(item._id)}
                                 className=" cursor-pointer hover:scale-110 transition-all hover:text-red-800"
                              ></AiOutlineDelete>
                           </p>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Home;
