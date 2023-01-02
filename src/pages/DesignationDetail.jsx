import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
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
import { EditIcon, EyeIconOne, TrashIcon } from '../icons'    
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { url } from '../config/urlConfig'
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'

function DesignationDetail(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    // const [companyData,setCompanyData] = useState([]) 
    const [desForm,setDestForm] = useState({name:""}) 
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState("")
    const [designationData,setDesignationData] = useState({})
    const [departmentData,setDepartmentData] = useState([])
    

    const {id} = useParams()

    const [authState] = useContext(AuthContext)

    
    useEffect(()=>{
        axios.get(`${url}/designations/${id}`).then((resp)=>{
            // console.log('designations',resp.data);
            setDesignationData(resp.data)
            setDestForm(resp.data)
        })
    },[])

    useEffect(()=>{
        axios.get(`${url}/departments`).then((resp)=>{
            console.log(resp.data);
            setDepartmentData(resp.data)
        })
    },[])


    const updateDesignation = async(e)=>{
      e.preventDefault()
    //   console.log('desform',desForm);
        
        // console.log(grappedDepartment.data);
        const request = {
            name:desForm.name,
        }
        // console.log('request',request);
        await axios.post(`${url}/designations/${id}`,request).then((resp)=>{
            setDesignationData(resp.data)
            closeModal()
            setSuccessMessage("Successfully Updated")
            setTimeout(() => {
              setSuccessMessage("")
            }, 2000);
          })
     

    }

    const deleteDesignation = ()=>{
      axios.get(`${url}/designations/delete/${id}`).then((resp)=>{
        if(resp.data.error){
            setErrorMessage(resp.data.error)
        }
        setDesignationData({})
        closeModal()
        setSuccessMessage("Successfully Deleted")
        setTimeout(() => {
          setSuccessMessage("")
          props.history.push('/app/designations')
        }, 1000);
      })
    }




    return ( 
        <>
        <PageTitle>{designationData.name}</PageTitle>
        <p></p>
        <div>
          <Button onClick={openModal}>Update Designation</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert Client Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={updateDesignation}>
          <Label>
            <span>Name</span>
              <Input type="text" className="mt-1" name="name" placeholder="Designation Name" value={desForm.name}  autoComplete='off' onChange={(e)=>setDestForm({...desForm,name:e.target.value})}/>
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
  
        <SectionTitle>Table with actions</SectionTitle>
        {successMessage?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMessage}.</p>
      </div>:''}
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{designationData.name}</p>
                        
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{departmentData.map((d)=>{return d.id===designationData.DepartmentId?d.name:""})}</p>
                       
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{designationData.createdAt}</p>
                       
                      </div>
                    </div>
                  </TableCell>


                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button onClick={deleteDesignation}  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
          
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

export default DesignationDetail;