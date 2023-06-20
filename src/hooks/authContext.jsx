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
        image:"",
        state: false,
        refreshToken: ""
    })


  let jwtAxios = axios.create()

  let refreshingToken = false;

  jwtAxios.interceptors.request.use(
    async (config) => {
      try {
        let currentDate = new Date();
        let decodedToken;
        try {
          decodedToken = jwt_decode(userData?.token);
        } catch (error) {
          return config
        }
        // if(decodedToken === undefined) console.log('what');
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          if (!refreshingToken) {
            refreshingToken = true;
            console.log('calling graph auth function:::::');
            await graphAuth(config).catch((error) => {
              // Handle error from graphAuth() appropriately
              console.error('Error in graphAuth:', error);
              throw error; // Rethrow the error to reject the promise
            });
            refreshingToken = false;
            // return newConfig;
          }
        }
        return config;
      } catch (error) {
        // Handle other potential errors appropriately
        // console.error('Error in request interceptor:', error);
        return Promise.reject(error);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  




  
// End of jwt Response Interceptor


  jwtAxios.get(`${url}`)
  let isRefreshingTokenAuth = false;

  
  const graphAuth = async(config) => {
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
        // console.log('runned');
      }
      const decodeAccessToken = jwt_decode(userData.token);
      // console.log(decodeAccessToken?.id);
      const resp = await jwtAxios.post(`${url}/login/refreshToken`, { id: decodeAccessToken?.id,refreshToken:decodeAccessToken?.refreshToken });
      // console.log(resp.data);
      const data = resp?.data;
      const usersData ={
        id: data.id,
        token: data.token,
        username: data.name,
        email: data.email,
        image:data.image,
        role: data.role,
        state: true,
        refreshToken: data.refreshToken
        // Add other properties as needed
      };
      const stringFied = JSON.stringify(usersData);
      setCookie('accessToken',stringFied);
      // userData=userData
      setAuthState({ id: data?.id, username: data?.name,email: data?.email,image:data?.image,role:data?.role,state:true,refreshToken:data?.refreshToken });
      config.headers.Authorization = `Bearer ${data.token}`; // update the headers with the new token
    } catch (error) {
      // console.error(error);
      // setAuthState({ id: "", token: "", username: "", email: "",image:"", role: "", state: false, refreshToken: "" });
    }
  }
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
              setAuthState({ id:userData.id,username:userData.username, email:userData.email,image:userData.image, role:userData.role,state:true,refreshToken:userData.refreshToken })
              if(props.history.length>0){
                  // console.log(props.history);
                  if(history.location.pathname==='/login'){
                    history.goBack()
                  }
                 
                 console.log('runned',userData.state);
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