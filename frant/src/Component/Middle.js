import React from "react";

export default function Middle() {
  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <div className="top">
          <h1>Choise You !!</h1>
          <div className="d-flex">
            <button className="design">
              <a href="/register">Sign-Up</a>
            </button>
            <button className="design">
              <a href="/login">Sign-in</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
