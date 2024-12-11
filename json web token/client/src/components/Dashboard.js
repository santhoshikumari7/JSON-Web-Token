import React from 'react'
import { useSelector } from 'react-redux';
import TopNavigation from './TopNavigation';

function Dashboard() {

   let storeObj = useSelector((store) =>{
    return store;
   });

  return (
    <div>
      <TopNavigation/>
     <h2>Dashboard</h2>
     <h3>
      {storeObj.loginDetails.firstName}
      {storeObj.loginDetails.lastName}
    </h3>
    <img src={`http://localhost:5000/${storeObj.loginDetails.profilePic}`}alt=''></img>
    </div>
  )
}

export default Dashboard
