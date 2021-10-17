import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";


import { HomeRouter } from "./Components/Home/HomeRouter";
import { TestRouter } from "./Components/Test/TestRouter"
import { SigninRouter, SignupRouter } from "./Components/Login/LoginRouter";
import "./CSS/App.css";
import HTML from "./Components/Test/websocket/HTML";

function App(): any {
  return (
    <>

      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact={true} component={HomeRouter} />
          <PublicRoute path="/login" restricted={false} component={SigninRouter} />
          <PublicRoute path="/register" restrited={false} component={SignupRouter} />
          <PrivateRoute path="/train" component={TestRouter} />
          <PrivateRoute path="/webcam" component={HTML} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
