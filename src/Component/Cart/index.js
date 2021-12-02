import { useEffect,useState } from "react"
import Jobs from "./savedJobs"
import PurchaseDetails from "./purchaseDetails"
import PaymentSummary from './paymentSummary'
import { JobList,updateJob } from "../../Services/postAPI"

const Cart=(props)=>{
const [savedJobList,setsavedJobList]=useState([])
const [draftJobList,setDraftJobList]=useState([])
const institute_id = props?.match?.params?.institute_id
const overflowStyle={
"height":"300px",
"overflowY":"auto",
"overflowX":"hidden",
"marginBottom":"30px"
}
const getInstituteJobs=async (institution_id,job_status)=>{
    try{
        const result=await JobList({institution_id,job_status})
        if(job_status === 'saved')
        {
            setsavedJobList(result.data.data.jobData)
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
return (
<div className="container">
    <div className="row">
    <div className="col-md-12">
        
        <div className="col-md-12">
        <h5>5 Posts in the cart</h5>
        <div style={overflowStyle}><Jobs jobs={savedJobList} saveLater={saveLater}/></div>
        </div>

        <div className="mt-4 col-md-12"> <PurchaseDetails/> </div>

        <div className="col-md-12">
        <h5>Drafted Jobs</h5>
        <div style={overflowStyle}> <Jobs jobs={draftJobList} saveLater={saveLater} /></div>
        </div>


        
        

        </div>
        
       
    </div>
    
   
   
    </div>
)
}

export default Cart