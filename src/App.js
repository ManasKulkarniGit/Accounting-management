import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import Products from "./Pages/Products/Products";
import AddUsers from "./Pages/Users/AddUsers";
import AddProducts from "./Pages/Products/AddProducts";
import Orders from "./Pages/Orders/Orders";
import Logout from "./Pages/Logout/Logout";
import Sales from "./Pages/Orders/Sales";
import "./App.sass";

// Context for the theme settings and the functions to handle them
export const LoaderContext = React.createContext();
export const ThemeContext = React.createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [blueColorMode, setBlueColorMode] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function handleDarkMode() {
    setDarkMode(true);
    setBlueColorMode(blueColorMode);
    appRef.current.classList.toggle("dark_mode");
    appRef.current.classList.remove("blue_color_mode");
  }

  function handleBlueColorMode() {
    setBlueColorMode(true);
    setDarkMode(darkMode);
    appRef.current.classList.toggle("blue_color_mode");
    appRef.current.classList.remove("dark_mode");
  }

  useEffect(() => {
    document.title = "Login | Admin Dashboard";
    window.scrollTo(0, 0);
  }, []);

  // Context values to pass to the children components
  const ThemeContextValues = {
    darkMode,
    blueColorMode,
    handleDarkMode,
    handleBlueColorMode,
  };

  const LoaderContextValues = {
    isLoading,
    setIsLoading,
  };

  return (
    <>
      <div className="app" ref={appRef}>
        <ThemeContext.Provider value={ThemeContextValues}>
          <LoaderContext.Provider value={LoaderContextValues}>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route index element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/orders/*">
                    <Route index element={<Orders />} />
                    <Route path="sales" element={<Sales />} />
                  </Route>
                  <Route path="/users/*">
                    <Route index element={<Users />} />
                    <Route path="new" element={<AddUsers />} />
                  </Route>
                  <Route path="/products/*">
                    <Route index element={<Products />} />
                    <Route path="new" element={<AddProducts />} />
                  </Route>
                  <Route path="*" element={<Login />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </LoaderContext.Provider>
        </ThemeContext.Provider>
      </div>
    </>
  );
}

export default App;
