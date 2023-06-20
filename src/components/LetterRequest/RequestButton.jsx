import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/requestPages.css";

const RequestButton = ({ to, title }) => {
  return (
    <NavLink
      to={to}
      className=" request_button py-10 rounded-sm dark:text-gray-300 border border-gray-300 hover:bg-cool-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 "
    >
      {title}
    </NavLink>
  );
};

export default RequestButton;
