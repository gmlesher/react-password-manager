// React imports
import React, { Component } from "react";
import { render } from "react-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";

// Component imports
import LoginForm from "./login_form";
import RegisterForm from "./register_form";
import Menu from "./menu";
import Accounts from "./accounts";
import Details from "./account_details";
import AddAccount from "./add_account";

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
import VerifyDeleteModal from "./verify_delete_modal";

class App extends Component {
  constructor(props) {
    super(props);
    // console.log("App - Constructor", this.props);
    this.state = {
      data: [],
      vault_name: "",
      vault_id: null,
      accounts: [],
      account_data: [],
      accountPostData: [],
      account_name: "",
      account_id: null,
      show: false,
      show_pw: false,
      generated_password: null,
      showModal: false,
      add_account_show: false,
      account_added: false,
      displayed_form: "",
      logged_in: localStorage.getItem("AccessToken") ? true : false,
      username: "",
      user_id: null,
      validated: false,

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
    var vault_id = this.state.vault_id;

    const authAxios = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: `Bearer ` + access_tkn,
      },
    });

    authAxios
      .get(`users/${user_id}/vaults/`)
      .then((response) => {
        const data = response.data;
        if (vault_id == null) {
          this.setState({
            data: data,
          });
        } else {
          for (var vault of data) {
            if (vault.id === vault_id) {
              this.setState({ data: data, accounts: vault.accounts });
            }
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.getNewToken(refresh_tkn);
          return this.fetchData();
        }
        console.log(error);
      });
  }

  postAccountData() {
    // console.log("in post account data", data);
    const apiURL = "http://localhost:8000/api/";
    var access_tkn = localStorage.getItem("AccessToken");
    var refresh_tkn = localStorage.getItem("RefreshToken");
    var decoded_refresh = jwt_decode(refresh_tkn);
    var user_id = decoded_refresh.user_id;
    var vault_id = this.state.vault_id;
    var data = this.state.accountPostData;

    const postAccountAxios = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: `Bearer ` + access_tkn,
        "Content-Type": "application/json",
      },
    });

    postAccountAxios
      .post(`users/${user_id}/vaults/${vault_id}/accounts/`, data)
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(
            "error in posting account data. bad or expired token",
            error
          );
          this.getNewToken(refresh_tkn);
          return this.postAccountData();
        }
        console.log(error);
      });
  }

  handleGeneratePassword = () => {
    const apiURL = "http://localhost:8000/api/";
    var access_tkn = localStorage.getItem("AccessToken");
    var refresh_tkn = localStorage.getItem("RefreshToken");

    const authAxios = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: `Bearer ` + access_tkn,
      },
    });

    authAxios
      .get(`gen_pw/`)
      .then((response) => {
        var gen_pw = response.data.generated_password;
        // console.log(gen_pw);
        this.setState({ generated_password: gen_pw });
        // timeout used for deleting after password value changed in account form
        setTimeout(() => {
          this.setState({ generated_password: null });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteAccountData() {
    const apiURL = "http://localhost:8000/api/";
    var access_tkn = localStorage.getItem("AccessToken");
    var refresh_tkn = localStorage.getItem("RefreshToken");
    var decoded_refresh = jwt_decode(refresh_tkn);
    var user_id = decoded_refresh.user_id;
    var vault_id = this.state.vault_id;
    var account_id = this.state.account_id;

    const deleteAccountAxios = axios.create({
      baseURL: apiURL,
      headers: {
        Authorization: `Bearer ` + access_tkn,
      },
    });

    deleteAccountAxios
      .delete(`users/${user_id}/vaults/${vault_id}/accounts/${account_id}/`)
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(
            "error in deleting account data. bad or expired token",
            error
          );
          this.getNewToken(refresh_tkn);
          return this.deleteAccountData();
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
        // console.log("New access token", response.data.access);
        localStorage.setItem("AccessToken", response.data.access);
      })
      .catch((error) => {
        // console.log(error);
        // console.log("error with refresh token");
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

  componentDidUpdate() {
    if (this.state.account_added) {
      this.setState({ account_added: false });
    }
  }

  // filter accounts based on clicked vault
  filterAccounts = (vault) => {
    const data = [...this.state.data];
    data.filter((v) => {
      if (v.id === vault.id) {
        this.setState({ accounts: v.accounts }); // sets accounts state
        this.setState({ vault_name: v.vault_name }); // sets vault_name state
        this.setState({ vault_id: v.id });
      }
    });
  };

  // sets current account data when account is clicked
  // also sets bootstrap "Offcanvas" show state to true
  handleAccountData = (e, account_id) => {
    const accounts = [...this.state.accounts];
    // if delete or edit button clicked
    if (
      e.target.name === "accountDeleteButton" ||
      e.target.name === "accountEditButton"
    ) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      accounts.filter((a) => {
        if (a.id === account_id) {
          this.setState({ account_data: a });
        }
      });
      this.setState({ show: true }); // sets show state for acct details slide over
    }
  };

  handleAccountSubmit = (e, data) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ validated: true });
    } else {
      this.setState({ accountPostData: data });
      setTimeout(() => this.postAccountData(), 500);
      this.setState({ account_added: true });
      this.handleAddAccountClose();
      setTimeout(() => this.fetchData(), 1000); // need to find a better way to
      // make sure post data goes through before fetching data again
    }
  };

  handleAddItem = () => {
    this.setState({ add_account_show: true });
  };

  handleAccountDelete = (e, account_id) => {
    this.setState({ account_id: account_id });
  };

  handleAccountVerifyDelete = () => {
    this.deleteAccountData();
    this.handleModalClose();
    // maybe need to wait until data is deleted? set timeout?
    setTimeout(() => this.fetchData(), 1000);

    // this.fetchData();
  };

  toggleShowPassword = () => {
    return this.setState((prevState) => ({
      show_pw: !prevState.show_pw,
    }));
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
      vault_id: null,
      accounts: [],
      account_data: [],
      accountPostData: [],
      account_name: "",
      account_id: null,
      show: false,
      show_pw: false,
      generated_password: null,
      add_account_show: false,
      account_added: false,
      displayed_form: "",
      logged_in: false,
      username: "",
      user_id: null,
      validated: false,
    });
  };

  // sets bootstrap "Offcanvas" show state to false
  handleClose = () => {
    this.setState({ show: false, show_pw: false });
  };

  handleAddAccountClose = () => {
    this.setState({
      add_account_show: false,
      validated: false,
      show_pw: false,
      generated_password: null,
    });
  };

  display_form = (form) => {
    this.setState({
      displayed_form: form,
    });
  };

  handleModalShow = (account_name) => {
    this.setState({ account_name: account_name });
    this.setState({ showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
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
      show_pw,
      generated_password,
      showModal,
      add_account_show,
      validated,
    } = this.state;

    // console.log(show_pw);

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
                account_name={account_name}
                vault_name={vault_name}
                onAccountSelect={this.handleAccountData}
                onAddItem={this.handleAddItem}
                onDelete={this.handleAccountDelete}
                showModal={this.handleModalShow}
              />
            </Row>
            <Details
              show={show}
              onHide={this.handleClose}
              account_name={account_name}
              account_data={account_data}
              toggleShowPassword={this.toggleShowPassword}
              show_pw={show_pw}
            />
            <AddAccount
              onAddAccountShow={add_account_show}
              onAddAccountOnHide={this.handleAddAccountClose}
              onAccountSubmit={this.handleAccountSubmit}
              validated={validated}
              show_pw={show_pw}
              toggleShowPassword={this.toggleShowPassword}
              generatePassword={this.handleGeneratePassword}
              generated_password={generated_password}
            />
            <VerifyDeleteModal
              show={showModal}
              onHide={this.handleModalClose}
              account_name={account_name}
              onVerifyDelete={this.handleAccountVerifyDelete}
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
