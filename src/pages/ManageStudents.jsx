import React, { useEffect, useState } from "react";
import {
  addStudentDetails,
  deleteStudentDetails,
  getUserDetails,
  viewAllStudentsForProfile,
  viewStudentDetails,
} from "../api/api";
import MakeTable from "../components/common/MakeTable";
import MakeModal from "../components/common/MakeModal";
import DropDown from "../components/common/DropDown";
import Loader from "../components/common/Loader";
import { useHistory } from "react-router";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

const useStyles = makeStyles({
  titleText: {
    color: "red",
    float: "left",
    padding: "0.8rem 0",
    fontSize: "1.5rem",
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
    width: "49%",
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
    width: "49%",
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

export default function ManageStudents() {
  const classes = useStyles();
  const history = useHistory();
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [selectedAction, setSelectedAction] = useState();
  const [selectedImageFile, setSelectedImageFile] = useState();
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [selectedAadharFile, setSelectedAadharFile] = useState();
  const [isAadharSelected, setIsAadharSelected] = useState(false);
  const [userID, setUserID] = useState();
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState();
  const [aadharNumber, setAadharNumber] = useState();
  const [genderDropdownValue, setGenderDropdownValue] = useState();
  const [bloodGroupDropdownValue, setBloodGroupDropdownValue] = useState();
  const [religionDropdownValue, setReligionDropdownValue] = useState();
  const [motherTongueDropdownValue, setMotherTongueDropdownValue] = useState();
  const [minorityDropdownValue, setMinorityDropdownValue] = useState();
  const [nationalityDropdownValue, setNationalityDropdownValue] = useState();
  const [categoryDropdownValue, setCategoryDropdownValue] = useState();
  const [selectedStudent, setSelectedStudent] = useState();

  useEffect(() => {
    getUserInfo();
  }, []);

  const Icons = ({ id }) => {
    return (
      <div style={{ display: "flex", color: "red" }}>
        <div onClick={() => handleIconPress("show", id)}>
          <VisibilityOutlinedIcon className={classes.icon} />
        </div>
        <div onClick={() => handleIconPress("edit", id)}>
          <EditOutlinedIcon className={classes.icon} />
        </div>
        <div onClick={() => handleIconPress("clear", id)}>
          <ClearOutlinedIcon className={classes.icon} />
        </div>
      </div>
    );
  };

  const handleIconPress = (action, id) => {
    setSelectedStudent(id);
    if (action === "show") {
      getStudentDetails(action, id);
    } else if (action === "edit") {
      getStudentDetails(action, id);
    } else if (action === "clear") {
      handleDeleteStudentModal();
    }
  };

  const getStudentDetails = (action, studentId) => {
    setIsLoading(true);
    viewStudentDetails(studentId)
      .then((res) => {
        if (res.data.code === 200) {
          var data = res.data.data;
          console.log(data);
          setFirstName(data?.FirstName);
          setMiddleName(data?.MiddleName);
          setLastName(data?.LastName);
          setEmail(data?.eMail);
          setPhone(data?.Phone);
          setDob(data?.BirthDate);
          setAadharNumber(data?.AadharNbr);
          setGenderDropdownValue(data?.Gender);
          setBloodGroupDropdownValue(data?.BloodType);
          setReligionDropdownValue(data?.Religion);
          setMotherTongueDropdownValue(data?.MotherTongue);
          setMinorityDropdownValue(data?.Minority);
          setNationalityDropdownValue(data?.Nationality);
          setCategoryDropdownValue(data?.Category);
          setIsLoading(false);
        }

        if (action === "show") {
          handleViewStudentModal();
        } else if (action === "edit") {
          alert("edit operaions here for student id: " + studentId);
        } else if (action === "clear") {
          alert("clear operaions here for student id: " + studentId);
        }
      })
      .catch((err) => {
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
          res.data.data.Students.map((item) => {
            item.id = item.StudentID;
            item.ProfileType = "Student";
            item.btn = <Icons id={item.StudentID} />;
            list.push(item);
          });
          list.sort(function (a, b) {
            return b.id - a.id;
          });
          setStudentData(list);
          setIsLoading(false);
        } else {
          var list = [];
          setStudentData(list);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  };

  const getUserInfo = () => {
    setIsLoading(true);
    getUserDetails(localStorage.getItem("token"))
      .then((res) => {
        setUserID(res.data.data.user_id);
        getStudentData(res.data.data.user_id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        history.push("/online-application");
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleAddStudentModal = () => {
    setToggleModal(true);
    setSelectedAction("add");
  };

  const handleViewStudentModal = () => {
    setToggleModal(true);
    setSelectedAction("view");
  };

  const handleDeleteStudentModal = () => {
    setToggleModal(true);
    setSelectedAction("delete");
  };

  const onFileInputImageChange = (e) => {
    setSelectedImageFile(e.target.files[0]);
    setIsImageSelected(true);
  };

  const onFileInputAadharChange = (e) => {
    setSelectedAadharFile(e.target.files[0]);
    setIsAadharSelected(true);
  };

  const handleAddStudent = () => {
    setButtonLoader(true);
    addStudentDetails({
      SchoolID: 16,
      UserID: userID,
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      DOB: dob,
      eMail: email,
      Phone: phone,
      Category: categoryDropdownValue,
      Minority: minorityDropdownValue,
      MotherTongue: motherTongueDropdownValue,
      Nationality: nationalityDropdownValue,
      Gender: genderDropdownValue,
      Blood: bloodGroupDropdownValue,
      Religion: religionDropdownValue,
      AadharNbr: aadharNumber,
      AadharPath: selectedAadharFile,
      PhotoPath: selectedImageFile,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setToggleModal(false);
          getUserInfo();
          clearState();
          setButtonLoader(false);
        } else {
          console.log(res);
          getUserInfo();
          clearState();
          setToggleModal(false);
          setButtonLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        getUserInfo();
        setButtonLoader(false);
      });
  };

  const handleDeleteStudent = () => {
    setButtonLoader(true);
    deleteStudentDetails(userID, selectedStudent)
      .then((res) => {
        if (res.data.code === 200) {
          getUserInfo();
          clearState();
          setToggleModal(false);
          setButtonLoader(false);
        } else {
          console.log(res);
          getUserInfo();
          clearState();
          setToggleModal(false);
          setButtonLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        getUserInfo();
        clearState();
        setToggleModal(false);
        setButtonLoader(false);
      });
  };

  const clearState = () => {
    setSelectedAction();
    setSelectedImageFile();
    setIsImageSelected(false);
    setSelectedAadharFile();
    setIsAadharSelected(false);
    setFirstName();
    setMiddleName();
    setLastName();
    setEmail();
    setPhone();
    setDob();
    setAadharNumber();
    setGenderDropdownValue();
    setBloodGroupDropdownValue();
    setReligionDropdownValue();
    setMotherTongueDropdownValue();
    setMinorityDropdownValue();
    setNationalityDropdownValue();
    setCategoryDropdownValue();
  };

  const studentColumns = [
    { title: "Name", id: "Name" },
    { title: "Profile Type", id: "ProfileType" },
    { title: "Date of Birth", id: "DOB" },
    { title: "Adhar Number", id: "AadharNo" },
    { title: "Gender", id: "Gender" },
    { title: "", id: "btn" },
  ];

  return (
    <>
      <div>
        <Typography className={classes.titleText}>
          <b>Manage Students</b>
        </Typography>
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={handleAddStudentModal}
          disabled={toggleModal}
        >
          <b>Add Student</b>
        </Button>
        <MakeModal toggleModal={toggleModal} width={"50rem"}>
          {selectedAction === "add" && (
            <div className={classes.modalParentDiv}>
              <div className={classes.modalChildDiv}>
                <div className={classes.ModalTitleDiv}>
                  <Typography className={classes.modalTitle}>
                    {" "}
                    ADD STUDENT{" "}
                  </Typography>
                </div>
                <form className={classes.root}>
                  <div className={classes.rowDiv}>
                    <TextField
                      style={{ width: "33%", paddingRight: "15px" }}
                      id="outlined-basic"
                      variant="outlined"
                      label="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                      style={{ width: "30%", paddingRight: "15px" }}
                      id="outlined-basic"
                      variant="outlined"
                      label="Middle Name"
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                    <TextField
                      style={{ width: "33%" }}
                      id="outlined-basic"
                      variant="outlined"
                      label="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className={classes.rowDiv}>
                    <TextField
                      className={classes.textfield}
                      style={{ width: "49%", paddingRight: "15px" }}
                      id="outlined-basic"
                      variant="outlined"
                      label="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      className={classes.textfield}
                      style={{ width: "49%" }}
                      id="outlined-basic"
                      variant="outlined"
                      label="Phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className={classes.rowDiv}>
                    <TextField
                      style={{ width: "49%", paddingRight: "15px" }}
                      id="outlined-basic"
                      variant="outlined"
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setDob(e.target.value)}
                    />
                    <DropDown
                      data={[
                        { title: "Male", value: "male" },
                        { title: "Female", value: "female" },
                      ]}
                      placeholder="Gender"
                      width={"49%"}
                      selected={(e) => setGenderDropdownValue(e)}
                    />
                  </div>
                  <div className={classes.rowDiv}>
                    <DropDown
                      data={[
                        { title: "A+", value: "A+" },
                        { title: "B+", value: "B+" },
                      ]}
                      placeholder="Blood Group"
                      width={"49%"}
                      paddingRight={"15px"}
                      selected={(e) => setBloodGroupDropdownValue(e)}
                    />
                    <DropDown
                      data={[
                        { title: "Hinduism", value: "1" },
                        { title: "Islam", value: "0" },
                      ]}
                      placeholder="Religion"
                      width={"49%"}
                      selected={(e) => setReligionDropdownValue(e)}
                    />
                  </div>
                  <div className={classes.rowDiv}>
                    <DropDown
                      data={[{ title: "General", value: "general" }]}
                      placeholder="Category"
                      width={"49%"}
                      paddingRight={"15px"}
                      selected={(e) => setCategoryDropdownValue(e)}
                    />
                    <DropDown
                      data={[
                        { title: "Yes", value: "1" },
                        { title: "No", value: "0" },
                      ]}
                      placeholder="Minority"
                      width={"49%"}
                      selected={(e) => setMinorityDropdownValue(e)}
                    />
                  </div>
                  <div className={classes.rowDiv}>
                    <DropDown
                      data={[
                        { title: "Hindi", value: "1" },
                        { title: "Bengali", value: "0" },
                      ]}
                      placeholder="Mother Tongue"
                      width={"49%"}
                      paddingRight={"15px"}
                      selected={(e) => setMotherTongueDropdownValue(e)}
                    />
                    <DropDown
                      data={[
                        { title: "Indian", value: "1" },
                        { title: "Pakistani", value: "0" },
                      ]}
                      placeholder="Nationality"
                      width={"49%"}
                      selected={(e) => setNationalityDropdownValue(e)}
                    />
                  </div>
                  <div className={classes.rowDiv}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      label="Aadhar Number"
                      fullWidth
                      onChange={(e) => setAadharNumber(e.target.value)}
                    />
                  </div>
                  <div className={classes.buttonDiv}>
                    <span>Upload Aadhar:{"  "}</span>
                    <input
                      type="file"
                      id="myFile"
                      name="file"
                      accept="image/*"
                      onChange={onFileInputAadharChange}
                    />
                    <span>Upload Photo:{"  "}</span>
                    <input
                      type="file"
                      id="myFile"
                      name="file"
                      accept="image/*"
                      onChange={onFileInputImageChange}
                    />
                  </div>
                </form>
                <div className={classes.buttonDiv}>
                  <Button
                    variant="contained"
                    className={classes.confirmButton}
                    disabled={
                      buttonLoader ||
                      !firstName ||
                      !lastName ||
                      !middleName ||
                      !email ||
                      !phone ||
                      !dob ||
                      !aadharNumber ||
                      !genderDropdownValue ||
                      !bloodGroupDropdownValue ||
                      !religionDropdownValue ||
                      !motherTongueDropdownValue ||
                      !minorityDropdownValue ||
                      !nationalityDropdownValue ||
                      !categoryDropdownValue
                    }
                    onClick={() => handleAddStudent()}
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
                  <Button
                    variant="contained"
                    className={classes.closeButton}
                    onClick={() => {
                      setToggleModal(false);
                      getUserInfo();
                      clearState();
                    }}
                    disabled={buttonLoader}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
          {selectedAction === "delete" && (
            <div className={classes.modalParentDiv}>
              <div className={classes.modalChildDiv}>
                <div className={classes.ModalTitleDiv}>
                  <Typography className={classes.modalTitle}>
                    {" "}
                    Are you sure you want to remove the student?{" "}
                  </Typography>
                </div>
                <div className={classes.buttonDiv}>
                  <Button
                    variant="contained"
                    className={classes.confirmButton}
                    onClick={() => handleDeleteStudent()}
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
                  <Button
                    variant="contained"
                    className={classes.closeButton}
                    onClick={() => {
                      setToggleModal(false);
                      getUserInfo();
                      setSelectedStudent();
                      clearState();
                    }}
                    disabled={buttonLoader}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
          {selectedAction === "view" && (
            <div className={classes.modalParentDiv}>
              <div className={classes.modalChildDiv}>
                <div className={classes.ModalTitleDiv}>
                  <Typography className={classes.modalTitle}>
                    {" "}
                    VIEW STUDENT DETAILS{" "}
                  </Typography>
                </div>
                {isLoading ? (
                  <Loader></Loader>
                ) : (
                  <form className={classes.root}>
                    <div className={classes.rowDiv}>
                      <TextField
                        style={{ width: "33%", paddingRight: "15px" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="First Name"
                        defaultValue={firstName}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        style={{ width: "30%", paddingRight: "15px" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Middle Name"
                        defaultValue={middleName}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        style={{ width: "33%" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Last Name"
                        defaultValue={lastName}
                        inputProps={{ readOnly: true }}
                      />
                    </div>
                    <div className={classes.rowDiv}>
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%", paddingRight: "15px" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Email"
                        defaultValue={email}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Phone"
                        defaultValue={phone}
                        inputProps={{ readOnly: true }}
                      />
                    </div>
                    <div className={classes.rowDiv}>
                      <TextField
                        style={{ width: "49%", paddingRight: "15px" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Date of Birth"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{ readOnly: true }}
                        defaultValue={dob}
                      />
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Gender"
                        defaultValue={genderDropdownValue}
                        inputProps={{ readOnly: true }}
                      />
                    </div>
                    <div className={classes.rowDiv}>
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%", paddingRight: "15px" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Blood Group"
                        defaultValue={bloodGroupDropdownValue}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Religion"
                        defaultValue={religionDropdownValue}
                        inputProps={{ readOnly: true }}
                      />
                    </div>
                    <div className={classes.rowDiv}>
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%", paddingRight: "15px" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Category"
                        defaultValue={categoryDropdownValue}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Minority"
                        defaultValue={minorityDropdownValue}
                        inputProps={{ readOnly: true }}
                      />
                    </div>
                    <div className={classes.rowDiv}>
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%", paddingRight: "15px" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Mother Tongue"
                        defaultValue={motherTongueDropdownValue}
                        inputProps={{ readOnly: true }}
                      />
                      <TextField
                        className={classes.textfield}
                        style={{ width: "49%" }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Nationality"
                        defaultValue={nationalityDropdownValue}
                        inputProps={{ readOnly: true }}
                      />
                    </div>
                    <div className={classes.rowDiv}>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Aadhar Number"
                        inputProps={{ readOnly: true }}
                        defaultValue={aadharNumber}
                        fullWidth
                        onChange={(e) => setAadharNumber(e.target.value)}
                      />
                    </div>
                  </form>
                )}
                <div className={classes.buttonDiv}>
                  <Button
                    variant="contained"
                    className={classes.largeCloseButton}
                    onClick={() => {
                      setToggleModal(false);
                      getUserInfo();
                      clearState();
                    }}
                    disabled={buttonLoader}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </MakeModal>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <MakeTable
            columns={studentColumns}
            data={studentData}
            style={{
              height: "35rem",
            }}
          />
        )}
      </div>
    </>
  );
}
