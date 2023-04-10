import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import './invoice.css';
import {  Badge,Button} from  '@windmill/react-ui'
import useAuth from 'hooks/useAuth';
import { AuthContext } from 'hooks/authContext';
function NewInvoice({invoiceData,mode,project}) {


const printSectionRef = useRef(null);
const {settings,authState} = useAuth(AuthContext)
const printSection = () => {
  const printContents = printSectionRef.current.innerHTML;
 
//   console.log(printContents);
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
};





    return (<>
          
   
      <div ref={printSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Invoice #{invoiceData?.id?.slice(0,5)}</h1><div className=''> <FaPrint onClick={printSection}/></div>

      <hr className="my-8" />

      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold mb-2">{settings.name}</h2>
          <p>{settings.address1}.</p>
          <p>{settings.address2}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Representative</h2>
          <p>John Doe</p>
          <p>john.doe@example.com</p>
          <p>(123) 456-7890</p>
        </div>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-2">Payment Info</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Invoiced Amount</th>
              <th className="px-4 py-2 border">Created By</th>
             
            </tr>
          </thead>
          <tbody>
            {invoiceData?.payments?.map((payment, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{payment.date}</td>
                <td className="px-4 py-2 border">ETB {payment.amountReceived.toLocaleString()}</td>
                <td className="px-4 py-2 border">{payment.createdBy}</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-8" />

      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">Project Name</h2>
          <p>{project.map((pr)=>pr.id===invoiceData.ProjectId?pr.name:"")}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Price</h2>
          <p><Badge>Total</Badge>ETB {project.map((pr)=>pr.id===invoiceData?.ProjectId?pr.totalCost.toLocaleString():"")}</p>
          <p><Badge style={{color:'red'}}>Due Amount</Badge>: ETB {invoiceData?.amountDue?.toLocaleString()}</p>
        </div>
      </div>
    </div>
    
    
    
    </>  );
}

export default NewInvoice;