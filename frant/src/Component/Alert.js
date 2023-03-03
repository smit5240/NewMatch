import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "50px" }}>
      {props.Alert && (
        <div
          class={`alert alert-${props.Alert.type} alert-dismissible fade show d-flex `}
          role="alert"
        >
          <strong className="me-2">{capitalize(props.Alert.type)}</strong> :{" "}
          {props.Alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
