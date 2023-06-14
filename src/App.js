import React, {Fragment, useEffect, useState} from 'react'
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from './components/layout/SearchBar';
import Events from './components/events/Events'
import AddButon from './components/layout/AddButon';
import AddEventModal from './components/events/AddEventModal'
import EditEventModal from './components/events/EditEventModal';
import ConfirmEventModal from './components/events/ConfirmEventModal'
import RegisterUserModal from './components/auth/RegisterUserModal'
import Login from './components/auth/Login';
import store from './store'
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


const  App = () => {

   

  useEffect(() => {
      //Init Materialize javascript
  
      M.AutoInit();
  }
  )

  console.log('validate');
  console.log(store.getState());
  //console.log(currentuserid);

  return (
    <Provider store={store}>
    <Router>
    <Routes>        
          <Route  path='/' element={
              <Fragment>                
                <RegisterUserModal></RegisterUserModal>       
                <Login></Login> 
              </Fragment>
          }>
          </Route>
          <Route path='/events' element={
              <Fragment>                
                <SearchBar></SearchBar>  
                <div className="container">                     
                    <AddEventModal></AddEventModal>       
                    <EditEventModal></EditEventModal>        
                    <ConfirmEventModal></ConfirmEventModal>
                    <Events></Events>        
                    <AddButon></AddButon>        
                </div>
              </Fragment>
          }>
          </Route>        
    </Routes>
    </Router>
    </Provider>
  );
}

export default App;
