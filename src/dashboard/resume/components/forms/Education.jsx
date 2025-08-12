import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LocalStorageApi from './../../../../../service/LocalStorageApi'
import { toast } from 'sonner'

function Education({ enabledNext }) {

  const [loading,setLoading]=useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const params=useParams();
  const [educationalList,setEducationalList]=useState([
    {
      id: Date.now(),
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ])
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(()=>{
    if (resumeInfo && !isInitialized) {
      if (resumeInfo?.education && resumeInfo.education.length > 0) {
        // Ensure all education entries have IDs
        const educationWithIds = resumeInfo.education.map((edu, index) => ({
          ...edu,
          id: edu.id || Date.now() + index
        }));
        setEducationalList(educationWithIds);
      } else {
        setEducationalList([{
          id: Date.now(),
          universityName:'',
          degree:'',
          major:'',
          startDate:'',
          endDate:'',
          description:''
        }])
      }
      setIsInitialized(true);
    }
  },[resumeInfo, isInitialized])

  // Reset initialization when resumeId changes
  useEffect(() => {
    setIsInitialized(false);
  }, [params?.resumeId]);
  const handleChange=(event,index)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{
    const newEducation = {
      id: Date.now(),
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    };
    setEducationalList(prev => [...prev, newEducation]);
  }
  const RemoveEducation=()=>{
    if (educationalList.length > 1) {
      setEducationalList(educationalList=>educationalList.slice(0,-1))
    }
  }
  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        education:educationalList.map(({ id, ...rest }) => rest)
      }
    }

    LocalStorageApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
      setLoading(false);
      toast('Details updated !');
      enabledNext && enabledNext(true);
      // Update context with saved data
      setResumeInfo(prev => ({
          ...prev,
          education: educationalList
      }));
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!')
    })

  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList.map((item,index)=>(
        <div key={item.id || index}>
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University Name</label>
              <Input name="universityName" 
              onChange={(e)=>handleChange(e,index)}
              value={item?.universityName || ''}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input name="degree" 
              onChange={(e)=>handleChange(e,index)}
              value={item?.degree || ''} />
            </div>
            <div>
              <label>Major</label>
              <Input name="major" 
              onChange={(e)=>handleChange(e,index)}
              value={item?.major || ''} />
            </div>
            <div>
              <label>Start Date</label>
              <Input type="date" name="startDate" 
              onChange={(e)=>handleChange(e,index)}
              value={item?.startDate || ''} />
            </div>
            <div>
              <label>End Date</label>
              <Input type="date" name="endDate" 
              onChange={(e)=>handleChange(e,index)}
              value={item?.endDate || ''} />
            </div>
            <div className='col-span-2'>
              <label>Description</label>
              <Textarea name="description" 
              onChange={(e)=>handleChange(e,index)}
              value={item?.description || ''} />
            </div>

          </div>
       
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Education