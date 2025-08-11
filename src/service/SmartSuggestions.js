// Smart suggestions service
const technologySuggestions = {
  // Frontend Technologies
  frontend: [
    'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte', 'jQuery',
    'HTML5', 'CSS3', 'SASS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material-UI',
    'Ant Design', 'Chakra UI', 'TypeScript', 'JavaScript', 'WebPack', 'Vite',
    'Parcel', 'Babel', 'ESLint', 'Prettier'
  ],
  
  // Backend Technologies  
  backend: [
    'Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'FastAPI', 'Java',
    'Spring Boot', 'Spring Framework', 'C#', '.NET', 'ASP.NET', 'PHP', 'Laravel',
    'CodeIgniter', 'Ruby', 'Ruby on Rails', 'Go', 'Gin', 'Rust', 'Kotlin'
  ],
  
  // Databases
  database: [
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'Supabase',
    'Oracle', 'SQL Server', 'DynamoDB', 'Cassandra', 'Neo4j', 'InfluxDB'
  ],
  
  // Cloud & DevOps
  cloud: [
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI',
    'GitHub Actions', 'Terraform', 'Ansible', 'Nginx', 'Apache', 'Linux', 'Ubuntu'
  ],
  
  // Mobile
  mobile: [
    'React Native', 'Flutter', 'Swift', 'SwiftUI', 'Kotlin', 'Java', 'Xamarin',
    'Ionic', 'Cordova', 'Android Studio', 'Xcode'
  ],
  
  // Tools & Others
  tools: [
    'Git', 'GitHub', 'GitLab', 'VS Code', 'IntelliJ IDEA', 'Postman', 'Insomnia',
    'Figma', 'Adobe XD', 'Sketch', 'Jira', 'Trello', 'Slack', 'Notion'
  ]
}

const allTechnologies = [
  ...technologySuggestions.frontend,
  ...technologySuggestions.backend,
  ...technologySuggestions.database,
  ...technologySuggestions.cloud,
  ...technologySuggestions.mobile,
  ...technologySuggestions.tools
]

// Project keywords that trigger specific tech suggestions
const projectKeywords = {
  'ecommerce': ['React', 'Node.js', 'MongoDB', 'Stripe', 'PayPal', 'Express.js'],
  'blog': ['Next.js', 'MDX', 'Vercel', 'Contentful', 'Strapi'],
  'dashboard': ['React', 'Chart.js', 'D3.js', 'Material-UI', 'Ant Design'],
  'mobile app': ['React Native', 'Flutter', 'Firebase', 'Expo'],
  'api': ['Node.js', 'Express.js', 'FastAPI', 'Django REST', 'Spring Boot'],
  'portfolio': ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
  'social media': ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
  'chat app': ['Socket.io', 'React', 'Node.js', 'MongoDB', 'Redis'],
  'game': ['Unity', 'C#', 'JavaScript', 'HTML5 Canvas', 'Three.js'],
  'machine learning': ['Python', 'TensorFlow', 'PyTorch', 'Jupyter', 'NumPy', 'Pandas'],
  'data analysis': ['Python', 'R', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  'web scraping': ['Python', 'BeautifulSoup', 'Scrapy', 'Selenium']
}

export class SmartSuggestions {
  static getTechSuggestions(input, limit = 10) {
    if (!input || input.length < 2) return []
    
    const searchTerm = input.toLowerCase()
    
    // Filter technologies that match the input
    const matches = allTechnologies.filter(tech => 
      tech.toLowerCase().includes(searchTerm)
    )
    
    // Sort by relevance (exact matches first, then partial matches)
    matches.sort((a, b) => {
      const aLower = a.toLowerCase()
      const bLower = b.toLowerCase()
      
      if (aLower.startsWith(searchTerm) && !bLower.startsWith(searchTerm)) return -1
      if (!aLower.startsWith(searchTerm) && bLower.startsWith(searchTerm)) return 1
      
      return a.length - b.length
    })
    
    return matches.slice(0, limit)
  }
  
  static getProjectTechSuggestions(projectTitle, projectDescription) {
    const text = `${projectTitle} ${projectDescription}`.toLowerCase()
    const suggestions = new Set()
    
    // Check for keyword matches
    Object.entries(projectKeywords).forEach(([keyword, techs]) => {
      if (text.includes(keyword)) {
        techs.forEach(tech => suggestions.add(tech))
      }
    })
    
    // Add some common technologies if no specific matches
    if (suggestions.size === 0) {
      ['JavaScript', 'HTML5', 'CSS3', 'Git'].forEach(tech => suggestions.add(tech))
    }
    
    return Array.from(suggestions)
  }
  
  static getSkillSuggestions(input, limit = 10) {
    return this.getTechSuggestions(input, limit)
  }
  
  static getCategorizedSuggestions() {
    return technologySuggestions
  }
}

export default SmartSuggestions
