import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch,  Redirect } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavbarMain from './components/Navbar.js'
import Login from './components/Login.js'
import Register from './components/Registration.js'
import Tickets from './components/Tickets.js'
import NewForm from './components/NewForm.js'
import TicketView from './components/TicketView.js'




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
      session: false,
      ticket: '',
      users: ''
    }
  }
 
 


reroute = () => {
  setTimeout(() =>{
    this.setState({
      session: false,
      user: '',
      users: ''
    })
    window.location="/"
    }, 500) }

        


        
  addSess = () => {
    this.setState({
        session: true,
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
    
    // checkSess = () => {
    //    let session_open = localStorage.getItem('user')
    //    this.setState({
    //        session:session_open,   
    //    })
    //    } 

    checkSess = () => {
    fetch(`${this.state.userUrl}`, {
      method: 'POST',
      'credentials': 'include'
      }).then(res => { 
      return res.json()
      }).then(data => {
        if(data.data.no_user){
        console.log(data.data.no_user)
        console.log('no user')}
        else {
          this.setState({
            users:data.data,
            session: true,
            user:data.username
           })}
      })
    }
  
      async getOneTix(event) {
        await this.setState({ ticket: parseInt(event) });
        tid = parseInt(event)
    }

    // async reroute(sess) {
    //  await this.setState({session: sess})
    //   // window.location="/"
    // }

    async clearSess() {
      await this.setState({ session: false, user: '' })
    }

    // clearSess = () => {
    //   console.log("clear")
    //   localStorage.clear();
    //   auth = false
    //   this.setState({
    //     session: false,
        
    //   })
      
    // }

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

  
      
    componentDidMount() {
      this.checkSess()
    }
    
    // <Route exact path="/" render={() => (
    //   session ? (
    //     <Redirect to="/dashboard"/>
    //   ) : (
    //     <PublicHomePage/>
    //   )
    // )}/>




  render() {
    console.log(this.state.session)
    
    return (
      
    <Router>
      <> 
      
      {(this.state.ticket !== '') ? <Redirect to = "/view" /> : null}
          
        
      
      <NavbarMain reroute={this.reroute} checkSess={this.checkSess} clearSess= {this.clearSess} userUrl={this.state.userUrl} />
      

         <Switch>
         
         <Route exact path="/login">
         <Login getTickets={this.getTickets} addSess = {this.addSess} session={this.state.session} userUrl={this.state.userUrl}/>:
         </Route>
         

         <Route exact path="/register">
         <Register addSess = {this.addSess} userUrl={this.state.userUrl}/>
         </Route>
         


         
         <Route  exact path="/">
         {(this.state.session === true) ? 
           <Tickets  auth={this.state.session} getTickets={this.getTickets} tickets={this.tickets} userUrl = {this.userUrl} addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} tid={this.state.ticket} userUrl={this.state.userUrl} getOne = {this.getOneTix.bind(this)} />
           :
         <Login getTickets={this.getTickets} addSess = {this.addSess} session={this.state.session} userUrl={this.state.userUrl}/>
          }
         </Route>
         
       

        
         <Route exact path="/new">
         {(this.state.session === true) ? 
         <NewForm notesUrl={this.notesUrl} addTicket={this.addTicket}  addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} userUrl={this.state.userUrl}/>
          :
          <Login getTickets={this.getTickets} addSess = {this.addSess} session={this.state.session} userUrl={this.state.userUrl}/>
        } 
        </Route>
        
        
         <Route  exact path="/tickets">
         {(this.state.session === true) ? 
         <Tickets  auth={this.state.session} getTickets={this.getTickets} tickets={this.tickets} userUrl = {this.userUrl} addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} tid={this.state.ticket} userUrl={this.state.userUrl} getOne = {this.getOneTix.bind(this)}/>
         :
        <Login getTickets={this.getTickets} addSess = {this.addSess} session={this.state.session} userUrl={this.state.userUrl}/>
          }
         </Route> 
       
         
         
         <Route exact path="/view">
         {(this.state.session === true) ? 
         <TicketView notesUrl={this.notesUrl} addTicket={this.addTicket}  addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} userUrl={this.state.userUrl} tid={this.state.ticket} />
         :
         <Login getTickets={this.getTickets} addSess = {this.addSess} session={this.state.session} userUrl={this.state.userUrl}/>
         }
         </Route> 
        
         
       
       {/* <Tickets tickets={this.tickets} userUrl = {this.userUrl} addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} userUrl={this.state.userUrl}/> */}
       
        
      
      
      
        
      {/* <Route exact path="/">
        {auth = true ? 
        <Redirect to="/tickets" /> :
        <Redirect to="/login" />
        } */}

      {/* </Route> */}
    </Switch>
    </>
    </Router>
    )
  }
}

export default App;
