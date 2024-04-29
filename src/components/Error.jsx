import React from "react";

const Error = ({ children }) => {
  return (
    <div className="error">
      <h1>Что-то пошло не так</h1>
      {children}
    </div>
  );
};

export default Error;
