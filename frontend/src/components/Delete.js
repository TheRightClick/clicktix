import React, { Component } from 'react'
import { ThemeProvider } from 'react-bootstrap'




export default class Delete extends Component {
    constructor(props) {
        super(props)
    }



     handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.props.ticket)
        fetch(`${this.props.baseUrl}${this.props.ticket}` , {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'text/plain'
            },
                'credentials': 'include'
        }).then ( res => {
            return res.json()
        }).then (res => {
        console.log("deleted now")}).then ( data => {
        }).then( result => {
            this.props.getTickets()
        }).catch(error => console.error) 
    }

  

    render() {
        return (
                <button id="id"  name="id" onClick={ (e) => this.handleSubmit(e)} type="submit"  style={{cursor:'pointer'}}>Delete</button>
        )
    }
}