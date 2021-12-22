import { useEffect,useState } from "react"
import Jobs from "./savedJobs"
import PurchaseDetails from "./purchaseDetails"
import PaymentSummary from './paymentSummary'
import swal from 'sweetalert';
import { JobList,updateJob,createOrder } from "../../Services/postAPI"

const Cart=(props)=>{
const [savedJobList,setsavedJobList]=useState([])
const [draftJobList,setDraftJobList]=useState([])
const [price,setPrice]=useState(0)
const [gst,setGST]=useState(0)
const [discountperc,setDiscount]=useState(0)
const [discountType,setdiscountType]=useState("perc")
const [discountedAmount,setdiscountedAmount]=useState(0)
const [totalPrice,setTotalPrice]=useState(0)
const institute_id = props?.match?.params?.institute_id
const overflowStyle={
    "height": "auto",
    "overflow": "hidden auto",
    "marginBottom": "30px",
    "maxHeight": "200px"
}
const getInstituteJobs=async (institution_id,job_status)=>{
    try{
        const result=await JobList({institution_id,job_status})
        if(job_status === 'saved')
        {
            setsavedJobList(result.data.data.jobData)
            setPrice(result.data.data.jobData.length > 0?result.data.data.jobData.length*3000:0)
            setGST(result.data.data.jobData.length > 0?result.data.data.jobData.length*3000*0.18:0)
            //setTotalPrice(price)
        }   
        else
        {
            setDraftJobList(result.data.data.jobData)
        }
        
    }
    catch(e)
    {
        setsavedJobList([])
        setDraftJobList([])
    }
   
}
useEffect(()=>{
    if(institute_id)
    {
        getInstituteJobs(institute_id,'saved')
        getInstituteJobs(institute_id,'draft')
    }
    
},[institute_id])

const saveLater=async (job)=>{
const jobData={...job,job_status:'draft'}
await updateJob(jobData)
await getInstituteJobs(institute_id,'saved')
await getInstituteJobs(institute_id,'draft')
}
const deleteJob=async(job)=>{
    const jobData={...job,status:'inactive'}
    await updateJob(jobData)
    await getInstituteJobs(institute_id,'saved')
    await getInstituteJobs(institute_id,'draft')
}
const addtoCart=async(job)=>{
const jobData={...job,job_status:'saved'}
await updateJob(jobData)
await getInstituteJobs(institute_id,'saved')
await getInstituteJobs(institute_id,'draft')
}

const changeDiscountType=(checked)=>{
if(checked)
{
    setdiscountType('amount')
   
}
else
{
    setdiscountType('perc')
   
}
}

const discount=(amount)=>{
    setDiscount(amount)
}
const generateOrder=async ()=>{
  
    const data={
        jobs:savedJobList.map(saved=>({
            jobID: saved._id,
            "title": saved.job_title,
            "class": saved.job_class,
            "experience": saved.job_experience,
            "salaryoffered":`${saved.job_salary_range.start } - ${saved.job_salary_range.end}`,
            "curriculum": saved.job_curiculum
        })),
        instituteID:props.match.params.user_id,
        "pricePerJob":3000,
        "totalAmount": (parseInt(price)+parseInt(gst))-discountedAmount,
        "discountpercent":discountperc,
        "paymentType":"online",
        "discountAmount":discountedAmount,
        "gstPercent":18,
        "gstAmount":gst
    }
    console.log(data)
    const res=await createOrder(data)
    console.log(res)
    if(res.data.status === 'success')
    {
        swal("Success",'Razor pay link has been sent successfully', "success");
    }
    
   
}

useEffect(()=>{
    if(discountType === "perc")
    {
   
    setdiscountedAmount((price*(1+0.18))*(discountperc/100))
    }
    else
    {
   
    setdiscountedAmount(discountperc)
    }
},[discountperc,discountType,price])

return (
<div className="container">
    <div className="row">
    <div className="col-md-12">
        
        <div className="col-md-12">
        <h5>{savedJobList&&savedJobList.length} Posts in the cart</h5>
        <div style={overflowStyle}><Jobs  type="cart" jobs={savedJobList} deleteJob={deleteJob} callback={saveLater}/></div>
        </div>

        <div className="mt-4 col-md-12"> <PurchaseDetails generateOrder={generateOrder} price={price} totalPrice={totalPrice} discountType={discountType} discount={discount} discountedAmount={discountedAmount} gst={gst} changeDiscountType={changeDiscountType}/> </div>

        <div className="col-md-12">
        <h5> {draftJobList&&draftJobList.length} Drafted Jobs</h5>
        <div style={overflowStyle}> <Jobs jobs={draftJobList} type="draft" callback={addtoCart} /></div>
        </div>


        
        

        </div>
        
       
    </div>
    
   
   
    </div>
)
}

export default Cart