import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "rgb(247, 87, 87)",
    width: "120px",
    textAlign: "center",
    height: "100%",
    padding: 0,
    listStyleType: "none",
  },
  listItems: {
    padding: "25px",
    paddingTop: "2.5rem",
    paddingBottom: "4rem",
    fontSize: "24px",
  },
  icon: {
    color: "white",
    cursor: "pointer",
    "&:hover": {
      color: "#847473",
    },
  },
});

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation().pathname;
  const classes = useStyles();
  return (
    <ul className={classes.wrapper}>
      <li className={classes.listItems}>
        <PersonIcon
          style={{
            fontSize: "2.5rem",
            color: location === "/personal-info" && "#847473",
          }}
          onClick={() => history.push("/personal-info")}
          className={classes.icon}
        />
      </li>
      <li className={classes.listItems}>
        <VisibilityIcon
          style={{ fontSize: "2.5rem" }}
          className={classes.icon}
        />
      </li>
      <li className={classes.listItems}>
        <PeopleIcon
          style={{
            fontSize: "2.5rem",
            color: location === "/manage-students" && "#847473",
          }}
          onClick={() => history.push("/manage-students")}
          className={classes.icon}
        />
      </li>
      <li className={classes.listItems}>
        <ListAltIcon
          style={{
            fontSize: "2.5rem",
            color: location === "/my-applications" && "#847473",
          }}
          onClick={() => history.push("/my-applications")}
          className={classes.icon}
        />
      </li>
      <li className={classes.listItems}>
        <AccountBalanceIcon
          style={{
            fontSize: "2.5rem",
            color: location === "/payments" && "#847473",
          }}
          onClick={() => history.push("/payments")}
          className={classes.icon}
        />
      </li>
    </ul>
  );
};

export default Sidebar;
