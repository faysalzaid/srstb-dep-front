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

function Clientdetail(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {id} = useParams()
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    let [companyData,setCompanyData] = useState({}) 
    const [companList,setCompanList] = useState([])
    let [clientData,setClientData] = useState({})
    const [errorMessage,setErrorMessage] = useState('')
    const [frontEndMessage,setFrontEndMessage] = useState('')
    const [clientFormData,setClientFormData] = useState({})

    const [authState] = useContext(AuthContext)

    
    useEffect(()=>{
      let clientDatas ={}
        let response = axios.get(`${url}/clients/${id}`).then((resp)=>{
            if(resp.data.error){
                setFrontEndMessage(resp.data.error)
            }else{
              
                clientDatas=resp.data  
                setClientData(resp.data)
                setClientFormData(resp.data)
            }
            // console.count('helllooooo')
        }).then(()=>{
            let response =axios.get(`${url}/companies/${clientDatas.CompanyId}`).then((resp)=>{
      
              if(resp.data.error){
                  setFrontEndMessage(resp.data.error)
              }else{
             
                  let data = resp.data 
                  setCompanyData(resp.data)
              }
          })
          
        })
           
      },[])



      useEffect(()=>{
        const response = axios.get(`${url}/companies`).then((resp)=>{
            if(resp.data.error){
                setFrontEndMessage(resp.data.error)
            }else{
                setCompanList(resp.data.company)
            }
        }) 
      },[])


  const updateClient =async(e)=>{
    e.preventDefault()
    console.log(clientFormData);
    if(clientFormData.name==="" || clientFormData.email===""||clientFormData.phone===""||clientFormData.status===""||clientFormData.CompanyId===""){
      setErrorMessage('Please Provide all data')
    }else{
      let cpmd = {}
      const grappedCompany = await axios.get(`${url}/companies/name/${clientFormData.CompanyId}`).then((resp)=>{

        const request = {
          name:clientFormData.name,
          email:clientFormData.email,
          phone:clientFormData.phone,
          status:clientFormData.status,
          CompanyId:resp.data.id
        }
        cpmd = resp.data
        const response = axios.post(`${url}/clients/${id}`,request).then((resp)=>{
          // console.log(resp.data);
          if(resp.data.error){
            setErrorMessage(resp.data.error)
          }else{
              setClientData(resp.data)
              setFrontEndMessage('Successfully updated')
              setTimeout(() => {
                setFrontEndMessage('')  
              }, 2000);
             
              
              
            closeModal()
          }
        })

      }).then(()=>{
        setCompanyData(cpmd)
      })
    
    }

}
const deleteClient =async(ids)=>{
  const response = await axios.get(`${url}/clients/delete/${ids}`).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
    }else{
      setClientData({})
      setCompanyData({})
      setFrontEndMessage('Successfully deleted')
      setTimeout(() => {
        props.history.push('/app/clients')  
      }, 1000);
      
    }
  })
}

    return ( 
        <>
        <PageTitle>Client {clientData.name}</PageTitle>
        
        <div>
          <Button onClick={(e)=>{openModal(e)}}>update Client</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Update Client Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={updateClient}>
          <Label>
            <span>Name</span>
              <Input type="text" className="mt-1" name="name" placeholder="Full Name" value={clientFormData.name} autoComplete='off' onChange={(e)=>setClientFormData({...clientFormData,name:e.target.value})}/>
          </Label>
          <Label>
            <span>Email</span>
              <Input type="text" className="mt-1" name="email" placeholder="Email" value={clientFormData.email} autoComplete='off' onChange={(e)=>setClientFormData({...clientFormData,email:e.target.value})}/>
          </Label>
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Phone" value={clientFormData.phone} autoComplete='off' onChange={(e)=>setClientFormData({...clientFormData,phone:e.target.value})}/>
          </Label>

          <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" name="status" value={clientFormData.status} onChange={(e)=>setClientFormData({...clientFormData,status:e.target.value})}>
            <option>Select</option>
            <option>active</option>
            <option>disabled</option>
          </Select>
        </Label>
        <Label className="mt-4">
          <span>Company</span>
          <Select className="mt-1"  name="CompanyId" value={clientFormData.CompanyId} onChange={(e)=>setClientFormData({...clientFormData,CompanyId:e.target.value})}>
            <option>select another one</option>
                {companList.map((co)=>
                
                <option key={co.id}>{co.name}</option>
                )}
                
          </Select>
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
  
        <SectionTitle></SectionTitle>
        {frontEndMessage?
        <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="text-sm">{frontEndMessage}.</p>
      </div>:''}
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>company</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              
                <TableRow key={clientData.id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{clientData.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{clientData.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{clientData.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{clientData.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{companList.map((cp)=>cp.id===clientData.CompanyId?cp.name:"")}</span>
                  </TableCell>
                  <TableCell>
                  <Badge type={clientData.status==='active'?"success":"danger"}>{clientData.status}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button onClick={()=>deleteClient(clientData.id)}  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
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

export default Clientdetail;