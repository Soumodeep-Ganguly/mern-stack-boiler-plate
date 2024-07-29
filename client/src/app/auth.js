import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// auth context
export const AuthContext = React.createContext();

export function AuthProvider({ children }){

  const cache = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(cache);
  const [dark, setDark] = useState(() => {
    const savedMode = localStorage.getItem('color-theme');
    return savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, [dark]);

  function signin(res){
    if (res.data){

      localStorage.setItem('user', JSON.stringify(res.data));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;

      return window.location = '/'

    }
  }

  async function signout(){

    localStorage.clear();
    return window.location = '/signin'

  }

  function update(data){

    if (localStorage.getItem('user')){

      let user = JSON.parse(localStorage.getItem('user'));
      for (let key in data){

        if (Array.isArray(data[key])){
        
          user[key] = data[key]

        }
        else if (typeof data[key] === 'object'){
          for (let innerKey in data[key]){

            user[key][innerKey] = data[key][innerKey]

          }
        }
        else {
          
          user[key] = data[key];

        }
      }

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

    }
  }

  return (
      <AuthContext.Provider value={{
              dark, setDark,
              user: user,
              signin: signin,
              signout: signout,
              update: update

          }}
      > 
          {children}
      </AuthContext.Provider>
  );
}

export function PrivateRoute(props){  
  // check user exists
  const { user, signout } = useContext(AuthContext);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          // Clear user context and redirect to sign-in page
          signout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject the interceptor when the component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, [signout]);

  if (user?.token){ 
    return props.children
  }
  return <Navigate to='/signin' />;

}