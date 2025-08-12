import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import LocalStorageApi from './../../../../../service/LocalStorageApi';
import { useUndoRedo, useKeyboardShortcuts } from '@/hooks/useUndoRedo'

function EditResume() {
    const {resumeId}=useParams();
    const [resumeInfo,setResumeInfo]=useState();
    
    // Initialize undo/redo system
    const undoRedo = useUndoRedo(resumeInfo || {})
    const { handleKeyDown } = useKeyboardShortcuts(
        undoRedo.undo, 
        undoRedo.redo, 
        undoRedo.canUndo, 
        undoRedo.canRedo
    )
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    const GetResumeInfo = useCallback(() => {
        LocalStorageApi.GetResumeById(resumeId).then(resp=>{
          setResumeInfo(resp.data.data);
          undoRedo.setState(resp.data.data);
        }).catch(error => {
          // If resume not found, create a default structure
          const defaultResumeInfo = {
            documentId: resumeId,
            firstName: '',
            lastName: '',
            jobTitle: '',
            address: '',
            phone: '',
            email: '',
            themeColor: '#3b82f6',
            themeType: 'modern',
            summery: '',
            Experience: [],
            education: [],
            skills: [],
            projects: []
          };
          setResumeInfo(defaultResumeInfo);
          undoRedo.setState(defaultResumeInfo);
        })
    }, [resumeId, undoRedo])

    useEffect(()=>{
        GetResumeInfo();
    },[GetResumeInfo])

    // Enhanced setResumeInfo that tracks changes for undo/redo
    const enhancedSetResumeInfo = (newInfo) => {
        setResumeInfo(newInfo)
        undoRedo.setState(newInfo)
    }

  return (
    <ResumeInfoContext.Provider value={{
        resumeInfo: undoRedo.state || resumeInfo,
        setResumeInfo: enhancedSetResumeInfo
    }}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section  */}
          <FormSection undoRedo={undoRedo} />
        {/* Preview Section  */}
         <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume