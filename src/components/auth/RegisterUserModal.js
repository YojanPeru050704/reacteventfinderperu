import React, {useState, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {createUser, existsUserEmail} from '../../actions/authActions'

const RegisterUserModal = ({authuser,createUser,existsUserEmail}) => {
    const [userName, SetUserName] = useState('');
    const [userEmail, SetUserEmail] = useState('');
    const [userpassword, SetUserPassword] = useState('');
    const [userpassword2, SetUserPassword2] = useState('');
    const [userRegion, SetUserRegion] = useState('');

    useEffect(() => {
        console.log('entro a authuser.newregistrationaction')
        SetUserName('');
        SetUserEmail('');
        SetUserPassword('');
        SetUserPassword2('');
        SetUserRegion(''); 
        
        const select1 = document.querySelector('#selectregion');
        select1.value = "";
        M.FormSelect.init(select1, null); 
        
        //M.FormSelect.init(select1, options); 
        //select1.FormSelect();
        //var eleminstance = M.FormSelect.getInstance(select1);
        
        //M.FormSelect.init(select1, options);
        
        //
        //eleminstance.select();


        document.getElementById("UserEmail").classList.remove("invalid");
        document.getElementById("UserEmail").classList.remove("valid");
        document.getElementById("UserPassword").classList.remove("invalid");
        document.getElementById("UserPassword").classList.remove("valid");
        document.getElementById("UserPassword2").classList.remove("invalid");
        document.getElementById("UserPassword2").classList.remove("valid");
        
    },[authuser.newregistrationaction]);

    
    useEffect(() => {
          
        //eslint-disable-next-line 
        //console.log('hi');
        //console.log(authuser)

        if (authuser.user == null)
        {
            console.log('use effect 01');
        console.log(authuser.existsuser);
        console.log('use effect 02');
 
            if (authuser.existsuser !== null){
                if (authuser.existsuser === "1")  {  
                    console.log('before M toast');                           
                    M.toast({ html: 'account ' + `${userEmail}` + ' already exists'}); 
                    SetUserEmail('');
                }
                else if (authuser.existsuser === "0"){
                    
                        const new_user = {
                        username: userName,
                        email: userEmail,
                        password: userpassword,
                        region: userRegion,
                        createdon:new Date() 
                        }
                    
                        createUser(new_user);   
                
                        M.toast({ html:'User was created'}); 
                        //document.getElementById("UserName").classList.add("modal-close");
                        const modal1 = document.querySelector('#registeruser-event-modal');
                        var instance = M.Modal.getInstance(modal1);    
                        instance.close();
                        //disbale input text

                                            
                }
            }

        }
       
     }, [authuser.existsuser, authuser.submittedtime]) //once
 

    const onSubmit = (e) => {

        const select1 = document.querySelector('#selectregion');
        console.log('select value')
        console.log(select1.value);
        //select1.value = "";

       if (userpassword !== userpassword2)
           M.toast({ html:'Password values do not match'});  
       else if (select1.value === "")    
       {
        M.toast({ html:'Select a region value'}); 
       }
       else  {
           console.log('verify exitence of user account');  
           
           existsUserEmail(userEmail);
                      
         }  
         
         e.preventDefault(); 
    }

  return (
    <form onSubmit={onSubmit} >
    <div id="registeruser-event-modal"  className='modal'>        
        <div className='row'>
            <div className="col l12 m12 s12">
                <h5 className='center'>User registration</h5>                
                <div className="input-field col s12">
                <input id="UserEmail" type="email" className="validate" 
                value={userEmail}
                onChange={e => SetUserEmail(e.target.value)} 
                readOnly={!!authuser.user}     
                data-error="Please enter email address"
                required="required" aria-required="true"                             
                />
                <label htmlFor="UserEmail">Enter email</label>
                <span className="helper-text" data-error="wrong" data-success="right"></span>
                </div>
                <div className="input-field col s12">
                <input id="UserPassword" type="password" className="validate"
                value={userpassword}
                onChange={e => SetUserPassword(e.target.value)}
                readOnly={!!authuser.user}  
                data-error="Please enter your password"
                required="required" aria-required="true" 
                />
                <label htmlFor="UserPassword">Enter password</label>
                <span className="helper-text" data-error="wrong" data-success="right"></span>
                </div>
                <div className="input-field col s12">
                <input id="UserPassword2" type="password" className="validate" 
                value={userpassword2}
                onChange={e => SetUserPassword2(e.target.value)}
                readOnly={!!authuser.user}  
                data-error="Please confirm your password"
                required="required" aria-required="true" 
                />
                <label htmlFor="UserPassword2">Confirm password</label>
                <span className="helper-text" data-error="wrong" data-success="right"></span>
                </div>
                <div className="input-field col s12">
                    <select onChange={e => SetUserRegion(e.target.value)} value={userRegion} readOnly={!!authuser.user} 
                    data-error="Please select a region"                     
                    className="validate"
                    id="selectregion"
                    name="selectregion"
                    defaultValue=""
                    >
                        <option value="" required disabled default>Choose your region</option>
                        <option value="1">Lima</option>
                        <option value="2">Cusco</option>
                        <option value="3">Arequipa</option>
                    </select>
                    <span className="helper-text" data-error="wrong" data-success="right"></span>
                </div>	

                { (authuser.user == null) && 	   
                <div className="input-field col s12">
                        
                        <button name="action" type='submit' className='waves-effect waves-light btn'>Create</button>                        			
                </div>
                }
            </div>                       
        </div>
    </div>
    </form>
    
  )

  
}

function mapStateToProps (state)  {       
    return {authuser:  state.authuser};
  }

RegisterUserModal.propTypes = {
    createUser: propTypes.func.isRequired
  }

//export default RegisterUserModal
export default connect(mapStateToProps, {createUser,existsUserEmail})(RegisterUserModal)
