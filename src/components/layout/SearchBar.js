import React, {useState, useEffect} from 'react'
import {setSearchEventText} from '../../actions/eventActions'
import M from 'materialize-css/dist/js/materialize.min.js'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import {clearauthuser} from '../../actions/authActions'
import {clearEvent} from '../../actions/eventActions'

const SearchBar = ({authuser, event, setSearchEventText, clearauthuser,clearEvent}) => {


  const [searchText, setSearchText] = useState('');
  let navigate = useNavigate();

  useEffect(() => {

    //M.AutoInit();

    if (authuser!= null && authuser.currentuser != null){
      console.log(authuser.currentuser);
      var options = new Object();
      options.html = "<div style='text-align:left'>Email: " +  authuser.currentuser.email +  "<br>Region: " +  authuser.currentuser.regionname + "</div>";
      const elem = document.querySelector('#userinfo');
      M.Tooltip.init(elem, options);       
    }                
},[]);

function mouseOver(){

  const elem = document.querySelector('#userinfo');
  var instance = M.Tooltip.getInstance(elem);    
  instance.open();

}



  function handleChange(event)  {

    setSearchText(event.target.value);

  } 

  function handleKeyDown(event){

      if (event.key === 'Enter'){
        console.log('entro al enter');        
        console.log(searchText); 
        setSearchEventText(searchText);
      }
        

  }

  function onLogOff(){

      console.log('Log off');
      clearauthuser();
      clearEvent();
      navigate('/');
  }


  return (
    <nav className='black' style={{ marginBottom:'30px'}}>
    <div className="nav-wrapper">      
        <div className="input-field">
           {/* <input id="search" type="search" style={{width:'10%'}} />
                       */}
          <input id="search" type="search" className="left" style={{width:'calc(100% - 230px)'}} 
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          />
          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i>
          </label>          
          <ul className="right hide-on-med-and-down">            
            <li><a href="#" id="userinfo"  onMouseOver={mouseOver} ><span className="material-symbols-outlined">
                            group
                </span></a></li>
            <li>
            <a href="#!" 
                onClick={onLogOff}
                className='
                waves-effect waves-light btn-small hide-on-med-and-down'>Log off</a>              
            </li>            
          </ul>
        </div>      
    </div>
  </nav>
  )
}

SearchBar.propTypes = {
  setSearchEventText: propTypes.func.isRequired,
  authuser: propTypes.object.isRequired,
  event: propTypes.object.isRequired
}

const mapStatetoProps = state => ({
  event: state.event,
  authuser:state.authuser
})

export default connect(mapStatetoProps, {setSearchEventText,clearauthuser,clearEvent})(SearchBar)

