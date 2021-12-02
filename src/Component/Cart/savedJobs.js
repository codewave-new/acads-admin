const Jobs=({jobs,saveLater,...props})=>{
    const rowStyle={
        "background":"#fff",
        "borderBottom":"1px solid #ccc",
        "padding":"10px"
    }

   
    return (
       
            <>
                <div className = "row p-2" style={{background:"#f3efef"}}>
                <div className="col-md-2">JOB TITLE</div>
                <div className="col-md-2">CLASS</div>
                <div className="col-md-2">CURRICULUM</div>
                <div className="col-md-2">EXPERIENCE</div>
                <div className="col-md-2">SALARY OFFERED</div>
                <div className="col-md-1">ACTIONS</div>
                </div>
                {
                    jobs.length > 0?
                    jobs.map(job=>{
                        return (
                            <div className = "row" style={rowStyle}>
                            <div className="col-md-2">{job.job_title}</div>
                            <div className="col-md-2">{job.job_class}</div>
                            <div className="col-md-2">{job.job_curiculum}</div>
                            <div className="col-md-2">{job.job_experience}</div>
                            <div className="col-md-2">{job.job_salary_range[0]}-{job.job_salary_range[1]}</div>
                            <div className="col-md-2">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            <button className="btn btn-primary btn-sm" style={{"marginLeft":"15px"}} onClick={()=>saveLater(job)}>SAVE FOR LATER</button>
                            </div>
                            </div>
                        )
                    }):'No Jobs found'
                }
                
                {/* <div className = "row" style={rowStyle}>
                <div className="col-md-2">Science teacher</div>
                <div className="col-md-1">1-5</div>
                <div className="col-md-2">CBSE</div>
                <div className="col-md-2">6 + years</div>
                <div className="col-md-2">1000-1500</div>
                <div className="col-md-3">

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                <button className="btn btn-primary btn-sm" style={{"marginLeft":"15px"}}>SAVE FOR LATER</button>
                </div>
                </div> */}
            </>

    )
}

export default Jobs;