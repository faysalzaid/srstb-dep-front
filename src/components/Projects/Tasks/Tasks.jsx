import { purple } from '@mui/material/colors';
import React, {useState} from 'react'
import './tasks.scss';
import { MdAdd } from 'react-icons/md';
import { EditableTextContent, EditableText } from "../Inputs/EditableInputs";
import { TextField, TextArea, Dropdown, DateInput } from "../Inputs/Inputs";

export const Tasks = ({task,setTask}) => {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        name: "create different kinds of reusable normal and editable inputs ",
        status: 4,
    },
    {
        id: 2,
        name: "create custom reusable notification components for success, error, info and warning then integrate with main project window",
        status: 4,
    },
    {
        id: 3,
        name: "create responsive project add component and integrate with validation, loader and alert components",
        status: 3,
    },
    {
        id: 4,
        name: "create reusable loader component and integrate with add project component",
        status: 3,
    },
    {
        id: 5,
        name: "add project detail page",
        status: 2,
    },
    {
        id: 6,
        name: "create basic layout of the list view",
        status: 2,
    },
    {
        id: 7,
        name: "add full crud functionality with callbacks and integrate them with the tasks list user interface",
        status: 1,
    }
  ]);
  const statuses = [
    {
        id: 1,
        name: "Not Started",
        color: "#e8384f"
    },
    {
        id: 2,
        name: "In Progress",
        color: "#1faaea"
    },
    {
        id: 3,
        name: "In Review",
        color: "#a962e3"
    },
    {
        id: 4,
        name: "Done",
        color: "#37c5ab"
    },
  ];
  const [formData, setFormData] = useState({
    name: {value: "Project Management", error: "", optional: false},
    description: {value: "Interactive project add, project detail with live edit and update and tasks list UI with full crud functionality", error: "", optional: false},
    descriptionError: {value: "", error: "", optional: false},
    status:  {value: 0, error: "", optional: false},
    startDate:  {value: "", error: "", optional: false},
    endDate:  {value: "", error: "", optional: false},
  });

  const [show, setShow] = useState({add: false, edit: false});
  const [selected, setSelected] = useState({});

  const [addTask, setAddTask] = useState({
    name: {value: "", error: "", optional: false},
    status: {value: 1, error: "", optional: false},
    startDate: {value: "", error: "", optional: false},
    endDate: {value: "", error: "", optional: false},
  });
  const [editTask, setEditTask] = useState({
    name: {value: "", error: "", optional: false},
    status: {value: "", error: "", optional: false},
    startDate: {value: "", error: "", optional: false},
    endDate: {value: "", error: "", optional: false},
  })

  function callBackFuncEdit(text, label, escape = false) {
    if(escape) {
        setSelected({});
        return;
    }
    var data = {[label]: text}
    if(text !== editTask.name) {
        //console.log('task new:',text);
        //console.log(editTask.id);
    //    update data to server .then
    }

    setTasks(tasks.map(task=>task.id ===editTask.id ? {...task, [label]: text} : task))
    setSelected({});
  }
  function callBackFuncAdd(text, label, escape=false) {
      let newTasks = tasks;
      tasks.push({
        id: tasks.length+1,
        name: text,
        status: 1,
      });
      setTasks((prev)=>tasks);
      setShow({add: false, edit: false});
      const addTask = {
        name: {value: "", error: "", optional: false},
        status: {value: 1, error: "", optional: false},
        startDate: {value: "", error: "", optional: false},
        endDate: {value: "", error: "", optional: false},
      }
      setAddTask(()=>addTask)
  }
  return (
    <div className='crud-container' style={{minWidth: 700}}>
        <table>
            <tbody className='dark:border-gray-400'>
                {tasks.map((task, index)=>{
                    let stts = "";
                    statuses.map((st)=>{
                        if(st.id === task.status) {
                            stts = <div className='stts' style={{backgroundColor: st.color}}>{st.name}</div>;
                        }
                    })
                    const label = "label"+task.id;
                    return (
                        <tr className='dark:border-transparent'>
                            <td className="td-number">
                               
                                <div className='number-avatar'>{index+1}</div>
                            </td>
                            <td className='td-name dark:text-gray-100'>    
                                <div className='crud-title'>
                                {!selected[label] &&<p onClick={()=>{
                                    const sh = {[label]: true};
                                    setSelected((prev)=>sh);
                                    setEditTask({
                                        id: task.id,
                                        name: {...editTask.name, value: task.name}
                                    })
                                }} style={{ maxWidth: '60vw'}}>{task.name}</p>}
                                {selected[label] && <EditableText
                                    formData={editTask}
                                    setFormData={setEditTask}
                                    callBackFun={callBackFuncEdit}
                                    label="name"
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
                           
                            <td className="td-status">
                                <div className='crud-title'>{stts}</div>
                            </td>
                        </tr>
                    );
                })}
                {show.add && <tr>
                            <td className="td-number">
                                <div className='number-avatar'>{tasks.length+1}</div>
                            </td>
                            <td className='td-name'>
                                <div className='crud-title'>
                                <EditableText
                                    formData={addTask}
                                    setFormData={setAddTask}
                                    callBackFun={callBackFuncAdd}
                                    label="name"
                                    parentStyle={{
                                        padding: "5px 5px"
                                    }}
                                    inputStyle={{
                                        marginLeft: 0,
                                        fontFamily: 'ubuntu',
                                        //fontWeight: "bold",
                                        fontSize: 17,
                                        backgroundColor: 'transparent',
                                        width: "100%",
                                    }}
                                    crud={true}
                                    setSelected={setSelected}
                                />
                                </div>
                            </td>
                           
                            <td className="td-status">
                               <div className='stts' style={{backgroundColor: statuses[0]?.color}}>{statuses[0].name}</div>
                            </td>
                        </tr>}
            </tbody>            
        </table>
        <div className="add-task dark:text-gray-100" onClick={()=>{setShow({add: true, edit: false})}} style={{marginTop: 10, display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 18 }}><MdAdd style={{marginRight: 5, fontSize: 22}}/>Add new task</div>
    </div>
  )
}
export default Tasks;
