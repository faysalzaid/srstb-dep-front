import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import axios from 'axios'

// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  SearchIcon,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, EyeIconOne, TrashIcon } from '../../icons'    
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { url } from '../../config/urlConfig'
import { useContext } from 'react'
import { AuthContext } from '../../hooks/authContext'
import TitleChange from 'components/Title/Title'
import useAuth from 'hooks/useAuth'
import { ErrorAlert, SuccessAlert } from "components/Alert";

function AreaList(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }


        // Notifications
        const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });

        const handleCloseSuccess = (event, reason) => {
          if (reason === "clickaway") {
            return;
          }
      
          setOpenSuccess({ open: false, message: "" });
        };
      
        const [openError, setOpenError] = useState({ open: false, message: "" });
      
        const handleCloseError = (event, reason) => {
          if (reason === "clickaway") {
            return;
          }
      
          setOpenError({ open: false, message: "" });
        };
    
        // End of notifications



    // const [companyData,setCompanyData] = useState([]) 
    const [desForm,setDestForm] = useState({name:""}) 
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState("")
    const [AreaData,setAreaData] = useState([])
    const [departmentData,setDepartmentData] = useState([])
    

    const {authState,settings} = useAuth(AuthContext)

    

    useEffect(()=>{
      const getData = async()=>{
        await axios.get(`${url}/area`,{withCredentials:true}).then((resp)=>{
         if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        //  console.log(resp.data);
          setAreaData(resp.data.area)
      }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
      }
        getData()

    },[])



    const addArea = async(e)=>{
      e.preventDefault()
    //   console.log('desform',desForm);
       
        const request = {
            name:desForm.name,
        }
        // console.log('request',request);
        await axios.post(`${url}/area`,request,{withCredentials:true}).then((resp)=>{
            if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
            setAreaData([...AreaData,resp.data])
            closeModal()
            setOpenSuccess({open:true,message:"Added Successfully"})
            
          }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                setOpenError({open:true,message:`${error.response.data.error}`});
              } else {
                setOpenError({open:true,message:"An unknown error occurred"});
              }
        })
     

    }

    const deleteArea = async()=>{
      await axios.delete(`${url}/area/delete/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
            setErrorMessage(resp.data.error)
        }
        const newdata = AreaData.filter((d)=>d.id!==isDeleteOpen.id)
        setAreaData(newdata)
        closeDelete()
        setOpenSuccess({open:true,message:"Successfully Deleted"})
        
      }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
    }


    const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

    const closeDelete = ()=>{
      setIsDeleteOpen(false)
  }
    const openDelete = (id)=>{
      setIsDeleteOpen({open:true,id:id})
  }
  

  




    return ( 
        <>


        <ErrorAlert
        open={openError.open}
        handleClose={handleCloseError}
        message={openError.message}
        horizontal="right"
      />
      <SuccessAlert
        open={openSuccess.open}
        handleClose={handleCloseSuccess}
        message={openSuccess.message}
        horizontal="right"
      />



        <PageTitle>List of Areas</PageTitle>
        <TitleChange name={`Areas | ${settings.name}`} />
        <div>
        <form>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        </div>
    </form>          
        </div>

        <div className='mt-5'>
          <Button onClick={openModal}>Register Area</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert Area Name</ModalHeader>
          <ModalBody>
            
          <form onSubmit={addArea}>
          <Label>
            <span>Name</span>
              <Input type="text" className="mt-1" name="name" placeholder="Designation Name"  autoComplete='off' onChange={(e)=>setDestForm({...desForm,name:e.target.value})}/>
          </Label>
          
          
        <Label className="mt-4">
          <Button type="submit">Save</Button>
        </Label>
          </form>
              
     
          </ModalBody>
          <ModalFooter>
            {/* I don't like this approach. Consider passing a prop to ModalFooter
             * that if present, would duplicate the buttons in a way similar to this.
             * Or, maybe find some way to pass something like size="large md:regular"
             * to Button
             */}
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
           
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large">
                Accept
              </Button>
            </div>
          </ModalFooter>
        </Modal>


           {/* Delete Confirm section */}
           <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteArea}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}
  

        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {AreaData.map((des, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{des.name}</p>
                        
                      </div>
                    </div>
                  </TableCell>
             
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{des.createdAt}</p>
                       
                      </div>
                    </div>
                  </TableCell>


                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={{pathname:`/app/area/${des.id}`}}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                      <Button onClick={()=>openDelete(des.id)}  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            {/* <Pagination
              // totalResults={totalResults}
              // resultsPerPage={resultsPerPage}
              // onChange={onPageChangeTable2}
              // label="Table navigation"
            /> */}
          </TableFooter>
        </TableContainer>
      </>
     );
}

export default AreaList;