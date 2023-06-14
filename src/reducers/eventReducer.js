import {    GET_EVENTS_PER_REGION, GET_EVENT, 
            ADD_EVENT, DELETE_EVENT,
            UPDATE_EVENT,SEARCH_EVENTS,ERROR_EVENT, SET_CURRENT_EVENT, CLEAR_CURRENT_EVENT,
            SET_CURRENT_ACTION_TIME, SET_SEARCH_TEXT_EVENTS, CLEAR_EVENT
} from '../actions/types'

const initialstate ={
    events: null,
    current:null,
    loading:false,
    error:null,
    actionTime:null,
    searchText:null
}


export default (state = initialstate, action) => {

    switch(action.type){
        case SET_SEARCH_TEXT_EVENTS:
            return {
                ...state,
                searchText:action.payload,         
                loading:false
            }
        case SEARCH_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading:false     
            }        
        case GET_EVENTS_PER_REGION:
            return {
               ...state,
               events: action.payload,
               loading:false     
            }
        case ADD_EVENT:
            return {
                events: [...state.events,action.payload],
                loading:false        
            }   
        case DELETE_EVENT:
            return {
                events: state.events.filter(event => event.id !== action.payload),
                loading:false        
            }  
        case UPDATE_EVENT:
            return {
                ...state,   
                events: state.events.map(event => event.id == action.payload.id ? action.payload : event),                  
                loading:false
            }                
        case SET_CURRENT_EVENT:
            return {
                ...state,                
                current: action.payload,  
                actionTime: 1, 
                loading:false        
            }        
         case CLEAR_CURRENT_EVENT:
                return {
                    ...state,                    
                    current: null,   
                    loading:false        
                }  
        case SET_CURRENT_ACTION_TIME:
                return {
                    ...state,
                    actionTime: action.payload 
                }
        case CLEAR_EVENT:
            return {
                events: null,
                current:null,
                loading:false,
                error:null,
                actionTime:null,
                searchText:null        

            }                      
        default:
              return state;  
    }

}