import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
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
import { EditIcon,EyeIcon,EyeIconOne, TrashIcon } from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import * as Yup from 'yup'
import response from '../utils/demo/tableData'
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'

// make a copy of the data, for the second table
const response2 = response.concat([])

function CompanyDetail(props) {
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

    const {id} = useParams()
    
    //COMAPNY DATA STATES
    const [companyData,setCompanyData] = useState([])
    const [companyFormData,setCompanyFormData] = useState({name:"",location:""})
    const [errorMessage,setErrorMessage] = useState('')
    const [frontErrorMessage,setFrontErrorMessage] = useState('')

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
  const [authState] = useContext(AuthContext)

  useEffect(()=>{
    if(authState.state!==true){
      props.history.push('/login')
    }
  },[])

  useEffect(()=>{
    const companyFetch = async()=>{
        const response = await axios.get(`http://localhost:4000/companies/${id}`)
        if(response.data.error) setFrontErrorMessage(response.data.error)
        setCompanyData(response.data)
        setCompanyFormData({name:response.data.name,location:response.data.location})
        // console.log(response.data);
        // console.log('this is from params',id);
    }
    companyFetch()
  },[])


  const updateCompany =async(e)=>{
    e.preventDefault()
    // console.log(e.data);
    if(companyFormData.name==="" || companyFormData.location===""){
      setErrorMessage('Please Provide all data')
    }else{
      console.log('This is from formdata',companyFormData);
      const response = await axios.post(`http://localhost:4000/companies/${id}`,companyFormData).then((resp)=>{
        if(resp.data.error){
          setErrorMessage(resp.data.error)
        }else{
          setCompanyData(resp.data)
          closeModal()
        }
      })
    }

}
const deleteCompany =async()=>{
  const response = await axios.get(`http://localhost:4000/companies/delete/${id}`).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
    }else{
      props.history.push('/app/companies')
    }
  })
}
  return (
    <>
      <PageTitle>{companyData.name} page</PageTitle>

      <div>
        <Button onClick={openModal} style={{backgroundColor:'green'}}>Update Data</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Update Company Info</ModalHeader>
        <span style={{color:'red'}}>{errorMessage}</span>
        <ModalBody>
          
        <form onSubmit={e=>{updateCompany(e)}}>
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

      <SectionTitle>{frontErrorMessage}</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Company Name</TableCell>
              {/* <TableCell>Company</TableCell> */}
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            
              <TableRow key={companyData.id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{companyData.name}</p>
                      
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{companyData.location}</span>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    
                    <Button layout="link" size="icon" aria-label="Delete" onClick={deleteCompany}>
                      <TrashIcon style={{color:'red'}} className="w-5 h-5" aria-hidden="true" />
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
  )
}

export default CompanyDetail
