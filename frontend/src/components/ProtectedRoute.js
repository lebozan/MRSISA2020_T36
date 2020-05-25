import React from 'react'
import Cookies from 'universal-cookie';
import { 
  Redirect,
  useLocation
 } from 'react-router-dom'

// Component for protecting routes of all types of users
// pass a user type specific home page component as component prop
export default function ProtectedRoute(props) {
  const {component} = props;
  const cookies = new Cookies();
  const location = useLocation();

  // check if route is equal to the role of logged in user and redirect to that user's home page
  // or redirect to login
  const isAuthenticated = () => {
    if (location === '/' || location === '/login' || location === '/register') {
      return;
    }
    var role = cookies.get('role');
    if (role === location.pathname.split('/')[1]) {
      return component;
    } else {
      return <Redirect to={{ pathname: '/login' }} />
    }

  }


  return  (
    <div>
      {isAuthenticated()}
    </div>
  )
}
