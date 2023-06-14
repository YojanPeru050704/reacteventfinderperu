import {    GET_EVENTS_PER_REGION, GET_EVENT, 
            ADD_EVENT, DELETE_EVENT,
            UPDATE_EVENT,SEARCH_EVENTS,ERROR_EVENT,SET_CURRENT_EVENT, CLEAR_CURRENT_EVENT,
            SET_CURRENT_ACTION_TIME, SET_SEARCH_TEXT_EVENTS, CLEAR_EVENT
       } from './types'

//SET SEACH EVENT TEXT
export const setSearchEventText = (searchText)  => async dispatch => {

    try{
        
        dispatch({
            type:  SET_SEARCH_TEXT_EVENTS, 
            payload: searchText
        })

    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}


//SEACH EVENTS PER REGION
export const searchEventsPerText = (searchText, region)  => async dispatch => {

    try{
        let resp = "";
        let data = "";

        if (searchText != null && searchText !== "")        
            resp = await fetch("http://localhost:5000/events?title_like=" + searchText + "&region=" + region);  
        else
            resp = await fetch("http://localhost:5000/events?region=" + region);
         
        data = await resp.json();

        dispatch({
            type:  SEARCH_EVENTS, 
            payload: data
        })

    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}


//CLEAR EVENT
export const clearEvent = ()  => async dispatch => {

    try{
        
        dispatch({
            type:  CLEAR_EVENT
        })


    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}

//GET EVENTS PER REGION
export const getEventsPerRegion = ()  => async dispatch => {

    try{

        const resp = await fetch("http://localhost:5000/events");
        const data = await resp.json();

        dispatch({
            type:  GET_EVENTS_PER_REGION, 
            payload: data
        })


    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}

export const addEvent = (event)  => async dispatch => {

    try{

        const resp = await fetch("http://localhost:5000/events",
            {
               method:'POST',
               body:JSON.stringify(event),
               headers: {
                'Content-Type': 'application/json'
                }     
            }                            
        );

        const data = await resp.json();

        dispatch({
            type:  ADD_EVENT, 
            payload: data
        })


    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}

//updateEvent
export const updateEvent = (event)  => async dispatch => {

    try{

        const res = await fetch(`http://localhost:5000/events/${event.id}`,
            {
               method:'PUT',
               body:JSON.stringify(event),
               headers: {
                'Content-Type': 'application/json'
                }     
            }                            
        );

        const data  = await res.json();

        dispatch({
            type:  UPDATE_EVENT, 
            payload: data
        })

    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}

//delete an event
export const deleteEvent = (id)  => async dispatch => {

    try{

        
        await fetch(`http://localhost:5000/events/${id}`,
            {
               method:'DELETE'               
            }                            
        );

        
        dispatch({
            type:  DELETE_EVENT, 
            payload: id
        })


    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}

//set currentevent
export const clearCurrentEvent = ()  => async dispatch => {

    try{

        dispatch({
            type:  CLEAR_CURRENT_EVENT
        })


    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}


//set currentevent
export const setCurrentEvent = (event)  => async dispatch => {

    try{

        dispatch({
            type:  SET_CURRENT_EVENT, 
            payload: event
        })


    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}



//set currentactiontime
export const setCurrentActionTime = (actionTime)  => async dispatch => {

    try{
       

        dispatch({
            type:  SET_CURRENT_ACTION_TIME, 
            payload: actionTime
        })


    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_EVENT, 
            payload: error.response.statusText
        })
    }

}

