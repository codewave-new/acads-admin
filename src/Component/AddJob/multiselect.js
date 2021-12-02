import { useEffect, useState } from 'react';
import { useField } from 'formik';
import Select from 'react-select';

const MultiSelect = ({options,name,setFieldValue,label,selectedValue,...props})=>{
    
const [value,setValue]=useState(selectedValue);
const onChange=(val)=>{
    setFieldValue(name,val.map(v=>v.value))
    setValue(val)
}

useEffect(()=>{
    if(selectedValue)
    {
        setValue(selectedValue.map(s=>({label:s,value:s})))
    }
    
},[selectedValue])

    return (
        <>
        <label>{label}</label>
            <Select
            options={options}
            value={value}
            onChange={onChange}
            isMulti
            {...props}
            />
             {/* {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>

        ) : null} */}
        </>
    );
}

export default MultiSelect; 