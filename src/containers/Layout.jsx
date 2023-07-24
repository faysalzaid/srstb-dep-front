import React, { useContext, Suspense, useEffect, lazy, useState } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from './Main'
import ThemedSuspense from '../components/ThemedSuspense'
import { SidebarContext } from '../context/SidebarContext'
import { AuthContext } from '../hooks/authContext'
import useAuth from 'hooks/useAuth'
import Footer from 'components/MainFooter/MainFooter'

const Page404 = lazy(() =>
    import ('../pages/404'))

function Layout() {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
    let location = useLocation()
    const {authState}=useAuth()
    const [newRoleRoutes,setNewRoleRoutes] = useState([])


   useEffect(()=>{
    const newRoute = routes
    if(authState.role=='admin'){  
      setNewRoleRoutes(routes)
      
    }else if(authState.role=='planning'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='planning'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='finance'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='finance'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='engineer'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='engineer'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='pRelation'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='pRelation'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='design'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='design'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='roadquality'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='roadquality'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='contractadmin'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='contractadmin'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='hr'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='hr'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='manager'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='manager'))  
      setNewRoleRoutes(n)
    }


   },[authState.role])
        // const [authState] = useContext(AuthContext)
    useEffect(() => {
        closeSidebar()
    }, [location])

    
    return ( 
      <div className = { `flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}` } >
          <Sidebar/>
  
          <div className = "flex flex-col w-full flex-1" >
          <Header/>
          <Main >
          <Suspense fallback = { < ThemedSuspense/>} >
          <Switch> {
            newRoleRoutes.map((route, i) => {
              return route.component ? ( 
                <Route key = { i }
                exact = { true }
                path = { `/app${route.path}` }
                render = {
                  (props) => <route.component {...props }/>}/>): null})
              } 
              <Redirect exact from = "/app"
              to = "/app/dashboard"/>
              <Route component = { Page404 }/> 
              </Switch> 
              </Suspense> 
              </Main> 
              <Footer/>
              </div>
              </div> 
          )
      }

    export default Layout