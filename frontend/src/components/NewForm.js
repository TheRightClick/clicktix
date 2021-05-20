import React, { Component } from 'react'

export default class NewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            breed: '',
            age:'',
            name:'',
        }

    }


    handleChange =(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

     handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.props.baseUrl)
        fetch(`${this.props.baseUrl}`, {
            method: 'POST', 
            body: JSON.stringify({
                //below is where the other attributes get put...
                name: this.state.name,
                breed: this.state.breed,
                age: this.state.age,
            }),
                headers: {
                    'Content-Type': 'application/json'
                },
                'credentials': 'include'
        }).then ( res => {
            return res.json()
        }).then ( data => {
            this.props.addDogs(data)
            this.setState({
                breed: '', 
                age:'',
                name:'',
                })
        }).catch(error => console.error)
    }

  

    render() {
        return (
            <form onSubmit={ (e) => this.handleSubmit(e)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" onChange={ (e) => this.handleChange(e)} value={this.state.name} placeholder="add dog" />
                <label htmlFor="age">age</label>
                <input type="text" id="age" name="age" onChange={ (e) => this.handleChange(e)} value={this.state.age} placeholder="age" />
                <input type="text" id="breed" name="breed" onChange={ (e) => this.handleChange(e)} value={this.state.breed} placeholder="breed" />
                <input type="submit" value="add dog"/>
            </form>
        )
    }
}
