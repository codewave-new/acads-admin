const JobListing=({id,name,job_id,selectJob,...props})=>{
    return (
    <>
    
    <div className="row mt-4" style={{"cursor":"pointer"}} onClick={()=>selectJob(job_id)}>
    <div className="col-md-4">{id}</div>
    <div className="col-md-4">{name}</div>
    <div className="col-md-4">{job_id}</div>
    
    </div>
 
    </>
    )
}
export default JobListing;