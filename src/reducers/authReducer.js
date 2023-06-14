import {    REGISTER_USER, GET_AUTH_USER, ERROR_USER, EXISTS_AUTH_USER, 
    NEW_REGISTRATION_ACTION,CLEAR_AUTH_USER
} from '../actions/types'
import { v4 as uuid } from 'uuid';


const userinitialstate ={    
    user: null,
    currentuser:null,
    existsuser:null,
    loadinguser:false,    
    errormessage:null,
    submittedtime: null,
    newregistrationaction:null,
    isauthenticated:false
}

export default (state = userinitialstate, action) => {

    switch(action.type){
        case GET_AUTH_USER:
            const unique_id = uuid();
            console.log('GET_AUTH_USER')
            console.log(unique_id)
            localStorage.setItem('token', JSON.stringify(action.payload));
            console.log(localStorage.getItem('token'));
            return {
                ...state,               
                currentuser: action.payload,
                errormessage:null,
                loadinguser:false,
                isauthenticated:true  
            }                
        case REGISTER_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                currentuser: null,
                user: action.payload,
                errormessage:null,
                isauthenticated:false
            }   
        case EXISTS_AUTH_USER:
            return {
                ...state,
                existsuser: action.payload,
                currentuser:null,
                errormessage:null,
                submittedtime:new Date().getTime(),
                isauthenticated:false
            }            
        case ERROR_USER:
            localStorage.removeItem('token');
            return {
               ...state,               
               currentuser:null,
               errormessage: action.payload,
               loadinguser:false,
               isauthenticated:false
            }
        case NEW_REGISTRATION_ACTION:
            localStorage.removeItem('token');
            return {
               ...state,
               user: null,
               currentuser:null,
               existsuser:null,
               loadinguser:false,    
               errormessage:null,
               submittedtime: null,
               newregistrationaction: new Date().getTime(),               
               isauthenticated:false
            }  
        case CLEAR_AUTH_USER:
            localStorage.removeItem('token');
            return {              
                user: null,
                currentuser:null,
                existsuser:null,
                loadinguser:false,    
                errormessage:null,
                submittedtime: null,
                newregistrationaction: null,                
                isauthenticated:false
             }
        default:{
            return state
        }
             
    }

}





