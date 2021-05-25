import React, { useEffect, useState } from 'react'
import {Button, Modal } from 'react-bootstrap'


function Edit(props) {
    const [state, setState] = useState(true)
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        props.getTickets()
        setShow(false);
        
    }
   

    const handleShow = () =>{
        setShow(true);
        console.log(props.ticket)
        setTitle(props.ticket.title)
        setDescription(props.ticket.description)
        setAssignee(props.ticket.assignee.username)
        // setCreated_time(props.ticket.created_time)
        // setCreated_by(props.ticket.created_by)
        // setLast_Update(props.ticket.last_update)
        setStatus(props.ticket.status)
        // setNotes(props.notes)
    }
   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    // const [created_time, setCreated_time] = useState('');
    // const [created_by, setCreated_by] = useState('');
    // const [last_update, Last_Update] = useState('');
    const [status, setStatus] = useState('');
    // const [notes, setNotes] = useState('');



    const handleDescription = (e) => {
      e.preventDefault();
      const value = e.target.value;
      setDescription(value);
  }
  const handleTitle = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setTitle(value);
}

  const handleAssignee = (e) => {
      e.preventDefault();
      const value = e.target.value;
      setAssignee(value);
  }

  const handleStatus = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setStatus(value);

    }
    const handleSubmit = () => {
     
        
        
  
        fetch(`${props.baseUrl}${props.ticket.id}`,  {
            method: 'PUT', 
            body: JSON.stringify({
              title: title,
              description: description,
              status: status,
              // assignee: assignee,
                
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
        props.getTickets()).catch(error => console.error)
    }

    
    return (
      
      <>
        <button style={{cursor:'pointer'}}type="submit" onClick={handleShow}>
          Edit
        </button>
        
        <Modal show={show} onHide={handleClose} backdrop="static">
            
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p> {props.ticket.created_by.username} </p>
          <form > 
          <div className="form-group">
                    <label>title</label>
                    <input type="text" className="form-control" name="title"  value={title} onChange={handleTitle}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" name = "description"  onChange={handleDescription} value={description} />
                </div>

                <div className="form-group">
                    <label>status</label>
                    <input type="text" className="form-control" name = "status"  value={status} onChange={handleStatus} />
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