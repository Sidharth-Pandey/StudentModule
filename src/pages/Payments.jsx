import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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

export default function Payments() {
  const classes = useStyles();
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const paymentColumns = [
    { title: "Application Number", id: "AppID" },
    { title: "School Name", id: "SchoolName" },
    { title: "Student Name", id: "StudentName" },
    { title: "Payment Type", id: "PaymentType" },
    { title: "Paid Date", id: "PaidDate" },
    { title: "Amount", id: "Amount" },
    { title: "Transaction Status", id: "TransactionStatus" },
    { title: "Transaction Data", id: "TransactionData" },
  ];

  return (
    <>
      <Typography style={{ fontSize: "1.5rem" }} className={classes.titleText}>
        <b>Payments</b>
      </Typography>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <MakeTable
          columns={paymentColumns}
          data={paymentData}
          style={{
            height: "35rem",
          }}
        />
      )}
    </>
  );
}
