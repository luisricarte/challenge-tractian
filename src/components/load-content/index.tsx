import React from "react";
import { LeftSideBar } from "../left-side-bar";
import { RightSideBar } from "../right-side-bar";

export const LoadContent = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "0.5rem",
        paddingTop: "1rem",
        height: "675px",
      }}
    >
      <LeftSideBar />
      <RightSideBar />
    </div>
  );
};
