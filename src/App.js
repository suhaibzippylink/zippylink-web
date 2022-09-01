import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import AuthContext from "./auth/Context";
import Application from "./auth/Application";
import Authentication from "./auth/Authentication";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    console.log("USER: ", user);
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Switch>{!user ? <Authentication /> : <Application />}</Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
