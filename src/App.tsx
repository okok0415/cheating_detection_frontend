import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomeRouter } from "./Components/Home/HomeRouter";
import { TestRouter } from "./Components/Test/TestRouter"
import { SigninRouter, SignupRouter } from "./Components/Login/LoginRouter";
import "./CSS/App.css";
function App(): any {
  return (
    <>

      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={HomeRouter} />
          <Route path="/login" component={SigninRouter} />
          <Route path="/register" component={SignupRouter} />
          <Route path="/test" exact={true} component={TestRouter} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
