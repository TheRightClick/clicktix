import React, { Component } from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';

// componentWillReceiveProps(nextProps) {
//     this.setState({ data: nextProps.data });  
//   }


export default class TicketView extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            tickets: [],
            ticket: this.props.tid
        }
    }
    // shouldComponentUpdate(nextProps)
    // shouldComponentUpdate()
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ ticket: nextProps.tid });  
    //   }

    


    getTicket = () => {
        console.log("ticket id", this.props.tid)
          fetch(`${this.props.baseUrl}`, {
                method: 'POST', 
                body: JSON.stringify({
                    id: this.props.tid
                }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    'credentials': 'include'
          }).then(res => { 
            return res.json()
          }).then(data => {
              console.log(data)
              this.setState({
               tickets: data.data,
              })
            })
        }

        componentDidMount() {
            this.getTicket()
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
                 
               </tr>
             )
           })}
         </tbody>
       </Table>
            </div>
        )
    }
}
