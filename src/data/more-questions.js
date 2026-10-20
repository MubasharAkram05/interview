// More interview types (added after the first six in questions.js). Every entry has the same parts
// as the first six:
//   label, role: tile name and the {role} used in answers (null: the user's own target role)
//   color, icon: tile colour and a 24x24 stroke icon (own drawing)
//   setupRole, skills: the target role and key skill suggestions on the setup screen
//   mid: 7 questions of the field with full answers (Junior and Senior, and Fresher uses the first 3)
//   fresher: simpler Fresher answers for the first 3 mid questions (same question text)
//   junior, senior: 2 extra questions for that level
// Answers are short enough to say from memory, in plain words. {name}, {skills}, {project} and the
// other {fields} are filled from the user's details.

export const MORE = {
  hrq: {
    label: 'HR Questions',
    role: null, // general questions: answers use the user's own target role
    color: '#e11d48',
    icon: 'M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2M12 14l-1 3 1 2 1-2z',
    setupRole: 'Fresher/General',
    mid: [
      [
        'What do you know about our company?',
        'Before this interview I read about your company, your main products and services and your recent news. I like your focus on quality and on developing your people, and I would be proud to contribute to that.'
      ],
      [
        'Are you willing to relocate or travel for this job?',
        'Yes. I am open to relocating or travelling when the role needs it. I would like to know how often travel is expected so I can plan well, but it will not stop me from doing the job properly.'
      ],
      [
        'Why did you leave your last job, or why do you want to change?',
        'I learned a lot in my last role, and I am thankful for it. Now I want a role with more responsibility and growth, and this position matches my skills and the direction I want my career to take.'
      ],
      [
        'What is your notice period, and when can you join?',
        'My notice period is one month, and I will complete it properly so my current team is not left with open work. If you need me earlier, I can ask my employer whether an earlier release is possible.'
      ],
      [
        'How do you handle stress and pressure at work?',
        'I stay calm by breaking the work into small steps and doing the most important task first. I communicate early if a deadline is at risk, and outside work I keep a healthy routine so stress does not build up.'
      ],
      [
        'Are you comfortable working overtime or on weekends when needed?',
        'Yes, when the work really needs it, for example near a deadline, I am happy to give extra time. I also plan my work well so that overtime is the exception, not the routine.'
      ],
      [
        'Do you have any questions for us?',
        'Yes. What does success look like in this role after the first six months? And how does the team support new people while they learn? I would also like to know the next steps in the hiring process.'
      ]
    ],
    fresher: [
      'Before this interview I read about your company, what you offer and your recent news. I like that you value quality and help your people grow, and I want to be part of that.',
      'Yes, I am open to relocating or travelling for this job. As a fresher I see it as a chance to learn more and meet new people.',
      'This would be my first job, so I am not leaving anything. I want to start my career in a place where I can learn, work hard and grow.'
    ],
    junior: [
      [
        'What did you like most and least about your current job?',
        'I liked the learning and the supportive team the most. What I liked least was that growth opportunities were limited. I want a role where good work leads to more responsibility.'
      ],
      [
        'How do you take criticism from your manager?',
        'I listen fully, thank them and ask for one clear example if I need it. Then I agree on what to change and show the improvement in my next task.'
      ]
    ],
    senior: [
      [
        'Why are you looking for a change at this stage of your career?',
        'I have built a strong base and led real results. Now I want a bigger scope, where I can shape decisions, grow a team and make a larger impact, and this role offers that.'
      ],
      [
        'What kind of culture do you build in your team?',
        'I build a culture of trust, clear goals and open feedback. People own their work, ask for help early and share credit. Problems are discussed openly, without blame.'
      ]
    ]
  },

  situational: {
    label: 'Situational Interview',
    role: null, // general questions: answers use the user's own target role
    color: '#ff2d6f',
    icon: 'M6 3v6a6 6 0 0 0 6 6h6M15 12l3 3-3 3M6 21v-4',
    setupRole: 'Fresher/General',
    mid: [
      [
        'What would you do if you could not finish a task before the deadline?',
        'I would tell my manager as soon as I see the risk, not at the last minute. I would explain what is done, what is left and propose options, such as delivering the most important part first or getting help.'
      ],
      [
        'What would you do if a teammate was not doing their share of the work?',
        'I would first talk to them privately and ask if something is wrong, because there may be a reason. We would agree on who does what. If nothing changes, I would involve the team lead with facts, not complaints.'
      ],
      [
        'What would you do if you disagreed with your manager?',
        'I would share my view respectfully and with facts, in private. I would listen to their reasons too. If they still decide differently, I would support the decision fully and do my best to make it work.'
      ],
      [
        'What would you do if you made a mistake that affected a customer?',
        'I would admit it immediately, fix it as fast as possible and inform my manager. Then I would apologise to the customer, explain what we did and find the cause so the same mistake does not happen again.'
      ],
      [
        'What would you do if you had several urgent tasks at the same time?',
        'I would list the tasks, check the deadline and impact of each, and ask my manager if the priority is unclear. I would finish the most important first and keep everyone updated on when the rest will be done.'
      ],
      [
        'What would you do if you saw a colleague breaking a company rule?',
        'If it is small, I would remind them privately. If it is serious, such as safety or fraud, I would report it to my manager or HR, because protecting the company and the people comes first.'
      ],
      [
        'What would you do in your first week in this job?',
        'I would meet my team, learn the processes and tools, and understand what success looks like in my role. I would ask many questions, take notes and try to complete a small task well to build trust early.'
      ]
    ],
    fresher: [
      'I would tell my senior early that I may be late. I would explain what is done and what is left, and ask for help so the work is finished as soon as possible.',
      'I would talk to them politely and ask if they need help. We would divide the work clearly. If it does not improve, I would tell my team lead.',
      'I would share my idea politely and give my reason. If my manager still decides differently, I would follow the decision and do my best.'
    ],
    junior: [
      [
        'What would you do if your manager gave you unclear instructions?',
        'I would repeat back what I understood, ask short specific questions and confirm the expected result and deadline. A two minute check saves hours of rework.'
      ],
      [
        'What would you do if you finished your work early?',
        'I would check my work again, then ask my lead or teammates if they need help. If not, I would learn something useful for the team or improve a process.'
      ]
    ],
    senior: [
      [
        'What would you do if your team missed an important target?',
        'I would take responsibility as the leader, find the real cause with the team without blame, and agree on a recovery plan. Then I would update the stakeholders honestly and track the plan closely.'
      ],
      [
        'What would you do if two of your team members were in conflict?',
        'I would talk to each one privately first, then bring them together to focus on the shared goal and the facts. We would agree on clear roles and I would follow up after a few days.'
      ]
    ]
  },

  behavioral: {
    label: 'Behavioral',
    role: null, // general questions: answers use the user's own target role
    color: '#f43f5e',
    icon: 'M4 5h10v7H8l-4 3zM14 9h6v7l-3-2h-7v-2',
    setupRole: 'Fresher/General',
    mid: [
      [
        'Tell me about a time you worked in a team to reach a goal.',
        'Situation: in {project}, our team had a tight deadline. Task: I was responsible for one key part. Action: I planned my work, shared updates daily and helped a teammate who was stuck. Result: we delivered on time and the work was praised.'
      ],
      [
        'Tell me about a time you showed leadership.',
        'Situation: during {project}, our group had no clear plan. Action: I suggested dividing the work, set small deadlines and checked progress every few days. Result: the team stayed on track, and I learned that leadership is about helping others succeed.'
      ],
      [
        'Describe a time you solved a difficult problem.',
        'In {project}, we faced a problem nobody had solved before. I broke it into small parts, researched each one and tested simple solutions first. The final solution worked, and I documented it so others could use it.'
      ],
      [
        'Tell me about a time you failed and what you learned.',
        'Once I underestimated the time a task needed and delivered late. I owned the mistake, apologised and finished it properly. Since then I plan with a buffer and share progress early, and I have not missed a deadline since.'
      ],
      [
        'Describe a time you had to adapt to a big change.',
        'During {project}, the requirements changed halfway. Instead of complaining, I asked what had changed and why, updated my plan and learned the new tool quickly. We still delivered, and I became more flexible.'
      ],
      [
        'Tell me about a time you went beyond what was expected.',
        'After finishing my own task, I noticed that our process wasted time on repeated work. I made a simple checklist and template for the team. It saved everyone time, and my manager asked me to share it with other teams.'
      ],
      [
        'How do you share your opinion in a group discussion?',
        'I listen first and let others finish. Then I make my point briefly with one reason or example, and I connect it to what others said. I stay respectful, even when I disagree, and help the group reach a conclusion.'
      ]
    ],
    fresher: [
      'In my final year project, our team had a short deadline. I took one part, shared updates every day and helped a friend who was stuck. We finished on time and got good marks.',
      'In a university project, our group had no plan. I suggested how to divide the work and set small deadlines. Everyone followed it, and we finished well.',
      'In {project}, something did not work and I did not know why. I broke the problem into small parts, searched online and tested each part. In the end I found the cause and fixed it.'
    ],
    junior: [
      [
        'Tell me about a time you received help from a colleague.',
        'Early in my job I was stuck on a new tool. A colleague showed me a better way in ten minutes. I thanked them, practised it, and later helped a new joiner the same way.'
      ],
      [
        'Describe a time you managed many tasks at once.',
        'During a busy month I had three deadlines together. I listed them by priority, agreed the order with my lead and gave short daily updates. All three were delivered without errors.'
      ]
    ],
    senior: [
      [
        'Tell me about a time you influenced people without authority.',
        'I needed another team to change their process. I showed them data on how it affected both teams, listened to their concerns and proposed a small trial. The trial worked, and they adopted the change.'
      ],
      [
        'Describe a time you had to give difficult feedback.',
        'A strong team member was missing deadlines. I met them privately, shared specific examples and asked what was happening. We agreed on a plan, and within a month their delivery was back on track.'
      ]
    ]
  },

  sales: {
    label: 'Sales Associate',
    role: 'Sales Associate',
    color: '#7c3aed',
    icon: 'M6 8h12l-1 13H7zM9 8a3 3 0 0 1 6 0',
    setupRole: 'Sales Associate',
    skills: [
      'Customer service',
      'Product knowledge',
      'Communication',
      'Cash handling',
      'Upselling',
      'Point of sale',
      'Teamwork',
      'Merchandising',
      'Negotiation'
    ],
    mid: [
      [
        'How would you greet a customer who walks into the store?',
        'I would smile, make eye contact and greet them within a few seconds. I would say I am here if they need anything, and give them space to browse. Then I would offer help when I see they are interested in something.'
      ],
      [
        'How do you find out what a customer needs?',
        'I ask open questions, such as who the product is for, how they will use it and what budget they have. I listen carefully, then show two or three suitable options instead of everything in the store.'
      ],
      [
        'How would you sell a product to a customer who is not sure?',
        'I would ask what is stopping them, then answer that concern honestly, for example with the features, the warranty or a demonstration. I never push. A happy customer who comes back is worth more than one quick sale.'
      ],
      [
        'What would you do if a customer wants to return a product?',
        'I would stay friendly, listen to the reason and check the return policy and the receipt. If the return is allowed, I process it quickly. If not, I explain politely and offer an option, such as an exchange or a repair.'
      ],
      [
        'How do you handle an angry customer at the counter?',
        'I stay calm, listen without interrupting and apologise for the trouble. Then I focus on a solution I can offer. If it is beyond my authority, I call the supervisor and stay with the customer until it is solved.'
      ],
      [
        'What is upselling, and how do you do it without being pushy?',
        'Upselling means offering a better or additional product that adds value, such as a case with a phone. I suggest it only when it really helps the customer and explain the benefit in one sentence. If they say no, I respect it.'
      ],
      [
        'How do you reach your sales targets?',
        'I learn the products well, greet every customer and focus on their needs. I track my daily numbers, learn from top sellers and follow up with customers. Good service leads to sales and repeat visits.'
      ]
    ],
    fresher: [
      'I would smile and greet them warmly, tell them I am here to help, and let them look around. When they need help, I would go to them quickly.',
      'I ask simple questions, like who it is for and what budget they have. Then I listen and show a few products that match.',
      'I would ask what is worrying them and answer honestly. I would explain the benefits and let them decide without pressure.'
    ],
    junior: [
      [
        'How do you keep up with new products and offers?',
        'I read the product updates and offers every morning, try the products myself when possible and ask the supplier staff questions. Knowing the product well builds customer trust.'
      ],
      [
        'How do you handle a busy store with many customers waiting?',
        'I greet each waiting customer so they know they have been seen, serve them in order and ask a colleague for help if needed. Quick, polite service keeps people from leaving.'
      ]
    ],
    senior: [
      [
        'How would you train a new sales associate?',
        'I would teach the products and the store process first, then let them watch me with customers, then serve customers while I support them. I give feedback after each day and celebrate their first sales.'
      ],
      [
        'How would you improve the sales of a slow store?',
        'I would check the numbers by product and time, watch how customers move in the store and listen to the staff. Then I would fix the display, train the team and run small offers, and track the results weekly.'
      ]
    ]
  },

  waiter: {
    label: 'Waiter / Restaurant',
    role: 'Waiter',
    color: '#6d28d9',
    icon: 'M3 17h18M5 17a7 7 0 0 1 14 0M12 8V6M10 6h4M4 20h16',
    setupRole: 'Waiter/Restaurant Staff',
    skills: [
      'Customer service',
      'Menu knowledge',
      'Order taking',
      'Teamwork',
      'Food safety',
      'Cash handling',
      'Multitasking',
      'Communication',
      'Point of sale'
    ],
    mid: [
      [
        'How do you welcome guests when they arrive?',
        'I greet them with a smile within a few seconds, ask how many people they are and take them to a suitable table. I give the menus, offer water and tell them I will be back shortly to take their order.'
      ],
      [
        'How do you take an order correctly?',
        'I write every item, ask about allergies, cooking preferences and side dishes, and repeat the order back to the guests. Then I enter it in the system right away so the kitchen can start without delay.'
      ],
      [
        'What would you do if a guest complains about the food?',
        'I listen politely, apologise and offer to replace the dish or bring something else. I inform the kitchen and the manager, and I check back with the guest to make sure they are happy now.'
      ],
      [
        'How do you handle many tables at the same time?',
        'I plan my route so each trip does more than one job, I prioritise orders that are ready and I keep checking my tables with a quick look. I help my teammates and ask for help when I am overloaded.'
      ],
      [
        'What would you do if a guest has a food allergy?',
        'I take it seriously. I write it clearly on the order, tell the chef directly and check which dishes are safe. When I serve the food, I confirm it is the allergy-safe dish. I never guess about allergies.'
      ],
      [
        'How do you suggest dishes or drinks to guests?',
        'I know the menu and the specials well. I ask what they like, then suggest one or two dishes with a short honest description. Good suggestions make the meal better and also increase the bill naturally.'
      ],
      [
        'Why is hygiene important in a restaurant, and how do you follow it?',
        'Hygiene protects the guests from illness and protects the restaurant name. I wash my hands often, keep my uniform clean, handle plates and glasses by the edges and keep my area clean all the time.'
      ]
    ],
    fresher: [
      'I smile and greet them quickly, ask how many people they are and take them to a table. Then I give the menus and offer water.',
      'I write every item, ask about allergies and repeat the order to the guests. Then I send it to the kitchen quickly.',
      'I say sorry, listen to the problem and offer a new dish. I tell the kitchen and the manager, and check that the guest is happy.'
    ],
    junior: [
      [
        'How do you work with the kitchen staff during busy hours?',
        'I send orders clearly and on time, pick up ready food quickly and tell the kitchen about any special request. Calm, respectful communication keeps the whole service smooth.'
      ],
      [
        'What would you do if a guest leaves without paying?',
        'I would not chase them in a way that is unsafe. I would inform the manager immediately with the table details and the time, so they can follow the restaurant procedure.'
      ]
    ],
    senior: [
      [
        'How would you lead a team of waiters during a busy service?',
        'I would brief the team before service, assign sections clearly and watch the floor to support where it is busy. After service I would share what went well and what to improve.'
      ],
      [
        'How would you improve guest reviews of a restaurant?',
        'I would read the reviews to find the main problems, train the team on welcome, speed and table checks, and follow up with unhappy guests. Then I would track the reviews every week.'
      ]
    ]
  },

  micro: {
    label: 'Microprocessor / Electronics',
    role: 'Electronics Engineer',
    color: '#ea580c',
    icon: 'M8 8h8v8H8zM10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3',
    setupRole: 'Electronics/Embedded',
    skills: ['Microcontrollers', 'Embedded C', 'Arduino', 'Circuit design', '8085/8086', 'ARM', 'Assembly', 'Digital electronics', 'PCB design', 'Debugging'],
    mid: [
      [
        'What is a microprocessor, and how is it different from a microcontroller?',
        'A microprocessor is the processing unit of a computer and needs external memory and input output chips. A microcontroller has the processor, memory and input output on one chip, so it is cheaper and used in embedded devices like washing machines.'
      ],
      [
        'What are the main parts of a microprocessor?',
        'The main parts are the arithmetic logic unit, which does calculations, the control unit, which decodes and controls instructions, and the registers, which store data temporarily. They are connected by the address, data and control buses.'
      ],
      [
        'What is an interrupt?',
        'An interrupt is a signal that tells the processor to stop its current work and run a special routine, for example when a key is pressed. After the routine, the processor returns to where it stopped. Interrupts make devices respond quickly.'
      ],
      [
        'What is the difference between RAM and ROM?',
        'RAM is temporary memory used while the device is running, and it loses its data when power is off. ROM keeps its data without power and stores fixed programs, such as the startup code or firmware.'
      ],
      [
        'What is the role of the stack and the stack pointer?',
        'The stack is a memory area that works as last in, first out. It stores return addresses and data during function calls and interrupts. The stack pointer register holds the address of the top of the stack.'
      ],
      [
        'What is the difference between a bus and a port?',
        'A bus is a shared group of lines that carries addresses, data or control signals between the processor and memory. A port is the connection point where the processor talks to an external device, such as a sensor or a display.'
      ],
      [
        'Tell me about an embedded project you worked on.',
        'In {project}, I used a microcontroller to read a sensor and control an output. I wrote the code in embedded C, tested the circuit on a breadboard and fixed timing problems with an oscilloscope. It worked reliably in the final demo.'
      ]
    ],
    fresher: [
      'A microprocessor only processes data and needs outside memory and input output chips. A microcontroller has all of these on one chip, so it is used in small devices like remote controls.',
      'It has an arithmetic logic unit for calculations, a control unit to control instructions and registers to store data for a short time.',
      'An interrupt is a signal that stops the processor for a moment so it can handle something urgent, like a key press. Then it goes back to its work.'
    ],
    junior: [
      [
        'How do you debug a microcontroller program that does not work?',
        'I check the power and connections first, then add debug output or blink an LED at key steps, use the debugger to step through the code and measure the signals with a multimeter or oscilloscope.'
      ],
      [
        'What is the difference between polling and interrupts?',
        'With polling, the processor checks a device again and again, which wastes time. With interrupts, the device signals the processor only when needed, so the processor can do other work meanwhile.'
      ]
    ],
    senior: [
      [
        'How do you choose a microcontroller for a new product?',
        'I list the needs: processing speed, memory, input output pins, power use, cost, supply and tools. Then I compare a few options, test the best one on a development board and check long-term availability.'
      ],
      [
        'How do you make embedded firmware reliable?',
        'I use a watchdog timer, check every input, handle errors safely, keep interrupts short and test at the edges of temperature and power. Code reviews and a clear update process also matter.'
      ]
    ]
  },

  sql: {
    label: 'SQL / Database',
    role: 'Database Developer',
    color: '#4f46e5',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    setupRole: 'Database Developer',
    skills: ['SQL', 'MySQL', 'SQL Server', 'PostgreSQL', 'Oracle', 'Joins', 'Indexes', 'Stored procedures', 'Normalization', 'Query tuning'],
    mid: [
      [
        'What is a primary key and a foreign key?',
        'A primary key uniquely identifies each row in a table and cannot be empty or repeated. A foreign key is a column that refers to the primary key of another table, which links the tables and keeps the data consistent.'
      ],
      [
        'What is the difference between an inner join and a left join?',
        'An inner join returns only the rows that match in both tables. A left join returns all rows from the left table, and the matching rows from the right table, with empty values where there is no match.'
      ],
      [
        'What is the difference between WHERE and HAVING?',
        'WHERE filters rows before they are grouped. HAVING filters the groups after GROUP BY, so it can use totals such as COUNT or SUM. For example, HAVING COUNT of orders greater than five.'
      ],
      [
        'What is normalization, and why is it used?',
        'Normalization means organising tables so each fact is stored only once. It reduces repeated data and update errors. In practice I usually design up to the third normal form, then add controlled exceptions if performance needs it.'
      ],
      [
        'What is an index, and when should you use one?',
        'An index works like the index of a book: it lets the database find rows fast without reading the whole table. I add indexes on columns used often in searches and joins, but not on everything, because indexes slow down inserts and updates.'
      ],
      [
        'What is a transaction, and what does ACID mean?',
        'A transaction is a group of steps that succeed or fail together, like a money transfer. ACID means atomic, consistent, isolated and durable, which keeps the data correct even if there is an error or a crash.'
      ],
      [
        'How would you find the second highest salary in a table?',
        'One simple way is to select the maximum salary where the salary is less than the overall maximum. Another way is to order the distinct salaries in descending order and take the second row with OFFSET one, LIMIT one.'
      ]
    ],
    fresher: [
      'A primary key is a column that gives every row a unique value, like a student ID. A foreign key in another table points to that ID to connect the two tables.',
      'An inner join shows only the rows that match in both tables. A left join shows all rows of the first table, even if there is no match in the second.',
      'WHERE filters single rows before grouping. HAVING filters groups after GROUP BY, for example groups with a total above ten.'
    ],
    junior: [
      [
        'How do you make a slow query faster?',
        'I look at the execution plan, add or fix indexes on the filter and join columns, select only the needed columns and avoid functions on indexed columns in the WHERE clause. Then I measure again.'
      ],
      [
        'What is the difference between DELETE, TRUNCATE and DROP?',
        'DELETE removes chosen rows and can be rolled back. TRUNCATE removes all rows quickly and resets the table. DROP removes the whole table and its structure.'
      ]
    ],
    senior: [
      [
        'How would you design a database for a new application?',
        'I start from the business entities and how they relate, normalise the design, choose the keys and constraints, then plan indexes for the main queries. I also plan backups, security and growth from the start.'
      ],
      [
        'How do you handle a database that is growing very large?',
        'I archive old data, partition the big tables, review indexes and queries, and use read replicas for reporting. I monitor the size and performance trends so we act before users notice.'
      ]
    ]
  },

  cpp: {
    label: 'C / C++',
    role: 'C/C++ Developer',
    color: '#dc2626',
    icon: 'M8 6l-5 6 5 6M14 9v6M11 12h6M20 9v6M17 12h6',
    setupRole: 'C/C++ Developer',
    skills: ['C', 'C++', 'OOP', 'STL', 'Pointers', 'Memory management', 'Data structures', 'Algorithms', 'Linux', 'Debugging'],
    mid: [
      [
        'What is the difference between C and C++?',
        'C is a procedural language, focused on functions. C++ adds object-oriented programming, such as classes, inheritance and polymorphism, plus templates and the standard template library. C++ can use almost all C code.'
      ],
      [
        'What is a pointer?',
        'A pointer is a variable that stores the memory address of another variable. It lets us work with memory directly, pass large data efficiently and build structures like linked lists. It must always point to valid memory.'
      ],
      [
        'What is the difference between a stack and a heap memory?',
        'Stack memory is used for local variables and is freed automatically when the function ends. Heap memory is allocated at run time with new or malloc and must be freed with delete or free, otherwise it leaks.'
      ],
      [
        'What are the four pillars of object-oriented programming?',
        'Encapsulation hides data inside a class, abstraction shows only what is needed, inheritance lets a class reuse another class, and polymorphism lets one interface work with different types, for example through virtual functions.'
      ],
      [
        'What is the difference between pass by value and pass by reference?',
        'Pass by value gives the function a copy, so changes do not affect the original. Pass by reference gives the function the original variable, so changes are visible outside and no copy is made, which is faster for large objects.'
      ],
      [
        'What is a constructor and a destructor?',
        'A constructor runs when an object is created and sets its starting values. A destructor runs when the object is destroyed and frees resources, such as memory or files. This idea is called RAII in C++.'
      ],
      [
        'What is a memory leak, and how do you avoid it?',
        'A memory leak happens when memory is allocated and never freed, so the program uses more and more memory. In modern C++ I avoid it with smart pointers like unique pointer and shared pointer, and by following RAII.'
      ]
    ],
    fresher: [
      'C is a procedural language. C++ is built on C and adds classes and objects, so we can write object-oriented programs.',
      'A pointer is a variable that holds the address of another variable in memory. We use it to work with memory and to pass data efficiently.',
      'The stack stores local variables and is cleaned automatically. The heap is memory we ask for with new or malloc, and we must free it ourselves.'
    ],
    junior: [
      [
        'What is a virtual function?',
        'A virtual function lets a derived class replace a base class function, and the right version is chosen at run time through a base pointer or reference. It is how C++ achieves runtime polymorphism.'
      ],
      [
        'Which STL containers do you use most, and why?',
        'I use vector most because it is fast and simple, map or unordered map for key-value lookups, and set when I need unique items. I choose based on how the data is searched and changed.'
      ]
    ],
    senior: [
      [
        'How do you find and fix a crash in a large C++ program?',
        'I reproduce it, read the core dump or stack trace, and use a debugger and tools like address sanitizer or valgrind to find invalid memory use. Then I fix the root cause and add a test.'
      ],
      [
        'How do you write C++ code that is safe and easy to maintain?',
        'I use RAII and smart pointers, avoid raw new and delete, keep classes small, follow a clear coding standard, use the standard library and require code reviews and tests.'
      ]
    ]
  },

  java: {
    label: 'Java Programmer',
    role: 'Java Developer',
    color: '#f97316',
    icon: 'M5 10h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 11h2a2 2 0 0 1 0 4h-2M8 3c-1 1 1 2 0 3M12 3c-1 1 1 2 0 3',
    setupRole: 'Java Developer',
    skills: ['Java', 'OOP', 'Spring Boot', 'Collections', 'Multithreading', 'JDBC', 'Hibernate', 'REST API', 'Maven', 'JUnit'],
    mid: [
      [
        'What is the difference between JDK, JRE and JVM?',
        'The JVM runs Java bytecode on any machine. The JRE contains the JVM and the libraries needed to run Java programs. The JDK contains the JRE plus the tools to write and compile programs, such as the compiler.'
      ],
      [
        'What is the difference between an interface and an abstract class?',
        'An abstract class can have state and some implemented methods, and a class can extend only one. An interface defines a contract that a class implements, and a class can implement many interfaces.'
      ],
      [
        'What is the difference between ArrayList and LinkedList?',
        'An ArrayList stores items in a resizable array, so reading by index is fast. A LinkedList stores linked nodes, so adding and removing in the middle is cheaper, but reading by index is slow. I use ArrayList in most cases.'
      ],
      [
        'What is exception handling in Java?',
        'Exception handling lets a program deal with errors without crashing. I put risky code in try, handle specific exceptions in catch and release resources in finally or with try with resources. Checked exceptions must be handled or declared.'
      ],
      [
        'What is the difference between equals and the double equals operator?',
        'The double equals operator compares references, so it checks if two variables point to the same object. The equals method compares the content, for example two strings with the same text. When I override equals, I also override hashCode.'
      ],
      [
        'What is multithreading, and how do you keep threads safe?',
        'Multithreading runs several tasks at the same time. To keep shared data safe I use synchronized blocks, locks, atomic classes or concurrent collections, and I prefer an executor service instead of creating threads by hand.'
      ],
      [
        'What is Spring Boot, and why is it used?',
        'Spring Boot makes it fast to build Java applications, especially REST APIs. It sets up configuration automatically, includes an embedded server and uses dependency injection, so we focus on business logic instead of setup.'
      ]
    ],
    fresher: [
      'The JVM runs Java programs. The JRE is the JVM plus libraries to run programs. The JDK has everything in the JRE plus tools like the compiler to write programs.',
      'An abstract class can have some ready methods, and we can extend only one. An interface is like a contract, and one class can implement many interfaces.',
      'ArrayList is good for reading items quickly by position. LinkedList is better when we add or remove items in the middle a lot.'
    ],
    junior: [
      [
        'What are Java streams, and when do you use them?',
        'Streams let me process collections with operations like filter, map and collect in a clear, short way. I use them for data transformations, but keep simple loops when they are easier to read.'
      ],
      [
        'How does a HashMap work?',
        'A HashMap uses the hashCode of the key to choose a bucket, then equals to find the exact key. Good hashCode and equals methods keep lookups fast, close to constant time.'
      ]
    ],
    senior: [
      [
        'How do you improve the performance of a Java application?',
        'I measure first with profiling and metrics, then fix the real bottleneck, such as slow database queries, too many objects or blocking calls. I tune the JVM memory only after the code is fixed.'
      ],
      [
        'How would you design a Java microservice?',
        'I keep one clear business purpose, expose a REST API, store its own data, add logging, metrics and health checks, handle failures with timeouts and retries, and deploy it in a container.'
      ]
    ]
  },

  network: {
    label: 'Networking Engineer',
    role: 'Network Engineer',
    color: '#2563eb',
    icon: 'M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4',
    setupRole: 'Network Engineer',
    skills: ['TCP/IP', 'Routing', 'Switching', 'VLAN', 'Cisco', 'Firewalls', 'DNS', 'DHCP', 'Subnetting', 'Troubleshooting'],
    mid: [
      [
        'What is the OSI model?',
        'The OSI model explains networking in seven layers: physical, data link, network, transport, session, presentation and application. Each layer has its own job, which helps us design networks and find problems layer by layer.'
      ],
      [
        'What is the difference between TCP and UDP?',
        'TCP is connection-based and reliable: it checks delivery and order, so it is used for web pages and email. UDP is faster with no delivery check, so it is used for video calls, streaming and online games.'
      ],
      [
        'What is the difference between a switch and a router?',
        'A switch connects devices inside one network using MAC addresses. A router connects different networks, such as an office network and the internet, using IP addresses, and chooses the best path for the traffic.'
      ],
      [
        'What is subnetting, and why is it used?',
        'Subnetting divides a large network into smaller networks using a subnet mask. It improves security and performance, reduces broadcast traffic and uses IP addresses more efficiently.'
      ],
      [
        'What do DNS and DHCP do?',
        'DNS turns names like a website address into IP addresses. DHCP gives devices an IP address, gateway and DNS server automatically when they join the network, so nobody has to set them by hand.'
      ],
      [
        'What is a VLAN?',
        'A VLAN splits one physical switch into separate logical networks. For example, the finance and guest devices can be on different VLANs, which improves security and reduces unnecessary traffic.'
      ],
      [
        'How do you troubleshoot a user who cannot connect to the internet?',
        'I go layer by layer: check the cable or Wi-Fi, check the IP address, ping the gateway, then ping a public IP and test DNS with a website name. This quickly shows where the problem is.'
      ]
    ],
    fresher: [
      'The OSI model has seven layers that explain how data moves in a network, from the cable at the bottom to the application at the top.',
      'TCP is reliable and checks that data arrives in order, like for web pages. UDP is faster but does not check, like for video calls.',
      'A switch connects devices in the same network. A router connects different networks, like the office network to the internet.'
    ],
    junior: [
      [
        'What is the difference between static and dynamic routing?',
        'Static routes are set by hand and are simple for small networks. Dynamic routing protocols like OSPF learn routes automatically and adapt when a link fails, which suits larger networks.'
      ],
      [
        'What is NAT?',
        'NAT translates private IP addresses inside a network to a public IP address on the internet. It lets many devices share one public address and hides the internal addresses.'
      ]
    ],
    senior: [
      [
        'How would you design a network for a new office?',
        'I gather the needs: users, devices, applications, security and growth. Then I plan the IP scheme and VLANs, redundant links and power, firewalls and Wi-Fi coverage, and document everything.'
      ],
      [
        'How do you secure a company network?',
        'I segment the network, apply firewall rules with least access, use strong authentication and VPN for remote users, keep devices patched, and monitor logs and alerts for unusual traffic.'
      ]
    ]
  },

  civil: {
    label: 'Civil Engineer',
    role: 'Civil Engineer',
    color: '#9333ea',
    icon: 'M4 21V9l6-4v16M10 21h10V11H10M14 14h2M14 17h2M6 12h2M6 15h2M2 21h20',
    setupRole: 'Civil Engineer',
    skills: [
      'AutoCAD',
      'Structural design',
      'Site supervision',
      'Quantity surveying',
      'Estimation',
      'Concrete technology',
      'Surveying',
      'Project planning',
      'ETABS',
      'Building codes'
    ],
    mid: [
      [
        'What are the main duties of a site engineer?',
        'A site engineer makes sure the work is built according to the drawings, specifications and safety rules. This includes setting out, checking materials, supervising workers, keeping daily records and solving problems on site quickly.'
      ],
      [
        'What is the difference between one-way and two-way slabs?',
        'In a one-way slab the long side is at least twice the short side, so the load goes mainly in one direction. In a two-way slab the sides are closer in length, so the load goes in both directions and both get main steel.'
      ],
      [
        'What tests do you do on concrete?',
        'On fresh concrete I do the slump test for workability. On hardened concrete I test cube or cylinder strength, usually at seven and twenty-eight days. I also check the mix ratio and the curing.'
      ],
      [
        'Why is curing of concrete important?',
        'Curing keeps the concrete moist so the cement can hydrate properly. Good curing gives the full strength, reduces cracks and improves durability. Usually we cure for at least seven days.'
      ],
      [
        'How do you estimate the quantity of materials for a building?',
        'I take the measurements from the drawings, calculate the volume of concrete, the weight of steel and the brickwork, then use standard ratios to find cement, sand and aggregate, and add a small wastage allowance.'
      ],
      [
        'How do you ensure safety on a construction site?',
        'I make sure everyone uses safety equipment, give a short safety talk, check scaffolding and edges, keep the site clean and stop any unsafe work immediately. Safety comes before speed.'
      ],
      [
        'Tell me about a civil engineering project you worked on.',
        'In {project}, I helped with the drawings, quantities and site checks. I compared the work with the drawings, recorded progress daily and raised issues early, which helped the team finish on time.'
      ]
    ],
    fresher: [
      'A site engineer checks that the work follows the drawings and safety rules, checks the materials, guides the workers and keeps daily records.',
      'In a one-way slab the load goes mostly in one direction because one side is much longer. In a two-way slab the load goes in both directions.',
      'For fresh concrete I do the slump test. For hard concrete I test the strength of cubes after seven and twenty-eight days.'
    ],
    junior: [
      [
        'How do you handle a difference between the drawing and the site?',
        'I stop that part of the work, record the difference with photos and measurements, and inform the senior engineer or the consultant. We continue only after a clear written decision.'
      ],
      [
        'How do you manage the labour and material schedule on site?',
        'I plan the next week of work, order materials in advance, assign workers to tasks each morning and check progress in the evening, so there is no waiting time.'
      ]
    ],
    senior: [
      [
        'How do you keep a construction project on time and on budget?',
        'I use a detailed schedule and cost plan, track progress and spending every week, find delays early and act on them, and control changes with formal approvals.'
      ],
      [
        'How do you manage contractors and consultants?',
        'I set clear scope and quality standards, hold regular coordination meetings, keep decisions in writing and build good relationships, while holding everyone to the contract.'
      ]
    ]
  },

  mech: {
    label: 'Mechanical Engineering',
    role: 'Mechanical Engineer',
    color: '#db2777',
    icon: 'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
    setupRole: 'Mechanical Engineer',
    skills: ['AutoCAD', 'SolidWorks', 'Thermodynamics', 'Machine design', 'Manufacturing', 'Maintenance', 'HVAC', 'Quality control', 'Lean', 'CNC'],
    mid: [
      [
        'What are the laws of thermodynamics in simple words?',
        'The first law says energy cannot be created or destroyed, only changed from one form to another. The second law says heat flows naturally from hot to cold, and no engine can turn all heat into work.'
      ],
      [
        'What is the difference between stress and strain?',
        'Stress is the internal force per unit area in a material when a load acts on it. Strain is the change in length divided by the original length. In the elastic range, stress divided by strain gives the modulus of elasticity.'
      ],
      [
        'What is the difference between a petrol and a diesel engine?',
        'A petrol engine uses a spark plug to ignite the fuel and air mixture. A diesel engine compresses air until it is very hot, then injects fuel, which ignites by itself. Diesel engines are usually more efficient and have more torque.'
      ],
      [
        'What is preventive maintenance?',
        'Preventive maintenance means servicing machines on a schedule, such as lubrication, inspection and part replacement, before they fail. It reduces breakdowns, increases machine life and keeps production running.'
      ],
      [
        'What is the factor of safety?',
        'The factor of safety is the ratio between the strength of a part and the load it actually carries. It gives a margin for unknowns like material defects and extra loads. Typical values depend on the application and the risk.'
      ],
      [
        'Which design software have you used?',
        'I have used AutoCAD for two-dimensional drawings and SolidWorks for three-dimensional modelling and assemblies. In {project}, I made the model, prepared the drawings with tolerances and checked the parts for fit.'
      ],
      [
        'How do you improve quality in a manufacturing process?',
        'I measure the process, find the main defects with tools like a Pareto chart and root cause analysis, fix the causes, then standardise the new method and train the operators. Then I keep monitoring the results.'
      ]
    ],
    fresher: [
      'The first law says energy cannot be created or destroyed, only changed. The second law says heat moves from hot to cold, and no engine is one hundred percent efficient.',
      'Stress is the force on a material divided by its area. Strain is how much it stretches compared to its original length.',
      'A petrol engine uses a spark plug to burn the fuel. A diesel engine squeezes air until it is very hot, and the fuel burns by itself.'
    ],
    junior: [
      [
        'How do you find the cause of a machine breakdown?',
        'I collect the facts from the operator and the logs, inspect the machine safely, and use the five whys method to reach the root cause. Then I fix it and update the maintenance plan.'
      ],
      [
        'What are tolerances and fits?',
        'A tolerance is the allowed variation in a size. A fit describes how two parts go together: clearance fits move freely, interference fits are pressed tight, and transition fits are in between.'
      ]
    ],
    senior: [
      [
        'How would you reduce the cost of a mechanical product?',
        'I review the design for fewer and simpler parts, standard components and easier manufacturing, compare suppliers and materials, and test that cost changes do not reduce quality or safety.'
      ],
      [
        'How do you lead a maintenance or production team?',
        'I set clear priorities and safety rules, plan work with the team, track breakdowns and output, solve problems together and invest in training so the team keeps improving.'
      ]
    ]
  },

  accounting: {
    label: 'Accounting',
    role: 'Accountant',
    color: '#be123c',
    icon: 'M6 3h12v18H6zM9 6h6v3H9zM9 13h1M14 13h1M9 17h1M14 17h1',
    setupRole: 'Accountant',
    skills: ['Bookkeeping', 'Excel', 'QuickBooks', 'Tally', 'Financial statements', 'Reconciliation', 'Taxation', 'Payroll', 'Accounts payable', 'Auditing'],
    mid: [
      [
        'What is double-entry bookkeeping?',
        'In double-entry bookkeeping every transaction is recorded in at least two accounts, one debit and one credit of the same amount. This keeps the books balanced and makes errors easier to find.'
      ],
      [
        'What are the main financial statements?',
        'The main statements are the income statement, which shows profit or loss, the balance sheet, which shows assets, liabilities and equity at a date, and the cash flow statement, which shows how cash moved.'
      ],
      [
        'What is a bank reconciliation?',
        'A bank reconciliation compares the company cash book with the bank statement and explains the differences, such as uncleared cheques, bank charges or errors. It makes sure the cash balance is correct.'
      ],
      [
        'What is the difference between accrual and cash accounting?',
        'Cash accounting records income and expenses only when money is received or paid. Accrual accounting records them when they are earned or incurred, which gives a truer picture of performance.'
      ],
      [
        'What is depreciation?',
        'Depreciation spreads the cost of a fixed asset, such as a machine, over its useful life. Common methods are straight line, with the same amount each year, and reducing balance, with more in the early years.'
      ],
      [
        'Which accounting software do you know?',
        'I have used {skills}. I am comfortable recording transactions, preparing reports and reconciling accounts, and I learn new software quickly because the accounting principles stay the same.'
      ],
      [
        'How do you make sure your work is accurate?',
        'I check supporting documents for every entry, reconcile accounts regularly, review my work before submitting it and use Excel checks and totals. If something does not match, I find the cause instead of forcing it.'
      ]
    ],
    fresher: [
      'Every transaction is written in two accounts, one debit and one credit, with the same amount. This keeps the accounts balanced.',
      'The main ones are the income statement for profit or loss, the balance sheet for assets and liabilities, and the cash flow statement for cash in and out.',
      'It means matching our cash book with the bank statement and explaining any difference, like a cheque that has not cleared yet.'
    ],
    junior: [
      [
        'How do you handle month-end closing?',
        'I follow a checklist: record all invoices and payments, post accruals and depreciation, reconcile the bank and key accounts, review unusual balances and prepare the reports on time.'
      ],
      [
        'What would you do if you found an error in last month figures?',
        'I would inform my supervisor, find the cause and the effect, post a correcting entry with a clear note and fix the process so the same error does not happen again.'
      ]
    ],
    senior: [
      [
        'How do you improve financial controls in a company?',
        'I separate duties, set approval limits, reconcile key accounts regularly, review exceptions every month and keep clear policies. Strong controls protect the company and speed up audits.'
      ],
      [
        'How do you prepare for an external audit?',
        'I keep schedules and supporting documents ready, reconcile all balance sheet accounts, review last year audit points and give the auditors one contact person and clear timelines.'
      ]
    ]
  },

  finance: {
    label: 'Finance',
    role: 'Finance Officer',
    color: '#8b5cf6',
    icon: 'M3 20h18M5 16l4-5 4 3 6-7M15 7h4v4',
    setupRole: 'Finance',
    skills: [
      'Financial analysis',
      'Excel',
      'Budgeting',
      'Forecasting',
      'Financial modelling',
      'Ratio analysis',
      'Valuation',
      'Reporting',
      'Risk management',
      'Power BI'
    ],
    mid: [
      [
        'What is working capital?',
        'Working capital is current assets minus current liabilities. It shows whether a company can pay its short-term bills. Positive working capital is good, but too much can mean cash is tied up in stock or receivables.'
      ],
      [
        'What is the difference between profit and cash flow?',
        'Profit is income minus expenses in the accounts. Cash flow is the real money coming in and going out. A company can be profitable but still run out of cash if customers pay late.'
      ],
      [
        'What are financial ratios, and which ones do you use?',
        'Ratios compare figures to judge performance. I use the current ratio for liquidity, gross and net margin for profitability, debt to equity for leverage, and return on equity to see how well the money is used.'
      ],
      [
        'How do you prepare a budget?',
        'I start from last year results and the business plans, agree the assumptions with each department, build the income and cost lines, review them with management and then track actual results against the budget every month.'
      ],
      [
        'What is net present value?',
        'Net present value converts future cash flows into today money using a discount rate, then subtracts the investment. If the result is positive, the project should add value to the company.'
      ],
      [
        'What is the difference between equity and debt financing?',
        'Debt financing is borrowing money that must be repaid with interest, and the owners keep control. Equity financing sells part of the company, so there is no repayment, but the owners share profit and control.'
      ],
      [
        'How do you present financial information to non-finance managers?',
        'I keep it simple: the key numbers, what changed and why, and what action is needed. I use clear charts instead of large tables and explain the impact in business terms.'
      ]
    ],
    fresher: [
      'Working capital is current assets minus current liabilities. It shows if a company can pay its short-term bills.',
      'Profit is what the accounts show after expenses. Cash flow is the real money coming in and out. A company can make profit and still have no cash.',
      'Ratios compare numbers to check how a company is doing, like the current ratio for paying bills and the profit margin for profitability.'
    ],
    junior: [
      [
        'How do you analyse a variance between budget and actual?',
        'I find the biggest differences, split them into price, volume and timing effects, ask the department for the reasons and report the cause and the action needed.'
      ],
      [
        'Which Excel skills do you use in finance work?',
        'I use lookup functions, pivot tables, conditional formatting and charts, and I build clean models with clear inputs and checks. These save time and reduce mistakes.'
      ]
    ],
    senior: [
      [
        'How would you improve the cash position of a company?',
        'I would speed up collections, agree better payment terms with suppliers, reduce extra stock, review spending and build a rolling cash forecast to see problems early.'
      ],
      [
        'How do you evaluate a large investment decision?',
        'I build a model with clear assumptions, calculate net present value, payback and risk scenarios, compare it with other options and check the fit with the company strategy.'
      ]
    ]
  },

  hr: {
    label: 'Human Resources',
    role: 'HR Officer',
    color: '#a855f7',
    icon: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M17 14a5 5 0 0 1 4 6',
    setupRole: 'HR',
    skills: [
      'Recruitment',
      'Onboarding',
      'Employee relations',
      'Payroll',
      'HR policies',
      'Labour law',
      'Performance management',
      'Training',
      'HRIS',
      'Communication'
    ],
    mid: [
      [
        'What are the main functions of human resources?',
        'The main functions are recruitment and onboarding, training and development, performance management, pay and benefits, employee relations and following labour laws. Together they help the company attract, keep and grow good people.'
      ],
      [
        'How do you find and select the right candidate?',
        'I start with a clear job description, post it where the right people look, screen CVs against the key skills, use structured interviews with the same questions for everyone and check references before the offer.'
      ],
      [
        'How would you handle a conflict between two employees?',
        'I meet each person privately to understand the facts, stay neutral, then bring them together to agree on a solution and clear behaviour. I document the meeting and follow up. If it involves a policy breach, I follow the formal process.'
      ],
      [
        'What makes a good onboarding process?',
        'Good onboarding prepares everything before day one, welcomes the person, explains the company, the role and the policies, gives them a buddy and sets clear goals for the first months, with regular check-ins.'
      ],
      [
        'How do you reduce employee turnover?',
        'I find out why people leave through exit interviews and surveys, then work on the causes, such as fair pay, good managers, growth paths, recognition and a healthy work environment.'
      ],
      [
        'How do you keep employee information confidential?',
        'I share personal information only with people who need it for their work, keep files in secure systems with access control and never discuss employee matters outside the proper process.'
      ],
      [
        'How does a performance appraisal work?',
        'The manager and employee agree on goals at the start of the year, review progress during the year and do a formal review at the end with specific examples. The result guides training, rewards and the next goals.'
      ]
    ],
    fresher: [
      'HR hires people, trains them, manages their performance and pay, looks after employee relations and makes sure the company follows labour laws.',
      'I write a clear job description, check CVs against the main skills, ask everyone the same interview questions and check references.',
      'I listen to both people separately, stay fair and then help them agree on a solution. I also follow up later to check it is working.'
    ],
    junior: [
      [
        'How do you handle a large number of job applications?',
        'I use clear screening criteria and the applicant system to filter, shortlist the best matches quickly and keep every candidate informed. A good experience protects the company name.'
      ],
      [
        'How do you explain an HR policy to employees who disagree with it?',
        'I explain the reason behind the policy in simple words, listen to their concerns and answer honestly. If many people raise the same point, I share the feedback with management.'
      ]
    ],
    senior: [
      [
        'How would you build an HR strategy for a growing company?',
        'I would link HR plans to the business goals: workforce planning, strong hiring, leadership development, fair pay structures and a clear culture, with simple measures to track progress.'
      ],
      [
        'How do you manage a layoff or restructuring?',
        'I plan carefully with legal advice, use fair selection criteria, communicate honestly and respectfully, offer support such as notice pay and job help, and take care of the people who stay.'
      ]
    ]
  },

  ops: {
    label: 'Operations Manager',
    role: 'Operations Manager',
    color: '#e11d48',
    icon: 'M8 4h8v3H8zM6 5H5v16h14V5h-1M9 14l2 2 4-4',
    setupRole: 'Operations Manager',
    skills: [
      'Process improvement',
      'Lean',
      'Six Sigma',
      'Supply chain',
      'Inventory management',
      'KPIs',
      'Team leadership',
      'Budgeting',
      'Excel',
      'Vendor management'
    ],
    mid: [
      [
        'What does an operations manager do?',
        'An operations manager makes sure the daily work runs efficiently: planning resources, managing the team, controlling costs and quality, improving processes and meeting the targets for output and customer service.'
      ],
      [
        'Which KPIs do you track in operations?',
        'I track output or productivity, on-time delivery, quality or defect rate, cost per unit, stock levels and customer complaints. I choose a few clear KPIs and review them with the team every week.'
      ],
      [
        'How do you improve a process?',
        'I map the current process, measure where time and money are lost, find the root causes with the team, test a simple improvement, then standardise it and keep measuring. Lean tools help remove waste.'
      ],
      [
        'How do you manage inventory?',
        'I keep enough stock to meet demand without tying up cash. I use reorder points, safety stock based on demand and lead time, regular counts and an ABC analysis to focus on the most valuable items.'
      ],
      [
        'How do you handle a sudden drop in production?',
        'I find out quickly what changed, such as a machine, material or staff issue, fix the immediate problem, inform customers if delivery is affected and then find the root cause so it does not repeat.'
      ],
      [
        'How do you work with suppliers and vendors?',
        'I agree clear expectations on quality, price and delivery, track their performance, communicate regularly and solve problems together. I also keep a backup supplier for critical items.'
      ],
      [
        'How do you motivate your operations team?',
        'I set clear goals, share the results openly, recognise good work, involve the team in solving problems and support their training and growth. People work best when they understand why their work matters.'
      ]
    ],
    fresher: [
      'An operations manager makes the daily work run smoothly by planning people and resources, controlling cost and quality and meeting targets.',
      'I would track things like output, on-time delivery, quality, cost and customer complaints, and review them with the team.',
      'I would study how the work is done now, find where time is wasted, try a better way and keep the change if it works.'
    ],
    junior: [
      [
        'How do you plan daily work for a team?',
        'I check the orders and priorities, assign tasks based on skills and capacity, share the plan in a short morning meeting and review progress during the day.'
      ],
      [
        'How do you handle a shortage of staff on a busy day?',
        'I focus on the most critical work first, move people between tasks, ask for overtime or temporary help if needed and inform customers early about any delay.'
      ]
    ],
    senior: [
      [
        'How do you reduce operating costs without hurting quality?',
        'I analyse where money is spent, remove waste and duplicated work, negotiate with suppliers, use automation where it pays back and track quality KPIs so savings never hurt the customer.'
      ],
      [
        'How do you manage operations across several sites?',
        'I set standard processes and KPIs for all sites, compare results to share best practice, give site managers clear authority and hold regular reviews to solve problems together.'
      ]
    ]
  }
};

// Target roles added to the setup screen for these interview types (with their skill suggestions).
export const MORE_ROLES = {};
Object.values(MORE).forEach(m => {
  if (m.skills && m.setupRole && !MORE_ROLES[m.setupRole]) MORE_ROLES[m.setupRole] = m.skills;
});
