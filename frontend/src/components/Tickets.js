import React, { Component } from "react";

import Delete from "./Delete.js";
import { Table, Dropdown } from "react-bootstrap";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";

export default class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      foundTix: [],
      ticket: "",
      visible: false,
      users: [],
      status: "",
      search: "",
    };
  }

  status = ["Open", "Working", "Pending Info", "Closed"];

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleStatus = (e) => {
    setTimeout(() => {
      this.setState({
        search: e,
      });
      this.handleSearchStatus();
    }, 500);
  };

  handleSearchStatus = (e) => {
    let results = [];
    for (let i = 0; i < this.state.tickets.length; i++) {
      let key = "status";
      let value = this.state.search.toLowerCase();
      if (this.state.tickets[i][key].toLowerCase().indexOf(value) != -1) {
        results.push(this.state.tickets[i]);
      }
    }

    this.setState({
      tickets: results,
    });
  };

  handleAssignee = (e) => {
    console.log(e);
    setTimeout(() => {
      this.setState({
        search: e,
      });
      this.handleSearchAssignee();
    }, 500);
  };

  handleSearchAssignee = (e) => {
    let results = [];
    for (let i = 0; i < this.state.tickets.length; i++) {
      let key = "username";
      let value = this.state.search.toLowerCase();
      if (this.state.tickets[i]["assignee"].username.indexOf(value) != -1) {
        results.push(this.state.tickets[i]);
      }
    }
    this.setState({
      tickets: results,
    });
  };

  handleSearch = (e) => {
    let results = [];
    console.log(this.state.search);
    for (let i = 0; i < this.state.tickets.length; i++) {
      let key = e.target.name;
      let value = "";
      if (key === "id") {
        value = this.state.search.toString();
        if (this.state.tickets[i][key].toString().indexOf(value) !== -1) {
          results.push(this.state.tickets[i]);
        }
      } else if (key !== "id") {
        value = this.state.search.toLowerCase();

        if (this.state.tickets[i][key].toLowerCase().indexOf(value) !== -1) {
          results.push(this.state.tickets[i]);
        }
      }
      this.setState({
        tickets: results,
      });
    }
  };

  editOne = (e) => {
    this.props.getOne(e.target.value);
  };

  show = () => {
    this.setState({
      visible: true,
    });
  };

  hide = () => {
    this.setState({
      visible: false,
      tickets: this.state.foundTix,
    });
  };

  getUsers = () => {
    console.log(this.props.userUrl);
    fetch(`${this.props.userUrl}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          users: data.data,
        });
      });
  };

  addTicket = (newTicket) => {
    const copyTickets = [...this.state.tickets];
    copyTickets.push(newTicket);
    this.setState({
      tickets: copyTickets,
    });
    this.getTickets();
  };

  getTickets = () => {
    console.log(this.props.baseUrl);
    fetch(`${this.props.baseUrl}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          tickets: data.data,
          foundTix: data.data,
        });
      });
  };

  componentDidMount() {
    this.getUsers();
    this.getTickets();
    this.props.handleTid();
  }

  render() {
    return (
      <div>
        <Table striped bordered hover style={{ maxWidth: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>ID</th>
              <th style={{ width: "10%" }}>Title</th>
              <th style={{ width: "10%" }}>Status</th>
              <th style={{ width: "25%" }}>Description</th>
              <th style={{ width: "10%" }}>Assigned to</th>
              <th style={{ width: "10%" }}>
                <span>
                  <button onClick={this.show}>
                    <span>
                      <RiFilterFill /> Filter
                    </span>
                  </button>
                </span>
              </th>
              {this.state.visible === true ? (
                <th style={{ width: "10%" }}>
                  <span>
                    <button onClick={this.hide}>
                      <span>
                        <RiFilterOffFill />
                        Off
                      </span>
                    </button>
                  </span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {this.state.visible === true ? (
              <tr>
                <td style={{ width: "5%" }}>
                  <input
                    style={{ width: "30%" }}
                    name="id"
                    type="text"
                    onChange={(e) => this.handleChange(e)}
                  />
                  <button name="id" onClick={(e) => this.handleSearch(e)}>
                    filter
                  </button>
                </td>
                <td style={{ width: "10%" }}>
                  <input
                    name="title"
                    type="text"
                    onChange={(e) => this.handleChange(e)}
                  />
                  <button name="title" onClick={(e) => this.handleSearch(e)}>
                    filter
                  </button>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ background: `${this.state.backgroundStatus}` }}
                      variant="secondary"
                      id="dropdown-basic">
                      {this.state.status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {this.status.map((status, i) => {
                        return (
                          <Dropdown.Item
                            key={i}
                            name="status"
                            onSelect={() => this.handleStatus(status)}
                            value={status}>
                            {status}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td style={{ width: "25%" }}>
                  <input
                    name="description"
                    type="text"
                    onKeyUp={(e) => this.handleChange(e)}
                  />
                  <br />
                  <button
                    name="description"
                    onClick={(e) => this.handleSearch(e)}>
                    filter
                  </button>
                </td>
                <td style={{ width: "10%" }}>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ background: `${this.state.background}` }}
                      variant="secondary"
                      id="dropdown-basic">
                      {this.state.assignee_name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {this.state.users.map((user, i) => {
                        return (
                          <Dropdown.Item
                            key={i}
                            onSelect={() => this.handleAssignee(user.username)}
                            value={user.username}>
                            {user.username}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ) : null}
            {this.state.tickets.map((tickets, i) => {
              return (
                <tr style={{ width: "100%" }} key={i}>
                  <td style={{ width: "5%" }}> {tickets.id} </td>
                  <td style={{ width: "15%" }}> {tickets.title} </td>
                  <td style={{ width: "10%" }}> {tickets.status} </td>
                  <td style={{ width: "25%" }} className="overflow-hidden">
                    {" "}
                    {tickets.description}{" "}
                  </td>
                  <td style={{ width: "10%" }}>
                    {" "}
                    {tickets.assignee.username}{" "}
                    <p>
                      <small>last update:{tickets.last_update} GMT</small>
                    </p>{" "}
                  </td>
                  <td style={{ width: "10%" }}>
                    <Delete
                      handleDelete={this.handleDelete}
                      handleTicket={this.props.handleTicket}
                      addTickets={this.addTicket}
                      getTickets={this.getTickets}
                      baseUrl={this.props.baseUrl}
                      ticket={tickets.id}
                    />
                  </td>
                  <td style={{ width: "10%" }}>
                    {" "}
                    <button
                      onClick={this.editOne.bind(this)}
                      value={tickets.id}>
                      {" "}
                      edit{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
