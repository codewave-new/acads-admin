import { useField } from 'formik';

const Dropdown=({label,options,...props})=>{
    const [field, meta, helpers] = useField(props);

    const labelStyle={
        "paddingBottom":"5px",
        "fontSize":"16px"
    }
    const selectStyle={
        "padding": "5px",
        "marginTop": "10px",
        "border": "none",
        "outline":"none",
        "width":"100%"
    }

    return (
        <>
        <label>
         <span style={labelStyle}>{label}</span><br/>
         <select style={selectStyle} {...field} {...props}>
             {
                 options && options.map(op=>
                     (<><option value={op.value}>{op.label}</option></>)
                     )
             }
           
         </select>
        </label>
        
        </>
    )
}
export default Dropdown;