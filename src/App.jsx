import axios  from 'axios'
import React, { lazy, useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { AuthContext } from './hooks/authContext'
import getCookie from './hooks/getCookie'
import { url } from './config/urlConfig'
import Header from './components/Header'
import { createContext } from 'react'
import ResetPassword from './pages/ResetPassword'
import HomePage from './pages/home'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'


const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

const queryClient = new QueryClient({defaultOptions:{
  queries:{
    refetchOnWindowFocus:false
  }
}})


function App(props) {
  let [authState,setAuthState] = useState({id:"",username:"",email:"",role:"",status:false})
  const cookie = getCookie('accessToken')


  const grapaAuth =()=>{
    const cookies = {accessToken:cookie}
    // console.log(cookies.accessToken);
     axios.get(`${url}/login/auth`,{withCredentials: true,headers:{accessToken:cookie}}).then((resp)=>{
      if(resp.data.error){
        // console.log('what',resp.data)
        setAuthState({id:"",username:"",email:"",role:"",state:false})
        props.history.push('/login')
        
      }else{
        const data = resp.data
        // console.log(data);
        setAuthState({id:data.id,username:data.username,email:data.email,role:data.role,state:true})
      }
  })
  }

  useEffect(()=>{
      grapaAuth()
  },[])

  return (
    <>
    <QueryClientProvider client={queryClient}>
     
     <AuthContext.Provider value={[authState,setAuthState]}>
     
        <AccessibleNavigationAnnouncer />
        
        <Switch>
        <Route path="/reset-password/:id/:token" component={ResetPassword} />
        
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */} 
          <Route path="/app" component={Layout} />  
          <Route path="/headers" component={Header}/>
          {/* If you have an index page, you can remothis Redirect */}
          <Route path={'/'} component={HomePage} />
          {/* <Redirect exact from="/" to="/login" /> */}
          
        </Switch>
        </AuthContext.Provider>
        </QueryClientProvider>
    </>
    

     
  )
}

export default withRouter(App)
