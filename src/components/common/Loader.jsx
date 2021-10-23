import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loader = (props) => {
  const {
    parentDivHeight = "39rem",
    paddingTop = "15rem",
    paddingLeft = "25rem",
  } = props;
  return (
    <div
      style={{
        height: parentDivHeight,
      }}
    >
      <div
        style={{
          paddingTop: paddingTop,
          paddingLeft: paddingLeft,
        }}
      >
        <CircularProgress style={{ color: "red" }} size={100} />
      </div>
    </div>
  );
};

export default Loader;
