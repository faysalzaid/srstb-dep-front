import React, { useEffect } from 'react'
import routes from '../../routes/sidebar'
import { Link, NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui'
import useAuth from 'hooks/useAuth'
import { useState } from 'react'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}



function SidebarContent() {
  const {authState,settings} = useAuth()
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
    // else if(authState.role=='pRelation'){
    //   const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='pRelation'))  
    //   setNewRoleRoutes(n)
    // }
    // newRoute.filter((r)=>r.roles.find((r)=>r==='admin'))
    // console.log(newRoute.filter((r)=>r.roles.find((r)=>r==='admin'))); 
  },[authState.role])

 
  return (
    <div className="py-6  text-gray-100  bg-blue-600 min-h-screen overflow-y-auto">
      <Link className="ml-6 text-lg font-bold text-gray-100 dark:text-gray-200" to="#">
        {settings.name}
      </Link>
      <ul className="mt-6">
        {newRoleRoutes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-300 "
                activeClassName="text-gray-100 "
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-gray-100 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon}/>
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      {/* <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div> */}
    </div>
  )
}

export default SidebarContent
