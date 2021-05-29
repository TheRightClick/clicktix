import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
       username: '',
       password: '',
       login_error: ''
    }
}


    handleChange =(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.props.userUrl)
        fetch(`${this.props.userUrl}login`, {
            method: 'POST', 
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
                headers: {
                    'Content-Type': 'application/json'
                },
                'credentials': 'include'
        }).then ( res => {
            return res.json()
        }).then ( data => {
            console.log(data)
            if (data.status === 200) {
                this.props.addSess(data)
                this.props.getTickets()
            // setTimeout(() =>{
            //      this.props.addSess()
            //      window.location="/tickets"
            //      }, 1000)
                 }
                else
            {this.setState ({
                login_error: "invalid Login"
                })
                }
        }).catch(error => console.error)        
    }


    render() {
        
        return (
            <div className='container' style={{"width" : "50%"}} >
            <Card style={{display: 'flex', justifyContent: 'center'}}>
            <Card.Body style={{display: 'flex', justifyContent: 'center'}}>
            <form onSubmit={ (e) => this.handleSubmit(e)}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" placeholder="Enter username" onChange={ (e) => this.handleChange(e)} value={this.state.username}/>
                </div>


                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name = "password" placeholder="Enter password" onChange={ (e) => this.handleChange(e)} value={this.state.password} />
                </div>

               
                 <p>{this.state.login_error}</p>   
                <button type="submit" className="btn btn-primary btn-block" href="/">Submit</button>
                <a class="btn btn-info" href="/register" role="button">Register</a>
            </form>
            </Card.Body>
            </Card>
            </div>
        );
    }
}