import React from "react";

const Button = ({ isCenter = false, text = "Click Me", handleClick }) => {
  return (
    <button
      className={`mv4 pv2 ph4 pointer ttu ${
        isCenter ? "center" : ""
      } btn-bg btn-border btn-text btn-transition nowrap font-montserrat-bold`}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
};

export default Button;
