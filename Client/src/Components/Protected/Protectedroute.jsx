import React from 'react'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Protectedroute = () => {
    const token = localStorage.getItem('token');
  return token ? <Outlet/> : <Navigate to='/' replace/>
}

export default Protectedroute
