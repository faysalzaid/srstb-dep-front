import "./inputs.scss";
import {useState, useRef, useEffect} from 'react';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';


export const TextField = ({formData, setFormData, label, labelText, placeholder, style, className, containerStyle, startIcon, endIcon}) => {
  return (
   <div className="text-field-container" style={{...containerStyle}}>
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <div className="relative">
                <input 
                    //type="text"
                    className={`input-text-field dark:bg-gray-800 dark:text-gray-200 ${className}`}
                    value={formData[label]?.value??""}
                    placeholder={placeholder ? placeholder : labelText}
                    style={{
                        border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                        outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                        paddingLeft: startIcon ? 42 : "",
                        paddingRight: endIcon ? 40 : "",
                        marginBottom: 2,
                    ...style
                    }}
                    onChange={(e)=>{
                    const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
                        setFormData((prev) => fd);
                    }}
                />
                {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}

            </div>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}

export const TextArea = ({formData, setFormData, label, labelText, placeholder, errorLabel, optional = false, style, startIcon, endIcon}) => {
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <div className="relative"> 
            <textarea 
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder ? placeholder : labelText}
                rows={3}
                value={formData[label]?.value??""}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                    paddingLeft: startIcon ? 42 : "",
                    paddingRight: endIcon ? 40 : "",
                    ...style
                }}
                onChange={(e)=>{
                    const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
                    setFormData((prev)=>fd);
                }}
                ></textarea>
                {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '15px'}}>{startIcon}</div>}
                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '15px'}}>{endIcon}</div>}
                </div>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}

export const NumberInput = ({formData, setFormData, label, labelText, placeholder, style, startIcon, endIcon}) => {
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <div className="relative">
            <input 
                type="number"
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder ? placeholder : labelText}
                value={formData[label]?.value??""}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                    paddingLeft: startIcon ? 42 : "",
                    paddingRight: endIcon ? 40 : "",
                    ...style
                }}
                onChange={(e)=>{
                    let num = e.target.value;
                    num = parseFloat(num);
                    const fd = {...formData, [label]: {...formData[label], value: num, error: e.target.value ? "" : "error"}};
                    setFormData((prev) => fd);
                }}
            />
            {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
            {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}
            </div>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}

export const DateInput = ({formData, setFormData, label, labelText, placeholder, style, startIcon, endIcon}) => {
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <div className="relative">
            <input 
                type="date"
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder ? placeholder : labelText}
                value={formData[label]?.value??""}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                    paddingLeft: startIcon ? 42 : "",
                    paddingRight: endIcon ? 40 : "",
                    ...style
                }}
                onChange={(e)=>{
                    const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
                    setFormData((prev) => fd);
                }}
            />
            {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
            {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}
            </div>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}



export const Dropdown = ({formData, setFormData, label, labelText, options, selectText, open, style, inputStyle, className, startIcon, endIcon}) => {
    const catMenu = useRef(null);
    const [show, setShow] = useState(false)
    const closeOpenMenus = (e)=>{
        if(catMenu.current && show && !catMenu.current.contains(e.target)){
          setShow(false)
        }
    }
    const inputRef = useRef();

    document.addEventListener('mousedown',closeOpenMenus)
    useEffect(()=>{
        let val = selectText ? selectText :"Not Selected";
        options.map((op)=>{
            if(op.id == formData[label]?.value) {
                val = op.name;
            }
        });
        if(inputRef.current)
        inputRef.current.value = val;
    },[inputRef.current,formData[label]])
    
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            
            <div className="dropdown relative" ref={catMenu} style={{marginBottom: show ? 180 : '', ...style}}>
                {!show && <MdOutlineKeyboardArrowDown className="arrow-icon"/>}
                {show && <MdOutlineKeyboardArrowUp className="arrow-icon"/>}
                <div className="">
                <input 
                 // type="text" 
                  ref={inputRef}
                  className={`textBox dark:bg-gray-800 dark:text-gray-200 ${className}`}
                  placeholder="Select item" 
                  //value={"Select Item"}
                  readonly
                  style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                    paddingLeft: startIcon ? 45 : "",
                    paddingRight: endIcon ? 40 : "",
                    ...inputStyle
                  }}
                  onClick={()=>{
                    setShow(!show)
                  }}
                />
                {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-25%)"}}>{startIcon}</div>}
                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '40%'}}>{endIcon}</div>}
                </div>
                 {show && <div 
                    className="option dark:bg-gray-800 dark:text-gray-200"
                    style={{
                        height: show ?"auto" : 0
                    }}
                  >
                    {
                        options.map((option,index)=>{
                            return (
                            <>
                            <div
                              key={"dropdown"+index}
                              onClick={()=>{
                                setShow((prev)=>!prev)
                                if(formData[label] != option.id) {
                                   inputRef.current.value = option.name;
                                   setFormData({...formData, [label]: {...formData[label], value: option.id, error: ""}})
                                } 
                              }}
                              className="dark:bg-gray-800 dark:text-gray-200"
                              style={{
                                backgroundColor: (formData[label]?.value === option.id) ? "#deebff" : "",
                                color: (formData[label]?.value === option.id) ? "#0052cc" : "",
                                borderLeft: (formData[label]?.value === option.id) ? "3px solid #0052cc" : "",

                              }}
                              >{option.name}
                            </div>
                            
                            </>
                            );
                        })
                    }
                    
                  </div>
                }                 
                    
            </div>
            
        </div>
    </div>
    );
}