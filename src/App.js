import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import Wrapper from "./components/common/Wrapper";
import ManageStudent from "./pages/ManageStudents";
import MyApplications from "./pages/MyApplications";
import PersonalInfo from "./pages/PersonalInfo";
import Payments from "./pages/Payments";
import OnlineApplication from "./pages/OnlineApplication";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { getUserDetails } from "./api/api";

function App() {
  const history = useHistory();
  useEffect(() => {
    getUserDetails(localStorage.getItem("token"))
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        history.push("/online-application");
      });
  }, []);
  return (
    <Switch>
      <Route path="/online-application" component={OnlineApplication} />
      <Wrapper>
        <ProtectedRoute path="/manage-students" component={ManageStudent} />
        <ProtectedRoute path="/my-applications" component={MyApplications} />
        <ProtectedRoute path="/personal-info" component={PersonalInfo} />
        <ProtectedRoute path="/payments" component={Payments} />
      </Wrapper>
    </Switch>
  );
}
export default App;
