import { MORE } from './more-questions.js';

export const CATS = {
  software: 'Software Developer',
  marketing: 'Marketing',
  customer: 'Customer Service',
  teaching: 'Teaching',
  fresh: 'Fresh Graduate',
  cloud: 'Cloud Engineer'
};

export const LEVELS = {
  fresher: 'Fresher',
  junior: 'Junior',
  senior: 'Senior'
};

export const ROLE = {
  software: 'Software Developer',
  marketing: 'Marketing Executive',
  customer: 'Customer Service Representative',
  teaching: 'Teacher',
  cloud: 'Cloud and DevOps Engineer'
};

export const FIELDS = [
  ['name', 'Full name'],
  ['degree', 'Degree / program'],
  ['uni', 'University / institute'],
  ['city', 'Hometown / city'],
  ['role', 'Target role'],
  ['certs', 'Certifications'],
  ['skills', 'Key skills'],
  ['project', 'Best project'],
  ['strength', 'Main strength'],
  ['weakness', 'A weakness you are improving'],
  ['achievement', 'Biggest achievement']
];

export const FF = FIELDS.filter(([k]) => !['strength', 'weakness', 'project', 'achievement'].includes(k));

export const DEF = {
  degree: 'my degree',
  uni: 'my university',
  certs: 'relevant online courses',
  project: 'a project I built and delivered',
  achievement: 'I completed a project on time and learned a lot from it',
  strength: 'solving problems and learning new tools quickly',
  weakness: 'spending extra time on small details'
};

export const HEAD = [
  [
    'Introduce yourself in 2 minutes.',
    'Good morning. My name is {name}, and I am a {degree} student at {uni}. I have hands-on experience with {skills}, and I hold {certs}. Most recently I worked on {project}. I am now looking for a {role} opportunity where I can apply these skills, keep learning and contribute from day one.'
  ],
  [
    'What are your strengths?',
    'My core strength is {strength}. For example, {achievement}. This helps me deliver reliable work and adapt quickly when requirements change.'
  ],
  [
    'What are your weaknesses?',
    'One area I am working on is {weakness}. To improve it, I set clear time limits for each task, review my priorities daily and ask for feedback early. I have already seen better focus and faster delivery as a result.'
  ],
  [
    'Tell me about your best project or achievement.',
    'My proudest work is {project}. I was responsible for planning, building and testing it, and it taught me to break a large goal into small deliverables. {achievement}. It strengthened my confidence in delivering work end to end.'
  ]
];

export const TAIL = [
  [
    'Why do you want to work at this company?',
    'I have researched your work, and your focus on quality and growth matches my goals. My experience with {skills} fits the {role} position, and I want to grow alongside a team that values learning and ownership.'
  ],
  [
    'Tell me about a time you received critical feedback.',
    'Feedback on {project} showed me an area to improve. I listened without defending, agreed on a clear action plan and applied it right away. My next result improved, and I now ask for feedback early instead of waiting.'
  ],
  [
    'Why are you interested in this field?',
    'I enjoy solving real problems with technology, and {project} confirmed that this work suits me. With {certs} and regular hands-on practice, I want to build a long-term career as a {role}.'
  ],
  [
    'What are your salary expectations?',
    'I am looking for a fair, market-aligned salary for this role and my experience level. I am flexible, and I would like to understand the full responsibilities and growth path before discussing a specific number.'
  ],
  [
    'Where do you see yourself in 5 years?',
    'In five years I see myself as a skilled {role}, trusted with larger responsibilities and mentoring newer team members. I plan to keep strengthening {skills} and earn advanced certifications along the way.'
  ],
  [
    'Why should we hire you?',
    'I bring {skills}, relevant certifications ({certs}) and practical project experience. I learn quickly, communicate clearly and take ownership of results. I will be a dependable member of your team from the start.'
  ]
];

