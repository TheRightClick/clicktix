import React, { Component } from "react";
import { Dropdown, Card, Container, Row, Col } from "react-bootstrap";

export default class TicketView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: "",
      ticket: this.props.tid,
      users: [],
      status: "",
      assignee: "",
      title: "",
      description: "",
      notes: [],
      timeCreated: "",
      lastUpdate: "",
      note: "",
    };
  }

  status = ["Open", "Working", "Pending Info", "Closed"];

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
      })
      .catch((error) => console.error);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleNotesChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleStatus = (e) => {
    this.setState({
      status: e,
      backgroundStatus: "blue",
    });
  };

  handleTicket = () => {
    this.props.handleTicket();
  };

  handleAssignee = (e, f) => {
    this.setState({
      assignee_name: e,
      assignee: parseInt(f),
      background: "blue",
    });
    console.log(e, f);
  };

  getTicket = () => {
    console.log("ticket id", this.props.tid);
    fetch(`${this.props.baseUrl}`, {
      method: "POST",
      body: JSON.stringify({
        id: this.props.tid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data.notes);
        this.setState({
          tickets: data.data.ticket[0],
          description: data.data.ticket[0].description,
          status: data.data.ticket[0].status,
          title: data.data.ticket[0].title,
          assignee_name: data.data.ticket[0].assignee.username,
          assignee: data.data.ticket[0].assignee.id,
          notes: data.data.notes,
        });
      })
      .catch((error) => console.error);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${this.props.baseUrl}${this.props.tid}`, {
      method: "PUT",
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        assignee: this.state.assignee,
        note: this.state.note,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // this.props.getTicket()
        this.props.addTicket(data);
        console.log(data);
      })
      .catch((error) => console.error);

    setTimeout(() => {
      this.handleTicket();
    }, 500);
  };

  componentDidMount() {
    this.getTicket();
    this.getUsers();
  }

  render() {
    console.log(this.state.tickets);

    return (
      <div>
        <div className="container" style={{ width: "90%" }}>
          <Card>
            <Card.Body>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <h3>{this.state.tickets.title}</h3>
                <h4>Ticket # {this.state.tickets.id}</h4>
                <Container>
                  <Row>
                    <Col xs="6" sm="4"></Col>
                    <Col xs="6" sm="4"></Col>
                    <Col sm="4">
                      <button
                        type="submit"
                        href="/tickets"
                        className="btn btn-primary btn-block">
                        Submit
                      </button>
                      <a
                        className="btn btn-danger"
                        href="/tickets"
                        role="button">
                        Cancel
                      </a>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="6">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Enter Title"
                          onChange={(e) => this.handleChange(e)}
                          value={this.state.title}
                        />
                      </div>
                    </Col>

                    <Col xs="6">
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
                                onSelect={() =>
                                  this.handleAssignee(user.username, user.id)
                                }
                                value={user.username}>
                                {user.username}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="6">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          style={{ width: "100%" }}
                          type="text"
                          className="form-control"
                          name="description"
                          placeholder="Description"
                          onChange={(e) => this.handleChange(e)}
                          value={this.state.description}
                        />
                      </div>
                    </Col>
                    <Col xs="6">
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{
                            background: `${this.state.backgroundStatus}`,
                          }}
                          variant="secondary"
                          id="dropdown-basic">
                          {this.state.status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {this.status.map((status, i) => {
                            return (
                              <Dropdown.Item
                                key={i}
                                onSelect={() => this.handleStatus(status)}
                                value={status}>
                                {status}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>

                      <div className="form-group">
                        <label>Add new Note</label>
                        <textarea
                          style={{ width: "100%" }}
                          type="text"
                          className="form-control"
                          name="note"
                          placeholder="Note"
                          onChange={(e) => this.handleNotesChange(e)}
                          value={this.state.note}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4> Previous Notes </h4>
                      <div overflow-auto="true">
                        {this.state.notes.map((note, i) => {
                          return (
                            <ul className="list-group">
                              <li className="list-group-item">
                                <p>
                                  <small>
                                    Created: {note.created_time} <br /> By:{" "}
                                    {note.note_by.username}
                                  </small>
                                </p>
                                {note.note}
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
