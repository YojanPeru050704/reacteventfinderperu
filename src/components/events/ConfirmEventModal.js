import React from 'react'
import {deleteEvent,clearCurrentEvent} from '../../actions/eventActions'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js'


const ConfirmEventModal = ({current,deleteEvent,clearCurrentEvent}) => {

  
  const confirmDelete = () => {
  
      if (current !== null && current.id !== "")
      {          
          deleteEvent(current.id);
          M.toast({html: "Event was eliminated"});
      }
      
  }

  const cancelDelete = () => {
    
    clearCurrentEvent();

      
  }



  return (
    <div id="confirm-event-modal" className="modal" style={modalStyle}>
        <div className="modal-content">
        <h4>Remove  event </h4>
        <p>Do you want to eliminate this selected event ?</p>
        </div>
        <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat"  onClick={cancelDelete}>Cancel</a>
            <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={confirmDelete}>Ok</a>
        </div>
  </div>
  )
}

const modalStyle = {
    with: '250px',
    height:'250px'
};

ConfirmEventModal.propTypes = {  
  current: propTypes.object,
  deleteEvent: propTypes.func.isRequired,
  clearCurrentEvent:propTypes.func.isRequired
}

const mapStatetoProps = state => ({
  current: state.event.current
})


//export default ConfirmEventModal
export default connect(mapStatetoProps, {deleteEvent,clearCurrentEvent})(ConfirmEventModal)
