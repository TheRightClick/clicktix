import React, { Component } from "react";
import { Dropdown, Card, Container, Row, Col } from "react-bootstrap";
let status = "Open";

export default class NewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      status: "Select Status",
      assignee: "",
      assignee_name: "Select Assignee",
      users: [],
      background: "",
      backgroundStatus: "",
      ticketId: "",
      notesUrl: "http://localhost:8000/api/v1/notes/",
      note: "",
      user: this.props.user,
    };
  }

  userId = this.props.user;

  status = ["Open", "Working", "Pending Info", "Closed"];

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

  handleAssignee = (e, f) => {
    this.setState({
      assignee_name: e,
      assignee: parseInt(f),
      background: "blue",
    });
    console.log(e, f);
    this.userId = parseInt(f);
  };

  handleStatus = (e) => {
    this.setState({
      status: e,
      backgroundStatus: "blue",
    });
    status = e;
  };

  async defaultStatus(e) {
    await this.setState({
      status: "Open",
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${this.props.baseUrl}new`, {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        status: status,
        assignee: this.userId,
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
        this.props.addTicket(data);
        console.log(data);
        this.setState({
          title: "",
          description: "",
          status: "Select Status",
          assignee: "",
          assignee_name: "Select Assignee",
          note: "",
          empty_status: "",
          empty_assignee: "",
          empty_desc: "",
        });
      })
      .catch((error) => console.error);
    setTimeout(() => {
      this.props.handleTicket();
    }, 500);
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="container" style={{ width: "90%" }}>
        <Card>
          <Card.Body>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <h3>New ticket</h3>
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
                      class="btn btn-danger"
                      danger
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
                              onSelect={() => this.handleStatus(status)}
                              value={status}>
                              {status}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>

                    <div className="form-group">
                      <label>Notes</label>
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
              </Container>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
