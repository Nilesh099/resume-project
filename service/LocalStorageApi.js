// LocalStorage API service to replace database functionality
// This provides the same interface as GlobalApi but uses localStorage

const STORAGE_KEYS = {
  RESUMES: 'ai_resume_builder_resumes',
  CURRENT_ID: 'ai_resume_builder_current_id'
};

// Helper function to generate unique IDs
const generateId = () => {
  let currentId = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_ID) || '0');
  currentId += 1;
  localStorage.setItem(STORAGE_KEYS.CURRENT_ID, currentId.toString());
  return currentId.toString();
};

// Helper function to get all resumes from localStorage
const getAllResumes = () => {
  const resumesJson = localStorage.getItem(STORAGE_KEYS.RESUMES);
  return resumesJson ? JSON.parse(resumesJson) : [];
};

// Helper function to save resumes to localStorage
const saveResumes = (resumes) => {
  localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));
};

// Helper function to simulate async API response
const simulateApiResponse = (data, delay = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          data: data
        }
      });
    }, delay);
  });
};

const CreateNewResume = async (requestData) => {
  const resumes = getAllResumes();
  const documentId = generateId();
  
  const newResume = {
    title: requestData.data.title || 'Untitled Resume',
    userEmail: requestData.data.userEmail || 'user@resume.com',
    userName: requestData.data.userName || 'User',
    documentId: documentId,
    id: documentId, // Use same ID for consistency
    resumeId: documentId, // Also add resumeId for backwards compatibility
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Initialize with default structure
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
    themeColor: '#ff6666',
    summery: '',
    Experience: [],
    education: [],
    skills: [],
    projects: []
  };
  
  resumes.push(newResume);
  saveResumes(resumes);
  
  return simulateApiResponse(newResume);
};

const GetUserResumes = async (userEmail) => {
  const resumes = getAllResumes();
  const userResumes = resumes.filter(resume => resume.userEmail === userEmail);
  
  return simulateApiResponse(userResumes);
};

const UpdateResumeDetail = async (id, requestData) => {
  const resumes = getAllResumes();
  const resumeIndex = resumes.findIndex(resume => resume.documentId === id || resume.id === id);
  
  if (resumeIndex === -1) {
    throw new Error('Resume not found');
  }
  
  // Update the resume with new data
  resumes[resumeIndex] = {
    ...resumes[resumeIndex],
    ...requestData.data,
    updatedAt: new Date().toISOString()
  };
  
  saveResumes(resumes);
  
  return simulateApiResponse(resumes[resumeIndex]);
};

const GetResumeById = async (id) => {
  const resumes = getAllResumes();
  
  const resume = resumes.find(resume => {
    return resume.documentId === id || resume.id === id;
  });
  
  if (!resume) {
    throw new Error('Resume not found');
  }
  
  return simulateApiResponse(resume);
};

const DeleteResumeById = async (id) => {
  const resumes = getAllResumes();
  const filteredResumes = resumes.filter(resume => resume.documentId !== id && resume.id !== id);
  
  saveResumes(filteredResumes);
  
  return simulateApiResponse({ success: true });
};

// Export the same interface as GlobalApi
export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById
};