export const MID = {
  software: [
    [
      'Which programming language are you strongest in, and why?',
      'My strongest area is the stack I use most: {skills}. I have applied it on real work such as {project}. I value clean, readable code and a strong ecosystem, and I choose tools based on the problem, not preference.'
    ],
    [
      'Describe a difficult bug you fixed recently.',
      'Situation: while building {project}, I hit a bug that appeared only under certain conditions. Task: find the root cause without breaking other features. Action: I reproduced it, used logs and breakpoints to isolate it, and fixed it. Result: the issue was resolved and I added a test so it would not return.'
    ],
    [
      'What do you know about Git and version control?',
      'Git is a version control system that tracks every change so many people can work on one codebase safely. I create a branch per feature, commit small changes with clear messages, and merge through pull requests with code review.'
    ],
    [
      'Explain a REST API in simple terms.',
      'A REST API lets two systems communicate over HTTP. The client sends a request to an endpoint using GET, POST, PUT or DELETE, and the server returns a response, usually JSON with a status code. It is stateless, which makes it simple to scale.'
    ],
    [
      'What is the difference between SQL and NoSQL databases?',
      'SQL databases store structured data in tables with a fixed schema and strong relationships, and they support transactions. NoSQL databases store flexible data such as documents or key-value pairs and scale horizontally. I choose based on data structure, consistency needs and scale.'
    ],
    [
      'What do you do when you are at risk of missing a deadline?',
      'I raise the risk early, break the work into priorities, deliver the most important parts first and agree on scope with my team lead. Clear, early communication prevents surprises.'
    ],
    [
      'How do you write code that is easy to maintain?',
      'I use clear naming, small focused functions, consistent style and tests. I document decisions that are not obvious and welcome code review before merging.'
    ]
  ],
  marketing: [
    [
      'Share a successful marketing campaign you admire.',
      "I admire campaigns that combine strong storytelling with clear targeting. They don't just get attention, they drive measurable action from the audience."
    ],
    [
      'What is the difference between social media and traditional marketing?',
      'Social media is interactive, targeted and gives instant feedback. Traditional marketing like TV and print reaches a broad audience but with less targeting and slower feedback.'
    ],
    [
      'How do you identify a target audience?',
      'I study demographics, interests and behavior using data from past campaigns and tools like Google Analytics, then check who actually engages and converts.'
    ],
    [
      'How would you run effective marketing on a low budget?',
      "I'd focus on organic social media, email and content first, test small, and only pay for ads that prove they bring results."
    ],
    [
      'How would you handle an unhappy client?',
      'I listen first, apologize sincerely, offer a concrete solution and keep them updated. Clear communication rebuilds trust quickly.'
    ],
    [
      'How do you measure the success of a campaign?',
      'I set KPIs before launch, like reach, conversion rate and ROI, then track them and adjust the strategy based on results.'
    ],
    [
      'How do you stay updated with marketing trends?',
      'I follow industry blogs and newsletters, study competitor campaigns, and test new ideas in small experiments.'
    ]
  ],
  customer: [
    [
      'How would you calm down an angry customer?',
      'I use the LAST method: Listen fully without interrupting, Apologize for the experience, Solve the problem with clear next steps, and Thank the customer for their patience. I keep my tone steady and focus on the solution, not on the emotion.'
    ],
    [
      'Describe your most difficult customer service situation.',
      'Situation: a customer had the same issue unresolved after several contacts. Task: fix it and restore trust. Action: I reviewed the history, apologized, took ownership, coordinated with the right team and kept the customer updated. Result: the issue was resolved and the customer thanked me for the follow-up.'
    ],
    [
      'How do you prioritize when many customers need help at once?',
      'I assess urgency and impact first, so outages and security issues come before general questions. I tell waiting customers honestly how long they will wait, and I keep clear ticket notes so nothing is missed.'
    ],
    [
      "What do you do when policy conflicts with a customer's request?",
      'I explain the policy and the reason behind it politely, then offer the best alternative within the rules. If an exception is needed, I escalate to a supervisor with full details so the customer does not have to repeat themselves.'
    ],
    [
      'How do you stay patient in stressful situations?',
      'I remember that the customer is frustrated with the situation, not with me. I breathe, take short breaks between difficult calls and focus on what I can fix.'
    ],
    [
      'Describe a mistake you made and how you handled it.',
      'I once gave incorrect information. As soon as I noticed, I contacted the customer, apologized, gave the correct answer and made sure the outcome was right. I then double-checked my sources, and I now verify before I respond.'
    ],
    [
      'How do you keep quality high during repetitive tasks?',
      'I follow a checklist, take short breaks and treat every customer as a new case, so my answers stay accurate and friendly.'
    ],
    [
      'What does good customer service mean to you?',
      'It means listening carefully, being honest, resolving the issue quickly and making the customer feel valued. Good service solves the problem and also leaves the customer confident to return.'
    ],
    [
      'How do you handle a customer who asks for something you cannot provide?',
      'I stay positive, explain clearly what I cannot do and why, and focus on what I can offer instead. I suggest alternatives and make sure the customer leaves with a next step.'
    ],
    [
      'How do you deliver bad news to a customer?',
      'I am direct and honest, apologize sincerely, explain what happened and what we are doing about it, and give a realistic timeline. Customers trust honesty more than empty promises.'
    ],
    [
      'How do you handle phone, chat and email support?',
      'I adjust my tone and length to each channel: short and quick on chat, warm and clear on calls, structured and detailed on email. I keep notes in one system so every channel has the full history.'
    ],
    [
      'How do you measure your performance in customer service?',
      'I track customer satisfaction scores, first-contact resolution, response time and quality reviews. I review feedback regularly and set small goals to improve.'
    ]
  ],
  teaching: [
    [
      'How would you describe your teaching style?',
      'My style is student-centered. I explain with examples, link ideas to real life, and check understanding with questions.'
    ],
    [
      "How do you handle a student who isn't interested?",
      'I find what interests the student and connect lessons to it. A private conversation often reveals the real reason for disengagement.'
    ],
    [
      'How do you maintain discipline in the classroom?',
      'I set clear expectations early, stay consistent and address issues calmly and privately instead of embarrassing a student.'
    ],
    ['How do you support weaker students?', 'I give extra one-on-one time, break topics into small steps and celebrate small progress to keep them motivated.'],
    [
      'How do you communicate with parents?',
      'I update parents regularly, not only when there is a problem, and I listen fully to their concerns before responding.'
    ],
    ['How do you use technology in teaching?', 'I use slides, videos, quizzes and simple apps to make lessons more engaging, especially for visual learners.'],
    [
      'How do you check that students understood the lesson?',
      'I use quick questions, short quizzes and exit tickets, then revisit any topic most students found difficult.'
    ]
  ],
  cloud: [
    [
      'What is cloud computing and what are its main service models?',
      'Cloud computing delivers servers, storage, databases and networking over the internet on a pay-as-you-go basis. The service models are IaaS for infrastructure, PaaS for managed platforms and SaaS for ready-to-use software. It offers scalability, cost efficiency and global reach.'
    ],
    [
      'Explain the shared responsibility model.',
      'The provider is responsible for security of the cloud: facilities, hardware and core services. I am responsible for security in the cloud: identities, data, configuration, network rules and applications. Most breaches come from customer misconfiguration, so this model matters.'
    ],
    [
      'What is IAM and the principle of least privilege?',
      'IAM controls who can access which resources and what they can do. Least privilege means granting only the permissions needed for a task. I use roles instead of long-term keys, enable MFA and review permissions regularly.'
    ],
    [
      'What is Infrastructure as Code and why use it?',
      'Infrastructure as Code defines infrastructure in version-controlled files using tools like Terraform or CloudFormation. It makes environments repeatable, reviewable and fast to rebuild, and it removes manual configuration errors.'
    ],
    [
      'Explain a basic CI/CD pipeline.',
      'Code is pushed to Git, then the pipeline builds it, runs unit tests and security scans, and deploys automatically to staging and to production after approval. This delivers faster, safer and more consistent releases.'
    ],
    [
      'What is the difference between a container and a virtual machine?',
      'A virtual machine runs a full guest operating system on a hypervisor, so it is heavier and slower to start. A container shares the host kernel and packages only the app and its dependencies, so it is lighter and starts in seconds. Containers give consistent deployments, while virtual machines give stronger isolation.'
    ],
    [
      'What is Kubernetes, and why do teams use it?',
      'Kubernetes is an open source platform that runs and manages containers across many machines. It schedules containers, restarts failed ones, scales them up or down and handles rolling updates. Teams use it to run many services reliably, but for a small app a simpler managed service can be enough.'
    ]
  ],
  fresh: [
    [
      'What is the biggest lesson you learned in college?',
      'At {uni}, I learned to manage several deadlines by prioritizing tasks and planning ahead. This taught me discipline, and I now start early instead of waiting for pressure.'
    ],
    [
      'Do you prefer teamwork or individual work?',
      'I value teamwork because different perspectives produce better solutions, and I communicate clearly and share credit. I am equally comfortable working independently on focused tasks, and I choose the approach that fits the goal.'
    ],
    [
      'How do you handle stress or pressure?',
      'I break the problem into smaller steps, set priorities and tackle them one at a time. I take short breaks to stay focused and ask for help early when needed.'
    ],
    [
      'Describe a time you showed leadership.',
      'In a group project, I organized tasks, set deadlines and supported teammates who were stuck. We delivered on time and the project was well received. I learned that leadership means clarity and support.'
    ],
    [
      'Are you willing to learn new skills and work flexible hours?',
      'Yes. I am eager to learn new skills, and I understand that a new role can require flexibility. I will communicate early if I need support.'
    ],
    [
      'What would you like to ask us about this job?',
      'Yes. What does success look like in the first 90 days? Which skills matter most for this role? And how does the team support learning and growth?'
    ],
    [
      'What motivates you to do your best work?',
      'I am motivated by learning, solving real problems and seeing my work help others. Clear goals and regular feedback keep me focused and consistent.'
    ],
    [
      'What have you learned about our company before this interview?',
      'I have researched your company, including its mission, main services and recent work. I like your focus on quality and growth, and I can see how this role contributes to your goals.'
    ],
    [
      'How do you handle conflict with a teammate?',
      'I talk to the person privately, listen to their view and focus on the problem, not the person. We agree on a shared solution, and if needed I involve a lead. Respectful, early communication keeps teams productive.'
    ],
    [
      'Describe a time you failed and what you learned.',
      'In a past project I underestimated the time needed and missed an internal deadline. I took responsibility, reorganized my plan and delivered soon after. Now I add buffer time and share progress early.'
    ],
    [
      'How do you prioritize tasks and manage your time?',
      'I list tasks, rank them by urgency and impact, and plan my day around the most important ones. I use a calendar and checklists, and I review my progress at the end of each day.'
    ],
    [
      'Why did you choose your degree, and what have you gained from it?',
      'I chose {degree} because I enjoy technology and problem solving. At {uni} I gained {skills}, along with teamwork, time management and communication skills. I added {certs} to strengthen my practical profile.'
    ],
    [
      'How would your teachers or friends describe you?',
      'They would describe me as reliable, hardworking and quick to learn. I help others when I can, and I take responsibility for my work.'
    ]
  ]
};

