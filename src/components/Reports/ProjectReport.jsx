import React, { useState, useEffect, useContext } from 'react'
import PageTitle from '../Typography/PageTitle'
import SectionTitle from '../Typography/SectionTitle'
import axios from 'axios'
import { ErrorAlert, SuccessAlert } from "components/Alert";
import { SelectorIcon } from '@heroicons/react/solid'
import { FaCheckCircle, FaChevronDown, FaEdit, FaFilePdf, FaPlusCircle, FaRegMoneyBillAlt } from 'react-icons/fa'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {  
  Badge,
  Button
} from '@windmill/react-ui'


import { url } from '../../config/urlConfig'

import { AiFillDelete } from 'react-icons/ai';
import { FiChevronDown, FiChevronsUp, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';


function ReportsComponent(props) {

    const [budgets,setBudgets] = useState([])
    const [isExpanded, setIsExpanded] = useState(false);
    const [foundProject,setFoundProject] = useState([])

    const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" })
    const [openError, setOpenError] = useState({ open: false, message: "" });
  

    const getTheProject = async()=>{
      await axios.get(`${url}/projects/${projectId}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){

        }else{
          setFoundProject(resp.data)
          // console.log(resp.data);
        }
      })
    }


    // const [companyData,setCompanyData] = useState([]) 
    const [projectId,setProjectId] = useState(0)
    const [projectData,setProjectData] = useState([])
 

    useEffect(()=>{
      const getProjects =async()=>{
        await axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error) {
            
          }else{
            setProjectData(resp.data.projects)
            // console.log(resp.data.projects);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
      getProjects() 
    },[])

    return ( 
       <>
      <section  className="mt-4 contracts-section p-4 bg-white rounded-md shadow-md"> 
       <PageTitle>Generate Reports</PageTitle>
    
       


  
        <SectionTitle></SectionTitle>


          {/* Data section */}
          <h2 className="text-lg font-medium mb-2">Generate</h2>
      <div className="flex relative inline-flex">
        <select onChange={(e)=>setProjectId(e.target.value)} className="flex-2 mt-1 w-48 h-10 pl-3 pr-8 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option>All Projects</option>
          {projectData?.map((pr)=> <option value={pr.id} key={pr.id}>{pr.name}</option>)}
         
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <FaChevronDown className="text-gray-400" />
        </div>
      </div>
      <Button  onClick={()=>getTheProject()} className="ml-4 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={projectId===0?true:false}>
        Generate
      </Button>
          {/* End of data section */}


    





            <div className='flex'>
            <PageTitle >Report </PageTitle>
            <FaFilePdf className='mt-8 ml-6'/>
            </div>


{/* Render section */}
{/* First Table */}
<div className="flex flex-col ">
              <div className="-my-2 overflow-x-auto sm:-mx-9 lg:-mx-8">
                <div className="py-2 sm:px-9 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ProjectName
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Utilized Cost
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Place
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Start Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            End Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Cost
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phy.Performance
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fin.Performance
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Show
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">View details</span>
                          </th>
                        </tr>
                      </thead>
                     
                      <tbody className="bg-white divide-y divide-gray-200">
                      
                          <>
                            <tr >
                              <Link to={`/app/pglist/${foundProject.id}`}>
                              <td className="px-6 py-4 whitespace-nowrap">{foundProject?.name}</td>
                              </Link>
                              <td className="px-6 py-4 whitespace-nowrap">{foundProject?.utilizedCost?.toLocaleString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{foundProject?.place}</td>
                              <td className=" px-6 py-4 whitespace-nowrap" style={{color:'green'}}>{foundProject.starttime}</td>
                              <td className=" px-6 py-4 whitespace-nowrap" style={{color:'red'}}>{foundProject.endtime}</td>
                              <td className="px-6 py-4 whitespace-nowrap">ETB {foundProject?.totalCost?.toLocaleString()}</td>
                              {foundProject?.status==='completed'?
                              <td className="px-6 py-4 whitespace-nowrap"><Badge type="green">{foundProject?.status}</Badge> </td>
                              :<td className="px-6 py-4 whitespace-nowrap"><Badge type="danger">{foundProject?.status} </Badge></td>
                              }
                            
                            <td className=" px-6 py-4 whitespace-nowrap" style={{color:'blue'}}>{foundProject.physicalPerformance}%</td>
                              <td className=" px-6 py-4 whitespace-nowrap" style={{color:'blue'}}>{foundProject.financialPerformance}%</td>
                              <td className=" px-6 py-4 whitespace-nowrap" style={{color:"blue"}}><FaEdit className='ml-3'/></td>
                              
                            </tr>
                        
                          </>
                        
                              </tbody>
                        
                              </table>
                              </div>
                          </div>
                      </div>
                  </div>

{/* End of second table */}


{/* Second table */}
            <div className="flex flex-col ">
              <div className="-my-2 overflow-x-auto sm:-mx-9 lg:-mx-8">
                <div className="py-2 sm:px-9 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Allocated Budget
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Utilized Budget
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Remaining Budget
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Utilize
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Edit
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delete
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Expand
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">View details</span>
                          </th>
                        </tr>
                      </thead>
                      {foundProject?.yearlyBudgets?.map((row, rowIndex) => (
                      <tbody className="bg-white divide-y divide-gray-200" key={rowIndex}>
                      
                          <>
                            <tr >
                              <td className="px-6 py-4 whitespace-nowrap">{row.year}</td>
                              <td className="px-6 py-4 whitespace-nowrap">ETB {row.allocatedBudget.toLocaleString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap">ETB {row.utilizedBudget.toLocaleString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap">ETB {row.remainingBudget.toLocaleString()}</td>
                              {row.remainingBudget===0?
                              <td className="px-6 py-4 whitespace-nowrap"><Badge type="blue">Fully Paid</Badge> </td>
                              :<td className="px-6 py-4 whitespace-nowrap"><Badge type="danger">Partially </Badge></td>}
                              <td className=" px-6 py-4 whitespace-nowrap" style={{color:'green'}}><FaRegMoneyBillAlt className='ml-3' /></td>
                              <td className=" px-6 py-4 whitespace-nowrap" style={{color:"blue"}}><FaEdit className='ml-3'/></td>
                              <td className=" px-6 py-4 whitespace-nowrap" style={{color:'red'}}></td>
                              <td className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                  onClick={() => setIsExpanded(!isExpanded)}
                                >
                                  {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                </button>
                              </td>
                            </tr>
                            {isExpanded&&( 
                          <tr>
                          <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                  <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Utilized
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Created By
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Add To Payment
                                    </th>
                                    <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Delete
                                    </th>
                                    
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {row.bugetTracks?.map((detail, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-nowrap">{detail.date}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">ETB {detail.utilized.toLocaleString()}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">{detail.createdBy}</td>
                                    
                                      {detail.invoiced===0?
                                        <td className="px-6 py-4 whitespace-nowrap"><Badge type="danger">Invoice </Badge> </td>
                                        :<td className="px-6 py-4 whitespace-nowrap"><Badge><FaCheckCircle className='mt-1 mr-1'/>Invoiced </Badge></td>}
                                      <td style={{color:'red'}} className="mr-6 px-6"><AiFillDelete /></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>


                              
                            </div>
                          </td>
                        </tr>

                        )}
                        
                          </>
                        
                              </tbody>
                              ))}
                              </table>
                              </div>
                          </div>
                      </div>
                  </div>

{/* End of second table */}



{/* End of render section  */}



    </section>

      </>
     );
}

export default ReportsComponent;

