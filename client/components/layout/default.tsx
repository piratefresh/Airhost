import React from "react";
import NavBar from "../navbar";

const DefaultLayout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <NavBar></NavBar>
      {children}
    </>
  );
};

export default DefaultLayout;
