import React from 'react'
import {connect} from 'react-redux'
import {setCurrentActionTime} from '../../actions/eventActions'
import propTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js'


const AddButon = ({setCurrentActionTime}) => {

  function addEventForm(){

    const d = new Date();
    var time = d.getTime(); 
    console.log(time);  
    console.log('addEvent after time');  
    setCurrentActionTime(time);
    console.log('addEvent after time 02');
    const modal1 = document.querySelector('#add-event-modal');
    var instance = M.Modal.getInstance(modal1);    
    instance.open();  

  }

  return (
    <div className="fixed-action-btn">
        <a href="#add-event-modal" className="btn-floating btn-large 
        waves-effect waves-light blue-grey modal-trigger tooltipped"
        data-position="top" data-tooltip="Create an event"
        onClick={addEventForm}
        >
            <i className="material-icons">add</i>
        </a>         
    </div>    
  )
}
//export default AddButon

export default connect(null, {setCurrentActionTime})(AddButon)
