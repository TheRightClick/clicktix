import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory, useParams } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavbarMain from './components/Navbar.js'
import Login from './components/Login.js'
import Register from './components/Registration.js'
import Tickets from './components/Tickets.js'
import NewForm from './components/NewForm.js'
import TicketView from './components/TicketView.js'
import Edit from './components/Edit.js'
import { scryRenderedComponentsWithType } from "react-dom/test-utils";


let auth = false
let tid = 0
class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      baseURL: 'http://localhost:8000/api/v1/tickets/',
      tickets:[],
      userUrl: 'http://localhost:8000/api/v1/users/',
      notesUrl:'http://localhost:8000/api/v1/notes/',
      user:'',
      session: '',
      ticket: ''
    }
  }
  


reroute = (i) => {
  console.log("reroute")
  
  // return <Link path to="/new" />  
  
  // window.location.href ="/view"
}








  addSess = (newSess) => {
    localStorage.setItem('user', newSess.token)
    console.log(newSess.token)
    let session_open = localStorage.getItem('user')
    this.setState({
        user: newSess,
        session:session_open,
    })
    auth = true
    }

    getTickets = () => {
      console.log(this.baseURL)
        fetch(`${this.state.baseURL}`, {
          'credentials': 'include'
        }).then(res => { 
          return res.json()
        }).then(data => {
            this.setState({
             tickets: data.data,
            })
            console.log(this.state.tickets)
          })
      }
    
    checkSess = () => {
       let session_open = localStorage.getItem('user')
       this.setState({
           session:session_open,   
       })
       
       } 

    clearSess = () => {
      console.log("clear")
      localStorage.clear();
      auth = false
      this.setState({
        session:'',
      })
      
    }

    addTicket = (newTicket) => {
      const copyTickets = [...this.state.tickets]
      copyTickets.push(newTicket)
      this.setState({
          tickets: copyTickets,
      })
      }

      async getOneTix(event) {
        await this.setState({ ticket: parseInt(event) });
        tid = parseInt(event)
        
    }

      // getOneTix = (i) => {
      //   this.setState ({
      //     ticket: i
      //   })
      //   this.reroute(i)
      //  } 

      // redirect = () => {
      //   if (this.state.ticket){
      //     <Redirect to = "/view" />
      //   }
      // }
      
    componentDidMount() {
      this.checkSess()
    }
    
    
  render() {
    console.log(this.state.ticket)
    // {this.redirect()}
    return (
      
    <Router>
      <> 
      
      {(this.state.ticket != '') ? <Redirect to = "/view" /> : null}
          
        
      
      <NavbarMain checkSess={this.checkSess} clearSess= {this.clearSess} userUrl={this.state.userUrl} />
      
        <Switch>
        
         <Route exact path="/register">
         <Register addSess = {this.addSess} userUrl={this.state.userUrl}/>
         </Route>

         <Route exact path="/new">
         <NewForm notesUrl={this.notesUrl} addTicket={this.addTicket}  addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} userUrl={this.state.userUrl}/>
         </Route>

         <Route exact path="/tickets">
         <Tickets   getTickets={this.getTickets} tickets={this.tickets} userUrl = {this.userUrl} addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} tid={this.state.ticket} userUrl={this.state.userUrl} getOne = {this.getOneTix.bind(this)}/>
         </Route>

         <Route exact path="/view">
         <TicketView notesUrl={this.notesUrl} addTicket={this.addTicket}  addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} userUrl={this.state.userUrl} tid={this.state.ticket} />
         </Route> 

         <Route exact path="/login">
         <Login getTickets={this.getTickets} addSess = {this.addSess} session={this.state.session} userUrl={this.state.userUrl}/>:
         </Route>
       
       {/* <Tickets tickets={this.tickets} userUrl = {this.userUrl} addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} userUrl={this.state.userUrl}/> */}
       
        
      
      
      
        
      <Route exact path="/">
        {auth = true ? 
        <Redirect to="/tickets" /> :
        <Redirect to="/login" />
        }

      </Route>
    </Switch>
    </>
    </Router>
    )
  }
}

export default App;
