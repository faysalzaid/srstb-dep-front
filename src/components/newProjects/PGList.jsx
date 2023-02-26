
import React, { useState, useEffect,Fragment } from 'react'

import CTA from '../CTA'
import InfoCard from '../Cards/InfoCard'
import ChartCard from '../Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../Chart/ChartLegend'
import PageTitle from '../Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import RoundIcon from '../RoundIcon'
import response from '../../utils/demo/tableData'
import { PlusCircleIcon } from "@heroicons/react/outline";

import {
  TableBody,
  TableContainer, 
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
} from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'




const PgList = () => {
    const {authState} = useContext(AuthContext)
    const [preview, setPreview] = useState(null);
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [projects,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  
    const [isOpen,setIsOpen] = useState(false)
    const closeModal = ()=>{
        setIsOpen(false)
    }
    const openModal = ()=>{
        setIsOpen(true)
    }
    const [formValues, setFormValues] = useState({
        customer: "",
        project: "",
        subject: "",
        contractValue: "",
        contractType: "",
        startDate: "",
        description: ""
      });

      const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        // handle form submission here
        // e.g. make an API call to save the form data
        closeModal();
      };

      

  
    // console.log('data from app',authState);
      useEffect(()=>{
      axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          console.log(resp.data.error);
        }
      setProject(resp.data.projects)
  
      },[])
  
  
  },[])
  
  
  useEffect(()=>{
    axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
      const data = resp.data
      setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
    })
  },[])
  
    // pagination setup

  
    // pagination change control

  
// Invoice Data  
const [rows, setRows] = useState([
    {
      customer: 'ABC Corp.',
      project: 'Project A',
      subject: 'Software Development',
      contractType: 'Fixed Price',
      startDate: '2022-01-01',
      endDate: '2022-03-31',
    },
    {
      customer: 'XYZ Inc.',
      project: 'Project B',
      subject: 'Website Redesign',
      contractType: 'Hourly',
      startDate: '2022-02-15',
      endDate: '2022-05-15',
    },
    {
      customer: '123 Co.',
      project: 'Project C',
      subject: 'Marketing Campaign',
      contractType: 'Fixed Price',
      startDate: '2022-03-01',
      endDate: '2022-06-30',
    },
  ]);



  const handleEdit = (index) => {
    // Implement your own edit logic here
    console.log(`Edit row ${index}`);
  };

  const handleFile = (e) => {
    if (e.target.files.length) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  // Delete row
  const handleDelete = (index) => {
    // Implement your own delete logic here
    console.log(`Delete row ${index}`);
    setRows((prevState) => prevState.filter((_, i) => i !== index));
  };


// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data

  
    return (
      <>
  
        <PageTitle>Contracts</PageTitle>
  
        {/* <CTA /> */}
        
        {/* <!-- Cards --> */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Projects " value={countsData.projectCount}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Bids Registered" value={countsData.bidCount}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Active Projects" value={countsData.activeProjects}>
            <RoundIcon
              icon={CartIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Completed Projects" value={countsData.completedProjects}>
            <RoundIcon
              icon={ChatIcon}
              iconColorClass="text-teal-500 dark:text-teal-100"
              bgColorClass="bg-teal-100 dark:bg-teal-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
  
        <TableContainer>
        {/* Calendar section */}
  
        <Button onClick={openModal}>New Project</Button>
  
        {/* end of calendar section */}
        </TableContainer>

        <Modal isOpen={isOpen} closeModal={closeModal}>
      <ModalHeader>Add Project</ModalHeader>
      <ModalBody>
      {preview ? (
              <img className="object-contain w-full h-48 mb-4" src={preview} alt="Preview" />
            ) : (
              <div className="flex justify-center items-center bg-gray-100 w-full h-48 mb-4">
                <div className="flex flex-col items-center justify-center space-y-1 text-center">
                  <PlusCircleIcon className="h-8 w-8 text-gray-400" />
                  <p className="text-gray-400 text-sm">Add an image</p>
                </div>
              </div>
            )}

        <div className="grid grid-cols-2 gap-4">
          <Label>
            <span>Customer</span>
            <Input
              className="mt-1"
              name="customer"
              value={formValues.customer}
              onChange={handleChange}
              required
            />
          </Label>

          <Label>
            <span>Project</span>
            <Input
              className="mt-1"
              name="project"
              value={formValues.project}
              onChange={handleChange}
              required
            />
          </Label>

          <Label>
            <span>Subject</span>
            <Input
              className="mt-1"
              name="subject"
              value={formValues.subject}
              onChange={handleChange}
              required
            />
          </Label>

          <Label>
            <span>Contract Value</span>
            <Input
              className="mt-1"
              name="contractValue"
              value={formValues.contractValue}
              onChange={handleChange}
              required
            />
          </Label>

          <Label>
            <span>Contract Type</span>
            <Select
              className="mt-1"
              name="contractType"
              value={formValues.contractType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a contract type</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="type3">Type 3</option>
            </Select>
          </Label>

          <Label>
            <span>Start Date</span>
            <Input
              type="date"
              className="mt-1"
              name="startDate"
              value={formValues.startDate}
              onChange={handleChange}
              required
            />
          </Label>

          <Label>
            <span>Description</span>
            <Textarea
              className="mt-1"
              name="description"
              value={formValues.description}
              onChange={handleChange} 
              required
            />
          </Label>
          <div className="grid grid-cols-1 gap-6">
              <div>
                <Label>
                  <span>Upload Image</span>
                  <Input type="file" accept=".jpg,.jpeg,.png,.gif" onChange={handleFile} />
               
                </Label>
              </div>
              

                </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button layout="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>


  
        


    <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Utilized Cost</TableCell>
              <TableCell>Financial Performance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit / Delete</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{project.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.startDate}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.endDate}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.totalCost.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.utilizedCost.toLocaleString()}</span>
                </TableCell>
             
                <TableCell>
                  <Badge type="danger">{project.financialPerformance}</Badge>
                </TableCell>
                <TableCell>
                  <Badge type="primary">{project.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/pglist/${project.id}`}>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      title="Edit"
                      
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <EditIcon />
                      </svg>
                    </Button>
                    </Link>
                    <Button 
                     layout="link"
                     size="icon"
                     aria-label="Delete"
                     title="Delete"
                     style={{color:'red'}}
                     >
                       <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <TrashIcon />

                      </svg>
                      
                    </Button>
                    </div>
                    </TableCell>
                    </TableRow>
            ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
                    


      </>
    )


   

}




export default PgList