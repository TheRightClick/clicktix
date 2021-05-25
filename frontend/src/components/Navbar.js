import React, { Component } from 'react'

import {Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';



export default class NavbarMain extends Component {
  constructor(props) {
    super(props)
      this.state = {
        baseURL: 'http://localhost:8000/api/v1/tickets/',
        userUrl: 'http://localhost:8000/api/v1/users/',
        user:'',
        session: ''
      }
    }
    

    handleSubmitLogout = (e) => {
      localStorage.clear();
      console.log("logout")
      fetch(`${this.props.userUrl}logout` , {
          method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              },
              'credentials': 'include'
      }).then ( res => {
          return res.json()
      }).then ( data => {
        this.props.clearSess()
        
      }).catch(error => console.error).then(
      window.location.href = "/"
      )
    }


    render() {
        return (
            <div>
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Click Tix</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/tickets">Home</Nav.Link>
      <Nav.Link href="/new">New Ticket</Nav.Link>
      <Nav.Link onClick={ (e) => this.handleSubmitLogout(e)} href="/" >Sign-Out</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
        )
    }
}
