import {
  makeStyles,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import { getUserDetails, logoutUser } from "../api/api";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  titleText: {
    color: "red",
    float: "left",
    padding: "1rem 0",
    fontSize: "2rem",
  },
  editButton: {
    float: "right",
    fontSize: "0.9rem",
    background: "red",
    color: "#fff",
    margin: "0 0.2rem 0 0",
    "&:hover": {
      background: "red",
      color: "#847473",
    },
    "&:disabled": {
      background: "#D7D7D7",
    },
  },
  logoutButton: {
    float: "right",
    fontSize: "0.9rem",
    background: "red",
    color: "#fff",
    margin: "0 1rem 0 0",
    "&:hover": {
      background: "red",
      color: "#847473",
    },
    "&:disabled": {
      background: "#D7D7D7",
    },
  },
});

const PersonalInfo = () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPersonalInfo();
  }, []);

  const getPersonalInfo = () => {
    setIsLoading(true);
    getUserDetails(localStorage.getItem("token"))
      .then((res) => {
        console.log(res.data.data);
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setPhone(res.data.data.Phone);
        setPassword("just another dummy text");
        setIsLoading(false);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        history.push("/online-application");
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/online-application");
    logoutUser(localStorage.getItem("token"))
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
        localStorage.removeItem("token");
      });
  };

  return (
    <>
      <div>
        <Typography className={classes.titleText}>
          <b>Personal Info</b>
        </Typography>
        <Button onClick={handleLogout} className={classes.logoutButton}>
          <b>Logout</b>
        </Button>
        <Button className={classes.editButton}>
          <b>Edit Personal Info</b>
        </Button>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div
            style={{
              height: "39rem",
            }}
          >
            <div style={{ padding: "4rem 1rem 4rem 1rem" }}>
              <TextField
                style={{ margin: "2rem 0" }}
                id="name"
                label="Name"
                variant="standard"
                defaultValue={name}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                style={{ margin: "2rem 0" }}
                id="phone"
                label="Phone"
                variant="standard"
                defaultValue={phone}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                style={{ margin: "2rem 0" }}
                id="email"
                label="Email"
                variant="standard"
                fullWidth
                defaultValue={email}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                style={{ margin: "2rem 0" }}
                id="password"
                label="Password"
                variant="standard"
                type="password"
                defaultValue={password}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalInfo;