export const OV = {
  customer: {
    'Introduce yourself in 2 minutes.':
      'My name is {name}. I am studying {degree} at {uni}, and I have strong communication and problem-solving skills along with {skills}. I enjoy listening to people, understanding their problem and solving it clearly and politely. I am looking for a customer service role where I can deliver excellent support and keep learning.',
    'What are your strengths?':
      "My core strength is {strength}, together with clear communication and patience. For example, {achievement}. These help me understand a customer's issue quickly and resolve it with confidence.",
    'Why are you interested in this field?':
      'I enjoy helping people, and I find it rewarding to turn a frustrated customer into a satisfied one. Support work builds communication, patience and problem-solving, and I want to build a long-term career in customer service.',
    'Where do you see yourself in 5 years?':
      'In five years I see myself as an experienced customer service professional, possibly a team lead, handling complex cases and training new agents. I plan to keep improving my communication and product knowledge.',
    'Why should we hire you?':
      'I bring strong communication, patience and a problem-solving mindset, along with {skills}. I stay calm under pressure, take ownership of every case until it is resolved and treat every customer with respect.',
    'Why do you want to work at this company?':
      'I have researched your company and admire your focus on customer satisfaction. I want to be part of a team that values quality service, and I believe my communication and problem-solving skills will help you keep customers happy.',
    'Tell me about a time you received critical feedback.':
      'I once received feedback that my explanations could be shorter and clearer. I accepted it, practiced simplifying my words and checked understanding with the customer. My next interactions improved, and I now ask for feedback regularly.'
  }
};

