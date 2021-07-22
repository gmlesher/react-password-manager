// React imports
import React, { Component } from "react";
import { render } from "react-dom";

// Component imports
import LoginForm from "./login_form";
import RegisterForm from "./register_form";
import Menu from "./menu";
import Accounts from "./accounts";
import Details from "./account_details";

// Bootstrap imports
import Row from "react-bootstrap/Row";

// 3rd pary imports
import axios from "axios";
import jwt_decode from "jwt-decode";

// Unused from counters example
import Counters from "./counters";
import Nav from "react-bootstrap/Nav";
import Navbar from "./navbar";
import User from "./user";

// css
import "../../static/frontend/styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    // console.log("App - Constructor", this.props);
    this.state = {
      data: [],
      vault_name: "",
      accounts: [],
      account_data: [],
      account_name: "",
      show: false,
      displayed_form: "",
      logged_in: localStorage.getItem("AccessToken") ? true : false,
      username: "",
      user_id: null,

      counters: [
        { id: 1, value: 0 },
        { id: 2, value: 0 },
        { id: 3, value: 0 },
        { id: 4, value: 0 },
      ],
    };
  }

  // fetch api data for logged in user
  fetchData() {
    const apiURL = "http://localhost:8000/api/";
    var access_tkn = localStorage.getItem("AccessToken");
    var refresh_tkn = localStorage.getItem("RefreshToken");
    var decoded_refresh = jwt_decode(refresh_tkn);
    var user_id = decoded_refresh.user_id;

    const authAxios = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: `Bearer ` + access_tkn,
      },
    });

    authAxios
      .get(`users/${user_id}/vaults/`)
      // .get(`users/`)
      .then((response) => {
        const data = response.data;
        this.setState({
          data: data,
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.getNewToken(refresh_tkn);
          return this.fetchData();
        }
      });
  }

  // retrieves new token if access token expires
  getNewToken(refresh_tkn) {
    var refresh_API_URL = "http://localhost:8000/api/token/refresh";
    var refresh_token = refresh_tkn;

    axios
      .post(refresh_API_URL, { refresh: refresh_token })
      .then((response) => {
        console.log("New access token", response.data.access);
        localStorage.setItem("AccessToken", response.data.access);
      })
      .catch((error) => {
        console.log(error);
        console.log("error with refresh token");
        return this.handle_logout();
      });
  }

  // when component mounts, call fetchData() function
  componentDidMount() {
    // AJAX Call
    // console.log("App - Mounted");
    if (this.state.logged_in) {
      this.fetchData();
    }
  }

  // filter accounts based on clicked vault
  filterAccounts = (vault) => {
    const data = [...this.state.data];
    data.filter((v) => {
      if (v.id === vault.id) {
        this.setState({ accounts: v.accounts }); // sets accounts state
        this.setState({ vault_name: v.vault_name }); // sets vault_name state
      }
    });
  };

  // sets current account data when account is clicked
  // also sets bootstrap "Offcanvas" show state to true
  handleAccountData = (account_id) => {
    const accounts = [...this.state.accounts];
    accounts.filter((a) => {
      if (a.id === account_id) {
        this.setState({ account_data: a });
      }
    });
    this.setState({ show: true }); // sets show state for acct details slide over
  };

  handle_login = (e, data) => {
    e.preventDefault();
    axios.post("api/token/", data).then((response) => {
      localStorage.setItem("AccessToken", response.data.access);
      localStorage.setItem("RefreshToken", response.data.refresh);
      var refresh = response.data.refresh;
      var decoded_refresh = jwt_decode(refresh);
      this.setState({ user_id: decoded_refresh.user_id });
      this.setState({
        logged_in: true,
        displayed_form: "",
        username: data.username,
      });
      this.fetchData();
    });
  };

  handle_register = (e, data) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        localStorage.setItem("token", response.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: response.username,
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    this.setState({
      data: [],
      vault_name: "",
      accounts: [],
      account_data: [],
      account_name: "",
      show: false,
      logged_in: false,
      username: "",
      user_id: null,
    });
  };

  // sets bootstrap "Offcanvas" show state to false
  handleClose = () => {
    this.setState({ show: false });
  };

  display_form = (form) => {
    this.setState({
      displayed_form: form,
    });
  };

  render() {
    const {
      counters,
      data,
      vault_name,
      accounts,
      account_data,
      account_name,
      show,
    } = this.state;

    // console.log(this.state.user_id);

    return (
      <React.Fragment>
        {!this.state.logged_in ? (
          <LoginForm handle_login={this.handle_login} />
        ) : (
          <React.Fragment>
            <Row className="m-0 vh-100">
              <Menu
                vaults={data}
                onVaultSelect={this.filterAccounts}
                handle_logout={this.handle_logout}
              />
              <Accounts
                accounts={accounts}
                vault_name={vault_name}
                onAccountSelect={this.handleAccountData}
              />
            </Row>
            <Details
              show={show}
              onHide={this.handleClose}
              account_name={account_name}
              account_data={account_data}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

/* <Navbar
    className="w-100 text-dark"
    totalCounters={counters.filter((c) => c.value > 0).length}
  />
  <Counters
    counters={counters}
    onReset={this.handleReset}
    onIncrement={this.handleIncrement}
    onDelete={this.handleDelete}
  /> */

// USE AS REFERENCE FOR COUNTERS
// handleReset = () => {
//   const counters = this.state.counters.map((c) => {
//     c.value = 0;
//     return c;
//   });
//   this.setState({ counters });
// };

// handleIncrement = (counter) => {
//   const counters = [...this.state.counters];
//   const index = counters.indexOf(counter);
//   counters[index] = { ...counter };
//   counters[index].value++;
//   this.setState({ counters });
// };

// handleDelete = (counterId) => {
//   const counters = this.state.counters.filter((c) => c.id !== counterId);
//   this.setState({ counters });
// };
