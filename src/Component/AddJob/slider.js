import { useEffect, useState } from 'react';
import { Slider, Switch } from 'antd';
import { useField } from 'formik';
const RangeSlider = ({setFieldValue,name,defaultValue,...props})=>{
    const [field, meta, helpers] = useField(name); 
    const [inputValue,setinputValue]=useState(defaultValue);
    const [input1,setinput1]=useState(defaultValue[0])
    const [input2,setinput2]=useState(defaultValue[1])

    useEffect(()=>{
        setinputValue(defaultValue)
        setinput1(defaultValue[0])
        setinput2(defaultValue[1])
    },[defaultValue])
    const onChange=(val)=>{
       
        setinputValue(val)
        setFieldValue(name,val)
        setinput1(Number(val[0]))
        setinput2(Number(val[1]))
    }

    const firstNumber=(e)=>{
       
        setinput1(Number(e.target.value))
         setFieldValue(name,[...field.value.map((v,i)=>{
            if(i === 0)
            {
                return Number(e.target.value)
            }
            return v
         })])
         setinputValue([...inputValue.map((v,i)=>{
            if(i === 0)
            {
                return Number(e.target.value)
            }
            return v
         })])
    }

    const secondNumber=(e)=>{
        setinput2(Number(e.target.value))
         setFieldValue(name,[...field.value.map((v,i)=>{
            if(i === 1)
            {
                return Number(e.target.value)
            }
            return v
         })])
         setinputValue([...inputValue.map((v,i)=>{
            if(i === 1)
            {
                return Number(e.target.value)
            }
            return v
         })])
    }
    return (
    <div className="container">
    <div className="row">
    <div className="col-md-12"><Slider range min={0} value={inputValue} max={1000000} defaultValue={defaultValue}  onChange={onChange} {...props}/></div>
    <div className="col-md-6"><input type="number" style={{"width":"100px"}} value={input1} onChange={firstNumber}/></div>
    <div className="col-md-6"><input type="number" style={{"width":"100px"}} value={input2} onChange={secondNumber}/></div>
    </div>
    </div>);
}

export default RangeSlider;