import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../App";
import { motion } from "framer-motion";
import Loader from "../../Reusable Components/Loader";
import "./Login.sass";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase"


const Login = (props) => {
  const { isLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };



  const handleLogin =async () => {

    const q = query(collection(db, "staff"), where("email", "==", userName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if(doc.data().password === password){
        localStorage.setItem("userName", userName);
        navigate("/home");
      }
    });
  
  };

  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="login_page">
              <h5>Login to Admin Dashboard</h5>
              <div className="username_container">
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  value={userName}
                  onChange={handleUserNameChange}
                  placeholder="Email"
                />
              </div>
              <div className="password_container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Password"
                />
              </div>
              <button onClick={handleLogin}>Login</button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Login;
