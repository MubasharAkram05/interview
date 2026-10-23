# PR D: new questions for review

For review only. This file is not part of the app (the app reads src/data/more-questions.js).

Every category also has the shared opening and closing questions (not repeated here). Fresher shows the first 3 role questions with the simpler Fresher answer; Junior and Senior show all 7 role questions with the full answer, plus their 2 extra questions. Counts per level: Fresher 10, Junior 19, Senior 19.

- **Software Development**
  - [Python Developer](#python-developer)
  - [C# / .NET Developer](#c--net-developer)
- **Web Development**
  - [Frontend Developer](#frontend-developer)
  - [Backend Developer](#backend-developer)
  - [Full Stack Developer](#full-stack-developer)
  - [WordPress Developer](#wordpress-developer)
- **Mobile App Development**
  - [Mobile App Development](#mobile-app-development)
  - [Android Developer](#android-developer)
  - [Flutter Developer](#flutter-developer)
  - [React Native Developer](#react-native-developer)
  - [iOS Developer](#ios-developer)

# Parent: Software Development

## Python Developer

- id: `python`
- Role label: Python Developer
- Profile role (setupRole): Python Developer
- Suggested skills: Python, OOP, Django, Flask, FastAPI, REST API, SQL, Git, Pytest, Data structures
- Search keywords: django, flask, fastapi, pytest

### Role questions (Junior and Senior answers)

1. **What is the difference between a list, a tuple, a set and a dictionary in Python?**
   A list is an ordered collection that can change, and it allows duplicates. A tuple is also ordered but cannot change after it is created, so it suits fixed data. A set holds unique values with no fixed order and is fast for checking whether a value is present. A dictionary stores key and value pairs and keeps the order in which keys were added.
2. **What are decorators in Python?**
   A decorator is a function that takes another function and returns a new function with extra behaviour, without changing the original code. I apply it with the @ symbol on the line above a function. Common uses are logging, timing, permission checks and caching, for example functools.lru_cache. Web frameworks also use decorators to connect URLs to view functions.
3. **Why do you use a virtual environment in Python?**
   A virtual environment is an isolated folder with its own packages for one project. It stops projects from breaking each other when they need different versions of the same library. I create one with python -m venv, activate it and record the dependencies in a requirements file or pyproject.toml. Installing everything globally mixes projects together and causes conflicts.
4. **What are generators, and why are they useful?**
   A generator is a function that uses yield to give values one at a time instead of building a whole list in memory. It pauses after each value and continues from the same place on the next request. This makes it good for large files or long streams of data. Generator expressions work the same way for simple cases.
5. **What is the GIL, and how does it affect threads in Python?**
   The global interpreter lock, or GIL, in the standard CPython build lets only one thread run Python code at a time. So threads help with waiting tasks, such as network calls, but not with heavy CPU work. For CPU-heavy work I use multiprocessing or libraries that do the work in native code. For many network tasks, asyncio is also a good choice.
6. **When would you choose Django, Flask or FastAPI?**
   Django is a full framework with an ORM, an admin panel and authentication built in, so it suits larger apps that need all of that. Flask is small and flexible, and I add only the parts I need. FastAPI is built for APIs, uses type hints for automatic validation and documentation and supports async code. I choose based on the project size, the team and whether it is mainly an API.
7. **How do you test Python code with pytest?**
   I write small test functions whose names start with test_ and use plain assert statements. Fixtures prepare shared setup, such as sample data or a test database, and parametrize runs one test with many inputs. I mock external services, so tests are fast and reliable. The tests run in CI on every change.

### Fresher answers (first 3 role questions)

1. **What is the difference between a list, a tuple, a set and a dictionary in Python?**
   A list is ordered and can change. A tuple is ordered but fixed, a set keeps only unique values and a dictionary stores key and value pairs.
2. **What are decorators in Python?**
   A decorator wraps a function to add extra behaviour, like logging or timing, without changing its code. I write it with the @ symbol above the function.
3. **Why do you use a virtual environment in Python?**
   A virtual environment keeps the packages of one project separate from other projects. This stops version conflicts between them.

### Junior extra questions

1. **What is the difference between a shallow copy and a deep copy in Python?**
   A shallow copy creates a new outer object but still shares the inner objects, such as lists inside a list. So changing an inner list changes it in both copies. A deep copy, made with copy.deepcopy, copies every nested object, so the two are fully independent. I use a deep copy only when I need it, because it is slower.
2. **What are list comprehensions, and when should you avoid them?**
   A list comprehension builds a new list in one readable line, for example the squares of a range of numbers. It is usually clearer and faster than a loop that appends items. I avoid it when the logic needs several conditions or nested loops, because a normal loop is then easier to read. For large data, a generator expression saves memory.

### Senior extra questions

1. **How do you structure a large Python project?**
   I split the code into packages by feature, with small modules and clear names. I use pyproject.toml for dependencies and tool settings, type hints checked by a type checker, and a formatter and linter in CI. Configuration comes from environment variables, not from the code. Tests live in their own folder and follow the package structure.
2. **How do you use asyncio in a Python service?**
   The asyncio library lets one thread handle many waiting tasks, such as network or database calls, by switching between them while each one waits. I write coroutines with async def and wait for results with await. I use async libraries for HTTP and databases, because one blocking call stops the whole event loop. It works well for APIs with many slow requests, not for heavy CPU work.

## C# / .NET Developer

- id: `dotnet`
- Role label: C# and .NET Developer
- Profile role (setupRole): C#/.NET Developer
- Suggested skills: C#, .NET, ASP.NET Core, Entity Framework, LINQ, SQL Server, REST API, OOP, Git, Unit testing
- Search keywords: c#, csharp, dotnet, .net, asp.net, entity framework

### Role questions (Junior and Senior answers)

1. **What is the difference between .NET Framework and modern .NET?**
   .NET Framework is the older version that runs only on Windows and now gets mainly maintenance updates. Modern .NET grew out of .NET Core: it is cross-platform, open source and faster, and it runs on Windows, Linux and macOS. New projects should use modern .NET. I would use .NET Framework only to maintain an existing app.
2. **What are records in C#?**
   A record is a type made for holding data. Two records with the same values are equal, because records compare by value, not by reference. They are usually immutable, and a with expression makes a copy with a few values changed. I use records for things like data transfer objects and settings.
3. **What is LINQ?**
   LINQ, or Language Integrated Query, lets me filter, sort, group and transform collections with methods such as Where, Select and OrderBy. The same style works on lists in memory and, through Entity Framework, on databases. It makes data code shorter and easier to read. I watch for deferred execution, because a query runs only when its results are used.
4. **How do async and await work in C#?**
   An async method returns a Task, and await lets it wait for slow work, such as a database or web call, without blocking the thread. While it waits, the thread can serve other work, which helps a web app handle more requests. I use async all the way through and avoid .Result and .Wait, which can cause deadlocks. I also pass a CancellationToken to long operations.
5. **What is dependency injection in ASP.NET Core?**
   Dependency injection means a class receives the services it needs instead of creating them itself. ASP.NET Core has a built-in container: I register services in Program.cs as singleton, scoped or transient, and the framework passes them into constructors. Scoped services live for one web request. This keeps classes loosely coupled and easy to test with fake services.
6. **What is Entity Framework Core?**
   Entity Framework Core is an ORM for .NET: it maps C# classes to database tables, so I can query with LINQ instead of writing most SQL by hand. Migrations keep the database schema in step with the code. I check the generated SQL, avoid loading data I do not need and use AsNoTracking for read-only queries. For very complex queries, raw SQL is still an option.
7. **How does garbage collection work in .NET?**
   The garbage collector frees the memory of objects that are no longer used, so I do not free memory by hand. It uses generations: new objects start in generation 0, which is checked most often, because most objects are short-lived. For resources such as files and database connections, I still use a using statement, so Dispose is called right away. I watch memory with profiling tools when an app slows down.

### Fresher answers (first 3 role questions)

1. **What is the difference between .NET Framework and modern .NET?**
   .NET Framework is the older, Windows-only version. Modern .NET is cross-platform, faster and open source, so I use it for new projects.
2. **What are records in C#?**
   A record is a type for holding data. Two records with the same values are equal, and they are usually not changed after they are created.
3. **What is LINQ?**
   LINQ lets me filter, sort and group data with methods like Where and Select. It works on lists and on databases through Entity Framework.

### Junior extra questions

1. **How do you build a REST API with ASP.NET Core?**
   I create controllers or minimal API endpoints for each resource and use the right HTTP methods and status codes. Request models are validated, and services come in through dependency injection. Entity Framework Core handles the database. I add OpenAPI documentation, logging and global error handling.
2. **What are nullable reference types in C#?**
   With nullable reference types turned on, the compiler warns me when a variable that may be null is used without a check. I mark the types that can be null with a question mark, such as string?, and leave the others non-nullable. This catches many null reference errors at build time instead of in production.

### Senior extra questions

1. **How do you secure an ASP.NET Core application?**
   I use the built-in authentication and authorization, for example JWT bearer tokens or cookies with an identity provider, and protect endpoints with policies. All input is validated, and Entity Framework or parameterized queries prevent SQL injection. Secrets are kept in a secret store, not in appsettings files, and HTTPS is enforced. I keep packages updated and scan them for known vulnerabilities.
2. **How do you move an old .NET Framework app to modern .NET?**
   I first check which libraries and Windows-only features the app uses, with tools such as the .NET Upgrade Assistant. I move shared libraries first, then the app itself, one project at a time. Good tests show that the behaviour has not changed. Parts that cannot move, such as some old Windows-only features, need a replacement or a separate service.

# Parent: Web Development

## Frontend Developer

- id: `frontend`
- Role label: Frontend Developer
- Profile role (setupRole): Frontend Developer
- Suggested skills: HTML, CSS, JavaScript, TypeScript, React, Responsive design, Accessibility, Git, REST API, Testing
- Search keywords: frontend, front end, react, ui developer, typescript

### Role questions (Junior and Senior answers)

1. **What are React hooks, and which ones do you use most?**
   Hooks let function components use state and other React features. I use useState for local state and useEffect to sync with things outside React, such as a timer or a subscription. useRef holds a value or a DOM element without causing a re-render, and I use useMemo or useCallback only when there is a real performance need. Hooks must be called at the top level of a component, never inside loops or conditions.
2. **How does React update the page when data changes?**
   React keeps a description of the UI in memory. When state changes, it builds the new description, compares it with the old one and updates only the parts of the real page that changed. This process is called reconciliation. Giving list items a stable key helps React match the items correctly.
3. **What is the difference between flexbox and CSS grid?**
   Flexbox lays out items in one direction, a row or a column, and is great for navigation bars, buttons and aligning items. CSS grid works in two directions, rows and columns at the same time, so it suits page layouts and card grids. I often use grid for the page structure and flexbox inside components.
4. **How do you manage state in a large React application?**
   I keep state close to where it is used and lift it up only when components need to share it. For data from the server, I use a data fetching library that handles caching and loading states. For app-wide state, such as the logged-in user or the theme, I use context or a state library like Redux Toolkit or Zustand. This avoids one huge global store.
5. **Why use TypeScript in a frontend project?**
   TypeScript adds types to JavaScript, so many mistakes, such as a wrong property name or a missing argument, are caught while I write the code. Editors give better autocomplete and safer refactoring. Types also document what each component expects. The code is compiled to plain JavaScript, so browsers run it as usual.
6. **What is the difference between null and undefined in JavaScript?**
   The value undefined means a variable was declared but given no value, or a property does not exist. The value null is set on purpose by a developer to mean no value. Loose equality treats them as equal, but strict equality does not, so I use triple equals in most cases. Optional chaining and the nullish coalescing operator help me handle both safely.
7. **How do you test frontend components?**
   I write unit tests for logic and component tests with a tool like React Testing Library, which tests what the user sees and does, not internal details. I find elements by their role or label, simulate clicks and typing and check the result. A few end-to-end tests in a real browser cover the main user flows. The tests run in CI on every change.

### Fresher answers (first 3 role questions)

1. **What are React hooks, and which ones do you use most?**
   Hooks let function components keep state and run side effects. I use useState for values that change and useEffect for things like timers or subscriptions.
2. **How does React update the page when data changes?**
   React keeps a copy of the UI in memory. When data changes, it compares the new copy with the old one and updates only what changed on the page.
3. **What is the difference between flexbox and CSS grid?**
   Flexbox arranges items in one row or one column. CSS grid arranges items in rows and columns together, so it is good for full page layouts.

### Junior extra questions

1. **How do you handle forms and validation in React?**
   I use controlled inputs or a form library to keep the values, and I validate each field when the user types or leaves it. Error messages appear next to the field in clear words. The submit button shows a loading state and prevents double submits. The server still validates again, because checks in the browser can be bypassed.
2. **Why does a React component re-render, and how do you avoid unnecessary re-renders?**
   A component re-renders when its state changes, when its parent re-renders or when a context it uses changes. Most re-renders are cheap, so I first measure with the React DevTools profiler. If one is slow, I move state down, split the component or use React.memo, useMemo and useCallback where they really help. Stable keys in lists also prevent extra work.

### Senior extra questions

1. **How do you build a design system for a frontend team?**
   I start with design tokens for colours, spacing and typography, then build common components such as buttons, inputs and dialogs on top of them. Each component is accessible, documented with examples and tested. A tool like Storybook shows them in one place for designers and developers. Components are versioned, so teams can update safely.
2. **How do you handle errors and monitoring in a frontend app?**
   I use error boundaries in React, so one broken component shows a friendly message instead of a blank page. Errors in the browser are sent to a monitoring tool with the page, browser and the steps before the error, without personal data. I also track real user performance. Alerts on new or growing errors help the team fix problems before many users notice.

## Backend Developer

- id: `backend`
- Role label: Backend Developer
- Profile role (setupRole): Backend Developer
- Suggested skills: Node.js, Express, REST API, SQL, MongoDB, Authentication, JWT, Caching, Git, Testing
- Search keywords: backend, back end, node.js, express, api developer, server

### Role questions (Junior and Senior answers)

1. **How do you design REST API URLs and status codes?**
   I use nouns for resources, such as orders, and HTTP methods for actions: GET to read, POST to create, PUT or PATCH to update and DELETE to remove. I return clear status codes, such as 201 for created, 400 for bad input, 401 or 403 for access problems and 404 when something is not found. Errors use one consistent JSON format. I version the API when a change would break clients.
2. **What is the difference between authentication and authorization?**
   Authentication checks who the user is, for example with a password and a second factor. Authorization checks what that user is allowed to do, such as editing only their own orders. I authenticate first and then check permissions on the server for every request. Hiding a button in the UI is never enough protection on its own.
3. **How does JWT authentication work, and what are its risks?**
   After login, the server issues a signed token that holds the user ID and an expiry time. The client sends it in the Authorization header, and the server checks the signature on each request without a session lookup. A token is hard to revoke before it expires, so I keep tokens short-lived and use refresh tokens. I never put secrets in a token, because its content is only encoded, not encrypted.
4. **How do you design pagination for an API?**
   For small lists I use a page number and page size, which is simple, but it gets slow on large tables and can skip rows when data changes. For large or changing lists I use cursor pagination: the response includes a cursor, such as the ID of the last item, and the next request continues from there. I set a maximum page size and say whether more items exist.
5. **What is middleware in Express?**
   Middleware is a function that runs between the incoming request and the final route handler. It receives the request, the response and a next function, and it can change the request, end the response or pass control on. I use it for logging, parsing JSON, checking authentication and handling errors. Order matters, because middleware runs in the order it is added.
6. **How do you handle errors in a Node.js backend?**
   I use try and catch with async and await, and pass errors to one central error handler that logs the details and returns a safe message with the right status code. I never send stack traces to the client. Unexpected crashes are logged, and the process manager or container platform restarts the service. Input errors are caught early with validation.
7. **How do you handle a long-running task in a backend?**
   I do not make the user wait for it inside the request. The API puts the task in a queue and answers at once, often with a job ID. A separate worker processes the task, retries it on failure and updates its status. Sending emails, creating reports and processing videos are typical examples.

### Fresher answers (first 3 role questions)

1. **How do you design REST API URLs and status codes?**
   I use nouns for resources and HTTP methods for actions, like GET to read and POST to create. I return clear status codes, such as 201 for created and 404 for not found.
2. **What is the difference between authentication and authorization?**
   Authentication checks who you are, for example with a password. Authorization checks what you are allowed to do after you log in.
3. **How does JWT authentication work, and what are its risks?**
   After login the server gives a signed token. The client sends it with each request, and I keep it short-lived because it is hard to cancel.

### Junior extra questions

1. **How do you validate input in a backend API?**
   I validate every request on the server, even if the frontend already checks it. I define a schema for the body, query and path values with a validation library, and reject bad input with a 400 status and a clear message. I use parameterized queries or an ORM for the database. This protects data quality and blocks many attacks.
2. **What is rate limiting, and why do APIs need it?**
   Rate limiting caps how many requests a client can make in a time window, for example per IP address or per API key. It protects the service from abuse, password guessing and sudden traffic spikes. When the limit is reached, the API returns status 429 with a time to retry. I set stricter limits on sensitive routes, such as login.

### Senior extra questions

1. **How do you change an API without breaking existing clients?**
   I add new fields and endpoints instead of changing or removing old ones. For a breaking change, I release a new version and keep the old one running for a set period, with clear notice to clients. Contract tests check that responses still match what clients expect. I watch how much the old version is used before removing it.
2. **How do you design idempotent API endpoints?**
   An idempotent endpoint gives the same result when the same request arrives more than once, which matters when clients retry after a timeout. GET, PUT and DELETE should be idempotent by design. For POST requests such as payments, the client sends an idempotency key, and the server stores it with the result and returns the same result for a repeat. This prevents double charges and duplicate records.

## Full Stack Developer

- id: `fullstack`
- Role label: Full Stack Developer
- Profile role (setupRole): Full Stack Developer
- Suggested skills: JavaScript, React, Node.js, Express, SQL, MongoDB, REST API, Git, Docker, Authentication
- Search keywords: full stack, fullstack, mern, react, node.js, end to end

### Role questions (Junior and Senior answers)

1. **How does data flow from the database to the screen in a full stack app?**
   A user action in the browser sends a request to the API. The backend checks the user, validates the input, reads or writes the database and returns JSON. The frontend updates its state with that data, and the page shows the change. I make sure both sides agree on the shape of the data.
2. **How do you share types or validation between the frontend and the backend?**
   In a TypeScript project I keep shared types and validation schemas in one package that both sides use. A change to the API shape then shows errors in the frontend at build time. Another option is to generate a typed client from an OpenAPI description. This avoids bugs where one side expects a field that the other no longer sends.
3. **How do you handle login across the frontend and the backend?**
   The backend checks the password and creates a session or a token. For browser apps I prefer a cookie that is HttpOnly, Secure and has SameSite set, because JavaScript cannot read it. The frontend only knows whether the user is logged in and shows the right pages, while the backend checks permissions on every request. Logout ends the session on the server and clears the cookie.
4. **What is CORS, and how do you set it up?**
   CORS is a browser rule that stops a page from reading responses from another origin unless the server allows it. The server sends headers that list the allowed origins, methods and headers. I allow only my own frontend domains, not every origin, especially when cookies are used. CORS does not protect the server from other clients, so authentication is still needed.
5. **How do you deploy a full stack application?**
   I build the frontend into static files and serve them from a CDN or from the backend. The backend runs in a container or on a platform service, with environment variables for configuration. The database is a managed service with backups. A CI/CD pipeline tests and deploys both parts, and database migrations run before the new backend version starts.
6. **How do you choose a tech stack for a new web product?**
   I look at the product needs, the skills of the team, the hiring market and how fast we must ship. A common, well-supported stack, such as React with Node.js and PostgreSQL, is often a safe choice. I avoid tools the team cannot maintain. I keep the first version simple and change parts only when real needs appear.
7. **How do you find a bug when you do not know if it is in the frontend or the backend?**
   I reproduce the bug and open the network tab in the browser to see the request and the response. If the request is wrong, the problem is in the frontend; if the response is wrong, I check the backend logs and the database. A request ID in the logs helps me follow one request across both sides. After the fix, I add a test on the side where the bug was.

### Fresher answers (first 3 role questions)

1. **How does data flow from the database to the screen in a full stack app?**
   The browser sends a request to the API. The backend reads or writes the database and returns JSON, and the frontend shows the new data on the page.
2. **How do you share types or validation between the frontend and the backend?**
   I keep shared types and validation rules in one place that both sides use. Then a change in the API shows errors in the frontend before release.
3. **How do you handle login across the frontend and the backend?**
   The backend checks the password and creates a session or a token, often in a secure cookie. The backend checks permissions on every request.

### Junior extra questions

1. **How do you handle loading and error states between the UI and the API?**
   Every request has three states in the UI: loading, success and error. I show a skeleton or a spinner while loading, the data on success and a clear message with a retry button on error. The backend returns useful error messages and status codes, so the UI can tell a validation error from a server problem. I also handle slow networks and timeouts.
2. **How do you run the whole stack on your own computer?**
   I use Docker Compose to start the database and other services, and run the frontend and backend in development mode. Settings come from a local environment file that is not committed to Git. A seed script fills the database with test data. A short README explains the steps, so a new developer can start quickly.

### Senior extra questions

1. **How do you plan a feature that touches the database, the API and the UI?**
   I start with the user flow and agree on the API contract first, so frontend and backend work can happen in parallel. I plan the database change to be backward compatible, for example adding a column before the code uses it. A feature flag lets us release safely. There are tests at each layer and one end-to-end test for the main flow.
2. **When would you split a full stack monolith into separate services?**
   I keep one well-structured application while the team is small, because it is simpler to build, test and deploy. I split out a part only for a clear reason, such as very different scaling needs, a separate team owning it or a release cycle that blocks others. Each new service needs its own deployment, monitoring and API contract, so the gain must be worth the cost.

## WordPress Developer

- id: `wordpress`
- Role label: WordPress Developer
- Profile role (setupRole): WordPress Developer
- Suggested skills: WordPress, PHP, Themes, Plugins, WooCommerce, Elementor, SEO, Page speed, MySQL, Security
- Search keywords: wordpress, woocommerce, elementor, php, cms

### Role questions (Junior and Senior answers)

1. **What is the difference between a WordPress theme and a plugin?**
   A theme controls how the site looks, such as the layout, colours and templates. A plugin adds features, such as forms, SEO tools or a shop, and should keep working when the theme changes. I keep business features in plugins, not in the theme, so a new design does not break the site.
2. **Why do you use a child theme?**
   A child theme inherits everything from a parent theme and holds only my changes. When the parent theme is updated, my changes are not overwritten. I put custom styles, template overrides and small functions there. With block themes, many design changes can also be made in the site editor.
3. **What are actions and filters in WordPress?**
   Actions and filters are hooks that let my code run at set points without changing WordPress core files. An action runs my function when something happens, for example when a post is saved, and is added with add_action. A filter receives a value, changes it and returns it, for example the title of a post, and is added with add_filter. Plugins and themes are built mostly on hooks.
4. **Which caching options do you use on a WordPress site?**
   I use page caching, so most visitors get a ready HTML page instead of WordPress building it each time. Object caching, for example with Redis, reduces repeated database queries. A CDN serves images, CSS and JavaScript from servers near the user. I clear the cache after updates and exclude pages like the cart and checkout.
5. **How do you keep a WordPress site secure?**
   I keep WordPress core, themes and plugins updated, and remove the ones I do not use. I install plugins only from trusted sources, use strong passwords with two-factor login and give users only the role they need. Regular off-site backups and a web application firewall add protection. In my own code I sanitize input, escape output and check nonces and user permissions.
6. **How do you set up an online shop with WooCommerce?**
   I install WooCommerce and set up products, categories, taxes, shipping zones and payment gateways. I test the full checkout with test payments before going live. The site needs SSL, clear shop policies and working order emails. Performance and security matter even more on a shop, so I choose plugins carefully and keep backups.
7. **What is a custom post type in WordPress?**
   A custom post type is a new kind of content besides posts and pages, such as projects, events or testimonials. I register it with register_post_type in a plugin, with its labels, features and URL structure. Custom fields and taxonomies add extra data and grouping. This keeps content organised and easy for editors to manage.

### Fresher answers (first 3 role questions)

1. **What is the difference between a WordPress theme and a plugin?**
   A theme controls how the site looks. A plugin adds features, like forms or a shop, and keeps working when the theme changes.
2. **Why do you use a child theme?**
   A child theme keeps my changes separate from the parent theme. When the parent theme is updated, my changes stay safe.
3. **What are actions and filters in WordPress?**
   They are hooks that let my code run at certain points without editing WordPress itself. Actions do something at an event, and filters change a value and return it.

### Junior extra questions

1. **How do you move a WordPress site to a new host?**
   I take a full backup of the files and the database. I copy them to the new host, create the database and update the connection details in wp-config.php. If the domain changes, I replace the old URLs with a tool that handles serialized data safely. I test the site on the new host before pointing the domain to it.
2. **What is the difference between Elementor and the block editor?**
   The block editor is built into WordPress and builds pages from blocks, and block themes extend it to the whole site. Elementor is a popular page builder plugin with a visual drag and drop editor and many ready widgets. Page builders are quick for design but can add extra code and slow pages down. I choose based on the needs of the client and who will edit the site.

### Senior extra questions

1. **How do you build a custom WordPress plugin properly?**
   I give the plugin a unique prefix or namespace to avoid conflicts and organise the code by feature. I use hooks instead of editing core, prepared statements for database queries and the settings API for options. Every form checks a nonce and the user capabilities, input is sanitized and output is escaped. I also make it translatable and clean up on uninstall.
2. **How do you manage updates on many client WordPress sites?**
   I keep a list of every site with its plugins and versions, and use a management tool to update them from one place. Updates are tested on a staging copy first, especially for big plugins like WooCommerce. A backup is taken before each update, and uptime monitoring alerts me if a site breaks. I also tell each client what was updated.

# Parent: Mobile App Development

## Mobile App Development

- id: `mobile`
- Role label: Mobile App Developer
- Profile role (setupRole): Mobile App Developer
- Suggested skills: Android, iOS, Flutter, React Native, UI design, REST API, Firebase, State management, Git, App store publishing
- Search keywords: mobile app, app developer, cross platform, native app

### Role questions (Junior and Senior answers)

1. **What is the difference between native and cross-platform app development?**
   Native apps are built with the tools of each platform, Kotlin for Android and Swift for iOS, so they get the best performance and new platform features first. Cross-platform frameworks such as Flutter and React Native share one codebase for both platforms, which saves time and cost. They may still need native code for some device features. I choose based on the budget, team skills, performance needs and how platform-specific the app is.
2. **What is the app lifecycle, and why does it matter?**
   An app moves through states such as starting, running in the foreground, going to the background and being stopped. The system can close a background app at any time to free memory. So I save the work and state of the user when the app goes to the background and restore it when the user comes back. I also stop heavy work, like location updates, when it is not needed.
3. **How do you handle app permissions?**
   I ask for a permission only when the user needs the feature, with a short message that explains why. I ask only for what the app really needs, such as camera access for scanning. If the user says no, the app keeps working with that feature turned off and shows how to enable it later. This builds trust and helps with the store review.
4. **How do you make an app work offline?**
   I save important data in a local database on the device, so the app can show it without a connection. Changes made offline wait in a queue and are sent when the connection comes back. I plan how to handle conflicts, for example when the same record also changed on the server. The UI clearly shows when the user is offline.
5. **How do you keep a mobile app fast and smooth?**
   I keep heavy work, such as network calls and image processing, off the main thread, so the UI does not freeze. Lists load items lazily, and images are resized and cached. I measure start-up time, frame rate and memory with the profiling tools of each platform. Battery and data use matter too, so I avoid needless background work.
6. **What steps do you follow to publish an app to the stores?**
   I prepare a signed release build and test it on real devices. I create the store listing with screenshots, a description, a privacy policy and the data safety or privacy details. I release to testers first, then roll out in stages while I watch crash reports. Both stores review apps against their policies, so I read the rules before submitting.
7. **How do you store sensitive data safely on a mobile device?**
   I store only what the app needs. Passwords and tokens go in the secure storage of the platform, the Android Keystore or the iOS Keychain, never in plain files or plain preferences. Other sensitive data is encrypted, and all network calls use HTTPS. I also make sure logs never contain personal data.

### Fresher answers (first 3 role questions)

1. **What is the difference between native and cross-platform app development?**
   Native apps use the tools of each platform, like Kotlin for Android and Swift for iOS. Cross-platform apps, like Flutter apps, use one codebase for both.
2. **What is the app lifecycle, and why does it matter?**
   The app lifecycle is the set of states an app goes through, like running, in the background or closed. I save the work of the user when the app goes to the background.
3. **How do you handle app permissions?**
   I ask for a permission only when the user needs the feature, with a short reason. If the user says no, the app still works without that feature.

### Junior extra questions

1. **How do you test a mobile app on different devices?**
   I write unit tests for logic and UI tests for the main flows, and run them on emulators in CI. I also test on a few real devices with different screen sizes, older and newer system versions and slower hardware. A device cloud service helps cover more models. Before release, testers use a beta build, and I watch the crash reports closely.
2. **How do push notifications work?**
   The app registers with the notification service of the platform, Firebase Cloud Messaging on Android or the Apple Push Notification service on iOS, and gets a device token. The app sends this token to our server. When there is news, our server sends a message through that service to the device. I ask for notification permission at a sensible moment and let users choose which notifications they want.

### Senior extra questions

1. **How do you plan the architecture of a new mobile app?**
   I separate the app into layers: UI, state and data, with repositories that hide whether data comes from the network or the local database. A pattern such as MVVM keeps screens simple and testable. I plan offline support, error handling, analytics and feature flags from the start. The structure should let several developers work without getting in each other's way.
2. **How do you monitor an app after release?**
   I use crash reporting and performance monitoring to see crashes, slow screens and start-up time on real devices. Store reviews and ratings also show problems. I release in stages, so I can stop a rollout if the crash rate rises. Key flows are tracked with privacy-friendly analytics, without personal data.

## Android Developer

- id: `android`
- Role label: Android Developer
- Profile role (setupRole): Android Developer
- Suggested skills: Kotlin, Java, Android Studio, Jetpack Compose, Room, Retrofit, MVVM, Firebase, Play Store publishing
- Search keywords: android, kotlin, jetpack compose, android studio, play store

### Role questions (Junior and Senior answers)

1. **Why is Kotlin preferred for Android development?**
   Kotlin is the language Google recommends for Android. It is concise, has null safety built into the type system and works fully with existing Java code. Coroutines make background work much simpler than callbacks. Jetpack Compose, the modern UI toolkit, is built for Kotlin.
2. **What is Jetpack Compose?**
   Jetpack Compose is the modern Android toolkit for building UI in Kotlin code instead of XML layouts. I write composable functions that describe the UI for the current state, and Compose updates the screen when that state changes. It needs less code, and previews make design work faster. It also works together with existing screens built with Views.
3. **What is the Activity lifecycle?**
   An Activity moves through callbacks such as onCreate, onStart, onResume, onPause, onStop and onDestroy. By default, a screen rotation destroys and recreates the Activity. So I keep UI state in a ViewModel, which survives configuration changes, and save small state for process death with SavedStateHandle. I start and stop resources such as the camera in the matching callbacks.
4. **How do you do background work with Kotlin coroutines?**
   Coroutines let me write asynchronous code that reads like normal step-by-step code. I launch them in a scope tied to a lifecycle, such as viewModelScope, so they are cancelled when they are no longer needed. I move heavy work off the main thread with withContext and Dispatchers.IO or Dispatchers.Default. For work that must finish even if the app closes, I use WorkManager.
5. **What is MVVM on Android?**
   MVVM splits the app into the View, which shows the UI, the ViewModel, which holds UI state and logic, and the Model, which is the data layer with repositories. The View observes state from the ViewModel and sends user actions to it. The ViewModel survives screen rotation. This makes the code easier to test and maintain.
6. **What is a Flow in Kotlin, and how is it used in Android?**
   A Flow is a stream of values that arrive over time, built on coroutines. Room and other libraries can return a Flow, so the UI gets new data automatically. In a ViewModel I often expose a StateFlow, which always holds the latest UI state, and collect it in the UI in a lifecycle-aware way. Operators such as map and filter transform the values.
7. **What is Room?**
   Room is the Jetpack library for a local SQLite database. I define entities as data classes, DAOs with queries that are checked at compile time, and a database class. I call it from coroutines, so database work stays off the main thread. When the schema changes, I add migrations, so users do not lose data.

### Fresher answers (first 3 role questions)

1. **Why is Kotlin preferred for Android development?**
   Kotlin is the language Google recommends for Android. It is shorter than Java, has null safety and makes background work easy with coroutines.
2. **What is Jetpack Compose?**
   Jetpack Compose builds the UI with Kotlin functions instead of XML. When the state changes, the screen updates automatically.
3. **What is the Activity lifecycle?**
   An Activity goes through states like onCreate, onResume, onPause and onDestroy. I keep screen data in a ViewModel, so it survives rotation.

### Junior extra questions

1. **How do you navigate between screens in a Compose app?**
   I use the Navigation component for Compose, with a NavHost that defines each screen as a destination. I pass only small values, such as an ID, between screens and load the full data in the ViewModel of the next screen. The back stack is handled for me, including the system back button. Deep links can open a screen directly from a notification or a web link.
2. **What is dependency injection with Hilt?**
   Hilt is the recommended dependency injection library for Android, built on Dagger. I annotate the Application class and the Android classes, and provide dependencies such as the Retrofit service or a repository in modules. Hilt then creates and passes them in with the right lifetime. This removes manual wiring and makes it easy to use fakes in tests.

### Senior extra questions

1. **How do you reduce the start-up time of an Android app?**
   I first measure cold start time with Android Studio tools and Macrobenchmark. Then I remove heavy work from Application.onCreate, delay libraries that are not needed at once and load data lazily. Baseline Profiles help the system compile the most used code ahead of time. I check the result on low-end devices too.
2. **How do you split a large Android project into modules?**
   I split the app into feature modules, such as login or payments, and core modules for shared parts like networking, the database and the design system. Feature modules depend on core modules, not on each other. This makes builds faster, because Gradle rebuilds only what changed, and lets teams own their parts. Clear module rules stop the code from becoming one big tangle.

## Flutter Developer

- id: `flutter`
- Role label: Flutter Developer
- Profile role (setupRole): Flutter Developer
- Suggested skills: Dart, Flutter, Widgets, State management, REST API, Firebase, SQLite, Animations, Testing, Play Store publishing
- Search keywords: flutter, dart

### Role questions (Junior and Senior answers)

1. **What is the difference between a StatelessWidget and a StatefulWidget?**
   A StatelessWidget has no state of its own and rebuilds only when its inputs from the parent change. A StatefulWidget has a State object that keeps data, and calling setState tells Flutter to rebuild it with the new data. I use stateless widgets wherever possible and keep state as low in the tree as I can.
2. **How does Flutter draw its UI?**
   Flutter does not use the native buttons and views of the platform. It draws every pixel itself with its own rendering engine, which is why the app looks the same on Android and iOS. Everything on the screen is built from widgets, which describe the UI for the current state. Release builds compile Dart to native machine code, so apps run fast.
3. **Which state management approaches have you used in Flutter?**
   For simple screens, setState is enough. For shared state I use Provider or Riverpod, which pass data down the tree and rebuild only the widgets that listen. Bloc suits larger apps that need a strict flow from events to states. I pick one approach for the project and use it consistently.
4. **How does asynchronous code work in Dart?**
   Dart runs my code on a single thread with an event loop. A Future is a value that will be ready later, such as a network response, and I wait for it with async and await. A Stream gives many values over time, such as location updates. For heavy CPU work I use an isolate, so the UI does not freeze.
5. **What is the difference between hot reload and hot restart?**
   Hot reload puts my code changes into the running app and keeps its current state, so I see UI changes almost at once. Hot restart reloads the whole app and resets the state. Some changes, such as changes to global variables or the main function, need a hot restart. Changes to native code need a full rebuild.
6. **How do you turn JSON into Dart objects?**
   I create model classes with a fromJson factory and a toJson method. For many models I use code generation, such as json_serializable, so the conversion code is written for me and stays correct. I handle missing or null fields with nullable types or default values. The rest of the app then works with typed objects instead of raw maps.
7. **How do you use platform channels in Flutter?**
   Platform channels let Dart code call native Android or iOS code when a feature has no Flutter package. I send a method name and arguments over a MethodChannel, and native code in Kotlin or Swift handles the call and returns a result. I first look on pub.dev for a well-maintained plugin, because it saves work.

### Fresher answers (first 3 role questions)

1. **What is the difference between a StatelessWidget and a StatefulWidget?**
   A StatelessWidget has no data of its own that changes. A StatefulWidget keeps state, and setState rebuilds it when the data changes.
2. **How does Flutter draw its UI?**
   Flutter draws the whole UI itself with its own engine, so the app looks the same on Android and iOS. Everything on the screen is a widget.
3. **Which state management approaches have you used in Flutter?**
   I use setState for simple screens. For shared data I use Provider, Riverpod or Bloc, and I use one approach across the app.

### Junior extra questions

1. **What are keys in Flutter, and when do you need them?**
   Keys help Flutter match widgets to their state when widgets move, are added or are removed, for example when a list is sorted. Without a key, a stateful item could keep the wrong state after the list changes. I use a ValueKey with a stable ID for list items. GlobalKeys also exist, but I use them rarely, for example for form validation.
2. **How do you test a Flutter app?**
   Flutter has three main kinds of tests. Unit tests check logic, widget tests build one widget in a test environment and check what it shows and how it reacts to taps, and integration tests run the full app on a device or emulator. Widget tests are fast, so I write most of my UI tests as widget tests.

### Senior extra questions

1. **How do you keep a large Flutter app smooth?**
   I use const constructors where possible, so Flutter can skip rebuilding those widgets. I split big widgets into small ones, so only the parts that change are rebuilt. Long lists use ListView.builder to build items lazily. I check frame times and rebuilds with Flutter DevTools and test in profile mode on real devices.
2. **How do you set up flavors for development and production in Flutter?**
   Flavors let me build the same app with different settings, such as the API address, app name and app ID, for development, staging and production. I set them up in the Android and iOS build configurations and pass the matching settings to Dart at start-up. Each flavor can be installed side by side on one phone. This avoids testing against production data by mistake.

## React Native Developer

- id: `rn`
- Role label: React Native Developer
- Profile role (setupRole): React Native Developer
- Suggested skills: JavaScript, TypeScript, React Native, Expo, Navigation, Redux, REST API, Firebase, Native modules, Testing
- Search keywords: react native, expo

### Role questions (Junior and Senior answers)

1. **How is React Native different from React for the web?**
   Both use React components, hooks and JavaScript or TypeScript. React for the web renders HTML elements in the browser, while React Native renders real native components, such as View and Text, on Android and iOS. Styling uses JavaScript objects with a flexbox layout, not CSS files. Many skills transfer, but the UI building blocks are different.
2. **What is Expo, and when would you use it?**
   Expo is a framework and set of tools on top of React Native. It gives ready modules for the camera, notifications and other device features, cloud builds and over-the-air updates. It is the recommended way to start a new project. When I need custom native code, I can still add it with development builds and config plugins.
3. **How do you handle navigation in a React Native app?**
   I use React Navigation, or Expo Router for file-based routing. A stack navigator handles moving forward and back, and tab or drawer navigators organise the main sections. I pass small parameters, such as an ID, between screens. Deep links let a notification or a web link open a specific screen.
4. **How do you make a long list fast in React Native?**
   I use FlatList or another virtualized list, which renders only the items on screen instead of the whole list. Each item gets a stable key, and I keep item components light and memoized. Images are sized correctly and cached. I check performance in a release build, because development mode is slower.
5. **What are native modules in React Native?**
   A native module lets JavaScript call code written in Kotlin, Java, Swift or Objective-C, for features that no library covers. In the new architecture, Turbo Modules make these calls faster and typed. I first look for a well-maintained library or Expo module before writing my own. If I write one, I keep the native part small and well tested.
6. **How do you debug a React Native app?**
   I use React Native DevTools to inspect components, set breakpoints and read logs, and I check network requests in the network tools. Crashes in native code need Android Studio or Xcode and their logs. I also reproduce problems in a release build, because some bugs appear only there.
7. **What is the new architecture of React Native?**
   The new architecture replaces the old asynchronous bridge between JavaScript and native code. JSI lets JavaScript call native code directly, Fabric is the new rendering system and Turbo Modules load native modules only when they are needed. The result is faster start-up, a smoother UI and support for modern React features. Most popular libraries now support it.

### Fresher answers (first 3 role questions)

1. **How is React Native different from React for the web?**
   Both use React components and hooks. React Native shows real native components, like View and Text, on phones instead of HTML in a browser.
2. **What is Expo, and when would you use it?**
   Expo is a set of tools on top of React Native. It gives ready device features, easy builds and updates, so it is a good way to start a new app.
3. **How do you handle navigation in a React Native app?**
   I use React Navigation with stack and tab navigators. I pass small values, like an ID, from one screen to the next.

### Junior extra questions

1. **How do you handle differences between Android and iOS in React Native?**
   Most code is shared, but some details differ, such as shadows, fonts, the back button and permission flows. I use the Platform module or platform-specific file extensions for small differences. I test every feature on both platforms, on real devices when possible. Safe area handling keeps content away from notches and system bars.
2. **How do over-the-air updates work in React Native?**
   An over-the-air update replaces the JavaScript bundle and assets without a new store release, for example with Expo Updates. It is good for quick bug fixes. Changes to native code still need a new store build. I follow the store rules, which do not allow such updates to change the main purpose of the app, and I roll updates out in stages.

### Senior extra questions

1. **How do you set up CI/CD for a React Native app?**
   On every pull request, CI runs linting, type checks and unit tests. For releases, the pipeline builds signed Android and iOS apps, for example with EAS Build or Fastlane, and uploads them to internal testing in both stores. Signing keys are kept in the secret store of the CI system. Over-the-air updates have their own channel, with staged rollout and a way to roll back.
2. **How do you share code between a React Native app and a React website?**
   I keep business logic, API clients, types and validation in shared packages in a monorepo. UI components are usually separate, because native and web building blocks differ, although React Native Web can share some of them. Shared code has its own tests. This avoids writing the same rules twice, while each app keeps the right look for its platform.

## iOS Developer

- id: `ios`
- Role label: iOS Developer
- Profile role (setupRole): iOS Developer
- Suggested skills: Swift, SwiftUI, UIKit, Xcode, Core Data, MVVM, REST API, Firebase, App Store, Testing
- Search keywords: ios, swift, swiftui, iphone, xcode

### Role questions (Junior and Senior answers)

1. **What is the difference between SwiftUI and UIKit?**
   SwiftUI is the modern, declarative framework from Apple: I describe the UI for the current state, and it updates the screen when the state changes. UIKit is the older, imperative framework where I create and update views myself, and many existing apps still use it. SwiftUI needs less code and has live previews. The two can be mixed in one app.
2. **What are optionals in Swift?**
   An optional is a type that can hold a value or nil, written with a question mark, such as String?. Swift makes me handle the nil case before I use the value, which prevents many crashes. I unwrap optionals safely with if let, guard let or the nil-coalescing operator. I avoid force unwrapping unless I am sure the value exists.
3. **What is the difference between a struct and a class in Swift?**
   A struct is a value type, so each copy has its own data, while a class is a reference type, so copies share one instance. Classes support inheritance and are managed by automatic reference counting. Swift prefers structs for most models, because they are safer to pass around. I use classes when I need a shared identity or inheritance.
4. **How does memory management work in Swift?**
   Swift uses automatic reference counting, or ARC. Each class instance counts how many strong references point to it and is freed when the count reaches zero. Two objects that hold strong references to each other create a retain cycle and leak memory. I break cycles with weak or unowned references, often weak self in closures.
5. **How do you handle asynchronous work in Swift?**
   I use Swift concurrency with async and await, which makes asynchronous code read like normal code. Tasks run the work, and I update the UI on the main actor. Actors protect shared state from data races. Older code may use completion handlers or Grand Central Dispatch, which I can wrap in async functions.
6. **How do you manage state in SwiftUI?**
   I use @State for simple values that one view owns and @Binding to let a child view change a value of its parent. For shared data I use an observable model class and pass it down or put it in the environment. Views update automatically when the data they read changes. I keep business logic in the model, not in the view.
7. **How do you store data locally in an iOS app?**
   For small settings I use UserDefaults. For structured data I use SwiftData or Core Data, which handle saving, queries and relationships. Passwords and tokens always go in the Keychain, never in UserDefaults. Files such as images go in the documents or caches folder of the app.

### Fresher answers (first 3 role questions)

1. **What is the difference between SwiftUI and UIKit?**
   SwiftUI is the newer Apple framework where I describe the UI for the current state. UIKit is the older framework where I update views myself.
2. **What are optionals in Swift?**
   An optional can hold a value or nil. Swift makes me check for nil first, which stops many crashes.
3. **What is the difference between a struct and a class in Swift?**
   A struct is copied when I pass it, so each copy is separate. A class is shared, so a change is seen through every reference.

### Junior extra questions

1. **How do you call a REST API in an iOS app?**
   I use URLSession with async and await to send the request and decode the JSON into Swift structs that conform to Codable. I check the HTTP status code and handle errors and no-connection cases. The networking code lives in a separate service, so views stay simple and the code is easy to test.
2. **What are protocols in Swift?**
   A protocol defines methods and properties that a type promises to provide, like an interface. Structs, classes and enums can all adopt protocols, and protocol extensions can add default behaviour. I use protocols to write code against a capability, such as a data service, so I can swap in a fake one in tests.

### Senior extra questions

1. **How do you use Instruments to fix performance problems?**
   Instruments is the profiling tool in Xcode. I use Time Profiler to find code that blocks the main thread, Allocations and Leaks to find memory problems and other templates for energy and network use. I always profile a release build on a real device. After a fix, I measure again to confirm the improvement.
2. **How do you support older iOS versions while you adopt new APIs?**
   I set the lowest supported iOS version based on our users and the store rules, and use availability checks to call new APIs only where they exist. Older devices get a simpler fallback. I test on the oldest supported version and on the newest one. Each year I review the minimum version and drop old versions when few users remain.

# Overlap check

No question text is repeated in any two categories (checked by `tests/practice/categories.test.mjs`). Where a new question shares a topic with an existing one, I wrote it to ask something different. Those pairs are below.

| New question | Related existing question | Why both stay |
| --- | --- | --- |
| Python: the GIL and threads | Java: multithreading and thread safety | Python-specific lock vs general thread safety |
| C# / .NET: async and await; Python: asyncio; iOS: async work in Swift; Flutter: async code in Dart | (each other) | Same idea, each in its own language and tools |
| C# / .NET: garbage collection; iOS: memory management with ARC | C / C++: memory leaks | Automatic memory in .NET and Swift vs manual memory in C++ |
| C# / .NET: LINQ | Java: streams | Different language features |
| C# / .NET (Junior): build a REST API with ASP.NET Core; Backend: REST URLs and status codes | Software Developer: explain a REST API | Building and designing vs explaining the idea |
| Frontend: state in a large React app | Web Developer: keep a large front-end codebase maintainable | State handling vs code organisation |
| Frontend: test components | Software Developer: make sure your code works before submitting | Frontend test tools vs general habits |
| Backend: validate input; C# / .NET: secure an ASP.NET Core app | Web Developer: protect from XSS and SQL injection | Server validation and framework setup vs two named attacks |
| Backend: authentication vs authorization | Cyber Security: why multi-factor authentication matters | Two concepts vs one control |
| Full Stack: login across frontend and backend; CORS | Web Developer: cookies, localStorage and sessionStorage | Session flow and cross-origin rules vs browser storage |
| Full Stack: frontend or backend bug | Software Developer: debug code you did not write | Finding the layer vs reading unknown code |
| Full Stack (Senior): split a monolith | Software Developer: design a system to scale; Java: design a microservice | When to split vs how to scale or build one service |
| WordPress: caching options | Web Developer: improve loading speed | WordPress caching layers vs general page speed |
| Mobile App Development: keep an app fast; Android: start-up time; Flutter: keep a large app smooth; iOS: Instruments | (each other) | Concepts vs platform tools |
| Mobile App Development: store sensitive data; iOS: store data locally | (each other) | Secure storage on both platforms vs iOS storage options |
| Mobile App Development: architecture; Android: split into modules | (each other) | App layers vs Gradle modules |
| Mobile App Development: test on devices; Flutter: test a Flutter app | (each other) | Device coverage vs Flutter test types |
| Android: navigate in Compose; React Native: navigation | (each other) | Platform-specific libraries |
