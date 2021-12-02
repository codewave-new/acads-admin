import { Switch as  ASwitch} from 'antd';


const Switch=({name,label,setFieldValue,...props})=>{
    const onChange=(val)=>{
        setFieldValue(name,val)
    }
    return (
        <>
        <label>{label}</label><br/>
        <ASwitch onChange={onChange} {...props}></ASwitch>
        </>
    )
}
export default Switch;