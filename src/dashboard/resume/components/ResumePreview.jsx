import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import ProjectsPreview from './preview/ProjectsPreview'

function ResumePreview() {

    const {resumeInfo}=useContext(ResumeInfoContext)

    // Theme styles based on selected theme type
    const getThemeStyles = () => {
        const themeType = resumeInfo?.themeType || 'modern';
        
        if (themeType === 'classic') {
            // Classic/Dark theme
            return {
                container: 'shadow-lg h-full p-14 border-t-[20px] bg-gray-900 text-white',
                headerBg: 'bg-gray-800',
                sectionBg: 'bg-gray-800',
                textPrimary: 'text-white',
                textSecondary: 'text-gray-300',
                border: 'border-gray-700'
            };
        } else {
            // Modern/Light theme (default)
            return {
                container: 'shadow-lg h-full p-14 border-t-[20px] bg-white text-gray-900',
                headerBg: 'bg-gray-50',
                sectionBg: 'bg-gray-50',
                textPrimary: 'text-gray-900',
                textSecondary: 'text-gray-600',
                border: 'border-gray-200'
            };
        }
    };

    const themeStyles = getThemeStyles();

  return (
    <div className={themeStyles.container}
    style={{
        borderColor:resumeInfo?.themeColor
    }}>
        {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} themeStyles={themeStyles} />
        {/* Summery  */}
            <SummeryPreview resumeInfo={resumeInfo} themeStyles={themeStyles} />
        {/* Professional Experience  */}
           {resumeInfo?.Experience?.length>0&& <ExperiencePreview resumeInfo={resumeInfo} themeStyles={themeStyles} />}
        {/* Projects  */}
           {resumeInfo?.projects?.length>0&& <ProjectsPreview resumeInfo={resumeInfo} themeStyles={themeStyles} />}
        {/* Educational  */}
        {resumeInfo?.education?.length>0&&   <EducationalPreview resumeInfo={resumeInfo} themeStyles={themeStyles} />}
        {/* Skilss  */}
        {resumeInfo?.skills?.length>0&&    <SkillsPreview resumeInfo={resumeInfo} themeStyles={themeStyles} />}
    </div>
  )
}

export default ResumePreview