import {
  Button,
  Checkbox,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  confirmOtp,
  forgetPassword,
  getSchoolDetails,
  loginUser,
  register,
} from "../api/api";
import React, { useEffect, useState } from "react";
import MakeModal from "../components/common/MakeModal";
import MakeTable from "../components/common/MakeTable";
import icon from "../assets/simplified.png";
import { useHistory } from "react-router";
import Loader from "../components/common/Loader";
import DropDown from "../components/common/DropDown";
const useStyles = makeStyles({
  container: {
    margin: 50,
  },
  button: {
    float: "right",
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
  modalButton: {
    fontSize: "0.9rem",
    background: "#000",
    color: "#fff",
    margin: "0 9rem 0 0",
    "&:hover": {
      background: "#707070",
    },
    "&:disabled": {
      background: "#D7D7D7",
    },
  },
  logo: {
    paddingRight: "1rem",
  },
  icon: {
    width: "100%",
    margin: "1rem 0 0 0",
  },
  titleModalText: {
    textAlign: "center",
    margin: "1.5rem 0",
  },
  bottomModalText: {
    textAlign: "center",
  },
  form: {
    width: "100%",
    marginBottom: 10,
  },
  dropDownDiv: {
    padding: "1rem 0",
  },
});
const OnlineApplication = () => {
  const [grades, setGrades] = useState([]);
  const [modaltype, setModaltype] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [logo, setLogo] = useState("");
  const [dropdownGrade, setDropdownGrade] = useState();
  const [gradeFeeDetais, setGradeFeeDetails] = useState([]);
  const [signup, setSignup] = useState({
    displayName: "",
    phone: "",
    email: "",
    type: "User",
    school: "16",
    password: "",
    confirm: "",
  });
  const [otp, setOtp] = useState({ emailOtp: "", phoneOtp: "", userId: "" });
  const [login, setLogin] = useState({ email: "", password: "" });
  const [gradeList, setGradeList] = useState([]);
  const [forgotPassword, setForgotPassword] = useState("");
  const [selectedDropdownGradeName, setSelectedDropdownGradeName] =
    useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [ageCriteria, setAgeCriteria] = useState();
  const [totalSeat, setTotalSeat] = useState();
  const [studentTeacherRatio, setStudentTeacherRatio] = useState();
  const [modelSelection, setModelSelection] = useState([]);
  const [documentRequired, setDocumentRequired] = useState([]);
  const [totalFee, setTotalFee] = useState();
  const classes = useStyles();
  const history = useHistory();
  const columns = [
    { id: "GradeName", title: "Class" },
    { id: "ApplicationFee", title: "Application Fees" },
    { id: "AdminFee", title: "Admission Fees" },
    { id: "AppStartDate", title: "Start Date" },
    { id: "AppEndDate", title: "End Date" },
    { id: "Availability", title: "Availability" },
  ];
  const FeeDetailsColumns = [
    { title: "Type", id: "FeeName" },
    { title: "Amount", id: "Value" },
    { title: "Frequency", id: "Frequency" },
  ];

  useEffect(() => {
    getSchoolDetail();
  }, []);

  const getSchoolDetail = () => {
    setIsLoader(true);
    getSchoolDetails("", "vi", "2021")
      .then((res) => {
        if (res.data.code === 200) {
          console.log(res);
          const { grades, Logo } = res.data.data;
          setLogo(Logo);
          setGrades(grades);
          var grade = [];
          grades.map((item) => {
            grade.push({ title: item.GradeName, value: item.GradeID });
          });
          setGradeList(grade);
          setIsLoader(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoader(false);
      });
  };

  const handleGradeDropDownChange = (e) => {
    grades.map((item) => {
      if (item.SchoolGradeID === e) {
        setGradeFeeDetails(item?.Fees);
        setSelectedDropdownGradeName(item?.GradeName);
        setAgeCriteria(item?.AgeCriteria);
        setStudentTeacherRatio(item?.StudTeachRat);
        setTotalSeat(item?.Seats);
        setModelSelection(item?.Selectionmode);
        setDocumentRequired(item?.DocumentRequired);
        var totalfee = 0;
        item?.Fees.map((val) => {
          totalfee += parseInt(val.Value);
        });
        setTotalFee(totalfee);
      }
    });
  };

  const handleSignup = () => {
    setButtonLoader(true);
    register(signup)
      .then((res) => {
        if (res.data.success === true) {
          setButtonLoader(false);
          handleModal("otp");
          setOtp({ ...otp, userId: res.data.data.id });
        } else {
          alert(res.data.message);
          setButtonLoader(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setButtonLoader(false);
      });
  };

  const handleLogin = () => {
    setButtonLoader(true);
    loginUser(login)
      .then((res) => {
        if (res.data.success === true) {
          const { jwt } = res.data.data;
          localStorage.setItem("token", jwt);
          history.push("/personal-info");
          setButtonLoader(false);
        } else {
          alert(res.data.message);
          setButtonLoader(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setButtonLoader(false);
      });
  };

  const handleForgotPassword = () => {
    setButtonLoader(true);
    forgetPassword(forgotPassword)
      .then((res) => {
        if (res.data.success === true) {
          alert(res.data.message);
          handleModal("login");
          setButtonLoader(false);
        } else {
          alert(res.data.message);
          setButtonLoader(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setButtonLoader(false);
      });
  };

  const handleOtp = () => {
    setButtonLoader(true);
    confirmOtp(otp)
      .then((res) => {
        if (res.data.success === true) {
          handleModal("login");
          setButtonLoader(false);
        } else {
          alert(res.data.message);
          setButtonLoader(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setButtonLoader(false);
      });
  };

  const handleModal = (type) => {
    setModaltype(type);
    setToggleModal(true);
  };
  return (
    <div style={{ margin: 20 }}>
      <Typography style={{ fontSize: "2rem" }}>
        <img className={classes.logo} src={logo} />
        Online Application Portal
      </Typography>
      <div style={{ padding: "1rem 0 0 0" }}>
        {isLoader ? (
          <Loader paddingTop={"8rem"} paddingLeft={"40rem"}></Loader>
        ) : (
          <>
            <div style={{ padding: "0 0 1rem 0" }}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => handleModal("login")}
              >
                <b>Login</b>
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => handleModal("signup")}
              >
                <b>Signup</b>
              </Button>
              <Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Admission Details
              </Typography>
            </div>
            <MakeTable
              tableCellHeight={"0.2rem"}
              style={{ height: "15rem" }}
              columns={columns}
              data={grades}
            />
            <div style={{ marginRight: "30vw" }}>
              <hr></hr>
              <Typography style={{ fontSize: "1rem", padding: "0.5rem" }}>
                Admission Criteria, Eligibility & Fee Breakup
              </Typography>
              <hr></hr>
              <div className={classes.dropDownDiv}>
                <DropDown
                  data={gradeList}
                  width={"30%"}
                  placeholderFontSize={"0.8rem"}
                  placeholderMarginTop={"-0.5rem"}
                  selectHeight={"2rem"}
                  placeholder="SELECT GRADE"
                  defaultVal //pass this to set first value of the data as default val
                  selected={(e) => {
                    setDropdownGrade(e);
                    handleGradeDropDownChange(e);
                  }}
                ></DropDown>
              </div>
              {dropdownGrade ? (
                <div>
                  <Grid container direction="row" spacing={8}>
                    <Grid item xs={6}>
                      <Typography style={{ fontSize: "0.8rem" }}>
                        Eligibility(Age Criteria)
                      </Typography>
                      <Typography
                        style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                      >
                        {ageCriteria}
                      </Typography>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography
                            style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                          >
                            Total Seats
                          </Typography>
                          <Typography
                            style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                          >
                            {totalSeat}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {" "}
                          <Typography
                            style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                          >
                            Student-Teacher Ratio
                          </Typography>
                          <Typography
                            style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                          >
                            {studentTeacherRatio?.replace("/", ":")}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                      >
                        Mode of Selection
                      </Typography>
                      {modelSelection?.map((val) => (
                        <Typography
                          style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                        >
                          {val.desc}
                        </Typography>
                      ))}
                      <Typography
                        style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                      >
                        Documents required at the time of application/admission
                      </Typography>
                      {documentRequired?.map((val) => (
                        <>
                          <Checkbox
                            style={{ padding: 0 }}
                            checked
                            disabled
                            size="small"
                          ></Checkbox>{" "}
                          <span
                            style={{ fontSize: "0.8rem", fontWeight: "bold" }}
                          >
                            {val.desc}
                          </span>
                        </>
                      ))}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                      >
                        Fee Details for <b>{selectedDropdownGradeName}</b>
                      </Typography>
                      <MakeTable
                        tableCellHeight={"0rem"}
                        columns={FeeDetailsColumns}
                        data={gradeFeeDetais}
                      ></MakeTable>
                      <Typography
                        style={{
                          fontSize: "0.8rem",
                          paddingTop: "20px",
                          color: "#0562C1",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        Total Cost for a new admission
                      </Typography>
                      <Typography
                        style={{
                          textAlign: "right",
                        }}
                      >
                        <b
                          style={{
                            fontSize: "1.5rem",
                            color: "#0562C1",
                            fontWeight: "bold",
                          }}
                        >
                          ₹{totalFee}
                        </b>{" "}
                        <b
                          style={{
                            fontSize: "0.8rem",
                            color: "#0562C1",
                            fontWeight: "bold",
                          }}
                        >
                          for first year.
                        </b>
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
      <MakeModal
        onClose={() => setToggleModal(false)}
        toggleModal={toggleModal}
      >
        <div>
          <img className={classes.icon} src={icon} />
          {modaltype === "signup" && (
            <div>
              <Typography className={classes.titleModalText}>
                CREATE YOUR ACCOUNT
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Name"
                onChange={(e) =>
                  setSignup({ ...signup, displayName: e.target.value })
                }
                className={classes.form}
              />
              <TextField
                variant="outlined"
                placeholder="Phone"
                onChange={(e) =>
                  setSignup({ ...signup, phone: e.target.value })
                }
                className={classes.form}
              />
              <TextField
                variant="outlined"
                placeholder="Email"
                onChange={(e) =>
                  setSignup({ ...signup, email: e.target.value })
                }
                className={classes.form}
              />
              <TextField
                variant="outlined"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setSignup({ ...signup, password: e.target.value })
                }
                className={classes.form}
              />
              <TextField
                variant="outlined"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setSignup({ ...signup, confirm: e.target.value })
                }
                className={classes.form}
              />
              <div style={{ margin: "1rem 5rem" }}>
                <Button
                  fullWidth
                  className={classes.modalButton}
                  onClick={handleSignup}
                  disabled={signup.password !== signup.confirm || buttonLoader}
                >
                  {buttonLoader ? (
                    <i
                      class="fa fa-refresh fa-spin"
                      style={{
                        marginLeft: "-10px",
                        marginRight: "8px",
                        fontSize: "20px",
                      }}
                    ></i>
                  ) : (
                    "SIGN UP"
                  )}
                </Button>
              </div>
              <div style={{ margin: "1rem 0" }}>
                <Typography className={classes.bottomModalText}>
                  Already have an account?&nbsp;
                  <b
                    onClick={() => handleModal("login")}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </b>
                </Typography>{" "}
              </div>
            </div>
          )}
          {modaltype === "otp" && (
            <div>
              <Typography className={classes.titleModalText}>
                PROFILE VERIFICATION
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter OTP sent to email"
                onChange={(e) => setOtp({ ...otp, emailOtp: e.target.value })}
                className={classes.form}
              />
              <TextField
                variant="outlined"
                placeholder="Enter OTP sent to phone"
                onChange={(e) => setOtp({ ...otp, phoneOtp: e.target.value })}
                className={classes.form}
              />
              <div style={{ margin: "1rem 5rem" }}>
                <Button
                  fullWidth
                  className={classes.modalButton}
                  onClick={handleOtp}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? (
                    <i
                      class="fa fa-refresh fa-spin"
                      style={{
                        marginLeft: "-10px",
                        marginRight: "8px",
                        fontSize: "20px",
                      }}
                    ></i>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
              <div style={{ margin: "1rem 0" }}>
                <Typography className={classes.bottomModalText}>
                  Edit phone or email?&nbsp;
                  <b
                    onClick={() => handleModal("signup")}
                    style={{ cursor: "pointer" }}
                  >
                    Signup
                  </b>
                </Typography>{" "}
              </div>
            </div>
          )}
          {modaltype === "login" && (
            <div>
              <Typography className={classes.titleModalText}>
                WELCOME BACK{" "}
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Email"
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                className={classes.form}
              />
              <TextField
                variant="outlined"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                className={classes.form}
              />
              <div style={{ margin: "1rem 5rem" }}>
                <Button
                  fullWidth
                  className={classes.modalButton}
                  onClick={handleLogin}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? (
                    <i
                      class="fa fa-refresh fa-spin"
                      style={{
                        marginLeft: "-10px",
                        marginRight: "8px",
                        fontSize: "20px",
                      }}
                    ></i>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
              <div style={{ margin: "1rem 0" }}>
                <Typography
                  className={classes.bottomModalText}
                  onClick={() => handleModal("forgotPassword")}
                  style={{ cursor: "pointer" }}
                >
                  <b>Forgot your password?</b>
                </Typography>
                <Typography className={classes.bottomModalText}>
                  New in this site?&nbsp;
                  <b
                    onClick={() => handleModal("signup")}
                    style={{ cursor: "pointer" }}
                  >
                    Create New Account
                  </b>
                </Typography>{" "}
              </div>
            </div>
          )}
          {modaltype === "forgotPassword" && (
            <div>
              <Typography className={classes.titleModalText}>
                WELCOME BACK{" "}
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Account email address"
                onChange={(e) => setForgotPassword(e.target.value)}
                className={classes.form}
              />
              <div style={{ margin: "1rem 5rem" }}>
                <Button
                  fullWidth
                  className={classes.modalButton}
                  onClick={handleForgotPassword}
                  disabled={buttonLoader}
                >
                  {buttonLoader ? (
                    <i
                      class="fa fa-refresh fa-spin"
                      style={{
                        marginLeft: "-10px",
                        marginRight: "8px",
                        fontSize: "20px",
                      }}
                    ></i>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
              <div style={{ margin: "1rem 0" }}>
                <Typography className={classes.bottomModalText}>
                  <b
                    onClick={() => handleModal("login")}
                    style={{ cursor: "pointer" }}
                  >
                    Get back to Login
                  </b>
                </Typography>{" "}
              </div>
            </div>
          )}
        </div>
      </MakeModal>
    </div>
  );
};

export default OnlineApplication;
