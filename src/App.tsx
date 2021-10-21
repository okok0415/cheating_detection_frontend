import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

import { HomeRouter } from "./Components/Home/HomeRouter";
import { CalibrateRouter, SupervisorRouter, TestRouter, TrainRouter } from "./Components/Test/TestRouter"
import { SigninRouter, SignupRouter } from "./Components/Login/LoginRouter";
import "./CSS/App.css";

function App(): any {

  return (
    <>

      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact={true} component={HomeRouter} />
          <PublicRoute path="/login" restricted={false} component={SigninRouter} />
          <PublicRoute path="/register" restrited={false} component={SignupRouter} />
          <PrivateRoute path="/test" component={TestRouter} />
          <PrivateRoute path="/train" component={TrainRouter} />
          <PrivateRoute path="/webcam" component={SupervisorRouter} />
          <PrivateRoute path="/calibrate" component={CalibrateRouter} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
