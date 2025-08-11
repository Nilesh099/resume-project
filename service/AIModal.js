// Static AI service that provides predefined content without requiring API keys
// This replaces the Google AI integration with static templates

// Static summary templates based on job titles and experience levels
const summaryTemplates = {
  "full stack developer": [
    {
      summery: "Experienced Full Stack Developer with 5+ years of expertise in modern web technologies. Proficient in React, Node.js, and database management. Strong problem-solving skills and passion for creating efficient, scalable applications.",
      experience_level: "Senior"
    },
    {
      summery: "Mid-level Full Stack Developer with 3+ years of experience building web applications. Skilled in frontend and backend technologies with focus on user experience and performance optimization.",
      experience_level: "Mid Level"
    },
    {
      summery: "Motivated Full Stack Developer with foundational knowledge in web development. Eager to apply programming skills and learn new technologies in a collaborative environment.",
      experience_level: "Fresher"
    }
  ],
  "frontend developer": [
    {
      summery: "Senior Frontend Developer with extensive experience in React, Angular, and Vue.js. Expert in creating responsive, user-friendly interfaces with focus on performance and accessibility.",
      experience_level: "Senior"
    },
    {
      summery: "Mid-level Frontend Developer with strong skills in modern JavaScript frameworks. Experience in responsive design and cross-browser compatibility with attention to detail.",
      experience_level: "Mid Level"
    },
    {
      summery: "Entry-level Frontend Developer with solid foundation in HTML, CSS, and JavaScript. Passionate about creating engaging user interfaces and learning modern frameworks.",
      experience_level: "Fresher"
    }
  ],
  "backend developer": [
    {
      summery: "Senior Backend Developer with expertise in Node.js, Python, and database architecture. Proven track record in building scalable APIs and microservices with focus on performance and security.",
      experience_level: "Senior"
    },
    {
      summery: "Mid-level Backend Developer with experience in server-side technologies and database management. Skilled in API development and system integration.",
      experience_level: "Mid Level"
    },
    {
      summery: "Aspiring Backend Developer with knowledge of server-side programming and database fundamentals. Eager to contribute to building robust backend systems.",
      experience_level: "Fresher"
    }
  ],
  "default": [
    {
      summery: "Experienced professional with strong technical skills and proven ability to deliver results. Passionate about continuous learning and contributing to team success.",
      experience_level: "Senior"
    },
    {
      summery: "Mid-level professional with solid experience and growing expertise. Committed to quality work and collaborative problem-solving.",
      experience_level: "Mid Level"
    },
    {
      summery: "Entry-level professional with strong foundation and enthusiasm for learning. Ready to contribute fresh perspectives and grow within the organization.",
      experience_level: "Fresher"
    }
  ]
};

// Static work summary templates for different positions
const workSummaryTemplates = {
  "full stack developer": [
    "• Designed and developed full-stack web applications using React and Node.js",
    "• Implemented responsive user interfaces ensuring seamless user experience across devices",
    "• Created RESTful APIs and integrated with various databases including MongoDB and PostgreSQL",
    "• Collaborated with cross-functional teams to deliver high-quality software solutions"
  ],
  "frontend developer": [
    "• Developed responsive and interactive user interfaces using React, Angular, and Vue.js",
    "• Optimized web applications for maximum speed and scalability",
    "• Implemented modern CSS frameworks and ensured cross-browser compatibility",
    "• Collaborated with UX/UI designers to translate mockups into functional interfaces"
  ],
  "backend developer": [
    "• Built and maintained robust backend services using Node.js, Python, and Java",
    "• Designed and implemented RESTful APIs and microservices architecture",
    "• Optimized database queries and improved application performance by 40%",
    "• Implemented security best practices and conducted code reviews"
  ],
  "default": [
    "• Successfully completed assigned projects within deadline and budget constraints",
    "• Collaborated effectively with team members to achieve common goals",
    "• Implemented best practices and contributed to process improvements",
    "• Maintained high standards of quality and attention to detail in all work"
  ]
};

// Mock AI Chat Session that returns static content
export const AIChatSession = {
  sendMessage: async (prompt) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Parse prompt to determine what type of content to generate
    if (prompt.includes("Job Title:") && prompt.includes("summery")) {
      // Extract job title from prompt
      const jobTitleMatch = prompt.match(/Job Title:\s*([^,]+)/i);
      const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim().toLowerCase() : "default";
      
      // Find matching template or use default
      const templates = summaryTemplates[jobTitle] || summaryTemplates["default"];
      
      return {
        response: {
          text: () => JSON.stringify(templates)
        }
      };
    } else if (prompt.includes("position title")) {
      // Generate work summary for experience section
      const positionMatch = prompt.match(/position title[:\s]+([^.]+)/i);
      const position = positionMatch ? positionMatch[1].trim().toLowerCase() : "default";
      
      const templates = workSummaryTemplates[position] || workSummaryTemplates["default"];
      const summary = templates.join("\n");
      
      return {
        response: {
          text: () => summary
        }
      };
    }
    
    // Default response
    return {
      response: {
        text: () => "Generated content based on your input."
      }
    };
  }
};
  
  
  