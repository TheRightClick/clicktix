import React, { Component } from 'react'

import {Navbar, Nav } from 'react-bootstrap';



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
    

    handleSubmitLogout = () => {
      
      console.log("logout")
      // this.props.reroute()
      fetch(`${this.props.userUrl}logout` , {
          method: 'GET', 
              headers: {
                  'Content-Type': 'application/json',
              },
              'credentials': 'include'
      }).then ( res => {
          return res.json()
      }).then ( data => {
        return data
      }).then (
        this.props.reroute()    
    ).catch(error => console.error).then(
      )
      this.props.reroute()
    }


    render() {
        return (
            <div>
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">Click Tix</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/tickets">Home</Nav.Link>
      <Nav.Link href="/new">New Ticket</Nav.Link>
      <Nav.Link onClick={ () => this.handleSubmitLogout()}  >Sign-Out</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
        )
    }
}
