import { useEffect,useState } from 'react'
import { Pagination } from 'antd'
import { CandidateListing } from "../../../Services/postAPI"
import moment from 'moment'

const Candidatelist =({instituteId,jobId,...props})=>{
    const [search,setSearchTerm]=useState('')
    const [currentPage,setCurrentPage]=useState(0)
    const [pageSize,setPageSize]=useState(3)
    const [candidates,setCandidates]=useState([])
    const [count,setCount]=useState(0)

    const candidateListing=async ()=>{
        const data={"institudeID":instituteId,"jobID":jobId,"search":'',"pageNo":currentPage,"pageSize":3,"sort":{"createdAt":""}}
       const res= await CandidateListing(data)
       if(res.data.status === 'success')
       {
        setCandidates(res.data.data.data)
        setCount(res.data.data.count)
       }
       console.log(res.data.data.data)
      }

      useEffect(()=>{
        if(jobId !== '')
        {
          candidateListing()
        }
      },[jobId,currentPage])

      const pageChange=(page)=>{
        setCurrentPage(page-1)
    }
    const styleSheet={
        "respTable":{
            "width":"100%",
            "display":"table"
        },
      
        "tableHeader":{
            "display": "table-header-group",
            backgroundColor: "#ccc",
            fontSize: "15px",
            fontWeight:"500"
        },
        "headercell":{
            "display": "table-cell",
            padding: "10px",
            textAlign: "justify",
            borderBottom: "1px solid black",
            textTransform: "uppercase"
        },
        tableBody:{
            "display":'table-row-group'
        },
        tableRow:{
            "display":'table-row'
        },
        tableCell:{
            "display":'table-cell',
            "padding":"12px"
        },
        button:{
            border:"none",
            padding:"10px",
            borderRadius:"12px"
        }
    }

    return (
    <div style={styleSheet.respTable}>
        
        <div style={styleSheet.tableHeader}>
        <div style={styleSheet.headercell}>
           Applicants Name
        </div>
        <div style={styleSheet.headercell}>
            Exp (IN YRS)
        </div>
        <div style={styleSheet.headercell}>
        Applied date
        </div>
        <div style={styleSheet.headercell}>
        B.ed Certified
        </div>
        <div style={styleSheet.headercell}>
        Status
        </div>
        <div style={styleSheet.headercell}>
        Actions
        </div>
        
        </div>
        <div style={styleSheet.tableBody}>
            {
                candidates.length > 0?
                candidates.map(cand=>(
                    <div style={styleSheet.tableRow}>
            
                    <div style={styleSheet.tableCell}>
                    {cand.name}
                    </div>
                    <div style={styleSheet.tableCell}>
                    {cand.exp === 0?'fresher':cand.exp}
                    </div>
                    <div style={styleSheet.tableCell}>
                    {moment(cand.appliedDate).format('YYYY/MM/DD')}
                    </div>
                    <div style={styleSheet.tableCell}>
                   {cand.bedCertified?'Yes':'No'}
                    </div>
                    <div style={styleSheet.tableCell}>
                    {cand.interviewStatus}
                    </div>
                    <div style={styleSheet.tableCell}>
                    <a href={cand.cvLink} download>Download CV</a> 
                    </div>

                  
                    
                </div>
                )):'No Applicants found'
            }
                
               
            
      

        </div>
        <Pagination onChange={pageChange} total={pageSize} defaultPageSize={pageSize} current={currentPage+1} total={count}/>
    </div>

    )
}

export default Candidatelist