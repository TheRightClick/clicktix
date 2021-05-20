import React, { Component } from "react"
import DogContainer from './components/DogContainer.js'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavbarMain from './components/Navbar.js'
import Login from './components/Login.js'
import Register from './components/Registration.js'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseURL: 'http://localhost:8000/api/v1/dogs/',
      dogs:[],
      userUrl: 'http://localhost:8000/api/v1/users/',
      user:'',
      session: ''
    }
  }

  addSess = (newSess) => {
   localStorage.setItem('user', newSess.token)
    let session_open = localStorage.getItem('user')
    this.setState({
        user: newSess,
        session:session_open
    })
    }

    checkSess = () => {
       let session_open = localStorage.getItem('user')
       this.setState({
           session:session_open
       })
       } 

    clearSess = () => {
      console.log("clear")
      localStorage.clear();
    }

    componentDidMount() {
      this.checkSess()
    }
 
  render() {
    console.log(this.state.user)
    return (
    //  <div className='container'>
    <Router>
      <>
       <NavbarMain checkSess={this.checkSess} clearSess= {this.clearSess} userUrl={this.state.userUrl} />
       <Switch>
       {this.state.session ? <DogContainer session={this.state.session} baseUrl={this.state.baseURL}/> :  <Route exact path="/">
         <Login addSess = {this.addSess} session={this.state.session} userUrl={this.state.userUrl}/>
         </Route>}
         <Route exact path="/register">
         <Register addSess = {this.addSess} userUrl={this.state.userUrl}/>
         </Route>
         <Route exact path="/dogs">
         <DogContainer addSess = {this.addSess} session={this.state.session} baseUrl={this.state.baseURL} userUrl={this.state.userUrl}/>
         </Route>
       <h1>Dogs</h1>
    
    </Switch>
    </>
    </Router>
    )
  }
}

export default App;
