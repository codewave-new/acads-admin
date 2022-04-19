import { useField } from 'formik';
import { Input as AntInput,DatePicker } from 'antd';
import * as moment from 'moment'

const Input=({label,type,...props})=>{
    const [field, meta, helpers] = useField(props);

    const labelStyle={
        "paddingBottom":"5px",
        "fontSize":"16px"
    }
    const inputStyle={
        "padding": "5px",
        "marginTop": "10px",
        "border": "none"
    }
    const errorStyle={
      "color":"red"
    }

    return (
      <>
        <label>
         <span style={labelStyle}>{label}</span><br/>
         {
           type === "textarea"?
           <AntInput.TextArea  style={{"width":"500px"}} {...field} {...props} />:
           type === "date"?
          <input {...field} {...props}  type={type}/>
           :
           <AntInput {...field} {...props} />
         }
          
        </label>
        {
          
        meta.touched && meta.error ? (
          <div style={errorStyle}>{meta.error}</div>
        ) : null
        
        }
      </>
    );
}

export default Input