import React from "react";
import content from "../config/content";

const MailTo = ({ isCenter = false, text = "Say Hello" }) => {
  return (
    <a href={`mailto:${content.mailto.email}`} className="no-underline">
      <button
        className={`pv2 ph4 pointer ttu
					${isCenter ? "center" : ""}
					btn-bg btn-border btn-text btn-transition nowrap font-montserrat-bold`}
      >
        {text}
      </button>
    </a>
  );
};

export default MailTo;
