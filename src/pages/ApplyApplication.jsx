import React, { useEffect, useState } from "react";
import DropDown from "../components/common/DropDown";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  getUserDetails,
  viewAllStudentsForProfile,
  viewStudentDetails,
} from "../api/api";
import { useHistory } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
const useStyles = makeStyles({
  titleText: {
    color: "red",
    textAlign: "center",
    padding: "0 0",
    margin: "0 0",
  },
  subText: {
    color: "red",
    padding: "0.8rem 0",
    fontSize: "1.2rem",
  },
  addButton: {
    float: "right",
    fontSize: "0.9rem",
    backgroundColor: "red",
    color: "#fff",
    "&:hover": {
      backgroundColor: "red",
      color: "#847473",
    },
    "&:disabled": {
      backgroundColor: "#D7D7D7",
    },
  },
  modalParentDiv: {
    padding: "1rem",
  },
  modalChildDiv: {},
  ModalTitleDiv: {
    padding: "1rem 0",
  },
  modalTitle: {
    color: "red",
    fontWeight: "bolder",
    fontSize: "1.5rem",
  },
  modalSubTitle: {
    color: "black",
  },
  buttonDiv: {
    padding: "1rem 0 ",
  },
  confirmButton: {
    float: "right",
    fontSize: "0.9rem",
    padding: "0.5rem 10%",
    width: "20%",
    backgroundColor: "#837472",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#837472",
      color: "#fff",
    },
    "&:disabled": {
      backgroundColor: "#D7D7D7",
    },
  },
  closeButton: {
    float: "left",
    fontSize: "0.9rem",
    backgroundColor: "red",
    width: "20%",
    color: "#fff",
    padding: "0.5rem 10%",
    "&:hover": {
      backgroundColor: "red",
      color: "#fff",
    },
    "&:disabled": {
      backgroundColor: "#D7D7D7",
    },
  },
  largeCloseButton: {
    fontSize: "0.9rem",
    backgroundColor: "red",
    width: "100%",
    color: "#fff",
    padding: "0.5rem 10%",
    "&:hover": {
      backgroundColor: "red",
      color: "#fff",
    },
    "&:disabled": {
      backgroundColor: "#D7D7D7",
    },
  },
  textfield: {
    margin: "4px 0",
  },
  rowDiv: {
    margin: "4px 0",
  },
  icon: {
    cursor: "pointer",
    "&:hover": {
      color: "#847473",
    },
  },
});

