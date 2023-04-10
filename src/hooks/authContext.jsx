import axios from "axios";
import { createContext, useState } from "react";
import getCookie from "./getCookie";
import jwt_decode from 'jwt-decode'
import setCookie from "./setCookie";
import { url } from "config/urlConfig";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";

export const AuthContext = createContext("")







export const AuthContextProvider = withRouter((props) => {
    const cookie = getCookie('accessToken')

    let userData;
    if (cookie === undefined) {
      userData = { something: "undefined" };
    } else {
      userData = JSON.parse(cookie);
    }
    

    const [settings,setSettings] = useState({logo:"", name:"", loginlogo:"", address1:"", address2:""})
    const [authState, setAuthState] = useState({
        id: "",
        token: "",
        username: "",
        email: "",
        role: "",
        status: false,
        refreshToken: ""
    })


  let jwtAxios = axios.create()

  jwtAxios.interceptors.request.use(
    async(config)=>{
    // config here includes our headers
    let currentDate = new Date();
    let decodedToken = jwt_decode(userData?.token)
    // console.log(decodedToken.exp*1000<currentDate.getTime()) 
    if(decodedToken.exp*1000<currentDate.getTime()){
      console.log('calling grap auth func:::::::::::::::');
      graphAuth()
    }
    return config
  },(error)=>{
    return Promise.reject(error)
  })




// Jwt response Interceptor
  jwtAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Check if the error is a 403 Forbidden response
      if (error.response && error.response.status === 403) {
        try {
          // Make a request to refresh the authentication token using the refresh token
          console.log('kicking the response one');
          graphAuth()
  
          // Set the new access token in the Authorization header
          // instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
  
          // Retry the original request with the new access token
          return jwtAxios(originalRequest);
        } catch (error) {
          // If the token refresh request fails, log the error and reject the original request
          console.error('Failed to refresh token:', error);
          return Promise.reject(error);
        }
      }
  
      // If the error is not a 403 Forbidden response, reject the original request
      return Promise.reject(error);
    },
  );

  


// End of jwt Response Interceptor


  jwtAxios.get(`${url}`)


  const graphAuth = async() => {
                const cookie = getCookie('accessToken')
                if (!cookie || cookie === undefined) {
                    props.history.push('/login')
                    console.log('runned');
                }
                const decodeAccessToken = jwt_decode(userData.token)
                // console.log(decodeAccessToken);
                await axios.post(`${url}/login/refreshToken`, { withCredentials: true }, { token: decodeAccessToken ?.refreshToken }).then((resp) => {
                    if (resp.data.error) {
                        setAuthState({ id: "", token: "", username: "", email: "", role: "", status: false, refreshToken: "" })
                        props.history.push('/login')
                    } else {
                        const data = resp?.data
                        const userData ={
                            id:data.id,
                            token: data.token,
                            username:data.username,
                            email: data.email,
                            email:data.email,
                            role:data.role,
                            state:true,
                            refreshToken:data.refreshToken
                            // Add other properties as needed
                          }
                        const stringFied = JSON.stringify(userData)
                        setCookie('accessToken',stringFied)
                        setAuthState({ id: data ?.id, username: data?.username, email: data ?.email, role: data ?.role, state: true, refreshToken: data ?.refreshToken })

                    }
                })



            }



useEffect(()=>{
    if(userData?.token||userData?.state){
        setAuthState({ id: userData.id, username: userData.username, email: userData.email, role: userData.role, state: userData.state, refreshToken: userData.refreshToken })
        if(props.history.length>1){
          props.history.goBack()
        }
        }else{
          props.history.push('/login')
        }

        const getSettings = async()=>{

          await axios.get(`${url}/settings`).then((resp)=>{
            const data = resp.data[0]
            // console.log(resp.data[0]);
            setSettings({id:data.id,logo:data.logo, name:data.name, loginlogo:data.loginlogo, address1:data.address1, address2:data.address2})
        }).catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              console.log(error.response.data.error);
            } else {
              console.log(error.response.data.error);
            }
      })
        }

        getSettings()
       
    },[])


    return (
      <AuthContext.Provider value = {{ authState, setAuthState,settings,setSettings } } > 
            { props.children }
      </AuthContext.Provider>
    )
})