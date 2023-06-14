import React, {useState, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {addEvent} from '../../actions/eventActions'

const AddEventModal = ({authuser, addEvent,actionTime}) => {

  const [title, SetTitle] = useState('');
  const [description, SetDescription] = useState('');
  const [region, SetRegion] = useState('');
  const [createdBy, SetCreatedBy] = useState('');
  

  useEffect(() => {
    
    if (authuser!= null && authuser.currentuser != null){        
        SetTitle('');
        SetDescription('');
        SetRegion(authuser.currentuser.region);
        SetCreatedBy(authuser.currentuser.email);

        //setting default value for region
        const select1 = document.querySelector('#event_region');
        select1.value = authuser.currentuser.region;
        console.log(authuser.currentuser.region);
        M.FormSelect.init(select1, authuser.currentuser.region); 
    }                

  }, [actionTime]) //once


  const onSubmit = () => {

    
      console.log(title,description,region);

      if (title === '' || description === '' ){
        M.toast({ html:'Please enter a event title and description'}); 
      }
      else{
        const new_event = {
          title: title,
          description: description,
          region: region,
          createdby: createdBy,
          date:new Date() 
        }

        addEvent(new_event);   
        
        //clear fields
        
        SetTitle('');
        SetDescription('');        
        SetCreatedBy('');
        
      

        M.toast({html: `Event was added by ${createdBy}`});

        const modal1 = document.querySelector('#add-event-modal');
        var instance = M.Modal.getInstance(modal1);    
        instance.close();

      }

  }


  return (
    <div id="add-event-modal" className="modal" style={modalStyle}>
        <div className="modal-content">
            <div className='row'>
              <div className='input-field col s12'>
                  <input placeholder="Title" 
                  id="event_title"
                  name= "event_title"
                  type="text" 
                  value={title} 
                  onChange={e => SetTitle(e.target.value)}
                  className='validate' 
                  />                 
              </div>
            </div>                       
            <div className='row'>
              <div className='input-field col s12'>
                  <textarea  placeholder="Description" id="event_description" 
                  type="text" 
                  className='materialize-textarea' 
                  name= "event_description"
                  value={description}
                  onChange={e=> SetDescription(e.target.value)}
                 
                  />                  
              </div>
            </div>                       
            <div className='row'>
              <div className='input-field col s12'>
                   <select 
                    readOnly='true'                                    
                    id="event_region"
                    name="event_region"    
                    disabled                
                    >
                        <option value="" required disabled default>Choose your region</option>
                        <option value="1" >Lima</option>
                        <option value="2">Cusco</option>
                        <option value="3">Arequipa</option>
                    </select>                        
              </div>
            </div>     
           <div className='modal-footer'>
                <a href="#!" 
                onClick={onSubmit}
                className='
                 waves-effect waves-light btn'>Enter</a>
            </div>                       
        </div>
    </div>    
  )
}

const modalStyle = {
    with: '75%',
    height:'75%'
};

AddEventModal.propTypes = {
  authuser: propTypes.object.isRequired,
  addEvent: propTypes.func.isRequired,
  actionTime: propTypes.any
}

const mapStatetoProps = state => ({  
  authuser:state.authuser,
  actionTime: state.event.actionTime
})

export default connect(mapStatetoProps, {addEvent})(AddEventModal)