export const MYH = [
  [
    'Introduce yourself in 2 minutes.',
    'My name is {name}. I am studying {degree} at {uni}. I am a fresher, and my skills include {skills}. Recently I worked on {project}, and I am looking for a role where I can learn and add value.'
  ],
  ['What are your strengths?', 'My main strength is {strength}. For example, {achievement}. This helps me finish my work well and keep improving.'],
  ['What are your weaknesses?', 'My weakness is {weakness}. Now I set small goals and time limits and ask for feedback, so I am improving step by step.'],
  [
    'Tell me about your best project or achievement.',
    'My proudest work is {project}. {achievement}. It taught me planning, problem-solving and how to finish what I start.'
  ]
];

export const MYT = [
  ['Why are you interested in this field?', 'I enjoy this kind of work, and my studies and projects like {project} showed me I can build real skills here.'],
  [
    'What are your salary expectations?',
    'As a fresher, I expect a fair starting salary that matches the role and the market. My main focus is to learn and grow, and I am open to discussing the number.'
  ],
  [
    'Where do you see yourself in 5 years?',
    'In five years I want to be a skilled professional with more responsibility, using {skills} and helping new team members.'
  ],
  ['Why should we hire you?', 'I am a fresher, but I learn fast and I bring {skills}, {strength} and a strong work ethic. I take responsibility for my work.']
];

export const MYM = {
  software: [
    [
      'Which programming language are you strongest in, and why?',
      'I am most comfortable with JavaScript and HTML/CSS because I use them in my projects. I like how quickly I can build and test something with them, and I keep improving my other skills step by step.'
    ],
    [
      'Describe a difficult bug you fixed recently.',
      'In one web project, a button did nothing and I could not see why. I checked the browser console, found a wrong variable name and fixed it. Now I test small parts as I code.'
    ],
    [
      'What do you know about Git and version control?',
      'Git saves every version of my code, so I can go back if something breaks. I use commits with clear messages and branches for new features. I am still learning pull requests and team workflows.'
    ],
    [
      'Explain a REST API in simple terms.',
      'A REST API lets an app talk to a server over the internet. The app sends a request like GET or POST, and the server sends back data, usually in JSON.'
    ],
    [
      'What is the difference between SQL and NoSQL databases?',
      'SQL databases keep data in tables with fixed columns, so they suit structured data. NoSQL is more flexible and stores data like documents. I choose based on what the project needs.'
    ],
    [
      "What do you do when you're at risk of missing a deadline?",
      'I tell my supervisor early, finish the most important part first and ask for help if needed. In my virtual internship I met my deadlines this way.'
    ]
  ],
  marketing: [
    [
      'Share a successful marketing campaign you admire.',
      'I admire campaigns with a simple message that people remember and share. As a fresher, I study them to learn how good content, timing and the right audience work together.'
    ],
    [
      'What is the difference between social media and traditional marketing?',
      'Social media is cheap and fast, and it lets us target people and see results at once. Traditional marketing like TV or banners reaches many people but costs more and is harder to measure.'
    ],
    [
      'How do you identify a target audience?',
      'I look at the age, interests, location and needs of people who may buy. I check data from past posts or surveys, then speak to them in the way they like.'
    ],
    [
      'How would you run effective marketing on a low budget?',
      'I would use free tools like social media posts, short videos, WhatsApp groups and email. I would test small ideas first and spend only on what works.'
    ],
    [
      'How would you handle an unhappy client?',
      'I listen fully, say sorry for the problem and explain how I will fix it. Then I update them on time. Honest and clear communication keeps trust.'
    ],
    [
      'How do you measure the success of a campaign?',
      'I set simple goals first, like reach, clicks and sales. After the campaign I check the numbers, see what worked and improve the next one.'
    ]
  ],
  customer: [
    ['How would you calm down an angry customer?', 'I stay calm and let them finish speaking. I say sorry for the problem, then focus on fixing it.'],
    [
      'Describe your most difficult customer service situation.',
      'I do not have paid customer service experience yet, but in my internship I helped people with technical problems. When someone was confused, I listened, explained in simple words and checked that they understood.'
    ],
    [
      'How do you prioritize when many customers need help at once?',
      'I handle urgent problems first, like something not working at all, then simple questions. I tell waiting customers politely that I will help soon, so nobody feels ignored.'
    ],
    [
      "What do you do when policy conflicts with a customer's request?",
      'I explain the policy politely and the reason for it. I try to offer another option that helps the customer. If they still need an exception, I ask a senior.'
    ],
    [
      'How do you stay patient in stressful situations?',
      'I remember that the customer is upset about the problem, not about me. I breathe, speak slowly and focus on helping. Short breaks also help me reset.'
    ],
    [
      'Describe a mistake you made and how you handled it.',
      'If I make a mistake, I tell my senior at once, fix it and tell the customer honestly. Then I check my work more carefully next time.'
    ]
  ],
  teaching: [
    [
      'How would you describe your teaching style?',
      'I explain step by step with simple examples and then let students practice. I ask questions to check understanding and use real-life examples so lessons are easy to remember.'
    ],
    [
      "How do you handle a student who isn't interested?",
      'I first find out why. I connect the topic to something they like and give small tasks they can finish. A friendly talk after class also helps.'
    ],
    [
      'How do you maintain discipline in the classroom?',
      'I set simple rules on the first day and follow them fairly. I keep students busy with useful activities and speak to them politely and privately when there is a problem.'
    ],
    [
      'How do you support weaker students?',
      'I give them extra time, repeat the topic in easier words and break it into small steps. I praise small progress so they do not lose confidence.'
    ],
    [
      'How do you communicate with parents?',
      "I talk politely and honestly. I share the child's strengths first, then explain what needs improvement and how we can fix it together."
    ],
    [
      'How do you use technology in teaching?',
      'I use slides, short videos and online quizzes to make lessons interesting. I also use the board for step-by-step explanation, because technology should support teaching, not replace it.'
    ]
  ],
  fresh: [
    [
      'What is the biggest lesson you learned in college?',
      'College taught me to manage my time and study on my own. I learned to plan my work, meet deadlines and ask for help early when I am stuck.'
    ],
    [
      'Do you prefer teamwork or individual work?',
      'I like teamwork because we share ideas and finish faster. I am also comfortable working alone when I need to focus. I adjust to what the task needs.'
    ],
    [
      'How do you handle stress or pressure?',
      'I take one task at a time, make a small plan and take a short break if I feel stressed. This keeps me calm and focused.'
    ],
    [
      'Describe a time you showed leadership.',
      'In a group project I divided the tasks, helped teammates who were stuck and tracked deadlines. We finished on time, and I learned that a good leader listens first.'
    ],
    [
      'Are you willing to learn new skills and work flexible hours?',
      'Yes. I am a fresher and happy to learn new skills. I can work flexible hours when the job needs it, and I will tell my manager early if I need support.'
    ],
    [
      'What would you like to ask us about this job?',
      'Yes. What will my first month look like? Which skills matter most for this role? And how will my work be measured?'
    ]
  ]
};

