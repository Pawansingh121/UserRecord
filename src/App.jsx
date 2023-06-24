import React, { useState } from "react";
import Form from "./components/Form";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { dummyData } from "./Data";
import { FormContext } from "./components/FormContext";

const App = () => {
  const [userList, setUserList] = useState(dummyData);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [errors, setErrors] = useState({});

  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <FormContext.Provider
        value={{
          email,
          setEmail,
          mobileNumber,
          setMobileNumber,
          username,
          setUsername,
          userList,
          setUserList,
          errors,
          setErrors,
          editId,
          setEditId,
          editMode,
          setEditMode,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<Form />} />
        </Routes>
      </FormContext.Provider>
    </>
  );
};
export default App;
