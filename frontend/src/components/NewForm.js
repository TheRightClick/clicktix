import React, { Component } from 'react'
import {Dropdown, Card }  from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
export default class NewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description:'',
            status:'Select Status',
            assignee:'',
            assignee_name:'Select Assignee',
            users:[],
            background: '',
            backgroundStatus: '',
            ticketId: '',
            notesUrl:'http://localhost:8000/api/v1/notes/',
            note:''
        }

    }

    status = ["Open", "Working", "Pending Info", "Closed"]

    handleChange =(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleNotesChange =(e)=> {
        
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }
    

    getUsers = () => {
        console.log(this.props.userUrl)
        fetch(`${this.props.userUrl}`, {
          'credentials': 'include'
        }).then(res => { 
          return res.json()}).then(data => {
            this.setState({
             users:data.data
            })
          })
      }
    
    handleAssignee = (e, f) => {
        this.setState({
            assignee_name: e,
            assignee: parseInt(f),
            background: 'blue',
        })
        console.log(e, f)
    }

    handleStatus = (e) => {
        this.setState({
            status: e,
            backgroundStatus: 'blue',
        })
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.props.baseUrl)
        fetch(`${this.props.baseUrl}new`, {
            method: 'POST', 
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                status: this.state.status,
                assignee: this.state.assignee,
                note: this.state.note,
            }),
                headers: {
                    'Content-Type': 'application/json'
                },
                'credentials': 'include'
        }).then ( res => {
            return res.json()
        }).then ( data => {
            this.props.addTicket(data)
            console.log(data)
            this.setState({
                title: '',
                description:'',
                status:'Select Status',
                assignee:'',
                assignee_name:'Select Assignee',
                note:''
                })
            
        }).catch(error => console.error)
        // window.location.href = "/Tickets"
    }




    componentDidMount() {
        this.getUsers()
      }

 

    render() {
       
        return (
<div className='container' style={{"width" : "90%"}} >
<Card style={{display: 'flex', justifyContent: 'center'}}>
<Card.Body style={{display: 'flex', justifyContent: 'center'}}>
<form onSubmit={ (e) => this.handleSubmit(e)}>
    <h3>New ticket</h3>

    <div className="form-group">
        <label>Title</label>
        <input type="text" className="form-control" name="title" placeholder="Enter Title" onChange={ (e) => this.handleChange(e)} value={this.state.title}/>
    </div>
    <Dropdown >
                    <Dropdown.Toggle style={{background: `${this.state.background}`}} variant="secondary" id="dropdown-basic">
                        {this.state.assignee_name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                    {this.state.users.map((user, i) => {
                    return (<Dropdown.Item  key={i} onSelect={ () => this.handleAssignee(user.username, user.id)} value={user.username}>{user.username}</Dropdown.Item>)
                    
               })}
               </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown >
                    <Dropdown.Toggle style={{background: `${this.state.backgroundStatus}`}} variant="secondary" id="dropdown-basic">
                        {this.state.status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                    {this.status.map((status, i) => {
                    return (<Dropdown.Item  key={i} onSelect={ () => this.handleStatus(status)} value={status}>{status}</Dropdown.Item>)
                    
               })}
               </Dropdown.Menu>
                    </Dropdown>

    <div className="form-group">
        <label>Description</label>
        <textarea style={{"width" : "180%"}} type="text" className="form-control" name = "description" placeholder="Description" onChange={ (e) => this.handleChange(e)} value={this.state.description} />
    </div>

    <div className="form-group">
        <label>Notes</label>
        <textarea style={{"width" : "180%"}} type="text" className="form-control" name = "note" placeholder="Note" onChange={ (e) => this.handleNotesChange(e)} value={this.state.note} />
    </div>

     
    <button type="submit" href="/tickets" className="btn btn-primary btn-block">Submit</button>
    <a class="btn btn-danger" danger href="/tickets" role="button">Cancel</a>
</form>
</Card.Body>
</Card>
</div>
        )
    }
}

