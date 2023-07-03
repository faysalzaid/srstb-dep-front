import axios from "axios";
import React, { lazy, useContext, useState } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { AuthContext } from "./hooks/authContext";
import getCookie from "./hooks/getCookie";
import { url } from "./config/urlConfig";
import Header from "./components/Header";
import { createContext } from "react";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/home";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import Chat from "./components/Chat/Chat";
import { ref } from "yup";
import setCookie from "hooks/setCookie";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";

const BlogPost = lazy(() => import("./components/Landing/BlogPost"));
const BlogPostDetail = lazy(() => import("./components/Landing/BlogDetail"));
const JobsBlog = lazy(() => import("./components/Landing/Jobs"));
const JobsDetail = lazy(() => import("./components/Landing/JobDetail"));
const ApplyJob = lazy(() => import("./components/Landing/ApplyJob"));

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});



function App(props) {
  let { authState, setAuthState } = useContext(AuthContext);

  // useEffect(()=>{
  //   if(!authState.state){
  //     props.history.push('/login')
  //   }

  // },[])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AccessibleNavigationAnnouncer />

        <Switch>

          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          <Route path="/login" exact component={Login} />
          <Route path="/reset-password/:id/:token" component={ResetPassword} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/headers" component={Header} />
          <Route path="/" exact component={BlogPost} />
          <Route path="/:id" component={BlogPostDetail} />
          <Route path="/jobs"  component={JobsBlog} />
          <Route path="/jobs/:id" exact component={JobsDetail} />
          <Route path="/jobs/:id/apply" exact component={ApplyJob} />
          {/* If you have an index page, you can remothis Redirect */} 
          {/* <Route path={'/'} component={HomePage} /> */}
          {/* <Redirect exact from="/" to="/login" /> */}
        </Switch>
      </QueryClientProvider>
    </>
  );
}

export default withRouter(App);


