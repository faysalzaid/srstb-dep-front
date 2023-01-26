import { purple } from '@mui/material/colors';
import React, {useState} from 'react'
import './budgets.scss';
import { MdAdd } from 'react-icons/md';
import { CustomDatePicker, EditableText } from "../Inputs/EditableInputs";
import {MdDeleteOutline} from 'react-icons/md';
import {IconButton} from '@mui/material';
import DeleteDialog from './DeleteConfirm';

export const Budgets = ({budget,setBudget}) => {
  let [budgets, setBudgets] = useState([
    {
        id: 1,
        year: "2015",
        budgetAllocated: 36858098,
        budgetUtilized: 0,
    },
    {
        id: 2,
        year: "2016",
        budgetAllocated: 139604778,
        budgetUtilized: 111352200,
    },
  ]);
 
  const [show, setShow] = useState({add: false, edit: false});
  const [selected, setSelected] = useState({});

  const [addBudget, setAddBudget] = useState({
    year: {value: "", error: "", optional: false},
    budgetAllocated: {value: "", error: "", optional: false},
    budgetUtilized: {value: "", error: "", optional: false},
  });
  const [editBudget, setEditBudget] = useState({
    year: {value: "", error: "", optional: false},
  })

  function callBackFuncEdit(value, label, escape = false) {
    if(escape) {
        setSelected({});
        return;
    }
    var data = {[label]: value}
    if(value !== editBudget[label]) {
        //console.log('budget new:',text);
        //console.log(editBudget.id);
    //    update data to server .then
    }

    setBudgets(budgets.map(budget=>budget.id ===editBudget.id ? {...budget, [label]: value} : budget))
    setSelected({});
  }

  const handleDeleteCallBack = (id) => {
     const bd = budgets.filter(b=>b.id !== id);
     setBudgets(bd);
  }

  const [open, setOpen] = useState({show: false, id: 0});

  const handleClickOpen = (id) => {
    setOpen({show: true, id: id});
  };

  const handleClose = () => {
    setOpen({show: false, id: 0});
  };

  return (
    <div className='crud-container-budget' style={{minWidth: 700}}>
        <DeleteDialog open={open.show} handleClose={handleClose} id={open.id} callBack={handleDeleteCallBack}/>
        <table>
            <thead className='dark:border-gray-400'>
                <tr>
                    <th align="center">Year</th>
                    <th align="left">Budget Allocated</th>
                    <th align='left'>Budget Utilized</th>
                    <th align='left'>Budget Remaining</th>
                    <th align='center'>Actions</th>

                </tr>
            </thead>
            <tbody className='dark:border-gray-400'>
                {budgets.length <= 0 && 
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
                {budgets.map((budget, index)=>{
                    
                    const allocated = "allocated"+budget.id;
                    const utilized = "utilized"+budget.id;
                    const year = "year"+budget.id;
                    return (
                        <tr className='dark:border-transparent'>
                            <td className='td-year'
                              onClick={()=>{
                                const sh = {[year]: true};
                                setSelected((prev)=>sh);
                                setEditBudget({
                                    id: budget.id,
                                    budgetAllocated: {...editBudget.budgetAllocated, value: budget.budgetAllocated},
                                    budgetUtilized: {...editBudget.budgetUtilized, value: budget.budgetUtilized},
                                    year: {...editBudget.year, value: budget.year}
                                })
                            }}
                            >    
                                <div className='crud-title'>
                                
                                <CustomDatePicker
                                    labelText="Select Year"
                                    formData={editBudget}
                                    setFormData={setEditBudget}
                                    label="year"
                                    type="mobile"
                                    views={['year']}
                                    callBackFun={callBackFuncEdit}
                                    
                                    parentStyle={{
                                        margin: "10px 0px"
                                    }}
                                    labelStyle={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: 'ubuntu',
                                    }}
                                    inputStyle={{
                                        marginLeft: 0,
                                        fontFamily: 'ubuntu',
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        backgroundColor:'transparent',
                                        textAlign: 'center',
                                        width: '100%'
                                    }}
                                    crud={true}
                                    value={budget.year}
                                />
                                
                                </div>
                            </td>
                            <td className='td-allocated'>    
                                <div className='crud-title'>
                                {!selected[allocated] && 
                                <p 
                                 style={{paddingLeft: 10}}
                                 onClick={()=>{
                                    const sh = {[allocated]: true};
                                    setSelected((prev)=>sh);
                                    setEditBudget({
                                        id: budget.id,
                                        budgetAllocated: {...editBudget.budgetAllocated, value: budget.budgetAllocated},
                                        budgetUtilized: {...editBudget.budgetUtilized, value: budget.budgetUtilized},
                                        budgetRemaining: {...editBudget.budgetRemaining, value: budget.budgetRemaining},
                                        year: {...editBudget.year, value: budget.year}
                                    }) 
                                }} className="dark:text-gray-100">{parseFloat(budget.budgetAllocated).toLocaleString()}</p>}
                                {selected[allocated] && 
                                  <EditableText
                                    formData={editBudget}
                                    setFormData={setEditBudget}
                                    callBackFun={callBackFuncEdit}
                                    label="budgetAllocated"
                                    parentStyle={{
                                       padding: "10px 10px",
                                       width: '100%'
                                    }}
                                    inputStyle={{
                                        marginLeft: 0,
                                        fontFamily: 'ubuntu',
                                        //fontWeight: "bold",
                                        fontSize: 16,
                                        backgroundColor: 'transparent',
                                        width: "100%",
                                    }}
                                    crud={true}
                                    setSelected={setSelected}
                                />}
                                </div>
                            </td>
                            <td className='td-utilized'>    
                                <div className='crud-title'>
                                {!selected[utilized] && <p style={{paddingLeft: 10}} onClick={()=>{
                                    const sh = {[utilized]: true};
                                    setSelected((prev)=>sh);
                                    setEditBudget({
                                        id: budget.id,
                                        budgetAllocated: {...editBudget.budgetAllocated, value: budget.budgetAllocated},
                                        budgetUtilized: {...editBudget.budgetUtilized, value: budget.budgetUtilized},
                                        year: {...editBudget.year, value: budget.year}
                                    })
                                }} className="dark:text-gray-100">{parseFloat(budget.budgetUtilized).toLocaleString()}</p>}
                                {selected[utilized] && 
                                  <EditableText
                                    formData={editBudget}
                                    setFormData={setEditBudget}
                                    callBackFun={callBackFuncEdit}
                                    label="budgetUtilized"
                                    parentStyle={{
                                       padding: "10px 10px"
                                    }}
                                    inputStyle={{
                                        marginLeft: 0,
                                        fontFamily: 'ubuntu',
                                        //fontWeight: "bold",
                                        fontSize: 16,
                                        backgroundColor: 'transparent',
                                        width: "100%",
                                    }}
                                    crud={true}
                                    setSelected={setSelected}
                                />}
                                </div>
                            </td>
                            <td className='td-remaining'>
                            <p className="dark:text-gray-100">{(parseFloat(budget.budgetAllocated) - parseFloat(budget.budgetUtilized)).toLocaleString()}</p>
                            </td>
                            <td align='center'>
                                <IconButton
                                  onClick={()=>{
                                    handleClickOpen(budget.id);
                                  }}
                                >
                                   <MdDeleteOutline className='text-gray-600 dark:text-gray-100'/>
                                </IconButton>
                            </td>
                           
                        </tr>
                    );
                })}
               
            </tbody>            
        </table>
        <div  onClick={()=>{
            let bds = budgets;
            const dt = new Date();
            const year = dt.toLocaleDateString('en-us')
            bds.push({
                id: budgets.length+1,
                year: year,
                budgetAllocated: 0,
                budgetUtilized: 0,
            });
            budgets = bds;
            setSelected({})
        }} className="add-budget dark:text-gray-100" style={{marginTop: 10, display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 18 }}><MdAdd style={{marginRight: 5, fontSize: 22}} />Add new budget</div>
    </div>
  )
}
export default Budgets;
