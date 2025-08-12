import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import LocalStorageApi from './../../../../../service/LocalStorageApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:'',

}
function Experience({ enabledNext }) {
    const [experinceList,setExperinceList]=useState([]);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(()=>{
        if (resumeInfo && !isInitialized) {
            if (resumeInfo?.Experience && resumeInfo.Experience.length > 0) {
                // Ensure all experiences have IDs
                const experiencesWithIds = resumeInfo.Experience.map((exp, index) => ({
                    ...exp,
                    id: exp.id || Date.now() + index
                }));
                setExperinceList(experiencesWithIds);
            } else {
                setExperinceList([{
                    ...formField,
                    id: Date.now()
                }])
            }
            setIsInitialized(true);
        }
    },[resumeInfo, isInitialized])

    // Reset initialization when resumeId changes
    useEffect(() => {
        setIsInitialized(false);
    }, [params?.resumeId]);

    const handleChange=(index,event)=>{
        const newEntries=experinceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setExperinceList(newEntries);
    }

    const AddNewExperience=()=>{
        const newExperience = {
            id: Date.now(), // Add unique ID
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummery:'',
        };
        setExperinceList(prev => [...prev, newExperience]);
    }

    const RemoveExperience=()=>{
        if (experinceList.length > 1) {
            setExperinceList(experinceList=>experinceList.slice(0,-1))
        }
    }

    const handleRichTextEditor=(value,name,index)=>{
        const newEntries=experinceList.slice();
        newEntries[index][name]=value;
        setExperinceList(newEntries);
    }

    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                Experience:experinceList.map(({ id, ...rest }) => rest)
            }
        }

        LocalStorageApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            setLoading(false);
            toast('Details updated !');
            enabledNext && enabledNext(true);
            // Update context with saved data
            setResumeInfo(prev => ({
                ...prev,
                Experience: experinceList
            }));
        },(error)=>{
            setLoading(false);
        })

    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
            {experinceList.map((item,index)=>(
                <div key={item.id || index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" 
                            onChange={(event)=>handleChange(index,event)}
                            value={item?.title || ''}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" 
                            onChange={(event)=>handleChange(index,event)}
                            value={item?.companyName || ''} />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" 
                            onChange={(event)=>handleChange(index,event)} 
                            value={item?.city || ''}/>
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" 
                            onChange={(event)=>handleChange(index,event)}
                            value={item?.state || ''}
                             />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date"  
                            name="startDate" 
                            onChange={(event)=>handleChange(index,event)} 
                            value={item?.startDate || ''}/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" 
                            onChange={(event)=>handleChange(index,event)} 
                            value={item?.endDate || ''}
                            />
                        </div>
                        <div className='col-span-2'>
                           {/* Work Summery  */}
                           <RichTextEditor
                           index={index}
                           defaultValue={item?.workSummery}
                           onRichTextEditorChange={(value)=>handleRichTextEditor(value,'workSummery',index)}  />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
        </div>
    </div>
  )
}

export default Experience