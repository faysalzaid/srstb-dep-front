import "./inputs.scss";
import {useState, useRef, useEffect} from 'react';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';


export const TextField = ({formData, setFormData, label, labelText, placeholder}) => {
  return (
   <div className="text-field-container">
        {/* <div class="form__group field" style={{width: '100%'}}>
            <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
            <label for="name" class="form__label">Name</label>
        </div> */}
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <input 
                type="text"
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                value={formData[label]?.value??""}
                placeholder={placeholder ? placeholder : labelText}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                }}
                onChange={(e)=>{
                const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
                    setFormData((prev) => fd);
                }}
            />
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}

export const TextArea = ({formData, setFormData, label, labelText, placeholder, errorLabel, optional = false}) => {
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <textarea 
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder ? placeholder : labelText}
                rows={3}
                value={formData[label]?.value??""}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                }}
                onChange={(e)=>{
                    const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
                    setFormData((prev)=>fd);
                }}
            ></textarea>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}

export const NumberInput = ({formData, setFormData, label, labelText, placeholder}) => {
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <input 
                type="number"
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder ? placeholder : labelText}
                value={formData[label]?.value??""}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                }}
                onChange={(e)=>{
                    let num = e.target.value;
                    num = parseFloat(num);
                    const fd = {...formData, [label]: {...formData[label], value: num, error: e.target.value ? "" : "error"}};
                    setFormData((prev) => fd);
                }}
            />
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}

export const DateInput = ({formData, setFormData, label, labelText, placeholder}) => {
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <input 
                type="date"
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder ? placeholder : labelText}
                value={formData[label]?.value??""}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                }}
                onChange={(e)=>{
                    const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
                    setFormData((prev) => fd);
                }}
            />
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}



export const Dropdown = ({formData, setFormData, label, labelText, options, selectText, open}) => {
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
            if(op.id === formData[label]?.value) {
                val = op.name;
            }
        });
        if(inputRef.current)
        inputRef.current.value = val;
    },[inputRef.current,open])
    
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            
            <div className="dropdown" ref={catMenu} style={{marginBottom: show ? 180 : ''}}>
                {!show && <MdOutlineKeyboardArrowDown className="arrow-icon"/>}
                {show && <MdOutlineKeyboardArrowUp className="arrow-icon"/>}
                
                <input 
                  type="text" 
                  ref={inputRef}
                  className="textBox dark:bg-gray-800 dark:text-gray-200"
                  placeholder="Select item" 
                  //value={"Select Item"}
                  readonly
                  style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                  }}
                  onClick={()=>{
                    setShow(!show)
                  }}
                />
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
                                if(formData[label] !== option.id) {
                                   inputRef.current.value = option.name;
                                   setFormData({...formData, [label]: {...formData[label], value: option.id, error: ""}})
                                } 
                              }}
                              className=" dark:bg-gray-800 dark:text-gray-200"
                              style={{
                                backgroundColor: (formData[label]?.value === option.id) ? "rgba(150,56,255,.5)" : "",
                                color: (formData[label]?.value === option.id) ? "white" : ""
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