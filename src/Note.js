import './App.css';
import React, { Component } from 'react'
import {connect} from 'react-redux';


class Note extends Component {
  constructor (props) {
    super(props)
    this.state={note:"",notes:[],newNote:{}}
  }
  componentDidMount(){
    this.setState({notes:this.props.notes})
  }
  getNote=(event)=>{
    let note =event.target.value;
    let theDate= new Date()
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    let day= days[theDate.getDay()]
    let date= day+"  "+theDate.toLocaleString('default', { month: 'short' }) + theDate.getDate()+", "+theDate.getFullYear() 
    let NewNote={note:note,date:date}
    this.setState({newNote:NewNote})
  }
  handleChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  add=()=>{
    this.props.notes.push(this.state.newNote)
    this.setState({notes:this.props.notes})
  }
  edit=(id)=>{
    this.props.notes[id].note=this.state.note
    this.setState({notes:this.props.notes})
    let editeDiv= document.getElementById(id);
    editeDiv.style.display= "none";
  }
  delete=(id)=>{
    this.props.notes.splice(id,1) 
    this.setState({notes:this.props.notes})
  }
  showEdite=(id)=>{
    let editeDiv= document.getElementById(id);
    editeDiv.style.display= "block";
  }
  done=(id)=>{
    let doneDiv= document.getElementById(id);
    doneDiv.style.background="linear-gradient(to left, #ffb6b9, rgb(255 255 255)), #ffffff";
  }

  render () {
     let notesArray= this.state.notes.map((note,k)=><div id={note.note} className="note" key={k}>
       <div className="date-box">
        <h5 className="date-title">{note.date}</h5>
        </div>
        <p> <span>-</span> {note.note}</p>
        <div id="buttons">
        <button id="doneButton"className="btn btn-success" onClick={()=>this.done(note.note)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
        </svg></button>
        <button id="editeButton"className="btn btn-success" onClick={()=>this.showEdite(k)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg></button>
        <button id="deleteButton" className="btn btn-danger" onClick={()=>this.delete(k)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg></button>
        </div>
        <div id={k} className="edite">
        <div className="input-group mb-3 ">
        <span className="input-group-text">Edit:</span>
        <input type="text" className="form-control" name="note" onChange={this.handleChange}></input>
        <input type="button" className="btn btn-success" value="Edite" onClick={()=>this.edit(k)}></input>
        </div>
        </div>
        </div>) 
    return (
      <div className="App container">
        <div className="notes">
          <h1>Track Your Task</h1>
         <div className="input-group mb-3 ">
         <span className="input-group-text"> Add Note:</span>
          <input type="text" className="form-control" name="note" onChange={this.getNote}></input>
                    <button id="addButton"className="btn btn-primary" onClick={this.add} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                      </svg>
                    </button>
          </div>
         {notesArray}
         </div>
      </div>
    )
  }
}
//any name
const mapStateToProps=(state)=>{
  return{
    notes:state.notes
  }
}

export default connect(mapStateToProps)(Note)


