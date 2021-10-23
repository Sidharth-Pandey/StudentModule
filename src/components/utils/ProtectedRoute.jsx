import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";

const ProtectedRoute = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const { path, component } = props;
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      return setisLoggedIn(true);
    }
    return history.push("/online-application");
  }, [history]);

  return isLoggedIn && <Route path={path} component={component} exact />;
};

export default ProtectedRoute;
