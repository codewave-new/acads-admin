import React,{useState,useEffect} from 'react'
import * as moment from 'moment';
import { useField, Form,useFormikContext,Formik,Field} from 'formik';
import {Modal,AutoComplete} from 'antd'
import ReactQuill from "react-quill";
import "../Dashboard/DashboardContent/TextEditorWrapper/text-editor-wrapper.style.scss";
import Template from './templates';
import 'antd/dist/antd.css';
import Input from './textField'
import Dropdown from './dropdown'
import CheckBox from './checkbox'
import MultiSelect from './multiselect';
import RangeSlider from './slider'
import Switch from './switch'
import {Data} from '../../Assets/Data'
import { Country, State, City }  from 'country-state-city';
import { JobList,createJob } from '../../Services/postAPI';
import {getJobByid,getInstituteDetails,getAllTemplates} from '../../Services/getAPI';
import InfiniteScroll from 'react-infinite-scroller';
import JobListing from './jobListing';
import * as Yup from 'yup';
import swal from 'sweetalert';
import Search from 'antd/lib/transfer/search';
const mod = {
  toolbar: {
    container: "#toolbar",
  },
};
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const AddJob=(props)=>{
 

const [value,setVal]=useState([])
const [initialValues,setInitalValules]=useState({
    
    ismart_institution_id:props?.match?.params?.ismart_id,
    institution_id:'',
    job_curiculum:'',
    job_role:'',
    job_class:'',
    job_subject:'',
    job_experience:'',
    job_title:'',
    job_salary_range:[10000,20000],
    job_description:'',
    job_type:'',
    job_vacancies:'',
    position_reports_to:'',
    min_qualify:'',
    bedRequired:true,
    target_hiring_date:'',
    country:'',
    job_status:'draft',
    state:'',
    job_key_skill:[],
    job_gender_preference:'',
    job_outstation_candidate:false,
    job_marital_status:'',
    job_perk_provided:[],
    job_language_preference:[],
    job_college_preference:[],
    institution_logo:false,
    institution_name:false,
    institution_location:false,
    about_institution:false,
    salary:false
})
const [userId,setUserId]=useState("")
const [jobs,openJobs]=useState(false)
const [template,showTemplate]=useState(false)
const [jobList,setjobList]=useState([])
const [hasMore,sethasMore]=useState(true)
const [templateList,setTemplateList]=useState([]);
const [currentPage,setCurrentPage]=useState(0);
const [coutries,setCountries]=useState(Country.getAllCountries().map(country=>({value:country.name,country_code:country.isoCode})))
const [countryCode,setCountryCode]=useState("")
const [states,setStates]=useState("")
const scrollParentRef = React.useRef(null);

const onSearch=(text)=>{
  setCountries(
    !text ? Country.getAllCountries().map(country=>({value:country.name,country_code:country.isoCode})) : [...coutries.filter(cout=>cout.value.toLowerCase().includes(text.toLowerCase()))],
  ); 
}

const searchState=(text)=>{
  setStates(
    !text?[...State.getStatesOfCountry(countryCode).map(state=>({value:state.name}))]:[...states.filter(cout=>cout.value.toLowerCase().includes(text.toLowerCase()))]
  )
}
const selectCountry=(setFieldValue,country)=>{
const res= coutries.find(cout=>cout.value === country)
setCountryCode(res.country_code)
  setStates(State.getStatesOfCountry(res.country_code).map(state=>({value:state.name})))
  setFieldValue('country',country)
}

const selectState=(setFieldValue,state)=>{
  setFieldValue('state',state)
}


  const repeat=()=>{
    openJobs(true)
    sethasMore(true)
   
  }

  const openTemplate=()=>{
    showTemplate(true)
  }
  const closeTemplate=()=>{
     showTemplate(false)
  }

  const handleOk=()=>{
    
    setjobList([])
    setCurrentPage(0)
    openJobs(false)
  }

  const handleCancel=()=>{
   
    setjobList([])
    setCurrentPage(0)
    openJobs(false)
  }
 
  const getJobs=async (pageNo,pageSize)=>{
 
    const institution_id=initialValues.institution_id
    const result=await JobList({institution_id,pageNo,pageSize});
  
    if(result.data.data.jobData.length > 0)
    {
       
        setjobList([...jobList,...result.data.data.jobData])
        sethasMore(false)
        setCurrentPage(pageNo)
        
    }
    else
    {
      sethasMore(false)
    }
  
   
}
  useEffect(async ()=>{

      if(jobs && hasMore)
      {
       
        await getJobs(currentPage,20)
      }
   
  },[hasMore,jobs])
const getTemplate=(temp)=>{
 
  setInitalValules({...initialValues,job_description:temp})
}
const getInstitute=async ()=>{
 const result= await getInstituteDetails(props?.match?.params?.institute_id)
 console.log(result)
 if(result.data.statusCode === 200)
 {
   setInitalValules({
     ...initialValues,
     loc:result.data.data.institutionDetails.loc,
     city:result.data.data.institutionDetails.institute_location.city,
     institution_id:result.data.data.userID
   
   })
   setUserId(result.data.data._id) 
 }
}
useEffect(async ()=>{
  await getInstitute()
  const res=await getAllTemplates()
  if(res.data.statusCode === 200)
  {
    setTemplateList(res.data.data)
  }
  else
  {
    setTemplateList([])
  }
},[])
  const validationSchema=Yup.object({
    job_title:Yup.string().required('This field is required'),
    country:Yup.string().required('This field is required'),
    target_hiring_date:Yup.date().required('This field is required'),
  })

  const selectJob=async (job_id)=>{
   const job_details= await getJobByid(job_id)
    if(job_details.data.statusCode === 200)
    {

        const jobDetail = job_details.data.data;
        setInitalValules({
          ...initialValues,
          job_title:jobDetail.job_title,
          job_curiculum:jobDetail.job_curiculum,
          job_role:jobDetail.job_role,
          job_class:jobDetail.job_class,
          job_subject:jobDetail.job_subject,
          job_experience:jobDetail.job_experience,
          job_salary_range:[jobDetail.job_salary_range.start,jobDetail.job_salary_range.end],
          job_type:jobDetail.job_type,
          job_description:jobDetail.job_description,
          job_vacancies:jobDetail.job_vacancies,
          position_reports_to:jobDetail.position_reports_to,
          min_qualify:jobDetail.min_qualify,
          bedRequired:jobDetail.bedRequired,
          target_hiring_date:moment(jobDetail.target_hiring_date).format('YYYY-MM-DD'),
          country:jobDetail.country,
          state:jobDetail.state,
          job_key_skill:jobDetail.job_key_skill,
          job_gender_preference:jobDetail.job_gender_preference,
          job_outstation_candidate:jobDetail.job_outstation_candidate,
          job_marital_status:jobDetail.job_marital_status,
          job_perk_provided:jobDetail.job_perk_provided,
          job_language_preference:jobDetail.job_language_preference,
          job_college_preference:jobDetail.job_college_preference,
          institution_logo:jobDetail.institution_logo,
          institution_name:jobDetail.institution_name,
          institution_location:jobDetail.institution_location,
          about_institution:jobDetail.about_institution,
          salary:jobDetail.salary
        })

    }
  }
    return (
        <>
        <div><button className="btn btn-primary" onClick={()=>repeat()}>Repeat from existing posts</button></div>
         <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const jobData={...values,job_status:'live',status:'active',job_salary_range:{start:values.job_salary_range[0],end:values.job_salary_range[1]}}
          try{
            const res=await createJob(jobData)
            if(res.data.statusCode === 200)
            {
              swal("Success", res.data.message, "success");
              props.history.push('/dashboard/cart/'+initialValues.institution_id+'/'+userId)
            }
          }
          catch(e)
          {
            swal("Error", e.response.data.error, "error");
          }
         
          
          
       }}
       enableReinitialize={true}
     >
       {(props) => (
        
         <Form>
            {JSON.stringify(props.errors,null,2)}
             <div className="container" style={{"paddingBottom":"25px"}}>
                 <div className="row mt-4">
                    <div className="col-md-4"><Input name="job_title" label="Job title" type="text"/></div>
                    <div className="col-md-4"><Dropdown name="job_curiculum" label="Curriculum" options={Data.curriculum}/></div>
                    <div className="col-md-4"><Dropdown name="job_role" label="Role" options={Data.role}/></div>
                 </div>

                 <div className="row mt-4">
                    <div className="col-md-4"><Dropdown name="job_class" label="Class" options={Data.class}/></div>
                    <div className="col-md-4"><Dropdown name="job_subject" label="Subject" options={Data.subjects}/></div>
                    <div className="col-md-4"><Dropdown name="job_experience" label="Experience" options={Data.exp}/></div>
                 </div>

                 <div className="row mt-4">
                 <div role="group" className="col-md-4" aria-labelledby="my-radio-group">
                <label>
                <Field type="radio" name="job_type" value="Full Time" />
                <span>Full Time</span>
                </label>
                <label style={{"marginLeft":"14px"}}>
                <Field type="radio" name="job_type" value="Part Time" />
                    <span>Part Time</span>
                </label>
           
                </div>
                <div className="col-md-4">
                <Input name="job_vacancies" label="No. of Vacancies" type="number"/>
                </div>
                <div className="col-md-4"><RangeSlider name="job_salary_range" defaultValue={initialValues.job_salary_range} setFieldValue={props.setFieldValue} /></div> 
                
                 </div>
                 <div className="row mt-4">
                    <div className="col-md-4"><Input name="position_reports_to" label="Position Reports To" type="text"/></div>
                    <div className="col-md-4"><Input name="min_qualify" label="Min. Qualification" type="text"/></div>
                    <div className="col-md-4"><Dropdown name="bedRequired" label="B.Ed Required?" options={Data.boolean} /></div>
                 </div>
                 <div className="row mt-4">
                    <div className="col-md-4"><Input name="target_hiring_date" label="Target Hiring Date" type="date"/></div>
                    <div className="col-md-4">
                      <label>Country</label><br />
                      <AutoComplete name="country" onSelect={(coutry)=>selectCountry(props.setFieldValue,coutry)} onSearch={onSearch} options={coutries}
                     style={{
                    width: 200,
                   }} />
                   </div>
                    <div className="col-md-4">
                    <label>State</label><br />
                      <AutoComplete name="state" onSelect={(state)=>selectState(props.setFieldValue,state)} onSearch={searchState}  options={states}
                     style={{
                    width: 200,
                   }} />
                      
                      </div>
                 </div>
                 <div className="row mt-4">
                     <div className="col-md-12"><MultiSelect options={Data.key_skills} label="Key Skills" name="job_key_skill" selectedValue={initialValues.job_key_skill} setFieldValue={props.setFieldValue}/></div>
                </div>
                <div className="row mt-4">
                <div style={{"float":"left","width":"50%"}}><label>Job Description</label></div>
                <div style={{"float":"left","width":"50%"}}><span onClick={openTemplate} style={{"color":"blue","cursor":"pointer"}}>Choose from templates</span></div>
                    <div className="col-md-12">
                      
                     <ReactQuill
                   value={props.values.job_description}
                    onChange={(val) => props.setFieldValue('job_description',val)}
                    modules={mod}
                    name="job_description"
                    modules={modules}
                    />
                       {/* <Input label="Job Description" name="job_description" type="textarea" /> */}
                       
                       </div>
                </div>

                <div className="row mt-4">
                     <div className="col-md-4"><Dropdown label="Gender Preference" name="job_gender_preference" options={Data.job_preference}  /></div>
                     <div className="col-md-4"><Dropdown label="Outstationed Candidates" name="job_outstation_candidate" options={Data.boolean} /></div>
                     <div className="col-md-4"><Dropdown label="Marital Status" name="job_marital_status" options={Data.maritialStatus}/></div>
                </div>
                <div className="row mt-4">
                    <b>Perks Provided</b>
                <div role="group" aria-labelledby="checkbox-group">
                <label>
                <Field type="checkbox" name="job_perk_provided" value="food" />
                <span>Food</span>
                </label>
                <label style={{"marginLeft":"4%"}}>
              <Field type="checkbox" name="job_perk_provided" value="medical_insurance" />
              <span>Medical Insurance</span>
            </label>
            <label style={{"marginLeft":"4%"}}>
              <Field type="checkbox" name="job_perk_provided" value="accomodation" />
              <span>Accomodation</span>
            </label>
            <label style={{"marginLeft":"4%"}}>
              <Field type="checkbox" name="job_perk_provided" value="bonus" />
              <span>Bonus</span>
            </label>
            <label style={{"marginLeft":"4%"}}>
              <Field type="checkbox" name="job_perk_provided" value="transportation" />
              <span>Transportation</span>
            </label>
          </div>
                </div>
                <div className="row mt-4">
                     <div className="col-md-12"><MultiSelect options={Data.job_language_preference} label="Language Preference" name="job_language_preference" selectedValue={initialValues.job_language_preference} setFieldValue={props.setFieldValue}/></div>
                </div>
                <div className="row mt-4">
                     <div className="col-md-12">
                     <Input name="job_college_preference" label="Preferred Institutes to hire from" type="text"/>
                       </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-2"><Switch name="institution_logo" label="Institution Logo" setFieldValue={props.setFieldValue} /></div>
                    <div className="col-md-2"><Switch name="institution_name" label="Institution Name" setFieldValue={props.setFieldValue} /></div>
                    <div className="col-md-2"><Switch name="institute_location" label="Institution Location" setFieldValue={props.setFieldValue} /></div>
                    <div className="col-md-2"><Switch name="about_institution" label="About Institution" setFieldValue={props.setFieldValue} /></div>
                    <div className="col-md-2"><Switch name="salary" label="Salary" setFieldValue={props.setFieldValue} /></div>
                </div>
                <div className="row mt-4">
                <button style={{"width":"auto","marginLeft":"auto","marginRight":"auto"}}  className="btn btn-primary" type="submit">All jobs added.I'll choose plan</button>  
                </div>
                
            </div>
            
            
         </Form>
       )}
         </Formik>
         <Modal title="Basic Modal" visible={jobs} onOk={handleOk} onCancel={handleCancel}>
            
                <div className="container">
                <div className="row">
                <div className="col-md-4"><h6>id</h6></div>
                <div className="col-md-4"><h6>Name</h6></div>
                <div className="col-md-4"><h6>Job id</h6></div>
                
                </div>
                <div style={{"height":"300px","overflowY":"auto","overflowX":"hidden"}} ref={scrollParentRef}>
                <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={()=>getJobs(currentPage+1,20)}
                        hasMore={hasMore}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                        useWindow={false}
                        threshold={1}
                        getScrollParent={() => scrollParentRef.current}
                         >
                {
                    jobList&&jobList.map((job)=>{
                    return (
                        
                        <JobListing id={job.institution_id} name={job.job_title} job_id={job._id} selectJob={selectJob} />
                        
                    )
                })
            }
            </InfiniteScroll>
            </div>
            </div>
        </Modal>

        <Modal title="Choose templates" width="1000px" visible={template} onOk={closeTemplate} onCancel={closeTemplate}>
            
          <div>
            <Template templates={templateList} getTemplate={getTemplate}/>
            </div>
    </Modal>
       
        </>
    )
}

export default AddJob;