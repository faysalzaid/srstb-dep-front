import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell,Button,Badge,TableContainer  } from '@windmill/react-ui';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import { AiFillEye } from 'react-icons/ai';
import {FaRegEdit} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { url } from 'config/urlConfig';



function BidSection({bid,project}) {
  const [contracts,setContracts] = useState([])


  return (
    <section  className="contracts-section p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-medium mb-4">Bids</h2>
      <TableContainer className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
          {bid.map((bids)=>
              <TableRow key={bids.id}>
                <TableCell >
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{bids.fullname}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm"></span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{bids.phone}</span>
                </TableCell>
           
                <TableCell>
                  <span className="text-sm">{bids.amount.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <Badge style={{color:bids.status==='signed'?'green':'red'}}>{bids.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                  <Link to={`/app/bids/${bids.id}`}>
                    <Button 
                     layout="link"
                     size="icon"
                     aria-label="View"
                     style={{color:'red'}}
                     >
                      <AiFillEye className="w-5 h-5" aria-hidden="true" /> 
                                       
                   </Button>
                   </Link>  
                    </div>
                    </TableCell>
                
                    </TableRow>
                    )}
  
                    </TableBody>
                    </Table>
                    </TableContainer>
                    
    </section>
  );
}

export default BidSection;
