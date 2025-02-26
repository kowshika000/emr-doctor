import React from "react";

const FormButton = ({
  label,
  onClick,
  type = "button",
  bgColor,
  color,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "5px 10px",
        fontSize: "14px",
        borderRadius: "4px",
        backgroundColor: bgColor ? bgColor : "rgb(0, 116, 139)",
        color: color ? color : "#fff",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      // className="custom-btn"
    >
      {label}
    </button>
  );
};

export default FormButton;
