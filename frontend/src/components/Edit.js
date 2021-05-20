import React, { useEffect, useState } from 'react'
import {Button, Modal } from 'react-bootstrap'


function Edit(props) {
    const [state, setState] = useState(true)
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        props.getDogs()
        setShow(false);
        
    }

    const handleShow = () =>{
        setShow(true);
        setBreed(props.dog.breed)
        setName(props.dog.name)
        setAge(props.dog.age)
    }
   
    const [breed, setBreed] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');



    const handleBreed = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setBreed(value);
    }

    const handleName = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setName(value);
    }

    const handleAge = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setAge(value);
    }
    const handleSubmit = () => {
        
        
        console.log(`${props.baseUrl}${props.dog.id}`)
        fetch(`${props.baseUrl}${props.dog.id}`,  {
            method: 'PUT', 
            body: JSON.stringify({
                
                breed: breed,
                age: age,
                name: name,
            }),
                headers: {
                    'Content-Type': 'application/json',
                },
                'credentials': 'include'
        }).then ( res => {
            return res.json()
        }).then ( data => {
            console.log(data)
        }).then(
        props.getDogs()).catch(error => console.error)
    }


    return (
      <>
        <button style={{cursor:'pointer'}}type="submit" onClick={handleShow}>
          Edit
        </button>
        
        <Modal show={show} onHide={handleClose}>
            
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form >
          <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name"  value={name} onChange={handleName}/>
                </div>

                <div className="form-group">
                    <label>age</label>
                    <input type="text" className="form-control" name = "age"  onChange={handleAge} value={age} />
                </div>

                <div className="form-group">
                    <label>breed</label>
                    <input type="text" className="form-control" name = "breed"  value={breed} onChange={handleBreed} />
                </div>
          
                </form>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button  variant="primary" onClick={handleSubmit}>
              Save
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  
  export default Edit;
