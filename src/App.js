import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";

function App() {
  // const [user, setUser] = useState(sessionStorage.getItem("profile"))

  const user = null;
  // useSelector((state) => state.authReducers.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="../auth" />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="../home" /> : <Auth />}
          />
          {/* <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          />
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="../auth" />}
          />
          <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
