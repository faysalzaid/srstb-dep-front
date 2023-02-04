import { createContext, useState } from "react";


export const AuthContext = createContext("")

export const AuthContextProvider = props=>{
    const [authState,setAuthState] = useState({
        id:"",token:"",username:"",email:"",role:"",status:false,refreshToken:""
    })
    // console.log('authcalled');

    return (
        <AuthContext.Provider value={[authState,setAuthState]}>
            {props.children}
        </AuthContext.Provider>
    )
}