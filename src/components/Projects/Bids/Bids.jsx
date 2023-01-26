import { purple } from '@mui/material/colors';
import React, {useEffect, useState} from 'react'
import './bids.scss';
import {TbListSearch} from 'react-icons/tb';
import {IconButton} from '@mui/material';
import ShowDetail from './ShowDialog';
import {IoMdCall} from 'react-icons/io';

export const Bids = ({showInterface, setSelectedWinner}) => {
  let [bids, setBids] = useState([
    {
        id: 1,
        name: "Ousman Seid",
        phone: "+251921114160",
        amount: 51345,
        status:1,
        license: "http://www.pdf995.com/samples/pdf.pdf",
        performa: "http://www.pdf995.com/samples/pdf.pdf",
        proposal: "http://www.pdf995.com/samples/pdf.pdf",
        company: "http://www.pdf995.com/samples/pdf.pdf"
    },
    {
        id: 2,
        name: "Faysal Ali",
        phone: "+251928124254",
        amount: 23643,
        status:1,
        license: "http://www.pdf995.com/samples/pdf.pdf",
        performa: "http://www.pdf995.com/samples/pdf.pdf",
        proposal: "http://www.pdf995.com/samples/pdf.pdf",
        company: "http://www.pdf995.com/samples/pdf.pdf"
    },
    {
        id: 3,
        name: "Khadar Baxar",
        phone: "+251910342343",
        amount: 53235,
        status: 1,
        license: "http://www.pdf995.com/samples/pdf.pdf",
        performa: "http://www.pdf995.com/samples/pdf.pdf",
        proposal: "http://www.pdf995.com/samples/pdf.pdf",
        company: "http://www.pdf995.com/samples/pdf.pdf"
    },

  ]);

  const statuses = [
    {
        id: 1,
        name: "processing"
    },
    {
        id: 2,
        name: "approved"
    }
  ]
  
  const [open, setOpen] = useState({show: false, id: 0});

  const handleClickOpen = (id) => {
    let bidDetail = {};
    bids.map((bid)=>{
        if(bid.id === id) {
            bidDetail = bid;
        }
    })
    setOpen({show: true, bidDetail: bidDetail});
  };

  const handleClose = () => {
    setOpen({show: false, id: 0});
  };

  const selectBid = (id) => {
     let bds = bids;
     bds = bds.map((bd)=>bd.id===id ? {...bd, status: 2} : {...bd, status: 1});
     setBids(bds);
  }


  useEffect(()=>{
    bids.map((bd)=> {
        if(bd.status===2) setSelectedWinner(bd.name)
    })
  },[bids])

  return (
    <div className='crud-container-bid mt-5' style={{height:showInterface?'auto':0, display: showInterface?"block": "none"}}>
        <ShowDetail open={open.show} handleClose={handleClose} bidDetail={open.bidDetail} statuses={statuses} callBack={selectBid}/>
        <table style={{minWidth: 700, overflowX: 'scroll'}} >
            
            <tbody className='dark:border-gray-400'>
                {bids.length <= 0 && 
                  <tr>
                    <td></td>
                    <td></td>
                    <td align='left' style={{minWidth: '300px', height: 100, clear:'both'}} className="dark:text-gray-200">
                        No Data
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                }
                {bids.map((bid, index)=>{

                    let stts = "";
                    const color = {text: bid.status === 1 ? "#cd3232" : "#046c4e", bg: bid.status===1 ? "#fde8e8" : "#def7ec"}
                    statuses.map((st)=>{
                        if(st.id === bid.status) {
                            stts = <div className='stts' style={{backgroundColor: color.bg, color: color.text}}>{st.name}</div>;
                        }
                    })
                    return (
                        <tr className='dark:border-transparent'>
                            <td className='td-year'>    
                                <div className='crud-title'>
                                <p 
                                    style={{paddingLeft: 10, textShadow: "0.3px 0.3px purple"}}
                                    className="dark:text-gray-100 font-bold text-orange-400">{bid.name}
                                </p>
                                </div>
                            </td>
                            <td className='td-allocated'>    
                            <div className='crud-title flex items-center'>
                                <IoMdCall fontSize={15} color="green"/>
                                <p 
                                    style={{paddingLeft: 5}}
                                    className="dark:text-gray-100 text-purple-500">{bid.phone}
                                </p>
                                </div>
                            </td>
                            <td className='td-utilized'>    
                                <div className='crud-title'>
                                    <p 
                                        style={{paddingLeft: 10}}
                                        className="dark:text-gray-100 text-pink-500">{parseFloat(bid.amount).toLocaleString()+" ETB"}
                                    </p>
                                </div>
                            </td>
                            <td className='td-remaining'>
                            <div className='crud-title'>
                                <p 
                                    style={{paddingLeft: 10}}
                                    className="dark:text-gray-100">{stts}
                                </p>
                                </div>
                            </td>
                            <td align='center'>
                                <IconButton
                                  onClick={()=>{
                                    handleClickOpen(bid.id);
                                  }}
                                >
                                   <TbListSearch className='text-blue-400 dark:text-gray-100'/>
                                </IconButton>
                            </td>
                           
                        </tr>
                    );
                })}
               
            </tbody>            
        </table>
    </div>
  )
}
export default Bids;