export const MYOV = {
  customer: {
    0: [
      'Tell me about yourself.',
      'My name is {name}. I study {degree} at {uni}. I recently finished an internship where I worked with a supervisor and met deadlines. I am a quick learner and I like helping people with technical problems.'
    ],
    1: [
      'What are your strengths?',
      '• I am patient and I listen well. I let the customer finish before I answer.\n\n• I learn fast. In my internship I picked up new tools quickly.\n\n• I am good with technical topics, so I can explain things in simple words.'
    ],
    2: ['What is your weakness?', 'I sometimes spend too long on small details. Now I set a time limit for each task so I stay fast.'],
    4: [
      'How do you handle an angry customer?',
      'I stay calm and let them finish speaking. I say sorry for the problem, then I focus on fixing it. If I cannot solve it, I take it to a senior person and keep the customer updated.'
    ],
    10: [
      'Why do you want to work in customer service?',
      'I enjoy helping people solve problems. When a customer leaves happy, that feels good. I also want to improve my communication skills, which will help me in any career.'
    ],
    12: [
      'Where do you see yourself in 5 years?',
      'I see myself as a strong support professional, maybe a team lead or a technical support specialist. I want to keep learning and help train new team members. I also want to grow my technical skills alongside my customer service skills.'
    ],
    13: [
      'Why should we hire you?',
      'I am polite, calm, and I learn quickly. I have a technical background, so I can understand problems fast and explain solutions clearly. I take responsibility and I follow up until the customer is happy.'
    ]
  },
  software: {
    10: [
      'Why do you want to work in software development?',
      'I like building things that work and solving problems with logic. My projects and internship showed me that I enjoy coding, and I want to build my career in software development.'
    ],
    12: [
      'Where do you see yourself in 5 years?',
      'In five years I see myself as a skilled developer who can work on real projects with confidence. I want to keep learning new tools and help junior team members.'
    ],
    13: [
      'Why should we hire you?',
      'I am a fresher, but I learn fast and I have practical skills from my projects and internship. I follow instructions, ask questions when I am stuck and finish my work on time.'
    ]
  },
  marketing: {
    10: [
      'Why do you want to work in marketing?',
      'Marketing mixes creativity with communication, and I enjoy both. I like understanding what people need and finding a clear way to reach them. I want to learn it properly and grow in this field.'
    ],
    12: [
      'Where do you see yourself in 5 years?',
      'In five years I want to be a confident marketing executive who can plan and run campaigns. I want to learn analytics and content strategy and bring good results to my team.'
    ],
    13: [
      'Why should we hire you?',
      'I am a fresher, but I am creative, quick to learn and comfortable with technology and social media tools. I take feedback well and I work hard to reach targets.'
    ]
  },
  teaching: {
    10: [
      'Why do you want to become a teacher?',
      'I like explaining things in simple words and seeing a student understand. I enjoy sharing knowledge, and I want to help students build confidence and skills.'
    ],
    12: [
      'Where do you see yourself in 5 years?',
      'In five years I want to be a confident teacher whom students trust. I want to keep improving my teaching methods, learn new tools and maybe guide new teachers.'
    ],
    13: [
      'Why should we hire you?',
      'I am a fresher, but I am patient and I explain technical topics in simple words. I prepare my lessons well, listen to students and keep learning to teach better.'
    ]
  },
  fresh: {
    10: [
      'Why do you want to join our company?',
      'I want to start my career and learn from experienced people. I like working in a professional team where I can use my skills and keep growing.'
    ],
    12: [
      'Where do you see yourself in 5 years?',
      'In five years I want to be a confident professional with strong skills and more responsibility. I want to learn from seniors and grow with this company.'
    ],
    13: [
      'Why should we hire you?',
      'I am a fresher, but I am hardworking, punctual and quick to learn. I listen carefully, accept feedback and give my full effort to every task.'
    ]
  }
};

