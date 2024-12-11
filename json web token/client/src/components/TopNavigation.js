import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { useEffect } from 'react';

function TopNavigation() {
  
  let navigate = useNavigate();

     let storeObj = useSelector((store)=>{
      return store;
    });

    useEffect(()=>{
      if(storeObj && storeObj.loginDetails && storeObj.loginDetails.email){

       }else {
           navigate("/");
       }

    },[])
  

  return (
    <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/leaves">Leaves</Link>
        <Link to="/editProfile">Edit Profile</Link>
        <Link to="/">Signout</Link>
    </nav>
  )
}

export default TopNavigation
