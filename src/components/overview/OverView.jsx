import React from 'react'
import { RiSettings3Fill } from 'react-icons/ri'
import { ImCross } from 'react-icons/im'
import './overview.css'

function OverView({projects,setProject}) {

  return (
    <section className="overview-section show w-full">
    <div className="left-overview">
      <div>
        <span id="overview-title" className="text-lg font-bold">OVERVIEW</span>
      </div>
      <div className="project-overview">
        <div className="project-title">
          <ul>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Project #</p>
                <p className="font-bold">{projects.name}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Customer</p>
                <p id="customer" className="font-bold">Holo Company</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Billing Type</p>
                <p className="font-bold">Fixed Rate</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Total Rate</p>
                <p className="font-bold">{projects?.totalCost?.toLocaleString()}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Status</p>
                <p className="font-bold">{projects.status}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Date Created</p>
                <p className="font-bold">{projects.starttime}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Started Date</p>
                <p className="font-bold">{projects.starttime}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Deadline</p>
                <p className="font-bold">{projects.endtime}</p>
              </div>
            </li>
          
          </ul>
        </div>
        <div className="project-progress">
          <p className="font-medium">Project Progress</p>
          <div className="progress-container">
            <div className="circle-progress bg-black-500">
              <div className="progress-value font-bold text-black">{projects.physicalPerformance}%</div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-div">
        <span id="description-title" className="text-lg font-bold">Description</span>
        <p className="text-gray-500">No description for this project</p>
      </div>
      <div className="members-div">
        <div className="members-title flex items-center justify-between">
          <span className="text-lg font-bold">Members</span>
          <RiSettings3Fill id="setting-icon" className="text-gray-500" />
        </div>
        <div className="member-card-container">
          <div className="member flex items-center justify-between">
            <div className="member-left flex items-center">
              <div className="user-image w-10 h-10 rounded-full bg-gray">
                <span className='font-semibold'>Faysal Ali</span>
            </div>
            </div>
      
            </div>
            </div>
            </div>
            </div>
            <div className="right-overview">
      
      <div className="right-overview-div-2">
          <div className="expenses-div-container">
              <div className="expenses-div">
                  <p id="total-expenses">TOTAL EXPENSES</p>
                  <p className="expenses-cost">ETB0.00</p>
              </div>
              <div className="expenses-div">
                  <p id="billabe-expenses">BILLABE EXPENSES</p>
                  <p className="expenses-cost">ETB0.00</p>
              </div>
              <div className="expenses-div">
                  <p id="billed-expenses">BILLED EXPENSES</p>
                  <p className="expenses-cost">ETB0.00</p>
              </div>
              <div className="expenses-div">
                  <p id="unbilled-expenses">UNBILLED EXPENSES</p>
                  <p className="expenses-cost">ETB0.00</p>
              </div>
          </div>
      </div>
  </div>
  
  
            </section>
  
  )
}

export default OverView
