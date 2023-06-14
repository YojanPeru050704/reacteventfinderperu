import React, {useEffect} from 'react'
import EventItem from './EventItem'
import {connect} from 'react-redux'
import {searchEventsPerText} from '../../actions/eventActions'
import propTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js';


const Events = ({authuser, event :{events, current, loading, searchText}, searchEventsPerText}) => {

  let navigate = useNavigate();

  useEffect(() => {

    //if (authuser.isauthenticated === true)
    if (localStorage.getItem('token') != null)
    {
      if (authuser.currentuser === null)
          authuser.currentuser = JSON.parse(localStorage.getItem('token'));
      
      console.log('entro aqui 01')
    //getEventsPerRegion();
     //eslint-disable-next-line 
     console.log('entro aqui 02');
     console.log(searchText);
     console.log('before search');     
    console.log(authuser);
     searchEventsPerText(searchText, authuser.currentuser.region);
     console.log('after search');     
    console.log(authuser);
    }    
  }, [searchText]) //once


  useEffect(() => {  
    debugger;  
    console.log('events');
    console.log(localStorage.getItem('token') );
    M.AutoInit();

    //if (authuser.isauthenticated === false)
    if (localStorage.getItem('token') === null)
        navigate('/');
  }, []) //once

  
  const renderEventRow = (events) => {

    var arrrenderEventRowGroup = [];
    
    if (events != null){

        var i=0;
        var group=0;
        var eventGroup = [];        

        events.forEach((el)=>{
            i = i + 1;
            eventGroup.push(el);
            if (i %3 === 0){
              group = group + 1;
              arrrenderEventRowGroup.push(renderEventRowGroup(group, eventGroup));  
              eventGroup = [];
            }
            
            console.log(i)
        })

        if  (eventGroup.length > 0){
              group = group + 1;
              arrrenderEventRowGroup.push(renderEventRowGroup(group, eventGroup));  

        }


    }

    return arrrenderEventRowGroup;

  }
  
  const renderEventRowGroup = (group, eventGroup) => {

    if (eventGroup != null){

      const eventrowdiv =  eventGroup.map((tmpevent,index) =>  {
                            console.log('entro al loop '+ index);
                            
                            return (
                              <div className="col s12 m4 center" key={tmpevent.id}>
                                  <EventItem key={tmpevent.id} event={tmpevent}></EventItem>  
                              </div>
                              )                                  
                          }
                  )       
      
      return  <div className="row" key={group}>
                  {eventrowdiv}
              </div> 
  }
  else{
    return(        
        <h4>Empty list</h4>
      )   
  }

  
  }

  return (        
    renderEventRow(events)            
  );
}

Events.propTypes = {
  searchEventsPerText: propTypes.func.isRequired,
  authuser: propTypes.object.isRequired,
  event: propTypes.object.isRequired
}

const mapStatetoProps = state => ({
  event: state.event,
  authuser:state.authuser
})



export default connect(mapStatetoProps, {searchEventsPerText})(Events)
