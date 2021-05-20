import React, { Component } from 'react'
import NewForm from './NewForm.js'
import Delete from './Delete.js'
import Edit from './Edit.js'
export default class DogContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dogs: [],
        }
    }

    getDogs = () => {
      console.log(this.props.baseUrl)
        fetch(`${this.props.baseUrl}`, {
          'credentials': 'include'
        }).then(res => { 
          return res.json()}).then(data => {
            this.setState({
             dogs: data.data,
            })
          })
      }
    
    addDogs = (newDog) => {
    const copyDogs = [...this.state.dogs]
    copyDogs.push(newDog)
    this.setState({
        dogs: copyDogs,
    })
    this.getDogs()
    }

    componentDidMount() {
      this.getDogs()
    }


    render() {
        return (
            <div>
            <NewForm baseUrl={this.props.baseUrl} addDogs={this.addDogs}/> 
            <table>
         <tbody>
           {this.state.dogs.map((dog, i) => {
             return (
               <tr key={i}>
                 <td> {dog.name} </td>
                 <td> {dog.breed} </td>
                 <td> {dog.age} </td>
                 <td><Delete getDogs={this.getDogs} baseUrl={this.props.baseUrl} dog={dog.id} /></td>
                 <td><Edit getDogs={this.getDogs} baseUrl={this.props.baseUrl} dog={dog} /></td>
               </tr>
             )
           })}
         </tbody>
       </table>
            </div>
        )
    }
}
