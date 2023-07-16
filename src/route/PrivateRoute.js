import React from "react";
import { Navigate } from "react-router-dom";
import PracticeStart from "../page/PracticeStart"
import { useLocation } from "react-router";

const PrivateRoute = ({ authenticate }) => {
  const location = useLocation();
  return 
    <PracticeStart />
};

export default PrivateRoute;