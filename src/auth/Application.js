import { Route, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import Tables from "../pages/Tables";
import Billing from "../pages/Billing";
import Rtl from "../pages/Rtl";
import Profile from "../pages/Profile";
import Main from "../components/layout/Main";
import "antd/dist/antd.css";
import "../assets/styles/main.css";
import "../assets/styles/responsive.css";
import Hire from "../pages/Hire";
import Expences from "../tables/Expences";
import Salaries from "../tables/Salaries";
import PopUp from "../Modals/PopUp";
import AddProject from "../pages/AddProject";
import AddCustomer from "../pages/Forms/AddCustomer";
import UpdateCustomer from "../pages/Forms/UpdateCustomer";
import Customers from "../tables/Customers";
import Projects from "../tables/Projects";
function Application() {
  return (
    <Main>
      <Route exact path="/dashboard" component={Home} />
      <Route exact path="/tables" component={Tables} />
      <Route exact path="/billing" component={Billing} />
      <Route exact path="/rtl" component={Rtl} />
      <Route exact path="/hire" component={Hire} />
      <Route exact path="/profile" component={Profile} />
      <Redirect from="/" to="/dashboard" />

      <Route exact path="/popup" component={PopUp} />
      <Route exact path="/salaries" component={Salaries} />
      <Route exact path="/expences" component={Expences} />

      <Route exact path="/projects" component={Projects} />
      <Route exact path="/add-customer" component={AddCustomer} />
      <Route exact path="/update-customer" component={UpdateCustomer} />

      <Route exact path="/customers" component={Customers} />
      <Route exact path="/add-project" component={AddProject} />
    </Main>
  );
}
export default Application;
