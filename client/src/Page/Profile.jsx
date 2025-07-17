import React from "react";
import { app } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { logout } from "../features/user/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const auth=getAuth(app);
  const dispatch=useDispatch();
  const navigate=useNavigate();

    const handleLogout=()=>{
      signOut(auth).then(() => {
        // Sign-out successful.
        dispatch(logout());
        toast.success("Logged out");
        navigate("/");
        
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
        console.log(error);
        
      })
    }

  return (
    <>
      <div className=" min-h-[calc(100vh-64px)] w-full bg-gradient-to-t from-indigo-500  to-gray-500 flex justify-center items-center ">
        <div className="card  w-1/2 max-sm:w-2/3">
          <div
            className="w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg
                    bg-white dark:bg-slate-800"
          >
            {/* header banner (purely decorative) */}
            <div className="h-20 w-full bg-gradient-to-r from-emerald-500 to-teal-400"></div>

            {/* photo – overlaps banner */}
            <div className="relative flex justify-center -mt-12">
              <img
                src={user.photoURL}
                alt={`${user.name}'s avatar`}
                className="w-24 h-24 rounded-full ring-4 ring-white dark:ring-slate-800 object-cover"
              />
            </div>

            {/* body */}
            <div className="px-6 pb-6 text-center">
              <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-slate-100">
                {user.displayName}
              </h2>
              <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-slate-100">
                {user.email} 
              </h2>
              {/* <h1 className="text-sm text-gray-500 dark:text-slate-400">
                {user.email}
              </h1> */}

              {/* actions */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-emerald-500 border
                       border-emerald-500 hover:text-white hover:bg-emerald-500
                       rounded-lg focus:outline-none focus:ring-2
                       focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
