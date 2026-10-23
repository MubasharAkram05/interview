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
        'I compare totals with the source system or an earlier trusted report. I check row counts after every join and filter, because a wrong join can double or drop rows. I look for values that do not make sense, such as negative quantities. When possible, a colleague reviews the logic before the report goes out.'
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
        'A p-value is the probability of seeing a result at least as extreme as the one observed, assuming there is no real effect. A small p-value, often below 0.05, suggests the result is unlikely to be due to chance alone. It does not show how large or important the effect is, and it is not the probability that the effect is real. So I also report the effect size and a confidence interval.'
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
        'I check the data at each stage: row counts, required columns not empty, unique keys, valid ranges and allowed values. I also compare totals with the source. Critical failures stop the pipeline and alert the team, while small warnings are logged for review. This stops bad data from reaching reports.'
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
        'A candidate key is any column, or set of columns, that can uniquely identify a row; one of them is chosen as the primary key. A composite key uses two or more columns together, such as student ID and course ID in an enrolment table. A surrogate key is an artificial value, such as an auto-generated number, with no business meaning. I often use a surrogate key as the primary key and keep a unique constraint on the natural key.'
      ],
      [
        'What is the difference between the first, second and third normal forms?',
        'First normal form means each column holds a single value and there are no repeating groups. Second normal form also requires every non-key column to depend on the whole primary key, not on part of a composite key. Third normal form also removes columns that depend on other non-key columns, such as a city name that depends on a postcode in the same table.'
      ],
      [
        'What are database constraints, and why are they important?',
        'Constraints are rules the database enforces on the data. NOT NULL makes a value required, UNIQUE stops duplicates, CHECK limits values to a valid range, and PRIMARY KEY and FOREIGN KEY keep rows identifiable and correctly linked. They protect data quality even when application code has a bug, because the database itself rejects bad data.'
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
        'dbt lets me write transformations as SQL select statements, called models, that build tables and views inside the warehouse. It works out the order between models, and I add tests for missing values, unique keys and valid links between tables. It also creates documentation and lineage. All the code lives in Git, so every change goes through review.'
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
        'I compare row counts and totals between the source and the target. I test edge cases such as empty values, duplicates, late records and special characters. I check that running the job twice gives the same result. Business users review a sample of the output before release.'
      ],
      [
        'How do you load a fact table so it links to the right dimension rows?',
        'I load the dimensions first, so every key exists. When I load the facts, I look up each business key, such as a customer code, in the dimension and store its surrogate key. For Type 2 dimensions, I pick the row that was valid on the transaction date. If no match is found, I link the fact to an unknown member row and report it, instead of dropping the fact.'
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
  }
};

// Target roles added to the setup screen for these interview types (with their skill suggestions).
export const MORE_ROLES = {};
Object.values(MORE).forEach(m => {
  if (m.skills && m.setupRole && !MORE_ROLES[m.setupRole]) MORE_ROLES[m.setupRole] = m.skills;
});
