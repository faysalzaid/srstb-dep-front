import axios from "axios";
import { createContext, useState } from "react";
import getCookie from "./getCookie";
import jwt_decode from 'jwt-decode'

import { url } from "config/urlConfig";
import { useEffect } from "react";
import { withRouter,useHistory } from "react-router-dom";
import useGrapAuth from "./useRefresh";

export const AuthContext = createContext("")







export const AuthContextProvider = withRouter((props) => {
  const storedValue = localStorage.getItem('User');
    const history = useHistory()
    // const navigate = useNavigate()
    const userData = storedValue ? JSON.parse(storedValue) : undefined;
    const refresh = useGrapAuth()

    const [settings,setSettings] = useState({logo:"", name:"", loginlogo:"", address1:"", address2:""})
    const [authState, setAuthState] = useState({
        id: "",
        username: "",
        email: "",
        role: "",
        image:"",
        state: false,
        accessToken:""
    })



    let jwtAxios = axios.create({withCredentials:true})

    jwtAxios.interceptors.request.use(
      async (config) => {
        // Check for specific status codes
        // console.log('about tho do ');
        if (config.status === 403) {
          console.log('within the config');
          await refresh(); // Call the graphauth function
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    

        jwtAxios.interceptors.response.use(
          response => response,
          async (error) => {
              const prevRequest = error?.config;
              if (error?.response?.status === 403 && !prevRequest?.sent) {
                  prevRequest.sent = true;
                  const newAccessToken = await refresh();
                  console.log('This is the new ',);
                  prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                  return jwtAxios(prevRequest);
              }
              return Promise.reject(error);
          }
      );
        
        jwtAxios.get(`${url}`)

  

  




  
// End of jwt Response Interceptor



  
// console.log(history.length);

useEffect(()=>{

        const getData = async()=>{
          await axios.get(`${url}/settings`).then((resp)=>{
            const data = resp.data[0]
            // console.log(resp.data[0]);
            setSettings({id:data.id,logo:data.logo,name:data.name,loginlogo:data.loginlogo,address1:data.address1, address2:data.address2})
        }).catch((error)=>{
          console.log(error);
      })

          if(userData?.state!==true){
            history.push('/login')
            }else{
              setAuthState({ id:userData?.id,username:userData?.username, email:userData?.email,image:userData?.image, role:userData?.role,state:true,accessToken:userData?.accessToken })
              if(props.history.length>0){
                  // console.log(props.history);
                  if(history.location.pathname==='/login'){
                    history.goBack()
                  }
                 
                 console.log('runned',userData?.state);
              }
            }


        }
       
        getData()
       
    },[])


    return (
      <AuthContext.Provider value = {{ authState, setAuthState,settings,setSettings } } > 
            { props.children }
      </AuthContext.Provider>
    )
})