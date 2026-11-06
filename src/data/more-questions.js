// More interview types (tile order: ORDER in questions.js). Every entry has the same parts
// as the six in questions.js:
//   label, role: tile name and the {role} used in answers (null: the user's own target role)
//   color, icon: tile colour and a 24x24 stroke icon (own drawing)
//   setupRole, skills: the target role and key skill suggestions on the setup screen
//   mid: 7 questions of the field with full answers (Junior and Senior, and Fresher uses the first 3)
//   fresher: simpler Fresher answers for the first 3 mid questions (same question text)
//   junior, senior: 2 extra questions for that level
// Answers are short enough to say from memory, in plain words. {name}, {skills}, {project} and the
// other {fields} are filled from the user's details.

export const MORE = {
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
    keywords: ['shop', 'sales assistant'],
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
    label: 'SQL Developer',
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
    keywords: ['accountant', 'bookkeeping'],
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
    label: 'HR Generalist',
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
  },
  // Split from "Software Developer / IT".
  it: {
    label: 'IT Support',
    role: 'IT Support Specialist',
    color: '#0891b2',
    icon: 'M3 4h18v12H3zM8 20h8M12 16v4M9 10l2 2 4-4',
    setupRole: 'IT Support', // skill suggestions: the IT Support list in src/services/setup.js
    mid: [
      [
        'A user says their computer is very slow. How do you troubleshoot it?',
        'I first ask when it started and what changed, such as a new program or an update. I check Task Manager for high CPU, memory or disk use, and look at startup programs and free disk space. I also run a malware scan and install pending updates. I fix one cause at a time and confirm with the user that it is better.'
      ],
      [
        'A user cannot print. How do you fix it?',
        'I check whether only this user or everyone is affected. Then I check the basics: power, paper, toner, error lights and whether the printer is online on the network. On the computer I check the default printer, clear stuck jobs in the print queue and restart the print spooler service. If needed, I reinstall the correct driver and print a test page.'
      ],
      [
        'What is Active Directory, and how do you reset a user password?',
        'Active Directory is the Microsoft directory service that stores users, computers and groups and controls who can sign in and what they can access. Before a reset, I verify the identity of the user using our process. Then I reset the password, set it to change at the next sign-in and unlock the account if needed.'
      ],
      [
        'How do you prioritize support tickets?',
        'I use impact and urgency. An issue that stops many users or a critical system comes first, and a single user with a workaround comes later. I follow the agreed response time for each priority and keep users updated. If a ticket waits too long, I escalate it.'
      ],
      [
        'How do you explain a technical fix to a non-technical user?',
        'I avoid jargon and use simple words and short steps. I check understanding by asking the user to try it while I watch. If the issue may happen again, I also share a short written guide. My goal is that the user feels confident, not confused.'
      ],
      [
        'How do you tell a hardware problem from a software problem?',
        'A hardware problem comes from a physical part, like a failing disk, memory or cable. A software problem comes from the operating system, a driver or an application. I look for physical signs, run the built-in hardware diagnostics and test in safe mode or with another user profile. If the fault stays even in safe mode and the diagnostics fail, it is most likely hardware.'
      ],
      [
        'Why is documentation important in IT support?',
        'Clear notes in each ticket show what was tried, what fixed it and who did it. This saves time when the problem comes back and helps the rest of the team. I also turn common fixes into knowledge base articles, so users and new staff can solve simple issues faster.'
      ]
    ],
    fresher: [
      'I ask what changed, then check Task Manager for programs using too much CPU, memory or disk. I remove unneeded startup programs, check free disk space and run updates and a virus scan. Then I ask the user to test again.',
      'I check if the printer has power, paper and toner and is online. Then I clear stuck print jobs, check that the right printer is selected and print a test page. If it still fails, I reinstall the driver.',
      'Active Directory keeps the list of users and computers in a Windows network and controls their access. To reset a password, I verify the user first, then reset it and ask them to change it at the next sign-in.'
    ],
    junior: [
      [
        'What do you do when you cannot solve a ticket in the expected time?',
        'I document every step I tried, tell the user about the delay and escalate to the next level with a clear summary. I stay involved to learn the final fix. Then I add it to the knowledge base so the team can solve it faster next time.'
      ],
      [
        "How do you set up a new employee's laptop and accounts?",
        'I follow a checklist: create the accounts with the right groups, install the standard image and required software, set up email and multi-factor sign-in, and apply updates and security tools. I test sign-in, printing and shared drives. On the first day I give a short walkthrough so the person can start working quickly.'
      ]
    ],
    senior: [
      [
        'How would you reduce the number of repeat support tickets?',
        'I review ticket data to find the most common issues and their root causes. Then I fix the cause, for example with automation, better configuration or user training, and publish self-help articles. I track the ticket volume each month to confirm the change worked.'
      ],
      [
        'How do you plan a company-wide software rollout?',
        'I test it with a small pilot group first and fix any issues. I roll it out in phases, tell users the dates and changes, and keep a rollback plan ready. I watch tickets closely after each phase and adjust before moving to the next group.'
      ]
    ]
  },
  // Split from "Cloud / DevOps / Security".
  cyber: {
    label: 'Cyber Security',
    role: 'Cyber Security Analyst',
    color: '#0f766e',
    icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12h6v4H9zM10 12v-2a2 2 0 0 1 4 0v2',
    setupRole: 'Cyber Security',
    skills: ['Network security', 'Firewalls', 'SIEM', 'Vulnerability assessment', 'Incident response', 'Linux', 'IAM', 'Wireshark', 'OWASP', 'Cloud security'],
    mid: [
      [
        'What is the CIA triad in information security?',
        'The CIA triad stands for confidentiality, integrity and availability. Confidentiality keeps data private to the right people. Integrity makes sure data is accurate and not changed without permission. Availability means systems and data are there when users need them.'
      ],
      [
        'What is the difference between a vulnerability, a threat and a risk?',
        'A vulnerability is a weakness, such as an unpatched server. A threat is something that can exploit that weakness, such as an attacker or malware. Risk is the chance that the threat exploits the weakness, combined with the damage it would cause. I reduce risk by fixing weaknesses and adding controls.'
      ],
      [
        'How do you recognize and respond to a phishing email?',
        'I check the sender address, the links and any attachments, and I look for urgent or unusual requests. I never click links or open attachments in a suspicious email. I report it through the company process so the security team can block it and warn others. If someone already clicked, we reset their password and check the device quickly.'
      ],
      [
        'What are the main steps of incident response?',
        'A common model has these steps: preparation, detection and analysis, containment, eradication, recovery, and lessons learned. First we confirm and scope the incident, then we contain it to stop the spread. After removing the cause and restoring systems, we review what happened and improve our controls.'
      ],
      [
        'What is a SIEM, and how is it used?',
        'A SIEM, or security information and event management system, collects logs from servers, firewalls, endpoints and applications in one place. It links related events and raises alerts on suspicious activity, such as many failed logins. Analysts use it to investigate alerts and search logs. Good tuning is important to reduce false positives.'
      ],
      [
        'How would you secure an S3 bucket?',
        'I block public access by default, apply least-privilege bucket policies, enable encryption at rest and in transit, turn on versioning and access logging, and set alerts for unusual access.'
      ],
      [
        'Why is multi-factor authentication important?',
        'Multi-factor authentication asks for two or more kinds of proof, such as a password and a code from an app or a security key. Even if a password is stolen, the attacker cannot sign in without the second factor. Phishing-resistant methods like security keys and passkeys are stronger than SMS codes. I recommend it for all users, especially admin accounts.'
      ]
    ],
    fresher: [
      'CIA means confidentiality, integrity and availability. Data should stay private, stay correct and be available when people need it.',
      'A vulnerability is a weakness, a threat is something that can use that weakness, and risk is the chance and impact of it happening. For example, an old unpatched system is a vulnerability, and malware is a threat.',
      'I check the sender, the links and any urgent request. I do not click anything suspicious, and I report it to the IT or security team so they can block it.'
    ],
    junior: [
      [
        'How do you investigate a security alert?',
        'I first check whether the alert is real or a false positive by looking at the logs, the user and the device involved. I find out what happened, when, and which systems are affected. If it is real, I contain it, for example by isolating the device, and escalate with clear notes. I record every step in the ticket.'
      ],
      [
        'What is the OWASP Top 10?',
        'The OWASP Top 10 is a widely used list of the most critical security risks for web applications, such as broken access control, injection and security misconfiguration. Developers and testers use it as a checklist. I use it to guide code reviews and security tests.'
      ]
    ],
    senior: [
      [
        'How do you build a vulnerability management program?',
        'I start with an accurate asset inventory, then scan regularly and rank findings by severity and business impact. I agree clear patch timelines with system owners and track every finding to closure. I report the trend to management and fix the process gaps that cause repeat findings.'
      ],
      [
        'How do you apply a zero trust approach in an organization?',
        'Zero trust means never trusting a user or device just because it is inside the network. I verify every access request with strong identity, multi-factor sign-in and device health checks, and I give least-privilege access. I also segment the network and monitor activity all the time. I roll it out step by step, starting with the most sensitive systems.'
      ]
    ]
  },
  web: {
    label: 'Web Developer',
    role: 'Web Developer',
    color: '#0369a1',
    icon: 'M3 5h18v14H3zM3 9h18M10 12l-2 2.5 2 2.5M14 12l2 2.5-2 2.5',
    setupRole: 'Web Developer', // skill suggestions: the Web Developer list in src/services/setup.js
    mid: [
      [
        'What happens when you type a URL into the browser and press Enter?',
        'The browser finds the IP address of the server through DNS, then opens a connection, secured with TLS for HTTPS. It sends an HTTP request, and the server returns HTML. The browser then loads the CSS, JavaScript and images, builds the page and shows it. Caching can skip some of these steps on later visits.'
      ],
      [
        'What is responsive design, and how do you build it?',
        'Responsive design means a page works well on phones, tablets and desktops. I start mobile-first, use flexible layouts with Flexbox and CSS Grid, and add media queries for larger screens. I use relative units and responsive images, and I test on real screen sizes.'
      ],
      [
        'What is the difference between let, const and var in JavaScript?',
        'var is function-scoped and hoisted, which can cause bugs. let and const are block-scoped. let can be reassigned, but const cannot, although an object stored in a const can still be changed. I use const by default and let only when a value must change.'
      ],
      [
        'How do you improve the loading speed of a website?',
        'I compress and resize images and use modern formats like WebP or AVIF. I minify CSS and JavaScript, split large bundles and lazy-load content that is not on the first screen. I also use caching and a CDN. I measure with Lighthouse and Core Web Vitals before and after each change.'
      ],
      [
        'What is the difference between cookies, localStorage and sessionStorage?',
        'Cookies are small values sent to the server with each request, so they are used for things like sessions. localStorage keeps data in the browser with no expiry, and sessionStorage keeps it only until the tab is closed, and neither is sent to the server. I never keep passwords or sensitive tokens in localStorage, because any script on the page can read it.'
      ],
      [
        'How do you make a website accessible?',
        'I use semantic HTML, such as real headings, buttons and form labels, and add alt text to images. I make sure everything works with a keyboard and has a visible focus state. I check colour contrast and test with a screen reader. I follow the WCAG guidelines.'
      ],
      [
        'How do you protect a web application from XSS and SQL injection?',
        'For XSS, I escape output, avoid inserting raw HTML and add a Content Security Policy. For SQL injection, I use parameterized queries or an ORM and never join user input into SQL strings. I also validate input on the server, use HTTPS and keep dependencies updated.'
      ]
    ],
    fresher: [
      'The browser asks DNS for the server address, connects to it and sends a request. The server sends back HTML, then the browser loads the CSS, JavaScript and images and shows the page.',
      'Responsive design means the website fits any screen. I start with the phone layout, use Flexbox or Grid, and add media queries for bigger screens.',
      'var is the old way and is function-scoped. let and const are block-scoped. I use const when the value does not change and let when it does.'
    ],
    junior: [
      [
        'How do you work with an API in a front-end application?',
        'I call the API with fetch or a small library, using async and await. I show a loading state, handle errors clearly and check the response status before using the data. I keep API calls in one service file, so the components stay clean and easy to test.'
      ],
      [
        'How do you fix a layout problem that happens in only one browser?',
        'I reproduce it first, then inspect the element and its styles with the developer tools of that browser. I check whether a CSS feature is not supported there, using a compatibility table such as Can I use. Then I add a fallback or a simpler rule and test again in all target browsers.'
      ]
    ],
    senior: [
      [
        'How do you choose between server-side rendering and client-side rendering?',
        'Server-side rendering sends ready HTML, so the first load is fast and search engines can read the content easily. Client-side rendering suits app-like pages with a lot of interaction after the first load. I choose based on SEO needs, performance and team skills, and many frameworks let us mix both page by page.'
      ],
      [
        'How do you keep a large front-end codebase maintainable?',
        'I agree on a clear folder structure, reusable components and a shared design system. I use TypeScript, linting and automated tests, and keep code reviews focused. I also watch the bundle size and remove unused code regularly.'
      ]
    ]
  },
  data: {
    label: 'Data and Analytics',
    role: 'Data and AI Engineer',
    color: '#b45309',
    icon: 'M3 3v18h18M7 15l4-4 3 3 6-6',
    setupRole: 'Data/AI', // skill suggestions: the Data/AI list in src/services/setup.js
    mid: [
      [
        'What is the difference between supervised and unsupervised learning?',
        'In supervised learning, the model learns from labelled data, such as emails marked spam or not spam, and predicts labels for new data. In unsupervised learning there are no labels, and the model finds patterns by itself, such as customer groups through clustering. I choose based on whether labelled data is available and what the business needs.'
      ],
      [
        'What is overfitting, and how do you prevent it?',
        'Overfitting happens when a model learns the training data too closely, including its noise, so it performs poorly on new data. I prevent it with more data, cross-validation and simpler models. I also use regularization, early stopping and a separate test set to check the real performance.'
      ],
      [
        'How do you clean a dataset before analysis?',
        'I check for missing values, duplicates, wrong data types and outliers. I decide how to handle each one, for example by filling, removing or flagging rows, based on the business context. I also make formats like dates and text consistent. I document every step so the analysis can be repeated.'
      ],
      [
        'Which metrics do you use to evaluate a classification model?',
        'I look at accuracy, but also precision, recall and the F1 score, because accuracy can mislead on imbalanced data. A confusion matrix shows exactly where the model makes mistakes, and ROC AUC helps me compare models. I choose the main metric based on the cost of false positives and false negatives.'
      ],
      [
        'How do you explain data findings to a non-technical audience?',
        'I start with the main message and what it means for the business. I use simple charts, avoid technical terms and give one clear recommendation. I also mention the limits of the data honestly, so people can make good decisions.'
      ],
      [
        'What is the difference between a data analyst, a data engineer and a data scientist?',
        'A data engineer builds the pipelines and storage that move and prepare data. A data analyst explores that data, builds reports and answers business questions. A data scientist builds statistical and machine learning models to predict outcomes or automate decisions. In small teams one person often does parts of all three.'
      ],
      [
        'How do you use AI tools like large language models responsibly at work?',
        'I never share private or customer data with a tool the company has not approved. I check AI output for errors, because models can give confident but wrong answers. I keep a human review step for important decisions, and I watch the results for bias.'
      ]
    ],
    fresher: [
      'Supervised learning uses data with labels, like emails marked as spam or not spam. Unsupervised learning has no labels and finds groups or patterns by itself, like customer segments.',
      'Overfitting means the model remembers the training data but does badly on new data. I use a test set, cross-validation and simpler models to avoid it.',
      'I remove duplicates, handle missing values, fix data types and check outliers. I also make dates and text consistent before I start the analysis.'
    ],
    junior: [
      [
        'How would you find the top 5 customers by total sales with SQL?',
        'I group the sales rows by customer and add up the amount with SUM. Then I sort by that total from highest to lowest with ORDER BY and DESC, and keep the first five rows with LIMIT 5. On SQL Server I would use TOP 5 instead of LIMIT.'
      ],
      [
        'How do you take a model from a notebook to production?',
        'I turn the notebook into clean, reusable code, add tests and record the model version and the data used. I deploy it behind an API or as a batch job, often in a container. Then I monitor its accuracy and data drift, and retrain it when performance drops.'
      ]
    ],
    senior: [
      [
        'How do you design a reliable data pipeline?',
        'I define the sources, the data contract and how fresh the data must be. I make each step safe to rerun without creating duplicates, and add data quality checks and alerts at every stage. I use an orchestration tool to schedule and retry jobs, and I document the data lineage so people trust the numbers.'
      ],
      [
        'How do you decide whether a problem needs machine learning at all?',
        'I first check if simple rules, SQL or a dashboard can solve it, because they are cheaper and easier to maintain. Machine learning makes sense when the patterns are complex, there is enough good data and the value is worth the cost. I agree on a clear success metric and a simple baseline before building a model.'
      ]
    ]
  },
  graphic: {
    label: 'Graphic Design',
    role: 'Graphic Designer',
    color: '#c026d3',
    icon: 'M12 19l7-7 3 3-7 7zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.6 7.6M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    setupRole: 'Graphic Designer',
    skills: [
      'Photoshop',
      'Illustrator',
      'Canva',
      'Figma',
      'Typography',
      'Branding',
      'Logo design',
      'Layout design',
      'Color theory',
      'Social media design',
      'Portfolio'
    ],
    mid: [
      [
        'Walk me through your design process.',
        'I start with the brief to understand the goal, the audience and the deadline. Then I research, collect references and sketch rough ideas. I build two or three options, share them early for feedback and refine the chosen one. Finally I prepare the files in the right formats.'
      ],
      [
        'What is the difference between RGB and CMYK?',
        'RGB uses red, green and blue light and is used for screens. CMYK uses cyan, magenta, yellow and black ink and is used for printing. For print work I design in CMYK, or convert carefully and check the colours, because some bright RGB colours cannot be printed exactly.'
      ],
      [
        'What is the difference between vector and raster images?',
        'Vector images are made of paths and shapes, so they scale to any size without losing quality, which is ideal for logos and icons. Raster images are made of pixels, like photos, and lose quality when enlarged. I use Illustrator or Figma for vectors and Photoshop for raster editing.'
      ],
      [
        'How do you handle negative feedback on your design?',
        'I listen fully and ask questions to understand the real concern behind the comment. I separate personal taste from the project goals, and I explain my choices calmly when they support the brief. Then I make the changes and share an updated version quickly.'
      ],
      [
        'How do you choose fonts and colours for a brand?',
        'I start from the brand personality and the audience. I usually pick one or two fonts with clear contrast, such as one for headings and one for body text, and check that they are readable at small sizes. For colours I build a small palette with a main colour, an accent and neutrals, and I check contrast for accessibility.'
      ],
      [
        'How do you prepare a design file for print?',
        'I set the correct size with bleed, usually 3 mm on each side, and keep important text inside the safe area. I use CMYK colours and images at about 300 DPI, and I embed or outline the fonts. Then I export a print-ready PDF and confirm the specifications with the printer.'
      ],
      [
        'How do you manage several design projects with tight deadlines?',
        'I list all projects with their deadlines and priority, and agree realistic timelines with the people involved. I use templates and reusable assets to save time. If two deadlines clash, I discuss the priority with my manager early instead of rushing both.'
      ]
    ],
    fresher: [
      'I first understand the brief and the audience. Then I collect ideas, make rough sketches, design a few options and improve the best one after feedback.',
      'RGB is for screens and uses light. CMYK is for printing and uses ink. For print work I design in CMYK so the colours come out right.',
      'Vector images use shapes and can grow to any size without becoming blurry, so they are good for logos. Raster images use pixels, like photos, and become blurry when enlarged.'
    ],
    junior: [
      [
        'How do you keep designs consistent across many social media posts?',
        'I create templates with a fixed grid, fonts, colours and logo position. I keep a simple brand guide and a shared asset library. This keeps every post on brand and also makes my work faster.'
      ],
      [
        'How do you hand over a design to developers?',
        'I share organized Figma files with clear names, components and styles. I note spacing, sizes and states such as hover and error, and export the assets in the right formats. I stay available for questions and check the built version before release.'
      ]
    ],
    senior: [
      [
        'How do you build and maintain a brand identity system?',
        'I define the core elements: logo rules, colour palette, typography, image style and tone of voice. I document them in a clear brand guide with examples of correct and wrong use. I create shared templates and review new work regularly, so the brand stays consistent as the team grows.'
      ],
      [
        'How do you measure whether a design was successful?',
        'I go back to the goal in the brief, such as more sign-ups, clicks or sales. I look at the data, run A/B tests where possible and collect user feedback. A design is successful when it meets that goal, not only when it looks good.'
      ]
    ]
  },
  // ---- PR B: Cloud, DevOps and Security roles (parents: Cloud, DevOps, Cyber Security)
  cloudadmin: {
    label: 'Cloud Administrator',
    role: 'Cloud Administrator',
    color: '#155e75',
    icon: 'M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5 4 4 0 0 1 17.5 18zM9.5 13.5l2 2 3.5-3.5',
    setupRole: 'Cloud Administrator',
    keywords: ['cloud admin', 'sysadmin', 'backup', 'patching'],
    skills: ['User management', 'Backups', 'Patching', 'Monitoring', 'Cost control', 'IAM', 'Linux', 'Networking', 'Ticketing', 'Automation scripting'],
    mid: [
      [
        'How do you manage user accounts and access in a cloud account?',
        'I create users through the central identity system and give access through groups and roles, never one person at a time. Each group gets only the permissions its work needs. I turn on multi-factor sign-in for everyone and remove access as soon as someone leaves. I also review the access list every month.'
      ],
      [
        'How do you set up and test backups for cloud servers and databases?',
        'I use the backup service of the provider with a schedule and a retention period that match the business needs. I keep copies in another region or account in case of a disaster. Most important, I test a restore regularly, because a backup is only useful if it can be restored. I also get an alert when a backup job fails.'
      ],
      [
        'How do you keep cloud servers patched?',
        'I use the patch management tool of the provider to scan servers and install updates in a planned maintenance window. I patch a test group first and then production in stages. Critical security patches get a shorter timeline. I keep a report of the patch status of every server.'
      ],
      [
        'Which metrics and alerts do you set up for a new cloud server?',
        'I watch CPU, memory, disk space, network traffic and the health checks of the application. I set alerts with sensible limits, for example disk usage above 80 percent, and send them to the team channel or the on-call tool. I also collect the system logs in one place, so problems are easy to investigate.'
      ],
      [
        'How do you use tags in a cloud account?',
        'Tags are key and value labels such as owner, project and environment. I add them to every resource, ideally automatically, so we can see costs per team and find who owns a resource. They also help with automation, for example stopping test servers at night.'
      ],
      [
        'How do you handle a ticket asking for more disk space on a server?',
        'I first check the current usage and growth to confirm the need. Then I take a snapshot, increase the disk size and extend the file system inside the server, which usually needs no downtime. I confirm the new space with the user, update the ticket and note the change for cost tracking.'
      ],
      [
        'Which tasks would you automate first as a cloud administrator?',
        'I automate repetitive tasks that are easy to get wrong, such as creating standard servers, starting and stopping test machines on a schedule and cleaning up old snapshots. I use scripts with the command line tool of the provider or simple templates, and I keep them in Git. Automation saves time and makes every change the same.'
      ]
    ],
    fresher: [
      'I add users to groups with the right permissions instead of giving access one by one. I turn on multi-factor sign-in and remove access when someone leaves.',
      'I schedule automatic backups and keep a copy in another region. Then I test a restore regularly, because a backup that was never tested cannot be trusted.',
      'I use the patch tool of the cloud provider, update a test server first and then the others in a planned window. Security patches come first.'
    ],
    junior: [
      [
        'How do you handle a request to restore a deleted file from a backup?',
        'I confirm what was lost, on which server and at what time, and check that the person is allowed to have it. I restore to a separate location first, so current data is not overwritten, and let the user check the file. Then I move it back and record the restore in the ticket.'
      ],
      [
        'How do you document changes in a cloud environment?',
        'Every change goes through a ticket that says what changed, why and how to roll it back. I keep diagrams and step-by-step guides up to date in a shared place. Infrastructure kept as code also gives us a full history of changes in Git.'
      ]
    ],
    senior: [
      [
        'How do you organize many cloud accounts for a company?',
        'I use the organization features of the provider to group accounts by environment and team, with guardrail policies applied from the top. Sign-in is central with single sign-on. Logs and billing go to dedicated accounts. This keeps teams independent while security and costs stay under control.'
      ],
      [
        'How do you plan disaster recovery for important systems?',
        'I agree on recovery time and recovery point targets with the business for each system. Then I pick a strategy that fits, from backup and restore up to a warm standby in another region. I document the steps and run recovery drills, because a plan that is never tested usually fails.'
      ]
    ]
  },
  cloudarch: {
    label: 'Cloud Solutions Architect',
    role: 'Cloud Solutions Architect',
    color: '#1d4ed8',
    icon: 'M4 20L12 4l8 16M7 14h10M12 4v4',
    setupRole: 'Cloud Architect',
    keywords: ['architect', 'presales', 'solution design', 'migration'],
    skills: [
      'Architecture design',
      'Cost optimization',
      'Well-Architected',
      'Proposals',
      'Communication',
      'Networking',
      'Security',
      'Migration',
      'Documentation'
    ],
    mid: [
      [
        'How do you start designing a cloud solution for a new client?',
        'I start with questions, not with services. I learn the business goal, the users, the data, the budget, the compliance needs and the expected load. Then I draw a simple first design, check it against those needs and discuss the trade-offs with the client before going into detail.'
      ],
      [
        'What is the Well-Architected Framework?',
        'It is a set of best practices from the cloud providers for reviewing a design. The AWS version has six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability. I use it as a checklist to find risks in a design before they become problems.'
      ],
      [
        'How do you choose between virtual machines, containers and serverless for a workload?',
        'Virtual machines give full control and suit older applications. Containers suit services that need portable and consistent deployments. Serverless suits event-driven work with uneven traffic, because you pay only when the code runs. I choose based on the workload, the skills of the team, the cost and how much operations work the team can handle.'
      ],
      [
        'How do you plan the migration of an application to the cloud?',
        'I first assess the application, its dependencies and its data, then choose a migration strategy such as rehost, replatform or refactor. I start with a small, low-risk system, plan the data move and a rollback, and test performance before the switch. After the migration I tune costs and remove what is no longer needed.'
      ],
      [
        'How do you explain a cloud design to a non-technical client?',
        'I focus on the business result: what improves, what it costs and what the risks are. I use one simple diagram and plain words instead of service names. I compare two or three options with their trade-offs and give a clear recommendation.'
      ],
      [
        'How do you estimate the monthly cost of a cloud design?',
        'I list every component with its expected size and usage, then use the pricing calculator of the provider. I add data transfer, storage growth and support costs, which are often missed. I show a range for low and high usage and point out savings options such as reserved capacity or savings plans.'
      ],
      [
        'What goes into a good technical proposal?',
        "A good proposal starts with the client's problem and goals in their own words. It then explains the proposed design, the main options considered, the timeline, the cost estimate and the risks. I keep it short, add one clear diagram and state the assumptions, so there are no surprises later."
      ]
    ],
    fresher: [
      'I first ask about the goal, the users, the data and the budget. Then I draw a simple design and discuss it with the client before adding details.',
      'It is a set of best practices for checking a cloud design, with pillars such as security, reliability, performance, cost and operations. I use it as a checklist.',
      'Virtual machines give the most control, containers are portable and consistent, and serverless runs code only when it is needed. I choose based on the workload and the team.'
    ],
    junior: [
      [
        'How do you document an architecture decision?',
        'I write a short decision record with the context, the options considered, the decision and its consequences. I store it next to the code or in a shared space. This helps new team members understand why things are built the way they are.'
      ],
      [
        'How do you support the sales team in a technical presales meeting?',
        "I listen to the client's needs, answer technical questions clearly and honestly, and never promise what the product cannot do. I can sketch a solution or show a short demo. After the meeting I share notes and the open questions with the sales team."
      ]
    ],
    senior: [
      [
        'How do you handle a client who wants the cheapest design and the highest reliability?',
        'I explain the trade-off openly, with numbers: what each level of reliability costs and what downtime would cost the business. Then I offer options, for example high availability only for the critical parts. The client makes an informed decision, and I document it.'
      ],
      [
        'How do you design an architecture that runs in more than one region?',
        'I first check whether it is really needed, because it adds cost and complexity. If it is, I choose active-passive or active-active, plan data replication and its consistency limits, and use health-checked DNS or a global load balancer for failover. Then I test the failover regularly.'
      ]
    ]
  },
  cloudsec: {
    label: 'Cloud Security Engineer',
    role: 'Cloud Security Engineer',
    color: '#065f46',
    icon: 'M7 17a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8.5 4 4 0 0 1 17.5 17zM10 13h4v3h-4zM11 13v-1a1 1 0 0 1 2 0v1',
    setupRole: 'Cloud Security',
    keywords: ['cspm', 'kms', 'cloud security'],
    skills: ['IAM', 'Encryption', 'KMS', 'Compliance', 'CSPM', 'Network security', 'Logging', 'Zero trust', 'Shared responsibility'],
    mid: [
      [
        'How can cloud workloads get access without long-lived access keys?',
        'I give each workload a role, such as an instance role or a workload identity, so it receives short-lived credentials automatically. People sign in through single sign-on and also get temporary credentials. This removes stored keys that could leak. I then limit each role to only what that workload needs.'
      ],
      [
        'How does encryption with a key management service work?',
        'A key management service stores and protects the master keys, often in hardware security modules. Data is encrypted with data keys, and those data keys are encrypted with the master key, which is called envelope encryption. I control who can use each key through key policies and log every use of a key.'
      ],
      [
        'What is Cloud Security Posture Management?',
        'Cloud Security Posture Management, or CSPM, means tools that scan cloud accounts all the time for risky settings, such as public storage, open security groups or disabled logging. They compare the settings with best practices and compliance standards and raise findings. I use them to find problems early and track each one until it is fixed.'
      ],
      [
        'Which logs do you enable in a cloud account for security?',
        'I enable the audit log of all API activity, such as AWS CloudTrail, in every region and send it to a separate, protected log account. I also turn on network flow logs, storage access logs and the threat detection service of the provider. The logs are kept for the required period and connected to alerts.'
      ],
      [
        'How do you protect secrets such as database passwords in the cloud?',
        'I keep secrets in a secrets manager, not in code, images or plain configuration files. Applications read them at runtime through their role, and the secrets are rotated automatically where possible. I also scan code repositories, so a secret that slips in is found and revoked quickly.'
      ],
      [
        'How do you control network access to cloud resources?',
        'I place resources in private subnets and expose only what must be public, usually through a load balancer. Security groups allow only the needed ports and sources. I use private endpoints to reach cloud services without going over the internet, and I review open rules regularly.'
      ],
      [
        'What do you do if a cloud access key is exposed in public?',
        'I treat it as an incident and act fast: I deactivate the key, create a new one if it is still needed and update the systems that use it. Then I check the audit logs for any activity with that key and remove anything an attacker created. Finally I find out how it leaked and add scanning so it does not happen again.'
      ]
    ],
    fresher: [
      'I give each application a role, so it gets temporary credentials automatically. This means no access keys are saved in code or on servers.',
      'A key management service keeps the main keys safe. Data is encrypted with data keys, and these are protected by the main key. Access to the keys is controlled and logged.',
      'CSPM tools check cloud settings all the time and report risky things, such as public storage or open ports. They help us fix problems early.'
    ],
    junior: [
      [
        'How do you stop insecure cloud resources before they are created?',
        'I add policy checks to the infrastructure as code pipeline, so templates with risky settings fail before deployment. In the cloud accounts, guardrail policies block actions such as turning off logging. Stopping a problem before deployment is cheaper than finding it later.'
      ],
      [
        'How do you review the permissions of an existing cloud role?',
        'I compare the permissions the role has with what it actually used, using the access analysis tools of the provider and the audit logs. I remove unused permissions step by step and test the workload after each change. I also check who is allowed to use the role.'
      ]
    ],
    senior: [
      [
        'How do you build a security baseline for many cloud accounts?',
        'I define a standard set of controls: central logging, threat detection, encryption by default, blocked public storage and guardrail policies for the whole organization. New accounts get this baseline automatically when they are created. I measure compliance across all accounts and report the gaps to their owners.'
      ],
      [
        'How do you meet compliance requirements in the cloud?',
        'I map each requirement to concrete cloud controls and note which part the provider covers under the shared responsibility model. I use built-in compliance checks and keep evidence such as logs and configuration reports. Regular reviews show auditors that the controls work all the time, not only on audit day.'
      ]
    ]
  },
  clouddata: {
    label: 'Cloud Data Engineer / AI',
    role: 'Cloud Data Engineer',
    color: '#a16207',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3M20 6v5M17 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1z',
    setupRole: 'Cloud Data/AI',
    keywords: ['data engineer', 'etl', 'spark', 'data lake', 'machine learning'],
    skills: ['Python', 'SQL', 'ETL', 'Data lake', 'Spark', 'Data pipelines', 'ML services', 'Orchestration'],
    mid: [
      [
        'What is the difference between a data lake and a data warehouse?',
        'A data lake stores raw data of any type, often in cheap object storage, and the structure is applied when the data is read. A data warehouse stores cleaned, structured data that is optimized for fast SQL queries and reports. Many teams use both, or a lakehouse that combines them.'
      ],
      [
        'What is the difference between ETL and ELT?',
        'In ETL, data is extracted, transformed and then loaded into the target. In ELT, the raw data is loaded first and transformed inside the warehouse or lake with its own compute power. ELT is common in the cloud, because storage is cheap and cloud warehouses are powerful.'
      ],
      [
        'Why do teams use Apache Spark?',
        'Spark processes large datasets in parallel across many machines and keeps data in memory where it can, which makes it fast. It supports SQL, Python and streaming in one engine. In the cloud I run it as a managed service, so I do not have to manage the cluster myself.'
      ],
      [
        'How do you choose between batch and streaming processing?',
        'Batch processing handles data in scheduled chunks, which is simpler and cheaper, for example for daily reports. Streaming processes events as they arrive and suits use cases that need results within seconds, such as fraud alerts. I choose based on how fresh the data must be and on the cost.'
      ],
      [
        'Why do file formats like Parquet matter in a data lake?',
        'Parquet is a columnar format, so a query reads only the columns it needs, and the data compresses well. This makes queries faster and cheaper than with CSV files. I also partition the data, for example by date, so queries scan less of it.'
      ],
      [
        'What does an orchestration tool do in a data platform?',
        'An orchestration tool, such as Apache Airflow, schedules the steps of a pipeline, runs them in the right order and retries steps that fail. It shows which runs passed or failed and sends alerts. This keeps many pipelines reliable and easy to monitor.'
      ],
      [
        'How do you use a managed machine learning service in the cloud?',
        'I use it to prepare data, train models on managed compute and deploy them as endpoints without building the infrastructure myself. I track experiments and model versions, and I secure the endpoints with roles and private networking. I also watch the costs, because training and always-on endpoints can be expensive.'
      ]
    ],
    fresher: [
      'A data lake keeps raw data of any type in cheap storage. A data warehouse keeps cleaned, structured data that is fast for SQL and reports.',
      'ETL changes the data before loading it. ELT loads the raw data first and changes it inside the warehouse, which is common in the cloud.',
      'Spark processes big data in parallel on many machines, so it is fast. It works with SQL and Python, and cloud providers offer it as a managed service.'
    ],
    junior: [
      [
        'How do you handle late or duplicate data in a pipeline?',
        'I design each step so it can run again safely, for example by merging on a unique key instead of only appending rows. For late data I reprocess a time window, such as the last few days. I also add checks that count rows and flag unexpected changes.'
      ],
      [
        'How do you control the cost of queries in a cloud data warehouse?',
        'I partition and cluster large tables, select only the columns I need and avoid repeated full scans. I set budgets and query limits, and I review the most expensive queries regularly. Summary tables help for dashboards that run often.'
      ]
    ],
    senior: [
      [
        'How do you set up data governance for a cloud data platform?',
        'I set up a data catalog with clear owners, definitions and data quality rules. Access is given by role, and sensitive columns are masked or restricted. I track lineage, so we know where data comes from and who uses it. This builds trust and helps with privacy laws.'
      ],
      [
        'How do you choose between building your own model and using a managed AI service?',
        'I first try a managed AI service or a ready-made model, because it is faster and cheaper to start with. I build or fine-tune my own model only when the managed option cannot meet our accuracy, cost, privacy or control needs. I compare the options on real data with a clear success metric.'
      ]
    ]
  },
  devops: {
    label: 'DevOps Engineer',
    role: 'DevOps Engineer',
    color: '#3f6212',
    icon: 'M7 8a4 4 0 1 0 0 8c2.5 0 4-2 5-4s2.5-4 5-4a4 4 0 1 1 0 8c-2.5 0-4-2-5-4S9.5 8 7 8z',
    setupRole: 'DevOps',
    keywords: ['devops', 'ci/cd', 'pipeline', 'docker', 'kubernetes'],
    skills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'CI/CD', 'Git', 'Linux', 'Ansible', 'Monitoring'],
    mid: [
      [
        'What does DevOps mean to you?',
        'DevOps is a way of working where development and operations share the responsibility for building, releasing and running software. It relies on automation, small and frequent changes, fast feedback and measuring results. The goal is to deliver value to users quickly and safely.'
      ],
      [
        'How do you write a good Dockerfile?',
        'I start from a small, trusted base image and pin its version. I order the steps so that layers that rarely change come first, which makes builds faster through caching. I use a multi-stage build to keep build tools out of the final image, run the app as a non-root user and never put secrets in the image.'
      ],
      [
        'How do you choose a branching strategy for a team?',
        'For most teams I prefer trunk-based development with short-lived feature branches and pull requests, because it keeps changes small and merging easy. Feature flags hide unfinished work. Long-lived release branches only make sense when we must support several versions at the same time.'
      ],
      [
        'What is the difference between continuous delivery and continuous deployment?',
        'With continuous delivery, every change that passes the pipeline is ready to release, but a person approves the release to production. With continuous deployment, every change that passes the tests goes to production automatically. Both need strong automated tests.'
      ],
      [
        'How do you use Ansible?',
        'Ansible is an agentless automation tool that connects over SSH and applies playbooks written in YAML. I use it to configure servers, install packages and deploy applications the same way every time. Its tasks are designed to be idempotent, so running them again does not cause unwanted changes.'
      ],
      [
        'Which deployment strategies do you know?',
        'Rolling deployments replace instances a few at a time. Blue-green keeps two environments and switches traffic at once, which makes rollback fast. Canary releases send a small share of traffic to the new version first and increase it if the metrics stay healthy.'
      ],
      [
        'Which DORA metrics do you track?',
        'The four key DORA metrics are deployment frequency, lead time for changes, change failure rate and the time to recover from a failed deployment. They show both speed and stability. I use them to find bottlenecks and to see whether our improvements really help.'
      ]
    ],
    fresher: [
      'DevOps means developers and operations work together. We automate builds, tests and releases, make small changes often and get feedback fast.',
      'I use a small official base image, put the steps that rarely change first so caching works, and use a multi-stage build. The app runs as a non-root user and no secrets go into the image.',
      'I like short-lived branches and pull requests that merge into the main branch often. Small changes are easier to review and cause fewer conflicts.'
    ],
    junior: [
      [
        'How do you speed up a slow CI pipeline?',
        'I first measure which steps take the longest. Then I cache dependencies and build layers, run independent jobs in parallel and, where possible, run only the tests affected by a change. I also keep ready-made build images, so jobs do not install the same tools every time.'
      ],
      [
        'What do you do when a deployment fails in production?',
        'I roll back first to restore the service quickly, ideally with one automated step. Then I check the pipeline logs, application logs and metrics to find the cause. I fix it, add a test or check that would have caught it, and share what we learned.'
      ]
    ],
    senior: [
      [
        'How do you introduce DevOps practices to a team that deploys by hand?',
        'I start with the biggest pain, usually manual releases, and automate one pipeline end to end as an example. I involve the team early, train people and measure the results, such as fewer failed releases. Small visible wins build trust for the next steps.'
      ],
      [
        'How do you reduce toil for an operations team?',
        'Toil is repetitive manual work that adds no lasting value. I measure where the time goes, then automate the biggest tasks, improve alerts so people are woken up only for real problems and fix recurring issues at the root. I aim to keep toil to a small share of the time of the team.'
      ]
    ]
  },
  platform: {
    label: 'Platform Engineer',
    role: 'Platform Engineer',
    color: '#5b21b6',
    icon: 'M3 8l9-5 9 5-9 5zM3 12l9 5 9-5M3 16l9 5 9-5',
    setupRole: 'Platform Engineer',
    keywords: ['platform', 'kubernetes', 'helm', 'gitops', 'observability'],
    skills: ['Kubernetes', 'Terraform', 'Helm', 'CI/CD', 'Observability', 'Linux', 'Networking', 'Automation'],
    mid: [
      [
        'What is platform engineering?',
        'Platform engineering builds an internal platform that gives developers self-service tools to build, deploy and run their services. It hides complex infrastructure behind simple, well-documented paths. The goal is to let product teams ship faster while security and reliability standards are built in.'
      ],
      [
        'What is a golden path?',
        'A golden path is a supported, ready-made way to do a common task, such as creating a new service with a template, a pipeline and monitoring already set up. Teams can still choose another way, but the golden path is the easiest one. It spreads good practices without forcing them.'
      ],
      [
        'What is Helm and why is it used?',
        'Helm is a package manager for Kubernetes. It bundles Kubernetes manifests into charts with templates and values, so one chart can be installed in many environments with different settings. It also tracks releases, which makes upgrades and rollbacks easier.'
      ],
      [
        'What is GitOps?',
        'GitOps uses a Git repository as the source of truth for what should run in a cluster. A tool such as Argo CD or Flux compares the cluster with the repository and applies changes automatically. Every change is reviewed in a pull request, and a rollback is a simple Git revert.'
      ],
      [
        'What are the three main types of observability data?',
        'Metrics show numbers over time, such as request rate and latency. Logs record single events with details. Traces follow one request across many services and show where the time is spent. Together they help us find and understand problems quickly.'
      ],
      [
        'How do you let many teams share one Kubernetes cluster safely?',
        'I give each team its own namespaces with resource quotas and role-based access control. Network policies limit which services can talk to each other. Policy tools enforce rules, such as no privileged containers, so one team cannot harm another.'
      ],
      [
        'How do you measure the success of an internal platform?',
        'I treat the platform as a product and the developers as its users. I measure adoption, how long it takes to create and deploy a new service, deployment frequency and developer satisfaction. I collect feedback regularly and improve the parts that slow people down.'
      ]
    ],
    fresher: [
      'Platform engineering builds tools that let developers create, deploy and run their apps by themselves. It makes the hard infrastructure parts simple.',
      'A golden path is a ready, supported way to do a common task, such as starting a new service with a template and a pipeline already set up.',
      'Helm is a package manager for Kubernetes. It bundles the settings of an app into a chart that can be installed in different environments.'
    ],
    junior: [
      [
        'How do you debug a pod that keeps restarting?',
        'I check the pod status and events with kubectl describe, then the logs of the current and the previous container. Common causes are a failing health check, too little memory, a wrong setting or a missing secret. I fix the cause and confirm that the pod stays healthy.'
      ],
      [
        'How do you set resource requests and limits for containers?',
        'Requests tell the scheduler how much CPU and memory a container needs, and limits cap what it can use. I set them from real usage data with some headroom. A memory limit that is too low causes restarts, so I watch the metrics after every change.'
      ]
    ],
    senior: [
      [
        'How do you decide what to build into the platform and what to leave to the teams?',
        'I look for problems that many teams share, such as deployment, secrets and monitoring, and build those into the platform. Unique needs stay with the teams. I talk to developers regularly and avoid building features nobody asked for.'
      ],
      [
        'How do you plan a Kubernetes version upgrade across many clusters?',
        'I first read the release notes for removed APIs and check our manifests and charts for them. I upgrade test clusters, then production clusters in stages, rolling the node pools one at a time. I keep the platform close to the supported versions, so each upgrade stays small.'
      ]
    ]
  },
  soc: {
    label: 'SOC Analyst',
    role: 'SOC Analyst',
    color: '#9f1239',
    icon: 'M3 4h18v12H3zM8 20h8M12 16v4M7 12l3-3 2 2 4-4',
    setupRole: 'SOC Analyst',
    keywords: ['soc', 'security operations', 'siem', 'blue team', 'monitoring'],
    skills: ['SIEM', 'Log analysis', 'Incident triage', 'Splunk', 'MITRE ATT&CK', 'Threat detection', 'Networking', 'Linux', 'Alert tuning'],
    mid: [
      [
        'What does a SOC analyst do during a normal shift?',
        'I monitor alerts from the SIEM and other security tools, triage them and investigate the ones that look real. I document every case in the ticketing system and escalate confirmed incidents to the next level. Between alerts I tune noisy rules and read about new threats.'
      ],
      [
        'How do you prioritize many alerts at the start of a shift?',
        'I sort the alerts by severity and by how important the affected system is, such as a domain controller or a finance system. I handle alerts that suggest an active attack first. I also look for alerts that are linked, because several small alerts can be one bigger incident.'
      ],
      [
        'What is MITRE ATT&CK and how do you use it?',
        'MITRE ATT&CK is a public knowledge base of attacker tactics and techniques seen in real attacks. I use it to understand what stage an attack may be at and what the attacker may try next. It also helps us check which techniques our detections cover and where we have gaps.'
      ],
      [
        'What is alert tuning and why is it important?',
        'Alert tuning means adjusting detection rules so they catch real threats with fewer false alarms, for example by adding exceptions for known safe activity. Too many noisy alerts cause alert fatigue, and analysts may miss the real ones. I document every change and check that it does not hide real attacks.'
      ],
      [
        'Which log sources are most useful for a SOC?',
        'Sign-in logs, endpoint detection logs, firewall and proxy logs, DNS logs, email security logs and cloud audit logs are very useful. Together they show who did what, from where and when. I also make sure the clocks of all systems are synchronized, so events can be linked correctly.'
      ],
      [
        'Which signs in the logs can point to a brute force attack?',
        'Many failed logins in a short time, from one source to many accounts or to one account, are a common sign. A successful login after many failures is even more important. I check the source address, the accounts involved and whether the login was followed by unusual activity.'
      ],
      [
        'What is an indicator of compromise?',
        'An indicator of compromise, or IOC, is evidence that a system may have been attacked, such as a known malicious IP address, domain or file hash. I search our logs for IOCs from threat intelligence. IOCs change quickly, so I also look at attacker behavior, not only at single indicators.'
      ]
    ],
    fresher: [
      'I watch the alerts from the security tools, check each one and investigate the real ones. I write clear notes and escalate confirmed incidents.',
      'I handle the most severe alerts on the most important systems first, especially signs of an active attack. I also look for alerts that belong together.',
      'MITRE ATT&CK is a free list of the methods attackers use. It helps me understand an attack and see what our detections cover.'
    ],
    junior: [
      [
        'How do you write a good escalation note for an incident?',
        'I write what happened, when, which users and systems are affected, what evidence I found and what I have already done. I give my view of the severity and the next steps I recommend. A clear note lets the next analyst act without asking again.'
      ],
      [
        'How do you use threat intelligence in daily SOC work?',
        'I use threat intelligence feeds to add context to alerts, for example whether an IP address is known to be malicious. I also read reports on new attack campaigns and check if our detections would catch them. I always confirm intelligence with our own logs before acting on it.'
      ]
    ],
    senior: [
      [
        'How do you measure how well a SOC is working?',
        'I track the mean time to detect and the mean time to respond, the false positive rate, the alert volume per analyst and the detection coverage against MITRE ATT&CK. I also review closed incidents to find missed signals. The numbers guide training, tuning and hiring decisions.'
      ],
      [
        'How do you build a new detection rule?',
        'I start from a real threat or technique, define the behavior we want to catch and check which logs show it. I write the rule and test it on past data to see the false positives, and with safe, approved simulations where possible. Then I document it, deploy it and review its results after a few weeks.'
      ]
    ]
  },
  pentest: {
    label: 'Penetration Tester',
    role: 'Penetration Tester',
    color: '#7f1d1d',
    icon: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM12 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
    setupRole: 'Penetration Tester',
    keywords: ['pentest', 'pentester', 'ethical hacking', 'red team', 'security testing'],
    skills: ['Kali Linux', 'Burp Suite', 'Nmap', 'OWASP', 'Metasploit', 'Reporting', 'Web security', 'Networking', 'Linux'],
    mid: [
      [
        'What do you agree on with a client before a penetration test starts?',
        'I never test anything without written permission. Before we start, we agree on the scope, the systems that are out of scope, the testing window, the rules of engagement and emergency contacts. This protects the client and me, and it keeps the test safe and legal.'
      ],
      [
        'What are the main phases of a penetration test?',
        'A test usually moves through planning and scoping, information gathering, finding weaknesses, carefully confirming them within the agreed rules, and reporting. After the client fixes the issues, a retest confirms the fixes. Every step stays inside the authorized scope.'
      ],
      [
        'What is the difference between a vulnerability scan and a penetration test?',
        'A vulnerability scan is an automated check that lists possible weaknesses, often with false positives. A penetration test is done by a person who confirms the findings, understands how they combine and explains the real business risk. Both are useful, but they answer different questions.'
      ],
      [
        'What makes a good penetration test report?',
        'A good report has a short summary for managers in plain words and a technical section for each finding. Each finding has a risk rating, the affected systems, clear evidence and practical steps to fix it. I write it so both managers and engineers can act on it.'
      ],
      [
        'How do you rate the severity of a finding?',
        "I consider how easy the issue is to exploit, what an attacker could reach and the impact on the business. I often use CVSS as a base score and then adjust the priority for the client's situation. I explain my reasoning, so the client can plan the fixes in the right order."
      ],
      [
        'What is the difference between black box, grey box and white box testing?',
        'In black box testing the tester gets almost no information, like an outside attacker. In grey box testing the tester gets some access, such as a normal user account. In white box testing the tester sees documentation and sometimes code, which finds more issues in less time.'
      ],
      [
        'What do you do if you find a critical issue during a test?',
        "I stop and inform the client's agreed contact right away, instead of waiting for the final report. I share the details securely and do not go further than the scope allows. The client can then fix it quickly, and I note everything in the report."
      ]
    ],
    fresher: [
      'First I get written permission. Then we agree on what I may test, what is out of scope, the time window and who to call in an emergency.',
      'The main phases are planning, gathering information, finding weaknesses, checking them carefully within the rules, and reporting. Later a retest checks the fixes.',
      'A scan is an automatic list of possible problems. A penetration test is done by a person who checks the real risk and explains it.'
    ],
    junior: [
      [
        'How do you avoid causing damage during a test?',
        'I stay strictly within the scope and the rules, avoid tests that could crash systems unless the client agreed to them, and prefer a staging environment where possible. I keep the client informed and stop at once if something looks unstable.'
      ],
      [
        'How do you keep your testing skills up to date in a legal way?',
        'I practise on legal training platforms and in my own lab, follow security research and read public advisories. I also work toward recognized certifications. I never test systems I do not have permission for.'
      ]
    ],
    senior: [
      [
        'How do you plan a penetration testing program for a company?',
        'I start from the risks of the company and its most important systems, then decide how often each area is tested, for example every year for key applications and after major changes. I combine automated scanning with manual tests and track every finding until it is fixed.'
      ],
      [
        'How do you explain the results of a test to senior management?',
        'I focus on business risk, not technical detail: what an attacker could reach and what it would mean for the company. I show the trend compared with earlier tests and give a short, prioritized plan. Clear numbers and plain words help managers decide on budget and timelines.'
      ]
    ]
  },
  appsec: {
    label: 'Application Security',
    role: 'Application Security Engineer',
    color: '#86198f',
    icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM10 10l-2 2 2 2M14 10l2 2-2 2',
    setupRole: 'Application Security',
    keywords: ['appsec', 'secure coding', 'devsecops', 'sast', 'dast'],
    skills: ['OWASP Top 10', 'SAST', 'DAST', 'Secure coding', 'Threat modeling', 'Code review', 'Dependency scanning', 'CI/CD security'],
    mid: [
      [
        'What is the difference between SAST and DAST?',
        'SAST, or static application security testing, analyzes the source code without running it and finds issues early in development. DAST, or dynamic testing, tests the running application from the outside, like a user or an attacker would. They find different kinds of problems, so I use both in the pipeline.'
      ],
      [
        'What is threat modeling?',
        'Threat modeling is a structured way to find security risks in a design before it is built. We draw how data flows, ask what could go wrong, for example with the STRIDE categories, and decide on controls. Security problems are cheapest to fix at the design stage.'
      ],
      [
        'Why does dependency scanning matter?',
        'Most applications use many open source libraries, and a vulnerability in one of them affects our app too. Dependency scanning, also called software composition analysis, checks our libraries against known vulnerability databases. I keep dependencies updated and fix critical issues quickly.'
      ],
      [
        'What do you look for in a security code review?',
        'I check how the code handles input and output, authentication, authorization on every request, secrets, error messages and the logging of sensitive data. I focus on risky areas such as login, payments and file uploads. I give clear, friendly comments with a suggested fix.'
      ],
      [
        'How do you build security checks into a CI/CD pipeline?',
        'I add automated checks at each stage: secret scanning and SAST on every pull request, dependency and container image scanning in the build, and DAST against a test environment. Critical findings block the release. Fast, relevant checks keep developers on board.'
      ],
      [
        'How should an application store user passwords?',
        'Passwords are never stored in plain text or with a simple hash. I use a slow, salted password hashing algorithm made for this purpose, such as Argon2, bcrypt or scrypt. I also add rate limiting and multi-factor sign-in to protect the accounts.'
      ],
      [
        'What is broken access control, and how do you prevent it?',
        'Broken access control happens when users can see or change data they should not, for example by changing an ID in a request. I prevent it by checking authorization on the server for every request, denying access by default and using tested access rules. I also add tests for these cases.'
      ]
    ],
    fresher: [
      'SAST checks the source code without running it. DAST tests the running app from the outside. Using both finds more problems.',
      'Threat modeling means looking at a design and asking what could go wrong, before we build it. Then we add controls for the biggest risks.',
      'Apps use many open source libraries. Dependency scanning checks them for known vulnerabilities, so we can update the risky ones early.'
    ],
    junior: [
      [
        'How do you help developers fix a security finding?',
        'I explain the risk in simple words, show where the problem is and suggest a concrete fix or a code example. I set a fair priority based on the real risk. Working with developers, not against them, gets more issues fixed.'
      ],
      [
        'How do you handle a false positive from a security scanner?',
        'I check the finding by looking at the code and its context. If it really is a false positive, I mark it in the tool with a short reason, so it does not come back, and improve the rule if possible. I keep a record, so the decision can be reviewed later.'
      ]
    ],
    senior: [
      [
        'How do you set up a security champions program?',
        'I invite one interested developer from each team to become a security champion. They get training, time and a direct line to the security team, and they bring security thinking into the daily work of their team. This scales application security better than a small central team alone.'
      ],
      [
        'How do you decide which application security issues to fix first?',
        'I rank issues by real risk: how easy they are to exploit, whether the application is exposed to the internet and how sensitive its data is. Critical issues in exposed systems are fixed first, with clear deadlines. I track the backlog and share progress with the teams.'
      ]
    ]
  },
  grc: {
    label: 'GRC Analyst',
    role: 'GRC Analyst',
    color: '#334155',
    icon: 'M8 4h8v3H8zM6 5H4v16h16V5h-2M8 13l2.5 2.5L16 10',
    setupRole: 'GRC Analyst',
    keywords: ['grc', 'governance', 'risk', 'compliance', 'audit', 'iso 27001'],
    skills: ['ISO 27001', 'Risk assessment', 'Audit', 'Policies', 'NIST', 'Compliance', 'Documentation', 'Vendor risk', 'Communication'],
    mid: [
      [
        'What does GRC mean?',
        'GRC stands for governance, risk and compliance. Governance sets the policies and responsibilities, risk management finds and treats risks, and compliance makes sure we meet laws, standards and contracts. Together they help a company protect information in an organized way.'
      ],
      [
        'What is ISO 27001?',
        'ISO 27001 is an international standard for an information security management system. It requires a company to assess its risks, choose controls, often from Annex A, and keep improving them. A company can be certified by an accredited auditor.'
      ],
      [
        'How do you carry out a risk assessment?',
        'I list the important assets, identify the threats and weaknesses that affect them and rate each risk by likelihood and impact. Then the risk owner decides to reduce, transfer, avoid or accept it. I record everything in a risk register and review it regularly.'
      ],
      [
        'How do you prepare for an information security audit?',
        'I check the scope and the requirements early, then collect evidence for each control, such as policies, logs and screenshots. I run an internal review first to find gaps and fix them before the audit. During the audit I answer clearly and provide evidence quickly.'
      ],
      [
        'How do you write a security policy that people follow?',
        'I keep it short, clear and in plain words, and I explain why each rule exists. I involve the teams who must follow it and make sure it is realistic. Then I communicate it, train people and review it at least once a year.'
      ],
      [
        'What is vendor risk management?',
        'It is the process of checking the security of suppliers that handle our data or systems. I use questionnaires, certifications such as ISO 27001, SOC 2 reports and contract clauses. Vendors with more access get deeper checks and regular reviews.'
      ],
      [
        'What is the NIST Cybersecurity Framework?',
        'It is a widely used framework from the US National Institute of Standards and Technology that helps organizations manage cybersecurity risk. Version 2.0 has six functions: Govern, Identify, Protect, Detect, Respond and Recover. I use it to measure where we are today and to plan improvements.'
      ]
    ],
    fresher: [
      'GRC means governance, risk and compliance. It is about policies, managing risks and following laws and standards.',
      'ISO 27001 is an international standard for managing information security. A company assesses its risks, chooses controls and can get certified.',
      'I list the important assets, find the threats to them and rate each risk by how likely it is and how much harm it could do. Then the owner decides what to do.'
    ],
    junior: [
      [
        'How do you track whether security controls are working?',
        'I define simple measures for key controls, such as the share of laptops with encryption or how fast access is removed for people who leave. I collect them regularly, ideally automatically, and report the trend. Controls that fail get an owner and a date to fix them.'
      ],
      [
        'How do you handle a team that does not follow a policy?',
        'I first talk to them to understand why, because the policy may be unclear or impractical. If the policy is valid, I help them find a workable way to follow it. If they need an exception, I document the risk and get approval from the right manager, with an end date.'
      ]
    ],
    senior: [
      [
        'How do you report information security risk to the board?',
        'I keep it short and focused on the business: the top risks, their trend, what we are doing about them and what decisions we need. I avoid technical terms and use simple ratings. I connect each risk to business goals, so the board can set priorities and budget.'
      ],
      [
        'How do you build a compliance program for a new regulation?',
        'I first understand the regulation and whether it applies to us, then map its requirements to our existing controls to find the gaps. I plan the work with owners and deadlines, update policies and train staff. Finally I collect evidence and review compliance regularly.'
      ]
    ]
  },
  ir: {
    label: 'Incident Response',
    role: 'Incident Response Analyst',
    color: '#c2410c',
    icon: 'M12 3l10 18H2zM12 10v5M12 18h.01',
    setupRole: 'Incident Response',
    keywords: ['incident response', 'dfir', 'forensics', 'malware', 'ransomware'],
    skills: ['Digital forensics', 'Malware analysis', 'Evidence handling', 'Playbooks', 'Log analysis', 'Memory analysis', 'Containment', 'Reporting'],
    mid: [
      [
        'What is an incident response playbook?',
        'A playbook is a step-by-step guide for handling one type of incident, such as ransomware or a compromised account. It lists who to contact, what to check and which actions to take. Playbooks help the team respond quickly and the same way every time, even under pressure.'
      ],
      [
        'How do you handle digital evidence correctly?',
        'I collect evidence in a forensically sound way, for example by making a verified copy and recording its hash. I keep a chain of custody that shows who handled the evidence, when and why. I work on copies, never on the original, so the evidence stays reliable.'
      ],
      [
        'Why is memory analysis useful in an investigation?',
        'Memory holds information that is lost when a computer is turned off, such as running processes, network connections and some malware that never writes to disk. Capturing memory before shutting a system down can show what the attacker was doing. I use dedicated tools to capture and analyze it.'
      ],
      [
        'How do you decide how to contain an incident?',
        'I balance stopping the attack with keeping the business running and saving evidence. Options include isolating a device from the network, disabling an account or blocking an address. I agree on the action with the system owner when possible and record the time and the reason.'
      ],
      [
        'What do you check first when an account may be compromised?',
        'I check the recent sign-ins, their locations and devices, and any changes to the account, such as new mail forwarding rules, passwords or MFA methods. I look at what data the account accessed. Then I reset the credentials, end active sessions and check whether other accounts are involved.'
      ],
      [
        'What is the difference between static and dynamic malware analysis?',
        'Static analysis examines a file without running it, for example its hashes, strings and structure. Dynamic analysis runs the file in an isolated sandbox and watches what it does, such as the files it creates and the connections it makes. I only handle malware in a safe, isolated lab.'
      ],
      [
        'What makes a good incident timeline?',
        'A good timeline lists every important event with an exact time, the source of the evidence and what it means. I use a single time zone, usually UTC, to avoid confusion. The timeline shows how the attacker got in, what they did and when we responded.'
      ]
    ],
    fresher: [
      'A playbook is a step-by-step guide for one type of incident, such as a hacked account. It tells the team who to call and what to do, so we act fast.',
      'I make a verified copy of the evidence and work only on the copy. I record who handled it and when, which is called the chain of custody.',
      'Memory shows what was running on the computer, such as processes and connections, and this is lost when the computer is turned off. So it can show what the attacker did.'
    ],
    junior: [
      [
        'How do you communicate during an active incident?',
        'I share short, regular updates with the incident lead through an agreed channel, and I stick to facts: what we know, what we are doing and what we need. I avoid guessing. If the normal channels may be compromised, we use a separate, secure channel.'
      ],
      [
        'How do you check that an attacker is fully removed from a system?',
        'I look for every way the attacker kept access, such as new accounts, scheduled tasks, startup items or remote access tools. I compare the system with a known good state and often rebuild it from a clean image. Then I watch it closely for some time, because attackers often try to return.'
      ]
    ],
    senior: [
      [
        'How do you lead the response to a ransomware incident?',
        'I start the response plan, bring the team together and contain the spread quickly by isolating affected systems. I protect and check the backups, keep management, legal and communications informed and follow the law on reporting. Recovery starts from clean systems and backups, and every decision is documented.'
      ],
      [
        'How do you test that an incident response plan works?',
        'I run tabletop exercises where the team and managers walk through a realistic scenario and make decisions. I also run technical drills, such as restoring from backup. Each exercise ends with a list of gaps, owners and dates, and the plan is updated.'
      ]
    ]
  },
  // ---- PR C: Data, AI and Database roles (parents: Data and Analytics, AI and Machine Learning, Database)
  analyst: {
    label: 'Data Analyst',
    role: 'Data Analyst',
    color: '#0e7490',
    icon: 'M3 3v18h18M7 17v-5M11 17V8M15 17v-3M19 17V6',
    setupRole: 'Data Analyst',
    keywords: ['data analysis', 'reporting', 'pivot table', 'excel', 'power bi', 'tableau'],
    skills: ['Excel', 'SQL', 'Power BI', 'Tableau', 'Python', 'Pandas', 'Data cleaning', 'Data visualization', 'Statistics', 'Reporting'],
    mid: [
      [
        'What does a data analyst do day to day?',
        'I collect data from sources such as databases and spreadsheets, clean it and check that it is correct. Then I analyse it to answer business questions, for example why sales dropped in one region. I share the results in reports or dashboards with a short summary and a clear recommendation. I also work with managers to understand what they really need to know.'
      ],
      [
        'How do you use pivot tables in Excel?',
        'A pivot table summarises a large table in a few clicks, for example total sales by region and month. I drag fields into rows, columns and values, and choose sum, count or average. I add filters or slicers so people can focus on one product or period. Before I share the result, I check that the source range includes all the rows.'
      ],
      [
        'What is the difference between mean, median and mode?',
        'The mean is the average: the sum of the values divided by how many there are. The median is the middle value when the values are sorted, and the mode is the value that appears most often. When the data has outliers, such as a few very large salaries, I report the median, because a few extreme values can pull the mean up.'
      ],
      [
        'How do you check that your numbers are correct before you share a report?',
        'I compare totals with the source system or an earlier trusted report. I check row counts after every join and filter, because a wrong join can double or drop rows, and an inner join silently drops rows whose key is NULL. I look for values that do not make sense, such as negative quantities. When possible, a colleague reviews the logic before the report goes out.'
      ],
      [
        'What is the difference between correlation and causation?',
        'Correlation means two values move together, for example ice cream sales and sunburn cases both rise in summer. Causation means one thing actually causes the other. Correlation alone does not prove causation, because a third factor, here hot weather, can drive both. To show a cause, a controlled test such as an A/B test is much stronger.'
      ],
      [
        'How do you choose the right chart for your data?',
        'I choose the chart based on the message. A line chart shows a trend over time, a bar chart compares categories and a scatter plot shows the relation between two numbers. I avoid 3D charts and too many colours, and I start bar charts at zero so differences are not exaggerated. Every chart gets a title that states the main point.'
      ],
      [
        'How do you handle a report request when the question is not clear?',
        'I ask what decision the report will support, who will read it and how often they need it. I confirm the definitions, for example what counts as an active customer. Then I share a small draft early, so we agree on the direction before I spend time on the details.'
      ]
    ],
    fresher: [
      'I collect and clean data, then analyse it to answer business questions. I share the results in simple reports and charts with a clear summary.',
      'A pivot table summarises a big table quickly, for example total sales by month. I choose the rows, columns and values, and add filters if needed.',
      'The mean is the average, the median is the middle value and the mode is the most common value. If there are extreme values, the median gives a fairer picture.'
    ],
    junior: [
      [
        'How do you find out why a key number dropped last month?',
        'I first confirm the drop is real and not a data or tracking problem. Then I break the number down by region, product, channel and customer type to see where the drop comes from. I check what happened in that period, such as price changes or outages. I share what I found, how sure I am and what we should check next.'
      ],
      [
        'What is an A/B test, and how do you read its results?',
        'An A/B test randomly splits users into two groups, shows each group a different version and compares one chosen metric. I decide the metric and the sample size before the test starts. When I read the results, I check whether the difference is statistically significant and large enough to matter for the business. I do not stop the test early just because the numbers look good.'
      ]
    ],
    senior: [
      [
        'How do you define a metric so every team uses it the same way?',
        'I write a clear definition with the exact formula, data source, filters and time period. I agree on it with the business owners and record it in a shared data dictionary. Reports then use one shared calculation instead of each team writing its own. When the definition changes, I note the date and explain the impact.'
      ],
      [
        'How do you work with stakeholders who disagree with your analysis?',
        'I listen to their concerns and ask what they expected and why. I walk them through the data, the method and its limits openly. If they raise a fair point, I check it and update the analysis. My aim is the right answer for the business, not winning the argument.'
      ]
    ]
  },
  bidev: {
    label: 'BI Developer',
    role: 'BI Developer',
    color: '#854d0e',
    icon: 'M3 4h18v16H3zM3 9h18M9 9v11M12 16l2-2 2 1 3-3',
    setupRole: 'BI Developer',
    keywords: ['business intelligence', 'power bi', 'dax', 'tableau', 'dashboard'],
    skills: ['Power BI', 'DAX', 'SQL', 'Tableau', 'Data modeling', 'ETL', 'Dashboards', 'Excel', 'Data warehouse', 'Reporting'],
    mid: [
      [
        'What is a star schema, and why is it used in BI?',
        'A star schema has one central fact table with numbers, such as sales amounts, linked to dimension tables that describe them, such as date, product and customer. It is simple to understand and fast to filter and summarise. In Power BI it also keeps DAX measures simpler and the model smaller.'
      ],
      [
        'What is the difference between a calculated column and a measure in Power BI?',
        'A calculated column is computed for every row when the data is refreshed and is stored in the model, so it uses memory. A measure is computed when a report runs, based on the filters the user selects, such as a year or a region. I use measures for totals and ratios, and calculated columns only when I need a value per row, for example to group or filter.'
      ],
      [
        'How do you design a dashboard that people actually use?',
        'I start with the users and the decisions they make, not with the data. I put the most important numbers at the top, keep each page focused on one topic and use simple charts. I add filters only where they help. Then I test it with a few users and improve it based on their feedback.'
      ],
      [
        'What is DAX, and can you give a simple example?',
        'DAX is the formula language of Power BI and other Microsoft data models. A simple measure is Total Sales, which is the SUM of the sales amount column. CALCULATE is a key function, because it changes the filter context, for example to show sales for the current year only. I keep measures in one place and give them clear names.'
      ],
      [
        'How do you make a slow dashboard faster?',
        'I use the performance tools of the BI software to see which visuals and measures take the longest. I remove unused columns, reduce very detailed data, use a star schema and simplify heavy measures. I also limit the number of visuals on one page. For large data I use pre-summarised tables where possible.'
      ],
      [
        'What is row-level security in a BI report?',
        'Row-level security limits which rows each user can see in the same report. For example, a regional manager sees only the sales of their own region. I define the rules with roles and filters in the model, assign users or groups to the roles and test the report as each role. One report can then serve many teams safely.'
      ],
      [
        'How do you keep dashboard data refreshed and reliable?',
        'I schedule refreshes to match how often the source data changes, for example every morning. I get an alert when a refresh fails and fix the cause quickly. The report shows the last refresh time, so users know how fresh the data is. After changes, I check key totals against the source.'
      ]
    ],
    fresher: [
      'A star schema has one fact table with numbers, like sales, in the middle. Dimension tables, like date, product and customer, describe those numbers and make reports fast and simple.',
      'A calculated column is stored for every row. A measure is calculated when the user filters the report, so I use measures for totals and percentages.',
      'I ask users which decisions they make, then show the key numbers at the top with simple charts. I keep each page focused and test it with real users.'
    ],
    junior: [
      [
        'How do you handle a request to add many charts to one dashboard?',
        'I ask what question each chart answers and who will use it. If a chart does not support a decision, I suggest leaving it out or moving it to a detail page. Too many charts make a dashboard slow and hard to read. I offer a clean main page with drill-through pages for the details.'
      ],
      [
        'What is a date table, and why do BI models need one?',
        'A date table has one row per day with columns such as year, quarter, month and week. I link it to the fact tables and mark it as the date table in the model. It makes time calculations, such as year to date or the same period last year, simple and correct. It also lets reports show days with no sales.'
      ]
    ],
    senior: [
      [
        'How do you set up self-service BI without losing control of the numbers?',
        'I publish certified datasets with trusted definitions, and people build their own reports on top of them. Workspaces have clear owners, and access is given by role. I train users on the basics and review the most used reports. This gives teams freedom while keeping one version of the key metrics.'
      ],
      [
        'How do you move BI reports safely from development to production?',
        'I keep separate development, test and production workspaces. I store report and model files in version control where the tool allows it, and users test changes before release. A deployment pipeline or a checklist makes sure connections and settings point to the right environment. I also tell users what changed.'
      ]
    ]
  },
  datasci: {
    label: 'Data Scientist',
    role: 'Data Scientist',
    color: '#6b21a8',
    icon: 'M3 3v18h18M7 15h.01M10 11h.01M13 13h.01M16 8h.01M19 6h.01M6 18L20 5',
    setupRole: 'Data Scientist',
    keywords: ['data science', 'statistics', 'predictive model', 'scikit-learn'],
    skills: [
      'Python',
      'Statistics',
      'Machine learning',
      'Pandas',
      'NumPy',
      'scikit-learn',
      'SQL',
      'Data visualization',
      'Feature engineering',
      'Model evaluation'
    ],
    mid: [
      [
        'How do you approach a new data science problem from start to finish?',
        'I start with the business question and how success will be measured. Then I explore and clean the data, build a simple baseline and try better models step by step. I evaluate on data the model has not seen and explain the results in business terms. Finally, I agree with the team how the model will be used and monitored.'
      ],
      [
        'What is feature engineering? Give an example.',
        'Feature engineering means creating input values that help a model learn the pattern. For example, from a purchase date I can make the day of the week, the month and the days since the last purchase. I also encode categories, scale numbers when the model needs it and combine columns into ratios. Good features often help more than a more complex algorithm.'
      ],
      [
        'What does a p-value tell you?',
        'A p-value is the probability of seeing a result at least as extreme as the one observed, if the null hypothesis is true. A small p-value, often below 0.05, suggests the result is unlikely to be due to chance alone. It does not show how large or important the effect is, and it is not the probability that the hypothesis is true. So I also report the effect size and a confidence interval.'
      ],
      [
        'How does k-fold cross-validation work?',
        'I split the data into k parts, for example five. The model trains on four parts and is tested on the fifth, and this repeats until every part has been the test part once. The average score is a more reliable estimate than a single split. For time series data I use time-based splits instead, so the model never trains on the future.'
      ],
      [
        'How do you handle an imbalanced dataset?',
        'First I choose metrics that fit, such as precision, recall or the area under the precision-recall curve, because accuracy can look high while the model misses the rare class. Then I can use class weights, resample the training data or adjust the decision threshold. I keep the test set with the real class balance, so the results stay honest.'
      ],
      [
        'What is the difference between linear regression and logistic regression?',
        'Linear regression predicts a number, such as a house price, by fitting a straight-line relationship between the inputs and the output. Logistic regression predicts the probability of a class, such as whether a customer will leave, and the logistic function keeps the output between 0 and 1. Both are fast and easy to explain, so I often use them as a baseline.'
      ],
      [
        'How do you explain how a model makes its predictions?',
        'For simple models I show the coefficients or the decision rules. For complex models I use feature importance and methods such as SHAP values, which show how much each feature pushed a single prediction up or down. I explain it in business terms and state the limits, because these methods show associations, not causes.'
      ]
    ],
    fresher: [
      'I first understand the business question and how success is measured. Then I clean the data, build a simple model and test it on new data before I share the results.',
      'Feature engineering means making useful inputs for the model. For example, from a date I can create the day of the week or the month.',
      'A p-value shows how likely a result this extreme would be if there were really no effect. A small value, often below 0.05, suggests the result is probably not just chance.'
    ],
    junior: [
      [
        'What is data leakage, and how do you avoid it?',
        'Data leakage happens when information that is not available at prediction time gets into training, so the model looks great in testing but fails in real use. An example is a field that is filled in only after a customer has already left. I split the data before any preprocessing, fit scalers and encoders on the training set only and check when each feature becomes known.'
      ],
      [
        'How do you choose between a simple model and a complex one?',
        'I start with a simple model as a baseline and move to a complex one only if it clearly improves the result on validation data. I also weigh training cost, speed, how easy it is to explain and how hard it is to maintain. If two models perform about the same, I choose the simpler one.'
      ]
    ],
    senior: [
      [
        'How do you measure the business impact of a model after it goes live?',
        'I agree on the business metric before launch, such as fewer customers leaving or lower fraud losses. Where possible, I compare a group that uses the model with a control group that does not. I also track model metrics and data drift over time. I report the results honestly, including where the model did not help.'
      ],
      [
        'How do you check a model for unfair bias?',
        'I compare model results across groups, such as gender or age, using error rates and approval rates per group. I check the training data for groups that are missing or under-represented and for features that act as a proxy for sensitive traits. If I find a gap, I fix the data, adjust the model or threshold and document the trade-off. I repeat the check after every retrain.'
      ]
    ]
  },
  dataeng: {
    label: 'Data Engineer',
    role: 'Data Engineer',
    color: '#92400e',
    icon: 'M3 5h6v5H3zM15 14h6v5h-6zM9 7.5h3v9h3',
    setupRole: 'Data Engineer',
    keywords: ['data engineering', 'data pipeline', 'airflow', 'kafka', 'spark'],
    skills: ['Python', 'SQL', 'ETL', 'Airflow', 'Spark', 'Data pipelines', 'Data warehouse', 'Kafka', 'Cloud storage', 'Data modeling'],
    mid: [
      [
        'What is a data pipeline, and what are its main parts?',
        'A data pipeline moves data from sources to a place where people can use it. The main parts are ingestion from sources such as databases, files or APIs, processing to clean and transform the data, and storage in a warehouse or lake. Around it there is scheduling, monitoring and alerting, so failures are caught early.'
      ],
      [
        'What is Apache Kafka used for?',
        'Kafka is a distributed event streaming platform. Producers write events, such as orders or clicks, to topics, and consumers read them at their own speed. Kafka keeps events for a set time, so several systems can read the same data and replay it if needed. Teams use it to connect systems and to feed real-time pipelines.'
      ],
      [
        'How do you write pipeline code in Python that is easy to maintain?',
        'I split the code into small functions with clear names, one for each step. I keep settings such as paths in configuration, and secrets in a secure store, never in the code. I add logging, type hints and unit tests for the transformations. The code lives in Git and goes through code review.'
      ],
      [
        'What is a DAG in Apache Airflow?',
        'A DAG, or directed acyclic graph, is how Airflow defines a workflow. Each task is a step, such as extracting a file or loading a table, and the arrows show which tasks must finish first. Acyclic means there are no loops, so the workflow always has a clear end. The DAG also sets the schedule, retries and alerts.'
      ],
      [
        'How do you add data quality checks to a pipeline?',
        'I check the data at each stage: row counts, required columns not NULL, unique keys, valid ranges and allowed values. I also compare totals with the source. Critical failures stop the pipeline and alert the team, while small warnings are logged for review. This stops bad data from reaching reports.'
      ],
      [
        'What is change data capture?',
        'Change data capture, or CDC, reads only the rows that were inserted, updated or deleted in a source database, often from its transaction log. The pipeline then applies just these changes to the target instead of copying the full table again. This reduces the load on the source and keeps the target close to real time.'
      ],
      [
        'What is schema evolution, and how do you handle it?',
        'Schema evolution means the structure of the source data changes over time, for example a new column is added or a type changes. I use table formats that can add columns safely and agree on a data contract with the source team. Schema checks catch breaking changes, such as a renamed or removed column, before they reach the target. I version the schema and tell the people who use the data.'
      ]
    ],
    fresher: [
      'A data pipeline moves data from sources like databases, files or APIs to a warehouse. On the way it cleans and changes the data, and it runs on a schedule with alerts.',
      'Kafka is a platform for streaming events. Producers write events to topics and consumers read them, so many systems can use the same data in real time.',
      'I write a small function for each step, keep settings out of the code and add logging and tests. Everything is stored in Git.'
    ],
    junior: [
      [
        'How do you debug a pipeline that failed overnight?',
        'I read the logs of the failed task to find the exact error and the input that caused it. I check the common causes: a changed source schema, missing files, bad data or a timeout. I fix the cause, rerun only the failed part and confirm the output row counts. Then I tell the data users if their reports were affected and add a check so it does not happen again.'
      ],
      [
        'How do you make a slow Spark job faster?',
        'I look at the job in the Spark UI to find slow stages and data skew, where one task gets much more data than the others. I filter rows and select columns early, avoid unnecessary shuffles and use a broadcast join when one table is small. I also check the number of partitions and cache data only when it is reused. Then I measure again.'
      ]
    ],
    senior: [
      [
        'How do you handle sensitive personal data in pipelines?',
        'I collect only the fields we really need and classify sensitive columns, such as phone numbers or national ID numbers. I mask, hash or remove them as early as possible in the pipeline, and encrypt data in transit and at rest. Access is given by role and logged. I also follow the retention rules and privacy laws that apply.'
      ],
      [
        'How do you plan a data platform that can grow with the business?',
        'I start from the main use cases, data volumes and how fresh the data must be, then choose simple, proven tools. Pipelines are built from shared templates with testing, monitoring and documentation included. I avoid custom solutions where a standard one works. I review costs and performance regularly and change the design when the needs change.'
      ]
    ]
  },
  aiml: {
    label: 'AI and Machine Learning',
    role: 'AI Engineer',
    color: '#a21caf',
    icon: 'M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4',
    setupRole: 'AI/ML',
    keywords: ['artificial intelligence', 'ai engineer', 'deep learning', 'neural network'],
    skills: ['Python', 'Machine learning', 'Deep learning', 'TensorFlow', 'PyTorch', 'Statistics', 'Data preprocessing', 'Model evaluation', 'Git', 'Math'],
    mid: [
      [
        'What is the difference between AI, machine learning and deep learning?',
        'Artificial intelligence is the broad goal of making computers do tasks that normally need human thinking. Machine learning is a part of AI where systems learn patterns from data instead of following fixed rules. Deep learning is a part of machine learning that uses neural networks with many layers, and it works well for images, speech and text. It usually needs more data and computing power.'
      ],
      [
        'How does a neural network learn?',
        'A neural network has layers of connected units with weights. During training it makes a prediction, a loss function measures the error, and backpropagation calculates how much each weight added to that error. An optimizer, such as gradient descent, then adjusts the weights a little. This repeats over many examples until the error on validation data stops improving.'
      ],
      [
        'Why do we split data into training, validation and test sets?',
        'The training set is used to learn the weights of the model. The validation set is used to tune settings and to choose between models. The test set is kept aside until the end to give an honest estimate of performance on new data. If I use the test set for decisions, its score becomes too optimistic.'
      ],
      [
        'What is transfer learning?',
        'Transfer learning means starting from a model that was already trained on a large dataset and adapting it to a new task. For example, an image model trained on millions of photos can be fine-tuned to recognise plant diseases from a few thousand leaf photos. It saves time, data and computing cost. I still check that the original training data fits my use case.'
      ],
      [
        'What limits of AI systems should you explain to a business?',
        'AI learns from past data, so it can repeat the errors and bias in that data. It can be confidently wrong and often cannot explain its own decisions well. Its performance can drop when real-world data changes. So I set clear expectations, keep a human check for important decisions and measure the results regularly.'
      ],
      [
        'What is an activation function, and why is it needed?',
        'An activation function is applied to the output of each unit in a neural network. It adds non-linearity, so the network can learn complex patterns; without it, many layers would act like one linear model. Common choices are ReLU in hidden layers, sigmoid for a yes or no output and softmax for choosing one class out of many.'
      ],
      [
        'Which math do you use most in machine learning?',
        'Linear algebra, because data and model weights are stored as vectors and matrices. Calculus, mainly derivatives, because training uses gradients to reduce the error. Probability and statistics, to understand uncertainty and to evaluate results. Libraries do the calculations, but understanding the math helps me debug models.'
      ]
    ],
    fresher: [
      'AI is the broad idea of computers doing smart tasks. Machine learning is AI that learns from data, and deep learning is machine learning with neural networks of many layers.',
      'The network makes a prediction and measures its error. Then it adjusts its weights a little to reduce the error, and repeats this many times.',
      'The training set teaches the model, the validation set helps me choose settings and the test set gives an honest final score on new data.'
    ],
    junior: [
      [
        'How do you start a small machine learning project in Python?',
        'I set up a clean project with a virtual environment and Git. I load and explore the data with Pandas, then build a baseline with scikit-learn or a small neural network in PyTorch or TensorFlow. I record the data version, settings and results of each experiment. I write down what worked and what did not, so the work can be repeated.'
      ],
      [
        'How do you choose a learning rate when training a neural network?',
        'The learning rate controls how big each weight update is. If it is too high, the loss jumps around or grows; if it is too low, training is very slow. I start with a common default for the optimizer, watch the training and validation loss curves and try a few values. A schedule that lowers the rate over time often helps.'
      ]
    ],
    senior: [
      [
        'How do you decide whether an AI feature is ready to launch?',
        'I check that it meets the agreed quality metric on a realistic test set, including hard and rare cases. I review risks such as bias, privacy, security and what happens when the model is wrong. There must be monitoring, a fallback and a clear way for users to report problems. I prefer a limited rollout first, then a wider launch based on the results.'
      ],
      [
        'How do you build a team process for responsible AI?',
        'I set simple rules that everyone follows: document the data sources, the intended use and the known limits of each model. Every project gets a review for privacy, fairness and safety before launch, with people from outside the team. Each model has a clear owner and is monitored after launch. The rules stay practical, so teams actually use them.'
      ]
    ]
  },
  mleng: {
    label: 'Machine Learning Engineer',
    role: 'Machine Learning Engineer',
    color: '#7e22ce',
    icon: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1',
    setupRole: 'Machine Learning Engineer',
    keywords: ['ml engineer', 'mlops', 'model deployment', 'model serving'],
    skills: ['Python', 'scikit-learn', 'PyTorch', 'TensorFlow', 'Model deployment', 'MLOps', 'Feature engineering', 'Docker', 'APIs', 'Model monitoring'],
    mid: [
      [
        'What is MLOps?',
        'MLOps applies DevOps practices to machine learning. It covers versioning of data, code and models, automated training and testing pipelines, deployment and monitoring in production. The goal is to release and update models reliably instead of by hand. It also shows which data and code produced each model.'
      ],
      [
        'What is the difference between batch and real-time model serving?',
        'In batch serving, the model scores many records on a schedule, for example every night, and saves the predictions for later use. In real-time serving, the model runs behind an API and answers each request within milliseconds. Batch is simpler and cheaper; real-time is needed when the prediction depends on fresh input, such as a fraud check during a payment.'
      ],
      [
        'How do you package a model for deployment?',
        'I save the trained model together with its preprocessing steps, so the same transformations run in production. I put it behind a small API, pin the exact library versions and build a Docker image. I add a health check and tests that compare predictions with known examples. The image is versioned, so I can roll back quickly.'
      ],
      [
        'What is data drift, and how do you detect it?',
        'Data drift means the input data in production changes compared with the training data, for example customers start using a new payment method. Concept drift means the link between the inputs and the outcome changes. I compare feature distributions over time and track model metrics when the true labels arrive. Alerts tell me when to investigate or retrain.'
      ],
      [
        'What is a feature store?',
        'A feature store is a central place to define, store and share features for machine learning. It serves the same feature values for training and for live predictions, which avoids training-serving skew. Teams can reuse features instead of rebuilding them, and it records how each feature was made.'
      ],
      [
        'How do you track experiments and model versions?',
        'I log every training run with its code version, data version, parameters and metrics in an experiment tracking tool. The best models go into a model registry with a version number and a stage, such as staging or production. This makes results repeatable and shows exactly which model is live.'
      ],
      [
        'How do you test machine learning code?',
        'I write unit tests for the data processing and feature code, like for any other software. I add data validation tests for the schema and value ranges. For the model, I check that it beats a baseline, gives stable results on fixed examples and handles bad input safely. These tests run in the CI pipeline before any model is deployed.'
      ]
    ],
    fresher: [
      'MLOps uses DevOps ideas for machine learning. It means versioning data and models, automating training and deployment and monitoring models in production.',
      'Batch serving makes many predictions on a schedule, like every night. Real-time serving answers each request through an API within a very short time.',
      'I save the model with its preprocessing steps, put it behind a small API and build a Docker image with fixed library versions.'
    ],
    junior: [
      [
        'How do you roll out a new model version safely?',
        'I first run it in shadow mode, where it gets real traffic but its predictions are only logged and compared with the current model. Then I send a small share of traffic to it and watch the metrics. If it performs well, I increase the traffic step by step. I keep the old version ready for a quick rollback.'
      ],
      [
        'How do you reduce the latency of a model API?',
        'I first measure where the time goes: preprocessing, the model itself or the network. Then I can use a smaller or optimized model, batch requests, cache frequent results and keep the model loaded in memory. Hardware such as GPUs helps for large models. I set a latency target and test it under realistic load.'
      ]
    ],
    senior: [
      [
        'How do you design a pipeline that retrains models automatically?',
        'Retraining starts on a schedule or when monitoring shows drift or lower accuracy. The pipeline validates the new data, trains the model and compares it with the current model on the same test set, including fairness checks. Only a model that passes is registered, and a person approves important releases. Every step is logged, so any model can be traced back to its data.'
      ],
      [
        'How do you control the cost of running machine learning in production?',
        'I right-size the hardware and use autoscaling, so we do not pay for idle machines. I choose batch predictions when real-time is not needed, and smaller models when the accuracy difference is small. I track the cost per prediction and per training run, and review the biggest costs with the team every month.'
      ]
    ]
  },
  genai: {
    label: 'Generative AI Engineer',
    role: 'Generative AI Engineer',
    color: '#be185d',
    icon: 'M4 5h11v9H8l-4 3zM18 3l.8 1.7 1.7.8-1.7.8L18 8l-.8-1.7-1.7-.8 1.7-.8zM19 11l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z',
    setupRole: 'Generative AI',
    keywords: ['llm', 'large language model', 'rag', 'prompt engineering', 'chatbot', 'gen ai'],
    skills: ['LLMs', 'Prompt engineering', 'RAG', 'Vector databases', 'Python', 'APIs', 'Fine-tuning', 'Evaluation', 'Responsible AI'],
    mid: [
      [
        'What is a large language model, and how does it generate text?',
        'A large language model is a neural network trained on a very large amount of text to predict the next token, which is a word or part of a word. When it generates text, it predicts one token at a time, based on the prompt and what it has written so far. This makes it good at language tasks, but it does not check facts by itself, so it can write text that sounds right but is wrong.'
      ],
      [
        'What is hallucination in generative AI, and how do you reduce it?',
        'Hallucination is when a model gives an answer that sounds confident but is false or made up. I reduce it by giving the model trusted source material, asking it to answer only from that material and to say when it does not know. I ask it to cite its sources, lower the randomness for factual tasks and test with real questions. For important uses, a person still checks the output.'
      ],
      [
        'What is retrieval-augmented generation, or RAG?',
        'RAG means the system first searches a knowledge source, such as company documents, for the passages most relevant to the question. Those passages are added to the prompt, and the model writes its answer based on them. This keeps answers current and grounded in our own data without retraining the model. The quality depends a lot on how well the search step finds the right passages.'
      ],
      [
        'What makes a good prompt?',
        'A good prompt gives clear instructions, the context the model needs and the format I want back. Examples of good answers help a lot. I break complex tasks into smaller steps and say what to do when information is missing. I test prompts on a set of real cases and keep them in version control, like code.'
      ],
      [
        'What is a vector database, and why is it used with LLMs?',
        'A vector database stores embeddings, which are lists of numbers that capture the meaning of text or images. It can quickly find the stored items closest in meaning to a query, even when the exact words differ. In a RAG system it holds the document chunks, so the most relevant ones can be added to the prompt.'
      ],
      [
        'When would you fine-tune a model instead of using prompting or RAG?',
        'I start with prompting, and add RAG when the model needs our own or changing information. I consider fine-tuning when I need a consistent style or format, or a narrow task done better or by a smaller, cheaper model, and I have enough good examples. Fine-tuning is not a good way to add facts that change often. I compare the options on the same evaluation set before deciding.'
      ],
      [
        'How do you evaluate a generative AI application?',
        'I build a test set of real questions with expected answers or clear grading rules. I measure correctness, faithfulness to the sources, safety and format, with automatic checks and human review. A model can help grade answers, but people spot-check its grades. I run the evaluation after every change to prompts, data or models, and I collect user feedback in production.'
      ]
    ],
    fresher: [
      'A large language model is trained on a lot of text to predict the next word or part of a word. It writes one piece at a time, so it can sound right even when it is wrong.',
      'Hallucination means the model makes up an answer that sounds true. I reduce it by giving trusted sources, asking it to use only those and checking important answers.',
      'RAG first searches documents for the most relevant parts, then gives them to the model with the question. The answer is then based on our own, current data.'
    ],
    junior: [
      [
        'How do you split documents into chunks for a RAG system?',
        'I split documents into chunks that are small enough to be specific but large enough to keep their meaning, often by headings or paragraphs. I add a small overlap between chunks, so sentences at the edges are not lost. I store metadata such as the title and date with each chunk. Then I test retrieval with real questions and adjust the chunk size.'
      ],
      [
        'What is prompt injection, and how do you protect against it?',
        'Prompt injection is when text from a user or a document tries to override the instructions of the system, for example to reveal private data. I treat all outside text as untrusted data, give the model access only to the tools and data the task needs and check outputs before acting on them. Sensitive actions need a confirmation step. I also test the system with known attack examples.'
      ]
    ],
    senior: [
      [
        'How do you apply responsible AI practices to a generative AI product?',
        'I define what the product should and should not do, and test it for harmful, biased or private content before launch. I add input and output filters, a clear label that content is AI-generated and an easy way to report problems. Personal data is protected and not used for training without permission. We review incidents and update the safeguards regularly.'
      ],
      [
        'How do you control the cost and speed of an LLM application?',
        'I first measure tokens, latency and cost per request. I keep prompts short, send only the most relevant context and cache repeated answers. Simple tasks go to a smaller, cheaper model, and a larger model is used only when needed. I set usage limits and track the cost on a dashboard.'
      ]
    ]
  },
  cv: {
    label: 'Computer Vision Engineer',
    role: 'Computer Vision Engineer',
    color: '#115e59',
    icon: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    setupRole: 'Computer Vision',
    keywords: ['computer vision', 'opencv', 'image processing', 'object detection', 'image recognition'],
    skills: ['Python', 'OpenCV', 'PyTorch', 'CNN', 'Image processing', 'Object detection', 'Segmentation', 'Data augmentation', 'Annotation'],
    mid: [
      [
        'What is a convolutional neural network?',
        'A convolutional neural network, or CNN, is a neural network designed for images. Convolution layers slide small filters over the image to detect patterns such as edges, then shapes and then whole objects in deeper layers. Pooling layers reduce the size, and the final layers make the prediction. Because the filters are shared across the image, a CNN needs far fewer weights than a fully connected network.'
      ],
      [
        'What is the difference between image classification, object detection and segmentation?',
        'Image classification gives one label for the whole image, such as cat. Object detection finds each object and draws a box around it with a label. Segmentation labels every pixel, so it shows the exact shape of each object or region. The right choice depends on how much detail the task needs.'
      ],
      [
        'How do you use OpenCV in a project?',
        'I use OpenCV to read images and video, resize them, change colour spaces, blur them and detect edges. It is also useful for drawing boxes and labels on the results. OpenCV loads colour images in BGR order by default, so I convert them to RGB before passing them to most deep learning models.'
      ],
      [
        'What is data augmentation, and why is it used?',
        'Data augmentation creates new training images by changing existing ones, for example by flipping, rotating, cropping or changing the brightness. It helps the model handle real-world variation and reduces overfitting when data is limited. I only use changes that make sense for the task; flipping images of text, for example, creates wrong examples. For detection, the boxes must change together with the image.'
      ],
      [
        'How do you measure the accuracy of an object detection model?',
        'I use intersection over union, or IoU, to measure how much a predicted box overlaps the true box. A prediction counts as correct if the IoU is above a threshold, such as 0.5. From that I calculate precision, recall and the mean average precision, or mAP, across classes. I also look at the results per class and per condition, such as low light.'
      ],
      [
        'How do you plan image annotation for a new project?',
        'I write clear labelling rules with examples of hard cases, such as objects that are partly hidden. I run a small pilot, check how well the annotators agree and update the rules. Then I review a sample of every batch for quality. Good, consistent labels matter more than a large number of messy ones.'
      ],
      [
        'What challenges do computer vision models face in the real world?',
        'Real images vary in lighting, angle, blur, background and camera quality, and the training data may not cover all of this. Objects can be small, partly hidden or rare. Models can also be biased if some groups or conditions are missing from the data. I test on images from the real environment and collect new examples where the model fails.'
      ]
    ],
    fresher: [
      'A CNN is a neural network for images. Its filters find simple patterns like edges first, then shapes and whole objects in deeper layers.',
      'Classification gives one label for the whole image. Detection draws a box around each object, and segmentation labels every pixel.',
      'I use OpenCV to read, resize and filter images and video, and to draw the results. It loads colours in BGR order, so I convert them to RGB when needed.'
    ],
    junior: [
      [
        'How would you build a model to detect defects in product photos?',
        'I collect photos from the real production line, with many defect types and good products, and label them with clear rules. I start from a pretrained model and fine-tune it, because defect images are usually limited. Since defects are rare, I focus on recall and use augmentation for the defect class. I test it on the line with a person checking the results before full use.'
      ],
      [
        'How do you run a vision model on a mobile or edge device?',
        'I choose a small, efficient model and reduce its size with quantization, which stores the weights with fewer bits. I convert it to a format the device supports and measure speed, memory and battery use on the real device. I check that the accuracy is still acceptable after these changes. Running on the device also keeps images private and works offline.'
      ]
    ],
    senior: [
      [
        'How do you handle privacy when a vision system uses images of people?',
        'I collect only the images the use case needs, with proper consent or a clear legal basis. I blur faces or number plates when identity is not needed and process data on the device where possible. Images are stored encrypted, with limited access and a set retention time. Face recognition needs extra care, so I check the law and the bias risks before using it.'
      ],
      [
        'How do you improve a vision model that performs poorly on some images?',
        'I group the errors by condition, such as lighting, camera, object size or class, to find patterns. Then I collect and label more examples of the weak cases, fix label mistakes and add targeted augmentation. I retrain and compare on a fixed test set that includes those hard cases. I track results per group, not only the overall score.'
      ]
    ]
  },
  nlp: {
    label: 'NLP Engineer',
    role: 'NLP Engineer',
    color: '#9d174d',
    icon: 'M4 4h16v11H9l-5 4zM8 8h8M8 11h5',
    setupRole: 'NLP',
    keywords: ['natural language processing', 'text analytics', 'transformers', 'spacy', 'sentiment'],
    skills: [
      'Python',
      'spaCy',
      'Transformers',
      'Tokenization',
      'Text classification',
      'Embeddings',
      'Sentiment analysis',
      'Named entity recognition',
      'Evaluation'
    ],
    mid: [
      [
        'What is tokenization in NLP?',
        'Tokenization splits text into smaller units called tokens, such as words, parts of words or characters. Modern models often use subword tokenization, so a rare word is split into a few known pieces instead of being unknown. The model works with the IDs of these tokens, not with the raw text. The tokenizer affects model size, speed and how well new words are handled.'
      ],
      [
        'What are word embeddings?',
        'Word embeddings represent words as lists of numbers, so words with similar meanings get similar vectors. For example, doctor and nurse end up closer to each other than doctor and table. Older methods gave each word one fixed vector, while transformer models create contextual embeddings, so bank by a river and bank for money get different vectors.'
      ],
      [
        'What is a transformer model?',
        'A transformer is a neural network design built around attention. Attention lets each token look at all the other tokens in the text and decide which ones matter most for its meaning. Unlike older recurrent networks, a transformer processes the tokens in parallel, so it trains faster on large data. Most modern language models are based on transformers.'
      ],
      [
        'How do you build a text classification model?',
        'I collect labelled examples for each class, such as complaint, question or praise. I start with a simple baseline, such as TF-IDF features with logistic regression. If I need better accuracy, I fine-tune a pretrained transformer. I evaluate with precision, recall and F1 for each class and study the wrong predictions.'
      ],
      [
        'What is named entity recognition?',
        'Named entity recognition, or NER, finds names in text and labels their type, such as person, organisation, location, date or amount. For example, it can pull the company name and the total out of an invoice. Libraries like spaCy have ready models, and I fine-tune them on my own labelled data when the field uses special terms.'
      ],
      [
        'How does sentiment analysis work, and what are its limits?',
        'Sentiment analysis classifies text as positive, negative or neutral, with a trained model or a word list. It is useful for reading many reviews or support messages. However, it struggles with sarcasm, mixed opinions, slang and field-specific words, such as sick meaning good. So I test it on real data from our field and report its error rate.'
      ],
      [
        'How do you handle text that mixes languages, such as English and Roman Urdu?',
        'First I detect the languages and check how much of the text is mixed. Many standard models are trained mostly on English, so they may do poorly on Roman Urdu with its many spellings. I collect and label real examples, normalise common spelling variants and test multilingual models. I measure accuracy separately for each language group.'
      ]
    ],
    fresher: [
      'Tokenization splits text into small pieces called tokens, such as words or parts of words. The model works with these tokens instead of raw text.',
      'Embeddings turn words into lists of numbers. Words with similar meanings get similar numbers, so the model can work with meaning.',
      'A transformer uses attention, so each word can look at the other words to understand its meaning. Most modern language models are built on it.'
    ],
    junior: [
      [
        'Which text preprocessing steps do you use, and when do you skip them?',
        'For classic models I may lowercase the text and remove extra spaces, links and repeated symbols. For transformer models I keep most of the text as it is, because their tokenizer and context handle case and small words. I never remove words like not, which change the meaning. I check a sample of the text after each step.'
      ],
      [
        'How do you work with a small labelled text dataset?',
        'I start from a pretrained model, because it already understands language and needs fewer labelled examples. I label more data where the model is unsure, which gives the most value per label. I can also add careful paraphrases and check that their labels stay correct. Clear labelling rules keep the small dataset consistent.'
      ]
    ],
    senior: [
      [
        'How would you design a system that routes customer messages automatically?',
        'I define the categories with the support team and label a set of real messages. I train a classifier, and messages with low confidence go to a person instead of being routed automatically. Urgent cases, such as a fraud complaint, get extra rules. I monitor accuracy every week and retrain as new topics appear.'
      ],
      [
        'How do you handle new words, product names and slang in an NLP system?',
        'I watch for phrases the system has not seen before and for drops in model confidence. I add new examples to the training data regularly and update entity lists for new product names. Subword tokenizers help, but the model still needs labelled examples to learn the meaning. I review errors with the business team to find new terms early.'
      ]
    ]
  },
  dbgen: {
    label: 'Database',
    role: 'Database Engineer',
    color: '#4338ca',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
    setupRole: 'Database Engineer',
    keywords: ['database engineer', 'dbms', 'er diagram', 'normal form', 'relational database'],
    skills: [
      'SQL',
      'Normalization',
      'Indexing',
      'Transactions',
      'Joins',
      'Backup and recovery',
      'Query optimization',
      'Data modeling',
      'ER diagrams',
      'Constraints'
    ],
    mid: [
      [
        'What is a database management system, and why use one instead of files?',
        'A database management system, or DBMS, is software that stores, organises and protects data and lets many users work with it at the same time. Compared with plain files, it prevents duplicate and inconsistent data, controls who can see what and supports backup and recovery. It also lets us query the data quickly with a language such as SQL.'
      ],
      [
        'What are candidate, composite and surrogate keys?',
        'A candidate key is any column, or set of columns, that can uniquely identify a row; one of them is chosen as the primary key, which can never be NULL. A composite key uses two or more columns together, such as student ID and course ID in an enrolment table. A surrogate key is an artificial value, such as an auto-generated number, with no business meaning. I often use a surrogate key as the primary key and keep a unique constraint on the natural key.'
      ],
      [
        'What is the difference between the first, second and third normal forms?',
        'First normal form means each column holds a single value and there are no repeating groups. Second normal form also requires every non-key column to depend on the whole primary key, not on part of a composite key. Third normal form also removes columns that depend on other non-key columns, such as a city name that depends on a postcode in the same table.'
      ],
      [
        'What are database constraints, and why are they important?',
        'Constraints are rules the database enforces on the data. NOT NULL makes a value required, UNIQUE stops duplicates, CHECK limits values to a valid range, and PRIMARY KEY and FOREIGN KEY keep rows identifiable and correctly linked. NULL means a value is unknown, so it is not equal to anything, not even another NULL. Constraints protect data quality even when application code has a bug, because the database itself rejects bad data.'
      ],
      [
        'What is the difference between a clustered and a non-clustered index?',
        'A clustered index decides the order in which the table rows are stored, so a table can have only one. A non-clustered index is a separate structure that holds the indexed columns and a pointer to the full row, and a table can have many. I usually put the clustered index on a narrow, increasing key, such as an ID. The details differ between database systems.'
      ],
      [
        'What is an ER diagram?',
        'An entity-relationship diagram shows the main things a system stores, such as customers, orders and products, with their attributes and how they relate. It shows whether a relationship is one to one, one to many or many to many. I use it to agree on the design with the team before creating tables. It also documents the database for new team members.'
      ],
      [
        'How do you store a many-to-many relationship in a relational database?',
        'I create a third table, often called a junction table, that holds the primary keys of both tables as foreign keys. For example, a student can join many courses and a course has many students, so an enrolments table stores pairs of student ID and course ID. The two columns together form the primary key. Extra details, such as the enrolment date, can go in that table too.'
      ]
    ],
    fresher: [
      'A DBMS is software that stores and manages data safely. Unlike plain files, it stops duplicate data, controls access, supports backups and lets many people use the data at once.',
      'A candidate key can uniquely identify a row. A composite key uses two or more columns together, and a surrogate key is an auto-generated number with no business meaning.',
      'First normal form means one value per column. Second normal form removes data that depends on only part of the key, and third normal form removes data that depends on other non-key columns.'
    ],
    junior: [
      [
        'What is a deadlock, and how can it be avoided?',
        'A deadlock happens when two transactions each hold a lock that the other one needs, so neither can continue. The database detects it and cancels one of them, which must then retry. I reduce deadlocks by keeping transactions short, accessing tables in the same order everywhere and using good indexes so fewer rows are locked. The application should also retry safely after a deadlock error.'
      ],
      [
        'What is the difference between full, differential and incremental backups?',
        'A full backup copies the whole database. A differential backup copies everything that changed since the last full backup, and an incremental backup copies only what changed since the last backup of any type. Incremental backups are the smallest, but a restore needs the full backup plus every incremental in order. A differential restore needs only the full backup and the latest differential.'
      ]
    ],
    senior: [
      [
        'When would you denormalize a database design?',
        'I denormalize only when a measured performance problem cannot be solved with indexes or better queries, usually for read-heavy reporting. For example, I may store an order total on the order row instead of adding up the items every time. The cost is extra storage and the risk of copies getting out of sync, so I keep them updated through clear logic and check them regularly.'
      ],
      [
        'What are transaction isolation levels?',
        'Isolation levels control how much one transaction can see of other transactions that are still running. The standard levels, from least to most strict, are read uncommitted, read committed, repeatable read and serializable. Stricter levels prevent problems such as dirty reads and phantom rows, but they can reduce concurrency. Many databases use read committed as the default.'
      ]
    ]
  },
  dba: {
    label: 'Database Administrator',
    role: 'Database Administrator',
    color: '#3730a3',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 6 3M20 6v4M17 12l4 1.5V16c0 2.2-1.8 3.5-4 4.5-2.2-1-4-2.3-4-4.5v-2.5z',
    setupRole: 'Database Administrator',
    keywords: ['dba', 'database administration', 'replication', 'high availability', 'performance tuning'],
    skills: [
      'Backup and recovery',
      'Performance tuning',
      'Replication',
      'High availability',
      'Security',
      'Monitoring',
      'Indexing',
      'Patching',
      'User management',
      'SQL'
    ],
    mid: [
      [
        'What are the main daily tasks of a database administrator?',
        'I check that backups completed and that the databases are healthy and available. I monitor performance, storage growth, errors and failed jobs, and respond to alerts. I manage user access, apply patches in planned windows and help developers with slow queries. I also keep documentation and runbooks up to date.'
      ],
      [
        'How do you plan backup and recovery using RPO and RTO?',
        'The recovery point objective, or RPO, is how much data the business can afford to lose, and the recovery time objective, or RTO, is how quickly the database must be back. I agree on both with the business, then choose backup types and frequency to meet them, for example frequent log backups for a small RPO. I keep copies off site and test restores regularly to prove we can meet the RTO.'
      ],
      [
        'What is database replication?',
        'Replication copies data from one database server, the primary, to one or more replicas. It can be synchronous, where a change is confirmed only after a replica has it, or asynchronous, which is faster but can lose the last few changes in a failure. Replicas are used for availability, for read-only reporting and for disaster recovery in another location. I monitor the replication lag closely.'
      ],
      [
        'How do you find and fix a performance problem on a database server?',
        'I check the server first: CPU, memory, disk and wait statistics, to see what the database is waiting on. Then I find the top queries by time and resources and check their plans for missing indexes or full scans. Other common causes are blocking, outdated statistics and wrong memory settings. I change one thing at a time and measure the effect.'
      ],
      [
        'How do you manage database users and permissions securely?',
        'I follow least privilege: users and applications get only the permissions their work needs, given through roles. Each application has its own account, not a shared admin account, and passwords are kept in a secrets manager. I remove access quickly when people leave and review permissions regularly. Admin activity and failed logins are logged and monitored.'
      ],
      [
        'How do you apply patches and upgrades to a production database?',
        'I read the release notes and test the patch on a non-production copy first. I take a full backup and agree on a maintenance window and a rollback plan. With a standby server, I patch the standby first, fail over and then patch the old primary, which keeps downtime short. Afterwards I check the logs, jobs and application connections.'
      ],
      [
        'What is the difference between high availability and disaster recovery?',
        'High availability keeps the database running through local failures, such as a server crash, usually with automatic failover to a standby nearby. Disaster recovery restores service after a bigger event, such as losing a whole data centre, using copies in another location. High availability aims for seconds or minutes of downtime, while a disaster recovery plan can accept a longer recovery. A good setup needs both.'
      ]
    ],
    fresher: [
      'A DBA keeps databases safe, fast and available. I check backups, monitor performance and storage, manage user access and apply updates.',
      'RPO is how much data we can afford to lose, and RTO is how fast the database must be back. I choose the backup schedule to meet both and test restores.',
      'Replication copies data from the main database server to other servers. The copies help if the main server fails and can also be used for reports.'
    ],
    junior: [
      [
        'A database is running out of disk space. What do you do?',
        "I first check what is using the space: data files, log files, backups or temporary files. A common cause is a transaction log that cannot be cleared because log backups are failing or a long transaction is still open, so I fix that cause. I add space if needed, and archive old data only with the owner's approval and a backup. Then I set alerts at a safe level so it does not become urgent again."
      ],
      [
        'How do you restore a database to a point in time?',
        'I restore the last full backup without bringing the database online, then the latest differential if there is one, then the log backups in order up to the needed time. I restore to a separate server or under a new name first, so the current database is not overwritten. I check the data with the owner before switching over. This only works if log backups are taken regularly.'
      ]
    ],
    senior: [
      [
        'How do you plan the capacity of a database server?',
        'I collect trends for data growth, CPU, memory, storage speed and connections over several months. I combine them with business plans, such as a new product launch, to estimate the next one to two years. I add a safety margin and plan upgrades or scaling before the limits are reached. I review the forecast every quarter.'
      ],
      [
        'How do you migrate a large database to a new server with little downtime?',
        'I set up the new server, restore a full backup there and keep it in sync with replication or log shipping. I test the application against the new server and rehearse the switch. At cut-over I stop writes briefly, let the last changes sync, point the application to the new server and check it. The old server stays available for a quick rollback.'
      ]
    ]
  },
  etl: {
    label: 'Data Warehouse / ETL',
    role: 'ETL Developer',
    color: '#1e40af',
    icon: 'M3 7h7M7 4l3 3-3 3M3 17h7M7 14l3 3-3 3M14 4h7v16h-7zM14 9.5h7M14 14.5h7',
    setupRole: 'ETL Developer',
    keywords: ['etl', 'data warehouse', 'dbt', 'star schema', 'data integration'],
    skills: ['ETL', 'SQL', 'Data warehouse', 'Star schema', 'dbt', 'Airflow', 'Data quality', 'Incremental load', 'Scheduling'],
    mid: [
      [
        'What is the difference between OLTP and OLAP systems?',
        'OLTP systems run daily operations, such as taking orders, with many small, fast reads and writes on current data. OLAP systems are built for analysis, with large queries that summarise a lot of historical data. Data is usually copied from the OLTP sources into an OLAP data warehouse, so heavy reports do not slow down the business systems.'
      ],
      [
        'What is a slowly changing dimension?',
        'A slowly changing dimension holds attributes that change from time to time, such as the city of a customer. In Type 1, I overwrite the old value, so the history is lost. In Type 2, I add a new row with start and end dates and a current flag, so reports can show the value that was true at each point in time. I choose the type per column, based on whether the business needs the history.'
      ],
      [
        'What is a staging area in a data warehouse?',
        'A staging area is where raw data from the sources lands first, before it is cleaned and loaded into the warehouse tables. It lets me check and transform the data without touching the source systems or the final tables. If a load fails, I can rerun it from staging. Staging data is cleared or archived based on agreed retention rules.'
      ],
      [
        'What is the grain of a fact table?',
        'The grain is what one row in the fact table represents, for example one product line on one sales receipt. I decide the grain before anything else, because it sets which dimensions and measures fit. Mixing grains in one table leads to double counting. When in doubt, I choose the most detailed grain the source supports, since it can always be summarised later.'
      ],
      [
        'What is the difference between a full load and an incremental load?',
        'A full load copies all the data from the source every time, which is simple but slow for big tables. An incremental load copies only new or changed rows since the last run, often by using a last-updated date or an increasing ID. Incremental loads are faster but need care with updates, deletes and late records. I often run a full load the first time and incremental loads after that.'
      ],
      [
        'How do you use dbt in a data warehouse?',
        'dbt lets me write transformations as SQL select statements, called models, that build tables and views inside the warehouse. It works out the order between models, and I add tests such as not null, unique and relationships between tables. It also creates documentation and lineage. All the code lives in Git, so every change goes through review.'
      ],
      [
        'How do you handle records that fail validation during a load?',
        'I do not let one bad record stop the whole load unless it is critical. Rows that fail checks, such as a missing customer code or an invalid date, go to an error table with the reason. I report them to the source owner and load them once they are fixed. I track the error count over time, and a sudden rise triggers an alert.'
      ]
    ],
    fresher: [
      'OLTP systems handle daily work like orders with many small, fast changes. OLAP systems are for analysis and summarise large amounts of historical data.',
      'A slowly changing dimension stores data that changes sometimes, like the city of a customer. Type 1 overwrites the old value, and Type 2 adds a new row to keep the history.',
      'A staging area is where raw source data lands first. I check and clean it there before loading it into the warehouse tables.'
    ],
    junior: [
      [
        'How do you test an ETL job before it goes to production?',
        'I compare row counts and totals between the source and the target. I test edge cases such as NULL values, duplicates, late records and special characters. I check that running the job twice gives the same result. Business users review a sample of the output before release.'
      ],
      [
        'How do you load a fact table so it links to the right dimension rows?',
        'I load the dimensions first, so every key exists. When I load the facts, I look up each business key, such as a customer code, in the dimension and store its surrogate key. For Type 2 dimensions, I pick the row that was valid on the transaction date. If the business key is NULL or has no match, I link the fact to an unknown member row and report it, instead of dropping the fact.'
      ]
    ],
    senior: [
      [
        'How do you design the layers of a data warehouse?',
        'I usually use three layers. The raw layer keeps the source data unchanged, the cleaned layer standardises and joins it, and the presentation layer holds business-ready facts and dimensions for reports. Each layer has clear rules, owners and tests. This makes problems easier to trace and lets me rebuild later layers without going back to the sources.'
      ],
      [
        'How do you make a nightly load finish within its time window as data grows?',
        'I measure each step to find the slowest ones. I switch large tables to incremental loads, run independent jobs in parallel and push heavy transformations into the warehouse engine. I review indexes or partitions on the target tables. If the window is still too short, I agree with the business which data must be ready first.'
      ]
    ]
  },
  nosql: {
    label: 'NoSQL / MongoDB',
    role: 'NoSQL Developer',
    color: '#166534',
    icon: 'M9 4c-2 0-2.5 1.5-2.5 3.5S6 11 4 12c2 1 2.5 2.5 2.5 4.5S7 20 9 20M15 4c2 0 2.5 1.5 2.5 3.5S18 11 20 12c-2 1-2.5 2.5-2.5 4.5S17 20 15 20M12 9v6',
    setupRole: 'NoSQL Developer',
    keywords: ['nosql', 'mongodb', 'mongo', 'redis', 'document database'],
    skills: ['MongoDB', 'Document model', 'Indexing', 'Aggregation', 'Replication', 'Sharding', 'Redis', 'Schema design'],
    mid: [
      [
        'What are the main types of NoSQL databases?',
        'Document databases, such as MongoDB, store JSON-like documents. Key-value stores, such as Redis, store a value under a unique key and are very fast. Wide-column stores handle huge tables spread over many servers, and graph databases store nodes and the relationships between them. I choose the type based on how the application reads and writes its data.'
      ],
      [
        'How is data stored in MongoDB?',
        'MongoDB stores data as documents in BSON, a binary form of JSON, and groups the documents into collections. Each document has a unique _id field and can contain nested objects and arrays. Documents in one collection do not need the same fields, but in practice I keep a consistent structure and can add schema validation rules.'
      ],
      [
        'When do you embed data and when do you reference it in MongoDB?',
        'I embed data that is read together with its parent and does not grow without limit, such as the addresses of a customer. I use a reference, by storing the ID of another document, when the data is shared, changes often or can grow very large, such as all the orders of a customer. A single document has a 16 MB size limit, which is another reason not to embed lists that keep growing.'
      ],
      [
        'What is the aggregation pipeline in MongoDB?',
        'The aggregation pipeline processes documents through a series of stages. Common stages are $match to filter, $group to summarise, $sort to order, $project to shape the output and $lookup to join another collection. I put $match early, so less data flows through the later stages and an index can be used.'
      ],
      [
        'How do indexes work in MongoDB?',
        'Without an index, MongoDB must scan every document in a collection to find matches. I create indexes on the fields used in filters and sorts, including compound indexes on several fields, where the field order matters. I use the explain output to confirm that a query uses the index. Too many indexes slow down writes and use memory.'
      ],
      [
        'What is Redis, and what is it commonly used for?',
        'Redis is an in-memory key-value store, so reads and writes are very fast. It is commonly used as a cache in front of a slower database, and for user sessions, counters, rate limits, leaderboards and simple queues. Keys can expire automatically after a set time. Because the data lives in memory, I plan memory limits and persistence settings carefully.'
      ],
      [
        'What is sharding?',
        'Sharding splits a large dataset across several servers, called shards, so each one holds part of the data. A shard key decides where each document goes. A good shard key spreads writes evenly and supports the common queries; a poor one, such as an always increasing date, can send all new writes to one shard. Sharding adds complexity, so I use it only when one server or replica set is not enough.'
      ]
    ],
    fresher: [
      'The main types are document databases like MongoDB, key-value stores like Redis, wide-column stores and graph databases. Each one fits a different way of using data.',
      'MongoDB stores data as JSON-like documents inside collections. Each document has an _id and can hold nested objects and arrays.',
      'I embed data that is always read together, like the addresses of a customer. I reference data that is shared or can grow very large, like all the orders of a customer.'
    ],
    junior: [
      [
        'What is a replica set in MongoDB?',
        'A replica set is a group of MongoDB servers that hold the same data. One primary receives all writes, and the secondaries copy its changes. If the primary fails, the members elect a new primary automatically, which keeps the database available. Reads can go to secondaries when slightly older data is acceptable.'
      ],
      [
        'How do you use Redis as a cache without serving stale data?',
        'I use the cache-aside pattern: the app reads from Redis first, and on a miss it reads the database and stores the result with an expiry time. When the data changes, I delete or update the cached key. I choose expiry times based on how fresh each type of data must be. The app must still work, only slower, if Redis is down.'
      ]
    ],
    senior: [
      [
        'How do access patterns shape your NoSQL data model?',
        'In NoSQL I design for how the application reads and writes data, not only for the entities. I list the main queries, how often they run and the data they need, then shape documents so most queries read one document or use one index. I may copy some data to avoid joins, and I plan how to keep the copies in sync. I test the design with realistic data volumes.'
      ],
      [
        'How do you handle transactions and consistency in MongoDB?',
        'A write to a single document in MongoDB is atomic, so I design documents to keep related changes together where possible. When a change must cover several documents, I use multi-document transactions, which work on replica sets and sharded clusters but cost performance. I also choose the write and read concern, for example a majority write concern for important data. This balances safety and speed.'
      ]
    ]
  },
  // ---- PR D: Software, Web and Mobile roles (parents: Software Development, Web Development, Mobile App Development)
  python: {
    label: 'Python Developer',
    role: 'Python Developer',
    color: '#1e3a8a',
    icon: 'M8 8V6c0-1.7 1.3-3 4-3s4 1.3 4 3v4c0 1.1-.9 2-2 2h-4c-1.1 0-2 .9-2 2v2H6c-1.7 0-3-1.3-3-4s1.3-4 3-4h6M16 16v2c0 1.7-1.3 3-4 3s-4-1.3-4-3M16 12h2c1.7 0 3 1.3 3 4s-1.3 4-3 4M10 5.5h.01M14 18.5h.01',
    setupRole: 'Python Developer',
    keywords: ['django', 'flask', 'fastapi', 'pytest'],
    skills: ['Python', 'OOP', 'Django', 'Flask', 'FastAPI', 'REST API', 'SQL', 'Git', 'Pytest', 'Data structures'],
    mid: [
      [
        'What is the difference between a list, a tuple, a set and a dictionary in Python?',
        'A list is an ordered collection that can change, and it allows duplicates. A tuple is also ordered but cannot change after it is created, so it suits fixed data. A set holds unique values with no fixed order and is fast for checking whether a value is present. A dictionary stores key and value pairs and keeps the order in which keys were added.'
      ],
      [
        'What are decorators in Python?',
        'A decorator is a function that takes another function and returns a new function with extra behaviour, without changing the original code. I apply it with the @ symbol on the line above a function. Common uses are logging, timing, permission checks and caching, for example functools.lru_cache. Web frameworks also use decorators to connect URLs to view functions.'
      ],
      [
        'Why do you use a virtual environment in Python?',
        'A virtual environment is an isolated folder with its own packages for one project. It stops projects from breaking each other when they need different versions of the same library. I create one with python -m venv, activate it and record the dependencies in a requirements file or pyproject.toml. Installing everything globally mixes projects together and causes conflicts.'
      ],
      [
        'What are generators, and why are they useful?',
        'A generator is a function that uses yield to give values one at a time instead of building a whole list in memory. It pauses after each value and continues from the same place on the next request. This makes it good for large files or long streams of data. Generator expressions work the same way for simple cases.'
      ],
      [
        'What is the GIL, and how does it affect threads in Python?',
        'The global interpreter lock, or GIL, in the standard CPython build lets only one thread run Python code at a time. So threads help with waiting tasks, such as network calls, but not with heavy CPU work. For CPU-heavy work I use multiprocessing or libraries that do the work in native code. For many network tasks, asyncio is also a good choice.'
      ],
      [
        'When would you choose Django, Flask or FastAPI?',
        'Django is a full framework with an ORM, an admin panel and authentication built in, so it suits larger apps that need all of that. Flask is small and flexible, and I add only the parts I need. FastAPI is built for APIs, uses type hints for automatic validation and documentation and supports async code. I choose based on the project size, the team and whether it is mainly an API.'
      ],
      [
        'How do you test Python code with pytest?',
        'I write small test functions whose names start with test_ and use plain assert statements. Fixtures prepare shared setup, such as sample data or a test database, and parametrize runs one test with many inputs. I mock external services, so tests are fast and reliable. The tests run in CI on every change.'
      ]
    ],
    fresher: [
      'A list is ordered and can change. A tuple is ordered but fixed, a set keeps only unique values and a dictionary stores key and value pairs.',
      'A decorator wraps a function to add extra behaviour, like logging or timing, without changing its code. I write it with the @ symbol above the function.',
      'A virtual environment keeps the packages of one project separate from other projects. This stops version conflicts between them.'
    ],
    junior: [
      [
        'What is the difference between a shallow copy and a deep copy in Python?',
        'A shallow copy creates a new outer object but still shares the inner objects, such as lists inside a list. So changing an inner list changes it in both copies. A deep copy, made with copy.deepcopy, copies every nested object, so the two are fully independent. I use a deep copy only when I need it, because it is slower.'
      ],
      [
        'What are list comprehensions, and when should you avoid them?',
        'A list comprehension builds a new list in one readable line, for example the squares of a range of numbers. It is usually clearer and faster than a loop that appends items. I avoid it when the logic needs several conditions or nested loops, because a normal loop is then easier to read. For large data, a generator expression saves memory.'
      ]
    ],
    senior: [
      [
        'How do you structure a large Python project?',
        'I split the code into packages by feature, with small modules and clear names. I use pyproject.toml for dependencies and tool settings, type hints checked by a type checker, and a formatter and linter in CI. Configuration comes from environment variables, not from the code. Tests live in their own folder and follow the package structure.'
      ],
      [
        'How do you use asyncio in a Python service?',
        'The asyncio library lets one thread handle many waiting tasks, such as network or database calls, by switching between them while each one waits. I write coroutines with async def and wait for results with await. I use async libraries for HTTP and databases, because one blocking call stops the whole event loop. It works well for APIs with many slow requests, not for heavy CPU work.'
      ]
    ]
  },
  dotnet: {
    label: 'C# / .NET Developer',
    role: 'C# and .NET Developer',
    color: '#512bd4',
    icon: 'M7 4L4 12l3 8M17 4l3 8-3 8M9.5 10h5.5M9 14h5.5M12 7l-1 10M15 7l-1 10',
    setupRole: 'C#/.NET Developer',
    keywords: ['c#', 'csharp', 'dotnet', '.net', 'asp.net', 'entity framework'],
    skills: ['C#', '.NET', 'ASP.NET Core', 'Entity Framework', 'LINQ', 'SQL Server', 'REST API', 'OOP', 'Git', 'Unit testing'],
    mid: [
      [
        'What is the difference between .NET Framework and modern .NET?',
        '.NET Framework is the older version that runs only on Windows and now gets mainly maintenance updates. Modern .NET grew out of .NET Core: it is cross-platform, open source and faster, and it runs on Windows, Linux and macOS. New projects should use modern .NET. I would use .NET Framework only to maintain an existing app.'
      ],
      [
        'What are records in C#?',
        'A record is a type made for holding data. Two records with the same values are equal, because records compare by value, not by reference. They are usually immutable, and a with expression makes a copy with a few values changed. I use records for things like data transfer objects and settings.'
      ],
      [
        'What is LINQ?',
        'LINQ, or Language Integrated Query, lets me filter, sort, group and transform collections with methods such as Where, Select and OrderBy. The same style works on lists in memory and, through Entity Framework, on databases. It makes data code shorter and easier to read. I watch for deferred execution, because a query runs only when its results are used.'
      ],
      [
        'How do async and await work in C#?',
        'An async method returns a Task, and await lets it wait for slow work, such as a database or web call, without blocking the thread. While it waits, the thread can serve other work, which helps a web app handle more requests. I use async all the way through and avoid .Result and .Wait, which can cause deadlocks. I also pass a CancellationToken to long operations.'
      ],
      [
        'What is dependency injection in ASP.NET Core?',
        'Dependency injection means a class receives the services it needs instead of creating them itself. ASP.NET Core has a built-in container: I register services in Program.cs as singleton, scoped or transient, and the framework passes them into constructors. Scoped services live for one web request. This keeps classes loosely coupled and easy to test with fake services.'
      ],
      [
        'What is Entity Framework Core?',
        'Entity Framework Core is an ORM for .NET: it maps C# classes to database tables, so I can query with LINQ instead of writing most SQL by hand. Migrations keep the database schema in step with the code. I check the generated SQL, avoid loading data I do not need and use AsNoTracking for read-only queries. For very complex queries, raw SQL is still an option.'
      ],
      [
        'How does garbage collection work in .NET?',
        'The garbage collector frees the memory of objects that are no longer used, so I do not free memory by hand. It uses generations: new objects start in generation 0, which is checked most often, because most objects are short-lived. For resources such as files and database connections, I still use a using statement, so Dispose is called right away. I watch memory with profiling tools when an app slows down.'
      ]
    ],
    fresher: [
      '.NET Framework is the older, Windows-only version. Modern .NET is cross-platform, faster and open source, so I use it for new projects.',
      'A record is a type for holding data. Two records with the same values are equal, and they are usually not changed after they are created.',
      'LINQ lets me filter, sort and group data with methods like Where and Select. It works on lists and on databases through Entity Framework.'
    ],
    junior: [
      [
        'How do you build a REST API with ASP.NET Core?',
        'I create controllers or minimal API endpoints for each resource and use the right HTTP methods and status codes. Request models are validated, and services come in through dependency injection. Entity Framework Core handles the database. I add OpenAPI documentation, logging and global error handling.'
      ],
      [
        'What are nullable reference types in C#?',
        'With nullable reference types turned on, the compiler warns me when a variable that may be null is used without a check. I mark the types that can be null with a question mark, such as string?, and leave the others non-nullable. This catches many null reference errors at build time instead of in production.'
      ]
    ],
    senior: [
      [
        'How do you secure an ASP.NET Core application?',
        'I use the built-in authentication and authorization, for example JWT bearer tokens or cookies with an identity provider, and protect endpoints with policies. All input is validated, and Entity Framework or parameterized queries prevent SQL injection. Secrets are kept in a secret store, not in appsettings files, and HTTPS is enforced. I keep packages updated and scan them for known vulnerabilities.'
      ],
      [
        'How do you move an old .NET Framework app to modern .NET?',
        'I first check which libraries and Windows-only features the app uses, with tools such as the .NET Upgrade Assistant. I move shared libraries first, then the app itself, one project at a time. Good tests show that the behaviour has not changed. Parts that cannot move, such as some old Windows-only features, need a replacement or a separate service.'
      ]
    ]
  },
  frontend: {
    label: 'Frontend Developer',
    role: 'Frontend Developer',
    color: '#0284c7',
    icon: 'M3 4h18v16H3zM3 8h18M9 12l-2.5 2.5L9 17M15 12l2.5 2.5L15 17',
    setupRole: 'Frontend Developer',
    keywords: ['frontend', 'front end', 'react', 'ui developer', 'typescript'],
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Responsive design', 'Accessibility', 'Git', 'REST API', 'Testing'],
    mid: [
      [
        'What are React hooks, and which ones do you use most?',
        'Hooks let function components use state and other React features. I use useState for local state and useEffect to sync with things outside React, such as a timer or a subscription. useRef holds a value or a DOM element without causing a re-render, and I use useMemo or useCallback only when there is a real performance need. Hooks must be called at the top level of a component, never inside loops or conditions.'
      ],
      [
        'How does React update the page when data changes?',
        'React keeps a description of the UI in memory. When state changes, it builds the new description, compares it with the old one and updates only the parts of the real page that changed. This process is called reconciliation. Giving list items a stable key helps React match the items correctly.'
      ],
      [
        'What is the difference between flexbox and CSS grid?',
        'Flexbox lays out items in one direction, a row or a column, and is great for navigation bars, buttons and aligning items. CSS grid works in two directions, rows and columns at the same time, so it suits page layouts and card grids. I often use grid for the page structure and flexbox inside components.'
      ],
      [
        'How do you manage state in a large React application?',
        'I keep state close to where it is used and lift it up only when components need to share it. For data from the server, I use a data fetching library that handles caching and loading states. For app-wide state, such as the logged-in user or the theme, I use context or a state library like Redux Toolkit or Zustand. This avoids one huge global store.'
      ],
      [
        'Why use TypeScript in a frontend project?',
        'TypeScript adds types to JavaScript, so many mistakes, such as a wrong property name or a missing argument, are caught while I write the code. Editors give better autocomplete and safer refactoring. Types also document what each component expects. The code is compiled to plain JavaScript, so browsers run it as usual.'
      ],
      [
        'What is the difference between null and undefined in JavaScript?',
        'The value undefined means a variable was declared but given no value, or a property does not exist. The value null is set on purpose by a developer to mean no value. Loose equality treats them as equal, but strict equality does not, so I use triple equals in most cases. Optional chaining and the nullish coalescing operator help me handle both safely.'
      ],
      [
        'How do you test frontend components?',
        'I write unit tests for logic and component tests with a tool like React Testing Library, which tests what the user sees and does, not internal details. I find elements by their role or label, simulate clicks and typing and check the result. A few end-to-end tests in a real browser cover the main user flows. The tests run in CI on every change.'
      ]
    ],
    fresher: [
      'Hooks let function components keep state and run side effects. I use useState for values that change and useEffect for things like timers or subscriptions.',
      'React keeps a copy of the UI in memory. When data changes, it compares the new copy with the old one and updates only what changed on the page.',
      'Flexbox arranges items in one row or one column. CSS grid arranges items in rows and columns together, so it is good for full page layouts.'
    ],
    junior: [
      [
        'How do you handle forms and validation in React?',
        'I use controlled inputs or a form library to keep the values, and I validate each field when the user types or leaves it. Error messages appear next to the field in clear words. The submit button shows a loading state and prevents double submits. The server still validates again, because checks in the browser can be bypassed.'
      ],
      [
        'Why does a React component re-render, and how do you avoid unnecessary re-renders?',
        'A component re-renders when its state changes, when its parent re-renders or when a context it uses changes. Most re-renders are cheap, so I first measure with the React DevTools profiler. If one is slow, I move state down, split the component or use React.memo, useMemo and useCallback where they really help. Stable keys in lists also prevent extra work.'
      ]
    ],
    senior: [
      [
        'How do you build a design system for a frontend team?',
        'I start with design tokens for colours, spacing and typography, then build common components such as buttons, inputs and dialogs on top of them. Each component is accessible, documented with examples and tested. A tool like Storybook shows them in one place for designers and developers. Components are versioned, so teams can update safely.'
      ],
      [
        'How do you handle errors and monitoring in a frontend app?',
        'I use error boundaries in React, so one broken component shows a friendly message instead of a blank page. Errors in the browser are sent to a monitoring tool with the page, browser and the steps before the error, without personal data. I also track real user performance. Alerts on new or growing errors help the team fix problems before many users notice.'
      ]
    ]
  },
  backend: {
    label: 'Backend Developer',
    role: 'Backend Developer',
    color: '#374151',
    icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01M12 7h4M12 17h4',
    setupRole: 'Backend Developer',
    keywords: ['backend', 'back end', 'node.js', 'express', 'api developer', 'server'],
    skills: ['Node.js', 'Express', 'REST API', 'SQL', 'MongoDB', 'Authentication', 'JWT', 'Caching', 'Git', 'Testing'],
    mid: [
      [
        'How do you design REST API URLs and status codes?',
        'I use nouns for resources, such as orders, and HTTP methods for actions: GET to read, POST to create, PUT or PATCH to update and DELETE to remove. I return clear status codes, such as 201 for created, 400 for bad input, 401 or 403 for access problems and 404 when something is not found. Errors use one consistent JSON format. I version the API when a change would break clients.'
      ],
      [
        'What is the difference between authentication and authorization?',
        'Authentication checks who the user is, for example with a password and a second factor. Authorization checks what that user is allowed to do, such as editing only their own orders. I authenticate first and then check permissions on the server for every request. Hiding a button in the UI is never enough protection on its own.'
      ],
      [
        'How does JWT authentication work, and what are its risks?',
        'After login, the server issues a signed token that holds the user ID and an expiry time. The client sends it in the Authorization header, and the server checks the signature on each request without a session lookup. A token is hard to revoke before it expires, so I keep tokens short-lived and use refresh tokens. I never put secrets in a token, because its content is only encoded, not encrypted.'
      ],
      [
        'How do you design pagination for an API?',
        'For small lists I use a page number and page size, which is simple, but it gets slow on large tables and can skip rows when data changes. For large or changing lists I use cursor pagination: the response includes a cursor, such as the ID of the last item, and the next request continues from there. I set a maximum page size and say whether more items exist.'
      ],
      [
        'What is middleware in Express?',
        'Middleware is a function that runs between the incoming request and the final route handler. It receives the request, the response and a next function, and it can change the request, end the response or pass control on. I use it for logging, parsing JSON, checking authentication and handling errors. Order matters, because middleware runs in the order it is added.'
      ],
      [
        'How do you handle errors in a Node.js backend?',
        'I use try and catch with async and await, and pass errors to one central error handler that logs the details and returns a safe message with the right status code. I never send stack traces to the client. Unexpected crashes are logged, and the process manager or container platform restarts the service. Input errors are caught early with validation.'
      ],
      [
        'How do you handle a long-running task in a backend?',
        'I do not make the user wait for it inside the request. The API puts the task in a queue and answers at once, often with a job ID. A separate worker processes the task, retries it on failure and updates its status. Sending emails, creating reports and processing videos are typical examples.'
      ]
    ],
    fresher: [
      'I use nouns for resources and HTTP methods for actions, like GET to read and POST to create. I return clear status codes, such as 201 for created and 404 for not found.',
      'Authentication checks who you are, for example with a password. Authorization checks what you are allowed to do after you log in.',
      'After login the server gives a signed token. The client sends it with each request, and I keep it short-lived because it is hard to cancel.'
    ],
    junior: [
      [
        'How do you validate input in a backend API?',
        'I validate every request on the server, even if the frontend already checks it. I define a schema for the body, query and path values with a validation library, and reject bad input with a 400 status and a clear message. I use parameterized queries or an ORM for the database. This protects data quality and blocks many attacks.'
      ],
      [
        'What is rate limiting, and why do APIs need it?',
        'Rate limiting caps how many requests a client can make in a time window, for example per IP address or per API key. It protects the service from abuse, password guessing and sudden traffic spikes. When the limit is reached, the API returns status 429 with a time to retry. I set stricter limits on sensitive routes, such as login.'
      ]
    ],
    senior: [
      [
        'How do you change an API without breaking existing clients?',
        'I add new fields and endpoints instead of changing or removing old ones. For a breaking change, I release a new version and keep the old one running for a set period, with clear notice to clients. Contract tests check that responses still match what clients expect. I watch how much the old version is used before removing it.'
      ],
      [
        'How do you design idempotent API endpoints?',
        'An idempotent endpoint gives the same result when the same request arrives more than once, which matters when clients retry after a timeout. GET, PUT and DELETE should be idempotent by design. For POST requests such as payments, the client sends an idempotency key, and the server stores it with the result and returns the same result for a repeat. This prevents double charges and duplicate records.'
      ]
    ]
  },
  fullstack: {
    label: 'Full Stack Developer',
    role: 'Full Stack Developer',
    color: '#134e4a',
    icon: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5',
    setupRole: 'Full Stack Developer',
    keywords: ['full stack', 'fullstack', 'mern', 'react', 'node.js', 'end to end'],
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'SQL', 'MongoDB', 'REST API', 'Git', 'Docker', 'Authentication'],
    mid: [
      [
        'How does data flow from the database to the screen in a full stack app?',
        'A user action in the browser sends a request to the API. The backend checks the user, validates the input, reads or writes the database and returns JSON. The frontend updates its state with that data, and the page shows the change. I make sure both sides agree on the shape of the data.'
      ],
      [
        'How do you share types or validation between the frontend and the backend?',
        'In a TypeScript project I keep shared types and validation schemas in one package that both sides use. A change to the API shape then shows errors in the frontend at build time. Another option is to generate a typed client from an OpenAPI description. This avoids bugs where one side expects a field that the other no longer sends.'
      ],
      [
        'How do you handle login across the frontend and the backend?',
        'The backend checks the password and creates a session or a token. For browser apps I prefer a cookie that is HttpOnly, Secure and has SameSite set, because JavaScript cannot read it. The frontend only knows whether the user is logged in and shows the right pages, while the backend checks permissions on every request. Logout ends the session on the server and clears the cookie.'
      ],
      [
        'What is CORS, and how do you set it up?',
        'CORS is a browser rule that stops a page from reading responses from another origin unless the server allows it. The server sends headers that list the allowed origins, methods and headers. I allow only my own frontend domains, not every origin, especially when cookies are used. CORS does not protect the server from other clients, so authentication is still needed.'
      ],
      [
        'How do you deploy a full stack application?',
        'I build the frontend into static files and serve them from a CDN or from the backend. The backend runs in a container or on a platform service, with environment variables for configuration. The database is a managed service with backups. A CI/CD pipeline tests and deploys both parts, and database migrations run before the new backend version starts.'
      ],
      [
        'How do you choose a tech stack for a new web product?',
        'I look at the product needs, the skills of the team, the hiring market and how fast we must ship. A common, well-supported stack, such as React with Node.js and PostgreSQL, is often a safe choice. I avoid tools the team cannot maintain. I keep the first version simple and change parts only when real needs appear.'
      ],
      [
        'How do you find a bug when you do not know if it is in the frontend or the backend?',
        'I reproduce the bug and open the network tab in the browser to see the request and the response. If the request is wrong, the problem is in the frontend; if the response is wrong, I check the backend logs and the database. A request ID in the logs helps me follow one request across both sides. After the fix, I add a test on the side where the bug was.'
      ]
    ],
    fresher: [
      'The browser sends a request to the API. The backend reads or writes the database and returns JSON, and the frontend shows the new data on the page.',
      'I keep shared types and validation rules in one place that both sides use. Then a change in the API shows errors in the frontend before release.',
      'The backend checks the password and creates a session or a token, often in a secure cookie. The backend checks permissions on every request.'
    ],
    junior: [
      [
        'How do you handle loading and error states between the UI and the API?',
        'Every request has three states in the UI: loading, success and error. I show a skeleton or a spinner while loading, the data on success and a clear message with a retry button on error. The backend returns useful error messages and status codes, so the UI can tell a validation error from a server problem. I also handle slow networks and timeouts.'
      ],
      [
        'How do you run the whole stack on your own computer?',
        'I use Docker Compose to start the database and other services, and run the frontend and backend in development mode. Settings come from a local environment file that is not committed to Git. A seed script fills the database with test data. A short README explains the steps, so a new developer can start quickly.'
      ]
    ],
    senior: [
      [
        'How do you plan a feature that touches the database, the API and the UI?',
        'I start with the user flow and agree on the API contract first, so frontend and backend work can happen in parallel. I plan the database change to be backward compatible, for example adding a column before the code uses it. A feature flag lets us release safely. There are tests at each layer and one end-to-end test for the main flow.'
      ],
      [
        'When would you split a full stack monolith into separate services?',
        'I keep one well-structured application while the team is small, because it is simpler to build, test and deploy. I split out a part only for a clear reason, such as very different scaling needs, a separate team owning it or a release cycle that blocks others. Each new service needs its own deployment, monitoring and API contract, so the gain must be worth the cost.'
      ]
    ]
  },
  wordpress: {
    label: 'WordPress Developer',
    role: 'WordPress Developer',
    color: '#21759b',
    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM6.5 9l3 8 2.5-6 2.5 6 3-8',
    setupRole: 'WordPress Developer',
    keywords: ['wordpress', 'woocommerce', 'elementor', 'php', 'cms'],
    skills: ['WordPress', 'PHP', 'Themes', 'Plugins', 'WooCommerce', 'Elementor', 'SEO', 'Page speed', 'MySQL', 'Security'],
    mid: [
      [
        'What is the difference between a WordPress theme and a plugin?',
        'A theme controls how the site looks, such as the layout, colours and templates. A plugin adds features, such as forms, SEO tools or a shop, and should keep working when the theme changes. I keep business features in plugins, not in the theme, so a new design does not break the site.'
      ],
      [
        'Why do you use a child theme?',
        'A child theme inherits everything from a parent theme and holds only my changes. When the parent theme is updated, my changes are not overwritten. I put custom styles, template overrides and small functions there. With block themes, many design changes can also be made in the site editor.'
      ],
      [
        'What are actions and filters in WordPress?',
        'Actions and filters are hooks that let my code run at set points without changing WordPress core files. An action runs my function when something happens, for example when a post is saved, and is added with add_action. A filter receives a value, changes it and returns it, for example the title of a post, and is added with add_filter. Plugins and themes are built mostly on hooks.'
      ],
      [
        'Which caching options do you use on a WordPress site?',
        'I use page caching, so most visitors get a ready HTML page instead of WordPress building it each time. Object caching, for example with Redis, reduces repeated database queries. A CDN serves images, CSS and JavaScript from servers near the user. I clear the cache after updates and exclude pages like the cart and checkout.'
      ],
      [
        'How do you keep a WordPress site secure?',
        'I keep WordPress core, themes and plugins updated, and remove the ones I do not use. I install plugins only from trusted sources, use strong passwords with two-factor login and give users only the role they need. Regular off-site backups and a web application firewall add protection. In my own code I sanitize input, escape output and check nonces and user permissions.'
      ],
      [
        'How do you set up an online shop with WooCommerce?',
        'I install WooCommerce and set up products, categories, taxes, shipping zones and payment gateways. I test the full checkout with test payments before going live. The site needs SSL, clear shop policies and working order emails. Performance and security matter even more on a shop, so I choose plugins carefully and keep backups.'
      ],
      [
        'What is a custom post type in WordPress?',
        'A custom post type is a new kind of content besides posts and pages, such as projects, events or testimonials. I register it with register_post_type in a plugin, with its labels, features and URL structure. Custom fields and taxonomies add extra data and grouping. This keeps content organised and easy for editors to manage.'
      ]
    ],
    fresher: [
      'A theme controls how the site looks. A plugin adds features, like forms or a shop, and keeps working when the theme changes.',
      'A child theme keeps my changes separate from the parent theme. When the parent theme is updated, my changes stay safe.',
      'They are hooks that let my code run at certain points without editing WordPress itself. Actions do something at an event, and filters change a value and return it.'
    ],
    junior: [
      [
        'How do you move a WordPress site to a new host?',
        'I take a full backup of the files and the database. I copy them to the new host, create the database and update the connection details in wp-config.php. If the domain changes, I replace the old URLs with a tool that handles serialized data safely. I test the site on the new host before pointing the domain to it.'
      ],
      [
        'What is the difference between Elementor and the block editor?',
        'The block editor is built into WordPress and builds pages from blocks, and block themes extend it to the whole site. Elementor is a popular page builder plugin with a visual drag and drop editor and many ready widgets. Page builders are quick for design but can add extra code and slow pages down. I choose based on the needs of the client and who will edit the site.'
      ]
    ],
    senior: [
      [
        'How do you build a custom WordPress plugin properly?',
        'I give the plugin a unique prefix or namespace to avoid conflicts and organise the code by feature. I use hooks instead of editing core, prepared statements for database queries and the settings API for options. Every form checks a nonce and the user capabilities, input is sanitized and output is escaped. I also make it translatable and clean up on uninstall.'
      ],
      [
        'How do you manage updates on many client WordPress sites?',
        'I keep a list of every site with its plugins and versions, and use a management tool to update them from one place. Updates are tested on a staging copy first, especially for big plugins like WooCommerce. A backup is taken before each update, and uptime monitoring alerts me if a site breaks. I also tell each client what was updated.'
      ]
    ]
  },
  mobile: {
    label: 'Mobile App Development',
    role: 'Mobile App Developer',
    color: '#075985',
    icon: 'M7 2h10v20H7zM11 18h2',
    setupRole: 'Mobile App Developer',
    keywords: ['mobile app', 'app developer', 'cross platform', 'native app'],
    skills: ['Android', 'iOS', 'Flutter', 'React Native', 'UI design', 'REST API', 'Firebase', 'State management', 'Git', 'App store publishing'],
    mid: [
      [
        'What is the difference between native and cross-platform app development?',
        'Native apps are built with the tools of each platform, Kotlin for Android and Swift for iOS, so they get the best performance and new platform features first. Cross-platform frameworks such as Flutter and React Native share one codebase for both platforms, which saves time and cost. They may still need native code for some device features. I choose based on the budget, team skills, performance needs and how platform-specific the app is.'
      ],
      [
        'What is the app lifecycle, and why does it matter?',
        'An app moves through states such as starting, running in the foreground, going to the background and being stopped. The system can close a background app at any time to free memory. So I save the work and state of the user when the app goes to the background and restore it when the user comes back. I also stop heavy work, like location updates, when it is not needed.'
      ],
      [
        'How do you handle app permissions?',
        'I ask for a permission only when the user needs the feature, with a short message that explains why. I ask only for what the app really needs, such as camera access for scanning. If the user says no, the app keeps working with that feature turned off and shows how to enable it later. This builds trust and helps with the store review.'
      ],
      [
        'How do you make an app work offline?',
        'I save important data in a local database on the device, so the app can show it without a connection. Changes made offline wait in a queue and are sent when the connection comes back. I plan how to handle conflicts, for example when the same record also changed on the server. The UI clearly shows when the user is offline.'
      ],
      [
        'How do you keep a mobile app fast and smooth?',
        'I keep heavy work, such as network calls and image processing, off the main thread, so the UI does not freeze. Lists load items lazily, and images are resized and cached. I measure start-up time, frame rate and memory with the profiling tools of each platform. Battery and data use matter too, so I avoid needless background work.'
      ],
      [
        'What steps do you follow to publish an app to the stores?',
        'I prepare a signed release build and test it on real devices. I create the store listing with screenshots, a description, a privacy policy and the data safety or privacy details. I release to testers first, then roll out in stages while I watch crash reports. Both stores review apps against their policies, so I read the rules before submitting.'
      ],
      [
        'How do you store sensitive data safely on a mobile device?',
        'I store only what the app needs. Passwords and tokens go in the secure storage of the platform, the Android Keystore or the iOS Keychain, never in plain files or plain preferences. Other sensitive data is encrypted, and all network calls use HTTPS. I also make sure logs never contain personal data.'
      ]
    ],
    fresher: [
      'Native apps use the tools of each platform, like Kotlin for Android and Swift for iOS. Cross-platform apps, like Flutter apps, use one codebase for both.',
      'The app lifecycle is the set of states an app goes through, like running, in the background or closed. I save the work of the user when the app goes to the background.',
      'I ask for a permission only when the user needs the feature, with a short reason. If the user says no, the app still works without that feature.'
    ],
    junior: [
      [
        'How do you test a mobile app on different devices?',
        'I write unit tests for logic and UI tests for the main flows, and run them on emulators in CI. I also test on a few real devices with different screen sizes, older and newer system versions and slower hardware. A device cloud service helps cover more models. Before release, testers use a beta build, and I watch the crash reports closely.'
      ],
      [
        'How do push notifications work?',
        'The app registers with the notification service of the platform, Firebase Cloud Messaging on Android or the Apple Push Notification service on iOS, and gets a device token. The app sends this token to our server. When there is news, our server sends a message through that service to the device. I ask for notification permission at a sensible moment and let users choose which notifications they want.'
      ]
    ],
    senior: [
      [
        'How do you plan the architecture of a new mobile app?',
        "I separate the app into layers: UI, state and data, with repositories that hide whether data comes from the network or the local database. A pattern such as MVVM keeps screens simple and testable. I plan offline support, error handling, analytics and feature flags from the start. The structure should let several developers work without getting in each other's way."
      ],
      [
        'How do you monitor an app after release?',
        'I use crash reporting and performance monitoring to see crashes, slow screens and start-up time on real devices. Store reviews and ratings also show problems. I release in stages, so I can stop a rollout if the crash rate rises. Key flows are tracked with privacy-friendly analytics, without personal data.'
      ]
    ]
  },
  android: {
    label: 'Android Developer',
    role: 'Android Developer',
    color: '#15803d',
    icon: 'M5 17v-5a7 7 0 0 1 14 0v5zM8 4l1.5 2.5M16 4l-1.5 2.5M9.5 11.5h.01M14.5 11.5h.01M5 20h14',
    setupRole: 'Android Developer',
    keywords: ['android', 'kotlin', 'jetpack compose', 'android studio', 'play store'],
    skills: ['Kotlin', 'Java', 'Android Studio', 'Jetpack Compose', 'Room', 'Retrofit', 'MVVM', 'Firebase', 'Play Store publishing'],
    mid: [
      [
        'Why is Kotlin preferred for Android development?',
        'Kotlin is the language Google recommends for Android. It is concise, has null safety built into the type system and works fully with existing Java code. Coroutines make background work much simpler than callbacks. Jetpack Compose, the modern UI toolkit, is built for Kotlin.'
      ],
      [
        'What is Jetpack Compose?',
        'Jetpack Compose is the modern Android toolkit for building UI in Kotlin code instead of XML layouts. I write composable functions that describe the UI for the current state, and Compose updates the screen when that state changes. It needs less code, and previews make design work faster. It also works together with existing screens built with Views.'
      ],
      [
        'What is the Activity lifecycle?',
        'An Activity moves through callbacks such as onCreate, onStart, onResume, onPause, onStop and onDestroy. By default, a screen rotation destroys and recreates the Activity. So I keep UI state in a ViewModel, which survives configuration changes, and save small state for process death with SavedStateHandle. I start and stop resources such as the camera in the matching callbacks.'
      ],
      [
        'How do you do background work with Kotlin coroutines?',
        'Coroutines let me write asynchronous code that reads like normal step-by-step code. I launch them in a scope tied to a lifecycle, such as viewModelScope, so they are cancelled when they are no longer needed. I move heavy work off the main thread with withContext and Dispatchers.IO or Dispatchers.Default. For work that must finish even if the app closes, I use WorkManager.'
      ],
      [
        'What is MVVM on Android?',
        'MVVM splits the app into the View, which shows the UI, the ViewModel, which holds UI state and logic, and the Model, which is the data layer with repositories. The View observes state from the ViewModel and sends user actions to it. The ViewModel survives screen rotation. This makes the code easier to test and maintain.'
      ],
      [
        'What is a Flow in Kotlin, and how is it used in Android?',
        'A Flow is a stream of values that arrive over time, built on coroutines. Room and other libraries can return a Flow, so the UI gets new data automatically. In a ViewModel I often expose a StateFlow, which always holds the latest UI state, and collect it in the UI in a lifecycle-aware way. Operators such as map and filter transform the values.'
      ],
      [
        'What is Room?',
        'Room is the Jetpack library for a local SQLite database. I define entities as data classes, DAOs with queries that are checked at compile time, and a database class. I call it from coroutines, so database work stays off the main thread. When the schema changes, I add migrations, so users do not lose data.'
      ]
    ],
    fresher: [
      'Kotlin is the language Google recommends for Android. It is shorter than Java, has null safety and makes background work easy with coroutines.',
      'Jetpack Compose builds the UI with Kotlin functions instead of XML. When the state changes, the screen updates automatically.',
      'An Activity goes through states like onCreate, onResume, onPause and onDestroy. I keep screen data in a ViewModel, so it survives rotation.'
    ],
    junior: [
      [
        'How do you navigate between screens in a Compose app?',
        'I use the Navigation component for Compose, with a NavHost that defines each screen as a destination. I pass only small values, such as an ID, between screens and load the full data in the ViewModel of the next screen. The back stack is handled for me, including the system back button. Deep links can open a screen directly from a notification or a web link.'
      ],
      [
        'What is dependency injection with Hilt?',
        'Hilt is the recommended dependency injection library for Android, built on Dagger. I annotate the Application class and the Android classes, and provide dependencies such as the Retrofit service or a repository in modules. Hilt then creates and passes them in with the right lifetime. This removes manual wiring and makes it easy to use fakes in tests.'
      ]
    ],
    senior: [
      [
        'How do you reduce the start-up time of an Android app?',
        'I first measure cold start time with Android Studio tools and Macrobenchmark. Then I remove heavy work from Application.onCreate, delay libraries that are not needed at once and load data lazily. Baseline Profiles help the system compile the most used code ahead of time. I check the result on low-end devices too.'
      ],
      [
        'How do you split a large Android project into modules?',
        'I split the app into feature modules, such as login or payments, and core modules for shared parts like networking, the database and the design system. Feature modules depend on core modules, not on each other. This makes builds faster, because Gradle rebuilds only what changed, and lets teams own their parts. Clear module rules stop the code from becoming one big tangle.'
      ]
    ]
  },
  flutter: {
    label: 'Flutter Developer',
    role: 'Flutter Developer',
    color: '#02569b',
    icon: 'M14.5 3L5 12.5l3 3L21 3zM14 12l-5 5 4 4h5l-5-5',
    setupRole: 'Flutter Developer',
    keywords: ['flutter', 'dart'],
    skills: ['Dart', 'Flutter', 'Widgets', 'State management', 'REST API', 'Firebase', 'SQLite', 'Animations', 'Testing', 'Play Store publishing'],
    mid: [
      [
        'What is the difference between a StatelessWidget and a StatefulWidget?',
        'A StatelessWidget has no state of its own and rebuilds only when its inputs from the parent change. A StatefulWidget has a State object that keeps data, and calling setState tells Flutter to rebuild it with the new data. I use stateless widgets wherever possible and keep state as low in the tree as I can.'
      ],
      [
        'How does Flutter draw its UI?',
        'Flutter does not use the native buttons and views of the platform. It draws every pixel itself with its own rendering engine, which is why the app looks the same on Android and iOS. Everything on the screen is built from widgets, which describe the UI for the current state. Release builds compile Dart to native machine code, so apps run fast.'
      ],
      [
        'Which state management approaches have you used in Flutter?',
        'For simple screens, setState is enough. For shared state I use Provider or Riverpod, which pass data down the tree and rebuild only the widgets that listen. Bloc suits larger apps that need a strict flow from events to states. I pick one approach for the project and use it consistently.'
      ],
      [
        'How does asynchronous code work in Dart?',
        'Dart runs my code on a single thread with an event loop. A Future is a value that will be ready later, such as a network response, and I wait for it with async and await. A Stream gives many values over time, such as location updates. For heavy CPU work I use an isolate, so the UI does not freeze.'
      ],
      [
        'What is the difference between hot reload and hot restart?',
        'Hot reload puts my code changes into the running app and keeps its current state, so I see UI changes almost at once. Hot restart reloads the whole app and resets the state. Some changes, such as changes to global variables or the main function, need a hot restart. Changes to native code need a full rebuild.'
      ],
      [
        'How do you turn JSON into Dart objects?',
        'I create model classes with a fromJson factory and a toJson method. For many models I use code generation, such as json_serializable, so the conversion code is written for me and stays correct. I handle missing or null fields with nullable types or default values. The rest of the app then works with typed objects instead of raw maps.'
      ],
      [
        'How do you use platform channels in Flutter?',
        'Platform channels let Dart code call native Android or iOS code when a feature has no Flutter package. I send a method name and arguments over a MethodChannel, and native code in Kotlin or Swift handles the call and returns a result. I first look on pub.dev for a well-maintained plugin, because it saves work.'
      ]
    ],
    fresher: [
      'A StatelessWidget has no data of its own that changes. A StatefulWidget keeps state, and setState rebuilds it when the data changes.',
      'Flutter draws the whole UI itself with its own engine, so the app looks the same on Android and iOS. Everything on the screen is a widget.',
      'I use setState for simple screens. For shared data I use Provider, Riverpod or Bloc, and I use one approach across the app.'
    ],
    junior: [
      [
        'What are keys in Flutter, and when do you need them?',
        'Keys help Flutter match widgets to their state when widgets move, are added or are removed, for example when a list is sorted. Without a key, a stateful item could keep the wrong state after the list changes. I use a ValueKey with a stable ID for list items. GlobalKeys also exist, but I use them rarely, for example for form validation.'
      ],
      [
        'How do you test a Flutter app?',
        'Flutter has three main kinds of tests. Unit tests check logic, widget tests build one widget in a test environment and check what it shows and how it reacts to taps, and integration tests run the full app on a device or emulator. Widget tests are fast, so I write most of my UI tests as widget tests.'
      ]
    ],
    senior: [
      [
        'How do you keep a large Flutter app smooth?',
        'I use const constructors where possible, so Flutter can skip rebuilding those widgets. I split big widgets into small ones, so only the parts that change are rebuilt. Long lists use ListView.builder to build items lazily. I check frame times and rebuilds with Flutter DevTools and test in profile mode on real devices.'
      ],
      [
        'How do you set up flavors for development and production in Flutter?',
        'Flavors let me build the same app with different settings, such as the API address, app name and app ID, for development, staging and production. I set them up in the Android and iOS build configurations and pass the matching settings to Dart at start-up. Each flavor can be installed side by side on one phone. This avoids testing against production data by mistake.'
      ]
    ]
  },
  rn: {
    label: 'React Native Developer',
    role: 'React Native Developer',
    color: '#0c4a6e',
    icon: 'M12 11v2M3 12c0-2.2 4-4 9-4s9 1.8 9 4-4 4-9 4-9-1.8-9-4zM7.5 4.2c1.9-1.1 5.7 1.3 8.2 5.6s2.7 8.8.8 9.9-5.7-1.3-8.2-5.6-2.7-8.8-.8-9.9z',
    setupRole: 'React Native Developer',
    keywords: ['react native', 'expo'],
    skills: ['JavaScript', 'TypeScript', 'React Native', 'Expo', 'Navigation', 'Redux', 'REST API', 'Firebase', 'Native modules', 'Testing'],
    mid: [
      [
        'How is React Native different from React for the web?',
        'Both use React components, hooks and JavaScript or TypeScript. React for the web renders HTML elements in the browser, while React Native renders real native components, such as View and Text, on Android and iOS. Styling uses JavaScript objects with a flexbox layout, not CSS files. Many skills transfer, but the UI building blocks are different.'
      ],
      [
        'What is Expo, and when would you use it?',
        'Expo is a framework and set of tools on top of React Native. It gives ready modules for the camera, notifications and other device features, cloud builds and over-the-air updates. It is the recommended way to start a new project. When I need custom native code, I can still add it with development builds and config plugins.'
      ],
      [
        'How do you handle navigation in a React Native app?',
        'I use React Navigation, or Expo Router for file-based routing. A stack navigator handles moving forward and back, and tab or drawer navigators organise the main sections. I pass small parameters, such as an ID, between screens. Deep links let a notification or a web link open a specific screen.'
      ],
      [
        'How do you make a long list fast in React Native?',
        'I use FlatList or another virtualized list, which renders only the items on screen instead of the whole list. Each item gets a stable key, and I keep item components light and memoized. Images are sized correctly and cached. I check performance in a release build, because development mode is slower.'
      ],
      [
        'What are native modules in React Native?',
        'A native module lets JavaScript call code written in Kotlin, Java, Swift or Objective-C, for features that no library covers. In the new architecture, Turbo Modules make these calls faster and typed. I first look for a well-maintained library or Expo module before writing my own. If I write one, I keep the native part small and well tested.'
      ],
      [
        'How do you debug a React Native app?',
        'I use React Native DevTools to inspect components, set breakpoints and read logs, and I check network requests in the network tools. Crashes in native code need Android Studio or Xcode and their logs. I also reproduce problems in a release build, because some bugs appear only there.'
      ],
      [
        'What is the new architecture of React Native?',
        'The new architecture replaces the old asynchronous bridge between JavaScript and native code. JSI lets JavaScript call native code directly, Fabric is the new rendering system and Turbo Modules load native modules only when they are needed. The result is faster start-up, a smoother UI and support for modern React features. Most popular libraries now support it.'
      ]
    ],
    fresher: [
      'Both use React components and hooks. React Native shows real native components, like View and Text, on phones instead of HTML in a browser.',
      'Expo is a set of tools on top of React Native. It gives ready device features, easy builds and updates, so it is a good way to start a new app.',
      'I use React Navigation with stack and tab navigators. I pass small values, like an ID, from one screen to the next.'
    ],
    junior: [
      [
        'How do you handle differences between Android and iOS in React Native?',
        'Most code is shared, but some details differ, such as shadows, fonts, the back button and permission flows. I use the Platform module or platform-specific file extensions for small differences. I test every feature on both platforms, on real devices when possible. Safe area handling keeps content away from notches and system bars.'
      ],
      [
        'How do over-the-air updates work in React Native?',
        'An over-the-air update replaces the JavaScript bundle and assets without a new store release, for example with Expo Updates. It is good for quick bug fixes. Changes to native code still need a new store build. I follow the store rules, which do not allow such updates to change the main purpose of the app, and I roll updates out in stages.'
      ]
    ],
    senior: [
      [
        'How do you set up CI/CD for a React Native app?',
        'On every pull request, CI runs linting, type checks and unit tests. For releases, the pipeline builds signed Android and iOS apps, for example with EAS Build or Fastlane, and uploads them to internal testing in both stores. Signing keys are kept in the secret store of the CI system. Over-the-air updates have their own channel, with staged rollout and a way to roll back.'
      ],
      [
        'How do you share code between a React Native app and a React website?',
        'I keep business logic, API clients, types and validation in shared packages in a monorepo. UI components are usually separate, because native and web building blocks differ, although React Native Web can share some of them. Shared code has its own tests. This avoids writing the same rules twice, while each app keeps the right look for its platform.'
      ]
    ]
  },
  ios: {
    label: 'iOS Developer',
    role: 'iOS Developer',
    color: '#52525b',
    icon: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 5h4M11 19h2',
    setupRole: 'iOS Developer',
    keywords: ['ios', 'swift', 'swiftui', 'iphone', 'xcode'],
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'Core Data', 'MVVM', 'REST API', 'Firebase', 'App Store', 'Testing'],
    mid: [
      [
        'What is the difference between SwiftUI and UIKit?',
        'SwiftUI is the modern, declarative framework from Apple: I describe the UI for the current state, and it updates the screen when the state changes. UIKit is the older, imperative framework where I create and update views myself, and many existing apps still use it. SwiftUI needs less code and has live previews. The two can be mixed in one app.'
      ],
      [
        'What are optionals in Swift?',
        'An optional is a type that can hold a value or nil, written with a question mark, such as String?. Swift makes me handle the nil case before I use the value, which prevents many crashes. I unwrap optionals safely with if let, guard let or the nil-coalescing operator. I avoid force unwrapping unless I am sure the value exists.'
      ],
      [
        'What is the difference between a struct and a class in Swift?',
        'A struct is a value type, so each copy has its own data, while a class is a reference type, so copies share one instance. Classes support inheritance and are managed by automatic reference counting. Swift prefers structs for most models, because they are safer to pass around. I use classes when I need a shared identity or inheritance.'
      ],
      [
        'How does memory management work in Swift?',
        'Swift uses automatic reference counting, or ARC. Each class instance counts how many strong references point to it and is freed when the count reaches zero. Two objects that hold strong references to each other create a retain cycle and leak memory. I break cycles with weak or unowned references, often weak self in closures.'
      ],
      [
        'How do you handle asynchronous work in Swift?',
        'I use Swift concurrency with async and await, which makes asynchronous code read like normal code. Tasks run the work, and I update the UI on the main actor. Actors protect shared state from data races. Older code may use completion handlers or Grand Central Dispatch, which I can wrap in async functions.'
      ],
      [
        'How do you manage state in SwiftUI?',
        'I use @State for simple values that one view owns and @Binding to let a child view change a value of its parent. For shared data I use an observable model class and pass it down or put it in the environment. Views update automatically when the data they read changes. I keep business logic in the model, not in the view.'
      ],
      [
        'How do you store data locally in an iOS app?',
        'For small settings I use UserDefaults. For structured data I use SwiftData or Core Data, which handle saving, queries and relationships. Passwords and tokens always go in the Keychain, never in UserDefaults. Files such as images go in the documents or caches folder of the app.'
      ]
    ],
    fresher: [
      'SwiftUI is the newer Apple framework where I describe the UI for the current state. UIKit is the older framework where I update views myself.',
      'An optional can hold a value or nil. Swift makes me check for nil first, which stops many crashes.',
      'A struct is copied when I pass it, so each copy is separate. A class is shared, so a change is seen through every reference.'
    ],
    junior: [
      [
        'How do you call a REST API in an iOS app?',
        'I use URLSession with async and await to send the request and decode the JSON into Swift structs that conform to Codable. I check the HTTP status code and handle errors and no-connection cases. The networking code lives in a separate service, so views stay simple and the code is easy to test.'
      ],
      [
        'What are protocols in Swift?',
        'A protocol defines methods and properties that a type promises to provide, like an interface. Structs, classes and enums can all adopt protocols, and protocol extensions can add default behaviour. I use protocols to write code against a capability, such as a data service, so I can swap in a fake one in tests.'
      ]
    ],
    senior: [
      [
        'How do you use Instruments to fix performance problems?',
        'Instruments is the profiling tool in Xcode. I use Time Profiler to find code that blocks the main thread, Allocations and Leaks to find memory problems and other templates for energy and network use. I always profile a release build on a real device. After a fix, I measure again to confirm the improvement.'
      ],
      [
        'How do you support older iOS versions while you adopt new APIs?',
        'I set the lowest supported iOS version based on our users and the store rules, and use availability checks to call new APIs only where they exist. Older devices get a simpler fallback. I test on the oldest supported version and on the newest one. Each year I review the minimum version and drop old versions when few users remain.'
      ]
    ]
  },
  // ---- PR E: Game, Testing, Business and System Administrator roles (parents: Game Development,
  // Testing and QA, Business and Product, System Administrator)
  gamedev: {
    label: 'Game Development',
    role: 'Game Developer',
    color: '#5a189a',
    icon: 'M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM12 9v6M5 15h14v5H5zM8.5 17.5h.01',
    setupRole: 'Game Developer',
    keywords: ['game developer', 'game programmer', 'game engine', 'gameplay'],
    skills: ['C#', 'C++', 'Unity', 'Unreal Engine', 'Game loop', 'Physics', 'Math for games', 'Performance profiling', 'Git', 'Debugging'],
    mid: [
      [
        'What is a game loop, and how does it work?',
        'A game loop runs again and again while the game is open. In each pass it reads input, updates the game state and draws the next frame. I use delta time, the time since the last frame, so movement looks the same on fast and slow devices. Physics often runs on a fixed time step, so it stays stable.'
      ],
      [
        'How do you choose a game engine for a project?',
        'I look at the target platforms, the team skills and the type of game. Unity with C# is a strong choice for mobile, 2D and smaller 3D games. Unreal Engine with C++ and Blueprints suits high-end 3D graphics. Godot is a light, open-source option for small teams. I also check the licence terms and the cost before I decide.'
      ],
      [
        'How does collision detection work in a game?',
        'Each object gets a simple collider shape, such as a box, a sphere or a capsule, instead of its full mesh. The engine first finds pairs of objects that are close, which is the broad phase, and then checks the exact shapes, which is the narrow phase. A trigger only reports the overlap and does not push objects apart. For very fast objects I use continuous collision detection, so they do not pass through thin walls.'
      ],
      [
        'How do you keep a game running at a smooth frame rate?',
        'I set a target, such as 60 frames per second, and measure with the profiler before I change anything. Common fixes are fewer draw calls, smaller textures, simpler shaders and level of detail models for far objects. In code I avoid creating new objects every frame, because that triggers garbage collection pauses. I test on the weakest device we support, not only on my own computer.'
      ],
      [
        'How do you manage game states such as menu, playing and paused?',
        'I use a state machine, where the game is in exactly one state at a time, such as main menu, playing, paused or game over. Each state has clear enter and exit steps, for example pausing stops the game time and shows the pause menu. Only allowed changes can happen, so the game cannot jump from the menu straight to game over. This keeps the logic simple and easy to debug.'
      ],
      [
        'What is an asset pipeline in game development?',
        'The asset pipeline is the path that models, textures, sounds and animations take from the artist to the running game. Assets are exported in agreed formats, such as FBX or PNG, with clear names and folders. The engine imports them with the right compression and settings for each platform. A clean pipeline saves time and keeps the build size under control.'
      ],
      [
        'How do you use version control on a game project?',
        'I use Git for code and Git LFS for large binary files, such as textures and audio. Many larger studios use Perforce, because it handles huge files and lets people lock a file while they edit it. Binary files like scenes cannot be merged easily, so locking avoids lost work. I commit small changes with clear messages and keep the main branch always playable.'
      ]
    ],
    fresher: [
      'A game loop repeats while the game runs. Each time it reads input, updates the game and draws a new frame.',
      'I choose an engine based on the platform, the team and the game. Unity suits mobile and 2D games, and Unreal suits high-end 3D games.',
      'Objects get simple collider shapes, and the engine checks when two shapes touch. A trigger only reports the touch and does not block movement.'
    ],
    junior: [
      [
        'What is the difference between Update and a fixed time step in game code?',
        'Update runs once per frame, so it runs more often on a fast device and less often on a slow one. A fixed time step runs at a steady rate, for example 50 times per second, whatever the frame rate is. I put input and visual changes in the frame update, and physics and forces in the fixed step. This keeps physics results the same on every device.'
      ],
      [
        'How do you save and load player progress in a game?',
        'I collect the data that matters, such as level, score and settings, into a small save object. I turn it into JSON or a binary format and write it to the save folder of the platform. I add a version number, so an older save can still load after an update. For online games the server keeps the important data, so players cannot edit it easily.'
      ]
    ],
    senior: [
      [
        'How do you plan the technical side of a new game?',
        'I start with the target platforms, the frame rate goal and the memory and download budgets. I build a small vertical slice early to test the riskiest systems, such as networking or large levels. I agree on code structure, naming and the asset pipeline before the team grows. I also plan time for performance work and testing, not only for new features.'
      ],
      [
        'A game crashes only on some phones. How do you track down the cause?',
        'I collect crash reports with the device model, the OS version and the stack trace from a crash reporting tool. I look for a pattern, such as low memory devices or one graphics driver. Then I try to reproduce it on the same kind of device and add logs around the failing code. After the fix, I keep watching the crash rate for that group of devices.'
      ]
    ]
  },
  unity: {
    label: 'Unity Developer',
    role: 'Unity Developer',
    color: '#3f3f46',
    icon: 'M12 2l9 5v10l-9 5-9-5V7zM12 12l9-5M12 12v10M12 12L3 7',
    setupRole: 'Unity Developer',
    keywords: ['unity', 'unity3d', 'monobehaviour', 'prefab'],
    skills: ['C#', 'Unity', 'Prefabs', 'ScriptableObjects', 'Physics', 'Unity UI', 'Animation', 'Unity Profiler', 'Mobile optimization', 'Git'],
    mid: [
      [
        'What is the order of Awake, Start, Update and FixedUpdate in a MonoBehaviour?',
        'Awake runs first, when the object is loaded, even if the script is disabled. Start runs once before the first frame update, but only if the script is enabled. Update runs every frame, and FixedUpdate runs on the fixed physics time step, so it can run zero or several times in one frame. I set up references in Awake and use other objects in Start, when they are ready.'
      ],
      [
        'What is the difference between a prefab and a ScriptableObject in Unity?',
        'A prefab is a saved GameObject with its components, which I can place in a scene many times, such as an enemy or a bullet. A ScriptableObject is a data asset that does not live in a scene, such as the stats of a weapon. Many objects can read the same ScriptableObject, which saves memory and keeps settings in one place. I use prefab variants when I need small changes of one base prefab.'
      ],
      [
        'What are coroutines in Unity, and when do you use them?',
        'A coroutine is a method that returns IEnumerator and can pause with yield return, then continue on a later frame. I use it for timed steps, such as a fade or a spawn every two seconds, without a timer in Update. Coroutines run on the main thread, so they are not separate threads. A coroutine stops when its GameObject is disabled or destroyed.'
      ],
      [
        'What is object pooling, and why is it useful in Unity?',
        'Object pooling means I create a set of objects once, such as bullets, and reuse them instead of calling Instantiate and Destroy again and again. When a bullet is done, I disable it and return it to the pool. This avoids garbage collection spikes and keeps the frame rate smooth. Unity has a built-in ObjectPool class that I can use for this.'
      ],
      [
        'How do you use layers and the collision matrix in Unity physics?',
        'I put objects on layers, such as Player, Enemy and Ground. In the physics settings, the layer collision matrix decides which layers can collide, so enemy bullets can ignore other enemies. I also use a LayerMask in raycasts, so a ray only checks the layers I need. This makes physics faster and avoids strange collisions.'
      ],
      [
        'How do you build a game UI in Unity that works on different screen sizes?',
        'I use a Canvas with a Canvas Scaler set to scale with screen size and a reference resolution. I place elements with anchors, so they stay in the right corner on wide and tall screens. I keep the safe area in mind for phones with a notch. I split often-changing parts, such as a timer, onto their own canvas, so the whole UI does not rebuild every frame.'
      ],
      [
        'How do you use the Unity Profiler and reduce the build size?',
        'I connect the Profiler to a real device build and look at the CPU, rendering and memory sections to find the slowest part of a frame. The Frame Debugger shows how many draw calls a frame needs. For build size, I read the build report, compress textures and audio and remove unused assets and packages. Addressables let me load large content later instead of putting everything in the first download.'
      ]
    ],
    fresher: [
      'Awake runs first when the object loads, and Start runs once before the first frame. Update runs every frame, and FixedUpdate runs on the physics time step.',
      'A prefab is a reusable GameObject that I can place many times in a scene. A ScriptableObject is a data asset that many objects can share.',
      'A coroutine can pause with yield return and continue later, for example after one second. It runs on the main thread.'
    ],
    junior: [
      [
        'How do you move a character in Unity with physics?',
        'I add a Rigidbody and a collider to the character and read the input in Update. Then I apply the movement in FixedUpdate, for example by setting the velocity or using MovePosition. I avoid changing the transform directly on a physics object, because that can break collisions. For simple platformers I often use a CharacterController instead.'
      ],
      [
        'How do scripts talk to each other in Unity?',
        'The simplest way is a reference set in the Inspector, or GetComponent on the same object, cached in Awake. For looser links I use C# events or UnityEvents, so one script raises an event and others listen. I avoid calling Find every frame, because it is slow. A ScriptableObject can also act as a shared channel between scenes.'
      ]
    ],
    senior: [
      [
        'How do you structure a large Unity project so the team can work well?',
        'I split the code into assembly definitions, so changes compile faster and dependencies stay clear. I keep a clear folder structure and naming rules for scenes, prefabs and scripts. Scenes are split into smaller parts, so two people do not edit the same file at the same time. I use ScriptableObjects for settings and add automated tests for core game logic.'
      ],
      [
        'How do you optimize a Unity game for low-end Android phones?',
        'I profile on a real low-end phone, not in the editor. I reduce draw calls with batching and texture atlases, use compressed textures such as ASTC and lower the shadow and post-processing settings. In code I remove allocations in Update and pool objects. I also give players quality settings, so they can choose speed or better graphics.'
      ]
    ]
  },
  unreal: {
    label: 'Unreal Developer',
    role: 'Unreal Developer',
    color: '#1c1917',
    icon: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM9 8v5a3 3 0 0 0 6 0V8',
    setupRole: 'Unreal Developer',
    keywords: ['unreal', 'unreal engine', 'ue5', 'blueprints'],
    skills: [
      'C++',
      'Blueprints',
      'Unreal Engine 5',
      'Gameplay Framework',
      'Materials',
      'Animation Blueprints',
      'Replication',
      'Unreal Insights',
      'Perforce',
      'Git'
    ],
    mid: [
      [
        'When do you use Blueprints and when do you use C++ in Unreal Engine?',
        'Blueprints are visual scripts that are quick to build and easy for designers to change. C++ is faster and better for core systems, heavy logic and code that many classes share. A common approach is to write the base class in C++ and expose values and functions to Blueprints. Designers then build the details in a Blueprint child class.'
      ],
      [
        'What is the difference between an Actor and a Component in Unreal?',
        'An Actor is any object that can be placed in a level, such as a door, a light or the player. A Component is a part that adds a feature to an Actor, such as a mesh, a collision box or a health system. A Scene Component has a position, so it can be attached to other components. I build Actors from small, reusable Components instead of one large class.'
      ],
      [
        'What do GameMode, Pawn and PlayerController do in Unreal?',
        'The GameMode holds the rules of the game, such as how players join and when a match ends, and it exists only on the server. A Pawn is the body in the world that a player or the AI controls, and a Character is a Pawn with walking movement. The PlayerController reads the player input and possesses a Pawn. It stays when the Pawn dies, so the player can get a new one.'
      ],
      [
        'How does replication work in Unreal multiplayer?',
        'Unreal uses a server-authoritative model, so the server holds the true state of the game. Actors marked to replicate send chosen properties from the server to the clients. I mark a property with Replicated in its UPROPERTY and register it in GetLifetimeReplicatedProps. For actions, I use RPCs: a Server RPC sends a request from the client, and the server checks it before it acts.'
      ],
      [
        'How do you work with materials and material instances in Unreal?',
        'A material is a node graph that defines how a surface looks, such as its color, roughness and normal map. Changing a material can mean compiling new shaders, which takes time. A material instance uses a parent material and only changes exposed parameters, such as a color or a texture. I use instances for variations, because they are faster to create and cheaper at runtime.'
      ],
      [
        'Why do you mark object pointers with UPROPERTY in Unreal C++?',
        'Unreal has a garbage collector for UObjects. It only knows about a pointer when the pointer is marked with UPROPERTY, so it does not delete an object that is still in use. A raw pointer without UPROPERTY can point to an object that was already collected, which causes crashes. In Unreal Engine 5 I use TObjectPtr for these members and TWeakObjectPtr when I do not want to keep the object alive.'
      ],
      [
        'How do you profile performance in Unreal Engine?',
        'I start with the stat unit command to see whether the game thread, the render thread or the GPU is the slow part. Then I use Unreal Insights to record a session and find the expensive functions. For the GPU, I use the GPU profiler to see which passes cost the most. I always profile a packaged build on the target hardware, not only in the editor.'
      ]
    ],
    fresher: [
      'Blueprints are visual scripts that are quick to build and change. C++ is faster, so I use it for core systems and expose parts to Blueprints.',
      'An Actor is an object placed in a level, such as a door. A Component adds a feature to an Actor, such as a mesh or a collision box.',
      'The GameMode holds the game rules on the server. The PlayerController reads input and controls a Pawn, which is the body in the world.'
    ],
    junior: [
      [
        'How do you expose a C++ variable or function to Blueprints?',
        'For a variable I use UPROPERTY with specifiers such as EditAnywhere and BlueprintReadWrite, so designers can see and change it. For a function I use UFUNCTION with BlueprintCallable, so Blueprints can call it. BlueprintImplementableEvent lets the Blueprint provide the code for an event that C++ calls. I add a category, so the values are easy to find in the editor.'
      ],
      [
        'What is the Enhanced Input system in Unreal Engine 5?',
        'Enhanced Input is the input system in Unreal Engine 5. I create Input Actions, such as Jump or Move, and map keys and buttons to them in an Input Mapping Context. I can add or remove contexts at runtime, for example a different set while driving a car. Modifiers and triggers handle things like dead zones and holding a button.'
      ]
    ],
    senior: [
      [
        'How do you keep a large Unreal project fast to build and easy to change?',
        'I split the code into modules and plugins with clear dependencies. I keep headers light with forward declarations, so a change does not rebuild half the project. I agree on which logic lives in C++ and which in Blueprints, so Blueprint graphs do not grow huge. I also use data assets and data tables for settings that designers change often.'
      ],
      [
        'How do you reduce network bandwidth in an Unreal multiplayer game?',
        'I replicate only what clients really need and use conditions, such as owner only, for private data. I lower the update frequency of less important Actors and use relevancy, so far away Actors are not sent at all. I prefer replicated properties over frequent RPCs for state. I measure with the network profiling tools before and after each change.'
      ]
    ]
  },
  gamedesigner: {
    label: 'Game Designer',
    role: 'Game Designer',
    color: '#7a1f7a',
    icon: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15',
    setupRole: 'Game Designer',
    keywords: ['game design', 'level design', 'level designer', 'game mechanics'],
    skills: [
      'Game mechanics',
      'Level design',
      'Prototyping',
      'Game balance',
      'Game design documents',
      'Playtesting',
      'Unity',
      'Excel',
      'Narrative design',
      'Player psychology'
    ],
    mid: [
      [
        'What is a core loop in game design?',
        'The core loop is the main set of actions a player repeats, such as fight, collect rewards and upgrade, then fight again. It must be fun on its own, because the player spends most of the time inside it. Longer goals, such as unlocking new areas, sit on top of the core loop. When I design a game, I test the core loop first before I add more content.'
      ],
      [
        'How do you balance a game economy?',
        'I list the sources that give players currency, such as rewards, and the sinks that take it away, such as upgrades. I model the flow in a spreadsheet to see how much a player earns and spends per hour. If players earn too much, rewards lose value, and if they earn too little, they feel stuck. I check the real numbers from playtests and adjust in small steps.'
      ],
      [
        'How do you design a good level?',
        'I start with the goal of the level, such as teaching a new skill or testing what the player has learned. I build a quick blockout with simple shapes to test the layout and the pacing before any art is added. I guide the player with light, landmarks and paths instead of long text. I mix harder parts with quiet moments, so the player can rest.'
      ],
      [
        'Why do you prototype a game idea, and how do you do it?',
        'A prototype tests whether an idea is fun before the team spends months on it. I keep it fast and rough, for example a paper version of the rules or a grey box level with simple shapes. I test one question at a time, such as whether the jump feels good. If the idea is not fun, I change it or drop it early, when it is still cheap.'
      ],
      [
        'How do you run a playtest and use the feedback?',
        'I give players a clear task and watch them play without helping or explaining. I note where they get confused, stuck or bored, because what they do is often more useful than what they say. After the session I ask a few open questions. Then I look for patterns across several players before I change the design.'
      ],
      [
        'What goes into a game design document?',
        'A game design document describes the vision, the core loop, the mechanics, the controls, the levels and the progression. It also lists the target players and the platforms. I keep it short, clear and up to date, with pictures and examples, because a long document nobody reads does not help. Many teams now use a one-page summary and a wiki that grows with the game.'
      ],
      [
        'How do you design monetization in a fair and ethical way?',
        'I want players to pay because they enjoy the game, not because they feel tricked. I prefer cosmetic items and clear prices, and I avoid pay to win, where money beats skill. If there are random rewards, I show the odds clearly and follow the store rules and local laws. I am extra careful with games that children may play.'
      ]
    ],
    fresher: [
      'The core loop is the main set of actions a player repeats, such as fight, collect and upgrade. It must be fun on its own.',
      'I list where players get currency and where they spend it. I check the flow in a spreadsheet and adjust it after playtests.',
      'I start with the goal of the level and build a simple blockout first. I guide the player with light and landmarks instead of long text.'
    ],
    junior: [
      [
        'How do you make a game easy to learn but hard to master?',
        'I teach one mechanic at a time and let the player practise it in a safe place first. Then I combine mechanics in new ways, so there is more depth for skilled players. I keep the controls simple and add depth through choices, not more buttons. Playtests show me if the first minutes are clear enough.'
      ],
      [
        'How do you tell whether a game is too hard or too easy?',
        'I watch playtesters and track data, such as how many times players fail at each point and where they quit. A sudden drop in players at one level often means a difficulty spike. I compare new and experienced players, because they feel difficulty differently. Then I adjust things like enemy health, timing or checkpoints in small steps.'
      ]
    ],
    senior: [
      [
        'How do you keep the design vision clear across a large team?',
        'I write a short vision statement and a few design pillars, such as fast combat or exploration, and check every feature against them. I share them often in reviews, so everyone knows why we make each decision. When a feature does not support a pillar, I cut or change it. I also keep the design document current, so new team members can catch up.'
      ],
      [
        'How do you use player data to improve a live game?',
        'I agree on the key metrics with the team, such as retention after day one and day seven, session length and where players drop off. When a number changes, I look at the data together with player feedback to find the reason. I test changes with A/B tests where it is fair and possible. I always respect player privacy and the store rules.'
      ]
    ]
  },
  gameartist: {
    label: 'Game Artist',
    role: 'Game Artist',
    color: '#a3123a',
    icon: 'M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1.1.9-2 2-2h2a4 4 0 0 0 4-4c0-4.1-4-7.5-9-7.5zM7.5 11h.01M10 7.5h.01M15 7.5h.01',
    setupRole: 'Game Artist',
    keywords: ['game art', '3d artist', '2d artist', 'blender'],
    skills: ['Photoshop', 'Blender', 'Maya', 'Substance Painter', '2D art', '3D modeling', 'Texturing', 'Rigging', 'Animation', 'Unity'],
    mid: [
      [
        'What is your process for making a 3D game asset?',
        'I start from concept art and references, then build a high-detail model if the asset needs it. I make a low poly game model, unwrap the UVs and bake details, such as a normal map, from the high model. Then I paint PBR textures, for example in Substance Painter. Finally I export the model, often as FBX, and check it in the engine.'
      ],
      [
        'How do you create and prepare 2D sprites for a game?',
        'I draw the sprite at the right size for the game, keeping the same pixel density for all characters. I keep animations in frames of the same size and pack sprites into a sprite sheet or atlas. I set the pivot point at the right place, such as the feet of a character. Then I check the sprites in the engine, because they can look different from my drawing tool.'
      ],
      [
        'How do you optimize textures for a game?',
        'I use the smallest texture size that still looks good on screen, often in power of two sizes such as 512 or 1024. I combine small textures into an atlas to reduce draw calls. I let the engine compress textures with the right format for each platform, such as ASTC on mobile. I also turn on mipmaps for 3D objects, so far objects use smaller versions.'
      ],
      [
        'How do you rig and animate a character for a game?',
        'I build a skeleton of bones that matches the character, then skin the mesh to the bones and paint the weights, so joints bend cleanly. I add controls and inverse kinematics to make posing faster. I animate key poses first and then add timing and follow-through. I keep bone names and counts within what the engine and the target devices can handle.'
      ],
      [
        'How do you keep the art style consistent in a game?',
        'I follow a style guide with the color palette, the shapes, the line style and example images. I compare new assets side by side with approved ones in the game, not only in my tool. I use shared materials and textures where possible. When several artists work together, we review our work together regularly to stay on the same style.'
      ],
      [
        'What is a polygon budget, and how do you work within it?',
        'A polygon budget is the number of triangles an asset may use, so the game runs well on the target devices. Main characters get more triangles than small props or far background objects. I put detail where the player looks and use normal maps for small surface details instead of more polygons. I also make lower detail versions, called LODs, for when the object is far away.'
      ],
      [
        'How do you get your art working correctly in the game engine?',
        'I agree on the scale, the units and the export settings with the developers before I start. I set the correct pivot, apply transforms and use clear names before I export. In the engine I check the import settings, the materials and the lighting. I test the asset in a real level on the target device, because that is what the player will see.'
      ]
    ],
    fresher: [
      'I start from references, model the asset, unwrap the UVs and paint the textures. Then I export it and check it in the engine.',
      'I draw sprites at a consistent size and pack them into a sprite sheet. I set the pivot point and check them in the engine.',
      'I use small texture sizes that still look good and combine textures into an atlas. The engine compresses them for each platform.'
    ],
    junior: [
      [
        'What is the difference between a normal map and a height map?',
        'A normal map stores the direction of the surface for each pixel, so light reacts as if there are small bumps, without extra polygons. A height map stores how high each point is, as a grey image. Height maps are often used for displacement or for parallax effects. In games, normal maps are more common because they are cheaper to render.'
      ],
      [
        'How do you take feedback on your art from the art lead?',
        'I listen carefully and ask questions until I understand the goal behind the feedback. I write down the changes and agree on what is most important. Then I update the asset and show it again in the game, not only as a picture. Feedback helps the whole game look better, so I do not take it personally.'
      ]
    ],
    senior: [
      [
        'How do you set up an art pipeline for a new game?',
        'I agree with the tech team on the budgets for polygons, textures and materials for each platform. I write naming rules, folder rules and export settings, and I prepare templates and example assets. Where possible, we automate checks, such as texture size and naming, during import. I review the first assets in the engine early, so problems are found before many assets are made.'
      ],
      [
        'How do you plan art production when the deadline is tight?',
        'I list all the assets and sort them by how visible and important they are to the player. I use modular pieces and shared materials, so one set of parts builds many objects. I agree on a simple first version for every asset, then polish the most visible ones. I share progress and risks with the producer early, so the scope can change in time.'
      ]
    ]
  },
  gametester: {
    label: 'Game Tester',
    role: 'Game Tester',
    color: '#4c2a85',
    icon: 'M9 7a3 3 0 0 1 6 0v1H9zM7 8h10v6a5 5 0 0 1-10 0zM12 8v11M3 13h4M17 13h4M4 7l3 2M20 7l-3 2M4 19l3-2M20 19l-3-2',
    setupRole: 'Game Tester',
    keywords: ['game qa', 'game testing', 'playtester', 'video game tester'],
    skills: [
      'Test cases',
      'Bug reporting',
      'Jira',
      'Regression testing',
      'Playtesting',
      'Compatibility testing',
      'Performance testing',
      'Exploratory testing',
      'Attention to detail',
      'Communication'
    ],
    mid: [
      [
        'How do you write test cases for a new game feature?',
        'I read the design for the feature and list what the player should be able to do, such as buy an item in the shop. For each part I write steps, the expected result and edge cases, such as not enough coins or a full inventory. I also cover different devices, controls and languages if the game supports them. I keep the cases short, so other testers can run them quickly.'
      ],
      [
        'What do you include in a bug report for a game?',
        'I write a short, clear title, then the build number, the platform and the device. I add exact steps to reproduce the bug, the expected result and what actually happened. I note how often it happens, for example 3 out of 5 tries, and attach a video or screenshot. This lets the developer find and fix the bug without asking me again.'
      ],
      [
        'What is regression testing in a game project?',
        'Regression testing checks that new changes did not break things that worked before. After each new build, I run a set of important tests, such as starting the game, saving and loading and the main menus. When a bug is fixed, I test the fix and also the areas around it. This is important in games, because one change can affect many systems.'
      ],
      [
        'How do you test the performance of a game?',
        'I check the frame rate, the loading times, the memory use and the battery and heat on mobile. I test in the busiest scenes, such as many enemies or large open areas. I record the numbers on each device, so we can compare them between builds. If the frame rate drops, I report where it happens and how to reach that place.'
      ],
      [
        'How do you test a game on many different devices?',
        'I use a device list with low, mid and high-end models, different screen sizes and different operating system versions. I check that the game installs, starts, shows the UI correctly and runs smoothly on each one. I pay attention to notches, aspect ratios and controllers. When a bug appears on only one device, I note the exact model and version.'
      ],
      [
        'What is the difference between playtesting and functional game testing?',
        'Functional testing checks that the game works as designed, such as buttons, rules and saving. Playtesting checks the experience, such as whether the game is fun, clear and fair. In functional testing I follow test cases and report bugs. In playtesting I share how the game feels, where I got bored or confused and what I enjoyed.'
      ],
      [
        'How do you report balance problems you notice while testing a game?',
        'I describe the problem with facts, such as how many tries a level took or how one weapon wins every fight. I compare it with the design goal if I know it. I suggest it as feedback, not as a bug, unless the numbers are different from the design. The designers decide the change, but clear data helps them decide faster.'
      ]
    ],
    fresher: [
      'I list what the player should be able to do in the feature and write steps and expected results. I also add edge cases, such as not enough coins.',
      'I add a clear title, the build and device, the steps, the expected and actual result and a video. Then the developer can repeat the bug easily.',
      'Regression testing checks that new changes did not break old features. I test the main parts of the game in every new build.'
    ],
    junior: [
      [
        'How do you test a game feature that has no written design?',
        'I first ask the designer or the producer what the feature should do and write down the answers. Then I explore the feature freely and note anything that looks wrong or unclear. I compare it with similar features already in the game. I report open questions separately from bugs, so they are not lost.'
      ],
      [
        'A bug happens only sometimes. How do you report it?',
        'I try to repeat it many times and note what was different when it happened, such as the device, the network or the order of my actions. I record a video as soon as I see it again. In the report I write how often it happens, for example 2 out of 10 tries. I also attach logs if the build allows it.'
      ]
    ],
    senior: [
      [
        'How do you plan testing for a game launch on several platforms?',
        'I list every platform and its store requirements, because consoles and app stores have their own certification rules. I plan full test passes, regression passes and a final check of the release build. I track open bugs by severity and agree with the team which ones must be fixed before launch. I also plan testing for the first update, because players will find new issues quickly.'
      ],
      [
        'How do you decide which game bugs must be fixed before release?',
        'I look at how badly the bug affects players and how many players will see it. Crashes, lost progress, payment problems and blockers that stop players are always top priority. Small visual issues in rare places can often wait for an update. I give the team clear facts, and the producer makes the final decision with us.'
      ]
    ]
  },
  qa: {
    label: 'QA Tester',
    role: 'QA Tester',
    color: '#3d5a12',
    icon: 'M9 3h6v3H9zM7 4.5H5V21h14V4.5h-2M9 13l2 2 4-4',
    setupRole: 'QA Tester',
    keywords: ['manual testing', 'manual tester', 'software tester', 'test cases'],
    skills: ['Test cases', 'Test plans', 'Manual testing', 'Bug reporting', 'Jira', 'Regression testing', 'Exploratory testing', 'SDLC', 'STLC', 'Postman'],
    mid: [
      [
        'Which techniques do you use to design test cases?',
        'I use equivalence partitioning, where I split input into groups that should behave the same and test one value from each group. With boundary value analysis I test the edges, such as 0, 1, 99 and 100 for a field that accepts 1 to 100. For rules with many conditions I use a decision table. These techniques find more bugs with fewer test cases.'
      ],
      [
        'What is the difference between severity and priority of a bug?',
        'Severity is how much the bug affects the system, such as a crash or data loss. Priority is how soon it must be fixed, which depends on the business. A spelling mistake in the company name on the home page is low severity but high priority. A crash in a rarely used old report can be high severity but lower priority.'
      ],
      [
        'What is the difference between smoke, sanity and regression testing?',
        'Smoke testing is a quick check of the main functions on a new build, such as login and the home page, to decide if the build is stable enough to test. Sanity testing is a short, focused check after a small change or bug fix. Regression testing is wider and checks that existing features still work after changes. Smoke and sanity are fast, while regression takes more time.'
      ],
      [
        'What does a test plan contain?',
        'A test plan describes the scope, which means what we will test and what we will not test. It lists the approach, the types of testing, the environments, the people and the schedule. It also sets the entry and exit criteria, for example when testing can start and when it is complete. Finally, it lists the risks and how we will reduce them.'
      ],
      [
        'What is exploratory testing, and when is it useful?',
        'Exploratory testing means I learn the feature, design tests and run them at the same time, without fixed scripts. I use a short mission, called a charter, and a time box, such as 60 minutes, and I take notes as I go. It is useful for new features, unclear requirements and finding bugs that scripted tests miss. It works best together with planned test cases, not instead of them.'
      ],
      [
        'What are the SDLC and the STLC?',
        'The SDLC is the software development life cycle, with phases such as requirements, design, development, testing, release and maintenance. The STLC is the software testing life cycle inside it. Its phases are requirement analysis, test planning, test case design, test environment setup, test execution and test closure. Testing should start early, at the requirements stage, because bugs found early are cheaper to fix.'
      ],
      [
        'How do you test a login page?',
        'I test valid login, wrong password, unknown user and empty fields, and check that the error messages are clear and do not reveal which part was wrong. I check the password field hides the text and that login works with the Enter key. I test locking after many failed attempts, logout and what happens when the session expires. I also check it on different browsers and on a phone.'
      ]
    ],
    fresher: [
      'I split inputs into groups and test one value from each group. I also test the edges, such as the smallest and largest allowed values.',
      'Severity is how badly a bug affects the system. Priority is how soon it must be fixed for the business.',
      'Smoke testing is a quick check that a new build is stable. Sanity testing checks a small change, and regression testing checks that old features still work.'
    ],
    junior: [
      [
        'What is the life cycle of a bug?',
        'A new bug is reported and then reviewed and assigned to a developer. The developer fixes it and marks it as fixed, and then I retest it. If the fix works, I close the bug, and if not, I reopen it with details. Some bugs are marked as duplicate, rejected or deferred to a later release.'
      ],
      [
        'How do you test an API with Postman?',
        'I create a request with the method, the URL, the headers and the body, and send it. I check the status code, the response body and the response time. I write simple tests in Postman, for example that the status is 200 and a field has the right value. I also test wrong input, missing fields and missing authentication.'
      ]
    ],
    senior: [
      [
        'How do you decide what to test when time is short?',
        'I use risk-based testing. I list the features and rate them by how likely they are to fail and how much damage a failure would cause. I test the high-risk areas first, such as payments, login and new code. I tell the team clearly what was not tested, so the release decision is made with full information.'
      ],
      [
        'How do you measure and improve the quality of the testing process?',
        'I track a few useful numbers, such as bugs found after release, how long bugs stay open and test coverage of the requirements. When a bug escapes to production, I look at why our tests missed it and add a test for it. I review test cases regularly and remove ones that no longer add value. I share the results with the team and focus on learning, not blame.'
      ]
    ]
  },
  autotest: {
    label: 'Automation Tester',
    role: 'Automation Tester',
    color: '#2f4a10',
    icon: 'M5 8h14v11H5zM12 4v4M9 12h.01M15 12h.01M9 16h6M2 13h3M19 13h3',
    setupRole: 'Automation Tester',
    keywords: ['test automation', 'selenium', 'playwright', 'sdet'],
    skills: ['Playwright', 'Selenium', 'JavaScript', 'TypeScript', 'Java', 'Page Object Model', 'API testing', 'Postman', 'CI/CD', 'Git'],
    mid: [
      [
        'What is the difference between Playwright and Selenium?',
        'Selenium is an older and very widely used tool that controls browsers through the WebDriver standard and supports many languages. Playwright is newer, from Microsoft, and controls Chromium, Firefox and WebKit directly. Playwright waits for elements automatically and includes tracing, screenshots and parallel runs out of the box. I choose based on the project, the team language and the browsers we must support.'
      ],
      [
        'How do you choose good locators in UI automation?',
        'I prefer locators that match what the user sees, such as the role and the name of a button, or a stable test id added by the developers. I avoid long XPath or CSS paths that depend on the page layout, because they break when the design changes. In Playwright I use getByRole and getByTestId. Good locators are the main way to make tests stable.'
      ],
      [
        'How do you handle waits in automated tests?',
        'I never use fixed sleeps, because they make tests slow and still fail when the app is slower than expected. In Selenium I use explicit waits, which wait for a condition, such as an element being clickable. Playwright waits automatically before actions and has assertions that retry until they pass or time out. I wait for the right condition, such as a loaded response, not for time.'
      ],
      [
        'What is the Page Object Model?',
        'The Page Object Model puts the locators and actions of each page into its own class, such as a LoginPage with a login method. Tests call these methods instead of using locators directly. When the page changes, I update one class instead of many tests. It makes tests shorter, easier to read and easier to maintain.'
      ],
      [
        'How do you run automated tests in a CI pipeline?',
        'I add a step to the pipeline, for example in GitHub Actions or Jenkins, that installs the dependencies and runs the tests in headless browsers on every pull request. I run tests in parallel to keep the time short. The pipeline saves reports, screenshots and traces of failed tests as artifacts. A failing test blocks the merge, so problems are found before release.'
      ],
      [
        'How do you automate API tests?',
        'I send requests to the API in code, for example with the Playwright request context or REST Assured in Java, and check the status code, the response body and the schema. I cover valid requests, invalid input, missing authentication and edge cases. API tests are faster and more stable than UI tests, so I test most rules at the API level. I keep only the main user journeys as UI tests.'
      ],
      [
        'What causes flaky tests, and how do you fix them?',
        'A flaky test passes and fails on the same code. Common causes are timing problems, tests that depend on each other, shared test data and unstable test environments. I find the cause using traces, logs and by running the test many times. Then I fix the root cause, such as a better wait or independent test data, instead of just adding retries.'
      ]
    ],
    fresher: [
      'Selenium is an older, widely used tool that uses WebDriver and many languages. Playwright is newer and waits for elements automatically.',
      'I use locators that match what the user sees, such as a button name, or a stable test id. I avoid long XPath paths that break easily.',
      'I avoid fixed sleeps and wait for a condition instead, such as an element being visible. Playwright waits automatically before actions.'
    ],
    junior: [
      [
        'How do you manage test data in automated tests?',
        'Each test creates the data it needs, for example a new user through the API, so tests do not depend on each other. I clean up the data after the test or use a fresh test environment. I keep fixed data, such as product names, in separate files instead of inside the test code. Passwords and keys come from environment variables, not from the code.'
      ],
      [
        'Which tests should you automate first?',
        'I start with tests that run often and give the most value, such as smoke tests and the main user journeys, for example login and checkout. Stable features are better to automate than features that change every week. Tests that are slow or boring to run by hand are also good candidates. Some checks, like how a page looks and feels, are still better done by a person.'
      ]
    ],
    senior: [
      [
        'How do you design a test automation framework for a team?',
        'I choose the tools with the team, based on the app, the language and the CI setup. I structure the framework in layers, with page objects, API helpers, test data builders and shared configuration for each environment. I add clear reports, traces for failures and parallel runs from the start. I write guidelines and review test code like production code, so the framework stays clean.'
      ],
      [
        'How do you keep a large automated test suite fast and reliable?',
        'I follow the test pyramid, with many unit and API tests and fewer UI tests. I run tests in parallel and split them across machines in the pipeline. I track flaky tests, fix them quickly and remove tests that no longer add value. I run a fast smoke set on every pull request and the full suite on a schedule, such as every night.'
      ]
    ]
  },
  ba: {
    label: 'Business Analyst',
    role: 'Business Analyst',
    color: '#3b4a5e',
    icon: 'M3 21h18M6 17v-6M11 17V7M16 17v-4M20 17V4',
    setupRole: 'Business Analyst',
    keywords: ['business analysis', 'brd', 'requirements', 'process mapping'],
    skills: ['Requirements gathering', 'User stories', 'BRD', 'Process mapping', 'BPMN', 'Stakeholder management', 'Jira', 'Excel', 'SQL', 'UAT'],
    mid: [
      [
        'How do you gather requirements from stakeholders?',
        'I start by learning the business goal and who is affected. Then I use the right techniques, such as interviews, workshops, watching people do their work and reading existing documents. I ask open questions and write down what I hear, then confirm it with the stakeholders. I also look for the problem behind each request, not only the solution people ask for.'
      ],
      [
        'How do you write a good user story with acceptance criteria?',
        'A user story describes a need from the user point of view, for example: As a customer, I want to save my cart, so that I can buy later. It should be small enough for one sprint and easy to test. Acceptance criteria list the conditions that must be true, often written as Given, When, Then. They help the developers and the testers agree on what done means.'
      ],
      [
        'What is the difference between a BRD and an FRD?',
        'A BRD, or business requirements document, explains what the business needs and why, such as reducing order errors by half. It is written for business stakeholders. An FRD, or functional requirements document, explains how the system must behave to meet those needs, such as the fields and rules of a form. It is written mainly for the development and testing teams.'
      ],
      [
        'How do you identify and manage stakeholders on a project?',
        'I list everyone who is affected by the project or can influence it. I place them on a power and interest grid, so I know whom to manage closely and whom to keep informed. I agree on how often and how I will update each group. I keep good relations and record decisions, so there is no confusion later.'
      ],
      [
        'How do you map a business process?',
        'I first map the current process, the as-is, by talking to the people who do the work and watching it. I draw it as a flowchart or in BPMN, with swimlanes that show who does each step. Then I mark the delays, repeated work and errors. Together with the team, I design the improved process, the to-be.'
      ],
      [
        'What is gap analysis, and how do you do it?',
        'Gap analysis compares where the business is now with where it wants to be. I describe the current state and the target state, for example in processes, systems or skills. The difference between them is the gap. Then I list the actions needed to close each gap and agree on their priority with the stakeholders.'
      ],
      [
        'What is your role in user acceptance testing?',
        'In UAT, real business users check that the system meets their needs before it goes live. I help prepare the test scenarios from the requirements and the user stories. I support the users during testing, record the issues and work with the team to decide which ones must be fixed. At the end, I help collect the formal sign-off.'
      ]
    ],
    fresher: [
      'I learn the business goal first. Then I use interviews, workshops and existing documents, and I confirm what I wrote with the stakeholders.',
      'A user story describes a need from the user view: As a user, I want something, so that I get a benefit. Acceptance criteria say when it is done.',
      'A BRD explains what the business needs and why. An FRD explains how the system must work to meet those needs.'
    ],
    junior: [
      [
        'How do you handle requirements that change during a project?',
        'I accept that change is normal, but I manage it. I record each change, check its effect on scope, time and cost and discuss it with the right stakeholders. Once it is approved, I update the documents and the backlog and tell the team. This keeps everyone working from the same version.'
      ],
      [
        'How do you use SQL or Excel in business analysis?',
        'I use them to check facts with data instead of opinions. With SQL I pull data, such as the number of failed orders by region, to understand a problem. In Excel I clean the data, build pivot tables and simple charts for stakeholders. Data helps me confirm requirements and measure results after a change.'
      ]
    ],
    senior: [
      [
        'How do you handle stakeholders who want conflicting things?',
        'I bring them together and focus the talk on the shared business goal and the facts. I show the effect of each option on cost, time, risk and value. If they still disagree, I agree on who makes the final decision, such as the sponsor. I record the decision and the reasons, so it does not come back later.'
      ],
      [
        'How do you show the value of a project after it goes live?',
        'Before the project starts, I agree on measurable goals, such as a shorter processing time or fewer complaints. I record the baseline numbers before the change. After go-live, I measure the same numbers and compare them. I share the results with the stakeholders, along with lessons learned for the next project.'
      ]
    ]
  },
  pm: {
    label: 'Product Manager',
    role: 'Product Manager',
    color: '#1e293b',
    icon: 'M4 21V4M4 4h12l-2 4 2 4H4',
    setupRole: 'Product Manager',
    keywords: ['product management', 'roadmap', 'mvp', 'product strategy'],
    skills: [
      'Product roadmap',
      'Prioritization',
      'User research',
      'Product metrics',
      'A/B testing',
      'Agile',
      'Jira',
      'Figma',
      'Market research',
      'Stakeholder management'
    ],
    mid: [
      [
        'How do you build and share a product roadmap?',
        'I start from the product vision and the goals for the next period, such as growing retention. I list the problems we want to solve, not a fixed list of features with exact dates. A simple now, next and later format works well, because plans change as we learn. I share the roadmap with the team and stakeholders and update it regularly.'
      ],
      [
        'How do you prioritize features with RICE or MoSCoW?',
        'RICE gives each idea a score: reach times impact times confidence, divided by effort. It helps me compare very different ideas with the same rule. MoSCoW sorts work into must have, should have, could have and will not have this time, which is useful for a fixed release. I use the scores to guide the talk with the team, not to replace judgement.'
      ],
      [
        'What is an MVP, and how do you decide what goes into it?',
        'An MVP, or minimum viable product, is the smallest version that solves the main problem well enough to learn from real users. I start from the one problem we want to test and the main user journey for it. Everything that is not needed for that journey waits for later. The goal is learning quickly, not shipping a weak product.'
      ],
      [
        'Which metrics do you use to measure product success?',
        'I choose one main metric that shows the value users get, sometimes called the North Star metric. I add supporting metrics, such as activation, retention, conversion and how often people use the key feature. I watch some guardrail metrics too, such as crashes or support tickets, so a gain in one area does not hurt another. I always connect the metrics to the product goals.'
      ],
      [
        'How do you do user research as a product manager?',
        'I talk to real users and ask about what they did in the past, not what they might want, because past behaviour is more reliable. I run usability tests, where I watch people use a prototype or the product. I combine this with data, such as where users drop off. I share the main findings with the team, often with short clips or quotes.'
      ],
      [
        'How do you work with the engineering team?',
        'I bring engineers in early, when we discuss the problem, not only when the design is ready. I explain the why, the user need and the goal, and let them suggest how to solve it. I keep the backlog clear and the priorities stable during a sprint. When there are trade-offs between scope and time, we decide them together.'
      ],
      [
        'How do you say no to a feature request?',
        'I thank the person and try to understand the problem behind the request. Then I explain how it compares with our current goals and priorities, using data where I can. I often say not now instead of never, and I record the idea for later. If there is a smaller way to help, I offer it.'
      ]
    ],
    fresher: [
      'I start from the product vision and goals and list the problems we want to solve. A now, next and later roadmap is simple and easy to update.',
      'RICE scores ideas by reach, impact and confidence divided by effort. MoSCoW sorts work into must, should, could and will not have.',
      'An MVP is the smallest product that solves the main problem well enough to learn from users. Everything else waits for later.'
    ],
    junior: [
      [
        'How do you write a clear product requirement for a new feature?',
        'I start with the problem, the users and the goal, and how we will measure success. Then I describe the main user flows and the important rules and edge cases. I add designs or simple sketches and list open questions. I review it with design and engineering before the work starts, so we agree on the scope.'
      ],
      [
        'How do you use A/B testing to make product decisions?',
        'I write a clear hypothesis first, such as a shorter sign-up form will raise completed sign-ups. Users are split at random into the current version and the new version. I decide the main metric and the needed sample size before the test starts. I wait until the test is complete and check the result is significant before I decide.'
      ]
    ],
    senior: [
      [
        'How do you set the product strategy for the next year?',
        'I look at the market, the competitors, the company goals and what we learned from users and data. From this I choose a few clear bets that support the company goals, and I explain what we will not do. I turn the bets into measurable goals for the teams. I review the strategy every quarter, because the market can change.'
      ],
      [
        'How do you decide to stop or remove a product feature?',
        'I look at how many users use the feature, how much value it brings and how much it costs to maintain. If usage is low and the cost is high, removing it can make the product simpler. I talk to the users who rely on it and plan a clear notice and an alternative. Then I remove it in steps and watch the feedback.'
      ]
    ]
  },
  po: {
    label: 'Product Owner',
    role: 'Product Owner',
    color: '#11607a',
    icon: 'M9 6h12M9 12h12M9 18h12M3 6l1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17',
    setupRole: 'Product Owner',
    keywords: ['product owner', 'scrum', 'product backlog', 'sprint'],
    skills: [
      'Scrum',
      'Backlog management',
      'User stories',
      'Acceptance criteria',
      'Sprint planning',
      'Jira',
      'Stakeholder management',
      'Agile',
      'Prioritization',
      'Definition of Done'
    ],
    mid: [
      [
        'How do you manage the product backlog?',
        'I keep the backlog ordered, so the most valuable items are at the top and ready for the next sprints. Items near the top are small and clear, with acceptance criteria, while items further down can be rough ideas. I refine the backlog regularly with the team and remove items that are no longer useful. The backlog is visible to everyone, so stakeholders can see what is planned.'
      ],
      [
        'What is your role in sprint planning?',
        'I bring a proposed sprint goal and the top backlog items, already refined. I explain why each item matters and answer questions about the details. The developers decide how much work they can take on and how to do it. Together we agree on the sprint goal, so everyone knows what the sprint is for.'
      ],
      [
        'How do you decide whether a user story is accepted?',
        'I check the work against the acceptance criteria of the story and the team definition of done. I try it myself, ideally during the sprint, not only at the end, so there is time to fix small issues. If something is missing, I explain clearly what is not met. New ideas that come up become new backlog items instead of changes to the finished story.'
      ],
      [
        'How do you keep stakeholders aligned on the product direction?',
        'I share the product goal and the roadmap and explain the reasons behind the priorities. I invite stakeholders to the sprint review, where they see working software and give feedback. I meet key stakeholders regularly to hear their needs early. When needs conflict, I make the decision openly and explain it.'
      ],
      [
        'How do you balance value and effort when you order the backlog?',
        'I estimate the value of each item with stakeholders, for example through customer impact, revenue or risk reduction. The developers estimate the effort. Items with high value and low effort usually go first, while high effort items are split into smaller parts. I also consider dependencies and deadlines, such as a legal change.'
      ],
      [
        'What is the difference between the definition of done and acceptance criteria?',
        'The definition of done is a shared quality checklist for every item, such as code reviewed, tested and documented. Acceptance criteria are specific to one user story and describe what that story must do. A story is complete only when it meets both. The team owns the definition of done, while I write the acceptance criteria with the team.'
      ],
      [
        'What is the difference between a product owner and a scrum master?',
        'The product owner is responsible for the value of the product and for ordering the product backlog. The scrum master helps the team use Scrum well and removes problems that slow the team down. The product owner decides what is built first, while the scrum master helps with how the team works. Both support the developers, but they have different focus.'
      ]
    ],
    fresher: [
      'I keep the backlog ordered by value, with clear and small items at the top. I refine it with the team regularly.',
      'I bring the sprint goal and the top backlog items to sprint planning. The developers decide how much work they can take on.',
      'I check the story against its acceptance criteria and the definition of done. If something is missing, I explain it clearly.'
    ],
    junior: [
      [
        'How do you split a large user story into smaller ones?',
        'I split it by user flow steps, by business rules or by types of data, so each smaller story still gives value to the user. For example, I can deliver payment by card first and other payment types later. Each story should still be testable on its own. I avoid splitting by technical layers, such as only the database part, because that gives no user value alone.'
      ],
      [
        'What happens in a sprint review?',
        'The team shows the work completed in the sprint to stakeholders, usually as a live demo. Stakeholders give feedback and we discuss what changed in the market or the business. I update the backlog based on what we learned. It is a working session to inspect and adapt, not just a presentation.'
      ]
    ],
    senior: [
      [
        'How do you manage a product backlog shared by several teams?',
        'I keep one backlog for the product, so all teams work toward the same goal. We refine the top items together and agree which team takes which part, keeping dependencies visible. I work closely with the other product owners if there are any, so priorities do not clash. Regular joint reviews show the integrated product, not separate team results.'
      ],
      [
        'How do you handle a stakeholder who wants to add work in the middle of a sprint?',
        'I listen to understand how urgent and valuable the request really is. If it can wait, I add it to the backlog and consider it for the next sprint. If it is truly urgent, I discuss it with the team and remove other work of similar size, so the sprint goal is still possible. If the sprint goal no longer makes sense, I can cancel the sprint, but that is rare.'
      ]
    ]
  },
  sysadmin: {
    label: 'System Administrator',
    role: 'System Administrator',
    color: '#2f3e4e',
    icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01M12 7h4M12 17h4',
    setupRole: 'System Administrator',
    keywords: ['sysadmin', 'system admin', 'windows server', 'linux admin'],
    skills: [
      'Linux',
      'Windows Server',
      'Active Directory',
      'Bash',
      'PowerShell',
      'Backup and recovery',
      'Monitoring',
      'Patching',
      'Networking',
      'Virtualization'
    ],
    mid: [
      [
        'A service on a Linux server has stopped. How do you find out why?',
        'I check its status with systemctl status, which shows if it is running and the last log lines. Then I read the full logs with journalctl for that service and the application log files. I check common causes, such as a full disk with df, high memory use, a wrong config file or a port already in use. After I fix the cause, I restart the service and confirm it works.'
      ],
      [
        'How do you manage users and file permissions on Linux and Windows servers?',
        'On Linux I create users, add them to groups and set file permissions with chmod and chown, using read, write and execute for the owner, the group and others. Admin access goes through sudo instead of shared root logins. On Windows I use NTFS permissions and give access to groups, not single users. I follow least privilege and remove access when people change roles.'
      ],
      [
        'What backup strategy do you use for company servers?',
        'I follow the 3-2-1 rule: three copies of the data, on two different types of storage, with one copy offsite or in the cloud. I protect at least one copy from changes, for example an immutable or offline backup, in case of ransomware. I schedule backups based on how much data the business can afford to lose. Most importantly, I test restores regularly, because a backup that cannot be restored is useless.'
      ],
      [
        'What do you monitor on servers, and which tools do you use?',
        'I monitor CPU, memory, disk space, disk speed, network traffic and whether key services are running. I also watch logs for errors and failed logins. Tools such as Zabbix, Prometheus with Grafana or the cloud monitoring service collect the data and show dashboards. I set alerts with sensible limits, so the team hears about real problems without too much noise.'
      ],
      [
        'How do you plan patching for Windows and Linux servers?',
        'I keep a list of all servers and check for new updates regularly, with security patches first. I test patches on a test server or a small group before I roll them out widely. I install them in an agreed maintenance window, with a backup or snapshot taken first. On Windows I use an update tool such as Azure Update Manager or WSUS, and on Linux the package manager, such as apt or dnf.'
      ],
      [
        'How do you use groups and Group Policy in Active Directory?',
        'I organize users and computers into organizational units, such as by department. I give permissions to security groups, then add users to the groups, which is easier to manage than single users. Group Policy lets me apply settings to many computers at once, such as password rules, screen lock or mapped drives. I test a new policy on a small unit before linking it widely.'
      ],
      [
        'How do you automate repeated admin tasks?',
        'I write scripts in Bash on Linux and in PowerShell on Windows for tasks such as creating users, cleaning old logs or checking disk space. I schedule them with cron on Linux and Task Scheduler on Windows. Scripts log what they did and handle errors, so failures are easy to see. I keep the scripts in version control, so changes are tracked and shared.'
      ]
    ],
    fresher: [
      'I check the service with systemctl status and read its logs with journalctl. I also check the disk, the memory and the config file.',
      'On Linux I use groups and set permissions with chmod and chown. On Windows I give NTFS permissions to groups and follow least privilege.',
      'I follow the 3-2-1 rule: three copies, two types of storage and one copy offsite. I also test restores regularly.'
    ],
    junior: [
      [
        'A Linux server is running out of space. How do you find what is using it?',
        'I run df -h to see which file system is full, then du to find the largest folders, for example with du -sh on each folder and sorting the result. Common causes are large log files, old backups or temporary files. I also check for deleted files that a running process still holds open, with lsof. I clean up safely and set up log rotation, so it does not happen again.'
      ],
      [
        'How do you connect to and manage remote servers securely?',
        'For Linux I use SSH with key-based login and turn off password login and direct root login. For Windows I use Remote Desktop or PowerShell remoting, only over a VPN or a secure gateway, not open to the internet. I use strong, unique credentials and multi-factor authentication where possible. I also limit which IP addresses can connect.'
      ]
    ],
    senior: [
      [
        'How do you harden a new server before it goes into production?',
        'I install only the needed software and services and close all unused ports with the firewall. I apply the latest patches, use secure remote access and set strong account and password policies. I turn on logging and send logs to a central system. I follow a standard baseline, such as the CIS benchmarks, and check the server against it.'
      ],
      [
        'How do you manage changes to production servers safely?',
        'I plan each change with a clear description, the risk, the steps and a rollback plan. Bigger changes go through a change approval process and are done in a maintenance window. I take a backup or snapshot first and tell the affected users. After the change, I check that everything works and record what was done.'
      ]
    ]
  },
  // ---- PR F: Design, Video and Animation, and Writing roles (parents: UI/UX Design, Video and
  // Animation, Content and Writing)
  uiux: {
    label: 'UI/UX Design',
    role: 'UI/UX Designer',
    color: '#b0165f',
    icon: 'M4 4h16v12H4zM4 8h16M9 20h6M12 16v4',
    setupRole: 'UI/UX Designer',
    keywords: ['ui/ux designer', 'figma', 'wireframe', 'user interface'],
    skills: [
      'Figma',
      'Wireframing',
      'Prototyping',
      'User flows',
      'Design systems',
      'Accessibility',
      'Visual hierarchy',
      'Usability testing',
      'Auto layout',
      'Developer handoff'
    ],
    mid: [
      [
        'What steps do you follow to design a new screen or feature?',
        'I start by understanding the problem, the users and the goal, often with a little research. Then I map the user flow and sketch low-fidelity wireframes to try ideas quickly. I turn the best idea into a clickable prototype and test it with a few users. I improve the design from what I learn before I make the final screens.'
      ],
      [
        'What is a user flow, and why do you make one?',
        'A user flow shows the steps a user takes to finish a task, such as signing up or paying. It includes each screen, the choices and the error paths. It helps me find extra steps and dead ends before I design any screen. It also helps developers and testers see the whole journey.'
      ],
      [
        'How do you create visual hierarchy on a screen?',
        'I decide what the user must see first, such as the main heading or the main button. I use size, weight, colour and position to make that element stand out. Spacing groups related items and separates the rest. If everything looks important, nothing stands out, so I keep only one main action per screen.'
      ],
      [
        'How do you set up components and tokens for a design system in Figma?',
        'I start with tokens, such as colours, type styles and spacing, stored as Figma variables and styles. Then I build components with variants and auto layout, such as buttons, inputs and cards. I write simple usage notes for each component and keep the design system in a shared library. Changes are reviewed and announced, so every designer and developer uses the same version.'
      ],
      [
        'How do you design for accessibility and colour contrast?',
        'I follow WCAG, so normal text has a contrast ratio of at least 4.5 to 1 and large text and icons at least 3 to 1. I never use colour alone to show meaning, for example I add an icon or text to an error. I make touch targets large enough and keep a clear focus order for keyboard and screen reader users. I check my designs with contrast tools before handoff.'
      ],
      [
        'How do you prepare a Figma file so developers can build it?',
        'I name layers and frames clearly and use components and auto layout, so spacing is easy to read. I mark which screens are ready, using Dev Mode or a clear status label. I show all states, such as empty, loading, error and hover, and add notes for behaviour. I also meet the developers early and answer their questions during the build.'
      ],
      [
        'Which Figma features do you use most in your work?',
        'I use frames and auto layout to build screens that resize correctly. Components and variants keep repeated parts consistent, and variables store colours and spacing for themes such as dark mode. I use prototyping links and smart animate to make clickable flows for testing. Comments help me collect feedback from the team in one place.'
      ]
    ],
    fresher: [
      'I start with the problem and the users, then I map the flow and sketch wireframes. I build a prototype, test it with users and improve it.',
      'A user flow shows the steps a user takes to finish a task, such as signing up. It helps me find extra steps before I design the screens.',
      'I make the most important thing on the screen stand out with size, colour and position. I use spacing to group related items.'
    ],
    junior: [
      [
        'What is the difference between a wireframe, a mockup and a prototype?',
        'A wireframe is a simple layout in grey boxes that shows structure and content, not style. A mockup is a static, high-fidelity design with real colours, fonts and images. A prototype is clickable, so people can try the flow as if it were the real product. I move from wireframe to prototype as the idea becomes clearer.'
      ],
      [
        'How do you design a form that is easy to complete?',
        'I ask only for the information that is really needed and group related fields. Each field has a visible label, not only a placeholder, and the keyboard type matches the input on phones. I show errors next to the field in plain words as soon as it helps. The main button clearly says what happens next, such as Create account.'
      ]
    ],
    senior: [
      [
        'How do you raise the quality of design across a product team?',
        'I set shared principles and a design system, so quality does not depend on one person. I run regular design reviews with clear criteria, such as accessibility and consistency. I pair with newer designers and give specific, kind feedback. I also measure usability problems and track them like bugs, so they get fixed.'
      ],
      [
        'How do you balance user needs, business goals and technical limits in a design?',
        'I make the user problem and the business goal clear before I start, and I involve engineers early to learn the limits. I explore a few options and show the trade-offs of each one in time, cost and user value. Often a simpler first version solves most of the problem. I explain my recommendation and the reasons behind it.'
      ]
    ]
  },
  uxresearch: {
    label: 'UX Researcher',
    role: 'UX Researcher',
    color: '#9d2b6b',
    icon: 'M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM20 20l-5.6-5.6M10 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14c.6-1.5 1.8-2 3-2s2.4.5 3 2',
    setupRole: 'UX Researcher',
    keywords: ['ux research', 'user research', 'usability study', 'user interviews'],
    skills: [
      'User interviews',
      'Usability testing',
      'Surveys',
      'Personas',
      'Journey maps',
      'Affinity mapping',
      'Research planning',
      'Recruiting participants',
      'Data analysis',
      'Storytelling'
    ],
    mid: [
      [
        'How do you plan and run a user interview?',
        'I start with clear research questions and write a short guide with open questions, such as tell me about the last time you did this. I ask about real past behaviour, not about what people might do in the future. During the interview I listen more than I talk and ask follow-up questions like why and what happened next. I record with permission and take notes on quotes and key moments.'
      ],
      [
        'How do you run a usability test?',
        'I give participants realistic tasks, such as find and buy a product, and ask them to think aloud. I watch where they hesitate, make mistakes or give up, without helping them. Five to eight participants per round often find most of the big problems. I note how many people completed each task and the main issues I saw.'
      ],
      [
        'When do you use a survey and when do you use interviews?',
        'Interviews help me understand why people do things, with rich detail from a small group. Surveys help me measure how common something is across many people. I often use interviews first to find the important topics and then a survey to check how widely they apply. I keep survey questions short, neutral and easy to answer.'
      ],
      [
        'How do you create personas and journey maps that people actually use?',
        'I base them on real research data, not on guesses, and keep them short. A persona shows the goals, needs and frustrations of a group of users. A journey map shows the steps, feelings and pain points of a user over time, such as from first visit to purchase. I share them in workshops and link them to real decisions, so the team keeps using them.'
      ],
      [
        'How do you recruit the right participants for research?',
        'I define who I need, based on behaviour, such as people who shop online every week, not only on age. I write a short screener survey to filter the right people and avoid people who join many studies. I offer fair incentives and explain how their data will be used. I aim for a mix of people, so the results are not one-sided.'
      ],
      [
        'How do you turn research notes into clear findings?',
        'I collect observations and quotes on notes, then group them in an affinity map to find patterns. I separate what I saw from how I explain it. I rank findings by how many people they affect and how serious they are. Then I share a short summary with evidence, such as clips and quotes, and clear recommendations.'
      ],
      [
        'How do you reduce bias in your research?',
        'I avoid leading questions, so I ask how did you find this step instead of was this step easy. I recruit a varied group, so the results do not reflect only one type of user. I look for evidence that disagrees with my ideas, not only evidence that supports them. When I can, a colleague reviews my guide and my findings.'
      ]
    ],
    fresher: [
      'I write a short guide with open questions about real past behaviour. I listen more than I talk and record only with permission.',
      'I give people real tasks and ask them to think aloud while I watch. I note where they get stuck without helping them.',
      'Interviews explain why people do things, with a small group. Surveys measure how common something is across many people.'
    ],
    junior: [
      [
        'What is the difference between qualitative and quantitative research?',
        'Qualitative research collects words and observations, such as interviews and usability tests, to understand why. Quantitative research collects numbers, such as survey results and analytics, to measure how many or how much. They answer different questions, so I often use both. For example, analytics shows where users drop off and interviews explain the reason.'
      ],
      [
        'How do you protect participant privacy in research?',
        'I explain the study and get clear consent before recording anything. I store recordings and notes securely and share only what the team needs. In reports I remove names and other details that could identify a person. I delete the data when the agreed time is over.'
      ]
    ],
    senior: [
      [
        'How do you decide which research method to use for a project?',
        'I start from the decision the team needs to make and the questions behind it. Early on, when we do not understand the problem, I use interviews or field studies. When we have a design, I use usability tests, and when we need numbers, I use surveys or analytics. I also consider time, budget and the risk of getting it wrong.'
      ],
      [
        'How do you make sure research findings change product decisions?',
        'I involve product managers and designers from the planning stage, so they care about the results. I invite them to watch sessions, because seeing users struggle is very convincing. I share short, clear findings with recommendations at the right time, before decisions are made. I also keep a research library, so past findings are easy to find later.'
      ]
    ]
  },
  productdesign: {
    label: 'Product Designer',
    role: 'Product Designer',
    color: '#7c2d5a',
    icon: 'M12 2l9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5',
    setupRole: 'Product Designer',
    keywords: ['product design', 'end-to-end design', 'design critique', 'problem framing'],
    skills: [
      'Problem framing',
      'User research',
      'Interaction design',
      'Prototyping',
      'Figma',
      'Design systems',
      'Product metrics',
      'A/B testing',
      'Design critique',
      'Collaboration'
    ],
    mid: [
      [
        'How do you frame a problem before you start designing?',
        'I write a short problem statement that says who has the problem, what it is and why it matters. I check it with research and data, so I am solving a real problem. I also agree on what success looks like, such as fewer failed sign-ups. A clear problem stops the team from jumping to a solution too early.'
      ],
      [
        'How do you work with product managers and engineers?',
        'I join planning early, so design, product and engineering agree on the problem together. I share rough ideas often, instead of waiting for a perfect design. Engineers help me understand what is easy or hard to build, and product managers help with priorities. I stay involved during the build and review the work before release.'
      ],
      [
        'How do you design the first version of a new feature?',
        'I find the one main job the feature must do well and design the simplest flow for it. I leave nice-to-have parts for later and write them down, so they are not lost. I test the core flow with users before we build it. After release I watch how people use it and plan the next improvements.'
      ],
      [
        'How do you use metrics to judge a design change?',
        'Before the change, I agree on the metric we want to improve, such as task completion or conversion, and record the current number. Where possible we run an A/B test, so we compare the new design with the old one fairly. I also watch guardrail metrics, so a gain in one place does not hurt another. Numbers show what changed, and research helps explain why.'
      ],
      [
        'How do you run a design critique?',
        'I start by sharing the goal of the design and the type of feedback I need, such as feedback on the flow, not on colours. People give feedback about the goal and the users, not about personal taste. I take notes, ask questions and do not defend every choice. After the session I decide what to change and share the next version.'
      ],
      [
        'How do you handle trade-offs when time is short?',
        'I list the options and show what each one costs and what users gain. I protect the parts that matter most to users, such as clarity and accessibility, and simplify the rest. Sometimes I design a full version and a smaller first step, so the team can choose. I make the trade-off visible, so it is a shared decision.'
      ],
      [
        'What does end-to-end ownership mean for a product designer?',
        'It means I own the design from the first problem to the result after launch. I take part in research, define the flows, design the screens and support the developers during the build. After release, I check the data and feedback to see whether the problem is solved. If not, I keep improving it instead of moving on.'
      ]
    ],
    fresher: [
      'I write who has the problem, what it is and why it matters. I check it with research and agree on what success looks like.',
      'I join planning early and share rough ideas often. Engineers tell me what is hard to build, and product managers help with priorities.',
      'I design the simplest flow for the main job of the feature. I test it with users and leave extra parts for later.'
    ],
    junior: [
      [
        'How do you present your design to stakeholders?',
        'I start with the problem and the goal, then show the user flow before the details. I explain the main decisions and the reasons behind them, using research or data where I can. I show the prototype instead of only still screens. I end with the open questions and the decisions I need from them.'
      ],
      [
        'How do you design empty, error and loading states?',
        'An empty state explains what will appear there and gives a clear first action, such as add your first project. An error message says what went wrong in plain words and how to fix it, without blaming the user. Loading states show progress, for example with a skeleton screen, so the app does not look broken. I design these states together with the main screen, not at the end.'
      ]
    ],
    senior: [
      [
        'How do you set the design direction for a product area?',
        'I gather research, data and the business goals and look for the biggest user problems. I create a vision, often as a few key screens or a short video, to show where the product could go. I break it into steps the team can deliver and agree on them with product and engineering. I check the direction regularly and adjust it when we learn something new.'
      ],
      [
        'How do you help grow other designers on the team?',
        'I give specific feedback that explains the reason, not just my opinion. I let designers own real problems and support them instead of taking over. I share how I think through problems in reviews and pairing sessions. I also help them present their work, so they build confidence with stakeholders.'
      ]
    ]
  },
  video: {
    label: 'Video Editor',
    role: 'Video Editor',
    color: '#b91c3c',
    icon: 'M4 10h16v10H4zM4 10l1.5-5.5h15L19 10M9.5 4.5 8 10M15 4.5 13.5 10',
    setupRole: 'Video Editor',
    keywords: ['video editing', 'premiere pro', 'davinci resolve', 'capcut'],
    skills: [
      'Premiere Pro',
      'DaVinci Resolve',
      'CapCut',
      'Final Cut Pro',
      'Color correction',
      'Audio cleanup',
      'Storytelling',
      'Pacing',
      'Export settings',
      'File organization'
    ],
    mid: [
      [
        'What is your workflow when you edit a video from start to finish?',
        'I read the brief and organize the footage, audio and graphics into clear folders and bins. I build a rough cut to get the story right, then a fine cut to fix timing and pacing. After that I add music, graphics, color correction and audio cleanup. I export a review copy, collect feedback and then deliver the final versions.'
      ],
      [
        'How do you decide where to cut and how to set the pacing?',
        'I cut when the action or the idea is complete, or to show a reaction that adds meaning. I use J-cuts and L-cuts, where the sound starts before or continues after the picture, to make scenes flow smoothly. Fast cuts suit energetic content, while slower cuts give emotional moments time. I watch the edit again with fresh eyes to find parts that drag.'
      ],
      [
        'What is the difference between color correction and color grading?',
        'Color correction fixes problems, so the footage looks natural and every shot matches, such as white balance and exposure. Color grading comes after and gives the video its mood or style, such as warm or cool tones. I use scopes, such as the waveform and the vectorscope, instead of trusting only my screen. In DaVinci Resolve I often use nodes to keep these steps separate.'
      ],
      [
        'How do you clean up and balance audio in a video?',
        'I remove background noise and hum with noise reduction, without making the voice sound robotic. I set clear dialogue levels and lower the music under speech, often with automatic ducking. I check the final loudness, because platforms such as YouTube normalize loud videos. Good audio matters a lot, because people stop watching when the sound is bad.'
      ],
      [
        'Which export settings do you use for different platforms?',
        'For most online platforms I export MP4 with H.264, or H.265 for smaller files, at the frame rate I shot in. For YouTube I use 16:9, such as 1920 by 1080 or 4K, and for Reels, TikTok and Shorts I use vertical 9:16 at 1080 by 1920. I keep text and faces inside the safe area, so the app buttons do not cover them. I also keep a high-quality master file for future edits.'
      ],
      [
        'How do you organize files and use proxies on a big project?',
        'I use the same folder structure on every project, such as footage, audio, graphics, music and exports, with clear names and dates. For heavy footage, such as 4K or RAW, I create proxies, which are smaller copies that edit smoothly. The editor links back to the full-quality files for the final export. I back up the project and the media in two places.'
      ],
      [
        'Which editing tools do you use, and when?',
        'I use Premiere Pro for most client work, because it works well with After Effects and other Adobe tools. DaVinci Resolve is strong for color grading and also has a free version. For quick social media edits on a phone, CapCut is fast and easy. I choose the tool based on the project, the deadline and what the client uses.'
      ]
    ],
    fresher: [
      'I organize the footage first, then make a rough cut and a fine cut. After that I add music, color and audio fixes and export.',
      'I cut when an action or idea is complete. Fast cuts suit energetic videos and slower cuts suit emotional moments.',
      'Color correction fixes problems so shots look natural and match. Color grading adds a mood or style after that.'
    ],
    junior: [
      [
        'How do you handle client feedback on an edit?',
        'I ask for feedback with timecodes, so I know exactly which moment they mean. I group the notes, ask questions when something is unclear and agree on how many review rounds are included. I make the changes and send a new version with a short list of what changed. If a note would hurt the video, I explain why and suggest another option.'
      ],
      [
        'How do you add captions to a video?',
        'I generate captions with the speech-to-text tool in my editor and then correct every line by hand. I keep each caption short, about two lines, and time it to the speech. I choose a clear font with good contrast and keep captions away from important parts of the frame. I also export a separate caption file, such as SRT, when the platform supports it.'
      ]
    ],
    senior: [
      [
        'How do you manage the post-production of a large project with several editors?',
        'I set up a shared folder structure, naming rules and project templates before the work starts. I split the work, for example by episode or scene, and agree on deadlines for each stage. Shared storage or a collaboration tool keeps everyone on the same media. I review cuts regularly, so the style and quality stay consistent.'
      ],
      [
        'How do you keep a video project on time and on budget?',
        'I agree on the scope, the number of revisions and the delivery dates at the start. I plan each stage, such as rough cut, fine cut and final delivery, with buffer time. When the client asks for extra work, I explain the effect on time and cost before I start it. I share progress often, so there are no surprises at the end.'
      ]
    ]
  },
  motion: {
    label: 'Motion Graphics Designer',
    role: 'Motion Graphics Designer',
    color: '#9a3412',
    icon: 'M4 18c4 0 4-12 8-12s4 12 8 12M4 6h.01M20 6h.01',
    setupRole: 'Motion Graphics Designer',
    keywords: ['motion graphics', 'after effects', 'motion design', 'lottie'],
    skills: ['After Effects', 'Illustrator', 'Keyframes', 'Easing', 'Storyboarding', 'Typography', 'Lottie', 'Premiere Pro', 'Cinema 4D', 'Brand guidelines'],
    mid: [
      [
        'How do keyframes and easing make motion look natural?',
        'Keyframes mark the start and end values of a change, such as position or scale, and the software fills in the frames between them. With linear timing, objects start and stop suddenly, which looks mechanical. Easing makes them speed up and slow down, like real objects. In After Effects I shape this in the graph editor with the speed and value graphs.'
      ],
      [
        'Why do you make a storyboard before animating?',
        'A storyboard shows the key frames of the animation with notes on timing and transitions. It lets the client approve the idea before I spend hours animating. I often add style frames, which show the final look of a few key moments. This saves time, because big changes are cheap at the storyboard stage and expensive later.'
      ],
      [
        'How do you organize a project in After Effects?',
        'I name layers and compositions clearly and use folders for footage, assets and pre-compositions. I use pre-comps to group parts of the animation, so the main timeline stays simple. I link repeated values with controls or simple expressions, so one change updates everything. A clean project is easier to change later and to share with other designers.'
      ],
      [
        'How do you animate text so it stays readable?',
        'I keep text on screen long enough to read, often a little longer than it takes me to read it twice. I use clear fonts, enough size and good contrast with the background. The motion should support the words, not distract from them, so I avoid too many effects at once. I also keep important text inside the safe area for every format.'
      ],
      [
        'Which render and export settings do you use?',
        'For a master file I export a high-quality format, such as ProRes, from Adobe Media Encoder. For web and social media I export MP4 with H.264 at the right size and frame rate. When I need a transparent background, I use a format with an alpha channel, such as ProRes 4444. I check the final file on the target platform before delivery.'
      ],
      [
        'How do you keep motion graphics consistent with a brand?',
        'I follow the brand guidelines for colours, fonts and logo use. I create a small motion style, such as how fast things move and which easing curves we use, and I apply it everywhere. Reusable templates, such as Essential Graphics templates for lower thirds, help other editors use the same style. I review new work against older brand videos.'
      ],
      [
        'How do you prepare animations for websites and apps?',
        'For simple vector animations I often use Lottie, which plays animations from a small JSON file and stays sharp at any size. I export it from After Effects with a plugin such as Bodymovin and test it on the target devices. I keep the animation light, with few layers and no heavy effects that Lottie does not support. For longer animations, a compressed video file may be better.'
      ]
    ],
    fresher: [
      'Keyframes set the start and end of a change, and easing makes the motion speed up and slow down. This looks more natural than linear motion.',
      'A storyboard shows the key moments of the animation before I start. The client can approve the idea early, which saves time.',
      'I name layers clearly and group parts into pre-comps. A clean project is easier to change later.'
    ],
    junior: [
      [
        'How do you take a static design and turn it into an animation?',
        'I first ask what the animation must communicate and how long it should be. I prepare the design file in layers, for example in Illustrator, and import it into After Effects. I plan the order in which elements appear, so the eye follows the message. Then I animate the key moments first and refine the timing.'
      ],
      [
        'How do you sync animation to music or a voice-over?',
        'I import the audio first and mark the beats or the key words on the timeline. I place the main movements on these marks, so the motion feels connected to the sound. I check that the animation does not run ahead of the voice-over. Small timing changes of a few frames can make a big difference.'
      ]
    ],
    senior: [
      [
        'How do you build a motion design system for a brand?',
        'I define a set of rules, such as timing values, easing curves, transitions and how the logo animates. I build templates and examples, so editors and designers can use the rules without starting from zero. I document everything in a short guide with examples. I review the system with the brand team and update it when the brand changes.'
      ],
      [
        'How do you plan a large motion graphics project with a tight deadline?',
        'I agree on the script, the storyboard and the style frames early, because changes are cheapest there. I split the work into scenes and share them between designers, using shared templates and assets. I plan review points with the client for each stage. I keep a simple tracker, so everyone knows what is done and what is next.'
      ]
    ]
  },
  anim2d: {
    label: '2D Animator',
    role: '2D Animator',
    color: '#a2185c',
    icon: 'M4 4h10v10H4zM8 8h12v12H8z',
    setupRole: '2D Animator',
    keywords: ['2d animation', 'toon boom', 'grease pencil', 'frame by frame'],
    skills: [
      '12 principles of animation',
      'Frame-by-frame animation',
      'Toon Boom Harmony',
      'Blender Grease Pencil',
      'After Effects',
      'Storyboarding',
      'Animatics',
      'Character rigging',
      'Timing',
      'Drawing'
    ],
    mid: [
      [
        'Which of the 12 principles of animation do you use most, and how?',
        'The 12 principles include squash and stretch, anticipation, follow-through, slow in and slow out, arcs and timing. I use anticipation to prepare the viewer for a big action, such as a small crouch before a jump. Follow-through and overlapping action make hair and clothes keep moving after the body stops. Arcs make movements look natural instead of robotic.'
      ],
      [
        'How do frame rate and timing affect a 2D animation?',
        'Animation is often made for 24 frames per second. Many animators work on twos, which means one drawing for every two frames, so 12 drawings per second. Fast actions may need ones for smoothness, while slower holds can use fewer drawings. The number of frames between key poses decides whether a move feels heavy, light, fast or slow.'
      ],
      [
        'When do you use a rig and when do you animate frame by frame?',
        'Frame-by-frame animation means drawing each pose, which gives full freedom and a hand-made feel but takes more time. A rig, also called cut-out animation, splits the character into parts that I move and reuse, which is faster for long series. Rigs suit characters that appear in many scenes, while frame by frame suits special moments, such as big effects. Many projects mix both.'
      ],
      [
        'What is an animatic, and why is it useful?',
        'An animatic is the storyboard put on a timeline with rough timing, voice and sound. It shows how long each shot lasts and whether the story works before the real animation starts. Problems with pacing are cheap to fix at this stage. The whole team uses it as a guide during production.'
      ],
      [
        'Which 2D animation tools do you use?',
        'I use Toon Boom Harmony for professional character animation, both frame by frame and rigged. Blender with Grease Pencil lets me draw 2D animation inside a 3D scene and is free. After Effects is useful for simple character rigs, for example with tools such as Duik, and for compositing. I choose the tool that fits the style and the pipeline of the studio.'
      ],
      [
        'How do you polish an animation after the main poses are done?',
        'I check the spacing between drawings, so the motion speeds up and slows down correctly. I add small details, such as blinks, breathing and secondary actions, to make the character feel alive. I clean up the line work, so lines stay the same thickness and do not wobble. I watch it in a loop many times and fix anything that pulls the eye in the wrong way.'
      ],
      [
        'How do you take feedback from a director or a lead animator?',
        'I make sure I understand the note and the goal behind it, and I ask for a reference if it helps. I fix the most important notes first, such as acting and timing, before small details. I share a new version quickly and mark what changed. Feedback helps the shot fit the whole film, so I do not take it personally.'
      ]
    ],
    fresher: [
      'I use anticipation before big actions and follow-through after them. Arcs and slow in and slow out make motion look natural.',
      'Animation is often 24 frames per second, and many animators draw on twos. The number of frames between poses sets the speed and weight.',
      'Frame by frame means drawing every pose, which looks hand-made but takes time. A rig reuses character parts, which is faster for long series.'
    ],
    junior: [
      [
        'How do you animate a simple walk cycle?',
        'I start with the key poses: the contact pose, where the heel touches the ground, and the passing pose. Then I add the down and up poses to show weight. I keep the timing even, so the cycle loops without a jump. I check the arcs of the head and hands and add small overlapping motion at the end.'
      ],
      [
        'How do you show emotion through character animation?',
        'I start with the acting idea, often by recording myself or using reference video. Strong, clear poses tell the viewer what the character feels, even without sound. Timing helps a lot, for example slow movements for sadness and fast, sharp ones for surprise. I also use the eyes and small details, because the face shows emotion first.'
      ]
    ],
    senior: [
      [
        'How do you keep the animation style consistent on a team project?',
        'I prepare model sheets and turnarounds for each character, plus examples of key poses and expressions. I agree on rules for timing and line work with the team. I review shots regularly and give clear notes with drawn corrections where possible. A shared library of rigs and assets keeps everyone working with the same parts.'
      ],
      [
        'How do you plan the animation schedule for a short series?',
        'I break the work into episodes, scenes and shots and estimate each one by difficulty. I plan the stages, such as animatic, layout, animation, clean-up and compositing, with review points. I give complex shots to senior animators and reuse rigs and backgrounds where possible. I track progress every week and adjust the plan early when a shot takes longer.'
      ]
    ]
  },
  anim3d: {
    label: '3D Animator',
    role: '3D Animator',
    color: '#4a1d6e',
    icon: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12 4 7.5',
    setupRole: '3D Animator',
    keywords: ['3d animation', 'maya animation', 'motion capture', 'graph editor'],
    skills: [
      'Maya',
      'Blender',
      'Keyframe animation',
      'Graph editor',
      'Motion capture cleanup',
      'Body mechanics',
      'Acting',
      'Rig testing',
      'FBX export',
      'Rendering'
    ],
    mid: [
      [
        'How do you check that a character rig is ready for animation?',
        'I test the controls in extreme poses, such as a full crouch or arms raised high, to see if the mesh deforms cleanly. I check that the skin weights do not pull the wrong parts, for example around the shoulders and elbows. I test IK and FK switching and make sure the controls are easy to select. If I find problems, I send clear notes with screenshots to the rigger.'
      ],
      [
        'What is the difference between keyframe animation and cleaning up motion capture?',
        'In keyframe animation I create every pose myself, which gives full control over timing and style. Motion capture records a real actor, so it is realistic and fast for large amounts of movement. Mocap data needs cleanup, such as removing jitter, fixing foot sliding and correcting contact with the ground. Often I also add keyframes on top to push the acting.'
      ],
      [
        'How do you show weight in a 3D animation?',
        'Heavy objects take more time to start and stop moving, so I adjust the timing and spacing to show that. I make the body react to weight, for example bending the knees and leaning back when lifting something heavy. Contact poses, where the feet push against the ground, must look solid. I study reference video to see how real bodies move.'
      ],
      [
        'How do you use the graph editor in your work?',
        'The graph editor shows each animated value as a curve over time. I use it to smooth the motion, fix sudden spikes and control how fast a move speeds up and slows down. Flat curves show holds, and steep curves show fast motion. I clean up the curves after blocking, which makes the animation feel polished.'
      ],
      [
        'How do you take an animation from blocking to final polish?',
        'In blocking I set the key poses with stepped keys, so the director can approve the timing and acting. Then I add breakdown poses and switch to spline curves to see the full motion. In polish I fix arcs, add overlapping action and small details, such as fingers and eyes. I check the shot from the camera view, because that is what the audience sees.'
      ],
      [
        'How do you deliver an animation for a render or for a game engine?',
        'For film or video, I hand the shot to lighting and rendering, for example with Cycles in Blender or Arnold in Maya. For a game engine, I bake the animation and export it as FBX with the correct frame rate, scale and naming. I make clean loops for cycles, such as walks and idles. I always check the result in the engine or the render, not only in my scene.'
      ],
      [
        'How do you work with the modeling and rigging team?',
        'I share my needs early, such as the poses and facial expressions a character must make. I give feedback when the topology around joints, such as elbows and knees, does not bend well. I report rig problems with clear steps and examples instead of working around them silently. Good communication saves time for everyone in the pipeline.'
      ]
    ],
    fresher: [
      'I test the rig in extreme poses and check that the mesh bends cleanly. I send clear notes to the rigger if something breaks.',
      'Keyframe animation means I create every pose myself. Motion capture records an actor, but the data needs cleanup.',
      'Heavy things take longer to start and stop, so I adjust the timing. The body also bends and leans to show the weight.'
    ],
    junior: [
      [
        'Which 3D animation software do you use?',
        'I use Maya, which is common in film and game studios, and Blender, which is free and very capable. Both have a graph editor, constraints and good tools for character animation. I learn the shortcuts and the pipeline tools of the studio I work with. The principles of animation are the same in every program.'
      ],
      [
        'How do you use reference video for animation?',
        'I record myself or find clips of real people doing the action, such as jumping or throwing. I study the timing, the weight shifts and the small details frame by frame. I use the reference as a guide, not something to copy exactly, and push the poses for appeal. Good reference makes the acting more believable.'
      ]
    ],
    senior: [
      [
        'How do you lead a team of animators on a project?',
        "I set the animation style with example shots and clear rules for timing and acting. I assign shots based on each animator's strengths and give clear notes in dailies. I protect the team from last-minute changes by agreeing on approvals at each stage. I also share tips and tools, so the whole team improves."
      ],
      [
        'How do you plan animation for a game with many characters?',
        'I list every animation each character needs, such as idle, walk, run, jump and attacks, and the transitions between them. I work with the game designers to know the timing they need for gameplay. I reuse animations between similar characters with retargeting where possible. I test each set in the engine early, so problems are found before the full set is made.'
      ]
    ]
  },
  contentwriter: {
    label: 'Content Writer',
    role: 'Content Writer',
    color: '#7c3a10',
    icon: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
    setupRole: 'Content Writer',
    keywords: ['content writing', 'blog writing', 'article writing', 'seo writing'],
    skills: [
      'Writing',
      'Editing',
      'Research',
      'SEO basics',
      'Content planning',
      'Proofreading',
      'WordPress',
      'Google Docs',
      'Fact checking',
      'Social media writing'
    ],
    mid: [
      [
        'How do you choose the right tone for an audience?',
        'I first learn who the readers are, what they already know and what they need from the piece. A beginner guide needs simple words and examples, while a piece for experts can go deeper. I follow the brand style guide if there is one. I read the draft as if I were the reader and change anything that sounds wrong for them.'
      ],
      [
        'How do you research a topic and check your facts?',
        'I start with reliable sources, such as official websites, research papers and experts, and I avoid copying other blogs. I check important facts, such as numbers and dates, in at least two trusted sources. I keep a list of sources and link to them where it helps the reader. If I cannot confirm a fact, I leave it out.'
      ],
      [
        'How do you structure an article and write strong headlines?',
        'I plan an outline with a clear introduction, sections with useful subheadings and a short conclusion. The headline tells the reader what they will get, for example how to start a vegetable garden in five steps. I keep paragraphs short and use lists where they help scanning. The first lines must show quickly why the article is worth reading.'
      ],
      [
        'How do you edit your own writing?',
        'I take a short break after the first draft, so I can read it with fresh eyes. I cut words and sentences that do not add value and replace long words with simple ones. I read it aloud to find sentences that sound awkward. Finally, I check spelling and grammar, sometimes with a tool, but I make the final decisions myself.'
      ],
      [
        'What SEO basics do you follow when you write?',
        'I start with what the reader is searching for and why, which is called search intent. I use the main keyword naturally in the title, a subheading and the first paragraph, without stuffing it everywhere. I write a clear meta title and description and add links to related pages. Above all, I write useful, original content, because that is what search engines aim to reward.'
      ],
      [
        'How do you manage deadlines and revision requests?',
        'I agree on the brief, the deadline and the number of revisions before I start. I plan my week with time for research, writing and editing, and I tell the client early if something will be late. I keep all feedback in one document and work through it point by point. When feedback conflicts, I ask the client to decide which direction to follow.'
      ],
      [
        'How do you avoid plagiarism and over-reliance on AI tools?',
        "I write in my own words and give credit when I use someone else's ideas, quotes or data. I can use AI tools for ideas or an outline if the client allows it, but I check every fact and rewrite the text in my own voice. I add my own experience and examples, which AI cannot invent honestly. I also run a plagiarism check before I submit important work."
      ]
    ],
    fresher: [
      'I learn who the readers are and what they need. Then I choose simple or deeper language and follow the style guide.',
      'I use reliable sources and check important facts in at least two places. If I cannot confirm a fact, I leave it out.',
      'I plan an outline with clear subheadings and short paragraphs. The headline tells the reader what they will get.'
    ],
    junior: [
      [
        'How do you write content for social media posts?',
        'I keep it short and put the most important message in the first line, because people scroll fast. I match the style of each platform, for example more professional on LinkedIn and more casual on Instagram. I add a clear call to action, such as read more or share your view. I check the post on a phone before it goes live.'
      ],
      [
        'How do you update an old article so it stays useful?',
        'I check the facts, numbers and links and replace anything that is out of date. I look at what readers search for now and add missing questions or sections. I remove parts that no longer help and improve the title if needed. Then I update the date and share the article again.'
      ]
    ],
    senior: [
      [
        'How do you plan a content calendar?',
        'I start from the business goals and the questions our audience asks. I plan topics for each month, with a mix of formats, such as guides, case studies and short posts. Each piece has an owner, a deadline and a goal, such as traffic or sign-ups. I review the results every month and adjust the plan.'
      ],
      [
        'How do you measure whether content is working?',
        'I agree on the goal of each piece first, such as visits, time on page, sign-ups or shares. I track these numbers with analytics tools and compare similar pieces. I also read comments and feedback to understand what readers value. I update or remove content that does not perform and do more of what works.'
      ]
    ]
  },
  techwriter: {
    label: 'Technical Writer',
    role: 'Technical Writer',
    color: '#5b3a1a',
    icon: 'M6 3h12v18H6zM10 9l-2 2 2 2M14 9l2 2-2 2M9 17h6',
    setupRole: 'Technical Writer',
    keywords: ['technical writing', 'documentation', 'api docs', 'docs as code'],
    skills: [
      'Technical writing',
      'Markdown',
      'Git',
      'API documentation',
      'OpenAPI',
      'Docs as code',
      'Style guides',
      'Information architecture',
      'Editing',
      'Diagrams'
    ],
    mid: [
      [
        'How do you write the same topic for different readers?',
        'I first find out who will read the document, such as new users, administrators or developers, and what they want to do. Beginners need more context, examples and screenshots, while experts want quick reference and exact details. I often split the content into a getting started guide, how-to guides and reference pages. Each page has one clear purpose.'
      ],
      [
        'How do you write clear step-by-step instructions?',
        'I start with what the user will achieve and what they need before they begin. Each step has one action, starts with a verb and is numbered in the right order. I show the expected result after important steps, so users know they are on track. I test the steps myself on a clean setup before publishing.'
      ],
      [
        'What makes good API documentation?',
        'Good API docs explain how to authenticate, show each endpoint with its parameters and give real request and response examples. They list error codes and what to do about each one. A quick start guide helps developers make their first successful call in a few minutes. Reference pages are often generated from an OpenAPI file, and I add explanations and examples around them.'
      ],
      [
        'How do you get information from engineers who are busy?',
        'I prepare before I meet them by reading the code, the tickets and the specs. I ask specific questions and record the session if they agree. I send drafts for review with clear questions, so the review takes little time. I also try the feature myself, which often answers many questions.'
      ],
      [
        'What is docs as code, and how do you work with it?',
        'Docs as code means we write documentation like software, in plain text files such as Markdown, stored in Git next to the code. Changes go through pull requests and reviews, just like code changes. A static site generator, such as Docusaurus or MkDocs, builds the documentation website automatically. This keeps docs versioned and makes it easy for engineers to contribute.'
      ],
      [
        'Why do you follow a style guide, and which ones do you know?',
        'A style guide keeps the voice, words and format consistent across all documents, even when many people write them. It covers things like active voice, how to name buttons and how to write headings. Common public guides are the Microsoft Writing Style Guide and the Google developer documentation style guide. Teams often add their own word list on top.'
      ],
      [
        'How do you keep documentation up to date?',
        'I make documentation part of the definition of done, so a feature is not finished until its docs are updated. I follow release notes and tickets to know what changes. I review the most visited pages regularly and fix outdated parts. I also give readers an easy way to report problems, such as a feedback button on each page.'
      ]
    ],
    fresher: [
      'I find out who will read it and what they want to do. Beginners get more context and examples, and experts get quick reference.',
      'Each step has one action and starts with a verb. I test the steps myself before I publish them.',
      'Good API docs show how to authenticate, list each endpoint and give real request and response examples. They also explain error codes.'
    ],
    junior: [
      [
        'How do you use screenshots and diagrams in documentation?',
        'I use a screenshot when it helps users find something on the screen, and I highlight the important part. I keep screenshots few, because they become outdated when the interface changes. Diagrams explain how parts of a system connect, which is hard to describe in text. I always add short text, so the page is useful without the image and works with screen readers.'
      ],
      [
        'How do you write release notes?',
        'I group changes into new features, improvements and fixes and lead with what matters most to users. Each item explains the change and the benefit in one or two short sentences. I mention breaking changes clearly and say what users must do. I link to the detailed documentation for more information.'
      ]
    ],
    senior: [
      [
        'How do you plan the structure of a large documentation site?',
        'I study how users look for information, using search data, support tickets and interviews. I organize content by the tasks users want to do, not by the internal team structure. I separate tutorials, how-to guides, reference and explanations, so each page has one job. I test the navigation with real users and improve it over time.'
      ],
      [
        'How do you measure the quality of documentation?',
        'I look at page feedback, search terms that return no results and the number of support tickets about documented topics. Analytics show which pages people visit and where they leave. I also run small usability tests, where users try to finish a task using only the docs. I use these signals to choose which pages to improve first.'
      ]
    ]
  },
  copywriter: {
    label: 'Copywriter',
    role: 'Copywriter',
    color: '#8a2c0d',
    icon: 'M6 7h4v4c0 2-1 4-4 5M14 7h4v4c0 2-1 4-4 5',
    setupRole: 'Copywriter',
    keywords: ['copywriting', 'ad copy', 'brand voice', 'call to action'],
    skills: [
      'Copywriting',
      'Brand voice',
      'Headlines',
      'Calls to action',
      'Ad copy',
      'Email marketing',
      'A/B testing',
      'Editing',
      'Research',
      'Persuasive writing'
    ],
    mid: [
      [
        'How do you write in a brand voice that is not your own?',
        'I study the brand guidelines, past campaigns and the words the brand uses and avoids. I describe the voice in a few simple words, such as friendly, confident and clear, and check every line against them. I read competitor copy to see what makes this brand different. When I am unsure, I write two versions and ask the client which one fits.'
      ],
      [
        'How do you write a strong headline and call to action?',
        'A strong headline is clear first and clever second, and it tells the reader what they get. I write many options, often ten or more, and choose the best one. A call to action should say exactly what happens next, such as start your free trial, not just click here. I keep both short and test them when I can.'
      ],
      [
        'What is the difference between features and benefits in copy?',
        'A feature is what a product has or does, such as a 5000 mAh battery. A benefit is what that means for the customer, such as using your phone all day without charging. People buy benefits, so I lead with them and use features as proof. I ask so what after each feature until I reach the real benefit.'
      ],
      [
        'How do you test two versions of copy to find the one that works better?',
        'I test one change at a time, such as the headline or the button text, so I know what made the difference. I write a clear idea before the test, for example a benefit-led headline will get more clicks. I wait until enough people have seen both versions before I decide. I keep a record of the results, so the team learns what works for our audience.'
      ],
      [
        'When do you write short copy and when do you write long copy?',
        'Short copy suits ads, social posts and simple products that people understand quickly. Long copy suits expensive or complex products, where people need more information and trust before they decide. The length depends on what the reader needs, not on a fixed rule. Even long copy must be easy to scan, with clear headings and short paragraphs.'
      ],
      [
        'How do you work from a brief and handle feedback?',
        'I make sure the brief says the goal, the audience, the main message, the tone and the deadline, and I ask questions if something is missing. I share a first draft early, sometimes with two directions. I ask for feedback that links to the brief, not only personal taste. If feedback changes the goal, I agree on an updated brief before I continue.'
      ],
      [
        'How do you make sure your claims in copy are honest?',
        'I only write claims that the client can prove, such as test results or real customer numbers. I avoid words like best or guaranteed unless there is clear evidence. I follow advertising rules and platform policies and add clear terms where needed, such as for offers. Honest copy builds trust, which is worth more than one quick sale.'
      ]
    ],
    fresher: [
      'I study the brand guidelines and past campaigns and describe the voice in a few simple words. Then I check every line against them.',
      'A headline should be clear and tell the reader what they get. A call to action should say exactly what happens next.',
      'A feature is what the product has, and a benefit is what it means for the customer. I lead with the benefit.'
    ],
    junior: [
      [
        'How do you write an email that people open and read?',
        'I write a short, clear subject line that gives a reason to open, and a preview line that supports it. The email focuses on one main message and one call to action. I keep paragraphs short, because many people read on their phones. I test subject lines when the email platform allows it.'
      ],
      [
        'How do you write copy for a landing page?',
        'I start with a headline that matches the ad or link that brought the visitor. Then I explain the main benefits, show proof, such as reviews or results, and answer common doubts. The call to action appears more than once, so visitors do not have to scroll back. Every section should move the visitor closer to one action.'
      ]
    ],
    senior: [
      [
        'How do you develop the messaging for a new product launch?',
        'I start with research on the audience, their problems and the competitors. I write a short positioning statement and a few key messages, each with proof points. I test the messages with real customers or small ad campaigns before the launch. Then I adapt them for each channel, such as the website, ads and emails, so they stay consistent.'
      ],
      [
        'How do you guide other writers to keep copy consistent?',
        'I create a simple voice and tone guide with examples of good and bad copy. I keep a shared word list for product names and phrases we always or never use. I review drafts with clear, specific feedback that explains the reason. Regular reviews of live copy help us find places where the voice has drifted.'
      ]
    ]
  },
  // ---- PR G1: HR and Management roles (parents: Human Resources, Management and Operations)
  recruiter: {
    label: 'Recruiter',
    role: 'Recruiter',
    color: '#8b2fa8',
    icon: 'M10 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM3 21v-1a6 6 0 0 1 9.5-4.9M17 14l2 2 3-3',
    setupRole: 'Recruiter',
    keywords: ['recruiter', 'talent acquisition', 'sourcing', 'headhunting'],
    skills: [
      'Sourcing',
      'Screening',
      'Interviewing',
      'Job descriptions',
      'LinkedIn Recruiter',
      'ATS',
      'Candidate experience',
      'Employer branding',
      'Fair hiring',
      'Communication'
    ],
    mid: [
      [
        'How do you source candidates for a hard-to-fill role?',
        'I first agree with the hiring manager on the must-have skills and where such people work. Then I search job boards, LinkedIn and our own database, and I ask employees for referrals. For rare skills I also look at communities, events and alumni groups. I send short, personal messages that explain why the role could interest that person.'
      ],
      [
        'How do you screen and shortlist applications fairly?',
        'I set clear criteria from the job requirements before I read any applications. I check every candidate against the same criteria and note the reasons for my decisions. I focus on skills and experience, not on things like age, gender or where someone comes from. A short phone screen helps me confirm the key points before I send a shortlist to the manager.'
      ],
      [
        'How do you write a good job description?',
        'I start with a clear job title that people actually search for and a short summary of the role. I list the main tasks and separate the must-have skills from the nice-to-have ones, because long lists stop good people from applying. I use plain, inclusive language and mention the salary range and work setup where the company allows it. I review it with the hiring manager before it goes live.'
      ],
      [
        'How do you schedule interviews for many candidates and interviewers?',
        'I use the calendar or the scheduling feature of our applicant tracking system, so candidates can pick from open slots. I group interviews on the same days where possible and send clear invitations with the time, the place or link and who they will meet. I send reminders the day before. If someone cancels, I rebook quickly and keep everyone updated.'
      ],
      [
        'How do you give candidates a good experience during hiring?',
        'I explain the steps and the timeline at the start and keep candidates updated at each stage. I answer questions quickly and make sure interviews start on time. Every candidate gets a reply, even when the answer is no, and I share short feedback when I can. A good experience protects the company name, even with people we do not hire.'
      ],
      [
        'How do you reduce time to hire without lowering quality?',
        'I measure where the delays happen, for example slow feedback from interviewers or long gaps between rounds. I agree on response times with hiring managers and book interview slots in advance. I keep a pool of strong candidates for roles we hire often. I never skip the important checks, because a bad hire costs much more than a few extra days.'
      ],
      [
        'How do you reduce bias in the hiring process?',
        'I use structured interviews, where every candidate gets the same questions and a scoring guide. I ask interviewers to score separately before they discuss, so one opinion does not decide for everyone. I use diverse interview panels and focus job requirements on real needs. I also review our hiring data to find steps where some groups drop out more than others.'
      ]
    ],
    fresher: [
      'I agree on the key skills with the hiring manager first. Then I use job boards, LinkedIn, our database and employee referrals.',
      'I set clear criteria before I read applications and check everyone against the same criteria. I focus only on skills and experience.',
      'I use a clear title, the main tasks and separate must-have and nice-to-have skills. I write in plain and inclusive language.'
    ],
    junior: [
      [
        'How do you work with a hiring manager who keeps changing the requirements?',
        'I set up a short intake meeting to agree on the must-have skills, the salary range and the timeline, and I write them down. When the manager changes something, I show the effect, for example on the number of suitable candidates or on time to hire. I share examples of real profiles to make the discussion practical. Clear agreement early saves time for both of us.'
      ],
      [
        'How do you close a candidate who has another offer?',
        'I ask what matters most to the candidate, such as growth, salary, flexibility or the team. I explain honestly how our offer meets those points and arrange a call with the manager if it helps. I share the offer details clearly and quickly. If the other offer is a better fit, I respect that and keep a good relationship for the future.'
      ]
    ],
    senior: [
      [
        'How do you plan hiring for a fast-growing company?',
        'I start from the business plan and agree on how many people each team needs and by when. I build a hiring plan with priorities, budgets and the sources we will use. I set up the process, the tools and interview training for managers. I track the main recruiting metrics every month and adjust the plan when the business changes.'
      ],
      [
        'Which recruiting metrics do you track, and why?',
        'I track time to hire, cost per hire and offer acceptance rate to see how efficient the process is. I also look at the source of hire to know which channels work best. For quality, I check how new hires perform and stay after their first year. I share these numbers with managers, so we improve the process together.'
      ]
    ]
  },
  hrmanager: {
    label: 'HR Manager',
    role: 'HR Manager',
    color: '#6b2f8f',
    icon: 'M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM6 21v-2a6 6 0 0 1 12 0v2M4 11h3M17 11h3M5.5 8.5l1.5 1M18.5 8.5l-1.5 1',
    setupRole: 'HR Manager',
    keywords: ['hr manager', 'hr business partner', 'people manager', 'employee relations'],
    skills: [
      'HR policies',
      'Employee relations',
      'Performance management',
      'Onboarding',
      'Labour law awareness',
      'HR metrics',
      'HRIS',
      'Conflict resolution',
      'Retention',
      'Coaching managers'
    ],
    mid: [
      [
        'How do you handle an employee exit from start to finish?',
        'I confirm the last working day and the notice period and tell the right teams early. I plan the handover of work, the return of company equipment and the removal of system access on the last day. I make sure the final pay and any documents are correct and on time. I also hold an exit interview to learn why the person is leaving.'
      ],
      [
        'How do you create or update an HR policy?',
        'I start with the problem the policy must solve and check the local labour law and similar policies. I write it in simple language with clear examples and get input from managers and the legal team. Once it is approved, I explain it to employees and train managers on how to apply it. I review it regularly, because laws and the business change.'
      ],
      [
        'How do you make performance reviews useful for employees?',
        'I make sure goals are clear at the start of the year, so the review is not a surprise. I train managers to give regular feedback, not only once a year, and to use examples instead of opinions. The review should cover what went well, what to improve and a plan for growth. I check that ratings are fair and consistent across teams.'
      ],
      [
        'How do you handle a complaint from an employee about their manager?',
        'I listen carefully, take notes and explain the process and what confidentiality we can offer. I gather facts from the people involved and look at any evidence, without taking sides. Based on the facts and the policy, I agree on actions, such as coaching, mediation or a formal process. I follow up with the employee to check that the situation has improved.'
      ],
      [
        'How do you improve employee retention in a team with many resignations?',
        'I first look at the data, such as exit interview reasons, survey results and when people leave. Common reasons are poor management, low pay, no growth or heavy workload. I work with the managers on the main causes, for example coaching, clearer career paths or a salary review. Then I track whether resignations go down over the next months.'
      ],
      [
        'How do you stay aware of labour law as an HR manager?',
        'I follow official government updates and trusted HR sources and attend short trainings. I keep a simple list of the rules that affect us, such as working hours, leave and contracts. When a case is complex or unclear, I ask the legal team or an employment lawyer instead of guessing. I update our policies and train managers when a law changes.'
      ],
      [
        'Which HR metrics do you report to leadership?',
        'I report headcount, turnover rate, absence rate and time to hire. I also share employee engagement results and the reasons people leave. I connect the numbers to business results, for example how turnover in one team affects delivery. I keep the report short, with trends and clear actions, not just numbers.'
      ]
    ],
    fresher: [
      'I plan the handover, collect company equipment and remove system access on the last day. I also make sure the final pay is correct.',
      'I check the law and similar policies, write in simple language and get input from managers and legal. Then I explain it to employees.',
      'I make goals clear at the start of the year and ask managers to give regular feedback with examples. The review includes a plan for growth.'
    ],
    junior: [
      [
        'How do you support a manager who has to give an employee a warning?',
        'I check the facts and the policy first, so the warning is fair and consistent with past cases. I help the manager prepare what to say, with clear examples and the expected improvement. I often join the meeting to keep it calm and to take notes. Afterwards I make sure the warning is recorded and the follow-up date is set.'
      ],
      [
        'How do you plan a simple employee engagement survey?',
        'I keep the survey short, with clear questions about workload, management, growth and recognition. I make it anonymous, so people answer honestly, and I explain how the results will be used. After the survey, I share the main results with everyone. Most importantly, I agree on a few actions with managers, because a survey without action reduces trust.'
      ]
    ],
    senior: [
      [
        'How do you build a strong relationship between HR and business leaders?',
        'I learn the business goals and the challenges of each team, so my advice fits their reality. I bring data and practical solutions, not only rules. I meet leaders regularly and help them early, before small people issues become big problems. When I must say no, I explain the reason and offer an alternative.'
      ],
      [
        'How do you manage change, such as a new organization structure, from the HR side?',
        "I work with leaders to define the reasons for the change, the new structure and the timeline. I plan the communication carefully, so managers hear first and can answer their team's questions. I treat affected employees with respect and follow the law and company policy closely. After the change, I check engagement and turnover to see how people are coping."
      ]
    ]
  },
  payroll: {
    label: 'Payroll and Compensation Officer',
    role: 'Payroll and Compensation Officer',
    color: '#5b2a86',
    icon: 'M3 6h18v12H3zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM6 9v.01M18 15v.01',
    setupRole: 'Payroll and Compensation Officer',
    keywords: ['payroll', 'compensation', 'salary processing', 'pay slip'],
    skills: [
      'Payroll processing',
      'Excel',
      'Payroll software',
      'Tax deductions',
      'Attendance data',
      'Compensation',
      'Reconciliation',
      'Confidentiality',
      'Labour law awareness',
      'Attention to detail'
    ],
    mid: [
      [
        'What are the main steps to run a monthly payroll?',
        'I collect the inputs, such as new joiners, leavers, salary changes, attendance and overtime, before the cut-off date. I enter or import them into the payroll system and run a draft payroll. I compare it with last month and check any big differences before approval. After approval I process the payments, send pay slips and file the required reports.'
      ],
      [
        'How do you handle deductions and taxes in payroll at a general level?',
        'Deductions can be statutory, such as income tax and social security, or voluntary, such as loans or benefits. I use the current tax rates and rules set by the government and keep the payroll system updated when they change. I make sure each employee has the right tax details on file. When a case is unclear, I check with a tax adviser instead of guessing.'
      ],
      [
        'How do you include attendance and overtime correctly in payroll?',
        'I get attendance data from the time system and ask managers to approve overtime and leave before the cut-off. I check the data for errors, such as missing punches or overtime that was not approved. I apply the overtime rates from the company policy and the law. If something is unclear, I confirm it with the manager before I process it.'
      ],
      [
        'How do you make sure payroll is accurate before it is paid?',
        'I compare the draft payroll with the previous month and explain every large change. I check a sample of pay slips by hand, especially for new joiners, leavers and people with salary changes. A second person reviews and approves the payroll before payment. After payment, I reconcile the bank totals with the payroll report.'
      ],
      [
        'How do you keep salary information confidential?',
        'I share salary data only with people who need it for their job and only through secure systems. I never discuss salaries in public places or send them in unprotected files. Access to the payroll system is limited and protected with strong passwords and two-step login. I also lock my screen and store paper documents securely.'
      ],
      [
        'What do you do when an employee says their salary is wrong?',
        'I thank them for raising it and check their pay slip, attendance and any recent changes. If there is a mistake, I explain it, correct it as soon as possible and agree how the difference will be paid. If the pay is correct, I explain the calculation clearly. I also look for the cause, so the same mistake does not happen again.'
      ],
      [
        'Which payroll software or tools have you used?',
        'I have used payroll modules in HR systems and Excel for checks and reports. Payroll software calculates pay, deductions and pay slips and keeps a history for audits. Excel helps me compare months, reconcile totals and find unusual changes. I learn new systems quickly, because the main payroll steps are the same everywhere.'
      ]
    ],
    fresher: [
      'I collect inputs such as joiners, leavers, changes and overtime, then run a draft payroll. After checks and approval, I pay and send pay slips.',
      'Deductions include taxes, social security and items like loans. I use the current rules and check with a tax adviser when unsure.',
      'I get approved attendance and overtime data before the cut-off and check it for errors. Then I apply the correct overtime rates.'
    ],
    junior: [
      [
        'How do you process a final settlement for an employee who leaves?',
        'I confirm the last working day, unpaid salary, unused leave and any amounts the employee owes, such as advances. I apply the rules in the contract, the company policy and the law. I prepare a clear statement that shows every item and get it approved. Then I pay it on time and keep the records for audits.'
      ],
      [
        'How do you prepare for a payroll audit?',
        "I keep payroll records organized by month, with reports, approvals and supporting documents. I make sure reconciliations between payroll, bank payments and accounting are complete. I answer the auditor's questions clearly and provide evidence quickly. Any findings become actions, so the process improves."
      ]
    ],
    senior: [
      [
        'How do you design a fair salary structure for a company?',
        'I group jobs by level, based on their responsibilities and skills, so similar jobs are treated the same. I compare our pay with salary survey data for the market. I set a pay range for each level and check for unfair gaps, for example between men and women in the same role. I explain the structure clearly to managers, so pay decisions stay consistent.'
      ],
      [
        'How do you move payroll to a new system safely?',
        'I clean the employee data first and map every pay item from the old system to the new one. I run the old and new systems side by side for one or two months and compare every result. I train the team and write simple procedures for the new process. We switch over only when the parallel runs match.'
      ]
    ]
  },
  lnd: {
    label: 'Training and Development Specialist',
    role: 'Training and Development Specialist',
    color: '#4c1d95',
    icon: 'M2 9l10-5 10 5-10 5zM6 11.5V16c1.5 1.5 3.5 2.5 6 2.5s4.5-1 6-2.5v-4.5M12 14v7',
    setupRole: 'Training and Development Specialist',
    keywords: ['learning and development', 'corporate training', 'training needs analysis', 'onboarding program'],
    skills: [
      'Training needs analysis',
      'Instructional design',
      'Facilitation',
      'E-learning',
      'LMS',
      'Onboarding programs',
      'Evaluation',
      'Kirkpatrick model',
      'Presentation skills',
      'Coaching'
    ],
    mid: [
      [
        'How do you carry out a training needs analysis?',
        'I start with the business goals and ask what people must do differently to reach them. I gather information from managers, performance data, surveys and short interviews with employees. I separate real skill gaps from problems that training cannot fix, such as unclear processes or missing tools. Then I list the training needs by priority and agree on them with the managers.'
      ],
      [
        'How do you design a training session that people remember?',
        'I set two or three clear learning goals and build the session around real tasks from the job. I keep theory short and add practice, examples, discussions and short activities. I check understanding during the session with questions or a quick exercise. I end with a summary and give a short guide or checklist people can use at work.'
      ],
      [
        'How do you measure whether a training program worked?',
        'I often use the four levels of the Kirkpatrick model: reaction, learning, behaviour and results. I collect feedback after the session and test what people learned. A few weeks later I check with managers whether people use the new skills at work. Where possible, I link the training to business results, such as fewer errors or faster service.'
      ],
      [
        'How do you build an onboarding program for new employees?',
        'I plan the first day, the first week and the first months, so new people are never left without guidance. The program covers the company, the tools, the rules and the skills for the role, with a buddy for questions. I mix short sessions, self-paced learning and practice on real work. I collect feedback from new hires and their managers and improve the program regularly.'
      ],
      [
        'What is blended learning, and when do you use it?',
        'Blended learning mixes different methods, such as online modules, live sessions, practice on the job and coaching. People can learn the basics online at their own pace and use live time for practice and discussion. It works well for teams in different places or with different schedules. I choose the mix based on the skill, the people and the budget.'
      ],
      [
        'How do you use feedback to improve your training?',
        'I collect feedback right after each session, with a few questions about usefulness and clarity. I also ask managers later whether the training helped on the job. I look for patterns, such as parts that many people found too long or too hard. I update the materials and share what I changed with the next group.'
      ],
      [
        'How do you keep participants engaged in an online training session?',
        "I keep online sessions shorter than classroom sessions and split them into small parts. I ask people to take part often, with polls, chat questions, breakout rooms and short exercises. I use people's names and invite quieter people to share. I also send a short task before the session, so everyone comes prepared."
      ]
    ],
    fresher: [
      'I start from the business goals and ask managers and employees what skills are missing. I check that training is really the right solution.',
      'I set a few clear goals and use real examples, practice and short activities. I end with a summary and a simple guide.',
      'I collect feedback, test learning and later ask managers whether people use the new skills. The Kirkpatrick model helps with this.'
    ],
    junior: [
      [
        'How do you prepare a new trainer to deliver your course?',
        'I give them the trainer guide, the slides and the activities, with notes on timing and key messages. I ask them to watch one session and then co-deliver a session with me. I give specific feedback after each run. Once they deliver confidently on their own, I check the participant feedback for their sessions.'
      ],
      [
        'How do you manage training records in a learning management system?',
        'I set up courses, enrol the right people and track completion in the LMS. I send reminders for mandatory training before the deadline. I run reports for managers and for audits, such as who completed safety training. I keep the course list clean and remove old content.'
      ]
    ],
    senior: [
      [
        'How do you build a yearly learning plan for a company?',
        'I start from the company strategy and the skills it needs in the next year. I combine the training needs from all departments and choose priorities with leaders. I plan programs, formats, budget and timing and decide what we build ourselves and what we buy. I report progress and results every quarter and adjust the plan.'
      ],
      [
        'How do you develop future leaders inside a company?',
        'I agree with leaders on the skills our future managers need and on how we select people for the program. The program mixes workshops, real projects, coaching and mentoring by senior leaders. I give participants regular feedback and track their progress. Success means more internal promotions and strong performance in new roles.'
      ]
    ]
  },
  projectmgr: {
    label: 'Project Manager',
    role: 'Project Manager',
    color: '#9a2d0b',
    icon: 'M4 5h16M4 5v14h16V5M8 9h5M8 13h8M8 17h3',
    setupRole: 'Project Manager',
    keywords: ['project management', 'pmp', 'prince2', 'gantt chart'],
    skills: [
      'Project planning',
      'Scope management',
      'Risk management',
      'Stakeholder communication',
      'Agile',
      'Scrum',
      'Waterfall',
      'MS Project',
      'Jira',
      'Budgeting'
    ],
    mid: [
      [
        'How do you define and control the scope of a project?',
        'I agree on the goals, the deliverables and what is out of scope with the sponsor at the start, and I write them down. I break the work into smaller parts, often with a work breakdown structure. Any new request goes through a change process, where we check its effect on time and cost. This stops scope creep, where small additions slowly take over the project.'
      ],
      [
        'How do you build a realistic project schedule?',
        'I list the tasks, estimate them with the people who will do the work and find the dependencies between them. I build the schedule in a tool, such as MS Project or a Gantt chart, and find the critical path, which is the chain of tasks that decides the end date. I add buffer for known risks. I review the schedule with the team before I share it.'
      ],
      [
        'How do you manage the budget of a project?',
        'I estimate the costs for people, tools, suppliers and a contingency for risks, and get the budget approved. I track actual spending against the plan every month. If costs start to grow, I find the reason early and discuss options, such as reducing scope or moving money from other areas. I report the budget status honestly to the sponsor.'
      ],
      [
        'How do you identify and manage project risks?',
        'I run a risk workshop with the team at the start and keep a risk register. For each risk I note how likely it is, its impact, an owner and a response, such as avoiding, reducing or accepting it. I review the register regularly, because new risks appear during the project. The highest risks are part of every status report.'
      ],
      [
        'When do you choose Agile and when do you choose waterfall?',
        'Waterfall works well when the requirements are clear and stable, such as building to a fixed contract or regulation. Agile works better when requirements are likely to change or need feedback from users, such as a new software product. Agile delivers in short cycles, while waterfall moves through phases in order. Many projects use a hybrid, with a fixed plan for some parts and Agile for others.'
      ],
      [
        'How do you write a useful project status report?',
        'I keep it short and show the overall status, often as green, amber or red, for time, cost and scope. I list what was done, what is next and the main risks and issues with their owners. I state clearly what decisions or help I need from the reader. I send it on a regular schedule, so stakeholders know when to expect it.'
      ],
      [
        'What do you do when a project starts to run late?',
        'I find the real cause, for example a late supplier, unclear requirements or too little capacity. Then I look at options, such as adding people, changing the order of tasks, reducing scope or moving the deadline. I discuss the options and their trade-offs with the sponsor quickly. Hiding a delay only makes it worse, so I share it early and honestly.'
      ]
    ],
    fresher: [
      'I agree on the goals, deliverables and what is out of scope at the start. New requests go through a change process.',
      'I list the tasks and their dependencies and estimate them with the team. Then I find the critical path and add buffer for risks.',
      'I estimate the costs and track actual spending every month. If costs grow, I raise it early and suggest options.'
    ],
    junior: [
      [
        'How do you handle a change request in the middle of a project?',
        'I record the request and ask what problem it solves and how urgent it is. With the team, I check its effect on scope, time, cost and risk. I present the options to the sponsor or the change board, who decides. If it is approved, I update the plan and tell everyone affected.'
      ],
      [
        'How do you run a good project kick-off meeting?',
        'I explain the goals, the scope, the timeline and the main milestones. I introduce the team and make roles and responsibilities clear, for example with a RACI chart. We agree on how we will communicate and make decisions. I end with the first actions and owners, so the project starts with momentum.'
      ]
    ],
    senior: [
      [
        'How do you manage several projects that compete for the same people?',
        'I keep a clear view of all projects, their priorities and the people they need. When there is a conflict, I agree on the priority with the sponsors based on business value and deadlines. I plan resources across projects and avoid putting key people on too many tasks at once. I raise capacity problems early, so leaders can decide.'
      ],
      [
        'How do you close a project properly?',
        'I confirm that all deliverables are accepted by the sponsor and hand over the work to the operations team with documentation. I close contracts with suppliers and release the team. I run a lessons learned session to see what worked and what to change next time. Finally, I write a short closing report with the results against the original goals.'
      ]
    ]
  },
  opsexec: {
    label: 'Operations Executive',
    role: 'Operations Executive',
    color: '#8a3b12',
    icon: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h4M15.5 16.5l1.5 1.5 2.5-3',
    setupRole: 'Operations Executive',
    keywords: ['operations executive', 'operations coordinator', 'operations assistant', 'back office'],
    skills: [
      'Excel',
      'Google Sheets',
      'Reporting',
      'Data accuracy',
      'Coordination',
      'Vendor follow-up',
      'ERP systems',
      'Process follow-up',
      'Escalation',
      'Time management'
    ],
    mid: [
      [
        'What does a normal working day look like for an operations executive?',
        'I start by checking emails, open requests and the dashboards to see what needs attention first. Then I update the trackers, process the daily tasks and follow up on anything that is pending. During the day I answer questions from other teams and fix small problems before they grow. Before I leave, I update the status of open items so the next day starts clearly.'
      ],
      [
        'How do you prepare daily and weekly operations reports?',
        'I pull the data from our systems into Excel or Google Sheets and use pivot tables or simple formulas to summarise it. I check the totals against the source before I share anything. The report shows the main numbers, the trend against last week and anything unusual that needs action. I send it at the same time every day or week, so people can rely on it.'
      ],
      [
        'How do you coordinate work between different departments?',
        'I make sure each department knows what is needed from them, by when and why. I keep one shared tracker, so everyone sees the same status and the owner of each item. When a request is stuck between two teams, I bring the right people together quickly. I confirm decisions in writing, so nothing is forgotten.'
      ],
      [
        'How do you follow up with vendors on open requests and invoices?',
        'I keep a list of open purchase orders, service requests and invoices with their due dates. I send polite reminders before the due date, not after it has passed. If a vendor does not answer, I call them and note what they promised. I match invoices with the purchase order and the delivery before I pass them for payment.'
      ],
      [
        'How do you make sure a new process is followed after it starts?',
        'I share the new steps in a short written guide and explain them to the people who use them. For the first weeks I check a sample of the work to see whether the steps are followed. When I find a gap, I find out why, for example a step is unclear or takes too long, and I tell my manager. I update the guide when the process changes.'
      ],
      [
        'How do you keep operations data accurate?',
        'I enter data carefully and use drop-down lists and validation in sheets to avoid typing mistakes. I compare totals between systems, for example orders in the system against the daily report. When I find a difference, I trace it to the source and correct it there, not only in my report. I keep one main file as the source of truth, so people do not work from old copies.'
      ],
      [
        'How do you handle a delay, and when do you escalate it?',
        'When something is delayed, I first find out the reason and the new expected time. I tell the people affected early, with the facts and what we are doing about it. I escalate to my manager when the delay will miss an important deadline, affect a customer or needs a decision I cannot make. In the escalation I explain the problem, the impact and the options in a few clear lines.'
      ]
    ],
    fresher: [
      'I check emails, open requests and dashboards first. Then I update trackers, finish daily tasks and follow up on pending items.',
      'I pull the data into Excel or Google Sheets, summarise it and check the totals. I send the report at the same time every day.',
      'I tell each team what is needed and by when, and I keep one shared tracker. I confirm decisions in writing.'
    ],
    junior: [
      [
        'How do you keep track of many deadlines at the same time?',
        'I keep all tasks and their deadlines in one tracker or calendar, not in my head. Each morning I sort them by due date and impact and start with the most urgent. I set reminders a few days before important deadlines. If two deadlines clash, I tell my manager early and agree on the order.'
      ],
      [
        'Which tools do you use for daily operations work?',
        'I use Excel or Google Sheets for trackers and reports, with functions such as XLOOKUP and pivot tables. I also work in the ERP or order system to check and update records. Email, shared calendars and chat tools help me coordinate with teams and vendors. I learn new tools quickly, because the main tasks stay the same.'
      ]
    ],
    senior: [
      [
        'How do you make a recurring report faster to prepare?',
        'I list the manual steps that take the most time, such as copying data or fixing formats. I build a template with formulas, and where possible I use tools such as Power Query to load and clean the data automatically. I test the new report against the old one before I switch. This saves time every week and reduces mistakes.'
      ],
      [
        'How do you reduce repeated mistakes in daily operations work?',
        'I record each mistake with its cause, so I can see which ones come back. For common mistakes I add a simple check, such as a checklist, a validation rule or a second review for important entries. I share the cause and the fix with the team, without blaming anyone. Then I watch whether the mistake stops.'
      ]
    ]
  },
  teamlead: {
    label: 'Team Leader',
    role: 'Team Leader',
    color: '#7f3d1a',
    icon: 'M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM5 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM19 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM8 21v-2a4 4 0 0 1 8 0v2M2 21v-1a3 3 0 0 1 4-2.8M22 21v-1a3 3 0 0 0-4-2.8',
    setupRole: 'Team Leader',
    keywords: ['team lead', 'supervisor', 'shift leader', 'people leadership'],
    skills: [
      'Delegation',
      'Motivation',
      'Feedback',
      'Coaching',
      'Performance management',
      'Conflict resolution',
      'Target setting',
      'Communication',
      'Time management',
      'Decision making'
    ],
    mid: [
      [
        'How do you decide which tasks to delegate and to whom?',
        "I delegate tasks that others can do well or that help them grow, and I keep the tasks only I can do. I match tasks to people's skills, interests and workload. I explain the goal, the deadline and how much freedom they have, and I agree on check-in points. I support them without taking the task back."
      ],
      [
        'How do you keep your team motivated during a busy period?',
        'I explain why the work matters and what the busy period is for, so people see the purpose. I share the workload fairly and remove obstacles that slow the team down. I recognize good work quickly and in specific words. When the busy period ends, I make sure people get time to recover.'
      ],
      [
        'How do you give feedback to a team member?',
        'I give feedback soon after the event, in private for corrections and in public for praise. I describe the specific behaviour and its effect, not the person, for example the report was late, so the client waited. I ask for their view and agree together on what to do next. I also give positive feedback often, not only when something goes wrong.'
      ],
      [
        'How do you handle a team member who is underperforming?',
        'I first talk with them privately to understand the reason, such as unclear goals, missing skills or a personal issue. We agree on clear expectations and a short improvement plan with support, such as training or coaching. I check progress regularly and give honest feedback. If there is no improvement, I involve HR and follow the company process.'
      ],
      [
        'How do you set targets for your team?',
        'I break the company or department goals into clear targets for the team and for each person. I use SMART targets, which are specific, measurable, achievable, relevant and time-bound. I agree on them with the team, so they are realistic and people feel ownership. I track progress visibly and discuss it in our regular meetings.'
      ],
      [
        'How do you get help from people outside your team who do not report to you?',
        'I explain the shared goal and how their help benefits them or their team too. I build good relationships before I need something, for example by helping them when I can. I make my request clear and easy, with the deadline and the reason. I thank them openly and share credit when the work succeeds.'
      ],
      [
        'How did you adjust when you moved from team member to team leader?',
        'I learned that my job became helping the team succeed, not doing all the work myself. I had to set boundaries with former peers in a friendly way and be fair to everyone. I asked my manager for feedback and learned to delegate and plan more. I also spent time one to one with each team member to understand their goals.'
      ]
    ],
    fresher: [
      'I delegate tasks that others can do well or that help them grow. I explain the goal and the deadline and agree on check-ins.',
      'I explain why the work matters and share the workload fairly. I recognize good work quickly and specifically.',
      'I give feedback soon, about the behaviour and its effect, not the person. I also give positive feedback often.'
    ],
    junior: [
      [
        'How do you run a good one-to-one meeting with a team member?',
        'I meet regularly, for example every two weeks, and let the team member bring their own topics first. We talk about progress, problems, workload and their growth goals. I listen more than I talk and agree on a few clear actions. I keep notes, so we can follow up next time.'
      ],
      [
        'How do you share bad news with your team, such as a cancelled project?',
        'I share it quickly and directly, before people hear it from others. I explain the reasons as honestly as I can and what happens next for each person. I give time for questions and feelings, and I answer what I can. Then I help the team focus on the next goal.'
      ]
    ],
    senior: [
      [
        'How do you build a high-performing team?',
        "I hire people with the right skills and values and make sure everyone understands the goals and their role. I build trust, so people can speak up and admit mistakes without fear. I set high standards, give regular feedback and invest in people's growth. I also celebrate wins and learn together from failures."
      ],
      [
        'How do you develop a team member to become a leader?',
        'I give them small leadership tasks first, such as leading a meeting or training a new colleague. I coach them, give feedback and share how I make decisions. Step by step, I give them more responsibility and let them make some decisions on their own. I also support them in finding training or a mentor.'
      ]
    ]
  },
  logistics: {
    label: 'Supply Chain and Logistics Coordinator',
    role: 'Supply Chain and Logistics Coordinator',
    color: '#6b3410',
    icon: 'M2 7h11v9H2zM13 10h4l4 3v3h-8zM6 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM17 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
    setupRole: 'Supply Chain and Logistics Coordinator',
    keywords: ['supply chain', 'logistics', 'shipping', 'warehouse'],
    skills: [
      'Inventory control',
      'Order tracking',
      'Shipping documents',
      'Carrier management',
      'ERP systems',
      'Excel',
      'Demand planning',
      'Warehouse operations',
      'Cost control',
      'Communication'
    ],
    mid: [
      [
        'How do you keep inventory levels right, not too high and not too low?',
        'I set reorder points and safety stock for each item based on how fast it sells and how long suppliers take to deliver. I check stock levels in the system every day and review slow-moving items. Regular cycle counts keep the system figures accurate. I adjust the levels when demand or supplier lead times change.'
      ],
      [
        'How do you track orders from the supplier to the customer?',
        "I use the ERP system and the carriers' tracking tools to follow each shipment. I check key points, such as dispatch, transit, customs and delivery, and I watch for delays. When something looks late, I contact the carrier or supplier early. I keep customers and the sales team updated, so nobody is surprised."
      ],
      [
        'How do you choose and work with carriers?',
        'I compare carriers on cost, delivery time, reliability, coverage and how they handle problems. I agree on rates and service levels and track their performance, such as on-time delivery and damage rates. I keep regular contact and raise problems quickly with facts. For important routes, I keep a backup carrier.'
      ],
      [
        'What do you do when a shipment is delayed or stock runs short?',
        'I find out how long the delay will be and which orders are affected. I look for options, such as stock in another warehouse, a faster shipping method or a different supplier. I tell the sales team and the customers early, with a realistic new date. Afterwards I check what caused it and how to prevent it next time.'
      ],
      [
        'Which shipping documents do you handle, and why are they important?',
        'Common documents are the purchase order, the commercial invoice, the packing list, the bill of lading or air waybill, and for imports and exports, customs declarations and certificates of origin. They show what is shipped, who owns it and its value. Mistakes in documents can cause customs delays or extra costs. I check every document carefully before the goods move.'
      ],
      [
        'How do you reduce logistics costs without slowing deliveries?',
        'I look at the biggest costs first, such as freight, storage and rush orders. I combine small shipments into fuller loads and plan orders earlier to avoid express shipping. I negotiate rates with carriers based on our volume. I track delivery times, so savings do not hurt service.'
      ],
      [
        'How do you work with the warehouse team every day?',
        'I share the daily plan of incoming deliveries and outgoing orders, so they can plan people and space. I tell them early about urgent or large orders. We check stock differences and damaged goods together and fix the causes. Good communication keeps orders moving and errors low.'
      ]
    ],
    fresher: [
      'I set reorder points and safety stock based on sales and supplier lead times. I check stock daily and do regular counts.',
      "I follow each shipment in the system and the carrier's tracking tool. If something is late, I contact the carrier and update the team.",
      'I compare carriers on cost, speed and reliability and track their performance. I keep a backup carrier for important routes.'
    ],
    junior: [
      [
        'What is the difference between FIFO and FEFO in a warehouse?',
        'FIFO means first in, first out, so the oldest stock leaves first. FEFO means first expired, first out, so stock with the nearest expiry date leaves first. FEFO is used for products with expiry dates, such as food and medicine. Both reduce waste, but FEFO protects customers from receiving expired goods.'
      ],
      [
        'What are Incoterms, and why do they matter?',
        'Incoterms are standard trade terms published by the International Chamber of Commerce, such as EXW, FOB and DDP. They show who pays for transport and insurance and where the risk moves from the seller to the buyer. Using the right Incoterm avoids confusion about costs and responsibility. I always check the agreed Incoterm before I arrange a shipment.'
      ]
    ],
    senior: [
      [
        'How do you improve the reliability of a supply chain?',
        'I map the supply chain and find weak points, such as single suppliers, long routes or poor forecasts. I add backup suppliers for key items, keep safety stock where it matters and improve demand planning with sales. I agree on clear performance measures with suppliers and carriers. I review risks regularly, because markets and routes change.'
      ],
      [
        'Which supply chain KPIs do you track?',
        'I track on-time and in-full delivery, inventory turnover, stock accuracy and order cycle time. I also watch freight cost per order and supplier on-time performance. I show the KPIs on a simple dashboard and review them weekly with the team. When a KPI drops, I look for the root cause and agree on actions.'
      ]
    ]
  },
  // ---- PR G2: Finance, Marketing, Sales and Retail, and Customer Service roles
  finanalyst: {
    label: 'Financial Analyst',
    role: 'Financial Analyst',
    color: '#14532d',
    icon: 'M3 3v18h18M7 14l3-3 3 2 5-6M17 7h2v2',
    setupRole: 'Financial Analyst',
    keywords: ['financial analyst', 'financial planning and analysis', 'financial modelling', 'forecasting'],
    skills: [
      'Financial modelling',
      'Excel',
      'Forecasting',
      'Financial statements',
      'Scenario analysis',
      'Power BI',
      'Business partnering',
      'Presentation',
      'Accounting basics',
      'Attention to detail'
    ],
    mid: [
      [
        'How do the three financial statements link together?',
        'Net profit from the income statement flows into retained earnings on the balance sheet. The cash flow statement starts from net profit, adds back non-cash items such as depreciation and adjusts for changes in working capital. The closing cash on the cash flow statement must match the cash on the balance sheet. I use these links to check that a model is built correctly.'
      ],
      [
        'How do you build a financial forecast?',
        'I start from the actual results and the main business drivers, such as volume, price, headcount and costs. I agree on assumptions with the business teams and write them down clearly. I build the forecast so each number is linked to a driver, not typed in by hand. I update it regularly with new actuals and explain what changed since the last version.'
      ],
      [
        'How do you build an Excel model that other people can trust?',
        'I keep inputs, calculations and outputs on separate sheets, with inputs clearly marked by colour. I use simple, consistent formulas and avoid hard-coded numbers inside them. I add checks, for example that the balance sheet balances and totals match the source. I also document the assumptions, so another analyst can follow the model.'
      ],
      [
        'What is the difference between sensitivity analysis and scenario analysis?',
        'Sensitivity analysis changes one input at a time, such as price or volume, to see how much the result moves. Scenario analysis changes several inputs together to describe a full situation, such as a base case, a best case and a worst case. Sensitivity shows which drivers matter most. Scenarios help managers plan for different futures.'
      ],
      [
        'How do you analyse the performance of a business over several years?',
        'I put several years of results side by side and look at the trends in revenue, margins, costs and cash flow. I use common-size analysis, where each line is shown as a percentage of revenue, to compare years fairly. I look for the reasons behind big changes, such as new products or price increases. Then I compare the results with the plan and with similar businesses where data is available.'
      ],
      [
        'How do you explain what drove a change in profit?',
        "I build a simple bridge from last year's profit to this year's profit. Each step shows one driver, such as higher volume, price changes, product mix, cost increases or exchange rates. I check that the steps add up to the total change. A bridge chart makes it easy for managers to see what really moved the result."
      ],
      [
        'How do you turn a financial analysis into a clear recommendation?',
        'I start with the question the business needs to answer and lead with my answer, not with the method. I support it with two or three key numbers and a simple chart. I state the main assumptions and risks honestly, including what would change my view. Then I suggest the next step and who should decide.'
      ]
    ],
    fresher: [
      'Net profit flows into retained earnings on the balance sheet. The cash flow statement starts from profit and its closing cash matches the balance sheet.',
      'I start from actual results and the main business drivers. I agree on assumptions with the teams and link each number to a driver.',
      'I keep inputs, calculations and outputs separate and avoid hard-coded numbers in formulas. I add checks so errors are easy to find.'
    ],
    junior: [
      [
        'What is EBITDA, and why do analysts use it?',
        'EBITDA means earnings before interest, tax, depreciation and amortisation. It shows the profit from operations before financing costs, taxes and non-cash charges. Analysts use it to compare the operating performance of businesses with different debt or asset levels. It is not the same as cash flow, so I always look at cash flow as well.'
      ],
      [
        'Which Excel modelling mistakes are most common, and how do you avoid them?',
        'Common mistakes are hard-coded numbers in formulas, wrong cell references after copying, mixed units and broken links to other files. I avoid them with a clear structure, consistent formulas across rows and checks that flag errors. I use tools such as trace precedents to follow a formula. I ask a colleague to review important models before they are used.'
      ]
    ],
    senior: [
      [
        'How do you improve the forecasting process in a finance team?',
        'I measure how accurate past forecasts were and find where the biggest misses came from. I move the forecast towards key business drivers and remove detail that does not change decisions. I agree on a clear calendar and owners with the business teams. Where it helps, I use rolling forecasts, so the outlook always covers the next twelve or more months.'
      ],
      [
        'How do you work with business teams that give you unrealistic numbers?',
        'I ask them to explain the assumptions behind the numbers and compare them with past results and market data. I show the gap clearly and politely, using facts rather than opinions. Together we agree on a realistic base case and keep the ambitious view as a separate scenario. If we still disagree, I make the difference visible to the decision makers.'
      ]
    ]
  },
  audit: {
    label: 'Internal Auditor',
    role: 'Internal Auditor',
    color: '#1a4d2e',
    icon: 'M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM20 20l-5.6-5.6M7.5 10l2 2 3.5-3.5',
    setupRole: 'Internal Auditor',
    keywords: ['internal audit', 'internal controls', 'risk based audit', 'cia'],
    skills: [
      'Internal controls',
      'Risk assessment',
      'Audit planning',
      'Sampling',
      'Audit reporting',
      'Excel',
      'Data analytics',
      'Process walkthroughs',
      'Professional ethics',
      'Communication'
    ],
    mid: [
      [
        'How do you plan an internal audit and set its scope?',
        'I first learn how the process works and what its objectives and main risks are, by reading documents and talking to the process owner. I set the scope, such as which locations, systems and time period I will cover, and the audit objectives. I write a work program with the tests for each risk and control. I agree on the scope and the timeline with management before fieldwork starts.'
      ],
      [
        'How do you assess risk when you decide what to audit?',
        'I look at how likely a problem is and how much damage it would cause, for example financial loss, legal issues or harm to the company name. I consider changes such as new systems, new managers or fast growth, because they raise risk. I also use past audit results and input from management. The areas with the highest risk get audited first and in more depth.'
      ],
      [
        'What is the difference between the design and the operating effectiveness of a control?',
        'Design effectiveness asks whether the control, if it works as described, would prevent or detect the risk. Operating effectiveness asks whether the control actually worked during the period, every time it should have. I test design with a walkthrough of the process. I test operating effectiveness by checking a sample of real transactions.'
      ],
      [
        'How do you choose a sample and collect audit evidence?',
        'I choose the sample size based on how often the control runs and how much risk there is, and I pick items at random or with a clear method. For each item I collect evidence, such as approvals, system records and documents. Evidence should be reliable, relevant and enough to support my conclusion. I keep it in the working papers, so another auditor can follow my work.'
      ],
      [
        'How do you write a clear audit finding?',
        'I describe the condition, which is what I found, and the criteria, which is what should happen. I explain the cause and the effect, such as the risk or loss it creates. Then I give a practical recommendation and agree on an action, an owner and a due date with management. I keep the language factual and avoid blaming people.'
      ],
      [
        'How do you stay independent and objective as an internal auditor?',
        'I do not audit work that I was responsible for or helped to design. I base my conclusions on evidence, not on relationships or pressure. If there is a conflict of interest, I tell my manager so the work can be reassigned. The internal audit function reports to the audit committee or the board, which also protects its independence.'
      ],
      [
        'How do you follow up on audit findings after the report?',
        'I track each agreed action with its owner and due date in a central list. Before the due date I ask for evidence that the action is done, not only a statement. I test the evidence to confirm the issue is really fixed. Overdue actions are reported to senior management and the audit committee.'
      ]
    ],
    fresher: [
      'I learn the process and its main risks, then set the scope, objectives and tests. I agree on the plan with management before I start.',
      'I look at how likely a problem is and how much damage it would cause. The highest-risk areas are audited first.',
      'Design asks whether a control would stop the risk if it worked. Operating effectiveness asks whether it really worked every time.'
    ],
    junior: [
      [
        'What is the difference between internal audit and external audit?',
        'External auditors give an opinion on whether the financial statements are fairly presented, mainly for shareholders and regulators. Internal auditors work for the organization and review risks, controls and processes across the whole business, not only finance. Internal audit also gives advice on how to improve. The two teams often share their plans to avoid duplicate work.'
      ],
      [
        'What is the Three Lines Model?',
        'It is a model from the Institute of Internal Auditors that shows how risk management roles are shared. The first line is management, who own and manage the risks in daily work. The second line, such as risk and compliance teams, supports and monitors the first line. Internal audit is the third line and gives independent assurance to the board.'
      ]
    ],
    senior: [
      [
        'How do you build a yearly risk-based audit plan?',
        "I start from the company strategy and the risk register and talk to senior managers and the audit committee about their main concerns. I rate each area by risk and plan more frequent audits for the high-risk ones. I check that the plan fits the team's skills and hours. The plan is approved by the audit committee and updated when new risks appear."
      ],
      [
        'How do you handle a manager who disagrees with your audit finding?',
        "I listen to their view and check whether they have evidence I did not see. If they are right, I change the finding. If the evidence supports my finding, I explain it calmly and focus on the risk, not on blame. If we still disagree, I record management's response in the report, so the reader sees both views."
      ]
    ]
  },
  digitalmkt: {
    label: 'Digital Marketing Specialist',
    role: 'Digital Marketing Specialist',
    color: '#b42318',
    icon: 'M3 5h18v11H3zM8 20h8M12 16v4M7 12l3-3 2 2 4-4',
    setupRole: 'Digital Marketing Specialist',
    keywords: ['digital marketing', 'google ads', 'meta ads', 'performance marketing'],
    skills: [
      'Google Ads',
      'Meta Ads',
      'Google Analytics 4',
      'Email marketing',
      'Campaign planning',
      'A/B testing',
      'Marketing funnel',
      'Budget management',
      'Landing pages',
      'Reporting'
    ],
    mid: [
      [
        'What is a marketing funnel, and how do you use it?',
        'A marketing funnel shows the stages people move through, from first hearing about a brand to buying and coming back. A simple version is awareness, consideration, conversion and loyalty. I choose different channels and messages for each stage, for example video for awareness and search ads for people ready to buy. I track how many people move from one stage to the next to find where we lose them.'
      ],
      [
        'How do you plan a digital marketing campaign?',
        'I start with a clear goal, such as sign-ups or sales, and the audience we want to reach. I choose the channels, the message, the offer and the budget, and I set the KPIs and tracking before launch. I prepare the ads and the landing page together, so the message matches. After launch I check results often and adjust the targeting, bids and creatives.'
      ],
      [
        'How do you split a budget across digital channels?',
        'I start with the goal and where our audience spends time, and I look at past results such as cost per lead from each channel. I put most of the budget into channels that already work and keep a smaller part for testing new ones. I review spending every week and move money towards the best results. I keep enough budget in each test to get a fair result.'
      ],
      [
        'Which KPIs do you track for paid ads, and what do they mean?',
        'Click-through rate shows how many people who see an ad click it. Cost per click and cost per acquisition show how much we pay for a click and for a customer or lead. Conversion rate shows how many visitors take the action we want. Return on ad spend shows the revenue we get for each unit of money spent on ads.'
      ],
      [
        'How do you test ad creatives and landing pages?',
        'I test one main difference at a time, such as the image, the headline or the offer, so I know what caused the change. I let the test run until each version has enough data, instead of stopping after one day. I choose the winner based on the main goal, such as cost per lead, not only on clicks. Then I use what I learned in the next creatives.'
      ],
      [
        'What are the basics of good email marketing?',
        'I only email people who agreed to hear from us, and I make unsubscribing easy, as privacy laws require. I segment the list, for example new customers and regular buyers, and send relevant content to each group. I write a clear subject line, one main message and one call to action. I track clicks and conversions, because open rates are less reliable since some email apps load images automatically.'
      ],
      [
        'What is the difference between search ads and social media ads?',
        'Search ads, such as Google Ads, show when people search for something, so they reach people who already have a need. Social media ads, such as on Meta platforms, show in feeds based on interests, behaviour and audiences, so they are good for creating demand. Search usually converts well but has limited volume. I often use social ads to build awareness and search ads to capture people who are ready to act.'
      ]
    ],
    fresher: [
      'A funnel shows the stages from first hearing about a brand to buying. I use different channels and messages for each stage.',
      'I set a clear goal and audience, then choose channels, message, budget and KPIs. After launch I check results and adjust.',
      'I put most of the budget into channels that already work and keep some for tests. I review spending every week.'
    ],
    junior: [
      [
        'How do you use Google Analytics 4 to understand campaign results?',
        'I make sure campaigns use UTM parameters, so GA4 knows which source and campaign each visit came from. I set up the key events we care about, such as sign-ups or purchases, as conversions. In the reports I compare traffic, engagement and conversions by channel and campaign. I also check that the numbers roughly match the ad platforms, because they count differently.'
      ],
      [
        'How do you grow an email list in the right way?',
        'I offer something useful in return, such as a guide, a discount or a newsletter that people want. I ask for clear permission and explain what people will receive and how often. I never buy email lists, because it breaks trust and often privacy rules. I keep the list clean by removing addresses that bounce or never engage.'
      ]
    ],
    senior: [
      [
        'How do you measure the return on marketing spend across channels?',
        'I agree on the business goal and how we count a conversion, then I track it across all channels. I compare attribution views, such as last click and data-driven attribution, because each tells a different story. For bigger budgets I use tests, such as turning a channel off in one region, to measure its real effect. I report the results in business terms, such as revenue and cost per customer.'
      ],
      [
        'How do you prepare marketing for stricter privacy rules and fewer third-party cookies?',
        'I build first-party data, such as email lists and customer accounts, with clear consent. I set up consent management correctly and use the privacy features that ad platforms offer, such as server-side tracking where it is allowed. I rely more on contextual targeting and testing than on detailed tracking. I keep the legal and data teams involved in every change.'
      ]
    ]
  },
  seo: {
    label: 'SEO Specialist',
    role: 'SEO Specialist',
    color: '#9b1c1c',
    icon: 'M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM20 20l-5.6-5.6M7 11l2-2 2 2 2-3',
    setupRole: 'SEO Specialist',
    keywords: ['seo', 'search engine optimization', 'google search console', 'technical seo'],
    skills: [
      'Keyword research',
      'On-page SEO',
      'Technical SEO',
      'Google Search Console',
      'Google Analytics 4',
      'Content strategy',
      'Link building',
      'Core Web Vitals',
      'Structured data',
      'Reporting'
    ],
    mid: [
      [
        'How do you do keyword research for a new website?',
        'I start from the business, its products and the questions customers ask. I use tools such as Google Keyword Planner, Search Console and other SEO tools to find search terms, their volume and how hard they are to rank for. I group related keywords into topics and match each topic to one page. I focus on terms that bring the right visitors, not only the biggest numbers.'
      ],
      [
        'What do you check in on-page SEO?',
        'I check that each page has a clear title tag and meta description that match what people search for. The page has one main heading, a logical structure with subheadings and useful content that answers the question. Images have descriptive alt text, and internal links connect related pages. The URL is short and readable.'
      ],
      [
        'What is technical SEO, and what do you check first?',
        'Technical SEO makes sure search engines can crawl, render and index the site. I check the robots.txt file, the XML sitemap, canonical tags and that important pages return a 200 status and are not blocked. I look at page speed and Core Web Vitals, such as LCP, INP and CLS, and at mobile usability. Search Console shows me pages with indexing problems.'
      ],
      [
        'How do you earn links in a white hat way?',
        'I create content that people want to reference, such as original data, useful guides or free tools. I share it with relevant websites, journalists and partners who would genuinely find it useful. I also fix broken links that point to us and claim mentions of the brand that are not yet linked. I never buy links or use link schemes, because they break search engine rules and can lead to penalties.'
      ],
      [
        'What is search intent, and why does it matter?',
        'Search intent is the reason behind a search, such as wanting to learn something, find a specific site, compare options or buy. Google ranks pages that match the intent best, so a sales page rarely ranks for a how-to search. I look at the pages that already rank to understand the intent. Then I create the type of content that fits it.'
      ],
      [
        'How do you use Google Search Console in your work?',
        'I use the performance report to see which queries and pages bring clicks and impressions, and how the click-through rate changes. The indexing reports show pages that are not indexed and why. I submit sitemaps and use URL inspection to check how Google sees a page. It also alerts me to manual actions and security issues.'
      ],
      [
        'Organic traffic dropped suddenly. How do you find the cause?',
        'I first check whether the drop is real, for example a tracking problem or a seasonal pattern. Then I look in Search Console at which pages and queries lost clicks and when it started. I compare the date with site changes, such as a redesign or migration, and with known Google updates. Once I know the cause, such as a technical error or weaker content, I fix it and watch the recovery.'
      ]
    ],
    fresher: [
      'I start from the business and customer questions and use tools to find search terms. I group them into topics and match each topic to a page.',
      'I check the title, meta description, headings, useful content, image alt text and internal links. The URL should be short and clear.',
      'Technical SEO makes sure search engines can crawl and index the site. I check robots.txt, the sitemap, canonical tags and page speed.'
    ],
    junior: [
      [
        'What is structured data, and how does it help SEO?',
        "Structured data is code, usually in JSON-LD format using Schema.org, that describes a page in a way search engines understand, such as a product, a recipe or an event. It can make a page eligible for rich results, such as star ratings or prices in search. It does not guarantee higher rankings. I test it with Google's Rich Results Test and only mark up content that is really on the page."
      ],
      [
        'How do you improve SEO for a local business?',
        'I set up and complete the Google Business Profile with the correct name, address, phone, hours, photos and categories. I make sure these details are the same across the website and other directories. I encourage happy customers to leave honest reviews and reply to reviews politely. I also create pages for the services and areas the business really serves.'
      ]
    ],
    senior: [
      [
        'How do you plan SEO for a website migration?',
        'I list all important URLs and their traffic before the move and map each old URL to its best new URL. I set up permanent 301 redirects, keep valuable content and update internal links, canonicals and sitemaps. I test everything on a staging site before launch. After launch I watch Search Console and traffic closely and fix errors quickly.'
      ],
      [
        'How do you report SEO results to stakeholders?',
        'I connect SEO to business goals, such as leads or sales from organic search, not only rankings. I show trends in clicks, impressions, conversions and the main pages and topics. I explain what we did, what worked and what we will do next, in simple language. I am honest that SEO takes time and that search engine updates can change results.'
      ]
    ]
  },
  socialmedia: {
    label: 'Social Media Manager',
    role: 'Social Media Manager',
    color: '#a8164c',
    icon: 'M18 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM6 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM18 14a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
    setupRole: 'Social Media Manager',
    keywords: ['social media manager', 'social media marketing', 'instagram', 'tiktok'],
    skills: [
      'Content planning',
      'Community management',
      'Instagram',
      'TikTok',
      'LinkedIn',
      'Social media analytics',
      'Short-form video',
      'Canva',
      'Brand voice',
      'Crisis communication'
    ],
    mid: [
      [
        'How do you build a monthly social media calendar?',
        'I start from the marketing goals and key dates for the month, such as launches, events and holidays. I plan a mix of content types, such as education, behind the scenes, customer stories and offers, for each platform. Each post has a date, a format, an owner and the assets it needs. I leave room for timely posts and trends.'
      ],
      [
        'How do you adapt content for different social platforms?',
        'Each platform has its own audience and style. LinkedIn works best with professional insights and stories, Instagram with strong visuals and Reels, and TikTok with short, authentic videos that follow trends. I adapt the format, length, captions and tone for each one instead of posting the same thing everywhere. I also post at the times when each audience is most active.'
      ],
      [
        'How do you grow engagement and build a community on social media?',
        'I post content that is useful, entertaining or relevant to the audience, not only about the brand. I reply to comments and messages quickly and in a human way. I ask questions, run polls and share content from customers with their permission. Regular, honest interaction builds a community that trusts the brand.'
      ],
      [
        'Which social media metrics do you track, and why?',
        'I track reach and impressions to see how many people see our content. Engagement rate, saves and shares show whether people find it valuable. Follower growth shows how the audience changes, and clicks and conversions show the business result. I choose the main metrics based on the goal of each campaign.'
      ],
      [
        'How do you handle negative comments on a brand page?',
        'I respond quickly and politely, thank the person and acknowledge the problem. If it needs personal details, I move the conversation to a private message. I never delete fair criticism, but I follow the page rules for abuse, spam or hate. I share real problems with the right team, so the cause gets fixed.'
      ],
      [
        'How do you keep the brand voice the same across platforms and team members?',
        'I write a short social media style guide with the tone, words we use and avoid, emoji rules and example replies. Everyone who posts or replies uses it, including agencies. I review posts before they go live and give quick feedback. The tone can change a little for each platform, but the personality stays the same.'
      ],
      [
        'How do you work with designers and writers on social content?',
        'I give them a clear brief with the goal, the audience, the platform, the format and the deadline. I share examples of what has worked well before. I give feedback in one place, with specific points, and agree on the number of review rounds. Good briefs save time and give better content.'
      ]
    ],
    fresher: [
      'I start from the goals and key dates for the month and plan a mix of content for each platform. Each post has a date, a format and an owner.',
      'Each platform has its own style, such as professional posts on LinkedIn and short videos on TikTok. I adapt the format and tone for each one.',
      'I post content the audience finds useful and reply to comments quickly. I ask questions and share customer content with permission.'
    ],
    junior: [
      [
        'How do you plan short-form video content?',
        'I plan simple ideas that grab attention in the first seconds, such as a question, a quick tip or a before and after. I keep videos short, add captions and use trending sounds where they fit the brand. I film vertically for Reels, TikTok and YouTube Shorts. I check which videos people watch to the end and make more like them.'
      ],
      [
        'How do you work with creators or influencers?',
        'I choose creators whose audience and values fit the brand, not only those with the most followers. I agree on the goals, the content, the timeline and the payment in writing. Sponsored posts must be clearly marked, for example with a paid partnership label, as the platforms and advertising rules require. I measure the results, such as reach, engagement and sales from their posts.'
      ]
    ],
    senior: [
      [
        'How do you handle a social media crisis?',
        'I pause scheduled posts and get the facts quickly from the right people. With the communications and legal teams, I agree on a short, honest response and who will post it. I respond in the right channels and keep monitoring the reaction closely. After the crisis, I review what happened and update our crisis plan.'
      ],
      [
        'How do you set social media goals that support business goals?',
        'I start from the business goal, such as more leads, sales or brand awareness among a new audience. Then I choose the social metrics that show progress towards it, such as reach in the target audience or leads from social. I set realistic targets based on past results. I report progress monthly and change the plan when the numbers show it is not working.'
      ]
    ]
  },
  storesup: {
    label: 'Store Supervisor',
    role: 'Store Supervisor',
    color: '#5b2c9e',
    icon: 'M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M10 20v-6h4v6',
    setupRole: 'Store Supervisor',
    keywords: ['store supervisor', 'shop supervisor', 'floor supervisor', 'retail supervisor'],
    skills: [
      'Store operations',
      'Cash reconciliation',
      'Staff scheduling',
      'Stock control',
      'Visual merchandising',
      'Loss prevention',
      'Customer service',
      'Health and safety',
      'Point of sale',
      'Reporting'
    ],
    mid: [
      [
        'What do you check when you open and close a store?',
        'At opening I check that the store is clean, safe and stocked, the tills have the right cash float and the staff know the plan for the day. I make sure prices, promotions and displays are ready before customers arrive. At closing I count and secure the cash, check that the shop floor is tidy and doors and alarms are set. I follow a written checklist, so nothing is missed.'
      ],
      [
        'How do you plan the staff rota for the week?',
        'I look at the expected footfall for each day and hour, using past sales and planned promotions. I schedule more people at busy times and make sure every shift has someone who can open, close and handle cash. I follow the rules on working hours and breaks and share the rota early. When someone is absent, I find cover quickly and fairly.'
      ],
      [
        'What do you do when the till does not match at the end of the day?',
        'I recount the cash and check the till report, refunds, voids and card payments for mistakes. I look for simple causes, such as change given wrongly or a payment entered twice. I record the difference and the reason, following the company procedure. If differences repeat, I look for patterns and retrain staff or tighten the cash process.'
      ],
      [
        'How do you run a stock count and reduce shrinkage?',
        'I plan the count when the store is quiet, split the store into zones and use scanners where possible. I compare the counted stock with the system and investigate big differences. To reduce shrinkage, I check deliveries carefully, protect high-value items, record damaged goods correctly and train staff to follow the procedures. I track shrinkage over time to see if the actions work.'
      ],
      [
        'How do you keep the store looking right and follow the merchandising plan?',
        'I follow the planogram and the merchandising guidelines from head office, so products are in the right place and quantity. I keep shelves full, faced and clean, with clear price labels. I check the store as a customer would see it, especially the entrance and key displays. When stock runs low, I adjust the display so it never looks empty.'
      ],
      [
        'What do you do when a customer asks to speak to the supervisor?',
        'I introduce myself, listen to the whole story and thank the staff member for bringing me in. I look for a fair solution within the company policy, such as an exchange, a refund or an alternative. If I cannot give what the customer wants, I explain why and offer what I can. Afterwards, I talk with the staff member about what we can learn.'
      ],
      [
        'Which store numbers do you check every day?',
        'I check total sales against the daily target and against the same day last year. I look at the number of transactions, the average transaction value and, where we have a counter, the conversion rate of visitors to buyers. I also check stock of best sellers and any cash differences. These numbers help me plan the next day and the staff on the floor.'
      ]
    ],
    fresher: [
      'At opening I check cleanliness, stock, the cash float and the plan for the day. At closing I secure the cash and set the doors and alarms.',
      'I schedule more staff at busy times and make sure each shift can open, close and handle cash. I share the rota early.',
      'I recount the cash and check refunds, voids and card payments for mistakes. I record the difference and the reason.'
    ],
    junior: [
      [
        'What do you do if you think someone is shoplifting?',
        'I follow the company loss prevention policy, and the safety of staff and customers comes first. I do not accuse or chase anyone myself. I greet the person and offer help, because good customer service often stops theft. If needed, I inform security or the manager and record what happened accurately.'
      ],
      [
        'How do you keep the store safe for staff and customers?',
        'I check that walkways and fire exits are clear and that spills are cleaned and marked at once. Staff are trained to lift heavy boxes safely and use ladders correctly. I report and fix hazards, such as broken shelves or lights. I follow the health and safety rules and record any accident properly.'
      ]
    ],
    senior: [
      [
        'How do you prepare a store for a big sale event?',
        'I agree on the plan with head office, including the offers, the stock and the displays. I make sure we receive enough stock and have extra staff, extra tills and clear signs. I brief the team on the offers, the busy times and how to handle queues. After the event I review the sales, stock left and customer feedback.'
      ],
      [
        'How do you work with head office on stock and promotions?',
        'I share clear information from the store, such as best sellers, products that do not sell and what customers ask for. I follow the promotion and merchandising plans and report problems early, for example missing stock or wrong prices. I make suggestions with numbers to support them. Good communication helps head office send the right stock to the store.'
      ]
    ]
  },
  bizdev: {
    label: 'Business Development Executive',
    role: 'Business Development Executive',
    color: '#4a2580',
    icon: 'M4 18l5-5 4 4 7-8M15 9h5v5',
    setupRole: 'Business Development Executive',
    keywords: ['business development', 'b2b sales', 'lead generation', 'crm'],
    skills: [
      'Lead generation',
      'Prospecting',
      'Cold outreach',
      'CRM',
      'Pipeline management',
      'Proposals',
      'Negotiation',
      'LinkedIn',
      'Market research',
      'Presentation'
    ],
    mid: [
      [
        'How do you generate new leads for the business?',
        'I first define the ideal customer, such as the industry, company size and the problem we solve for them. Then I find leads through LinkedIn, industry events, referrals from customers and partners, and inbound leads from marketing. I research each lead before I contact them. I track where good leads come from and spend more time on those sources.'
      ],
      [
        'How do you write a cold outreach message that gets replies?',
        'I keep it short and about the prospect, not about us. I mention something specific about their company or role and the problem we may help with. I end with one simple question, such as whether a short call next week makes sense. I follow up a few times politely and stop if they are not interested.'
      ],
      [
        'How do you decide whether a lead is worth pursuing?',
        'I check whether they have a real need we can solve, whether they have budget, who makes the decision and when they want to act. Frameworks such as BANT help me ask these questions in a natural way. If a lead does not fit now, I keep in touch for later instead of pushing. This keeps my time on the deals that can close.'
      ],
      [
        'How do you manage your pipeline in a CRM?',
        'I record every lead, contact and deal in the CRM with the stage, value, next step and date. I update it after every call or meeting, so the data is always current. Each week I review the pipeline, move deals forward or close them as lost. This helps me and my manager forecast sales and see where deals get stuck.'
      ],
      [
        'How do you prepare a strong business proposal?',
        "I start with the client's problem and goals in their own words, from our discovery conversations. Then I explain our solution, how it solves the problem, the timeline and the price, in clear language. I add proof, such as case studies or results, and make the next steps easy to follow. I review the proposal with the client before the final version where possible."
      ],
      [
        'How do you negotiate a deal fairly?',
        'I prepare by knowing our walk-away point and what we can offer besides price, such as payment terms, training or a longer contract. I listen to understand what really matters to the client. I trade concessions instead of giving discounts for free. My aim is an agreement both sides are happy with, because good relationships bring repeat business.'
      ],
      [
        'How do you follow up after a meeting with a prospect?',
        'I send a short follow-up the same day with a summary of what we discussed, the agreed next steps and any material I promised. I record the meeting in the CRM and set a reminder for the next contact. If the prospect goes quiet, I follow up with something useful, such as a relevant case study. I stay persistent but respectful.'
      ]
    ],
    fresher: [
      'I define the ideal customer first, then find leads through LinkedIn, events, referrals and marketing. I research each lead before I contact them.',
      "I keep the message short and about the prospect's problem. I end with one simple question and follow up politely.",
      'I check their need, budget, decision maker and timing. If a lead does not fit now, I keep in touch for later.'
    ],
    junior: [
      [
        'How do you research a company before the first call?',
        'I read their website, recent news, annual report if available and the LinkedIn profiles of the people I will meet. I try to understand their goals, challenges and how they make money. I prepare a few questions about their needs and an idea of how we might help. Good research shows respect and makes the call more useful for both sides.'
      ],
      [
        'What do you do when a prospect says the price is too high?',
        'I ask what they are comparing it with and what matters most to them. I explain the value and the results they can expect, not only the features. If there is a real budget limit, I look at options, such as a smaller package or different payment terms. I never promise things we cannot deliver just to close the deal.'
      ]
    ],
    senior: [
      [
        'How do you plan entry into a new market or customer segment?',
        'I research the market size, the main customer needs, the competitors and any rules we must follow. I define who our ideal customers are there and what message will matter to them. I start with a small test, such as a pilot with a few customers, to learn quickly. Then I set targets and a plan to grow if the test works.'
      ],
      [
        'How do you build a strategic partnership with another company?',
        'I look for partners whose customers and goals fit ours, so both sides gain. I agree on what each side brings, how we share leads and revenue and how we measure success. I start with a small joint project to build trust. Regular reviews keep the partnership active and fair.'
      ]
    ]
  },
  callcenter: {
    label: 'Call Center Agent',
    role: 'Call Center Agent',
    color: '#8e1537',
    icon: 'M4 13v-1a8 8 0 0 1 16 0v1M4 13h3v5H4zM17 13h3v5h-3zM20 18c0 2-2 3-5 3h-2',
    setupRole: 'Call Center Agent',
    keywords: ['call center', 'call centre', 'contact center', 'bpo'],
    skills: [
      'Call handling',
      'Active listening',
      'CRM',
      'Call metrics',
      'Data protection',
      'Typing speed',
      'Empathy',
      'Problem solving',
      'Schedule adherence',
      'Product knowledge'
    ],
    mid: [
      [
        'How do you open and close a call professionally?',
        "I open with a friendly greeting, my name and the company name, and I ask how I can help. I confirm the caller's details following the security steps. At the end I summarise what we agreed, check that the caller has no other questions and thank them. A clear opening and closing make the call feel organized and polite."
      ],
      [
        'What do AHT, FCR and CSAT mean in a call center?',
        'AHT, or average handle time, is the average length of a call including hold time and after-call work. FCR, or first call resolution, is the share of issues solved on the first contact. CSAT, or customer satisfaction, comes from short surveys after the call. I try to solve the issue fully first, because a short call that leads to a repeat call is not good service.'
      ],
      [
        'How do you follow a call script and still sound natural?',
        'I learn the script well, so I know the key steps and the required wording, such as legal statements. I use my own words for the rest and adjust my tone to the caller. I listen actively and respond to what the caller says, not only to the next line of the script. The script guides me, but empathy makes the call work.'
      ],
      [
        'How do you put a caller on hold or transfer a call correctly?',
        'I ask permission before I put someone on hold, explain why and say roughly how long it will take. I check back if the hold takes longer than expected. Before a transfer, I explain to the caller who I am transferring them to and why. I give the next agent a short summary, so the caller does not have to repeat everything.'
      ],
      [
        'Why are after-call notes important, and what do you write?',
        'Good notes let the next agent understand the case quickly, even if the customer calls again. I write the reason for the call, what I checked, what I did and any promise or next step with a date. I keep the notes short, clear and factual. I finish them right after the call, while the details are fresh.'
      ],
      [
        'How do you verify a caller and protect their personal data?',
        'I follow the security steps every time, such as asking for specific account details, before I share or change anything. I never give personal data to someone who cannot pass verification, even if they sound genuine. I do not write customer data on paper or say it loudly. If something feels like a scam attempt, I follow the fraud procedure and report it.'
      ],
      [
        'What is schedule adherence, and why does it matter?',
        'Schedule adherence means being available to take calls at the times planned for me, including logging in on time and taking breaks as scheduled. The workforce team plans the number of agents for each half hour based on expected calls. If agents are not available as planned, waiting times go up for customers. I plan my day so I keep to my schedule.'
      ]
    ],
    fresher: [
      'I greet the caller with my name and the company name and confirm their details. At the end I summarise the call and thank them.',
      'AHT is the average length of a call, and FCR means solving the issue on the first call. CSAT is the satisfaction score from short customer surveys.',
      'I learn the key steps and required wording of the script. I use my own words for the rest and listen to the caller.'
    ],
    junior: [
      [
        'What do you do when the system goes down during a call?',
        'I stay calm and tell the caller honestly that our system is slow or not working at the moment. I take their details and the problem on a secure form or note the team has approved, and offer to call back when the system is working. I report the problem to my team leader at once. When it is fixed, I complete the case and call the customer back as promised.'
      ],
      [
        'How do you make an outbound call to a customer?',
        "I prepare first by reading the customer's history and the purpose of the call. I introduce myself, explain clearly why I am calling and check that it is a good time to talk. I respect their choice if they are not interested and follow the rules on calling times and consent. I record the outcome of the call in the CRM."
      ]
    ],
    senior: [
      [
        'How do you coach agents using call recordings?',
        'I listen to a few calls with the agent and start with what they did well. Then I pick one or two specific points to improve, such as the opening or how they explained a policy. We agree on a small goal and I listen again later to check progress. I base the coaching on the quality checklist, so it is fair and consistent.'
      ],
      [
        'How do you reduce repeat calls in a call center?',
        'I look at the reasons for repeat calls, such as unclear answers, unfinished cases or problems in other teams. I share the main causes with the team and update scripts and the knowledge base. I work with other departments to fix process issues that cause calls, such as unclear bills. I track first call resolution to see if the changes work.'
      ]
    ]
  }
};

// Target roles added to the setup screen for these interview types (with their skill suggestions).
export const MORE_ROLES = {};
Object.values(MORE).forEach(m => {
  if (m.skills && m.setupRole && !MORE_ROLES[m.setupRole]) MORE_ROLES[m.setupRole] = m.skills;
});
