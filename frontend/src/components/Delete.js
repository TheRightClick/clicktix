import React, { Component } from 'react'




export default class Delete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.dog
        }
    }

     handleSubmit = (e) => {
        e.preventDefault()
        console.log("this delete")
        fetch(`${this.props.baseUrl}${this.state.id}` , {
            method: 'DELETE', 
            body: JSON.stringify({
                id: this.props.id
            }),
                headers: {
                    'Content-Type': 'application/json'
                },
                'credentials': 'include'
        }).then ( res => {
            return res.json()
        }).then (res => {
            console.log("delete now")}).then ( data => {
            this.props.getDogs()
        }).catch(error => console.error)
    }

  

    render() {
        return (
                <button id="_id"  name="_id" onClick={ (e) => this.handleSubmit(e)} type="submit" value={this.state._id} style={{cursor:'pointer'}}>Delete</button>
        )
    }
}