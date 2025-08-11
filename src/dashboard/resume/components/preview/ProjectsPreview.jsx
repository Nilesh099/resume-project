function ProjectsPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        Projects
      </h2>
      <hr style={{
        borderColor: resumeInfo?.themeColor
      }} />

      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className='my-4'>
          <h2 className='text-sm font-bold'
            style={{
              color: resumeInfo?.themeColor
            }}
          >
            {project?.title}
            {project?.url && (
              <span className='text-xs font-normal ml-2'>
                ({project.url})
              </span>
            )}
          </h2>
          
          {project?.description && (
            <p className='text-xs my-2'>
              {project.description}
            </p>
          )}
          
          {project?.techStack && project.techStack.length > 0 && (
            <div className='my-2'>
              <span className='text-xs font-medium'>Tech Stack: </span>
              <span className='text-xs'>
                {project.techStack.filter(tech => tech.trim()).join(', ')}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProjectsPreview
