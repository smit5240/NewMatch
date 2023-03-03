import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Logout(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const Lclick = () => {
    if (!token) {
      window.alert("User is Allready Logouted");
    } else {
      // localStorage.removeItem("token");
      localStorage.clear();
      props.showalert("User is Logout", "success");
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center top">
        <h1> Click And Logout</h1>
      </div>
      <div className="d-flex justify-content-center ">
        <button className="design" onClick={Lclick}>
          <a>Logout</a>
        </button>
      </div>
    </div>
  );
}
