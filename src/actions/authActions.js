import {  REGISTER_USER, GET_AUTH_USER , ERROR_USER, EXISTS_AUTH_USER, CLEAR_AUTH_USER, NEW_REGISTRATION_ACTION 
} from './types'
import setAuthToken from '../utils/setAuthToken'

//AUTH USER
export const authenticateUser = (user)  => async dispatch => {

    try{
        console.log('uno');
        console.log(user);
        debugger;
        
        const vemail = user.loginUserEmail;
        const vpassword =user.loginUserPassword;

        
        console.log(vpassword);

        let resp = await fetch("http://localhost:5000/users?email=" + vemail + "&password=" + vpassword);
        let data = await resp.json();

        if (data.length > 0){
            console.log(data[0].region);    

            let respregion = await fetch("http://localhost:5000/regions?id=" + data[0].region);    
            let dataregion = await respregion.json();

            if (dataregion.length > 0){
                const regionname = dataregion[0].regionname;
                console.log(regionname);
                data[0]["regionname"] = regionname; 
            }

            

            dispatch({
                type:  GET_AUTH_USER, 
                payload: data[0]
            })
        }
        else{
            resp = await fetch("http://localhost:5000/users?email=" + vemail);
            data = await resp.json();

            if (data.length === 0)
            dispatch({
                type:  ERROR_USER, 
                payload: "User does not exist"
            }) 
            else
            dispatch({
                type:  ERROR_USER, 
                payload: "Password is not correct"
            })
        }
    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_USER, 
            payload: error.response.statusText
        })
    }


}

//REGISTER AN USER
export const existsUserEmail = (useremail)  => async dispatch => {

    let exists = "0";

    try{
        const resp = await fetch("http://localhost:5000/users?email=" + useremail);
        const data = await resp.json();
        

        if (data.length > 0)
            exists = "1";
           
        dispatch({
            type:  EXISTS_AUTH_USER, 
            payload: exists
        })
    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_USER, 
            payload: error.response.statusText
        })
    }

    
}

export const newRegistrationAction = ()  => async dispatch => {

    dispatch({
        type:  NEW_REGISTRATION_ACTION
    }) 

}


export const clearauthuser = ()  => async dispatch => {

    try{
        
        dispatch({
            type:  CLEAR_AUTH_USER
        })     
    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_USER, 
            payload: error.response.statusText
        })
    }


}

//REGISTER AN USER
export const createUser = (user)  => async dispatch => {

    try{
        debugger;

        const resp = await fetch("http://localhost:5000/users",
            {
               method:'POST',
               body:JSON.stringify(user),
               headers: {
                'Content-Type': 'application/json'
                }     
            }                            
        );

        const data = await resp.json();

        dispatch({
            type:  REGISTER_USER, 
            payload: data
        })     
    } 
    catch(error)
    {
        dispatch({
            type:  ERROR_USER, 
            payload: error.response.statusText
        })
    }


}