import React, { useState, useEffect,useContext } from 'react'
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
import { EditIcon, EyeIconOne, TrashIcon,ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons' 
import InfoCard from '../components/Cards/InfoCard'   
import RoundIcon from '../components/RoundIcon'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { url } from '../config/urlConfig'
import { AuthContext } from '../hooks/authContext'
import * as Yup from 'yup'
import {Formik,Form,Field,ErrorMessage} from 'formik'

function ProjectListsDetail(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() { 
      setIsModalOpen(false)
    }

    const [companyData,setCompanyData] = useState([]) 
    const [projectLists,setProjectLists] = useState({})
    const [errorMessage,setErrorMessage] = useState('')
    const [projectForm,setProjectForm] = useState({name:"",status:"",description:"",year:""})
    const [toBeFilteredCompany,setToBeFilteredCompany] = useState([])
    const [projectsCount,setProjectCount] = useState(0)
    const [authState] = useContext(AuthContext)
    const [successMsg,setSuccessMsg] = useState("")
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])

    const {id} = useParams()
    
    
    useEffect(()=>{
            const date = new Date()
            let data = []
            const response = axios.get(`${url}/pr-list/${id}`).then((resp)=>{
              if(resp.data.error){
                
              }else{
                data = resp.data.prlist
                setProjectForm(resp.data)
                setProjectLists(resp.data)
                
              }
              
            })
            // console.log(response.data.error);
           
            // console.log(response.data);
        
      },[])





  const editProject =async(e)=>{
    e.preventDefault()
    console.log(projectForm);
    if(projectForm.name==="" || projectForm.status===""||projectForm.description===""||projectForm.year===""){
      setErrorMessage('Please Provide all data')
    }else{
       const response = await axios.post(`${url}/pr-list/${id}`,projectForm).then((resp)=>{
        console.log('New Data',resp.data);
        if(resp.data.error){
          setErrorMessage(resp.data.error)
        }else{
            setProjectLists(resp.data)
            setProjectForm(resp.data)
            setSuccessMsg("Successfully Registered")
            setTimeout(() => {
              setSuccessMsg("")
            }, 2000);
          closeModal()
        }
      })
    }

}

const validation = Yup.object().shape({
    name:Yup.string().min(3).max(15).required(),
    email:Yup.string().email().min(5).required("Email is required"),
    password:Yup.string().min(8).max(25).required()
})




const searchHandler = async(search)=>{
  setSearchTerm(search)
  if(search!==0){
    const newClientList = projectLists.filter((cli)=>{
      return Object.values(cli).join(" ").toLowerCase().includes(search.toLowerCase())
    })
    // console.log(newClientList);
    setSearchResult(newClientList)
  }else{
    setSearchResult(projectLists)
  }
}






const deleteProject =async()=>{
  const response = await axios.get(`http://localhost:4000/pr-list/delete/${id}`).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
    }else{
      setProjectLists({})
      setSuccessMsg("Successfully Deleted")
      setTimeout(() => {
        props.history.push('/app/pr-list')
        setSuccessMsg("")
      }, 1000);
      // props.history.push('/app/companies')
    }
  })
}

  
    return ( 
        <>
        <PageTitle>Projects with Name and Year</PageTitle>
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

        <InfoCard title="Total Projects" value={projectsCount}>
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
          <Button onClick={openModal}>Edit Project</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert Project List Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={editProject}>
          <Label>
            <span>Name</span>
              <Input type="text" value={projectForm.name} className="mt-1" name="name" placeholder="Full Name"  autoComplete='off' onChange={(e)=>setProjectForm({...projectForm,name:e.target.value})}/>
          </Label>
          <Label>
            <span>Year</span>
              <Input type="date" value={projectForm.year} className="mt-1" name="year" placeholder="Email"  autoComplete='off' onChange={(e)=>setProjectForm({...projectForm,year:e.target.value})}/>
          </Label>
          <Label>
          <span>description</span>
            <Textarea type="text" value={projectForm.description} className="mt-1" name="description" placeholder="Description"  autoComplete='off' onChange={e=>setProjectForm({...projectForm, description:e.target.value})}/>
        </Label>
        

          <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" value={projectForm.status} name="status"  onChange={(e)=>setProjectForm({...projectForm,status:e.target.value})}>
            <option>Select</option>
            <option>open</option>
            <option>closed</option>
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
        <div className="mt-6 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMsg}.</p>
      </div>:''}</SectionTitle>
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>status</TableCell> 
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{projectLists.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{projectLists.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{projectLists.year}</span>
                  </TableCell>
                  
                  
                  <TableCell>
                  <Badge type={projectLists.status==='active'?"success":"danger"}>{projectLists.status}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={{pathname:`/app/clients/${projectLists.id}`}}>
                   
                      </Link>
                      <Button onClick={()=>deleteProject(projectLists.id)} style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
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

export default ProjectListsDetail;