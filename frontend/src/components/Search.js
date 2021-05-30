import React, { Component, useDebugValue } from 'react'
import Delete from './Delete.js'
import {BsFillCaretDownFill } from "react-icons/bs";
import {Table, Dropdown} from 'react-bootstrap';
import {RiFilterFill, RiFilterOffFill} from "react-icons/ri";


export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tickets: [],
            foundTix: [],
            ticket: '',
            visible: false,
            users:[],
            status:'',
            search: ''
        }
    }

    status = ["Open", "Working", "Pending Info", "Closed"]



    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }



    handleStatus = (e) => {
        setTimeout(() => {
        this.setState({
            search: e
        })
        this.handleSearchStatus()
        }, 500)
    }

    handleSearchStatus = (e) => {
        let results = []
        for(let i = 0; i < this.state.tickets.length; i++) {
            let key = 'status'
            let value = this.state.search.toLowerCase()
                if(this.state.tickets[i][key].toLowerCase().indexOf(value)!=-1) {
                results.push(this.state.tickets[i])
                }
            }
        this.setState({
            tickets: results
        })
     }


     handleAssignee = (e) => {
         console.log(e)
        setTimeout(() => {
        this.setState({
            search: e
        })
        this.handleSearchAssignee()
        }, 500)
    }

    handleSearchAssignee = (e) => {
        let results = []
        for(let i = 0; i < this.state.tickets.length; i++) {
            let key = 'username'
            let value = this.state.search.toLowerCase()
                if(this.state.tickets[i]['assignee'].username.indexOf(value)!=-1) {
                results.push(this.state.tickets[i])
                }
            }
        this.setState({
            tickets: results
        })
     }

    handleSearch = (e) => {
        let results = []
        for(let i = 0; i < this.state.tickets.length; i++) {
            let key = e.target.name
            let value = this.state.search.toLowerCase()
                if(this.state.tickets[i][key].toLowerCase().indexOf(value)!=-1) {
                results.push(this.state.tickets[i])
                }
            }
        this.setState({
            tickets: results
        })
     }
    
 

    

      
    

    getTickets = () => {
      console.log(this.props.baseUrl)
        fetch(`${this.props.baseUrl}all`, {
          'credentials': 'include'
        }).then(res => { 
          return res.json()
        }).then(data => {
            this.setState({
             tickets: data.data,
             foundTix: data.data
            })
          })
      }
    
    editOne = (e) => {
      this.props.getOne(e.target.value)
  }

    show = () => {
        this.setState({
            visible: true
        })
    }

    hide = () => {
        this.setState({
            visible: false,
            tickets: this.state.foundTix
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

    addTicket = (newTicket) => {
    const copyTickets = [...this.state.tickets]
    copyTickets.push(newTicket)
    this.setState({
        tickets: copyTickets,
    })
    this.getTickets()
    }

    componentDidMount() {
        this.getUsers()
      this.getTickets()
    }

   
    
    render() {
      
        return (
            

            <div>
               
            <Table striped bordered hover style = {{"max-width": "100%"}}>
            <thead>
              <tr>
                <th style = {{"width": "5%"}}>
               {/* </td><input name="id" type="text" style = {{visibility: this.state.visible, width: '100%'} } /> */}
                ID
                </th>
                <th style = {{"width": "10%"}}>
                {/* <input name="title" type="text" style = {{visibility: this.state.visible}} /> */}
                Title
                </th>
                <th style = {{"width": "10%"}}>
                {/* <input name="status" type="text" style = {{visibility: this.state.visible}} /> */}
                Status
                </th>
                <th style = {{"width": "25%"}}>
                {/* <input name="description" type="text" style = {{visibility: this.state.visible}} /><br/> */}
                Description
                </th>
                <th style = {{"width": "10%"}}>
                {/* <input name="assignee" type="text" style = {{visibility: this.state.visible}} /> */}
                Assigned to
                </th>
            <th style = {{"width": "10%"}}><span><button onClick={this.show} ><span><RiFilterFill/> Filter</span></button></span></th>
               {(this.state.visible ===true) ?
               <th style = {{"width": "10%"}}><span><button onClick={this.hide}><span><RiFilterOffFill/>Off</span></button></span></th>
               :
               null
               }
              </tr>
              
          </thead>
         <tbody>
            { (this.state.visible === true) ? 
            <tr>
            <td style = {{"width": "5%"}}>
            <input style = {{"width": "30%"}} name="id" type="text" onChange={ (e) => this.handleChange(e)} />
            <button name="id" onClick= {(e) => this.handleSearch(e)}>filter</button>
            </td>
            <td style = {{"width": "10%"}}>
            
            <input name="title" type="text" onChange={ (e) => this.handleChange(e)} />
            <button name="title" onClick= {(e) => this.handleSearch(e)}>filter</button>
            
            </td>
            <td>
            <Dropdown >
                    <Dropdown.Toggle style={{background: `${this.state.backgroundStatus}`}} variant="secondary" id="dropdown-basic">
                        {this.state.status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                    {this.status.map((status, i) => {
                    return (<Dropdown.Item  key={i} name="status" onSelect={ () => this.handleStatus(status)} value={status}>{status}</Dropdown.Item>)
               })}
               </Dropdown.Menu>
                    </Dropdown>
            </td>
            <td style = {{"width": "25%"}}>
            <input name="description" type="text" onKeyUp={ (e) => this.handleChange(e)}/><br/>
            <button name="description" onClick= {(e) => this.handleSearch(e)}>filter</button>
            </td>
            <td style = {{"width": "10%"}}>
            <Dropdown >
                    <Dropdown.Toggle style={{background: `${this.state.background}`}} variant="secondary" id="dropdown-basic">
                    {this.state.assignee_name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                    {this.state.users.map((user, i) => {
                    return (<Dropdown.Item  key={i} onSelect={ () => this.handleAssignee(user.username)} value={user.username}>{user.username}</Dropdown.Item>)
                    
               })}
               </Dropdown.Menu>
                    </Dropdown>
            </td>
            </tr>
            :
            null
            }
           {this.state.tickets.map((tickets, i) => {
             return (
               <tr style = {{"width": "100%"}} key={i}>
                 <td style = {{"width": "5%"}}> {tickets.id} </td>
                 <td style = {{"width": "15%"}}> {tickets.title} </td>
                 <td style = {{"width": "10%"}}> {tickets.status} </td>
                 <td style = {{"width": "25%"}}className="overflow-auto"> {tickets.description} </td>
                 <td style = {{"width": "10%"}}> {tickets.assignee.username} </td>
                 <td style = {{"width": "10%"}}><Delete  getTickets={this.getTickets} baseUrl={this.props.baseUrl} ticket={tickets.id} /></td>
                 <td style = {{"width": "10%"}}> <button onClick={this.editOne.bind(this)} value={tickets.id} > edit </button></td>
               </tr>
             )
           })}
         </tbody>
       </Table>
            </div>
          )
    }
  
}