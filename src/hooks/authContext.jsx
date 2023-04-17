import axios from "axios";
import { createContext, useState } from "react";
import getCookie from "./getCookie";
import jwt_decode from 'jwt-decode'
import setCookie from "./setCookie";
import { url } from "config/urlConfig";
import { useEffect } from "react";
import { withRouter,useHistory } from "react-router-dom";

export const AuthContext = createContext("")







export const AuthContextProvider = withRouter((props) => {
    const cookie = getCookie('accessToken')
    const history = useHistory()
    // const navigate = useNavigate()
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

  let refreshingToken = false;

  jwtAxios.interceptors.request.use(
    async (config) => {
      // config here includes our headers
      let currentDate = new Date();
      let decodedToken = jwt_decode(userData?.token);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        if (!refreshingToken) {
          refreshingToken = true;
          console.log('calling graph auth function:::::::::::::::');
          await graphAuth();
          refreshingToken = false;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  



  


// End of jwt Response Interceptor


  jwtAxios.get(`${url}`)
  let isRefreshingTokenAuth = false;

  const graphAuth = async() => {
    // If token is already being refreshed, exit early to avoid infinite loop
    if (isRefreshingTokenAuth) {
      return;
    }
  
    // Set flag to indicate that token refresh is in progress
    isRefreshingTokenAuth = true;
  
    try {
      const cookie = getCookie('accessToken');
      if (!cookie || cookie === undefined) {
        history.push('/login');
        console.log('runned');
      }
      const decodeAccessToken = jwt_decode(userData.token);
      const resp = await axios.post(`${url}/login/refreshToken`, { withCredentials: true }, { token: decodeAccessToken ?.refreshToken });
      if (resp.data.error) {
        setAuthState({ id: "", token: "", username: "", email: "", role: "", status: false, refreshToken: "" });
        history.push('/login');
      } else {
        const data = resp?.data;
        const userData ={
          id: data.id,
          token: data.token,
          username: data.username,
          email: data.email,
          role: data.role,
          state: true,
          refreshToken: data.refreshToken
          // Add other properties as needed
        };
        const stringFied = JSON.stringify(userData);
        setCookie('accessToken',stringFied);
        setAuthState({ id: data ?.id, username: data?.username, email: data ?.email, role: data ?.role, state: true, refreshToken: data ?.refreshToken });
      }
    } catch (error) {
      console.error(error);
      // Handle error here
    } finally {
      // Reset flag to indicate that token refresh is complete
      isRefreshingTokenAuth = false;
    }
  };
  


useEffect(()=>{
    if(userData?.token||userData?.state){
        setAuthState({ id: userData.id, username: userData.username, email: userData.email, role: userData.role, state: userData.state, refreshToken: userData.refreshToken })
        if(history.length>1){
          history.goBack()
        }
        }else{
          history.push('/login')
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