export const MYEX = {
  // Fresh Graduate: questions added in data version 2, at the end so the places of the questions
  // that shipped before do not change.
  fresh: [
    [
      'Can you explain the gap in your career or education?',
      'After my studies I spent some time preparing for my career. I completed {certs} and practised {skills} with small projects. Now I am ready to start work and give my best.'
    ],
    [
      'How did you decide on your expected salary?',
      'I checked what freshers usually earn for this role in the market. I expect a fair starting salary, and my main focus is learning and growth, so I am open to discussing it.'
    ],
    // From HR Questions (data version 3).
    [
      'Are you willing to relocate or travel for this job?',
      'Yes, I am open to relocating or travelling for this job. As a fresher I see it as a chance to learn more and meet new people.'
    ]
  ],
  customer: [
    [
      'What does good customer service mean to you?',
      'It means listening well, being polite, and solving the problem fast. The customer should feel respected, even if the answer is no.'
    ],
    [
      'What if you do not know the answer?',
      'I will not guess. I will tell the customer I will check and come back. Then I ask a senior or look at the company guide and follow up on time.'
    ],
    [
      'Can you work under pressure and in shifts?',
      'Yes. I stay focused by handling one task at a time. I am ready for shifts because I understand customers need support at different times.'
    ]
  ]
};

// Fresher wording of each question (question text -> [question, answer]).
export const LK = {};
const buildLK = c => {
  const L = [...MYH, ...(MYM[c] || []), ...MYT];
  const m = {};
  L.forEach(([q, a]) => (m[q] = [q, a]));
  Object.entries(MYOV[c] || {}).forEach(([i, v]) => {
    if (L[i]) m[L[i][0]] = v;
  });
  LK[c] = m;
};
Object.keys(MID).forEach(buildLK);

export const LVH = {
  junior: [
    [
      'Introduce yourself and your experience so far.',
      'Good morning. I am {name}, with a background in {degree} from {uni}. Since starting my career I have worked hands-on with {skills}, and I hold {certs}. Recently I contributed to {project}. I am now looking to grow as a {role} and take on more ownership.'
    ],
    [
      'What are your strengths?',
      'My core strength is {strength}. For example, {achievement}. I deliver tasks on time, ask questions early and keep improving with feedback from my seniors.'
    ],
    [
      'What are your weaknesses?',
      'One area I am working on is {weakness}. I now plan my tasks with clear time limits and review my priorities every day. This has made me faster without lowering quality.'
    ],
    [
      'Tell me about a project you worked on.',
      'My main project was {project}. I handled my part end to end: understanding the requirement, building, testing and fixing issues after review. I learned how to work with a team, follow standards and deliver on a deadline.'
    ]
  ],
  senior: [
    [
      'Walk me through your career and what you bring as a senior.',
      'Good morning. I am {name}. My background is {degree} from {uni}, and over my career I have built deep expertise in {skills}, backed by {certs}. I have led work such as {project}. As a {role}, I focus on delivering results, raising the quality of the team and making sound technical and business decisions.'
    ],
    [
      'What are your strengths as a senior professional?',
      'My core strength is {strength}. For example, {achievement}. I take responsibility for outcomes, mentor teammates and keep the team focused on what matters most.'
    ],
    [
      'What is your biggest weakness today?',
      'I am working on {weakness}. As a senior, I handle it by delegating well, setting clear priorities and reviewing progress regularly instead of doing everything myself.'
    ],
    [
      'Tell me about the most impactful project you led.',
      'The most impactful work was {project}. I defined the goals, split the work, guided the team and handled risks and stakeholders. We delivered on time, and I documented the lessons so the next project would run even better.'
    ]
  ]
};

export const LVT = {
  junior: [
    [
      'How do you handle feedback from seniors?',
      'I listen without defending, note the action points and apply them quickly. I also follow up to confirm the fix meets expectations. Feedback is the fastest way for me to grow.'
    ],
    [
      'How do you manage your time when you have many tasks?',
      'I list tasks by priority and deadline, finish the most important first and tell my lead early if something is at risk. Clear updates help the team plan better.'
    ],
    [
      'Tell me about a mistake you made and what you learned.',
      'On {project} I once missed a small detail that caused rework. I admitted it quickly, fixed it and added a checklist so it would not repeat. I learned to double check before delivering.'
    ],
    [
      'How do you keep learning in your field?',
      'I practice with real tasks, follow documentation and tutorials, and learn from code or work reviews. I also build on my {skills} through small side projects.'
    ],
    [
      'Where do you see yourself in 3 years?',
      'In three years I see myself as a confident {role} who works independently, handles complex tasks and helps newer teammates. I plan to deepen {skills} and earn advanced certifications.'
    ],
    [
      'Why should we hire you?',
      'I bring practical experience with {skills}, relevant certifications ({certs}) and a record of delivering work like {project}. I learn fast, communicate clearly and take ownership of my tasks.'
    ]
  ],
  senior: [
    [
      'How do you mentor and grow junior team members?',
      'I give clear goals, review work with constructive feedback and let people own tasks with support. I share context behind decisions so they learn to think, not only to follow steps.'
    ],
    [
      'Tell me about a time you made a difficult decision with limited information.',
      'I gathered the key facts, listed the options and risks, consulted the people affected and chose the option that could be reversed if needed. I communicated the reason clearly and reviewed the result afterwards.'
    ],
    [
      'How do you handle conflict in a team or with stakeholders?',
      'I listen to each side privately, find the shared goal and focus on facts, not people. Then I agree on a clear next step and follow up. Early, respectful conversation prevents bigger problems.'
    ],
    [
      'How do you balance quality, speed and cost?',
      'I define what must be perfect and what can be good enough, split delivery into phases and track risk openly. I explain trade-offs to stakeholders so decisions are made together.'
    ],
    [
      'Where do you see yourself in 5 years?',
      'In five years I see myself in a lead or principal {role} position, shaping strategy, growing a strong team and delivering larger outcomes. I will keep strengthening {skills} and my leadership skills.'
    ],
    [
      'Why should we hire you for a senior role?',
      'I bring deep experience in {skills}, proven delivery such as {project}, and the ability to lead people and decisions. I focus on results, quality and growing the team around me.'
    ]
  ]
};

