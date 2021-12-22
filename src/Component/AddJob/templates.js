import { template } from "@babel/core";
import { useState,useEffect } from "react";
const Template=({templates,getTemplate})=>{

    const [searchTerm,setSearchterm]=useState()

    const searchTemplate=(e)=>{
      
        setSearchterm(e.target.value)
    }

   // useEffect(()=>{},[searchTerm])
const createMarkup=(template)=>{
    return {__html: template};
}

return (
<div className="container">
    <div><input type="text" onChange={(e)=>searchTemplate(e)} style={{"outline":"none"}} placeholder="Search Template"/></div>
    {
        
        templates.length && templates !== undefined?templates.filter(tem=>tem?.name.toLowerCase().includes(searchTerm?searchTerm.toLowerCase():'')).map(temp=>(
            <div className="row mt-4">
            <div className="col-md-2"><input type="radio" onClick={()=>getTemplate(temp.description)} name="radio-template"/></div>
            <div className="col-md-10"><span dangerouslySetInnerHTML={createMarkup(temp.description)}></span></div>
            </div>
        )

        ):<div>NO Templates found</div>
    }
   
   
</div>
);
}
export default Template