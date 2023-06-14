import React, {useState, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import {authenticateUser, newRegistrationAction} from '../../actions/authActions'


const Login = ({authuser, authenticateUser,newRegistrationAction}) => {
    const [loginUserEmail, SetLoginUserEmail] = useState('');
    const [loginUserPassword, SetLoginUserPassword] = useState('');

    let navigate = useNavigate();

    
    useEffect(() => {

      M.AutoInit();
  },[]);


    useEffect(() => {

      if (authuser.isauthenticated){
        console.log('redirecting to main page');
        //this.props.history.push('/events');                       
        navigate('/events');
      }          
  },[authuser.isauthenticated]);


    useEffect(() => {
      
      SetLoginUserEmail('');
      SetLoginUserPassword('');
      
      document.getElementById("LoginUserEmail").classList.remove("invalid");
      document.getElementById("LoginUserEmail").classList.remove("valid");
      document.getElementById("LoginUserPassword").classList.remove("invalid");
      document.getElementById("LoginUserPassword").classList.remove("valid");
      
      
  },[authuser.newregistrationaction]);

    useEffect(() => {
          
       //eslint-disable-next-line 
       //console.log('hi');
       //console.log(authuser)

       if (authuser.errormessage !== null && authuser.errormessage !== ""){
          
          if (authuser.errormessage === "User does not exist")  {
            SetLoginUserEmail('');
            SetLoginUserPassword(''); 
          } else if (authuser.errormessage === "Password is not correct")  {
            SetLoginUserPassword('');  
          } else {
            SetLoginUserEmail('');
            SetLoginUserPassword('');
          }

        
        M.toast({ html: authuser.errormessage}); 
       }
       
    }, [authuser]) //once

  const onSubmit = () => {

      //debugger;
      //console.log(loginUserEmail);
      //console.log(loginUserPassword);
      //debugger;
      if (loginUserEmail === '' || loginUserPassword === '' ){
        M.toast({ html:'Please enter user and password'}); 
      }
      else{

        const userInfo = {
          loginUserEmail: loginUserEmail,
          loginUserPassword: loginUserPassword
        }

        console.log('before authenticateUser');

        authenticateUser(userInfo);

        

        
                
      }


      
        console.log('log in application');
        
  }


  const onRegister = () => {

    newRegistrationAction();
    console.log('on Register application');

  }


  return (
    <div className="container">        
        <div className='row'>    
            <div className="col l3 m3 s12"></div>
            <div className="col l6 m6 s12 z-depth-5 card-panel">                
                  <h5 className="center">Log In</h5>
                  <div className="input-field col s12">                
                    <input id="LoginUserEmail" type="email" className="validate"
                     value={loginUserEmail}
                     data-error="Please enter email address"
                     onChange={e => SetLoginUserEmail(e.target.value)} 
                     required="required"/>
                    <label htmlFor="LoginUserEmail">Enter email</label>
                    <span className="helper-text" data-error="wrong" data-success="right"></span>
                  </div>
                  <div className="input-field col s12">
                    <input id="LoginUserPassword" type="password" className="validate"
                    value={loginUserPassword}
                    onChange={e => SetLoginUserPassword(e.target.value)} 
                    data-error="Please enter password"
                    required="required"/>
                    <label htmlFor="LoginUserPassword">Enter password</label>
                    <span className="helper-text" data-error="wrong" data-success="right"></span>
                  </div>                       	  
                  <div className="input-field col s12">
                      <a href="#!" 
                      onClick={onSubmit}
                      className='waves-effect waves-light btn'>Log In</a>  			
                  </div>
                  <div className="input-field col s12">
                      <a href="#registeruser-event-modal"
                              className='waves-effect waves-light modal-trigger tooltipped'                                                          
                              data-tooltip="Register a new user"
                              onClick={onRegister}
                              >Register                           
                      </a>                       
                  </div>                 
            </div>
            <div className="col l3 m3 s12"></div>            
        </div>
    </div>
  )
}

Login.propTypes = {
  authuser:propTypes.object.isRequired,
  authenticateUser: propTypes.func.isRequired
}

function mapStateToProps (state)  {     
  return {authuser:  state.authuser};
}

export default connect(mapStateToProps, {authenticateUser,newRegistrationAction})(Login)





