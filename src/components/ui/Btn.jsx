import React from "react";
import "../styles/Btn.css";

export default function Btn({ children, type = "primary", onClick, className = "", ...props }) {
  return (
    <button
      className={`btn btn-${type} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}


{/* <Btn type="primary">Submit</Btn>
<Btn type="secondary">Cancel</Btn>
<Btn type="success">Confirm</Btn>
<Btn type="danger">Delete</Btn>
<Btn type="bordered">Outlined</Btn>
<Btn type="dotted">Dashed</Btn>
<Btn type="text">Learn more</Btn> */}
