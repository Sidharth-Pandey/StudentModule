import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const useStyles = makeStyles({
  wrapper: {
    background: "rgb(247,87,87)",
    background:
      "linear-gradient(90deg,rgba(226, 126, 126, 0.2) 0%,  rgba(211, 113, 113, 0.4) 30%, rgba(243, 85, 85, 0.4) 50%,rgba(247,85,85,1) 100%)",
    height: "100vh",
    overflow: "hidden",
    backgroundAttachment: "fixed",
  },
  stylebar: {
    position: "fixed",
    left: "140px",
    top: "20px",
    bottom: "0px",
    zIndex: 4,
  },
  content: {
    position: "absolute",
    left: "70px",
    right: "200px",
    top: "50px",
    padding: "30px 50px 30px 210px",
    background: "white",
  },
  applyButton: {
    position: "absolute",
    top: "25px",
    right: 0,
    backgroundColor: "red",
    color: "white",
    padding: "10px 30px",
    transform: "rotate(-90deg) translateY(29px)",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#847473",
    },
  },
});

const Wrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.stylebar}>
        <Sidebar />
      </div>

      <div className={classes.content}>
        {/* <Link to="/ApplicationForm"> */}
        <span className={classes.applyButton}>Apply</span>
        {/* </Link> */}
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
