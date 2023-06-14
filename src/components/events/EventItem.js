import React from 'react'
import {connect} from 'react-redux'
import {setCurrentActionTime, setCurrentEvent} from '../../actions/eventActions'
import propTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js'

const EventItem = ({event, setCurrentEvent,setCurrentActionTime}) => {


  const deleteEventForm = () => {

    
    //event.id
    console.log('deleteEventForm' + event.id)
    const eventtodelete =  {id: event.id}
    console.log(eventtodelete)
    setCurrentEvent(eventtodelete);

    
  }

  const editEventForm = () => {


    console.log('editEvent before time');    
    setCurrentEvent(event);
    const d = new Date();
    var time = d.getTime(); 
    console.log(time);  
    console.log('editEvent after time');  
    setCurrentActionTime(time);
    console.log('editEvent after time 02');
    const modal1 = document.querySelector('#edit-event-modal');
    var instance = M.Modal.getInstance(modal1);    
    instance.open();  

  }


  return (
    <div className="row">
        <div className="col s12 m12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text" style={{height:'160px'}}>
              <span className="card-title">{event.title}</span>
              <p style={{textAlign:'left'}}>{event.description}</p>
            </div>
            <div className="card-action small" style={{textAlign:'left', fontSize:'14px'}}>
                <a href="#!" style={{textTransform:'none', fontSize:'12px'}} className='tiny'>Created by {event.createdby}.</a>                
                <div style={{float:'right'}}>
                <a href="#edit-event-modal" className='modal-trigger tooltipped'
                  data-position="bottom" data-tooltip="Edit this event"                  
                 style={{width:'14px', marginRight:'5px'}} 
                 onClick={editEventForm}>
                    <i className='material-icons tiny'>edit</i>
                </a>
                <a href="#confirm-event-modal" className='modal-trigger tooltipped' 
                data-position="bottom" data-tooltip="Remove this event"
                style={{width:'14px', marginRight:'5px'}}
                onClick={deleteEventForm}
                >
                    <i className='material-icons tiny'>delete</i>
                </a>
                </div>
            </div>            
          </div>
        </div>        
        
    </div>      
  )
}

EventItem.propTypes = {
  event:propTypes.object.isRequired,  
  setCurrentEvent: propTypes.func.isRequired,
  setCurrentActionTime: propTypes.func.isRequired
}


export default connect(null, {setCurrentEvent, setCurrentActionTime})(EventItem)
//export default EventItem




