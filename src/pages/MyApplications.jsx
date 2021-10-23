import { makeStyles, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getApplicationsForUser, getUserDetails } from "../api/api";
import { useHistory } from "react-router";
import MakeTable from "../components/common/MakeTable";
import Loader from "../components/common/Loader";

const useStyles = makeStyles({
  titleText: {
    color: "red",
    float: "left",
    padding: "0.8rem 0",
  },
  addButton: {
    float: "right",
    fontSize: "0.9rem",
    background: "red",
    color: "#fff",
    "&:hover": {
      background: "red",
      color: "#847473",
    },
    "&:disabled": {
      background: "#D7D7D7",
    },
  },
});

export default function MyApplications() {
  const classes = useStyles();
  const history = useHistory();
  const [applicationData, setApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getApplications = (userId) => {
    getApplicationsForUser(userId)
      .then((res) => {
        if (res.data.code === 200) {
          var list = [];
          res.data.data.Application.map((item) => {
            item.id = item.AppID;
            list.push(item);
          });
          setApplicationData(list);
          setIsLoading(false);
        } else {
          var list = [];
          setApplicationData(list);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getUserInfo = () => {
    setIsLoading(true);
    getUserDetails(localStorage.getItem("token"))
      .then((res) => {
        getApplications(res.data.data.user_id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        history.push("/online-application");
        console.log(err);
        setIsLoading(false);
      });
  };

  const applicationColumns = [
    { title: "Application Number", id: "AppID" },
    { title: "Student Name", id: "StudentName" },
    { title: "School Name", id: "SchoolName" },
    { title: "Class", id: "Class" },
    { title: "Application Fees", id: "AppFee" },
    { title: "Admission Fees", id: "AdmFee" },
    { title: "Submitted On", id: "AppDate" },
    { title: "Status", id: "AppStatus" },
  ];

  return (
    <>
      <Typography style={{ fontSize: "1.5rem" }} className={classes.titleText}>
        <b>My Applications</b>
      </Typography>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <MakeTable
          columns={applicationColumns}
          data={applicationData}
          style={{
            height: "35rem",
          }}
        />
      )}
    </>
  );
}
