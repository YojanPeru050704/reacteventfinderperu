import React, {useState, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {updateEvent} from '../../actions/eventActions'

const EditEventModal = ({authuser, actionTime, current, updateEvent}) => {

  const [title, SetTitle] = useState('');
  const [description, SetDescription] = useState('');
  const [region, SetRegion] = useState('');
  const [regionvalue, SetRegionValue] = useState('');
  const [createdBy, SetCreatedBy] = useState('');
  

  useEffect(() => {

     
    
      if (current){

        
        console.log('use effect editevent' + current.title);
        SetTitle(current.title);
        SetDescription(current.description);  
        //SetRegion(authuser.currentuser.region);
        SetRegion(authuser.currentuser.regionname);
        SetRegionValue(authuser.currentuser.region);
        SetCreatedBy(current.createdby);

        //setting default value for region
        
        //M.AutoInit(); //initializes everything  
      }

  }, [current,actionTime]) //once

  useEffect(() => {

    M.AutoInit(); //initializes everything  
  
    
    
}, []) //once
  
  
  function onEdit(){

      console.log('editing an event');
      const edit_event = {
        id: current.id,
        title: title,
        description: description,
        region: regionvalue,
        createdby: createdBy,
        date:new Date() 
      }
      updateEvent(edit_event);

      M.toast({html: `Event was modified by ${createdBy}`});
     

  }


  return (
    <div id="edit-event-modal" className="modal" style={modalStyle} >
        <div className="modal-content">
            <div className='row'>
              <div className='input-field col s12'>
                  <input placeholder="Title" id="event_title" type="text" className='validate'
                  value={title} 
                  onChange={(e) => {SetTitle(e.target.value); }}/>                 
              </div>
            </div>                       
            <div className='row'>
              <div className='input-field col s12'>
                  <textarea  placeholder="Description" id="event_description" type="text" 
                  value={description}
                  onChange={(e) => {SetDescription(e.target.value); }}
                  className='materialize-textarea' />                 
              </div>
            </div>                       
            <div className='row'>
              <div className='input-field col s12'>
                  <input  id="event_region" type="text" 
                    value={region} 
                    disabled='1' />
              </div>
            </div>               
            <div className='modal-footer'>
                <a href="#!" className='modal-close waves-effect waves-light btn'
                 onClick={onEdit}
                >Enter</a>
            </div> 
        </div>
    </div>    
  )
}

const modalStyle = {
    with: '75%',
    height:'75%'
};

EditEventModal.propTypes = {
  authuser: propTypes.object.isRequired,
  actionTime: propTypes.any,
  current: propTypes.object,
  updateEvent: propTypes.func.isRequired
}

const mapStateToProps = state => ({  
  authuser:state.authuser,
  current:  state.event.current,
  actionTime: state.event.actionTime
})

export default connect(mapStateToProps, {updateEvent})(EditEventModal)
