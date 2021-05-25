import React, { Component } from 'react'
import NewForm from './NewForm.js'
import Delete from './Delete.js'
import Edit from './Edit.js'
import {Table, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'

let edit = false

export default class Tickets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tickets: [],
            ticket: ''
        }
    }

    


    getTickets = () => {
      console.log(this.props.baseUrl)
        fetch(`${this.props.baseUrl}`, {
          'credentials': 'include'
        }).then(res => { 
          return res.json()
        }).then(data => {
            this.setState({
             tickets: data.data,
            })
          })
      }
    
    editOne = (e) => {
      this.props.getOne(e.target.value)
  }




    addTicket = (newTicket) => {
    const copyTickets = [...this.state.tickets]
    copyTickets.push(newTicket)
    this.setState({
        tickets: copyTickets,
    })
    this.getTickets()
    }

    componentDidMount() {
      this.getTickets()
    }


    render() {
     
        return (


            <div>
         
            {/* <NewForm baseUrl={this.props.baseUrl} useUrl={this.props.userUrl} addTickets={this.addTickets}/>  */}
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Description</th>
                <th>Assigned to</th>
              </tr>
          </thead>
         <tbody>
           {this.state.tickets.map((tickets, i) => {
             return (
               <tr key={i}>
                 <td> {tickets.id} </td>
                 <td> {tickets.title} </td>
                 <td> {tickets.status} </td>
                 <td> {tickets.description} </td>
                 <td> {tickets.assignee.username} </td>
                 <td><Delete getTickets={this.getTickets} baseUrl={this.props.baseUrl} ticket={tickets.id} /></td>
                 <td> <button onClick={this.editOne.bind(this)} value={tickets.id} > edit </button></td>
               </tr>
             )
           })}
         </tbody>
       </Table>
            </div>
        )
    }
}

// onClick={this.editOne.bind(this)}