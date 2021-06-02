import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavbarMain from "./components/Navbar.js";
import Login from "./components/Login.js";
import Register from "./components/Registration.js";
import Tickets from "./components/Tickets.js";
import NewForm from "./components/NewForm.js";
import TicketView from "./components/TicketView.js";
import AllTickets from "./components/showAll.js";
import Search from "./components/Search.js";
import notFound from "./components/notFound.js";

let tid = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: "http://localhost:8000/api/v1/tickets/",
      tickets: [],
      userUrl: "http://localhost:8000/api/v1/users/",
      notesUrl: "http://localhost:8000/api/v1/notes/",
      user: "",
      session: false,
      ticket: "",
      users: "",
      redirect: "",
    };
  }

  handleAll = () => {
    this.setState({
      redirect: "/all",
    });
  };

  handleTid = () => {
    this.setState({
      ticket: "",
      redirect: "",
    });
  };

  handleTicket = () => {
    this.setState({
      redirect: "/tickets",
    });
  };

  handleNew = () => {
    this.setState({
      redirect: "/new",
    });
  };

  reroute = () => {
    setTimeout(() => {
      this.setState({
        session: false,
        user: "",
        users: "",
        redirect: "",
      });
      window.location = "/";
    }, 500);
  };

  addSess = (data) => {
    console.log(data);
    this.setState({
      session: true,
      user: data.data.id,
    });
  };

  getTickets = () => {
    fetch(`${this.state.baseURL}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          tickets: data.data,
        });
      })
      .catch((error) => console.error);
    console.log("done getting");
  };

  getSearchResults = () => {
    console.log(this.baseURL);
    fetch(`${this.state.baseURL}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          tickets: data.data,
        });
        console.log(this.state.tickets);
      });
  };

  checkSess = () => {
    fetch(`${this.state.userUrl}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.data.no_user) {
          console.log(data.data.no_user);
          console.log("no user");
        } else {
          console.log("this is data", data);
          this.setState({
            users: data.data,
            session: true,
            user: data.data.id,
          });
        }
        console.log(this.state.user);
      });
  };

  async getOneTix(event) {
    await this.setState({ ticket: parseInt(event) });
    tid = parseInt(event);
  }

  async clearSess() {
    await this.setState({ session: false, user: "" });
  }

  addTicket = (newTicket) => {
    const copyTickets = [...this.state.tickets];
    copyTickets.push(newTicket);
    this.setState({
      tickets: copyTickets,
    });
  };

  async getOneTix(event) {
    await this.setState({ ticket: parseInt(event) });
    tid = parseInt(event);
  }

  navCheck = (session) => {
    this.setState({
      session: session,
    });
  };

  componentDidMount() {
    if (this.state.session !== true) {
      this.checkSess();
    }
  }

  render() {
    return (
      <Router>
        <>
          {this.state.redirect !== "" ? (
            <Redirect to={this.state.redirect} />
          ) : null}
          {this.state.ticket !== "" ? <Redirect to="/view" /> : null}

          <NavbarMain
            handleAll={this.handleAll}
            handleTicket={this.handleTicket}
            handleNew={this.handleNew}
            navCheck={this.navCheck}
            session={this.state.session}
            reroute={this.reroute}
            checkSess={this.checkSess}
            clearSess={this.clearSess}
            userUrl={this.state.userUrl}
          />

          <Switch>
            <Route exact path="/login">
              <Login
                getTickets={this.getTickets}
                addSess={this.addSess}
                session={this.state.session}
                userUrl={this.state.userUrl}
              />
            </Route>

            <Route exact path="/register">
              {this.state.session === true ? (
                <Tickets
                  handleTid={this.handleTid}
                  auth={this.state.session}
                  handleTicket={this.handleTicket}
                  getTickets={this.getTickets}
                  tickets={this.tickets}
                  userUrl={this.userUrl}
                  addSess={this.addSess}
                  session={this.state.session}
                  baseUrl={this.state.baseURL}
                  tid={this.state.ticket}
                  userUrl={this.state.userUrl}
                  getOne={this.getOneTix.bind(this)}
                />
              ) : (
                <Register
                  handleTicket={this.handleTicket}
                  addSess={this.addSess}
                  userUrl={this.state.userUrl}
                />
              )}
            </Route>

            <Route exact path="/">
              {this.state.session === true ? (
                <Tickets
                  handleTid={this.handleTid}
                  handleTicket={this.handleTicket}
                  auth={this.state.session}
                  getTickets={this.getTickets}
                  tickets={this.tickets}
                  userUrl={this.userUrl}
                  addSess={this.addSess}
                  session={this.state.session}
                  baseUrl={this.state.baseURL}
                  tid={this.state.ticket}
                  userUrl={this.state.userUrl}
                  getOne={this.getOneTix.bind(this)}
                />
              ) : (
                <Login
                  getTickets={this.getTickets}
                  addSess={this.addSess}
                  session={this.state.session}
                  userUrl={this.state.userUrl}
                />
              )}
            </Route>

            <Route exact path="/new">
              {this.state.session === true ? (
                <NewForm
                  user={this.state.user}
                  handleTicket={this.handleTicket}
                  notesUrl={this.notesUrl}
                  addTicket={this.addTicket}
                  addSess={this.addSess}
                  session={this.state.session}
                  baseUrl={this.state.baseURL}
                  userUrl={this.state.userUrl}
                />
              ) : (
                <Login
                  getTickets={this.getTickets}
                  addSess={this.addSess}
                  session={this.state.session}
                  userUrl={this.state.userUrl}
                />
              )}
            </Route>

            <Route exact path="/tickets">
              {this.state.session === true ? (
                <Tickets
                  handleTicket={this.handleTicket}
                  handleTid={this.handleTid}
                  auth={this.state.session}
                  getTickets={this.getTickets}
                  tickets={this.tickets}
                  userUrl={this.userUrl}
                  addSess={this.addSess}
                  session={this.state.session}
                  baseUrl={this.state.baseURL}
                  tid={this.state.ticket}
                  userUrl={this.state.userUrl}
                  getOne={this.getOneTix.bind(this)}
                />
              ) : (
                <Login
                  getTickets={this.getTickets}
                  addSess={this.addSess}
                  session={this.state.session}
                  userUrl={this.state.userUrl}
                />
              )}
            </Route>

            <Route exact path="/all">
              {this.state.session === true ? (
                <AllTickets
                  handleTicket={this.handleTicket}
                  handleAll={this.handleAll}
                  handleTid={this.handleTid}
                  auth={this.state.session}
                  getTickets={this.getTickets}
                  tickets={this.tickets}
                  userUrl={this.userUrl}
                  addSess={this.addSess}
                  session={this.state.session}
                  baseUrl={this.state.baseURL}
                  tid={this.state.ticket}
                  userUrl={this.state.userUrl}
                  getOne={this.getOneTix.bind(this)}
                />
              ) : (
                <Login
                  getTickets={this.getTickets}
                  addSess={this.addSess}
                  session={this.state.session}
                  userUrl={this.state.userUrl}
                />
              )}
            </Route>

            <Route exact path="/search">
              {this.state.session === true ? (
                <Search
                  auth={this.state.session}
                  getTickets={this.getTickets}
                  tickets={this.tickets}
                  userUrl={this.userUrl}
                  addSess={this.addSess}
                  session={this.state.session}
                  baseUrl={this.state.baseURL}
                  tid={this.state.ticket}
                  userUrl={this.state.userUrl}
                  getOne={this.getOneTix.bind(this)}
                />
              ) : (
                <Login
                  getTickets={this.getTickets}
                  addSess={this.addSess}
                  session={this.state.session}
                  userUrl={this.state.userUrl}
                />
              )}
            </Route>

            <Route exact path="/view">
              {this.state.session === true ? (
                <TicketView
                  handleTid={this.handleTid}
                  handleTicket={this.handleTicket}
                  notesUrl={this.notesUrl}
                  addTicket={this.addTicket}
                  addSess={this.addSess}
                  session={this.state.session}
                  baseUrl={this.state.baseURL}
                  userUrl={this.state.userUrl}
                  tid={this.state.ticket}
                />
              ) : (
                <Login
                  getTickets={this.getTickets}
                  addSess={this.addSess}
                  session={this.state.session}
                  userUrl={this.state.userUrl}
                />
              )}
            </Route>
            <Route path="*" exact={true} component={notFound} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
