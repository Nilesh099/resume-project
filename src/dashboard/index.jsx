import { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import LocalStorageApi from "../../service/LocalStorageApi";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {

  const [resumeList,setResumeList]=useState([]);
  
  useEffect(()=>{
    GetResumesList()
  },[])

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList=()=>{
    LocalStorageApi.GetUserResumes("user@resume.com")
    .then(resp=>{
      setResumeList(resp.data.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      '>
        <AddResume/>
        {resumeList.length>0?resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={resume.documentId || index} refreshData={GetResumesList} />
        )):
        [1,2,3,4].map((item,index)=>(
          <div key={index} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Dashboard