import React, { useContext } from "react";
import UserCard from "./UserCard";
import { FormContext } from "./FormContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setEditMode } = useContext(FormContext);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen max-h-full bg-gray-200">
      <div className="bg-gray-300 h-[80px] w-full flex    items-center justify-around">
        <h1 className="text-2xl md:text-3xl text-violet-500 font-poppins font-bold">
          User Records
        </h1>

        <button
          onClick={() => {
            setEditMode(false);
            navigate("/adduser");
          }}
          className="bg-green-500 shadow-2xl text-white px-6 py-1  rounded-md hover:bg-green-600"
        >
          Add User
        </button>
      </div>
      <UserCard />
    </div>
  );
};

export default Home;
