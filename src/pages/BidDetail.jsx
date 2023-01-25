import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
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
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'
import { bidUrl, url } from 'config/urlConfig'

function BidDetail(props) {
    const {id} = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    const [companyData,setCompanyData] = useState([]) 
    const [bidsData,setBidData] = useState({})
    const [errorMessage,setErrorMessage] = useState('')
    const [bidFormData,setBidFormData] = useState({fullname:"",phone:"",license:"",status:"",performa:"",proposal:"",companydoc:"",amount:"",bidUserPic:"",ProjectId:"",UserId:""})
    const [frontErrorMessage,setFrontErrorMessage] = useState("")
    const [successMessage,setSuccessMessage] = useState("")
    const [projects,setProjects] = useState([])
    const [ users,setUsers] = useState([])
    const [authState] = useContext(AuthContext)

    




    useEffect(()=>{
        const bidsFetch = async()=>{
            const response = await axios.get(`${url}/bids/${id}`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) setErrorMessage(resp.data.error);
              // console.log('from the main response',resp.data);
              setBidData(resp.data)
              setBidFormData(resp.data)
            //   console.log('from bidformdata',bidFormData);
              
            }).catch((err)=>{
              console.log(err.response);
            })
            // console.log(response.data);
        }
        axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setErrorMessage(resp.data.error)
          }else{

            setProjects(resp.data.projects)}
          
        })

        axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            console.log(resp.data.error);
          }else{
            setUsers(resp.data)
          }
        })


        bidsFetch()
        console.count('useEffect runned');  
      },[])
      


  const editBid =async(e)=>{
    e.preventDefault()
    
    if(bidFormData.fullname==="" || bidFormData.phone===""||bidFormData.license===""||bidFormData.status===""||bidFormData.performa===""||bidFormData.proposal===""||bidFormData.companydoc===""||bidFormData.amount==="",bidFormData.bidUserPic==="",bidFormData.ProjectId===""||bidFormData.UserId===""){
      setErrorMessage('Please Provide all data')
    }else{

      const PrId = bidFormData.ProjectId
      const UsrId = bidFormData.UserId
      let newPrId;
      let newUsrId;
      if(PrId!=bidsData.ProjectId){
        const projectNameToId = await axios.get(`${url}/projects/name/${PrId}`)
        newPrId = projectNameToId.data.id
      } else{
        newPrId = bidFormData.ProjectId
      }
      if(UsrId!=bidsData.UserId){
        const userNameToId = await axios.get(`${url}/users/name/${UsrId}`,{withCredentials:true})
        newUsrId = userNameToId.data.id
        console.log('the new id is ',newUsrId);
      }else{
        newUsrId = bidFormData.UserId
      }
      const formData = new FormData()
      formData.append('fullname',bidFormData.fullname)
      formData.append('phone',bidFormData.phone)
      formData.append('license',bidFormData.license)
      formData.append('status',bidFormData.status)
      formData.append('performa',bidFormData.performa)
      formData.append('proposal',bidFormData.proposal)
      formData.append('companydoc',bidFormData.companydoc)
      formData.append('amount',bidFormData.amount)
      formData.append('bidUserPic',bidFormData.bidUserPic)
      formData.append('ProjectId',newPrId)
      formData.append('UserId',newUsrId)
      console.log(formData);
       const response = await axios.post(`http://localhost:4000/bids/${id}`,formData,{withCredentials:true}).then((resp)=>{
        console.log('From resp.data',resp.data);
        if(resp.data.error){
          setErrorMessage(resp.data.error)
        }else{
            const rfs = resp.data
            setBidData(rfs)
            // setBidFormData(rfs)
            console.log(resp.data);
            closeModal()
            // props.history.push(`../../app/bids/${id}`)
            setSuccessMessage("Successfully Updated")
            setTimeout(() => {
            setSuccessMessage("")
         }, 2000)
        }
      }).catch((err)=>{
        console.log(err);
      })
    }

}
        const deleteBid =async(ids)=>{
          const response = await axios.get(`http://localhost:4000/bids/delete/${ids}`).then((resp)=>{
            
            if(resp.data.error){
              setErrorMessage(resp.data.error)
            }else{
              setBidData("")  
              setSuccessMessage("Successfully deleted")
              setTimeout(() => {
                props.history.push('/app/bids')
              }, 2000);

              // props.history.push('/app/companies')
            }
          })
        }

    return ( 
      
        <>
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
        <PageTitle>Bid From {bidsData.fullname}</PageTitle>
        
        <div>
          <Button onClick={openModal}>Edit Bid</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert Client Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={editBid} encType="multipart/form-data">
          <Label>
            <span>Fullname</span>
              <Input type="text" className="mt-1" name="fullname" placeholder="Full Name" value={bidFormData.fullname} autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,fullname:e.target.value})}/>
          </Label>
          <Label className="mt-4">
          <span>Project Name</span>
          <Select className="mt-1" name="ProjectId" value={bidFormData.ProjectId} onChange={(e)=>setBidFormData({...bidFormData,ProjectId:e.target.value})}>
          <option>{projects.map((pr)=>pr.id==bidsData.ProjectId?pr.name:"")}</option>
          {projects.map((pr)=>{return  <option>{pr.name}</option>})}
            
          </Select>
        </Label>
        <Label className="mt-4">
          <span>User</span>
          <Select className="mt-1" name="UserId" value={bidFormData.UserId} onChange={(e)=>setBidFormData({...bidFormData,UserId:e.target.value})}>
          <option>{users.map((usr)=>usr.id==bidsData.UserId?usr.name:"")}</option>
          {users.map((usr)=>{return  <option>{usr.name}</option>})}
           
            
          </Select>
        </Label>
         
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Phone" value={bidFormData.phone} autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,phone:e.target.value})}/>
          </Label>
          <Label>
            <span>Amount</span>
              <Input type="number" className="mt-1" name="amount" value={bidFormData.amount}  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,amount:e.target.value})}/>
          </Label>
          <Label>
            <span>License</span>
              <Input type="file" className="mt-1" name="license"   onChange={(e)=>setBidFormData({...bidFormData,license:e.target.files[0]})}/>
          </Label>

          <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" name="status" value={bidFormData.status} onChange={(e)=>setBidFormData({...bidFormData,status:e.target.value})}>
          <option>Select</option>
            <option>processing</option>
            <option>approved</option>
            <option>rejected</option>
            
          </Select>
        </Label>
        <Label>
            <span>Performa</span>
              <Input type="file" className="mt-1" name="performa"   onChange={(e)=>setBidFormData({...bidFormData,performa:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Proposal</span>
              <Input type="file" className="mt-1" name="proposal"   onChange={(e)=>setBidFormData({...bidFormData,proposal:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>CompanyDoc</span>
              <Input type="file" className="mt-1" name="companydoc"  onChange={(e)=>setBidFormData({...bidFormData,companydoc:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Bid Owner Pic</span>
              <Input type="file" className="mt-1" name="bidUserPic" onChange={(e)=>setBidFormData({...bidFormData,bidUserPic:e.target.files[0]})}/>
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
        {successMessage?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMessage}.</p>
      </div>:''}
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Full Name</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              
                <TableRow key={bidsData.id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{bidsData.fullname}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{bidsData.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{projects.map(pr=>pr.id===bidsData.ProjectId?pr.name:"")}</p>
                        {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{users.map(usr=>usr.id===bidsData.UserId?usr.name:"")}</p>
                        {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{bidsData.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">birr {bidsData.amount}</span>
                  </TableCell>
                  
                  <TableCell>
                  <Badge type={bidsData.status==='approved'?"success":"danger"}>{bidsData.status}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      
                      <Button onClick={()=>deleteBid(bidsData.id)}  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
            
            </TableBody>
          </Table>
          <InfoCard>
          <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          <div className="sm:flex sm:items-center px-6 py-4">
            <a href={`${bidsData.license}`} target="_blank">
                <div className="mt-4 mb-4">
                    <button className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">license</button>
                </div>
                <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24" src={`${bidsData.license}`} alt="Not found Img"/>
                
            </a>
                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                </div>
            </div>

            <div className="sm:flex sm:items-center px-6 py-4">
            <a href={`${bidsData.performa}`} target="_blank">
                <div className="mt-4 mb-4">
                    <button className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">Performa</button>
                </div>
                <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24" src={`${bidsData.performa}`} alt="Not found Img"/>
            </a>
                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                </div>
            </div>

            <div className="sm:flex sm:items-center px-6 py-4">
            <a href={`${bidsData.proposal}`} target="_blank">
                <div className="mt-4 mb-4">
                    <button className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">Proposal</button>
                </div>
                <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24" src={`${bidsData.proposal}`} alt="Not found Img"/>
            </a>
                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                </div>
            </div>


            <div className="sm:flex sm:items-center px-6 py-4">
            <a href={`${bidsData.companydoc}`} target="_blank">
                <div className="mt-4 mb-4">
                    <button className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">Company Docs</button>
                </div>
                <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24" src={`${bidsData.companydoc}`} alt="Not found Img"/>
            </a>
                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                </div>
            </div>
            </div>
          
        </InfoCard>
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

export default BidDetail;