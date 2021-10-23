import axios from "axios";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
  "Content-Type": "application/json",
};

export function viewAllStudentsForProfile(UserID) {
  const data = { UserID };
  return axios.post(
    "https://www.simplifieducation.com/api/StudentModule/api_viewAllStudentsForProfile.php",
    data
  );
}

export function viewStudentDetails(StudentID) {
  const data = { StudentID };
  return axios.post(
    "https://www.simplifieducation.com/api/StudentModule/api_viewStudentDetails.php",
    data
  );
}

export function deleteStudentDetails(UserID, StudentID) {
  const data = { UserID, StudentID };
  return axios.post(
    "https://www.simplifieducation.com/api/StudentModule/api_deleteStudentDetails.php",
    data
  );
}

export function getSchoolDetails(SchoolID, SchoolName, AcademicYear) {
  const data = { SchoolID, SchoolName, AcademicYear };
  return axios.post(
    "https://www.simplifieducation.com/api/StudentModule/api_getSchoolDetails.php",
    data
  );
}

export function getApplicationsForUser(UserID) {
  const data = { UserID };
  return axios.post(
    "https://www.simplifieducation.com/api/StudentModule/api_getApplicationsForUser.php",
    data
  );
}

export function getUserDetails(token) {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.post(
    "https://www.simplifieducation.com/api/auth/getUser.php",
    {},
    config
  );
}

export function addStudentDetails({
  SchoolID,
  UserID,
  FirstName,
  MiddleName,
  LastName,
  DOB,
  eMail,
  Phone,
  Category,
  Minority,
  MotherTongue,
  Nationality,
  Gender,
  Blood,
  Religion,
  AadharNbr,
  AadharPath,
  PhotoPath,
}) {
  const data = {
    SchoolID,
    UserID,
    FirstName,
    MiddleName,
    LastName,
    DOB,
    eMail,
    Phone,
    Category,
    Minority,
    MotherTongue,
    Nationality,
    Gender,
    Blood,
    Religion,
    AadharNbr,
    AadharPath,
    PhotoPath,
  };
  return axios.post(
    "https://www.simplifieducation.com/api/StudentModule/api_addStudentDetails.php",
    data
  );
}

export function register({
  displayName,
  email,
  password,
  phone,
  type,
  school,
}) {
  const data = {
    Name: displayName,
    eMail: email,
    Password: password,
    Phone: parseInt(phone),
    Type: type,
    School: school,
  };
  return axios.post(
    "https://www.simplifieducation.com/api/auth/signup.php",
    data
  );
}

export function confirmOtp({ phoneOtp, emailOtp, userId }) {
  const data = { OTPphone: phoneOtp, OTPMail: emailOtp, UserID: userId };
  console.log(data);
  return axios.post(
    "https://www.simplifieducation.com/api/auth/confirm_otp.php",
    data
  );
}

export function loginUser({ email, password }) {
  const data = { eMail: email, Password: password };
  console.log(data);
  return axios.post(
    "https://www.simplifieducation.com/api/auth/loginUser.php",
    data
  );
}

export function logoutUser(token) {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.post(
    "https://www.simplifieducation.com/api/auth/loginUser.php",
    {},
    config
  );
}

export function forgetPassword(email) {
  return axios.post(
    "https://www.simplifieducation.com/api/auth/forgot_password.php",
    { eMail: email }
  );
}
