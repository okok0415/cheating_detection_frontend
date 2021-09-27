import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TestRouter } from "./Test/TestRouter"
import Navbar from "./Navbar/Navbar";
import "./CSS/App.css";
function App(): any {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/test" exact={true} component={TestRouter} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
