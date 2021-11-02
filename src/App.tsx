import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

import { HomeRouter } from "./Components/Home/HomeRouter";
import { AuthenticationRouter, StudentRouter, StudentScreenRouter, TestRouter, TrainRouter } from "./Components/Test/TestRouter"
import { SigninRouter, SignupRouter, CheckItemsRouter } from "./Components/Login/LoginRouter";
import "./CSS/App.css";
import SettingsRouter from "./Components/Settings/SettingsRouter";
import { SupervisorRouter, SupervisorScreenRouter } from "./Components/Supervisor/SupervisorRoute";

function App(): any {

  return (
    <>

      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact={true} component={HomeRouter} />
          <PublicRoute path="/login" restricted={false} component={SigninRouter} />
          <PublicRoute path="/register" restrited={false} component={SignupRouter} />
          <PublicRoute path="/checkitems" component={CheckItemsRouter} />
          <PrivateRoute path="/test" component={TestRouter} />
          <PrivateRoute path="/train" component={TrainRouter} />
          <PrivateRoute path="/supervisor/test" exact={true} component={SupervisorRouter} />
          <PrivateRoute path="/student/test" exact={true} component={StudentRouter} />
          <PrivateRoute path="/authentication" component={AuthenticationRouter} />
          <PrivateRoute path="/settings" component={SettingsRouter} />
          <PrivateRoute path="/supervisor/screen" exact={true} component={SupervisorScreenRouter} />
          <PrivateRoute path="/student/screen" exact={true} component={StudentScreenRouter} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
