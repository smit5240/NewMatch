import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Component/Register";
import Navbar from "./Component/Navbar";
import Login from "./Component/Login";
import Middle from "./Component/Middle";
import Logout from "./Component/Logout";
import Match from "./Component/Match";
import Cancelpage from "./Component/Cancelpage";
import Allmatch from "./Component/Allmatch";
import Alert from "./Component/Alert";
import { useState } from "react";
// import Loding from "./Component/Loding";
// import { lazy } from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const Showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <Router>
        <Navbar path="/" />
        <Alert Alert={alert} />
        <Routes>
          <Route exact path="/" element={<Middle />} />
          <Route
            exact
            path="/register"
            element={<Register showalert={Showalert} />}
          />
          <Route
            exact
            path="/login"
            element={<Login showalert={Showalert} />}
          />
          <Route
            exact
            path="/logout"
            element={<Logout showalert={Showalert} />}
          />
          <Route
            exact
            path="/match"
            element={<Match showalert={Showalert} />}
          />
          <Route exact path="/cancel" element={<Cancelpage />} />
          <Route exact path="/allmatch" element={<Allmatch />} />
          {/* <Route exact path="lode" element={<Loding />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
