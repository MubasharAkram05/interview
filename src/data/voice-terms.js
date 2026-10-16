// Data for voice correction (src/services/vocab.js). Edit freely; spelling and capitals here are
// what the app writes.

// Interview and tech terms the speech service often splits or spells wrong.
export const TERMS = [
  'AWS', 'Azure', 'GCP', 'DevOps', 'DevSecOps', 'MLOps', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Jenkins',
  'CI/CD', 'GitHub', 'GitLab', 'Bitbucket', 'Git', 'Linux', 'Ubuntu', 'Nginx', 'Apache', 'Kafka', 'Redis',
  'RabbitMQ', 'Elasticsearch', 'Grafana', 'Prometheus', 'Microservices', 'Serverless', 'Lambda', 'Cloudflare',
  'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'Next.js', 'React', 'Redux', 'Angular', 'Vue.js', 'Svelte',
  'jQuery', 'Bootstrap', 'Tailwind', 'HTML', 'CSS', 'SASS', 'Webpack', 'Vite', 'npm', 'JSON', 'XML', 'YAML',
  'API', 'REST', 'GraphQL', 'gRPC', 'OAuth', 'JWT', 'SDK', 'IDE', 'VS Code', 'Postman', 'Swagger',
  'Python', 'Django', 'Flask', 'FastAPI', 'NumPy', 'Pandas', 'TensorFlow', 'PyTorch', 'Keras', 'scikit-learn',
  'Java', 'Spring Boot', 'Kotlin', 'Swift', 'Flutter', 'Dart', 'Android', 'iOS', 'Xcode', 'Firebase',
  'PHP', 'Laravel', 'WordPress', 'Shopify', 'Magento', 'C#', '.NET', 'ASP.NET', 'C++', 'Golang', 'Rust', 'Ruby on Rails',
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'NoSQL', 'SQLite', 'Oracle', 'DynamoDB', 'Supabase',
  'MERN', 'MEAN', 'OOP', 'DSA', 'SOLID', 'MVC', 'MVVM', 'UI', 'UX', 'UI/UX', 'Figma', 'Adobe XD', 'Photoshop', 'Canva',
  'AI', 'ML', 'NLP', 'LLM', 'ChatGPT', 'Data Science', 'Power BI', 'Tableau', 'Excel', 'Looker',
  'Agile', 'Scrum', 'Kanban', 'Jira', 'Trello', 'Confluence', 'Slack', 'QA', 'SDLC', 'Selenium', 'Cypress', 'Jest',
  'SEO', 'SEM', 'SMM', 'PPC', 'CRM', 'ERP', 'SAP', 'Salesforce', 'HubSpot', 'KPI', 'KPIs', 'ROI', 'B2B', 'B2C', 'SaaS',
  'CCNA', 'CCNP', 'CompTIA', 'Security+', 'CEH', 'OSCP', 'CISSP', 'PMP', 'ITIL', 'TCP/IP', 'DNS', 'VPN', 'SIEM',
  'LinkedIn', 'CV', 'HR', 'MBA', 'BBA', 'BSCS', 'BSIT', 'BSSE', 'MCS', 'MSc', 'PhD', 'CGPA', 'GPA', 'HEC', 'NUST',
  'FAST', 'COMSATS', 'LUMS', 'IIT', 'Fiverr', 'Upwork', 'freelancing', 'internship', 'teamwork'
];

// Countries and cities. A heard word on this list is never changed automatically
// ("Pakistan" stays "Pakistan" even if the speaker's hometown is Pakpattan), unless the user
// adds an explicit alias in My words.
export const PLACES = [
  // Countries
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain',
  'Bangladesh', 'Belarus', 'Belgium', 'Bhutan', 'Bolivia', 'Bosnia', 'Brazil', 'Brunei', 'Bulgaria', 'Cambodia',
  'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Egypt',
  'England', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Libya', 'Lithuania',
  'Malaysia', 'Maldives', 'Mexico', 'Mongolia', 'Morocco', 'Myanmar', 'Nepal', 'Netherlands', 'Holland', 'Nigeria',
  'Norway', 'Oman', 'Pakistan', 'Palestine', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Saudi', 'Arabia', 'Scotland', 'Senegal', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia',
  'Somalia', 'Spain', 'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
  'Tunisia', 'Turkey', 'Turkiye', 'Turkmenistan', 'Uganda', 'Ukraine', 'Emirates', 'UAE', 'UK', 'USA', 'America',
  'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Wales', 'Yemen', 'Zambia', 'Zimbabwe', 'Dubai', 'Europe', 'Asia',
  'Africa',
  // Pakistan
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot',
  'Gujranwala', 'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana', 'Abbottabad', 'Mardan', 'Okara',
  'Sahiwal', 'Kasur', 'Jhang', 'Sheikhupura', 'Rahim Yar Khan', 'Gujrat', 'Jhelum', 'Muzaffarabad', 'Mirpur',
  'Gilgit', 'Skardu', 'Swat', 'Murree', 'Chiniot', 'Vehari', 'Khanewal', 'Dera Ghazi Khan', 'Mianwali', 'Attock',
  'Punjab', 'Sindh', 'Balochistan', 'Khyber', 'Pakhtunkhwa', 'Kashmir',
  // India
  'Delhi', 'Mumbai', 'Bombay', 'Kolkata', 'Chennai', 'Bangalore', 'Bengaluru', 'Pune', 'Ahmedabad', 'Jaipur',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Surat', 'Noida', 'Gurgaon', 'Gurugram', 'Chandigarh',
  'Amritsar', 'Kochi', 'Goa', 'Kerala',
  // Other big cities
  'London', 'Paris', 'Berlin', 'Tokyo', 'Beijing', 'Riyadh', 'Jeddah', 'Doha', 'Toronto', 'Sydney', 'Istanbul'
];