export const LVX = {
  junior: {
    software: [
      [
        'How do you debug a problem in code you did not write?',
        'I reproduce the issue, read the code path with logs and breakpoints, form a small hypothesis and test it. If I am stuck after a reasonable time, I ask a teammate with specific details about what I tried.'
      ],
      [
        'How do you make sure your code works before submitting it?',
        'I test the main flow and edge cases, run existing tests, review my own diff and then request a code review. I fix comments quickly and keep commits small.'
      ]
    ],
    cloud: [
      [
        'How do you troubleshoot a service that suddenly goes down?',
        'I check recent changes, logs and monitoring first, confirm what is affected, restore service using a safe rollback if needed and then find the root cause and document it.'
      ],
      [
        'How do you keep cloud costs under control?',
        'I use the right instance size, turn off unused resources, add budgets and alerts and review billing regularly.'
      ]
    ],
    marketing: [
      [
        'How do you measure whether a campaign worked?',
        'I set a clear goal first, such as leads or sales, then track reach, engagement, conversion and cost per result. I compare with the target and adjust the next campaign.'
      ],
      [
        'How do you research a target audience?',
        'I use customer data, surveys, social insights and competitor research to understand needs and behavior, then write messages that match them.'
      ]
    ],
    customer: [
      [
        'How do you handle a ticket you cannot solve alone?',
        'I collect the details, try the guide steps, then escalate with a clear summary so the next person does not repeat questions. I keep the customer updated until it is solved.'
      ],
      [
        'How do you stay calm with repeated difficult calls?',
        'I take a short breath between calls, focus on the problem and not the tone, and remember that the customer is upset about the issue, not about me.'
      ]
    ],
    teaching: [
      [
        'How do you handle a student who falls behind?',
        'I find the reason first, give extra practice in small steps and check progress often. I also encourage the student so confidence grows along with skill.'
      ],
      [
        'How do you plan a lesson?',
        'I start with a clear learning goal, choose simple activities and examples, add a quick check for understanding and end with a short review.'
      ]
    ],
    fresh: [
      [
        'How have you grown in your role so far?',
        'I took on harder tasks step by step, asked for feedback and improved my {skills}. My work on {project} shows how I now deliver with less supervision.'
      ]
    ]
  },
  senior: {
    software: [
      [
        'How do you design a system to scale?',
        'I clarify requirements and load first, keep services stateless, add caching and queues where needed, choose the right database and plan monitoring from the start. I review trade-offs with the team before building.'
      ],
      [
        'How do you run effective code reviews and set engineering standards?',
        'I agree on coding standards, automate checks, keep reviews focused on correctness and clarity, and explain the reason behind comments so the team improves together.'
      ]
    ],
    cloud: [
      [
        'How do you design a secure, highly available cloud architecture?',
        'I use multiple zones, least privilege access, encryption, network segmentation, automated backups and infrastructure as code. I add monitoring and test failure recovery regularly.'
      ],
      [
        'How do you lead an incident and prevent it from repeating?',
        'I assign roles, restore service first, communicate clearly, then run a blameless review to find root causes and add automation or alerts to prevent a repeat.'
      ]
    ],
    marketing: [
      [
        'How do you build and own a marketing strategy?',
        'I start with business goals and audience insight, choose channels and budget, set measurable targets and review results regularly. I align the team and adjust fast based on data.'
      ],
      [
        'How do you lead a team and manage budget and ROI?',
        'I set clear targets, track spend against results by channel, move budget to what performs and coach the team on creative and analytics.'
      ]
    ],
    customer: [
      [
        "How do you improve a support team's performance?",
        'I track response time, resolution and satisfaction, find the common issues, improve guides and training and coach people with real examples.'
      ],
      [
        'How do you handle a major escalation or service failure?',
        'I take ownership, communicate openly with the customer, bring the right teams together, fix the problem and follow up with a prevention plan.'
      ]
    ],
    teaching: [
      [
        'How do you lead a department or mentor other teachers?',
        'I share good practice, observe lessons with supportive feedback, help plan the curriculum together and set clear goals so students and teachers both grow.'
      ],
      [
        'How do you improve learning results across a whole class or school?',
        'I use assessment data to find gaps, adjust teaching methods, support struggling students early and review results with the team each term.'
      ]
    ],
    fresh: [
      [
        'How do you lead people and drive results?',
        "I set a clear goal, divide the work by strengths, remove blockers and give honest, regular feedback. I take responsibility for the team's outcome."
      ]
    ]
  }
};

