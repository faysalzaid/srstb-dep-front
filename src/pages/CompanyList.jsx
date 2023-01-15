import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
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
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon,EditIcon, EyeIconOne, TrashIcon } from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import RoundIcon from '../components/RoundIcon'
import InfoCard from '../components/Cards/InfoCard'
import * as Yup from 'yup'
import  Alert  from '@windmill/react-ui'
import response from '../utils/demo/tableData'
import { AuthContext } from '../hooks/authContext'
import { useContext } from 'react'

// make a copy of the data, for the second table
const response2 = response.concat([])

function CompanyList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */


    //COMAPNY DATA STATES

    const [companyData,setCompanyData] = useState([])
    const [companyFormData,setCompanyFormData] = useState({name:"",location:""})
    const [errorMessage,setErrorMessage] = useState('')
    const [successMsg,setSuccessMsg] = useState('')
    const [countCp,setCountCp] = useState(0)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    //ENDOF COMPANY DATA
  // setup pages control for every table
  // const [pageTable1, setPageTable1] = useState(1)
  // const [pageTable2, setPageTable2] = useState(1)

  // // setup data for every table
  // const [dataTable1, setDataTable1] = useState([])
  // const [dataTable2, setDataTable2] = useState([])

  // // pagination setup
  // const resultsPerPage = 10
  // const totalResults = response.length

  // // pagination change control
  // function onPageChangeTable1(p) {
  //   setPageTable1(p)
  // }

  // // pagination change control
  // function onPageChangeTable2(p) {
  //   setPageTable2(p)
  // }

  // on page change, load new sliced data
  // here you would make another server request for new data
  // useEffect(() => {
  //   setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  // }, [pageTable1])

  // // on page change, load new sliced data
  // // here you would make another server request for new data
  // useEffect(() => {
  //   setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  // }, [pageTable2])
 


  const {isLoading,data} = useQuery(['company-data'],()=>{
    return axios.get('http://localhost:4000/companies').then((resp)=>resp.data)
  })

  let query = [];
  let count;



  


  const searchHandler = async(search)=>{
    setSearchTerm(search)
    if(search!==0){
      const newCompanyList = query?.filter((empl)=>{
        return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
      })
      // console.log(newEmployeeList);
      setSearchResult(newCompanyList)
    }else{
      setSearchResult(query)
    }
  }











  const addCompany =async(e)=>{
    e.preventDefault()
    // console.log(e.data);
    if(companyFormData.name==="" || companyFormData.location===""){
      setErrorMessage('Please Provide all data')
    }else{
     
      const response = await axios.post('http://localhost:4000/companies',companyFormData).then((resp)=>{
        if(resp.data.error){
          setErrorMessage(resp.data.error)
        }else{
          // console.log('added data',resp.data);
          query.push(resp.data)
          setCompanyFormData({name:"",location:""})
          setSuccessMsg('Successfully Registered')
          setTimeout(() => {
            setSuccessMsg("")
          }, 1000);
          closeModal()
        }
      })
    }

}
const deleteCompany =async(ids)=>{
  const newData =query.filter((c)=>c.id===ids)
  // console.log('new data ',newData[0]);
  // console.log(query.indexOf(newData[0]));
  const response = await axios.get(`http://localhost:4000/companies/delete/${ids}`).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
    }else{
      
      const newData = query.filter((c)=>c.id===ids)
      const rdata = query.indexOf(newData[0]);
      query.splice(rdata,1)
      setSuccessMsg('Successfully Deleted') 
      setTimeout(() => {
        setSuccessMsg("")
      }, 1000);
      // props.history.push('/app/companies')
    }
  })
}


  if(!isLoading){
    query = searchTerm.length<1?data?.company:searchResult
    count = data?.count
    console.log('data after loading',query);
  }




  return (
    <>
      <PageTitle>List of Companies Registered</PageTitle>
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
      {/* infCarf */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Companies" value={count}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      {/* End of Info Card */}


      <div>
        <Button onClick={openModal}>Add Company</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Insert Company Info</ModalHeader>
        <span style={{color:'red'}}>{errorMessage}</span>
        <ModalBody>
          
        <form onSubmit={e=>{addCompany(e)}}>
        <Label>
          <span>Name</span>
            <Input type="text" className="mt-1" name="name" placeholder="Company Name" value={companyFormData.name} autoComplete='off' onChange={e=>setCompanyFormData({...companyFormData, name:e.target.value})}/>
        </Label>
        <Label>
          <span>Location</span>
          <Input type="text" className="mt-1" name="location" placeholder="Jijiga"  value={companyFormData.location} onChange={e=>setCompanyFormData({...companyFormData,location:e.target.value})}/>
        </Label>
        <Button type="submit">Save</Button>
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
              <TableCell>Company Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {query.map((comp, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{comp.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{comp.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{comp.location}</span>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={{pathname:`/app/companies/${comp.id}`}}>
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    </Link>
                    <Button onClick={()=>deleteCompany(comp.id)} style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
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
  )
}

export default CompanyList