const ApplyApplication = () => {
  const classes = useStyles();
  const history = useHistory();
  const studentInitialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    aadharNumber: "",
    gender: "",
    bloodGroup: "",
    religion: "",
    motherTongue: "",
    minority: "",
    nationality: "",
    category: "",
  };
  const [selectedStudentName, setSelectedStudentName] = useState();
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("academicYear")
  );
  const [studentClass, setStudentClass] = useState();
  const [staem, setSteam] = useState();
  const [studentData, setStudentData] = useState(studentInitialState);
  const [studentList, setStudentList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [studentDropdownList, setStudentDropdownList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [page, setPage] = useState(1);

  const [permanentAddress, setPermanentAddress] = useState({houseNo: '', addrLine01: '', addrLine02: '', city: '', state: '', pin: ''});
  const [correspondenceAddress, setCorrespondenceAddress] = useState({houseNo: '', addrLine01: '', addrLine02: '', city: '', state: '', pin: ''});


  const [father, setFather] = useState({firstName: '', middleName: '', lastName: '', occupation: '', income: '', email: '', mobile: '', adhar: ''});
  const [mother, setMother] = useState({firstName: '', middleName: '', lastName: '', occupation: '', income: '', email: '', mobile: '', adhar: ''});
  const [guardian, setGuardian] = useState({firstName: '', middleName: '', lastName: '', occupation: '', income: '', email: '', mobile: '', adhar: ''});

  const [preAcademic, setPreAcademic] = useState({schoolName: '', schoolAddr: '', board: '', year: '', cgpa: ''});

  const studentKeys = [
    'First Name',
    'Middle Name',
    'Last Name',
    'Email',
    'Phone',
    'Date of Birth',
    'Aadhar Number',
    'Gender',
    'Blood Group',
    'Religion',
    'Mother Tongue',
    'Minority',
    'Nationality',
    'Category'];
  
  const guardianKeys = ['First Name', 'Middle Name', 'Last Name', 'Occupation', 'Income', 'Email', 'Phone', 'Aadhar Number'];
  const preAcademicKeys = ['School Name', 'School Address', 'Board', 'Passing year', 'CGPA']
  const addressKeys = ['House No.', 'Address line 1', 'Address line 2', 'City', 'State', 'Pin']
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    setIsLoading(true);
    getUserDetails(localStorage.getItem("token"))
      .then((res) => {
        console.log(res.data.data.user_id)
        getStudentData(res.data.data.user_id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        history.push("/online-application");
        console.log(err);
        setIsLoading(false);
      });
  };

  const getStudentData = (userId) => {
    setIsLoading(true);
    viewAllStudentsForProfile(userId)
      .then((res) => {
        if (res.data.code === 200) {
          var list = [];
          var dropdownList = [];
          res.data.data.Students.map((item) => {
            item.id = item.StudentID;
            item.ProfileType = "Student";
            list.push(item);
            dropdownList.push({ title: item.Name, value: item.id });
          });
          list.sort(function (a, b) {
            return b.id - a.id;
          });
          setStudentList(list);
          setStudentDropdownList(dropdownList);
          setIsLoading(false);
        } else {
          var list = [];
          setStudentList(list);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  };

  const handleSelecetedStudent = (e) => {
    viewStudentDetails(e)
      .then((res) => {
        if (res.data.code === 200) {
          var data = res.data.data;
          setStudentData({
            firstName: data?.FirstName,
            middleName: data?.MiddleName,
            lastName: data?.LastName,
            email: data?.eMail,
            phone: data?.Phone,
            dob: data?.BirthDate,
            aadharNumber: data?.AadharNbr,
            gender: data?.Gender,
            bloodGroup: data?.BloodType,
            religion: data?.Religion,
            motherTongue: data?.MotherTongue,
            minority: data?.Minority,
            nationality: data?.Nationality,
            category: data?.Category,
          });
          setIsFetched(true);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        style={{
          height: "39rem",
        }}
      >
        <Typography
          style={{ fontSize: "1.3rem" }}
          className={classes.titleText}
        >
          <b>Application Form</b>
        </Typography>
        {page === 1 ? (
          <div>
            <div style={{ width: "100%" }}>
              <Typography className={classes.subText}>
                <b>Student Details</b>
              </Typography>
            </div>

            <div className={classes.rowDiv}>
              <TextField
                style={{ width: "30%", marginRight: "0.2rem" }}
                id="outlined-basic"
                size="small"
                variant="outlined"
                label="Academic Year"
                value={academicYear}
                inputProps={{ readOnly: true }}
              />
              {!!studentDropdownList.length && (
                <DropDown
                  data={studentDropdownList}
                  placeholder="Student Name"
                  width={"30%"}
                  placeholderFontSize={"0.8rem"}
                  placeholderMarginTop={"-0.5rem"}
                  selectHeight={"2.5rem"}
                  selected={(e) => {
                    console.log('ereerer',e )
                    handleSelecetedStudent(e);
                    setSelectedStudentName(e);
                  }}
                />
              )}
            </div>
            <div className={classes.rowDiv}>
              <DropDown
                data={[
                  { title: "1", value: "1" },
                  { title: "2", value: "2" },
                  { title: "3", value: "3" },
                ]}
                placeholder="Class"
                width={"30%"}
                placeholderFontSize={"0.8rem"}
                placeholderMarginTop={"-0.5rem"}
                paddingRight={"0.2rem"}
                selectHeight={"2.5rem"}
                selected={(e) => setStudentClass(e)}
              />
              <DropDown
                data={[
                  { title: "Science", value: "science" },
                  { title: "Commerce", value: "commerce" },
                  { title: "Arts", value: "arts" },
                ]}
                placeholder="Steam/Department"
                width={"30%"}
                placeholderFontSize={"0.8rem"}
                placeholderMarginTop={"-0.5rem"}
                selectHeight={"2.5rem"}
                selected={(e) => setSteam(e)}
              />
            </div>
            {!!isFetched ? (
              <>
                <div className={classes.rowDiv}>
                  <TextField
                    style={{ width: "30%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="First Name"
                    size="small"
                    value={studentData.firstName}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <TextField
                    style={{ width: "30%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Middle Name"
                    size="small"
                    value={studentData.middleName}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        middleName: e.target.value,
                      })
                    }
                  />
                  <TextField
                    style={{ width: "30%" }}
                    id="outlined-basic"
                    variant="outlined"
                    value={studentData.lastName}
                    label="Last Name"
                    size="small"
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        middleName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.rowDiv}>
                  <TextField
                    className={classes.textfield}
                    style={{ width: "30%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Email"
                    size="small"
                    value={studentData.email}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        email: e.target.value,
                      })
                    }
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "30%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Phone"
                    size="small"
                    value={studentData.phone}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.rowDiv}>
                  <TextField
                    style={{ width: "30%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    value={studentData.dob}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        dob: e.target.value,
                      })
                    }
                  />
                  <DropDown
                    data={[
                      { title: "Male", value: "male" },
                      { title: "Female", value: "female" },
                    ]}
                    placeholder="Gender"
                    width={"30%"}
                    placeholderFontSize={"0.8rem"}
                    placeholderMarginTop={"-0.5rem"}
                    selectHeight={"2.5rem"}
                    selected={(e) =>
                      setStudentData({
                        ...studentData,
                        gender: e,
                      })
                    }
                    defaultData={studentData.gender}
                  />
                </div>
                <div className={classes.rowDiv}>
                  <DropDown
                    data={[
                      { title: "A+", value: "A+" },
                      { title: "A-", value: "A-" },
                      { title: "B+", value: "B+" },
                      { title: "B-", value: "B-" },
                      { title: "AB+", value: "AB+" },
                      { title: "AB-", value: "AB-" },
                      { title: "O+", value: "O+" },
                      { title: "O-", value: "O-" },
                    ]}
                    size="small"
                    placeholder="Blood Group"
                    width={"30%"}
                    placeholderFontSize={"0.8rem"}
                    placeholderMarginTop={"-0.5rem"}
                    selectHeight={"2.5rem"}
                    paddingRight={"0.2rem"}
                    defaultData={studentData.bloodGroup}
                    selected={(e) =>
                      setStudentData({
                        ...studentData,
                        bloodGroup: e,
                      })
                    }
                  />
                  <DropDown
                    data={[
                      { title: "Hindu", value: "1" },
                      { title: "Muslim", value: "2" },
                      { title: "Christian", value: "3" },
                      { title: "Buddhist", value: "4" },
                      { title: "Sikh", value: "5" },
                      { title: "Jain", value: "6" },
                      { title: "Others", value: "7" },
                    ]}
                    size="small"
                    placeholder="Religion"
                    width={"30%"}
                    placeholderFontSize={"0.8rem"}
                    placeholderMarginTop={"-0.5rem"}
                    selectHeight={"2.5rem"}
                    defaultData={studentData.religion}
                    selected={(e) =>
                      setStudentData({
                        ...studentData,
                        religion: e,
                      })
                    }
                  />
                </div>
                <div className={classes.rowDiv}>
                  <DropDown
                    data={[
                      { title: "General", value: "General" },
                      { title: "SC", value: "SC" },
                      { title: "ST", value: "ST" },
                      { title: "OBC", value: "OBC" },
                      { title: "Other", value: "Other" },
                    ]}
                    size="small"
                    placeholder="Category"
                    width={"30%"}
                    paddingRight={"0.2rem"}
                    placeholderFontSize={"0.8rem"}
                    placeholderMarginTop={"-0.5rem"}
                    selectHeight={"2.5rem"}
                    defaultData={studentData.category}
                    selected={(e) =>
                      setStudentData({
                        ...studentData,
                        category: e,
                      })
                    }
                  />
                  <DropDown
                    data={[
                      { title: "Yes", value: "1" },
                      { title: "No", value: "0" },
                    ]}
                    size="small"
                    placeholder="Minority"
                    width={"30%"}
                    placeholderFontSize={"0.8rem"}
                    placeholderMarginTop={"-0.5rem"}
                    selectHeight={"2.5rem"}
                    defaultData={studentData.minority}
                    selected={(e) =>
                      setStudentData({
                        ...studentData,
                        minority: e,
                      })
                    }
                  />
                </div>
                <div className={classes.rowDiv}>
                  <DropDown
                    data={[
                      { title: "English", value: "1" },
                      { title: "Hindi", value: "2" },
                      { title: "Bengali", value: "3" },
                      { title: "Marathi", value: "4" },
                      { title: "Telugu", value: "5" },
                      { title: "Tamil", value: "6" },
                      { title: "Gujarati", value: "7" },
                      { title: "Urdu", value: "8" },
                      { title: "Kannada", value: "9" },
                      { title: "Odia", value: "10" },
                      { title: "Malayalam", value: "11" },
                      { title: "Punjabi", value: "12" },
                      { title: "Assamese", value: "13" },
                      { title: "Maithili", value: "14" },
                      { title: "Sanskrit", value: "15" },
                    ]}
                    size="small"
                    placeholder="Mother Tongue"
                    width={"30%"}
                    paddingRight={"0.2rem"}
                    placeholderFontSize={"0.8rem"}
                    placeholderMarginTop={"-0.5rem"}
                    selectHeight={"2.5rem"}
                    defaultData={studentData.motherTongue}
                    selected={(e) =>
                      setStudentData({
                        ...studentData,
                        motherTongue: e,
                      })
                    }
                  />
                  <DropDown
                    data={[
                      { title: "Indian", value: "1" },
                      { title: "Bangladeshi", value: "2" },
                      { title: "Japanese", value: "3" },
                      { title: "Kuwaiti", value: "4" },
                    ]}
                    placeholder="Nationality"
                    width={"30%"}
                    placeholderFontSize={"0.8rem"}
                    placeholderMarginTop={"-0.5rem"}
                    selectHeight={"2.5rem"}
                    size="small"
                    defaultData={studentData.nationality}
                    selected={(e) =>
                      setStudentData({
                        ...studentData,
                        nationality: e,
                      })
                    }
                  />
                </div>
                <div className={classes.rowDiv}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Aadhar Number"
                    size="small"
                    style={{ width: "60%" }}
                    defaultData={studentData.aadharNumber}
                    selected={(e) =>
                      setStudentData({
                        ...studentData,
                        aadharNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.buttonDiv}>
                  <Button
                    variant="contained"
                    className={classes.confirmButton}
                    disabled={buttonLoader}
                    onClick={() => {
                      setPage(2);
                    }}
                  >
                    Next
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.closeButton}
                    disabled
                  >
                    Back
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        ) : page === 2 ? (
          <div>
            <Grid
              container
              direction="row"
              style={{ marginTop: "5rem", marginBottom: "4rem" }}
            >
              <Grid item xs={4}>
                <div>
                  <Typography style={{ color: "red" }}>
                    <b>Permanent Address</b>
                  </Typography>
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="House No."
                    size="small"
                    value={permanentAddress.houseNo}
                    onChange={(e) => setPermanentAddress({...permanentAddress, houseNo: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Address Line 01"
                    size="small"
                    value={permanentAddress.addrLine01}
                    onChange={(e) => setPermanentAddress({...permanentAddress, addrLine01: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Address Line 02"
                    size="small"
                    value={permanentAddress.addrLine02}
                    onChange={(e) => setPermanentAddress({...permanentAddress, addrLine02: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="City"
                    size="small"
                    value={permanentAddress.city}
                    onChange={(e) => setPermanentAddress({...permanentAddress, city: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="State"
                    size="small"
                    value={permanentAddress.state}
                    onChange={(e) => setPermanentAddress({...permanentAddress, state: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Pin Code"
                    size="small"
                    value={permanentAddress.pin}
                    onChange={(e) => setPermanentAddress({...permanentAddress, pin: e.target.value})}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Typography style={{ color: "red" }}>
                    <b>Coorespondence Address</b>
                  </Typography>
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="House No."
                    size="small"
                    value={correspondenceAddress.houseNo}
                    onChange={(e) => setCorrespondenceAddress({...correspondenceAddress, houseNo: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Address Line 01"
                    size="small"
                    value={correspondenceAddress.addrLine01}
                    onChange={(e) => setCorrespondenceAddress({...correspondenceAddress, addrLine01: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Address Line 02"
                    size="small"
                    value={correspondenceAddress.addrLine02}
                    onChange={(e) => setCorrespondenceAddress({...correspondenceAddress, addrLine02: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="City"
                    size="small"
                    value={correspondenceAddress.city}
                    onChange={(e) => setCorrespondenceAddress({...correspondenceAddress, city: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="State"
                    size="small"
                    value={correspondenceAddress.state}
                    onChange={(e) => setCorrespondenceAddress({...correspondenceAddress, state: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Pin Code"
                    size="small"
                    value={correspondenceAddress.pin}
                    onChange={(e) => setCorrespondenceAddress({...correspondenceAddress, pin: e.target.value})}
                  />
                </div>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button
                variant="contained"
                className={classes.confirmButton}
                disabled={buttonLoader}
                onClick={() => {
                  setPage(3);
                }}
              >
                Next
              </Button>
              <Button
                variant="contained"
                className={classes.closeButton}
                onClick={() => {
                  setPage(1);
                }}
              >
                Back
              </Button>
            </div>
          </div>
        ) : page === 3 ? (
          <>
            <Grid container direction="row" style={{ marginTop: "2rem" }}>
              <Grid item xs={4}>
                <div>
                  <Typography style={{ color: "red" }}>
                    <b>Father's Details</b>
                  </Typography>
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="First Name"
                    size="small"
                    value={father.firstName}
                    onChange={(e) => setFather({...father, firstName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Middle Name"
                    size="small"
                    value={father.middleName}
                    onChange={(e) => setFather({...father, middleName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Last Name"
                    size="small"
                    value={father.lastName}
                    onChange={(e) => setFather({...father, lastName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Occoupation"
                    size="small"
                    value={father.occupation}
                    onChange={(e) => setFather({...father, occupation: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Annual Income"
                    size="small"
                    value={father.income}
                    onChange={(e) => setFather({...father, income: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Email ID"
                    size="small"
                    value={father.email}
                    onChange={(e) => setFather({...father, email: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Mobile"
                    size="small"
                    value={father.mobile}
                    onChange={(e) => setFather({...father, mobile: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Aadhar Number"
                    size="small"
                    value={father.adhar}
                    onChange={(e) => setFather({...father, adhar: e.target.value})}
                  />
                  <span>Upload Aadhar:{"  "}</span>
                  <input
                    type="file"
                    id="myFile"
                    name="file"
                    accept="image/*"
                    //   onChange={onFileInputAadharChange}
                  />
                  <br></br>
                  <span>Upload Photo:{"  "}</span>
                  <input
                    type="file"
                    id="myFile"
                    name="file"
                    accept="image/*"
                    //   onChange={onFileInputImageChange}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Typography style={{ color: "red" }}>
                    <b>Mother's Details</b>
                  </Typography>
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="First Name"
                    size="small"
                    value={mother.firstName}
                    onChange={(e) => setMother({...mother, firstName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Middle Name"
                    size="small"
                    value={mother.middleName}
                    onChange={(e) => setMother({...mother, middleName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Last Name"
                    size="small"
                    value={mother.lastName}
                    onChange={(e) => setMother({...mother, lastName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Occoupation"
                    size="small"
                    value={mother.occupation}
                    onChange={(e) => setMother({...mother, occupation: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Annual Income"
                    size="small"
                    value={mother.income}
                    onChange={(e) => setMother({...mother, income: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Email ID"
                    size="small"
                    value={mother.email}
                    onChange={(e) => setMother({...mother, email: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Mobile"
                    size="small"
                    value={mother.mobile}
                    onChange={(e) => setMother({...mother, mobile: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Aadhar Number"
                    size="small"
                    value={mother.adhar}
                    onChange={(e) => setMother({...mother, adhar: e.target.value})}
                  />
                  <span>Upload Aadhar:{"  "}</span>
                  <input
                    type="file"
                    id="myFile"
                    name="file"
                    accept="image/*"
                    //   onChange={onFileInputAadharChange}
                  />
                  <br></br>
                  <span>Upload Photo:{"  "}</span>
                  <input
                    type="file"
                    id="myFile"
                    name="file"
                    accept="image/*"
                    //   onChange={onFileInputImageChange}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Typography style={{ color: "red" }}>
                    <b>Gurdian's Details</b>
                  </Typography>
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="First Name"
                    size="small"
                    value={guardian.firstName}
                    onChange={(e) => setGuardian({...guardian, firstName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Middle Name"
                    size="small"
                    value={guardian.middleName}
                    onChange={(e) => setGuardian({...guardian, middleName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Last Name"
                    size="small"
                    value={guardian.lastName}
                    onChange={(e) => setGuardian({...guardian, lastName: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Occoupation"
                    size="small"
                    value={guardian.occupation}
                    onChange={(e) => setGuardian({...guardian, occupation: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Annual Income"
                    size="small"
                    value={guardian.income}
                    onChange={(e) => setGuardian({...guardian, income: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Email ID"
                    size="small"
                    value={guardian.email}
                    onChange={(e) => setGuardian({...guardian, email: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Mobile"
                    size="small"
                    value={guardian.mobile}
                    onChange={(e) => setGuardian({...guardian, mobile: e.target.value})}
                  />
                  <TextField
                    className={classes.textfield}
                    style={{ width: "90%", paddingRight: "0.2rem" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Aadhar Number"
                    size="small"
                    value={guardian.adhar}
                    onChange={(e) => setGuardian({...guardian, adhar: e.target.value})}
                  />
                  <span>Upload Aadhar:{"  "}</span>
                  <input
                    type="file"
                    id="myFile"
                    name="file"
                    accept="image/*"
                    //   onChange={onFileInputAadharChange}
                  />
                  <br></br>
                  <span>Upload Photo:{"  "}</span>
                  <input
                    type="file"
                    id="myFile"
                    name="file"
                    accept="image/*"
                    //   onChange={onFileInputImageChange}
                  />
                </div>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button
                variant="contained"
                className={classes.confirmButton}
                disabled={buttonLoader}
                onClick={() => {
                  setPage(4);
                }}
              >
                Next
              </Button>
              <Button
                variant="contained"
                className={classes.closeButton}
                onClick={() => {
                  setPage(2);
                }}
              >
                Back
              </Button>
            </div>
          </>
        ) : page === 4 ? (
          <>
            <div style={{ marginTop: "4rem" }}>
              <Typography style={{ color: "red" }}>
                <b>Previous Academic Details</b>
              </Typography>
              <TextField
                className={classes.textfield}
                style={{ width: "90%", paddingRight: "0.2rem" }}
                id="outlined-basic"
                variant="outlined"
                label="Previous School Name"
                size="small"
                value={preAcademic.schoolName}
                onChange={(e) => setPreAcademic({...preAcademic, schoolName: e.target.value})}
              />
              <TextField
                className={classes.textfield}
                style={{ width: "90%", paddingRight: "0.2rem" }}
                id="outlined-basic"
                variant="outlined"
                label="School Address"
                size="small"
                value={preAcademic.schoolAddr}
                onChange={(e) => setPreAcademic({...preAcademic, schoolAddr: e.target.value})}
              />
              <TextField
                className={classes.textfield}
                style={{ width: "90%", paddingRight: "0.2rem" }}
                id="outlined-basic"
                variant="outlined"
                label="Previous School Board"
                size="small"
                value={preAcademic.board}
                onChange={(e) => setPreAcademic({...preAcademic, board: e.target.value})}
              />
              <TextField
                className={classes.textfield}
                style={{ width: "90%", paddingRight: "0.2rem" }}
                id="outlined-basic"
                variant="outlined"
                label="Year of Passing"
                size="small"
                value={preAcademic.year}
                onChange={(e) => setPreAcademic({...preAcademic, year: e.target.value})}
              />
              <TextField
                className={classes.textfield}
                style={{ width: "90%", paddingRight: "0.2rem" }}
                id="outlined-basic"
                variant="outlined"
                label="CGPA"
                size="small"
                value={preAcademic.cgpa}
                onChange={(e) => setPreAcademic({...preAcademic, cgpa: e.target.value})}
              />
              <br></br>
              <br></br>
              <span>Upload Report Card/ Marksheet:{"  "}</span>
              <input
                type="file"
                id="myFile"
                name="file"
                accept="image/*"
                //   onChange={onFileInputAadharChange}
              />
              <br></br>
              <br></br>
              <span>Upload Marksheet:{"  "}</span>
              <input
                type="file"
                id="myFile"
                name="file"
                accept="image/*"
                //   onChange={onFileInputAadharChange}
              />
              <br></br>
              <br></br>
              <span>Upload Transfer Certificate:{"  "}</span>
              <input
                type="file"
                id="myFile"
                name="file"
                accept="image/*"
                //   onChange={onFileInputImageChange}
              />
              <br></br>
              <br></br>
            </div>
            <div className={classes.buttonDiv}>
              <Button
                variant="contained"
                className={classes.confirmButton}
                disabled={buttonLoader}
                onClick={() => {
                  setPage(5);
                }}
              >
                Next
              </Button>
              <Button
                variant="contained"
                className={classes.closeButton}
                onClick={() => {
                  setPage(3);
                }}
              >
                Back
              </Button>
            </div>
          </>
        ) : page === 5 ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div>
                  <div>
                    <h1 style={{ display: 'flex' }}>Student's details<div onClick={() => setPage(1)}><EditOutlinedIcon/></div></h1>
                    {Object.keys(studentData).map((item, index) => (
                      <div>
                        <b>{studentKeys[index]}</b> : {studentData[item]}
                      </div>
                    ))}
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <div>
                    <h1 style={{ display: 'flex' }}>Guardian<div onClick={() => setPage(3)}><EditOutlinedIcon/></div></h1>
                    <h2>Father's Details</h2>
                    {Object.keys(father).map((item, index) => (
                      <div>
                        <b>{guardianKeys[index]}</b> : {father[item]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2>Mother's Details</h2>
                    {Object.keys(mother).map((item, index) => (
                      <div>
                        <b>{guardianKeys[index]}</b> : {mother[item]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2>Guardian's Details</h2>
                    {Object.keys(guardian).map((item, index) => (
                      <div>
                        <b>{guardianKeys[index]}</b> : {guardian[item]}
                      </div>
                    ))}
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <div>
                    <h1 style={{ display: 'flex' }}>Previous Academic Details<div onClick={() => setPage(4)}><EditOutlinedIcon/></div></h1>
                    {Object.keys(preAcademic).map((item, index) => (
                      <div>
                        <b>{preAcademicKeys[index]}</b> : {preAcademic[item]}
                      </div>
                    ))}
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <div>
                    <h1 style={{ display: 'flex' }}>Address<div onClick={() => setPage(2)}><EditOutlinedIcon/></div></h1>
                    <h2>Premanent Address</h2>
                    
                    {Object.keys(permanentAddress).map((item, index) => (
                      <div>
                        <b>{addressKeys[index]}</b> : {permanentAddress[item]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2>Correspondence Address</h2>
                    {Object.keys(correspondenceAddress).map((item, index) => (
                      <div>
                        <b>{addressKeys[index]}</b> : {correspondenceAddress[item]}
                      </div>
                    ))}
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
              <Button
                variant="contained"
                className={classes.confirmButton}
                disabled={buttonLoader}
                onClick={() => {
                  setPage(6);
                }}
              >
                Next
              </Button>
              <Button
                variant="contained"
                className={classes.closeButton}
                onClick={() => {
                  setPage(4);
                }}
              >
                Back
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={classes.buttonDiv}>
              <Button
                variant="contained"
                className={classes.confirmButton}
                disabled={buttonLoader}
                // onClick={() => {
                //   setPage(5);
                // }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                className={classes.closeButton}
                onClick={() => {
                  setPage(5);
                }}
              >
                Back
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ApplyApplication;
