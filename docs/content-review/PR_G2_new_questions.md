# PR G2: new questions for review (Finance, Marketing, Sales and Retail, Customer Service)

For review only. This file is not part of the app (the app reads src/data/more-questions.js).

Every category also has the shared opening and closing questions (not repeated here). Fresher shows the first 3 role questions with the simpler Fresher answer; Junior and Senior show all 7 role questions with the full answer, plus their 2 extra questions. Counts per level: Fresher 10, Junior 19, Senior 19.

- **Finance and Banking**
  - [Financial Analyst](#financial-analyst)
  - [Internal Auditor](#internal-auditor)
- **Marketing**
  - [Digital Marketing Specialist](#digital-marketing-specialist)
  - [SEO Specialist](#seo-specialist)
  - [Social Media Manager](#social-media-manager)
- **Sales and Retail**
  - [Store Supervisor](#store-supervisor)
  - [Business Development](#business-development)
- **Customer Service**
  - [Call Center Agent](#call-center-agent)

# Parent: Finance and Banking

## Financial Analyst

- id: `finanalyst`
- Role label: Financial Analyst
- Profile role (setupRole): Financial Analyst
- Suggested skills: Financial modelling, Excel, Forecasting, Financial statements, Scenario analysis, Power BI, Business partnering, Presentation, Accounting basics, Attention to detail
- Search keywords: financial analyst, financial planning and analysis, financial modelling, forecasting

### Role questions (Junior and Senior answers)

1. **How do the three financial statements link together?**
   Net profit from the income statement flows into retained earnings on the balance sheet. The cash flow statement starts from net profit, adds back non-cash items such as depreciation and adjusts for changes in working capital. The closing cash on the cash flow statement must match the cash on the balance sheet. I use these links to check that a model is built correctly.
2. **How do you build a financial forecast?**
   I start from the actual results and the main business drivers, such as volume, price, headcount and costs. I agree on assumptions with the business teams and write them down clearly. I build the forecast so each number is linked to a driver, not typed in by hand. I update it regularly with new actuals and explain what changed since the last version.
3. **How do you build an Excel model that other people can trust?**
   I keep inputs, calculations and outputs on separate sheets, with inputs clearly marked by colour. I use simple, consistent formulas and avoid hard-coded numbers inside them. I add checks, for example that the balance sheet balances and totals match the source. I also document the assumptions, so another analyst can follow the model.
4. **What is the difference between sensitivity analysis and scenario analysis?**
   Sensitivity analysis changes one input at a time, such as price or volume, to see how much the result moves. Scenario analysis changes several inputs together to describe a full situation, such as a base case, a best case and a worst case. Sensitivity shows which drivers matter most. Scenarios help managers plan for different futures.
5. **How do you analyse the performance of a business over several years?**
   I put several years of results side by side and look at the trends in revenue, margins, costs and cash flow. I use common-size analysis, where each line is shown as a percentage of revenue, to compare years fairly. I look for the reasons behind big changes, such as new products or price increases. Then I compare the results with the plan and with similar businesses where data is available.
6. **How do you explain what drove a change in profit?**
   I build a simple bridge from last year's profit to this year's profit. Each step shows one driver, such as higher volume, price changes, product mix, cost increases or exchange rates. I check that the steps add up to the total change. A bridge chart makes it easy for managers to see what really moved the result.
7. **How do you turn a financial analysis into a clear recommendation?**
   I start with the question the business needs to answer and lead with my answer, not with the method. I support it with two or three key numbers and a simple chart. I state the main assumptions and risks honestly, including what would change my view. Then I suggest the next step and who should decide.

### Fresher answers (first 3 role questions)

1. **How do the three financial statements link together?**
   Net profit flows into retained earnings on the balance sheet. The cash flow statement starts from profit and its closing cash matches the balance sheet.
2. **How do you build a financial forecast?**
   I start from actual results and the main business drivers. I agree on assumptions with the teams and link each number to a driver.
3. **How do you build an Excel model that other people can trust?**
   I keep inputs, calculations and outputs separate and avoid hard-coded numbers in formulas. I add checks so errors are easy to find.

### Junior extra questions

1. **What is EBITDA, and why do analysts use it?**
   EBITDA means earnings before interest, tax, depreciation and amortisation. It shows the profit from operations before financing costs, taxes and non-cash charges. Analysts use it to compare the operating performance of businesses with different debt or asset levels. It is not the same as cash flow, so I always look at cash flow as well.
2. **Which Excel modelling mistakes are most common, and how do you avoid them?**
   Common mistakes are hard-coded numbers in formulas, wrong cell references after copying, mixed units and broken links to other files. I avoid them with a clear structure, consistent formulas across rows and checks that flag errors. I use tools such as trace precedents to follow a formula. I ask a colleague to review important models before they are used.

### Senior extra questions

1. **How do you improve the forecasting process in a finance team?**
   I measure how accurate past forecasts were and find where the biggest misses came from. I move the forecast towards key business drivers and remove detail that does not change decisions. I agree on a clear calendar and owners with the business teams. Where it helps, I use rolling forecasts, so the outlook always covers the next twelve or more months.
2. **How do you work with business teams that give you unrealistic numbers?**
   I ask them to explain the assumptions behind the numbers and compare them with past results and market data. I show the gap clearly and politely, using facts rather than opinions. Together we agree on a realistic base case and keep the ambitious view as a separate scenario. If we still disagree, I make the difference visible to the decision makers.

## Internal Auditor

- id: `audit`
- Role label: Internal Auditor
- Profile role (setupRole): Internal Auditor
- Suggested skills: Internal controls, Risk assessment, Audit planning, Sampling, Audit reporting, Excel, Data analytics, Process walkthroughs, Professional ethics, Communication
- Search keywords: internal audit, internal controls, risk based audit, cia

### Role questions (Junior and Senior answers)

1. **How do you plan an internal audit and set its scope?**
   I first learn how the process works and what its objectives and main risks are, by reading documents and talking to the process owner. I set the scope, such as which locations, systems and time period I will cover, and the audit objectives. I write a work program with the tests for each risk and control. I agree on the scope and the timeline with management before fieldwork starts.
2. **How do you assess risk when you decide what to audit?**
   I look at how likely a problem is and how much damage it would cause, for example financial loss, legal issues or harm to the company name. I consider changes such as new systems, new managers or fast growth, because they raise risk. I also use past audit results and input from management. The areas with the highest risk get audited first and in more depth.
3. **What is the difference between the design and the operating effectiveness of a control?**
   Design effectiveness asks whether the control, if it works as described, would prevent or detect the risk. Operating effectiveness asks whether the control actually worked during the period, every time it should have. I test design with a walkthrough of the process. I test operating effectiveness by checking a sample of real transactions.
4. **How do you choose a sample and collect audit evidence?**
   I choose the sample size based on how often the control runs and how much risk there is, and I pick items at random or with a clear method. For each item I collect evidence, such as approvals, system records and documents. Evidence should be reliable, relevant and enough to support my conclusion. I keep it in the working papers, so another auditor can follow my work.
5. **How do you write a clear audit finding?**
   I describe the condition, which is what I found, and the criteria, which is what should happen. I explain the cause and the effect, such as the risk or loss it creates. Then I give a practical recommendation and agree on an action, an owner and a due date with management. I keep the language factual and avoid blaming people.
6. **How do you stay independent and objective as an internal auditor?**
   I do not audit work that I was responsible for or helped to design. I base my conclusions on evidence, not on relationships or pressure. If there is a conflict of interest, I tell my manager so the work can be reassigned. The internal audit function reports to the audit committee or the board, which also protects its independence.
7. **How do you follow up on audit findings after the report?**
   I track each agreed action with its owner and due date in a central list. Before the due date I ask for evidence that the action is done, not only a statement. I test the evidence to confirm the issue is really fixed. Overdue actions are reported to senior management and the audit committee.

### Fresher answers (first 3 role questions)

1. **How do you plan an internal audit and set its scope?**
   I learn the process and its main risks, then set the scope, objectives and tests. I agree on the plan with management before I start.
2. **How do you assess risk when you decide what to audit?**
   I look at how likely a problem is and how much damage it would cause. The highest-risk areas are audited first.
3. **What is the difference between the design and the operating effectiveness of a control?**
   Design asks whether a control would stop the risk if it worked. Operating effectiveness asks whether it really worked every time.

### Junior extra questions

1. **What is the difference between internal audit and external audit?**
   External auditors give an opinion on whether the financial statements are fairly presented, mainly for shareholders and regulators. Internal auditors work for the organization and review risks, controls and processes across the whole business, not only finance. Internal audit also gives advice on how to improve. The two teams often share their plans to avoid duplicate work.
2. **What is the Three Lines Model?**
   It is a model from the Institute of Internal Auditors that shows how risk management roles are shared. The first line is management, who own and manage the risks in daily work. The second line, such as risk and compliance teams, supports and monitors the first line. Internal audit is the third line and gives independent assurance to the board.

### Senior extra questions

1. **How do you build a yearly risk-based audit plan?**
   I start from the company strategy and the risk register and talk to senior managers and the audit committee about their main concerns. I rate each area by risk and plan more frequent audits for the high-risk ones. I check that the plan fits the team's skills and hours. The plan is approved by the audit committee and updated when new risks appear.
2. **How do you handle a manager who disagrees with your audit finding?**
   I listen to their view and check whether they have evidence I did not see. If they are right, I change the finding. If the evidence supports my finding, I explain it calmly and focus on the risk, not on blame. If we still disagree, I record management's response in the report, so the reader sees both views.

# Parent: Marketing

## Digital Marketing Specialist

- id: `digitalmkt`
- Role label: Digital Marketing Specialist
- Profile role (setupRole): Digital Marketing Specialist
- Suggested skills: Google Ads, Meta Ads, Google Analytics 4, Email marketing, Campaign planning, A/B testing, Marketing funnel, Budget management, Landing pages, Reporting
- Search keywords: digital marketing, google ads, meta ads, performance marketing

### Role questions (Junior and Senior answers)

1. **What is a marketing funnel, and how do you use it?**
   A marketing funnel shows the stages people move through, from first hearing about a brand to buying and coming back. A simple version is awareness, consideration, conversion and loyalty. I choose different channels and messages for each stage, for example video for awareness and search ads for people ready to buy. I track how many people move from one stage to the next to find where we lose them.
2. **How do you plan a digital marketing campaign?**
   I start with a clear goal, such as sign-ups or sales, and the audience we want to reach. I choose the channels, the message, the offer and the budget, and I set the KPIs and tracking before launch. I prepare the ads and the landing page together, so the message matches. After launch I check results often and adjust the targeting, bids and creatives.
3. **How do you split a budget across digital channels?**
   I start with the goal and where our audience spends time, and I look at past results such as cost per lead from each channel. I put most of the budget into channels that already work and keep a smaller part for testing new ones. I review spending every week and move money towards the best results. I keep enough budget in each test to get a fair result.
4. **Which KPIs do you track for paid ads, and what do they mean?**
   Click-through rate shows how many people who see an ad click it. Cost per click and cost per acquisition show how much we pay for a click and for a customer or lead. Conversion rate shows how many visitors take the action we want. Return on ad spend shows the revenue we get for each unit of money spent on ads.
5. **How do you test ad creatives and landing pages?**
   I test one main difference at a time, such as the image, the headline or the offer, so I know what caused the change. I let the test run until each version has enough data, instead of stopping after one day. I choose the winner based on the main goal, such as cost per lead, not only on clicks. Then I use what I learned in the next creatives.
6. **What are the basics of good email marketing?**
   I only email people who agreed to hear from us, and I make unsubscribing easy, as privacy laws require. I segment the list, for example new customers and regular buyers, and send relevant content to each group. I write a clear subject line, one main message and one call to action. I track clicks and conversions, because open rates are less reliable since some email apps load images automatically.
7. **What is the difference between search ads and social media ads?**
   Search ads, such as Google Ads, show when people search for something, so they reach people who already have a need. Social media ads, such as on Meta platforms, show in feeds based on interests, behaviour and audiences, so they are good for creating demand. Search usually converts well but has limited volume. I often use social ads to build awareness and search ads to capture people who are ready to act.

### Fresher answers (first 3 role questions)

1. **What is a marketing funnel, and how do you use it?**
   A funnel shows the stages from first hearing about a brand to buying. I use different channels and messages for each stage.
2. **How do you plan a digital marketing campaign?**
   I set a clear goal and audience, then choose channels, message, budget and KPIs. After launch I check results and adjust.
3. **How do you split a budget across digital channels?**
   I put most of the budget into channels that already work and keep some for tests. I review spending every week.

### Junior extra questions

1. **How do you use Google Analytics 4 to understand campaign results?**
   I make sure campaigns use UTM parameters, so GA4 knows which source and campaign each visit came from. I set up the key events we care about, such as sign-ups or purchases, as conversions. In the reports I compare traffic, engagement and conversions by channel and campaign. I also check that the numbers roughly match the ad platforms, because they count differently.
2. **How do you grow an email list in the right way?**
   I offer something useful in return, such as a guide, a discount or a newsletter that people want. I ask for clear permission and explain what people will receive and how often. I never buy email lists, because it breaks trust and often privacy rules. I keep the list clean by removing addresses that bounce or never engage.

### Senior extra questions

1. **How do you measure the return on marketing spend across channels?**
   I agree on the business goal and how we count a conversion, then I track it across all channels. I compare attribution views, such as last click and data-driven attribution, because each tells a different story. For bigger budgets I use tests, such as turning a channel off in one region, to measure its real effect. I report the results in business terms, such as revenue and cost per customer.
2. **How do you prepare marketing for stricter privacy rules and fewer third-party cookies?**
   I build first-party data, such as email lists and customer accounts, with clear consent. I set up consent management correctly and use the privacy features that ad platforms offer, such as server-side tracking where it is allowed. I rely more on contextual targeting and testing than on detailed tracking. I keep the legal and data teams involved in every change.

## SEO Specialist

- id: `seo`
- Role label: SEO Specialist
- Profile role (setupRole): SEO Specialist
- Suggested skills: Keyword research, On-page SEO, Technical SEO, Google Search Console, Google Analytics 4, Content strategy, Link building, Core Web Vitals, Structured data, Reporting
- Search keywords: seo, search engine optimization, google search console, technical seo

### Role questions (Junior and Senior answers)

1. **How do you do keyword research for a new website?**
   I start from the business, its products and the questions customers ask. I use tools such as Google Keyword Planner, Search Console and other SEO tools to find search terms, their volume and how hard they are to rank for. I group related keywords into topics and match each topic to one page. I focus on terms that bring the right visitors, not only the biggest numbers.
2. **What do you check in on-page SEO?**
   I check that each page has a clear title tag and meta description that match what people search for. The page has one main heading, a logical structure with subheadings and useful content that answers the question. Images have descriptive alt text, and internal links connect related pages. The URL is short and readable.
3. **What is technical SEO, and what do you check first?**
   Technical SEO makes sure search engines can crawl, render and index the site. I check the robots.txt file, the XML sitemap, canonical tags and that important pages return a 200 status and are not blocked. I look at page speed and Core Web Vitals, such as LCP, INP and CLS, and at mobile usability. Search Console shows me pages with indexing problems.
4. **How do you earn links in a white hat way?**
   I create content that people want to reference, such as original data, useful guides or free tools. I share it with relevant websites, journalists and partners who would genuinely find it useful. I also fix broken links that point to us and claim mentions of the brand that are not yet linked. I never buy links or use link schemes, because they break search engine rules and can lead to penalties.
5. **What is search intent, and why does it matter?**
   Search intent is the reason behind a search, such as wanting to learn something, find a specific site, compare options or buy. Google ranks pages that match the intent best, so a sales page rarely ranks for a how-to search. I look at the pages that already rank to understand the intent. Then I create the type of content that fits it.
6. **How do you use Google Search Console in your work?**
   I use the performance report to see which queries and pages bring clicks and impressions, and how the click-through rate changes. The indexing reports show pages that are not indexed and why. I submit sitemaps and use URL inspection to check how Google sees a page. It also alerts me to manual actions and security issues.
7. **Organic traffic dropped suddenly. How do you find the cause?**
   I first check whether the drop is real, for example a tracking problem or a seasonal pattern. Then I look in Search Console at which pages and queries lost clicks and when it started. I compare the date with site changes, such as a redesign or migration, and with known Google updates. Once I know the cause, such as a technical error or weaker content, I fix it and watch the recovery.

### Fresher answers (first 3 role questions)

1. **How do you do keyword research for a new website?**
   I start from the business and customer questions and use tools to find search terms. I group them into topics and match each topic to a page.
2. **What do you check in on-page SEO?**
   I check the title, meta description, headings, useful content, image alt text and internal links. The URL should be short and clear.
3. **What is technical SEO, and what do you check first?**
   Technical SEO makes sure search engines can crawl and index the site. I check robots.txt, the sitemap, canonical tags and page speed.

### Junior extra questions

1. **What is structured data, and how does it help SEO?**
   Structured data is code, usually in JSON-LD format using Schema.org, that describes a page in a way search engines understand, such as a product, a recipe or an event. It can make a page eligible for rich results, such as star ratings or prices in search. It does not guarantee higher rankings. I test it with Google's Rich Results Test and only mark up content that is really on the page.
2. **How do you improve SEO for a local business?**
   I set up and complete the Google Business Profile with the correct name, address, phone, hours, photos and categories. I make sure these details are the same across the website and other directories. I encourage happy customers to leave honest reviews and reply to reviews politely. I also create pages for the services and areas the business really serves.

### Senior extra questions

1. **How do you plan SEO for a website migration?**
   I list all important URLs and their traffic before the move and map each old URL to its best new URL. I set up permanent 301 redirects, keep valuable content and update internal links, canonicals and sitemaps. I test everything on a staging site before launch. After launch I watch Search Console and traffic closely and fix errors quickly.
2. **How do you report SEO results to stakeholders?**
   I connect SEO to business goals, such as leads or sales from organic search, not only rankings. I show trends in clicks, impressions, conversions and the main pages and topics. I explain what we did, what worked and what we will do next, in simple language. I am honest that SEO takes time and that search engine updates can change results.

## Social Media Manager

- id: `socialmedia`
- Role label: Social Media Manager
- Profile role (setupRole): Social Media Manager
- Suggested skills: Content planning, Community management, Instagram, TikTok, LinkedIn, Social media analytics, Short-form video, Canva, Brand voice, Crisis communication
- Search keywords: social media manager, social media marketing, instagram, tiktok

### Role questions (Junior and Senior answers)

1. **How do you build a monthly social media calendar?**
   I start from the marketing goals and key dates for the month, such as launches, events and holidays. I plan a mix of content types, such as education, behind the scenes, customer stories and offers, for each platform. Each post has a date, a format, an owner and the assets it needs. I leave room for timely posts and trends.
2. **How do you adapt content for different social platforms?**
   Each platform has its own audience and style. LinkedIn works best with professional insights and stories, Instagram with strong visuals and Reels, and TikTok with short, authentic videos that follow trends. I adapt the format, length, captions and tone for each one instead of posting the same thing everywhere. I also post at the times when each audience is most active.
3. **How do you grow engagement and build a community on social media?**
   I post content that is useful, entertaining or relevant to the audience, not only about the brand. I reply to comments and messages quickly and in a human way. I ask questions, run polls and share content from customers with their permission. Regular, honest interaction builds a community that trusts the brand.
4. **Which social media metrics do you track, and why?**
   I track reach and impressions to see how many people see our content. Engagement rate, saves and shares show whether people find it valuable. Follower growth shows how the audience changes, and clicks and conversions show the business result. I choose the main metrics based on the goal of each campaign.
5. **How do you handle negative comments on a brand page?**
   I respond quickly and politely, thank the person and acknowledge the problem. If it needs personal details, I move the conversation to a private message. I never delete fair criticism, but I follow the page rules for abuse, spam or hate. I share real problems with the right team, so the cause gets fixed.
6. **How do you keep the brand voice the same across platforms and team members?**
   I write a short social media style guide with the tone, words we use and avoid, emoji rules and example replies. Everyone who posts or replies uses it, including agencies. I review posts before they go live and give quick feedback. The tone can change a little for each platform, but the personality stays the same.
7. **How do you work with designers and writers on social content?**
   I give them a clear brief with the goal, the audience, the platform, the format and the deadline. I share examples of what has worked well before. I give feedback in one place, with specific points, and agree on the number of review rounds. Good briefs save time and give better content.

### Fresher answers (first 3 role questions)

1. **How do you build a monthly social media calendar?**
   I start from the goals and key dates for the month and plan a mix of content for each platform. Each post has a date, a format and an owner.
2. **How do you adapt content for different social platforms?**
   Each platform has its own style, such as professional posts on LinkedIn and short videos on TikTok. I adapt the format and tone for each one.
3. **How do you grow engagement and build a community on social media?**
   I post content the audience finds useful and reply to comments quickly. I ask questions and share customer content with permission.

### Junior extra questions

1. **How do you plan short-form video content?**
   I plan simple ideas that grab attention in the first seconds, such as a question, a quick tip or a before and after. I keep videos short, add captions and use trending sounds where they fit the brand. I film vertically for Reels, TikTok and YouTube Shorts. I check which videos people watch to the end and make more like them.
2. **How do you work with creators or influencers?**
   I choose creators whose audience and values fit the brand, not only those with the most followers. I agree on the goals, the content, the timeline and the payment in writing. Sponsored posts must be clearly marked, for example with a paid partnership label, as the platforms and advertising rules require. I measure the results, such as reach, engagement and sales from their posts.

### Senior extra questions

1. **How do you handle a social media crisis?**
   I pause scheduled posts and get the facts quickly from the right people. With the communications and legal teams, I agree on a short, honest response and who will post it. I respond in the right channels and keep monitoring the reaction closely. After the crisis, I review what happened and update our crisis plan.
2. **How do you set social media goals that support business goals?**
   I start from the business goal, such as more leads, sales or brand awareness among a new audience. Then I choose the social metrics that show progress towards it, such as reach in the target audience or leads from social. I set realistic targets based on past results. I report progress monthly and change the plan when the numbers show it is not working.

# Parent: Sales and Retail

## Store Supervisor

- id: `storesup`
- Role label: Store Supervisor
- Profile role (setupRole): Store Supervisor
- Suggested skills: Store operations, Cash reconciliation, Staff scheduling, Stock control, Visual merchandising, Loss prevention, Customer service, Health and safety, Point of sale, Reporting
- Search keywords: store supervisor, shop supervisor, floor supervisor, retail supervisor

### Role questions (Junior and Senior answers)

1. **What do you check when you open and close a store?**
   At opening I check that the store is clean, safe and stocked, the tills have the right cash float and the staff know the plan for the day. I make sure prices, promotions and displays are ready before customers arrive. At closing I count and secure the cash, check that the shop floor is tidy and doors and alarms are set. I follow a written checklist, so nothing is missed.
2. **How do you plan the staff rota for the week?**
   I look at the expected footfall for each day and hour, using past sales and planned promotions. I schedule more people at busy times and make sure every shift has someone who can open, close and handle cash. I follow the rules on working hours and breaks and share the rota early. When someone is absent, I find cover quickly and fairly.
3. **What do you do when the till does not match at the end of the day?**
   I recount the cash and check the till report, refunds, voids and card payments for mistakes. I look for simple causes, such as change given wrongly or a payment entered twice. I record the difference and the reason, following the company procedure. If differences repeat, I look for patterns and retrain staff or tighten the cash process.
4. **How do you run a stock count and reduce shrinkage?**
   I plan the count when the store is quiet, split the store into zones and use scanners where possible. I compare the counted stock with the system and investigate big differences. To reduce shrinkage, I check deliveries carefully, protect high-value items, record damaged goods correctly and train staff to follow the procedures. I track shrinkage over time to see if the actions work.
5. **How do you keep the store looking right and follow the merchandising plan?**
   I follow the planogram and the merchandising guidelines from head office, so products are in the right place and quantity. I keep shelves full, faced and clean, with clear price labels. I check the store as a customer would see it, especially the entrance and key displays. When stock runs low, I adjust the display so it never looks empty.
6. **What do you do when a customer asks to speak to the supervisor?**
   I introduce myself, listen to the whole story and thank the staff member for bringing me in. I look for a fair solution within the company policy, such as an exchange, a refund or an alternative. If I cannot give what the customer wants, I explain why and offer what I can. Afterwards, I talk with the staff member about what we can learn.
7. **Which store numbers do you check every day?**
   I check total sales against the daily target and against the same day last year. I look at the number of transactions, the average transaction value and, where we have a counter, the conversion rate of visitors to buyers. I also check stock of best sellers and any cash differences. These numbers help me plan the next day and the staff on the floor.

### Fresher answers (first 3 role questions)

1. **What do you check when you open and close a store?**
   At opening I check cleanliness, stock, the cash float and the plan for the day. At closing I secure the cash and set the doors and alarms.
2. **How do you plan the staff rota for the week?**
   I schedule more staff at busy times and make sure each shift can open, close and handle cash. I share the rota early.
3. **What do you do when the till does not match at the end of the day?**
   I recount the cash and check refunds, voids and card payments for mistakes. I record the difference and the reason.

### Junior extra questions

1. **What do you do if you think someone is shoplifting?**
   I follow the company loss prevention policy, and the safety of staff and customers comes first. I do not accuse or chase anyone myself. I greet the person and offer help, because good customer service often stops theft. If needed, I inform security or the manager and record what happened accurately.
2. **How do you keep the store safe for staff and customers?**
   I check that walkways and fire exits are clear and that spills are cleaned and marked at once. Staff are trained to lift heavy boxes safely and use ladders correctly. I report and fix hazards, such as broken shelves or lights. I follow the health and safety rules and record any accident properly.

### Senior extra questions

1. **How do you prepare a store for a big sale event?**
   I agree on the plan with head office, including the offers, the stock and the displays. I make sure we receive enough stock and have extra staff, extra tills and clear signs. I brief the team on the offers, the busy times and how to handle queues. After the event I review the sales, stock left and customer feedback.
2. **How do you work with head office on stock and promotions?**
   I share clear information from the store, such as best sellers, products that do not sell and what customers ask for. I follow the promotion and merchandising plans and report problems early, for example missing stock or wrong prices. I make suggestions with numbers to support them. Good communication helps head office send the right stock to the store.

## Business Development

- id: `bizdev`
- Role label: Business Development Executive
- Profile role (setupRole): Business Development Executive
- Suggested skills: Lead generation, Prospecting, Cold outreach, CRM, Pipeline management, Proposals, Negotiation, LinkedIn, Market research, Presentation
- Search keywords: business development, b2b sales, lead generation, crm

### Role questions (Junior and Senior answers)

1. **How do you generate new leads for the business?**
   I first define the ideal customer, such as the industry, company size and the problem we solve for them. Then I find leads through LinkedIn, industry events, referrals from customers and partners, and inbound leads from marketing. I research each lead before I contact them. I track where good leads come from and spend more time on those sources.
2. **How do you write a cold outreach message that gets replies?**
   I keep it short and about the prospect, not about us. I mention something specific about their company or role and the problem we may help with. I end with one simple question, such as whether a short call next week makes sense. I follow up a few times politely and stop if they are not interested.
3. **How do you decide whether a lead is worth pursuing?**
   I check whether they have a real need we can solve, whether they have budget, who makes the decision and when they want to act. Frameworks such as BANT help me ask these questions in a natural way. If a lead does not fit now, I keep in touch for later instead of pushing. This keeps my time on the deals that can close.
4. **How do you manage your pipeline in a CRM?**
   I record every lead, contact and deal in the CRM with the stage, value, next step and date. I update it after every call or meeting, so the data is always current. Each week I review the pipeline, move deals forward or close them as lost. This helps me and my manager forecast sales and see where deals get stuck.
5. **How do you prepare a strong business proposal?**
   I start with the client's problem and goals in their own words, from our discovery conversations. Then I explain our solution, how it solves the problem, the timeline and the price, in clear language. I add proof, such as case studies or results, and make the next steps easy to follow. I review the proposal with the client before the final version where possible.
6. **How do you negotiate a deal fairly?**
   I prepare by knowing our walk-away point and what we can offer besides price, such as payment terms, training or a longer contract. I listen to understand what really matters to the client. I trade concessions instead of giving discounts for free. My aim is an agreement both sides are happy with, because good relationships bring repeat business.
7. **How do you follow up after a meeting with a prospect?**
   I send a short follow-up the same day with a summary of what we discussed, the agreed next steps and any material I promised. I record the meeting in the CRM and set a reminder for the next contact. If the prospect goes quiet, I follow up with something useful, such as a relevant case study. I stay persistent but respectful.

### Fresher answers (first 3 role questions)

1. **How do you generate new leads for the business?**
   I define the ideal customer first, then find leads through LinkedIn, events, referrals and marketing. I research each lead before I contact them.
2. **How do you write a cold outreach message that gets replies?**
   I keep the message short and about the prospect's problem. I end with one simple question and follow up politely.
3. **How do you decide whether a lead is worth pursuing?**
   I check their need, budget, decision maker and timing. If a lead does not fit now, I keep in touch for later.

### Junior extra questions

1. **How do you research a company before the first call?**
   I read their website, recent news, annual report if available and the LinkedIn profiles of the people I will meet. I try to understand their goals, challenges and how they make money. I prepare a few questions about their needs and an idea of how we might help. Good research shows respect and makes the call more useful for both sides.
2. **What do you do when a prospect says the price is too high?**
   I ask what they are comparing it with and what matters most to them. I explain the value and the results they can expect, not only the features. If there is a real budget limit, I look at options, such as a smaller package or different payment terms. I never promise things we cannot deliver just to close the deal.

### Senior extra questions

1. **How do you plan entry into a new market or customer segment?**
   I research the market size, the main customer needs, the competitors and any rules we must follow. I define who our ideal customers are there and what message will matter to them. I start with a small test, such as a pilot with a few customers, to learn quickly. Then I set targets and a plan to grow if the test works.
2. **How do you build a strategic partnership with another company?**
   I look for partners whose customers and goals fit ours, so both sides gain. I agree on what each side brings, how we share leads and revenue and how we measure success. I start with a small joint project to build trust. Regular reviews keep the partnership active and fair.

# Parent: Customer Service

## Call Center Agent

- id: `callcenter`
- Role label: Call Center Agent
- Profile role (setupRole): Call Center Agent
- Suggested skills: Call handling, Active listening, CRM, Call metrics, Data protection, Typing speed, Empathy, Problem solving, Schedule adherence, Product knowledge
- Search keywords: call center, call centre, contact center, bpo

### Role questions (Junior and Senior answers)

1. **How do you open and close a call professionally?**
   I open with a friendly greeting, my name and the company name, and I ask how I can help. I confirm the caller's details following the security steps. At the end I summarise what we agreed, check that the caller has no other questions and thank them. A clear opening and closing make the call feel organized and polite.
2. **What do AHT, FCR and CSAT mean in a call center?**
   AHT, or average handle time, is the average length of a call including hold time and after-call work. FCR, or first call resolution, is the share of issues solved on the first contact. CSAT, or customer satisfaction, comes from short surveys after the call. I try to solve the issue fully first, because a short call that leads to a repeat call is not good service.
3. **How do you follow a call script and still sound natural?**
   I learn the script well, so I know the key steps and the required wording, such as legal statements. I use my own words for the rest and adjust my tone to the caller. I listen actively and respond to what the caller says, not only to the next line of the script. The script guides me, but empathy makes the call work.
4. **How do you put a caller on hold or transfer a call correctly?**
   I ask permission before I put someone on hold, explain why and say roughly how long it will take. I check back if the hold takes longer than expected. Before a transfer, I explain to the caller who I am transferring them to and why. I give the next agent a short summary, so the caller does not have to repeat everything.
5. **Why are after-call notes important, and what do you write?**
   Good notes let the next agent understand the case quickly, even if the customer calls again. I write the reason for the call, what I checked, what I did and any promise or next step with a date. I keep the notes short, clear and factual. I finish them right after the call, while the details are fresh.
6. **How do you verify a caller and protect their personal data?**
   I follow the security steps every time, such as asking for specific account details, before I share or change anything. I never give personal data to someone who cannot pass verification, even if they sound genuine. I do not write customer data on paper or say it loudly. If something feels like a scam attempt, I follow the fraud procedure and report it.
7. **What is schedule adherence, and why does it matter?**
   Schedule adherence means being available to take calls at the times planned for me, including logging in on time and taking breaks as scheduled. The workforce team plans the number of agents for each half hour based on expected calls. If agents are not available as planned, waiting times go up for customers. I plan my day so I keep to my schedule.

### Fresher answers (first 3 role questions)

1. **How do you open and close a call professionally?**
   I greet the caller with my name and the company name and confirm their details. At the end I summarise the call and thank them.
2. **What do AHT, FCR and CSAT mean in a call center?**
   AHT is the average length of a call, and FCR means solving the issue on the first call. CSAT is the satisfaction score from short customer surveys.
3. **How do you follow a call script and still sound natural?**
   I learn the key steps and required wording of the script. I use my own words for the rest and listen to the caller.

### Junior extra questions

1. **What do you do when the system goes down during a call?**
   I stay calm and tell the caller honestly that our system is slow or not working at the moment. I take their details and the problem on a secure form or note the team has approved, and offer to call back when the system is working. I report the problem to my team leader at once. When it is fixed, I complete the case and call the customer back as promised.
2. **How do you make an outbound call to a customer?**
   I prepare first by reading the customer's history and the purpose of the call. I introduce myself, explain clearly why I am calling and check that it is a good time to talk. I respect their choice if they are not interested and follow the rules on calling times and consent. I record the outcome of the call in the CRM.

### Senior extra questions

1. **How do you coach agents using call recordings?**
   I listen to a few calls with the agent and start with what they did well. Then I pick one or two specific points to improve, such as the opening or how they explained a policy. We agree on a small goal and I listen again later to check progress. I base the coaching on the quality checklist, so it is fair and consistent.
2. **How do you reduce repeat calls in a call center?**
   I look at the reasons for repeat calls, such as unclear answers, unfinished cases or problems in other teams. I share the main causes with the team and update scripts and the knowledge base. I work with other departments to fix process issues that cause calls, such as unclear bills. I track first call resolution to see if the changes work.

# Names and families

- Banking Officer is not added (no type, id, keyword, family member or a/an entry).
- Retail Sales Associate is not added, because the existing `sales` type ("Sales Associate") already covers shop-floor selling. Store Supervisor (`storesup`) is added instead, with supervisor tasks: opening and closing, the staff rota, till differences, stock counts and shrinkage, merchandising plans, customers who ask for the supervisor, daily store numbers, shoplifting, safety, sale events and head office.
- Call Center Agent (`callcenter`) keeps call-center topics only (call opening and closing, AHT, FCR and CSAT, scripts, hold and transfer, after-call notes, caller verification, schedule adherence), apart from the existing Customer Service questions.
- "Business Development Executive" is shown as "Business Development" inside the Sales and Retail list (3 lines with wide fonts); the full name stays the type label and the role in answers.
- Families are split so that existing roles never share a new family, which keeps every existing answer byte-identical:
  - Finance: Accountant, Financial Analyst, Internal Auditor
  - Corporate Finance: Finance, Financial Analyst, Internal Auditor
  - Marketing: Marketing/Sales, Digital Marketing Specialist, SEO Specialist, Social Media Manager
  - Content Marketing: Content Writer, Copywriter, Digital Marketing Specialist, SEO Specialist, Social Media Manager
  - Sales and Retail: Sales Associate, Store Supervisor, Business Development Executive
  - Customer Service: Customer Service, Call Center Agent, Store Supervisor

# Overlap check

No question text is repeated in any two types (checked by `tests/practice/categories.test.mjs`). Where a new question shares a topic with an existing one, I wrote it to ask something different. Those pairs are below.

| New question | Related existing question | Why both stay |
| --- | --- | --- |
| Financial Analyst: how the three statements link | Accounting: what are the main financial statements | How the statements connect in a model vs naming them |
| Financial Analyst: analyse performance over several years (common-size) | Finance: financial ratios you use | Trends and common-size view vs a list of ratios |
| Financial Analyst: explain what drove a change in profit (bridge) | Finance: analyse a variance between budget and actual | A year-on-year profit bridge by driver vs budget variance |
| Financial Analyst: build a financial forecast; improve forecasting | Finance: how do you prepare a budget | Driver-based forecasting vs the yearly budget |
| Financial Analyst: Excel model others can trust; common modelling mistakes | Finance: Excel skills in finance work; Data Analyst: check numbers before sharing | Model structure and checks vs a skills list vs report checks |
| Financial Analyst: turn analysis into a recommendation | Finance: present financial information to non-finance managers | Making the decision call vs explaining finance simply |
| Internal Auditor: plan, scope, sample, findings, follow-up | Accounting: prepare for an external audit | Running the internal audit vs supporting the external auditor |
| Internal Auditor: design vs operating effectiveness of a control | Accounting: improve financial controls in a company | Testing controls vs designing them |
| Digital Marketing: KPIs for paid ads; return on marketing spend | Marketing: measure the success of a campaign; measure whether a campaign worked | Paid-media metrics and attribution vs general campaign results |
| Digital Marketing: test ad creatives and landing pages | Copywriter: test two versions of copy; Product Manager: A/B testing for product decisions | Ads and landing pages vs one line of copy vs product changes |
| Digital Marketing: basics of good email marketing; grow an email list | Copywriter: write an email that people open | List, consent and segmentation vs writing one email |
| Digital Marketing: search ads vs social media ads | Marketing: social media vs traditional marketing | Two paid digital channels vs digital vs traditional |
| SEO: keyword research, on-page, technical, links, intent, Search Console, traffic drops | Content Writer: SEO basics when you write | Full SEO work vs writing habits |
| Social Media: monthly social media calendar | Content Writer: plan a content calendar | Posts across platforms vs articles |
| Social Media: brand voice across platforms and team members | Copywriter: write in a brand voice; Graphic Design: consistent social media posts | Many people replying and posting vs one writer vs visual consistency |
| Social Media: adapt content for different platforms | Content Writer: content for social media posts | Platform formats and timing vs writing one post |
| Store Supervisor: customer asks for the supervisor | Sales Associate: angry customer at the counter; Customer Service: calm an angry customer | The escalated case and coaching the staff member vs first contact |
| Store Supervisor: daily store numbers | Sales Associate: reach your sales targets; Team Leader: set targets | Checking store results vs personal targets vs setting team targets |
| Store Supervisor: staff rota | Operations Manager: shortage of staff on a busy day; Team Leader: delegate | Weekly scheduling vs a staffing emergency vs task delegation |
| Store Supervisor: big sale event; improve with head office | Sales Associate: busy store with many customers; improve sales of a slow store | Preparing the store and stock vs serving the queue vs raising sales |
| Business Development: leads, outreach, CRM, proposals, negotiation, follow-up | Sales Associate: sell to an unsure customer; Copywriter: messaging for a launch | B2B pipeline work vs shop-floor selling vs launch messaging |
| Business Development: price is too high | Sales Associate: sell to a customer who is not sure | A B2B price objection vs an unsure shopper |
| Call Center: AHT, FCR and CSAT | Customer Service: measure your performance in customer service | Defining the call-center metrics vs your own performance |
| Call Center: open and close a call; hold and transfer; after-call notes | Customer Service: handle phone, chat and email support | Call-handling steps vs choosing channels |
| Call Center: reduce repeat calls | IT Support: reduce repeat support tickets | Call-center causes and scripts vs IT ticket causes |
| Call Center: coach agents with call recordings | Customer Service: improve a support team's performance | Call quality coaching vs team performance in general |
