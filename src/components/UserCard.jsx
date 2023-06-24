import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "./FormContext";

const UserCard = () => {
  const {
    userList,
    setUserList,
    setEditId,
    setEditMode,
    setEmail,
    setUsername,
    setMobileNumber,
  } = useContext(FormContext);

  const deleteHandler = (id) => {
    setUserList(
      userList.filter((card) => {
        return card.id !== id;
      })
    );
  };
  const editHandler = (id) => {
    let edititem = userList.find((ed) => {
      return ed.id === id;
    });
    setEmail(edititem.email);
    setUsername(edititem.username);
    setMobileNumber(edititem.mobileNumber);
    setEditId(edititem.id);

    setEditMode(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center pb-12">
      {userList.map((elm) => {
        return (
          <div
            key={elm.id}
            className="w-[300px] h-[200px] bg-gray-300 mt-16 flex flex-col items-center justify-center gap-3 font-poppins rounded-2xl shadow-lg"
          >
            <h2>Name : {elm.username}</h2>
            <p>Email : {elm.email}</p>
            <p>Mobile: {elm.mobileNumber}</p>
            <div className="flex gap-6">
              <Link to="/adduser">
                <button
                  onClick={() => editHandler(elm.id)}
                  className="bg-green-500 text-white px-3  rounded-md "
                >
                  Edit
                </button>
              </Link>

              <button
                onClick={() => deleteHandler(elm.id)}
                className="bg-red-500 text-white px-3  rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
