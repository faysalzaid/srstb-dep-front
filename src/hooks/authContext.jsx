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



    const [authState, setAuthState] = useState({
        id: "",
        token: "",
        username: "",
        email: "",
        role: "",
        status: false,
        refreshToken: ""
    })

    useEffect(() => {
            const graphAuth = async() => {
                const cookie = getCookie('accessToken')
                if (!cookie || cookie == undefined) {
                    props.history.push('/login')
                    console.log('runned');
                }
                const decodeAccessToken = jwt_decode(cookie)
                let user = {}
                await axios.post(`${url}/login/refreshToken`, { token: decodeAccessToken ?.refreshToken }, { withCredentials: true }).then((resp) => {
                    if (resp.data.error) {
                        setAuthState({ id: "", token: "", username: "", email: "", role: "", status: false, refreshToken: "" })
                        props.history.push('/login')
                    } else {
                        const data = resp?.data
                        setCookie('accessToken', data.token)
                        setAuthState({ id: data ?.id, username: data?.username, email: data ?.email, role: data ?.role, state: true, refreshToken: data ?.refreshToken })

                    }
                })
            }
            graphAuth()


        }, [])
        // console.log('authcalled');

    return ( <AuthContext.Provider value = {
            { authState, setAuthState } } > { props.children }
             </AuthContext.Provider>
    )
})