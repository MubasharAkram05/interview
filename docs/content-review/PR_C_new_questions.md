# PR C: new questions for review

For review only. This file is not part of the app (the app reads src/data/more-questions.js).

Every category also has the shared opening and closing questions (not repeated here). Fresher shows the first 3 role questions with the simpler Fresher answer; Junior and Senior show all 7 role questions with the full answer, plus their 2 extra questions. Counts per level: Fresher 10, Junior 19, Senior 19.

- **Data and Analytics**
  - [Data Analyst](#data-analyst)
  - [BI Developer](#bi-developer)
  - [Data Scientist](#data-scientist)
  - [Data Engineer](#data-engineer)
- **AI and Machine Learning**
  - [AI and Machine Learning](#ai-and-machine-learning)
  - [Machine Learning Engineer](#machine-learning-engineer)
  - [Generative AI Engineer](#generative-ai-engineer)
  - [Computer Vision Engineer](#computer-vision-engineer)
  - [NLP Engineer](#nlp-engineer)
- **Database**
  - [Database](#database)
  - [Database Administrator](#database-administrator)
  - [Data Warehouse / ETL](#data-warehouse--etl)
  - [NoSQL / MongoDB](#nosql--mongodb)

# Parent: Data and Analytics

## Data Analyst

- id: `analyst`
- Role label: Data Analyst
- Profile role (setupRole): Data Analyst
- Suggested skills: Excel, SQL, Power BI, Tableau, Python, Pandas, Data cleaning, Data visualization, Statistics, Reporting
- Search keywords: data analysis, reporting, pivot table, excel, power bi, tableau

### Role questions (Junior and Senior answers)

1. **What does a data analyst do day to day?**
   I collect data from sources such as databases and spreadsheets, clean it and check that it is correct. Then I analyse it to answer business questions, for example why sales dropped in one region. I share the results in reports or dashboards with a short summary and a clear recommendation. I also work with managers to understand what they really need to know.
2. **How do you use pivot tables in Excel?**
   A pivot table summarises a large table in a few clicks, for example total sales by region and month. I drag fields into rows, columns and values, and choose sum, count or average. I add filters or slicers so people can focus on one product or period. Before I share the result, I check that the source range includes all the rows.
3. **What is the difference between mean, median and mode?**
   The mean is the average: the sum of the values divided by how many there are. The median is the middle value when the values are sorted, and the mode is the value that appears most often. When the data has outliers, such as a few very large salaries, I report the median, because a few extreme values can pull the mean up.
4. **How do you check that your numbers are correct before you share a report?**
   I compare totals with the source system or an earlier trusted report. I check row counts after every join and filter, because a wrong join can double or drop rows. I look for values that do not make sense, such as negative quantities. When possible, a colleague reviews the logic before the report goes out.
5. **What is the difference between correlation and causation?**
   Correlation means two values move together, for example ice cream sales and sunburn cases both rise in summer. Causation means one thing actually causes the other. Correlation alone does not prove causation, because a third factor, here hot weather, can drive both. To show a cause, a controlled test such as an A/B test is much stronger.
6. **How do you choose the right chart for your data?**
   I choose the chart based on the message. A line chart shows a trend over time, a bar chart compares categories and a scatter plot shows the relation between two numbers. I avoid 3D charts and too many colours, and I start bar charts at zero so differences are not exaggerated. Every chart gets a title that states the main point.
7. **How do you handle a report request when the question is not clear?**
   I ask what decision the report will support, who will read it and how often they need it. I confirm the definitions, for example what counts as an active customer. Then I share a small draft early, so we agree on the direction before I spend time on the details.

### Fresher answers (first 3 role questions)

1. **What does a data analyst do day to day?**
   I collect and clean data, then analyse it to answer business questions. I share the results in simple reports and charts with a clear summary.
2. **How do you use pivot tables in Excel?**
   A pivot table summarises a big table quickly, for example total sales by month. I choose the rows, columns and values, and add filters if needed.
3. **What is the difference between mean, median and mode?**
   The mean is the average, the median is the middle value and the mode is the most common value. If there are extreme values, the median gives a fairer picture.

### Junior extra questions

1. **How do you find out why a key number dropped last month?**
   I first confirm the drop is real and not a data or tracking problem. Then I break the number down by region, product, channel and customer type to see where the drop comes from. I check what happened in that period, such as price changes or outages. I share what I found, how sure I am and what we should check next.
2. **What is an A/B test, and how do you read its results?**
   An A/B test randomly splits users into two groups, shows each group a different version and compares one chosen metric. I decide the metric and the sample size before the test starts. When I read the results, I check whether the difference is statistically significant and large enough to matter for the business. I do not stop the test early just because the numbers look good.

### Senior extra questions

1. **How do you define a metric so every team uses it the same way?**
   I write a clear definition with the exact formula, data source, filters and time period. I agree on it with the business owners and record it in a shared data dictionary. Reports then use one shared calculation instead of each team writing its own. When the definition changes, I note the date and explain the impact.
2. **How do you work with stakeholders who disagree with your analysis?**
   I listen to their concerns and ask what they expected and why. I walk them through the data, the method and its limits openly. If they raise a fair point, I check it and update the analysis. My aim is the right answer for the business, not winning the argument.

## BI Developer

- id: `bidev`
- Role label: BI Developer
- Profile role (setupRole): BI Developer
- Suggested skills: Power BI, DAX, SQL, Tableau, Data modeling, ETL, Dashboards, Excel, Data warehouse, Reporting
- Search keywords: business intelligence, power bi, dax, tableau, dashboard

### Role questions (Junior and Senior answers)

1. **What is a star schema, and why is it used in BI?**
   A star schema has one central fact table with numbers, such as sales amounts, linked to dimension tables that describe them, such as date, product and customer. It is simple to understand and fast to filter and summarise. In Power BI it also keeps DAX measures simpler and the model smaller.
2. **What is the difference between a calculated column and a measure in Power BI?**
   A calculated column is computed for every row when the data is refreshed and is stored in the model, so it uses memory. A measure is computed when a report runs, based on the filters the user selects, such as a year or a region. I use measures for totals and ratios, and calculated columns only when I need a value per row, for example to group or filter.
3. **How do you design a dashboard that people actually use?**
   I start with the users and the decisions they make, not with the data. I put the most important numbers at the top, keep each page focused on one topic and use simple charts. I add filters only where they help. Then I test it with a few users and improve it based on their feedback.
4. **What is DAX, and can you give a simple example?**
   DAX is the formula language of Power BI and other Microsoft data models. A simple measure is Total Sales, which is the SUM of the sales amount column. CALCULATE is a key function, because it changes the filter context, for example to show sales for the current year only. I keep measures in one place and give them clear names.
5. **How do you make a slow dashboard faster?**
   I use the performance tools of the BI software to see which visuals and measures take the longest. I remove unused columns, reduce very detailed data, use a star schema and simplify heavy measures. I also limit the number of visuals on one page. For large data I use pre-summarised tables where possible.
6. **What is row-level security in a BI report?**
   Row-level security limits which rows each user can see in the same report. For example, a regional manager sees only the sales of their own region. I define the rules with roles and filters in the model, assign users or groups to the roles and test the report as each role. One report can then serve many teams safely.
7. **How do you keep dashboard data refreshed and reliable?**
   I schedule refreshes to match how often the source data changes, for example every morning. I get an alert when a refresh fails and fix the cause quickly. The report shows the last refresh time, so users know how fresh the data is. After changes, I check key totals against the source.

### Fresher answers (first 3 role questions)

1. **What is a star schema, and why is it used in BI?**
   A star schema has one fact table with numbers, like sales, in the middle. Dimension tables, like date, product and customer, describe those numbers and make reports fast and simple.
2. **What is the difference between a calculated column and a measure in Power BI?**
   A calculated column is stored for every row. A measure is calculated when the user filters the report, so I use measures for totals and percentages.
3. **How do you design a dashboard that people actually use?**
   I ask users which decisions they make, then show the key numbers at the top with simple charts. I keep each page focused and test it with real users.

### Junior extra questions

1. **How do you handle a request to add many charts to one dashboard?**
   I ask what question each chart answers and who will use it. If a chart does not support a decision, I suggest leaving it out or moving it to a detail page. Too many charts make a dashboard slow and hard to read. I offer a clean main page with drill-through pages for the details.
2. **What is a date table, and why do BI models need one?**
   A date table has one row per day with columns such as year, quarter, month and week. I link it to the fact tables and mark it as the date table in the model. It makes time calculations, such as year to date or the same period last year, simple and correct. It also lets reports show days with no sales.

### Senior extra questions

1. **How do you set up self-service BI without losing control of the numbers?**
   I publish certified datasets with trusted definitions, and people build their own reports on top of them. Workspaces have clear owners, and access is given by role. I train users on the basics and review the most used reports. This gives teams freedom while keeping one version of the key metrics.
2. **How do you move BI reports safely from development to production?**
   I keep separate development, test and production workspaces. I store report and model files in version control where the tool allows it, and users test changes before release. A deployment pipeline or a checklist makes sure connections and settings point to the right environment. I also tell users what changed.

## Data Scientist

- id: `datasci`
- Role label: Data Scientist
- Profile role (setupRole): Data Scientist
- Suggested skills: Python, Statistics, Machine learning, Pandas, NumPy, scikit-learn, SQL, Data visualization, Feature engineering, Model evaluation
- Search keywords: data science, statistics, predictive model, scikit-learn

### Role questions (Junior and Senior answers)

1. **How do you approach a new data science problem from start to finish?**
   I start with the business question and how success will be measured. Then I explore and clean the data, build a simple baseline and try better models step by step. I evaluate on data the model has not seen and explain the results in business terms. Finally, I agree with the team how the model will be used and monitored.
2. **What is feature engineering? Give an example.**
   Feature engineering means creating input values that help a model learn the pattern. For example, from a purchase date I can make the day of the week, the month and the days since the last purchase. I also encode categories, scale numbers when the model needs it and combine columns into ratios. Good features often help more than a more complex algorithm.
3. **What does a p-value tell you?**
   A p-value is the probability of seeing a result at least as extreme as the one observed, assuming there is no real effect. A small p-value, often below 0.05, suggests the result is unlikely to be due to chance alone. It does not show how large or important the effect is, and it is not the probability that the effect is real. So I also report the effect size and a confidence interval.
4. **How does k-fold cross-validation work?**
   I split the data into k parts, for example five. The model trains on four parts and is tested on the fifth, and this repeats until every part has been the test part once. The average score is a more reliable estimate than a single split. For time series data I use time-based splits instead, so the model never trains on the future.
5. **How do you handle an imbalanced dataset?**
   First I choose metrics that fit, such as precision, recall or the area under the precision-recall curve, because accuracy can look high while the model misses the rare class. Then I can use class weights, resample the training data or adjust the decision threshold. I keep the test set with the real class balance, so the results stay honest.
6. **What is the difference between linear regression and logistic regression?**
   Linear regression predicts a number, such as a house price, by fitting a straight-line relationship between the inputs and the output. Logistic regression predicts the probability of a class, such as whether a customer will leave, and the logistic function keeps the output between 0 and 1. Both are fast and easy to explain, so I often use them as a baseline.
7. **How do you explain how a model makes its predictions?**
   For simple models I show the coefficients or the decision rules. For complex models I use feature importance and methods such as SHAP values, which show how much each feature pushed a single prediction up or down. I explain it in business terms and state the limits, because these methods show associations, not causes.

### Fresher answers (first 3 role questions)

1. **How do you approach a new data science problem from start to finish?**
   I first understand the business question and how success is measured. Then I clean the data, build a simple model and test it on new data before I share the results.
2. **What is feature engineering? Give an example.**
   Feature engineering means making useful inputs for the model. For example, from a date I can create the day of the week or the month.
3. **What does a p-value tell you?**
   A p-value shows how likely a result this extreme would be if there were really no effect. A small value, often below 0.05, suggests the result is probably not just chance.

### Junior extra questions

1. **What is data leakage, and how do you avoid it?**
   Data leakage happens when information that is not available at prediction time gets into training, so the model looks great in testing but fails in real use. An example is a field that is filled in only after a customer has already left. I split the data before any preprocessing, fit scalers and encoders on the training set only and check when each feature becomes known.
2. **How do you choose between a simple model and a complex one?**
   I start with a simple model as a baseline and move to a complex one only if it clearly improves the result on validation data. I also weigh training cost, speed, how easy it is to explain and how hard it is to maintain. If two models perform about the same, I choose the simpler one.

### Senior extra questions

1. **How do you measure the business impact of a model after it goes live?**
   I agree on the business metric before launch, such as fewer customers leaving or lower fraud losses. Where possible, I compare a group that uses the model with a control group that does not. I also track model metrics and data drift over time. I report the results honestly, including where the model did not help.
2. **How do you check a model for unfair bias?**
   I compare model results across groups, such as gender or age, using error rates and approval rates per group. I check the training data for groups that are missing or under-represented and for features that act as a proxy for sensitive traits. If I find a gap, I fix the data, adjust the model or threshold and document the trade-off. I repeat the check after every retrain.

## Data Engineer

- id: `dataeng`
- Role label: Data Engineer
- Profile role (setupRole): Data Engineer
- Suggested skills: Python, SQL, ETL, Airflow, Spark, Data pipelines, Data warehouse, Kafka, Cloud storage, Data modeling
- Search keywords: data engineering, data pipeline, airflow, kafka, spark

### Role questions (Junior and Senior answers)

1. **What is a data pipeline, and what are its main parts?**
   A data pipeline moves data from sources to a place where people can use it. The main parts are ingestion from sources such as databases, files or APIs, processing to clean and transform the data, and storage in a warehouse or lake. Around it there is scheduling, monitoring and alerting, so failures are caught early.
2. **What is Apache Kafka used for?**
   Kafka is a distributed event streaming platform. Producers write events, such as orders or clicks, to topics, and consumers read them at their own speed. Kafka keeps events for a set time, so several systems can read the same data and replay it if needed. Teams use it to connect systems and to feed real-time pipelines.
3. **How do you write pipeline code in Python that is easy to maintain?**
   I split the code into small functions with clear names, one for each step. I keep settings such as paths in configuration, and secrets in a secure store, never in the code. I add logging, type hints and unit tests for the transformations. The code lives in Git and goes through code review.
4. **What is a DAG in Apache Airflow?**
   A DAG, or directed acyclic graph, is how Airflow defines a workflow. Each task is a step, such as extracting a file or loading a table, and the arrows show which tasks must finish first. Acyclic means there are no loops, so the workflow always has a clear end. The DAG also sets the schedule, retries and alerts.
5. **How do you add data quality checks to a pipeline?**
   I check the data at each stage: row counts, required columns not empty, unique keys, valid ranges and allowed values. I also compare totals with the source. Critical failures stop the pipeline and alert the team, while small warnings are logged for review. This stops bad data from reaching reports.
6. **What is change data capture?**
   Change data capture, or CDC, reads only the rows that were inserted, updated or deleted in a source database, often from its transaction log. The pipeline then applies just these changes to the target instead of copying the full table again. This reduces the load on the source and keeps the target close to real time.
7. **What is schema evolution, and how do you handle it?**
   Schema evolution means the structure of the source data changes over time, for example a new column is added or a type changes. I use table formats that can add columns safely and agree on a data contract with the source team. Schema checks catch breaking changes, such as a renamed or removed column, before they reach the target. I version the schema and tell the people who use the data.

### Fresher answers (first 3 role questions)

1. **What is a data pipeline, and what are its main parts?**
   A data pipeline moves data from sources like databases, files or APIs to a warehouse. On the way it cleans and changes the data, and it runs on a schedule with alerts.
2. **What is Apache Kafka used for?**
   Kafka is a platform for streaming events. Producers write events to topics and consumers read them, so many systems can use the same data in real time.
3. **How do you write pipeline code in Python that is easy to maintain?**
   I write a small function for each step, keep settings out of the code and add logging and tests. Everything is stored in Git.

### Junior extra questions

1. **How do you debug a pipeline that failed overnight?**
   I read the logs of the failed task to find the exact error and the input that caused it. I check the common causes: a changed source schema, missing files, bad data or a timeout. I fix the cause, rerun only the failed part and confirm the output row counts. Then I tell the data users if their reports were affected and add a check so it does not happen again.
2. **How do you make a slow Spark job faster?**
   I look at the job in the Spark UI to find slow stages and data skew, where one task gets much more data than the others. I filter rows and select columns early, avoid unnecessary shuffles and use a broadcast join when one table is small. I also check the number of partitions and cache data only when it is reused. Then I measure again.

### Senior extra questions

1. **How do you handle sensitive personal data in pipelines?**
   I collect only the fields we really need and classify sensitive columns, such as phone numbers or national ID numbers. I mask, hash or remove them as early as possible in the pipeline, and encrypt data in transit and at rest. Access is given by role and logged. I also follow the retention rules and privacy laws that apply.
2. **How do you plan a data platform that can grow with the business?**
   I start from the main use cases, data volumes and how fresh the data must be, then choose simple, proven tools. Pipelines are built from shared templates with testing, monitoring and documentation included. I avoid custom solutions where a standard one works. I review costs and performance regularly and change the design when the needs change.

# Parent: AI and Machine Learning

## AI and Machine Learning

- id: `aiml`
- Role label: AI Engineer
- Profile role (setupRole): AI/ML
- Suggested skills: Python, Machine learning, Deep learning, TensorFlow, PyTorch, Statistics, Data preprocessing, Model evaluation, Git, Math
- Search keywords: artificial intelligence, ai engineer, deep learning, neural network

### Role questions (Junior and Senior answers)

1. **What is the difference between AI, machine learning and deep learning?**
   Artificial intelligence is the broad goal of making computers do tasks that normally need human thinking. Machine learning is a part of AI where systems learn patterns from data instead of following fixed rules. Deep learning is a part of machine learning that uses neural networks with many layers, and it works well for images, speech and text. It usually needs more data and computing power.
2. **How does a neural network learn?**
   A neural network has layers of connected units with weights. During training it makes a prediction, a loss function measures the error, and backpropagation calculates how much each weight added to that error. An optimizer, such as gradient descent, then adjusts the weights a little. This repeats over many examples until the error on validation data stops improving.
3. **Why do we split data into training, validation and test sets?**
   The training set is used to learn the weights of the model. The validation set is used to tune settings and to choose between models. The test set is kept aside until the end to give an honest estimate of performance on new data. If I use the test set for decisions, its score becomes too optimistic.
4. **What is transfer learning?**
   Transfer learning means starting from a model that was already trained on a large dataset and adapting it to a new task. For example, an image model trained on millions of photos can be fine-tuned to recognise plant diseases from a few thousand leaf photos. It saves time, data and computing cost. I still check that the original training data fits my use case.
5. **What limits of AI systems should you explain to a business?**
   AI learns from past data, so it can repeat the errors and bias in that data. It can be confidently wrong and often cannot explain its own decisions well. Its performance can drop when real-world data changes. So I set clear expectations, keep a human check for important decisions and measure the results regularly.
6. **What is an activation function, and why is it needed?**
   An activation function is applied to the output of each unit in a neural network. It adds non-linearity, so the network can learn complex patterns; without it, many layers would act like one linear model. Common choices are ReLU in hidden layers, sigmoid for a yes or no output and softmax for choosing one class out of many.
7. **Which math do you use most in machine learning?**
   Linear algebra, because data and model weights are stored as vectors and matrices. Calculus, mainly derivatives, because training uses gradients to reduce the error. Probability and statistics, to understand uncertainty and to evaluate results. Libraries do the calculations, but understanding the math helps me debug models.

### Fresher answers (first 3 role questions)

1. **What is the difference between AI, machine learning and deep learning?**
   AI is the broad idea of computers doing smart tasks. Machine learning is AI that learns from data, and deep learning is machine learning with neural networks of many layers.
2. **How does a neural network learn?**
   The network makes a prediction and measures its error. Then it adjusts its weights a little to reduce the error, and repeats this many times.
3. **Why do we split data into training, validation and test sets?**
   The training set teaches the model, the validation set helps me choose settings and the test set gives an honest final score on new data.

### Junior extra questions

1. **How do you start a small machine learning project in Python?**
   I set up a clean project with a virtual environment and Git. I load and explore the data with Pandas, then build a baseline with scikit-learn or a small neural network in PyTorch or TensorFlow. I record the data version, settings and results of each experiment. I write down what worked and what did not, so the work can be repeated.
2. **How do you choose a learning rate when training a neural network?**
   The learning rate controls how big each weight update is. If it is too high, the loss jumps around or grows; if it is too low, training is very slow. I start with a common default for the optimizer, watch the training and validation loss curves and try a few values. A schedule that lowers the rate over time often helps.

### Senior extra questions

1. **How do you decide whether an AI feature is ready to launch?**
   I check that it meets the agreed quality metric on a realistic test set, including hard and rare cases. I review risks such as bias, privacy, security and what happens when the model is wrong. There must be monitoring, a fallback and a clear way for users to report problems. I prefer a limited rollout first, then a wider launch based on the results.
2. **How do you build a team process for responsible AI?**
   I set simple rules that everyone follows: document the data sources, the intended use and the known limits of each model. Every project gets a review for privacy, fairness and safety before launch, with people from outside the team. Each model has a clear owner and is monitored after launch. The rules stay practical, so teams actually use them.

## Machine Learning Engineer

- id: `mleng`
- Role label: Machine Learning Engineer
- Profile role (setupRole): Machine Learning Engineer
- Suggested skills: Python, scikit-learn, PyTorch, TensorFlow, Model deployment, MLOps, Feature engineering, Docker, APIs, Model monitoring
- Search keywords: ml engineer, mlops, model deployment, model serving

### Role questions (Junior and Senior answers)

1. **What is MLOps?**
   MLOps applies DevOps practices to machine learning. It covers versioning of data, code and models, automated training and testing pipelines, deployment and monitoring in production. The goal is to release and update models reliably instead of by hand. It also shows which data and code produced each model.
2. **What is the difference between batch and real-time model serving?**
   In batch serving, the model scores many records on a schedule, for example every night, and saves the predictions for later use. In real-time serving, the model runs behind an API and answers each request within milliseconds. Batch is simpler and cheaper; real-time is needed when the prediction depends on fresh input, such as a fraud check during a payment.
3. **How do you package a model for deployment?**
   I save the trained model together with its preprocessing steps, so the same transformations run in production. I put it behind a small API, pin the exact library versions and build a Docker image. I add a health check and tests that compare predictions with known examples. The image is versioned, so I can roll back quickly.
4. **What is data drift, and how do you detect it?**
   Data drift means the input data in production changes compared with the training data, for example customers start using a new payment method. Concept drift means the link between the inputs and the outcome changes. I compare feature distributions over time and track model metrics when the true labels arrive. Alerts tell me when to investigate or retrain.
5. **What is a feature store?**
   A feature store is a central place to define, store and share features for machine learning. It serves the same feature values for training and for live predictions, which avoids training-serving skew. Teams can reuse features instead of rebuilding them, and it records how each feature was made.
6. **How do you track experiments and model versions?**
   I log every training run with its code version, data version, parameters and metrics in an experiment tracking tool. The best models go into a model registry with a version number and a stage, such as staging or production. This makes results repeatable and shows exactly which model is live.
7. **How do you test machine learning code?**
   I write unit tests for the data processing and feature code, like for any other software. I add data validation tests for the schema and value ranges. For the model, I check that it beats a baseline, gives stable results on fixed examples and handles bad input safely. These tests run in the CI pipeline before any model is deployed.

### Fresher answers (first 3 role questions)

1. **What is MLOps?**
   MLOps uses DevOps ideas for machine learning. It means versioning data and models, automating training and deployment and monitoring models in production.
2. **What is the difference between batch and real-time model serving?**
   Batch serving makes many predictions on a schedule, like every night. Real-time serving answers each request through an API within a very short time.
3. **How do you package a model for deployment?**
   I save the model with its preprocessing steps, put it behind a small API and build a Docker image with fixed library versions.

### Junior extra questions

1. **How do you roll out a new model version safely?**
   I first run it in shadow mode, where it gets real traffic but its predictions are only logged and compared with the current model. Then I send a small share of traffic to it and watch the metrics. If it performs well, I increase the traffic step by step. I keep the old version ready for a quick rollback.
2. **How do you reduce the latency of a model API?**
   I first measure where the time goes: preprocessing, the model itself or the network. Then I can use a smaller or optimized model, batch requests, cache frequent results and keep the model loaded in memory. Hardware such as GPUs helps for large models. I set a latency target and test it under realistic load.

### Senior extra questions

1. **How do you design a pipeline that retrains models automatically?**
   Retraining starts on a schedule or when monitoring shows drift or lower accuracy. The pipeline validates the new data, trains the model and compares it with the current model on the same test set, including fairness checks. Only a model that passes is registered, and a person approves important releases. Every step is logged, so any model can be traced back to its data.
2. **How do you control the cost of running machine learning in production?**
   I right-size the hardware and use autoscaling, so we do not pay for idle machines. I choose batch predictions when real-time is not needed, and smaller models when the accuracy difference is small. I track the cost per prediction and per training run, and review the biggest costs with the team every month.

## Generative AI Engineer

- id: `genai`
- Role label: Generative AI Engineer
- Profile role (setupRole): Generative AI
- Suggested skills: LLMs, Prompt engineering, RAG, Vector databases, Python, APIs, Fine-tuning, Evaluation, Responsible AI
- Search keywords: llm, large language model, rag, prompt engineering, chatbot, gen ai

### Role questions (Junior and Senior answers)

1. **What is a large language model, and how does it generate text?**
   A large language model is a neural network trained on a very large amount of text to predict the next token, which is a word or part of a word. When it generates text, it predicts one token at a time, based on the prompt and what it has written so far. This makes it good at language tasks, but it does not check facts by itself, so it can write text that sounds right but is wrong.
2. **What is hallucination in generative AI, and how do you reduce it?**
   Hallucination is when a model gives an answer that sounds confident but is false or made up. I reduce it by giving the model trusted source material, asking it to answer only from that material and to say when it does not know. I ask it to cite its sources, lower the randomness for factual tasks and test with real questions. For important uses, a person still checks the output.
3. **What is retrieval-augmented generation, or RAG?**
   RAG means the system first searches a knowledge source, such as company documents, for the passages most relevant to the question. Those passages are added to the prompt, and the model writes its answer based on them. This keeps answers current and grounded in our own data without retraining the model. The quality depends a lot on how well the search step finds the right passages.
4. **What makes a good prompt?**
   A good prompt gives clear instructions, the context the model needs and the format I want back. Examples of good answers help a lot. I break complex tasks into smaller steps and say what to do when information is missing. I test prompts on a set of real cases and keep them in version control, like code.
5. **What is a vector database, and why is it used with LLMs?**
   A vector database stores embeddings, which are lists of numbers that capture the meaning of text or images. It can quickly find the stored items closest in meaning to a query, even when the exact words differ. In a RAG system it holds the document chunks, so the most relevant ones can be added to the prompt.
6. **When would you fine-tune a model instead of using prompting or RAG?**
   I start with prompting, and add RAG when the model needs our own or changing information. I consider fine-tuning when I need a consistent style or format, or a narrow task done better or by a smaller, cheaper model, and I have enough good examples. Fine-tuning is not a good way to add facts that change often. I compare the options on the same evaluation set before deciding.
7. **How do you evaluate a generative AI application?**
   I build a test set of real questions with expected answers or clear grading rules. I measure correctness, faithfulness to the sources, safety and format, with automatic checks and human review. A model can help grade answers, but people spot-check its grades. I run the evaluation after every change to prompts, data or models, and I collect user feedback in production.

### Fresher answers (first 3 role questions)

1. **What is a large language model, and how does it generate text?**
   A large language model is trained on a lot of text to predict the next word or part of a word. It writes one piece at a time, so it can sound right even when it is wrong.
2. **What is hallucination in generative AI, and how do you reduce it?**
   Hallucination means the model makes up an answer that sounds true. I reduce it by giving trusted sources, asking it to use only those and checking important answers.
3. **What is retrieval-augmented generation, or RAG?**
   RAG first searches documents for the most relevant parts, then gives them to the model with the question. The answer is then based on our own, current data.

### Junior extra questions

1. **How do you split documents into chunks for a RAG system?**
   I split documents into chunks that are small enough to be specific but large enough to keep their meaning, often by headings or paragraphs. I add a small overlap between chunks, so sentences at the edges are not lost. I store metadata such as the title and date with each chunk. Then I test retrieval with real questions and adjust the chunk size.
2. **What is prompt injection, and how do you protect against it?**
   Prompt injection is when text from a user or a document tries to override the instructions of the system, for example to reveal private data. I treat all outside text as untrusted data, give the model access only to the tools and data the task needs and check outputs before acting on them. Sensitive actions need a confirmation step. I also test the system with known attack examples.

### Senior extra questions

1. **How do you apply responsible AI practices to a generative AI product?**
   I define what the product should and should not do, and test it for harmful, biased or private content before launch. I add input and output filters, a clear label that content is AI-generated and an easy way to report problems. Personal data is protected and not used for training without permission. We review incidents and update the safeguards regularly.
2. **How do you control the cost and speed of an LLM application?**
   I first measure tokens, latency and cost per request. I keep prompts short, send only the most relevant context and cache repeated answers. Simple tasks go to a smaller, cheaper model, and a larger model is used only when needed. I set usage limits and track the cost on a dashboard.

## Computer Vision Engineer

- id: `cv`
- Role label: Computer Vision Engineer
- Profile role (setupRole): Computer Vision
- Suggested skills: Python, OpenCV, PyTorch, CNN, Image processing, Object detection, Segmentation, Data augmentation, Annotation
- Search keywords: computer vision, opencv, image processing, object detection, image recognition

### Role questions (Junior and Senior answers)

1. **What is a convolutional neural network?**
   A convolutional neural network, or CNN, is a neural network designed for images. Convolution layers slide small filters over the image to detect patterns such as edges, then shapes and then whole objects in deeper layers. Pooling layers reduce the size, and the final layers make the prediction. Because the filters are shared across the image, a CNN needs far fewer weights than a fully connected network.
2. **What is the difference between image classification, object detection and segmentation?**
   Image classification gives one label for the whole image, such as cat. Object detection finds each object and draws a box around it with a label. Segmentation labels every pixel, so it shows the exact shape of each object or region. The right choice depends on how much detail the task needs.
3. **How do you use OpenCV in a project?**
   I use OpenCV to read images and video, resize them, change colour spaces, blur them and detect edges. It is also useful for drawing boxes and labels on the results. OpenCV loads colour images in BGR order by default, so I convert them to RGB before passing them to most deep learning models.
4. **What is data augmentation, and why is it used?**
   Data augmentation creates new training images by changing existing ones, for example by flipping, rotating, cropping or changing the brightness. It helps the model handle real-world variation and reduces overfitting when data is limited. I only use changes that make sense for the task; flipping images of text, for example, creates wrong examples. For detection, the boxes must change together with the image.
5. **How do you measure the accuracy of an object detection model?**
   I use intersection over union, or IoU, to measure how much a predicted box overlaps the true box. A prediction counts as correct if the IoU is above a threshold, such as 0.5. From that I calculate precision, recall and the mean average precision, or mAP, across classes. I also look at the results per class and per condition, such as low light.
6. **How do you plan image annotation for a new project?**
   I write clear labelling rules with examples of hard cases, such as objects that are partly hidden. I run a small pilot, check how well the annotators agree and update the rules. Then I review a sample of every batch for quality. Good, consistent labels matter more than a large number of messy ones.
7. **What challenges do computer vision models face in the real world?**
   Real images vary in lighting, angle, blur, background and camera quality, and the training data may not cover all of this. Objects can be small, partly hidden or rare. Models can also be biased if some groups or conditions are missing from the data. I test on images from the real environment and collect new examples where the model fails.

### Fresher answers (first 3 role questions)

1. **What is a convolutional neural network?**
   A CNN is a neural network for images. Its filters find simple patterns like edges first, then shapes and whole objects in deeper layers.
2. **What is the difference between image classification, object detection and segmentation?**
   Classification gives one label for the whole image. Detection draws a box around each object, and segmentation labels every pixel.
3. **How do you use OpenCV in a project?**
   I use OpenCV to read, resize and filter images and video, and to draw the results. It loads colours in BGR order, so I convert them to RGB when needed.

### Junior extra questions

1. **How would you build a model to detect defects in product photos?**
   I collect photos from the real production line, with many defect types and good products, and label them with clear rules. I start from a pretrained model and fine-tune it, because defect images are usually limited. Since defects are rare, I focus on recall and use augmentation for the defect class. I test it on the line with a person checking the results before full use.
2. **How do you run a vision model on a mobile or edge device?**
   I choose a small, efficient model and reduce its size with quantization, which stores the weights with fewer bits. I convert it to a format the device supports and measure speed, memory and battery use on the real device. I check that the accuracy is still acceptable after these changes. Running on the device also keeps images private and works offline.

### Senior extra questions

1. **How do you handle privacy when a vision system uses images of people?**
   I collect only the images the use case needs, with proper consent or a clear legal basis. I blur faces or number plates when identity is not needed and process data on the device where possible. Images are stored encrypted, with limited access and a set retention time. Face recognition needs extra care, so I check the law and the bias risks before using it.
2. **How do you improve a vision model that performs poorly on some images?**
   I group the errors by condition, such as lighting, camera, object size or class, to find patterns. Then I collect and label more examples of the weak cases, fix label mistakes and add targeted augmentation. I retrain and compare on a fixed test set that includes those hard cases. I track results per group, not only the overall score.

## NLP Engineer

- id: `nlp`
- Role label: NLP Engineer
- Profile role (setupRole): NLP
- Suggested skills: Python, spaCy, Transformers, Tokenization, Text classification, Embeddings, Sentiment analysis, Named entity recognition, Evaluation
- Search keywords: natural language processing, text analytics, transformers, spacy, sentiment

### Role questions (Junior and Senior answers)

1. **What is tokenization in NLP?**
   Tokenization splits text into smaller units called tokens, such as words, parts of words or characters. Modern models often use subword tokenization, so a rare word is split into a few known pieces instead of being unknown. The model works with the IDs of these tokens, not with the raw text. The tokenizer affects model size, speed and how well new words are handled.
2. **What are word embeddings?**
   Word embeddings represent words as lists of numbers, so words with similar meanings get similar vectors. For example, doctor and nurse end up closer to each other than doctor and table. Older methods gave each word one fixed vector, while transformer models create contextual embeddings, so bank by a river and bank for money get different vectors.
3. **What is a transformer model?**
   A transformer is a neural network design built around attention. Attention lets each token look at all the other tokens in the text and decide which ones matter most for its meaning. Unlike older recurrent networks, a transformer processes the tokens in parallel, so it trains faster on large data. Most modern language models are based on transformers.
4. **How do you build a text classification model?**
   I collect labelled examples for each class, such as complaint, question or praise. I start with a simple baseline, such as TF-IDF features with logistic regression. If I need better accuracy, I fine-tune a pretrained transformer. I evaluate with precision, recall and F1 for each class and study the wrong predictions.
5. **What is named entity recognition?**
   Named entity recognition, or NER, finds names in text and labels their type, such as person, organisation, location, date or amount. For example, it can pull the company name and the total out of an invoice. Libraries like spaCy have ready models, and I fine-tune them on my own labelled data when the field uses special terms.
6. **How does sentiment analysis work, and what are its limits?**
   Sentiment analysis classifies text as positive, negative or neutral, with a trained model or a word list. It is useful for reading many reviews or support messages. However, it struggles with sarcasm, mixed opinions, slang and field-specific words, such as sick meaning good. So I test it on real data from our field and report its error rate.
7. **How do you handle text that mixes languages, such as English and Roman Urdu?**
   First I detect the languages and check how much of the text is mixed. Many standard models are trained mostly on English, so they may do poorly on Roman Urdu with its many spellings. I collect and label real examples, normalise common spelling variants and test multilingual models. I measure accuracy separately for each language group.

### Fresher answers (first 3 role questions)

1. **What is tokenization in NLP?**
   Tokenization splits text into small pieces called tokens, such as words or parts of words. The model works with these tokens instead of raw text.
2. **What are word embeddings?**
   Embeddings turn words into lists of numbers. Words with similar meanings get similar numbers, so the model can work with meaning.
3. **What is a transformer model?**
   A transformer uses attention, so each word can look at the other words to understand its meaning. Most modern language models are built on it.

### Junior extra questions

1. **Which text preprocessing steps do you use, and when do you skip them?**
   For classic models I may lowercase the text and remove extra spaces, links and repeated symbols. For transformer models I keep most of the text as it is, because their tokenizer and context handle case and small words. I never remove words like not, which change the meaning. I check a sample of the text after each step.
2. **How do you work with a small labelled text dataset?**
   I start from a pretrained model, because it already understands language and needs fewer labelled examples. I label more data where the model is unsure, which gives the most value per label. I can also add careful paraphrases and check that their labels stay correct. Clear labelling rules keep the small dataset consistent.

### Senior extra questions

1. **How would you design a system that routes customer messages automatically?**
   I define the categories with the support team and label a set of real messages. I train a classifier, and messages with low confidence go to a person instead of being routed automatically. Urgent cases, such as a fraud complaint, get extra rules. I monitor accuracy every week and retrain as new topics appear.
2. **How do you handle new words, product names and slang in an NLP system?**
   I watch for phrases the system has not seen before and for drops in model confidence. I add new examples to the training data regularly and update entity lists for new product names. Subword tokenizers help, but the model still needs labelled examples to learn the meaning. I review errors with the business team to find new terms early.

# Parent: Database

## Database

- id: `dbgen`
- Role label: Database Engineer
- Profile role (setupRole): Database Engineer
- Suggested skills: SQL, Normalization, Indexing, Transactions, Joins, Backup and recovery, Query optimization, Data modeling, ER diagrams, Constraints
- Search keywords: database engineer, dbms, er diagram, normal form, relational database

### Role questions (Junior and Senior answers)

1. **What is a database management system, and why use one instead of files?**
   A database management system, or DBMS, is software that stores, organises and protects data and lets many users work with it at the same time. Compared with plain files, it prevents duplicate and inconsistent data, controls who can see what and supports backup and recovery. It also lets us query the data quickly with a language such as SQL.
2. **What are candidate, composite and surrogate keys?**
   A candidate key is any column, or set of columns, that can uniquely identify a row; one of them is chosen as the primary key. A composite key uses two or more columns together, such as student ID and course ID in an enrolment table. A surrogate key is an artificial value, such as an auto-generated number, with no business meaning. I often use a surrogate key as the primary key and keep a unique constraint on the natural key.
3. **What is the difference between the first, second and third normal forms?**
   First normal form means each column holds a single value and there are no repeating groups. Second normal form also requires every non-key column to depend on the whole primary key, not on part of a composite key. Third normal form also removes columns that depend on other non-key columns, such as a city name that depends on a postcode in the same table.
4. **What are database constraints, and why are they important?**
   Constraints are rules the database enforces on the data. NOT NULL makes a value required, UNIQUE stops duplicates, CHECK limits values to a valid range, and PRIMARY KEY and FOREIGN KEY keep rows identifiable and correctly linked. They protect data quality even when application code has a bug, because the database itself rejects bad data.
5. **What is the difference between a clustered and a non-clustered index?**
   A clustered index decides the order in which the table rows are stored, so a table can have only one. A non-clustered index is a separate structure that holds the indexed columns and a pointer to the full row, and a table can have many. I usually put the clustered index on a narrow, increasing key, such as an ID. The details differ between database systems.
6. **What is an ER diagram?**
   An entity-relationship diagram shows the main things a system stores, such as customers, orders and products, with their attributes and how they relate. It shows whether a relationship is one to one, one to many or many to many. I use it to agree on the design with the team before creating tables. It also documents the database for new team members.
7. **How do you store a many-to-many relationship in a relational database?**
   I create a third table, often called a junction table, that holds the primary keys of both tables as foreign keys. For example, a student can join many courses and a course has many students, so an enrolments table stores pairs of student ID and course ID. The two columns together form the primary key. Extra details, such as the enrolment date, can go in that table too.

### Fresher answers (first 3 role questions)

1. **What is a database management system, and why use one instead of files?**
   A DBMS is software that stores and manages data safely. Unlike plain files, it stops duplicate data, controls access, supports backups and lets many people use the data at once.
2. **What are candidate, composite and surrogate keys?**
   A candidate key can uniquely identify a row. A composite key uses two or more columns together, and a surrogate key is an auto-generated number with no business meaning.
3. **What is the difference between the first, second and third normal forms?**
   First normal form means one value per column. Second normal form removes data that depends on only part of the key, and third normal form removes data that depends on other non-key columns.

### Junior extra questions

1. **What is a deadlock, and how can it be avoided?**
   A deadlock happens when two transactions each hold a lock that the other one needs, so neither can continue. The database detects it and cancels one of them, which must then retry. I reduce deadlocks by keeping transactions short, accessing tables in the same order everywhere and using good indexes so fewer rows are locked. The application should also retry safely after a deadlock error.
2. **What is the difference between full, differential and incremental backups?**
   A full backup copies the whole database. A differential backup copies everything that changed since the last full backup, and an incremental backup copies only what changed since the last backup of any type. Incremental backups are the smallest, but a restore needs the full backup plus every incremental in order. A differential restore needs only the full backup and the latest differential.

### Senior extra questions

1. **When would you denormalize a database design?**
   I denormalize only when a measured performance problem cannot be solved with indexes or better queries, usually for read-heavy reporting. For example, I may store an order total on the order row instead of adding up the items every time. The cost is extra storage and the risk of copies getting out of sync, so I keep them updated through clear logic and check them regularly.
2. **What are transaction isolation levels?**
   Isolation levels control how much one transaction can see of other transactions that are still running. The standard levels, from least to most strict, are read uncommitted, read committed, repeatable read and serializable. Stricter levels prevent problems such as dirty reads and phantom rows, but they can reduce concurrency. Many databases use read committed as the default.

## Database Administrator

- id: `dba`
- Role label: Database Administrator
- Profile role (setupRole): Database Administrator
- Suggested skills: Backup and recovery, Performance tuning, Replication, High availability, Security, Monitoring, Indexing, Patching, User management, SQL
- Search keywords: dba, database administration, replication, high availability, performance tuning

### Role questions (Junior and Senior answers)

1. **What are the main daily tasks of a database administrator?**
   I check that backups completed and that the databases are healthy and available. I monitor performance, storage growth, errors and failed jobs, and respond to alerts. I manage user access, apply patches in planned windows and help developers with slow queries. I also keep documentation and runbooks up to date.
2. **How do you plan backup and recovery using RPO and RTO?**
   The recovery point objective, or RPO, is how much data the business can afford to lose, and the recovery time objective, or RTO, is how quickly the database must be back. I agree on both with the business, then choose backup types and frequency to meet them, for example frequent log backups for a small RPO. I keep copies off site and test restores regularly to prove we can meet the RTO.
3. **What is database replication?**
   Replication copies data from one database server, the primary, to one or more replicas. It can be synchronous, where a change is confirmed only after a replica has it, or asynchronous, which is faster but can lose the last few changes in a failure. Replicas are used for availability, for read-only reporting and for disaster recovery in another location. I monitor the replication lag closely.
4. **How do you find and fix a performance problem on a database server?**
   I check the server first: CPU, memory, disk and wait statistics, to see what the database is waiting on. Then I find the top queries by time and resources and check their plans for missing indexes or full scans. Other common causes are blocking, outdated statistics and wrong memory settings. I change one thing at a time and measure the effect.
5. **How do you manage database users and permissions securely?**
   I follow least privilege: users and applications get only the permissions their work needs, given through roles. Each application has its own account, not a shared admin account, and passwords are kept in a secrets manager. I remove access quickly when people leave and review permissions regularly. Admin activity and failed logins are logged and monitored.
6. **How do you apply patches and upgrades to a production database?**
   I read the release notes and test the patch on a non-production copy first. I take a full backup and agree on a maintenance window and a rollback plan. With a standby server, I patch the standby first, fail over and then patch the old primary, which keeps downtime short. Afterwards I check the logs, jobs and application connections.
7. **What is the difference between high availability and disaster recovery?**
   High availability keeps the database running through local failures, such as a server crash, usually with automatic failover to a standby nearby. Disaster recovery restores service after a bigger event, such as losing a whole data centre, using copies in another location. High availability aims for seconds or minutes of downtime, while a disaster recovery plan can accept a longer recovery. A good setup needs both.

### Fresher answers (first 3 role questions)

1. **What are the main daily tasks of a database administrator?**
   A DBA keeps databases safe, fast and available. I check backups, monitor performance and storage, manage user access and apply updates.
2. **How do you plan backup and recovery using RPO and RTO?**
   RPO is how much data we can afford to lose, and RTO is how fast the database must be back. I choose the backup schedule to meet both and test restores.
3. **What is database replication?**
   Replication copies data from the main database server to other servers. The copies help if the main server fails and can also be used for reports.

### Junior extra questions

1. **A database is running out of disk space. What do you do?**
   I first check what is using the space: data files, log files, backups or temporary files. A common cause is a transaction log that cannot be cleared because log backups are failing or a long transaction is still open, so I fix that cause. I add space if needed, and archive old data only with the owner's approval and a backup. Then I set alerts at a safe level so it does not become urgent again.
2. **How do you restore a database to a point in time?**
   I restore the last full backup without bringing the database online, then the latest differential if there is one, then the log backups in order up to the needed time. I restore to a separate server or under a new name first, so the current database is not overwritten. I check the data with the owner before switching over. This only works if log backups are taken regularly.

### Senior extra questions

1. **How do you plan the capacity of a database server?**
   I collect trends for data growth, CPU, memory, storage speed and connections over several months. I combine them with business plans, such as a new product launch, to estimate the next one to two years. I add a safety margin and plan upgrades or scaling before the limits are reached. I review the forecast every quarter.
2. **How do you migrate a large database to a new server with little downtime?**
   I set up the new server, restore a full backup there and keep it in sync with replication or log shipping. I test the application against the new server and rehearse the switch. At cut-over I stop writes briefly, let the last changes sync, point the application to the new server and check it. The old server stays available for a quick rollback.

## Data Warehouse / ETL

- id: `etl`
- Role label: ETL Developer
- Profile role (setupRole): ETL Developer
- Suggested skills: ETL, SQL, Data warehouse, Star schema, dbt, Airflow, Data quality, Incremental load, Scheduling
- Search keywords: etl, data warehouse, dbt, star schema, data integration

### Role questions (Junior and Senior answers)

1. **What is the difference between OLTP and OLAP systems?**
   OLTP systems run daily operations, such as taking orders, with many small, fast reads and writes on current data. OLAP systems are built for analysis, with large queries that summarise a lot of historical data. Data is usually copied from the OLTP sources into an OLAP data warehouse, so heavy reports do not slow down the business systems.
2. **What is a slowly changing dimension?**
   A slowly changing dimension holds attributes that change from time to time, such as the city of a customer. In Type 1, I overwrite the old value, so the history is lost. In Type 2, I add a new row with start and end dates and a current flag, so reports can show the value that was true at each point in time. I choose the type per column, based on whether the business needs the history.
3. **What is a staging area in a data warehouse?**
   A staging area is where raw data from the sources lands first, before it is cleaned and loaded into the warehouse tables. It lets me check and transform the data without touching the source systems or the final tables. If a load fails, I can rerun it from staging. Staging data is cleared or archived based on agreed retention rules.
4. **What is the grain of a fact table?**
   The grain is what one row in the fact table represents, for example one product line on one sales receipt. I decide the grain before anything else, because it sets which dimensions and measures fit. Mixing grains in one table leads to double counting. When in doubt, I choose the most detailed grain the source supports, since it can always be summarised later.
5. **What is the difference between a full load and an incremental load?**
   A full load copies all the data from the source every time, which is simple but slow for big tables. An incremental load copies only new or changed rows since the last run, often by using a last-updated date or an increasing ID. Incremental loads are faster but need care with updates, deletes and late records. I often run a full load the first time and incremental loads after that.
6. **How do you use dbt in a data warehouse?**
   dbt lets me write transformations as SQL select statements, called models, that build tables and views inside the warehouse. It works out the order between models, and I add tests for missing values, unique keys and valid links between tables. It also creates documentation and lineage. All the code lives in Git, so every change goes through review.
7. **How do you handle records that fail validation during a load?**
   I do not let one bad record stop the whole load unless it is critical. Rows that fail checks, such as a missing customer code or an invalid date, go to an error table with the reason. I report them to the source owner and load them once they are fixed. I track the error count over time, and a sudden rise triggers an alert.

### Fresher answers (first 3 role questions)

1. **What is the difference between OLTP and OLAP systems?**
   OLTP systems handle daily work like orders with many small, fast changes. OLAP systems are for analysis and summarise large amounts of historical data.
2. **What is a slowly changing dimension?**
   A slowly changing dimension stores data that changes sometimes, like the city of a customer. Type 1 overwrites the old value, and Type 2 adds a new row to keep the history.
3. **What is a staging area in a data warehouse?**
   A staging area is where raw source data lands first. I check and clean it there before loading it into the warehouse tables.

### Junior extra questions

1. **How do you test an ETL job before it goes to production?**
   I compare row counts and totals between the source and the target. I test edge cases such as empty values, duplicates, late records and special characters. I check that running the job twice gives the same result. Business users review a sample of the output before release.
2. **How do you load a fact table so it links to the right dimension rows?**
   I load the dimensions first, so every key exists. When I load the facts, I look up each business key, such as a customer code, in the dimension and store its surrogate key. For Type 2 dimensions, I pick the row that was valid on the transaction date. If no match is found, I link the fact to an unknown member row and report it, instead of dropping the fact.

### Senior extra questions

1. **How do you design the layers of a data warehouse?**
   I usually use three layers. The raw layer keeps the source data unchanged, the cleaned layer standardises and joins it, and the presentation layer holds business-ready facts and dimensions for reports. Each layer has clear rules, owners and tests. This makes problems easier to trace and lets me rebuild later layers without going back to the sources.
2. **How do you make a nightly load finish within its time window as data grows?**
   I measure each step to find the slowest ones. I switch large tables to incremental loads, run independent jobs in parallel and push heavy transformations into the warehouse engine. I review indexes or partitions on the target tables. If the window is still too short, I agree with the business which data must be ready first.

## NoSQL / MongoDB

- id: `nosql`
- Role label: NoSQL Developer
- Profile role (setupRole): NoSQL Developer
- Suggested skills: MongoDB, Document model, Indexing, Aggregation, Replication, Sharding, Redis, Schema design
- Search keywords: nosql, mongodb, mongo, redis, document database

### Role questions (Junior and Senior answers)

1. **What are the main types of NoSQL databases?**
   Document databases, such as MongoDB, store JSON-like documents. Key-value stores, such as Redis, store a value under a unique key and are very fast. Wide-column stores handle huge tables spread over many servers, and graph databases store nodes and the relationships between them. I choose the type based on how the application reads and writes its data.
2. **How is data stored in MongoDB?**
   MongoDB stores data as documents in BSON, a binary form of JSON, and groups the documents into collections. Each document has a unique _id field and can contain nested objects and arrays. Documents in one collection do not need the same fields, but in practice I keep a consistent structure and can add schema validation rules.
3. **When do you embed data and when do you reference it in MongoDB?**
   I embed data that is read together with its parent and does not grow without limit, such as the addresses of a customer. I use a reference, by storing the ID of another document, when the data is shared, changes often or can grow very large, such as all the orders of a customer. A single document has a 16 MB size limit, which is another reason not to embed lists that keep growing.
4. **What is the aggregation pipeline in MongoDB?**
   The aggregation pipeline processes documents through a series of stages. Common stages are $match to filter, $group to summarise, $sort to order, $project to shape the output and $lookup to join another collection. I put $match early, so less data flows through the later stages and an index can be used.
5. **How do indexes work in MongoDB?**
   Without an index, MongoDB must scan every document in a collection to find matches. I create indexes on the fields used in filters and sorts, including compound indexes on several fields, where the field order matters. I use the explain output to confirm that a query uses the index. Too many indexes slow down writes and use memory.
6. **What is Redis, and what is it commonly used for?**
   Redis is an in-memory key-value store, so reads and writes are very fast. It is commonly used as a cache in front of a slower database, and for user sessions, counters, rate limits, leaderboards and simple queues. Keys can expire automatically after a set time. Because the data lives in memory, I plan memory limits and persistence settings carefully.
7. **What is sharding?**
   Sharding splits a large dataset across several servers, called shards, so each one holds part of the data. A shard key decides where each document goes. A good shard key spreads writes evenly and supports the common queries; a poor one, such as an always increasing date, can send all new writes to one shard. Sharding adds complexity, so I use it only when one server or replica set is not enough.

### Fresher answers (first 3 role questions)

1. **What are the main types of NoSQL databases?**
   The main types are document databases like MongoDB, key-value stores like Redis, wide-column stores and graph databases. Each one fits a different way of using data.
2. **How is data stored in MongoDB?**
   MongoDB stores data as JSON-like documents inside collections. Each document has an _id and can hold nested objects and arrays.
3. **When do you embed data and when do you reference it in MongoDB?**
   I embed data that is always read together, like the addresses of a customer. I reference data that is shared or can grow very large, like all the orders of a customer.

### Junior extra questions

1. **What is a replica set in MongoDB?**
   A replica set is a group of MongoDB servers that hold the same data. One primary receives all writes, and the secondaries copy its changes. If the primary fails, the members elect a new primary automatically, which keeps the database available. Reads can go to secondaries when slightly older data is acceptable.
2. **How do you use Redis as a cache without serving stale data?**
   I use the cache-aside pattern: the app reads from Redis first, and on a miss it reads the database and stores the result with an expiry time. When the data changes, I delete or update the cached key. I choose expiry times based on how fresh each type of data must be. The app must still work, only slower, if Redis is down.

### Senior extra questions

1. **How do access patterns shape your NoSQL data model?**
   In NoSQL I design for how the application reads and writes data, not only for the entities. I list the main queries, how often they run and the data they need, then shape documents so most queries read one document or use one index. I may copy some data to avoid joins, and I plan how to keep the copies in sync. I test the design with realistic data volumes.
2. **How do you handle transactions and consistency in MongoDB?**
   A write to a single document in MongoDB is atomic, so I design documents to keep related changes together where possible. When a change must cover several documents, I use multi-document transactions, which work on replica sets and sharded clusters but cost performance. I also choose the write and read concern, for example a majority write concern for important data. This balances safety and speed.

# Overlap check

No question text is repeated in any two categories (checked by `tests/practice/categories.test.mjs`). These questions share a topic with another category but ask a different thing:

| New question | Related existing question | Why both stay |
| --- | --- | --- |
| Database: first, second and third normal forms | SQL Developer: What is normalization? | SQL asks what and why; Database asks the three forms |
| Database: clustered and non-clustered index | SQL Developer: What is an index? | Index basics vs the two index types |
| Database: transaction isolation levels | SQL Developer: transaction and ACID | ACID vs isolation levels |
| Database: full, differential and incremental backups | Database Administrator: RPO and RTO, point-in-time restore; Cloud Administrator: backups | Backup types vs recovery planning and cloud tools |
| Database Administrator: replication | NoSQL / MongoDB: replica set | General replication vs the MongoDB feature |
| Data Engineer: change data capture | Data Warehouse / ETL: full and incremental load | A technique vs the two load types |
| Data Engineer: what is a data pipeline | Data and Analytics (Senior): design a reliable data pipeline | Basics vs design |
| Machine Learning Engineer: package a model, roll out a new version | Data and Analytics (Junior): notebook to production | Packaging and release steps vs the overall path |
| Data Scientist: imbalanced dataset | Data and Analytics: classification metrics | Fixing imbalance vs choosing metrics |
| Data Scientist: check a model for bias; AI and Machine Learning: responsible AI process; Generative AI: responsible AI practices | Data and Analytics: use AI tools responsibly | Model testing, team process, product safeguards and personal use |
| BI Developer: star schema | Data Warehouse / ETL: grain of a fact table, load a fact table | Reporting model vs warehouse loading |
| NoSQL / MongoDB: main types of NoSQL databases | Software Developer: SQL vs NoSQL | Types inside NoSQL vs the comparison |
| Machine Learning Engineer and Generative AI: control cost | Cloud Data Engineer / AI: cost of warehouse queries | Different systems |
