import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

import { HomeRouter } from "./Components/Home/HomeRouter";
import { AuthenticationRouter, superRouter, TestRouter, TrainRouter } from "./Components/Test/TestRouter"
import { SigninRouter, SignupRouter, CheckItemsRouter } from "./Components/Login/LoginRouter";
import "./CSS/App.css";
import SettingsRouter from "./Components/Settings/SettingsRouter";
import SupervisorRouter from "./Components/Supervisor/SupervisorRoute";

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
          <PrivateRoute path="/video" exact={true} component={SupervisorRouter} />
          <PrivateRoute path="/video2" exact={true} component={superRouter} />
          <PrivateRoute path="/authentication" component={AuthenticationRouter} />
          <PrivateRoute path="/settings" component={SettingsRouter} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
