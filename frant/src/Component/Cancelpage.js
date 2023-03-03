import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cancelpage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("userdata");
    if (token) {
      if (data) {
        navigate("/match");
      } else {
        navigate("/cancel");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-center top">
        <h1>You Are Unathorize Person !!</h1>
      </div>
      <div className="d-flex justify-content-center mt-3 ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/800px-Twemoji_1f600.svg.png"
          alt=""
          className="imoge"
        />
      </div>
    </div>
  );
}
