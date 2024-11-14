import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/" component={Home} /> 
      </Switch>
    </Router>
  );
}

export default App;
