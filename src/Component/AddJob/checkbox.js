import { useField } from 'formik';
import { Checkbox } from 'antd';
const CheckBox=({label,...props})=>{
    const [field, meta, helpers] = useField(props);

    const labelStyle={
        "paddingBottom":"5px",
        "fontSize":"16px",
        "marginLeft":"5px"
    }
    const inputStyle={
        "padding": "5px",
        "marginTop": "10px",
        "border": "none"
    }

    return (
      <>
       
        
          <Checkbox {...field} {...props} />  <label> <span style={labelStyle}>{label}</span></label>
        
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
}

export default CheckBox