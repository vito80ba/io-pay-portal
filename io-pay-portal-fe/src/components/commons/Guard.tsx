import React from "react";
import { Navigate } from "react-router-dom";
import { isStateEmpty } from "../../utils/storage/sessionStorage";

export default function Guard(props: { children?: React.ReactNode }) {
  return isStateEmpty() ? <Navigate to="/payment" /> : <>{props.children}</>;
}
