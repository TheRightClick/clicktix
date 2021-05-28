import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { BrowserRouter as Route, Switch, Redirect } from 'react-router-dom'



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
                   
                }} ticket={this.state.ticket} />
        )
    }

    render() {
        
        return (
            <>
                <Switch>
               <Route exact path="/view">
                
                
                </Route>
                </Switch>
        <Button onClick={this.clicked} type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-pencil"></span> View/Edit
        </Button>  
            </>
        )
    }
}
