import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "./FormContext";
const Form = () => {
  const {
    email,
    username,
    mobileNumber,
    setEmail,
    setMobileNumber,
    setUsername,
    userList,
    setUserList,
    errors,
    setErrors,
    editMode,

    editId,
    setEditId,
  } = useContext(FormContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      if (editMode) {
        setUserList(
          userList.map((elm) => {
            if (elm.id === editId) {
              return {
                ...elm,
                email: email,
                username: username,
                mobileNumber: mobileNumber,
              };
            } else {
              return elm;
            }
          })
        );
        setEditId(null);
      } else {
        const newData = {
          id: new Date().getTime().toString(),
          email: email,
          username: username,
          mobileNumber: mobileNumber,
        };
        setUserList([...userList, newData]);
      }
      setErrors({});
      setEmail("");
      setUsername("");
      setMobileNumber("");
      navigate("/");
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!username) {
      validationErrors.usernameError = "Username is required";
    } else if (!/^[A-Za-z]{3,}$/.test(username)) {
      validationErrors.usernameError = "Invalid username format";
    }

    if (!email) {
      validationErrors.emailError = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.emailError = "Invalid email format";
    } else if (!editMode && userList.some((data) => data.email === email)) {
      validationErrors.emailError = "Email already exists";
    }

    if (!mobileNumber) {
      validationErrors.mobileNumberError = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      validationErrors.mobileNumberError = "Invalid mobile number";
    } else if (
      !editMode &&
      userList.some((data) => data.mobileNumber === mobileNumber)
    ) {
      validationErrors.mobileNumberError = "Mobile number already exists";
    }

    return validationErrors;
  };

  return (
    <div className="w-full h-screen  flex justify-center items-center bg-gray-200">
      <div className=" w-[400px] md:w-[450px] relative h-[60vh] rounded-2xl shadow-2xl bg-[#4d6fe5] ">
        <AiOutlineClose
          onClick={() => {
            navigate("/");
            setEmail("");
            setMobileNumber("");
            setUsername("");
          }}
          size={24}
          className=" text-white absolute  right-2 top-2"
        />

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col justify-center items-center "
        >
          <h1 className="text-center text-white text-xl md:text-2xl font-poppins mt-16 mb-10">
            {editMode ? "Edit" : "Register"}
          </h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className=" border-gray-100 border-2  outline-none px-4 py-1 rounded-md shadow-2xl font-poppins text-sm capitalize"
            type="text"
            name="username"
            value={username}
            placeholder="Enter username"
            autoComplete="off"
          />
          {errors.usernameError && (
            <span className="text-yellow-300">{errors.usernameError}</span>
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 border-gray-100 border-2 outline-none px-4 py-1 rounded-md shadow-2xl font-poppins text-sm"
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            autoComplete="off"
          />
          {errors.emailError && (
            <span className="text-yellow-300">{errors.emailError}</span>
          )}

          <input
            onChange={(e) => setMobileNumber(e.target.value)}
            className="mt-4 border-gray-100 border-2 outline-none px-4 py-1 rounded-md shadow-2xl font-poppins text-sm"
            type="tel"
            name="mobileNumber"
            value={mobileNumber}
            placeholder="Enter mobile number"
            maxLength={10}
            autoComplete="off"
          />
          {errors.mobileNumberError && (
            <span className="text-yellow-300">{errors.mobileNumberError}</span>
          )}

          <button
            type="submit"
            className="bg-green-500 shadow-2xl text-white mt-8 w-[205px] py-1 rounded-md hover:bg-green-600 "
          >
            {editMode ? "Save" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
