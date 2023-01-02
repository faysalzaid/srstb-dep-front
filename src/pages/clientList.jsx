import React, { useState, useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
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
import { EditIcon, EyeIconOne, TrashIcon,ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons' 
import InfoCard from '../components/Cards/InfoCard'   
import RoundIcon from '../components/RoundIcon'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { url } from '../config/urlConfig'
import { AuthContext } from '../hooks/authContext'

function ClientList(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    const [companyData,setCompanyData] = useState([]) 
    const [clientData,setClientData] = useState([])
    const [errorMessage,setErrorMessage] = useState('')
    const [clientFormData,setclientFormData] = useState({name:"",email:"",phone:"",status:"",CompanyId:""})
    const [toBeFilteredCompany,setToBeFilteredCompany] = useState([])
    const [clientsCount,setClientsCount] = useState(0)
    const [authState] = useContext(AuthContext)
    const [successMsg,setSuccessMsg] = useState("")
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])

    
    useEffect(()=>{
        
            const response = axios.get('http://localhost:4000/clients').then((resp)=>{
              if(resp.data.error){
                
              }else{
                setClientData(resp.data.clients)
                setClientsCount(resp.data.count)
              }
              
            })
            // console.log(response.data.error);
           
            // console.log(response.data);
        
      },[])

      useEffect(()=>{
        const companyFetch = async()=>{
            const response = await axios.get(`${url}/companies`)
            setCompanyData(response.data.company)
            // console.log(response.data);
        }
        companyFetch()
      },[])


    useEffect(()=>{
      setFetchedResult(searchTerm.length<1?clientData:searchResult)
    },[clientData,searchTerm])

  const addClient =async(e)=>{
    e.preventDefault()
    // console.log(clientFormData);
    if(clientFormData.name==="" || clientFormData.email===""||clientFormData.phone===""||clientFormData.status===""||clientFormData.CompanyId===""){
      setErrorMessage('Please Provide all data')
    }else{
       const grappedCompany = await axios.get(`http://localhost:4000/companies/name/${clientFormData.CompanyId}`)
    //    console.log('From grapped company',grappedCompany.data.id);
    //    setclientFormData({...clientFormData,CompanyId:grappedCompany.data.id})
      const request = {
        name:clientFormData.name,
        email:clientFormData.email,
        phone:clientFormData.phone,
        status:clientFormData.status,
        CompanyId:grappedCompany.data.id
      }
       console.log('after company data',clientFormData);
       const response = await axios.post('http://localhost:4000/clients',request).then((resp)=>{
        console.log(resp.data);
        if(resp.data.error){
          setErrorMessage(resp.data.error)
        }else{
            setClientData([...clientData,resp.data])
            setclientFormData({name:"",email:"",phone:"",status:"",CompanyId:""})
            setSuccessMsg("Successfully Registered")
            setTimeout(() => {
              setSuccessMsg("")
            }, 1000);
          closeModal()
        }
      })
    }

}




const searchHandler = async(search)=>{
  setSearchTerm(search)
  if(search!==0){
    const newClientList = clientData.filter((cli)=>{
      return Object.values(cli).join(" ").toLowerCase().includes(search.toLowerCase())
    })
    // console.log(newClientList);
    setSearchResult(newClientList)
  }else{
    setSearchResult(clientData)
  }
}






const deleteClient =async(ids)=>{
  const response = await axios.get(`http://localhost:4000/clients/delete/${ids}`).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
    }else{
      const newData = clientData.filter((c)=>c.id!==ids)
      setClientData(newData)
      setSuccessMsg("Successfully Deleted")
      setTimeout(() => {
        setSuccessMsg("")
      }, 1000);
      // props.history.push('/app/companies')
    }
  })
}

    return ( 
        <>
        <PageTitle>List of Clients Registered</PageTitle>
              {/* Search section */}
      <div className='mb-5'>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Companies, Locations..." required />
        </div>
            
        </div>
        {/* End of search List */}
        {/* Info cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

        <InfoCard title="Total Clients" value={clientsCount}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
        {/* End of Info cards */}
        <div>
          <Button onClick={openModal}>Register Client</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert Client Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={addClient}>
          <Label>
            <span>Name</span>
              <Input type="text" className="mt-1" name="name" placeholder="Full Name" value={clientFormData.name} autoComplete='off' onChange={(e)=>setclientFormData({...clientFormData,name:e.target.value})}/>
          </Label>
          <Label>
            <span>Email</span>
              <Input type="text" className="mt-1" name="email" placeholder="Email" value={clientFormData.email} autoComplete='off' onChange={(e)=>setclientFormData({...clientFormData,email:e.target.value})}/>
          </Label>
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Phone" value={clientFormData.phone} autoComplete='off' onChange={(e)=>setclientFormData({...clientFormData,phone:e.target.value})}/>
          </Label>

          <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" name="status" value={clientFormData.status} onChange={(e)=>setclientFormData({...clientFormData,status:e.target.value})}>
            <option>Select</option>
            <option>active</option>
            <option>disabled</option>
          </Select>
        </Label>
        <Label className="mt-4">
          <span>Company</span>
          <Select className="mt-1"  name="CompanyId" value={clientFormData.CompanyId} onChange={(e)=>setclientFormData({...clientFormData,CompanyId:e.target.value})}>
            <option>Select Company</option>
            {companyData.map(co=>
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
  
        <SectionTitle>{successMsg?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMsg}.</p>
      </div>:''}</SectionTitle>
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {fetchedResult.map((client, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{client.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{client.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{client.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span>{companyData.map((c)=>{return c.id===client.CompanyId?c.name:""})}</span>
                  </TableCell>
                  <TableCell>
                  <Badge type={client.status==='active'?"success":"danger"}>{client.status}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={{pathname:`/app/clients/${client.id}`}}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                      <Button onClick={()=>deleteClient(client.id)} style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
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

export default ClientList;