import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'



export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
        ticket: this.props.ticket    
    }
}
    clicked(e) {
        e.preventDefault()
        return (

            <Redirect
                to={{
                    path:"/view",
                    // state: {
                    //     ticket:this.props.ticket
                    // }
                }} ticket={this.state.ticket} />
        )
    }

    render() {
        
        return (
            <>
                <Switch>
               <Route exact path="/view">
                {/* <TicketView notesUrl={this.notesUrl} addTicket={this.addTicket}  addSess = {this.addSess} session={this.state.session} baseUrl={this.state.    baseURL} userUrl={this.state.userUrl} ticket={ticket}/> */}
                
                </Route>
                </Switch>
        <Button onClick={this.clicked} type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-pencil"></span> View/Edit
        </Button>  
            </>
        )
    }
}
