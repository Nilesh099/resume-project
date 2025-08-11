// Helper function to sanitize HTML and prevent nested paragraph issues
const sanitizeHtml = (html) => {
  if (!html) return '';
  // Convert paragraph tags to div tags to avoid nesting issues
  return html
    .replace(/<p>/g, '<div>')
    .replace(/<\/p>/g, '</div>')
    .replace(/<div><\/div>/g, '<br>'); // Convert empty paragraphs to line breaks
};

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.Experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.themeColor
                }}>{experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{experience?.companyName}, 
                {experience?.city}, 
                {experience?.state}
                <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate} </span>
                </h2>
                <div 
                  className='work-summary text-xs my-2' 
                  dangerouslySetInnerHTML={{__html: sanitizeHtml(experience?.workSummery)}} 
                />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview