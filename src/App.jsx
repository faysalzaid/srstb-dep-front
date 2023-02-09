import axios  from 'axios'
import React, { lazy, useContext, useState } from 'react'
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
import jwt_decode from 'jwt-decode'
import Chat from './components/Chat/Chat'
import { ref } from 'yup'
import setCookie from 'hooks/setCookie'


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
  let [authState,setAuthState] = useContext(AuthContext)
  let cookie = getCookie('accessToken')


  let jwtAxios = axios.create()



// 



  jwtAxios.interceptors.request.use(
    async(config)=>{
    // config here includes our headers
    let currentDate = new Date();
    let decodedToken = jwt_decode(cookie)
    // console.log(decodedToken.exp*1000<currentDate.getTime()) 
    if(decodedToken.exp*1000<currentDate.getTime()){
      console.log('calling grap auth func:::::::::::::::');
      const nData = grapaAuth()
    }
    return config
  },(error)=>{
    return Promise.reject(error)
  })

  jwtAxios.get(`${url}`)








  const grapaAuth = async()=>{
    if(!cookie||cookie==="undefined"){
      props.history.push('/login')
      
    }
    // console.log('useEffect');
    const decodeAccessToken = jwt_decode(cookie)

    axios.post(`${url}/login/refreshToken`,{token:decodeAccessToken?.refreshToken},{withCredentials: true}).then((resp)=>{
      if(resp?.data.error){
        console.log('what',authState)

        // setAuthState({id:"",username:"",email:"",role:"",status:false,refreshToken:""})
        props.history.push('/login') 
        
      }else{
        const data = resp?.data
        setCookie('accessToken',data.token)
        setAuthState({id:data?.id,username:data?.username,email:data?.email,role:data?.role,state:true,refreshToken:data?.refreshToken})
      }
  })

  }



  useEffect(()=>{
    if(!authState.status){
      props.history.push('/login')
    }
    let isMounted = true
    if(isMounted){
      // grapaAuth()
    }

    return ()=>{
      isMounted=false
    }

  
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
          {/* <Route path={'/'} component={HomePage} /> */}
          <Redirect exact from="/" to="/login" />
          
        </Switch>
        </AuthContext.Provider>
        </QueryClientProvider>
      
    </>
    

     
  )
}

export default withRouter(App)
