import { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import Projects from './forms/Projects';
import { Link, Navigate, useParams } from 'react-router-dom';
import EnhancedThemeSelector from './EnhancedThemeSelector';

function FormSection({ undoRedo }) {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {resumeId}=useParams();
  return (
    <div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-5'>
            <Link to={"/"}>
          <Button><Home/></Button>
          </Link>
          <EnhancedThemeSelector undoRedo={undoRedo} />
         
          </div>
          <div className='flex gap-2'>
            {activeFormIndex > 1 && (
              <Button 
                size="sm" 
                onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              > 
                <ArrowLeft/> 
              </Button>
            )}
            {activeFormIndex < 7 && (
              <Button 
                disabled={!enableNext}
                className="flex gap-2" 
                size="sm"
                onClick={() => setActiveFormIndex(activeFormIndex + 1)}
              > 
                Next 
                <ArrowRight/> 
              </Button>
            )}
          </div>
        </div>
        {/* Form Components */}
        {activeFormIndex === 1 ? (
          <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 2 ? (
          <Summery enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 3 ? (
          <Experience enabledNext={(v) => setEnableNext(v)} />  
        ) : activeFormIndex === 4 ? (
          <Education enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 5 ? (
          <Projects enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 6 ? (
          <Skills enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 7 ? (
          <Navigate to={'/my-resume/' + resumeId + "/view"} />
        ) : null}
        

      {/* Experience  */}

      {/* Educational Detail  */}

      {/* Skills  */}

    </div>
  )
}

export default FormSection