// Extra questions at the END of a Junior or Senior list (after the shared closing questions), for
// questions added after a type shipped: the places of the older questions stay the same.
export const LVEX = {
  junior: {
    fresh: [
      [
        'Are you interviewing with other companies at the moment?',
        'Yes, I am exploring a few options, which is normal at this stage. This role is my top choice because it matches my skills and the direction I want to grow in. If you make me an offer, I will give you a clear answer quickly.'
      ],
      [
        'Is your expected salary negotiable?',
        'Yes, I am open to a fair discussion. I look at the whole offer, including growth, learning, benefits and the work itself, not only the base salary. If we agree on clear goals, I am happy to review pay again after a set period.'
      ],
      // From HR Questions (data version 3).
      [
        'Why did you leave your last job, or why do you want to change?',
        'I learned a lot in my last role, and I am thankful for it. Now I want a role with more responsibility and growth, and this position matches my skills and the direction I want my career to take.'
      ],
      [
        'What is your notice period, and when can you join?',
        'My notice period is one month, and I will complete it properly so my current team is not left with open work. If you need me earlier, I can ask my employer whether an earlier release is possible.'
      ],
      [
        'What did you like most and least about your current job?',
        'I liked the learning and the supportive team the most. What I liked least was that growth opportunities were limited. I want a role where good work leads to more responsibility.'
      ]
    ]
  },
  senior: {
    fresh: [
      [
        'How would you negotiate your offer for a senior position?',
        'I research the market for similar senior roles and look at the total value, including scope, team size and growth. I share a clear range with my reasons and listen to the limits of the company. I aim for an agreement that feels fair to both sides, because a good start builds trust.'
      ],
      // From HR Questions (data version 3).
      [
        'Why are you looking for a change at this stage of your career?',
        'I have built a strong base and led real results. Now I want a bigger scope, where I can shape decisions, grow a team and make a larger impact, and this role offers that.'
      ],
      [
        'What kind of culture do you build in your team?',
        'I build a culture of trust, clear goals and open feedback. People own their work, ask for help early and share credit. Problems are discussed openly, without blame.'
      ]
    ]
  }
};

export const TIPS = [
  'Open with a short answer, then back it with one concrete example.',
  'Quantify results when you can, like time saved or errors reduced.',
  'Use the STAR method: Situation, Task, Action, Result.',
  'Keep each answer to 1-2 minutes.',
  'For weaknesses, always mention how you are improving.',
  'Research the company before the interview.',
  'Give one specific example in every answer.',
  'Practice speaking your answers out loud, not only reading them.'
];

export const PCI = {
  software: ['#1f3cff', 'M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16'],
  marketing: ['#f01d2f', 'M3 11v3l12 5V6zM15 9a4 4 0 0 1 0 6M6 14l1 6h3l-1-5'],
  customer: ['#ff0f55', 'M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3zM20 19a4 4 0 0 1-4 3h-2'],
  teaching: ['#fd7a0f', 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6'],
  fresh: ['#6a1bff', 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z'],
  cloud: ['#66bb4f', 'M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5 4 4 0 0 1 17.5 18zM12 12v4M10 14h4']
};

// Levels that have questions, per type. Missing: all levels. A type with fewer levels (for example
// Fresher only) sets levels: ['fresher'] in more-questions.js.
export const CAT_LEVELS = {};
export const levelsOf = c => CAT_LEVELS[c] || Object.keys(LEVELS);
/** The level to use for a type: the asked one if the type has it, else its first level. */
export const fitLevel = (c, l) => (levelsOf(c).includes(l) ? l : levelsOf(c)[0]);
/** Levels at least one type has (the level tabs show only these). */
export const usedLevels = () => Object.keys(LEVELS).filter(l => Object.keys(CATS).some(c => levelsOf(c).includes(l)));

// Removed type ids -> the type that took their questions (old saved sessions and history still open).
export const CAT_ALIAS = { hrq: 'fresh' };
export const catId = c => (CATS[c] ? c : CAT_ALIAS[c] && CATS[CAT_ALIAS[c]] ? CAT_ALIAS[c] : c);

// More interview types (src/data/more-questions.js).
Object.entries(MORE).forEach(([c, m]) => {
  CATS[c] = m.label;
  if (m.role) ROLE[c] = m.role;
  MID[c] = m.mid;
  MYM[c] = m.fresher.map((a, i) => [m.mid[i][0], a]);
  LVX.junior[c] = m.junior;
  LVX.senior[c] = m.senior;
  PCI[c] = [m.color, m.icon];
  if (m.levels) CAT_LEVELS[c] = m.levels.filter(l => LEVELS[l]);
  buildLK(c);
});

// Order of the tiles on Home, Practice and Mock: each type sits next to related ones (a split
// half right after the type it came from). Ids never change, so saved data keeps working.
export const ORDER = [
  'software',
  'web',
  'it',
  'marketing',
  'graphic',
  'customer',
  'teaching',
  'fresh',
  'cloud',
  'cyber',
  'data',
  'situational',
  'behavioral',
  'sales',
  'waiter',
  'micro',
  'sql',
  'cpp',
  'java',
  'network',
  'civil',
  'mech',
  'accounting',
  'finance',
  'hr',
  'ops'
];
{
  const all = { ...CATS };
  Object.keys(CATS).forEach(c => delete CATS[c]);
  [...ORDER, ...Object.keys(all)].forEach(c => {
    if (all[c] && !(c in CATS)) CATS[c] = all[c];
  });
}
