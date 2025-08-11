import { createContext, useContext } from "react";
import PropTypes from "prop-types";

// Generic user data for the application
const defaultUser = {
  id: 'user-001',
  firstName: 'User',
  lastName: '',
  email: 'user@resume.com',
  fullName: 'User',
  primaryEmailAddress: {
    emailAddress: 'user@resume.com'
  },
  profileImage: null,
  createdAt: new Date().toISOString(),
  preferences: {
    theme: 'modern',
    defaultColor: '#3b82f6'
  }
}

const MockUserContext = createContext(defaultUser)

export const useMockUser = () => {
  const context = useContext(MockUserContext)
  if (!context) {
    return defaultUser // Return default user if context is not available
  }
  return context
}

export const MockUserProvider = ({ children }) => {
  return (
    <MockUserContext.Provider value={defaultUser}>
      {children}
    </MockUserContext.Provider>
  )
}

MockUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MockUserContext
