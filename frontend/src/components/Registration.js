import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class Register extends Component {
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
        fetch(`${this.props.userUrl}register`, {
            method: 'POST', 
            body: JSON.stringify({
                //below is where the other attributes get put...
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }),
                headers: {
                    'Content-Type': 'application/json'
                },
                'credentials': 'include'
        }).then ( res => {
            return res.json()
        }).then ( data => {
            if (data.status != 401) {
                this.props.addSess(data)
                window.location.href ="/"
            } else
            {this.setState ({
                login_error: "invalid Login"
                })
                }
        }).catch(error => console.error)
    }


    render() {
        // console.log(`${this.props.userUrl}login`)
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
                    <label>Email</label>
                    <input type="email" className="form-control" name = "email" placeholder="Enter email" onChange={ (e) => this.handleChange(e)} value={this.state.email} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name = "password" placeholder="Enter password" onChange={ (e) => this.handleChange(e)} value={this.state.password} />
                </div>


                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                 <p>{this.state.login_error}</p>   
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
            </Card.Body>
            </Card>
            </div>
        );
    }
}