import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TestRouter } from "./Components/Test/TestRouter"
import Navbar from "./Components/Navbar/Navbar";
import { SigninRouter, SignupRouter } from "./Components/Login/LoginRouter";
import "./CSS/App.css";
function App(): any {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={SigninRouter} />
          <Route path="/register" component={SignupRouter} />
          <Route path="/test" exact={true} component={TestRouter} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
