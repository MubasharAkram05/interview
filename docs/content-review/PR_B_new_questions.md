# PR B: new questions for review

For review only. This file is not part of the app (the app reads src/data/more-questions.js).

Every category also has the shared opening and closing questions (not repeated here). Fresher shows the first 3 role questions with the simpler Fresher answer; Junior and Senior show all 7 role questions with the full answer, plus their 2 extra questions.

- [Cloud Administrator](#cloud-administrator)
- [Cloud Solutions Architect](#cloud-solutions-architect)
- [Cloud Security Engineer](#cloud-security-engineer)
- [Cloud Data Engineer / AI](#cloud-data-engineer--ai)
- [DevOps Engineer](#devops-engineer)
- [Platform Engineer](#platform-engineer)
- [SOC Analyst](#soc-analyst)
- [Penetration Tester](#penetration-tester)
- [Application Security](#application-security)
- [GRC Analyst](#grc-analyst)
- [Incident Response](#incident-response)

## Cloud Administrator

- id: `cloudadmin`
- Role label: Cloud Administrator
- Profile role (setupRole): Cloud Administrator
- Suggested skills: User management, Backups, Patching, Monitoring, Cost control, IAM, Linux, Networking, Ticketing, Automation scripting

### Role questions (Junior and Senior answers)

1. **How do you manage user accounts and access in a cloud account?**
   I create users through the central identity system and give access through groups and roles, never one person at a time. Each group gets only the permissions its work needs. I turn on multi-factor sign-in for everyone and remove access as soon as someone leaves. I also review the access list every month.
2. **How do you set up and test backups for cloud servers and databases?**
   I use the backup service of the provider with a schedule and a retention period that match the business needs. I keep copies in another region or account in case of a disaster. Most important, I test a restore regularly, because a backup is only useful if it can be restored. I also get an alert when a backup job fails.
3. **How do you keep cloud servers patched?**
   I use the patch management tool of the provider to scan servers and install updates in a planned maintenance window. I patch a test group first and then production in stages. Critical security patches get a shorter timeline. I keep a report of the patch status of every server.
4. **Which metrics and alerts do you set up for a new cloud server?**
   I watch CPU, memory, disk space, network traffic and the health checks of the application. I set alerts with sensible limits, for example disk usage above 80 percent, and send them to the team channel or the on-call tool. I also collect the system logs in one place, so problems are easy to investigate.
5. **How do you use tags in a cloud account?**
   Tags are key and value labels such as owner, project and environment. I add them to every resource, ideally automatically, so we can see costs per team and find who owns a resource. They also help with automation, for example stopping test servers at night.
6. **How do you handle a ticket asking for more disk space on a server?**
   I first check the current usage and growth to confirm the need. Then I take a snapshot, increase the disk size and extend the file system inside the server, which usually needs no downtime. I confirm the new space with the user, update the ticket and note the change for cost tracking.
7. **Which tasks would you automate first as a cloud administrator?**
   I automate repetitive tasks that are easy to get wrong, such as creating standard servers, starting and stopping test machines on a schedule and cleaning up old snapshots. I use scripts with the command line tool of the provider or simple templates, and I keep them in Git. Automation saves time and makes every change the same.

### Fresher answers (first 3 role questions)

1. **How do you manage user accounts and access in a cloud account?**
   I add users to groups with the right permissions instead of giving access one by one. I turn on multi-factor sign-in and remove access when someone leaves.
2. **How do you set up and test backups for cloud servers and databases?**
   I schedule automatic backups and keep a copy in another region. Then I test a restore regularly, because a backup that was never tested cannot be trusted.
3. **How do you keep cloud servers patched?**
   I use the patch tool of the cloud provider, update a test server first and then the others in a planned window. Security patches come first.

### Junior extra questions

1. **How do you handle a request to restore a deleted file from a backup?**
   I confirm what was lost, on which server and at what time, and check that the person is allowed to have it. I restore to a separate location first, so current data is not overwritten, and let the user check the file. Then I move it back and record the restore in the ticket.
2. **How do you document changes in a cloud environment?**
   Every change goes through a ticket that says what changed, why and how to roll it back. I keep diagrams and step-by-step guides up to date in a shared place. Infrastructure kept as code also gives us a full history of changes in Git.

### Senior extra questions

1. **How do you organize many cloud accounts for a company?**
   I use the organization features of the provider to group accounts by environment and team, with guardrail policies applied from the top. Sign-in is central with single sign-on. Logs and billing go to dedicated accounts. This keeps teams independent while security and costs stay under control.
2. **How do you plan disaster recovery for important systems?**
   I agree on recovery time and recovery point targets with the business for each system. Then I pick a strategy that fits, from backup and restore up to a warm standby in another region. I document the steps and run recovery drills, because a plan that is never tested usually fails.

## Cloud Solutions Architect

- id: `cloudarch`
- Role label: Cloud Solutions Architect
- Profile role (setupRole): Cloud Architect
- Suggested skills: Architecture design, Cost optimization, Well-Architected, Proposals, Communication, Networking, Security, Migration, Documentation

### Role questions (Junior and Senior answers)

1. **How do you start designing a cloud solution for a new client?**
   I start with questions, not with services. I learn the business goal, the users, the data, the budget, the compliance needs and the expected load. Then I draw a simple first design, check it against those needs and discuss the trade-offs with the client before going into detail.
2. **What is the Well-Architected Framework?**
   It is a set of best practices from the cloud providers for reviewing a design. The AWS version has six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability. I use it as a checklist to find risks in a design before they become problems.
3. **How do you choose between virtual machines, containers and serverless for a workload?**
   Virtual machines give full control and suit older applications. Containers suit services that need portable and consistent deployments. Serverless suits event-driven work with uneven traffic, because you pay only when the code runs. I choose based on the workload, the skills of the team, the cost and how much operations work the team can handle.
4. **How do you plan the migration of an application to the cloud?**
   I first assess the application, its dependencies and its data, then choose a migration strategy such as rehost, replatform or refactor. I start with a small, low-risk system, plan the data move and a rollback, and test performance before the switch. After the migration I tune costs and remove what is no longer needed.
5. **How do you explain a cloud design to a non-technical client?**
   I focus on the business result: what improves, what it costs and what the risks are. I use one simple diagram and plain words instead of service names. I compare two or three options with their trade-offs and give a clear recommendation.
6. **How do you estimate the monthly cost of a cloud design?**
   I list every component with its expected size and usage, then use the pricing calculator of the provider. I add data transfer, storage growth and support costs, which are often missed. I show a range for low and high usage and point out savings options such as reserved capacity or savings plans.
7. **What goes into a good technical proposal?**
   A good proposal starts with the client's problem and goals in their own words. It then explains the proposed design, the main options considered, the timeline, the cost estimate and the risks. I keep it short, add one clear diagram and state the assumptions, so there are no surprises later.

### Fresher answers (first 3 role questions)

1. **How do you start designing a cloud solution for a new client?**
   I first ask about the goal, the users, the data and the budget. Then I draw a simple design and discuss it with the client before adding details.
2. **What is the Well-Architected Framework?**
   It is a set of best practices for checking a cloud design, with pillars such as security, reliability, performance, cost and operations. I use it as a checklist.
3. **How do you choose between virtual machines, containers and serverless for a workload?**
   Virtual machines give the most control, containers are portable and consistent, and serverless runs code only when it is needed. I choose based on the workload and the team.

### Junior extra questions

1. **How do you document an architecture decision?**
   I write a short decision record with the context, the options considered, the decision and its consequences. I store it next to the code or in a shared space. This helps new team members understand why things are built the way they are.
2. **How do you support the sales team in a technical presales meeting?**
   I listen to the client's needs, answer technical questions clearly and honestly, and never promise what the product cannot do. I can sketch a solution or show a short demo. After the meeting I share notes and the open questions with the sales team.

### Senior extra questions

1. **How do you handle a client who wants the cheapest design and the highest reliability?**
   I explain the trade-off openly, with numbers: what each level of reliability costs and what downtime would cost the business. Then I offer options, for example high availability only for the critical parts. The client makes an informed decision, and I document it.
2. **How do you design an architecture that runs in more than one region?**
   I first check whether it is really needed, because it adds cost and complexity. If it is, I choose active-passive or active-active, plan data replication and its consistency limits, and use health-checked DNS or a global load balancer for failover. Then I test the failover regularly.

## Cloud Security Engineer

- id: `cloudsec`
- Role label: Cloud Security Engineer
- Profile role (setupRole): Cloud Security
- Suggested skills: IAM, Encryption, KMS, Compliance, CSPM, Network security, Logging, Zero trust, Shared responsibility

### Role questions (Junior and Senior answers)

1. **How can cloud workloads get access without long-lived access keys?**
   I give each workload a role, such as an instance role or a workload identity, so it receives short-lived credentials automatically. People sign in through single sign-on and also get temporary credentials. This removes stored keys that could leak. I then limit each role to only what that workload needs.
2. **How does encryption with a key management service work?**
   A key management service stores and protects the master keys, often in hardware security modules. Data is encrypted with data keys, and those data keys are encrypted with the master key, which is called envelope encryption. I control who can use each key through key policies and log every use of a key.
3. **What is Cloud Security Posture Management?**
   Cloud Security Posture Management, or CSPM, means tools that scan cloud accounts all the time for risky settings, such as public storage, open security groups or disabled logging. They compare the settings with best practices and compliance standards and raise findings. I use them to find problems early and track each one until it is fixed.
4. **Which logs do you enable in a cloud account for security?**
   I enable the audit log of all API activity, such as AWS CloudTrail, in every region and send it to a separate, protected log account. I also turn on network flow logs, storage access logs and the threat detection service of the provider. The logs are kept for the required period and connected to alerts.
5. **How do you protect secrets such as database passwords in the cloud?**
   I keep secrets in a secrets manager, not in code, images or plain configuration files. Applications read them at runtime through their role, and the secrets are rotated automatically where possible. I also scan code repositories, so a secret that slips in is found and revoked quickly.
6. **How do you control network access to cloud resources?**
   I place resources in private subnets and expose only what must be public, usually through a load balancer. Security groups allow only the needed ports and sources. I use private endpoints to reach cloud services without going over the internet, and I review open rules regularly.
7. **What do you do if a cloud access key is exposed in public?**
   I treat it as an incident and act fast: I deactivate the key, create a new one if it is still needed and update the systems that use it. Then I check the audit logs for any activity with that key and remove anything an attacker created. Finally I find out how it leaked and add scanning so it does not happen again.

### Fresher answers (first 3 role questions)

1. **How can cloud workloads get access without long-lived access keys?**
   I give each application a role, so it gets temporary credentials automatically. This means no access keys are saved in code or on servers.
2. **How does encryption with a key management service work?**
   A key management service keeps the main keys safe. Data is encrypted with data keys, and these are protected by the main key. Access to the keys is controlled and logged.
3. **What is Cloud Security Posture Management?**
   CSPM tools check cloud settings all the time and report risky things, such as public storage or open ports. They help us fix problems early.

### Junior extra questions

1. **How do you stop insecure cloud resources before they are created?**
   I add policy checks to the infrastructure as code pipeline, so templates with risky settings fail before deployment. In the cloud accounts, guardrail policies block actions such as turning off logging. Stopping a problem before deployment is cheaper than finding it later.
2. **How do you review the permissions of an existing cloud role?**
   I compare the permissions the role has with what it actually used, using the access analysis tools of the provider and the audit logs. I remove unused permissions step by step and test the workload after each change. I also check who is allowed to use the role.

### Senior extra questions

1. **How do you build a security baseline for many cloud accounts?**
   I define a standard set of controls: central logging, threat detection, encryption by default, blocked public storage and guardrail policies for the whole organization. New accounts get this baseline automatically when they are created. I measure compliance across all accounts and report the gaps to their owners.
2. **How do you meet compliance requirements in the cloud?**
   I map each requirement to concrete cloud controls and note which part the provider covers under the shared responsibility model. I use built-in compliance checks and keep evidence such as logs and configuration reports. Regular reviews show auditors that the controls work all the time, not only on audit day.

## Cloud Data Engineer / AI

- id: `clouddata`
- Role label: Cloud Data Engineer
- Profile role (setupRole): Cloud Data/AI
- Suggested skills: Python, SQL, ETL, Data lake, Spark, Data pipelines, ML services, Orchestration

### Role questions (Junior and Senior answers)

1. **What is the difference between a data lake and a data warehouse?**
   A data lake stores raw data of any type, often in cheap object storage, and the structure is applied when the data is read. A data warehouse stores cleaned, structured data that is optimized for fast SQL queries and reports. Many teams use both, or a lakehouse that combines them.
2. **What is the difference between ETL and ELT?**
   In ETL, data is extracted, transformed and then loaded into the target. In ELT, the raw data is loaded first and transformed inside the warehouse or lake with its own compute power. ELT is common in the cloud, because storage is cheap and cloud warehouses are powerful.
3. **Why do teams use Apache Spark?**
   Spark processes large datasets in parallel across many machines and keeps data in memory where it can, which makes it fast. It supports SQL, Python and streaming in one engine. In the cloud I run it as a managed service, so I do not have to manage the cluster myself.
4. **How do you choose between batch and streaming processing?**
   Batch processing handles data in scheduled chunks, which is simpler and cheaper, for example for daily reports. Streaming processes events as they arrive and suits use cases that need results within seconds, such as fraud alerts. I choose based on how fresh the data must be and on the cost.
5. **Why do file formats like Parquet matter in a data lake?**
   Parquet is a columnar format, so a query reads only the columns it needs, and the data compresses well. This makes queries faster and cheaper than with CSV files. I also partition the data, for example by date, so queries scan less of it.
6. **What does an orchestration tool do in a data platform?**
   An orchestration tool, such as Apache Airflow, schedules the steps of a pipeline, runs them in the right order and retries steps that fail. It shows which runs passed or failed and sends alerts. This keeps many pipelines reliable and easy to monitor.
7. **How do you use a managed machine learning service in the cloud?**
   I use it to prepare data, train models on managed compute and deploy them as endpoints without building the infrastructure myself. I track experiments and model versions, and I secure the endpoints with roles and private networking. I also watch the costs, because training and always-on endpoints can be expensive.

### Fresher answers (first 3 role questions)

1. **What is the difference between a data lake and a data warehouse?**
   A data lake keeps raw data of any type in cheap storage. A data warehouse keeps cleaned, structured data that is fast for SQL and reports.
2. **What is the difference between ETL and ELT?**
   ETL changes the data before loading it. ELT loads the raw data first and changes it inside the warehouse, which is common in the cloud.
3. **Why do teams use Apache Spark?**
   Spark processes big data in parallel on many machines, so it is fast. It works with SQL and Python, and cloud providers offer it as a managed service.

### Junior extra questions

1. **How do you handle late or duplicate data in a pipeline?**
   I design each step so it can run again safely, for example by merging on a unique key instead of only appending rows. For late data I reprocess a time window, such as the last few days. I also add checks that count rows and flag unexpected changes.
2. **How do you control the cost of queries in a cloud data warehouse?**
   I partition and cluster large tables, select only the columns I need and avoid repeated full scans. I set budgets and query limits, and I review the most expensive queries regularly. Summary tables help for dashboards that run often.

### Senior extra questions

1. **How do you set up data governance for a cloud data platform?**
   I set up a data catalog with clear owners, definitions and data quality rules. Access is given by role, and sensitive columns are masked or restricted. I track lineage, so we know where data comes from and who uses it. This builds trust and helps with privacy laws.
2. **How do you choose between building your own model and using a managed AI service?**
   I first try a managed AI service or a ready-made model, because it is faster and cheaper to start with. I build or fine-tune my own model only when the managed option cannot meet our accuracy, cost, privacy or control needs. I compare the options on real data with a clear success metric.

## DevOps Engineer

- id: `devops`
- Role label: DevOps Engineer
- Profile role (setupRole): DevOps
- Suggested skills: Docker, Kubernetes, Terraform, Jenkins, GitHub Actions, CI/CD, Git, Linux, Ansible, Monitoring

### Role questions (Junior and Senior answers)

1. **What does DevOps mean to you?**
   DevOps is a way of working where development and operations share the responsibility for building, releasing and running software. It relies on automation, small and frequent changes, fast feedback and measuring results. The goal is to deliver value to users quickly and safely.
2. **How do you write a good Dockerfile?**
   I start from a small, trusted base image and pin its version. I order the steps so that layers that rarely change come first, which makes builds faster through caching. I use a multi-stage build to keep build tools out of the final image, run the app as a non-root user and never put secrets in the image.
3. **How do you choose a branching strategy for a team?**
   For most teams I prefer trunk-based development with short-lived feature branches and pull requests, because it keeps changes small and merging easy. Feature flags hide unfinished work. Long-lived release branches only make sense when we must support several versions at the same time.
4. **What is the difference between continuous delivery and continuous deployment?**
   With continuous delivery, every change that passes the pipeline is ready to release, but a person approves the release to production. With continuous deployment, every change that passes the tests goes to production automatically. Both need strong automated tests.
5. **How do you use Ansible?**
   Ansible is an agentless automation tool that connects over SSH and applies playbooks written in YAML. I use it to configure servers, install packages and deploy applications the same way every time. Its tasks are designed to be idempotent, so running them again does not cause unwanted changes.
6. **Which deployment strategies do you know?**
   Rolling deployments replace instances a few at a time. Blue-green keeps two environments and switches traffic at once, which makes rollback fast. Canary releases send a small share of traffic to the new version first and increase it if the metrics stay healthy.
7. **Which DORA metrics do you track?**
   The four key DORA metrics are deployment frequency, lead time for changes, change failure rate and the time to recover from a failed deployment. They show both speed and stability. I use them to find bottlenecks and to see whether our improvements really help.

### Fresher answers (first 3 role questions)

1. **What does DevOps mean to you?**
   DevOps means developers and operations work together. We automate builds, tests and releases, make small changes often and get feedback fast.
2. **How do you write a good Dockerfile?**
   I use a small official base image, put the steps that rarely change first so caching works, and use a multi-stage build. The app runs as a non-root user and no secrets go into the image.
3. **How do you choose a branching strategy for a team?**
   I like short-lived branches and pull requests that merge into the main branch often. Small changes are easier to review and cause fewer conflicts.

### Junior extra questions

1. **How do you speed up a slow CI pipeline?**
   I first measure which steps take the longest. Then I cache dependencies and build layers, run independent jobs in parallel and, where possible, run only the tests affected by a change. I also keep ready-made build images, so jobs do not install the same tools every time.
2. **What do you do when a deployment fails in production?**
   I roll back first to restore the service quickly, ideally with one automated step. Then I check the pipeline logs, application logs and metrics to find the cause. I fix it, add a test or check that would have caught it, and share what we learned.

### Senior extra questions

1. **How do you introduce DevOps practices to a team that deploys by hand?**
   I start with the biggest pain, usually manual releases, and automate one pipeline end to end as an example. I involve the team early, train people and measure the results, such as fewer failed releases. Small visible wins build trust for the next steps.
2. **How do you reduce toil for an operations team?**
   Toil is repetitive manual work that adds no lasting value. I measure where the time goes, then automate the biggest tasks, improve alerts so people are woken up only for real problems and fix recurring issues at the root. I aim to keep toil to a small share of the time of the team.

## Platform Engineer

- id: `platform`
- Role label: Platform Engineer
- Profile role (setupRole): Platform Engineer
- Suggested skills: Kubernetes, Terraform, Helm, CI/CD, Observability, Linux, Networking, Automation

### Role questions (Junior and Senior answers)

1. **What is platform engineering?**
   Platform engineering builds an internal platform that gives developers self-service tools to build, deploy and run their services. It hides complex infrastructure behind simple, well-documented paths. The goal is to let product teams ship faster while security and reliability standards are built in.
2. **What is a golden path?**
   A golden path is a supported, ready-made way to do a common task, such as creating a new service with a template, a pipeline and monitoring already set up. Teams can still choose another way, but the golden path is the easiest one. It spreads good practices without forcing them.
3. **What is Helm and why is it used?**
   Helm is a package manager for Kubernetes. It bundles Kubernetes manifests into charts with templates and values, so one chart can be installed in many environments with different settings. It also tracks releases, which makes upgrades and rollbacks easier.
4. **What is GitOps?**
   GitOps uses a Git repository as the source of truth for what should run in a cluster. A tool such as Argo CD or Flux compares the cluster with the repository and applies changes automatically. Every change is reviewed in a pull request, and a rollback is a simple Git revert.
5. **What are the three main types of observability data?**
   Metrics show numbers over time, such as request rate and latency. Logs record single events with details. Traces follow one request across many services and show where the time is spent. Together they help us find and understand problems quickly.
6. **How do you let many teams share one Kubernetes cluster safely?**
   I give each team its own namespaces with resource quotas and role-based access control. Network policies limit which services can talk to each other. Policy tools enforce rules, such as no privileged containers, so one team cannot harm another.
7. **How do you measure the success of an internal platform?**
   I treat the platform as a product and the developers as its users. I measure adoption, how long it takes to create and deploy a new service, deployment frequency and developer satisfaction. I collect feedback regularly and improve the parts that slow people down.

### Fresher answers (first 3 role questions)

1. **What is platform engineering?**
   Platform engineering builds tools that let developers create, deploy and run their apps by themselves. It makes the hard infrastructure parts simple.
2. **What is a golden path?**
   A golden path is a ready, supported way to do a common task, such as starting a new service with a template and a pipeline already set up.
3. **What is Helm and why is it used?**
   Helm is a package manager for Kubernetes. It bundles the settings of an app into a chart that can be installed in different environments.

### Junior extra questions

1. **How do you debug a pod that keeps restarting?**
   I check the pod status and events with kubectl describe, then the logs of the current and the previous container. Common causes are a failing health check, too little memory, a wrong setting or a missing secret. I fix the cause and confirm that the pod stays healthy.
2. **How do you set resource requests and limits for containers?**
   Requests tell the scheduler how much CPU and memory a container needs, and limits cap what it can use. I set them from real usage data with some headroom. A memory limit that is too low causes restarts, so I watch the metrics after every change.

### Senior extra questions

1. **How do you decide what to build into the platform and what to leave to the teams?**
   I look for problems that many teams share, such as deployment, secrets and monitoring, and build those into the platform. Unique needs stay with the teams. I talk to developers regularly and avoid building features nobody asked for.
2. **How do you plan a Kubernetes version upgrade across many clusters?**
   I first read the release notes for removed APIs and check our manifests and charts for them. I upgrade test clusters, then production clusters in stages, rolling the node pools one at a time. I keep the platform close to the supported versions, so each upgrade stays small.

## SOC Analyst

- id: `soc`
- Role label: SOC Analyst
- Profile role (setupRole): SOC Analyst
- Suggested skills: SIEM, Log analysis, Incident triage, Splunk, MITRE ATT&CK, Threat detection, Networking, Linux, Alert tuning

### Role questions (Junior and Senior answers)

1. **What does a SOC analyst do during a normal shift?**
   I monitor alerts from the SIEM and other security tools, triage them and investigate the ones that look real. I document every case in the ticketing system and escalate confirmed incidents to the next level. Between alerts I tune noisy rules and read about new threats.
2. **How do you prioritize many alerts at the start of a shift?**
   I sort the alerts by severity and by how important the affected system is, such as a domain controller or a finance system. I handle alerts that suggest an active attack first. I also look for alerts that are linked, because several small alerts can be one bigger incident.
3. **What is MITRE ATT&CK and how do you use it?**
   MITRE ATT&CK is a public knowledge base of attacker tactics and techniques seen in real attacks. I use it to understand what stage an attack may be at and what the attacker may try next. It also helps us check which techniques our detections cover and where we have gaps.
4. **What is alert tuning and why is it important?**
   Alert tuning means adjusting detection rules so they catch real threats with fewer false alarms, for example by adding exceptions for known safe activity. Too many noisy alerts cause alert fatigue, and analysts may miss the real ones. I document every change and check that it does not hide real attacks.
5. **Which log sources are most useful for a SOC?**
   Sign-in logs, endpoint detection logs, firewall and proxy logs, DNS logs, email security logs and cloud audit logs are very useful. Together they show who did what, from where and when. I also make sure the clocks of all systems are synchronized, so events can be linked correctly.
6. **Which signs in the logs can point to a brute force attack?**
   Many failed logins in a short time, from one source to many accounts or to one account, are a common sign. A successful login after many failures is even more important. I check the source address, the accounts involved and whether the login was followed by unusual activity.
7. **What is an indicator of compromise?**
   An indicator of compromise, or IOC, is evidence that a system may have been attacked, such as a known malicious IP address, domain or file hash. I search our logs for IOCs from threat intelligence. IOCs change quickly, so I also look at attacker behavior, not only at single indicators.

### Fresher answers (first 3 role questions)

1. **What does a SOC analyst do during a normal shift?**
   I watch the alerts from the security tools, check each one and investigate the real ones. I write clear notes and escalate confirmed incidents.
2. **How do you prioritize many alerts at the start of a shift?**
   I handle the most severe alerts on the most important systems first, especially signs of an active attack. I also look for alerts that belong together.
3. **What is MITRE ATT&CK and how do you use it?**
   MITRE ATT&CK is a free list of the methods attackers use. It helps me understand an attack and see what our detections cover.

### Junior extra questions

1. **How do you write a good escalation note for an incident?**
   I write what happened, when, which users and systems are affected, what evidence I found and what I have already done. I give my view of the severity and the next steps I recommend. A clear note lets the next analyst act without asking again.
2. **How do you use threat intelligence in daily SOC work?**
   I use threat intelligence feeds to add context to alerts, for example whether an IP address is known to be malicious. I also read reports on new attack campaigns and check if our detections would catch them. I always confirm intelligence with our own logs before acting on it.

### Senior extra questions

1. **How do you measure how well a SOC is working?**
   I track the mean time to detect and the mean time to respond, the false positive rate, the alert volume per analyst and the detection coverage against MITRE ATT&CK. I also review closed incidents to find missed signals. The numbers guide training, tuning and hiring decisions.
2. **How do you build a new detection rule?**
   I start from a real threat or technique, define the behavior we want to catch and check which logs show it. I write the rule and test it on past data to see the false positives, and with safe, approved simulations where possible. Then I document it, deploy it and review its results after a few weeks.

## Penetration Tester

- id: `pentest`
- Role label: Penetration Tester
- Profile role (setupRole): Penetration Tester
- Suggested skills: Kali Linux, Burp Suite, Nmap, OWASP, Metasploit, Reporting, Web security, Networking, Linux

### Role questions (Junior and Senior answers)

1. **What do you agree on with a client before a penetration test starts?**
   I never test anything without written permission. Before we start, we agree on the scope, the systems that are out of scope, the testing window, the rules of engagement and emergency contacts. This protects the client and me, and it keeps the test safe and legal.
2. **What are the main phases of a penetration test?**
   A test usually moves through planning and scoping, information gathering, finding weaknesses, carefully confirming them within the agreed rules, and reporting. After the client fixes the issues, a retest confirms the fixes. Every step stays inside the authorized scope.
3. **What is the difference between a vulnerability scan and a penetration test?**
   A vulnerability scan is an automated check that lists possible weaknesses, often with false positives. A penetration test is done by a person who confirms the findings, understands how they combine and explains the real business risk. Both are useful, but they answer different questions.
4. **What makes a good penetration test report?**
   A good report has a short summary for managers in plain words and a technical section for each finding. Each finding has a risk rating, the affected systems, clear evidence and practical steps to fix it. I write it so both managers and engineers can act on it.
5. **How do you rate the severity of a finding?**
   I consider how easy the issue is to exploit, what an attacker could reach and the impact on the business. I often use CVSS as a base score and then adjust the priority for the client's situation. I explain my reasoning, so the client can plan the fixes in the right order.
6. **What is the difference between black box, grey box and white box testing?**
   In black box testing the tester gets almost no information, like an outside attacker. In grey box testing the tester gets some access, such as a normal user account. In white box testing the tester sees documentation and sometimes code, which finds more issues in less time.
7. **What do you do if you find a critical issue during a test?**
   I stop and inform the client's agreed contact right away, instead of waiting for the final report. I share the details securely and do not go further than the scope allows. The client can then fix it quickly, and I note everything in the report.

### Fresher answers (first 3 role questions)

1. **What do you agree on with a client before a penetration test starts?**
   First I get written permission. Then we agree on what I may test, what is out of scope, the time window and who to call in an emergency.
2. **What are the main phases of a penetration test?**
   The main phases are planning, gathering information, finding weaknesses, checking them carefully within the rules, and reporting. Later a retest checks the fixes.
3. **What is the difference between a vulnerability scan and a penetration test?**
   A scan is an automatic list of possible problems. A penetration test is done by a person who checks the real risk and explains it.

### Junior extra questions

1. **How do you avoid causing damage during a test?**
   I stay strictly within the scope and the rules, avoid tests that could crash systems unless the client agreed to them, and prefer a staging environment where possible. I keep the client informed and stop at once if something looks unstable.
2. **How do you keep your testing skills up to date in a legal way?**
   I practise on legal training platforms and in my own lab, follow security research and read public advisories. I also work toward recognized certifications. I never test systems I do not have permission for.

### Senior extra questions

1. **How do you plan a penetration testing program for a company?**
   I start from the risks of the company and its most important systems, then decide how often each area is tested, for example every year for key applications and after major changes. I combine automated scanning with manual tests and track every finding until it is fixed.
2. **How do you explain the results of a test to senior management?**
   I focus on business risk, not technical detail: what an attacker could reach and what it would mean for the company. I show the trend compared with earlier tests and give a short, prioritized plan. Clear numbers and plain words help managers decide on budget and timelines.

## Application Security

- id: `appsec`
- Role label: Application Security Engineer
- Profile role (setupRole): Application Security
- Suggested skills: OWASP Top 10, SAST, DAST, Secure coding, Threat modeling, Code review, Dependency scanning, CI/CD security

### Role questions (Junior and Senior answers)

1. **What is the difference between SAST and DAST?**
   SAST, or static application security testing, analyzes the source code without running it and finds issues early in development. DAST, or dynamic testing, tests the running application from the outside, like a user or an attacker would. They find different kinds of problems, so I use both in the pipeline.
2. **What is threat modeling?**
   Threat modeling is a structured way to find security risks in a design before it is built. We draw how data flows, ask what could go wrong, for example with the STRIDE categories, and decide on controls. Security problems are cheapest to fix at the design stage.
3. **Why does dependency scanning matter?**
   Most applications use many open source libraries, and a vulnerability in one of them affects our app too. Dependency scanning, also called software composition analysis, checks our libraries against known vulnerability databases. I keep dependencies updated and fix critical issues quickly.
4. **What do you look for in a security code review?**
   I check how the code handles input and output, authentication, authorization on every request, secrets, error messages and the logging of sensitive data. I focus on risky areas such as login, payments and file uploads. I give clear, friendly comments with a suggested fix.
5. **How do you build security checks into a CI/CD pipeline?**
   I add automated checks at each stage: secret scanning and SAST on every pull request, dependency and container image scanning in the build, and DAST against a test environment. Critical findings block the release. Fast, relevant checks keep developers on board.
6. **How should an application store user passwords?**
   Passwords are never stored in plain text or with a simple hash. I use a slow, salted password hashing algorithm made for this purpose, such as Argon2, bcrypt or scrypt. I also add rate limiting and multi-factor sign-in to protect the accounts.
7. **What is broken access control, and how do you prevent it?**
   Broken access control happens when users can see or change data they should not, for example by changing an ID in a request. I prevent it by checking authorization on the server for every request, denying access by default and using tested access rules. I also add tests for these cases.

### Fresher answers (first 3 role questions)

1. **What is the difference between SAST and DAST?**
   SAST checks the source code without running it. DAST tests the running app from the outside. Using both finds more problems.
2. **What is threat modeling?**
   Threat modeling means looking at a design and asking what could go wrong, before we build it. Then we add controls for the biggest risks.
3. **Why does dependency scanning matter?**
   Apps use many open source libraries. Dependency scanning checks them for known vulnerabilities, so we can update the risky ones early.

### Junior extra questions

1. **How do you help developers fix a security finding?**
   I explain the risk in simple words, show where the problem is and suggest a concrete fix or a code example. I set a fair priority based on the real risk. Working with developers, not against them, gets more issues fixed.
2. **How do you handle a false positive from a security scanner?**
   I check the finding by looking at the code and its context. If it really is a false positive, I mark it in the tool with a short reason, so it does not come back, and improve the rule if possible. I keep a record, so the decision can be reviewed later.

### Senior extra questions

1. **How do you set up a security champions program?**
   I invite one interested developer from each team to become a security champion. They get training, time and a direct line to the security team, and they bring security thinking into the daily work of their team. This scales application security better than a small central team alone.
2. **How do you decide which application security issues to fix first?**
   I rank issues by real risk: how easy they are to exploit, whether the application is exposed to the internet and how sensitive its data is. Critical issues in exposed systems are fixed first, with clear deadlines. I track the backlog and share progress with the teams.

## GRC Analyst

- id: `grc`
- Role label: GRC Analyst
- Profile role (setupRole): GRC Analyst
- Suggested skills: ISO 27001, Risk assessment, Audit, Policies, NIST, Compliance, Documentation, Vendor risk, Communication

### Role questions (Junior and Senior answers)

1. **What does GRC mean?**
   GRC stands for governance, risk and compliance. Governance sets the policies and responsibilities, risk management finds and treats risks, and compliance makes sure we meet laws, standards and contracts. Together they help a company protect information in an organized way.
2. **What is ISO 27001?**
   ISO 27001 is an international standard for an information security management system. It requires a company to assess its risks, choose controls, often from Annex A, and keep improving them. A company can be certified by an accredited auditor.
3. **How do you carry out a risk assessment?**
   I list the important assets, identify the threats and weaknesses that affect them and rate each risk by likelihood and impact. Then the risk owner decides to reduce, transfer, avoid or accept it. I record everything in a risk register and review it regularly.
4. **How do you prepare for an information security audit?**
   I check the scope and the requirements early, then collect evidence for each control, such as policies, logs and screenshots. I run an internal review first to find gaps and fix them before the audit. During the audit I answer clearly and provide evidence quickly.
5. **How do you write a security policy that people follow?**
   I keep it short, clear and in plain words, and I explain why each rule exists. I involve the teams who must follow it and make sure it is realistic. Then I communicate it, train people and review it at least once a year.
6. **What is vendor risk management?**
   It is the process of checking the security of suppliers that handle our data or systems. I use questionnaires, certifications such as ISO 27001, SOC 2 reports and contract clauses. Vendors with more access get deeper checks and regular reviews.
7. **What is the NIST Cybersecurity Framework?**
   It is a widely used framework from the US National Institute of Standards and Technology that helps organizations manage cybersecurity risk. Version 2.0 has six functions: Govern, Identify, Protect, Detect, Respond and Recover. I use it to measure where we are today and to plan improvements.

### Fresher answers (first 3 role questions)

1. **What does GRC mean?**
   GRC means governance, risk and compliance. It is about policies, managing risks and following laws and standards.
2. **What is ISO 27001?**
   ISO 27001 is an international standard for managing information security. A company assesses its risks, chooses controls and can get certified.
3. **How do you carry out a risk assessment?**
   I list the important assets, find the threats to them and rate each risk by how likely it is and how much harm it could do. Then the owner decides what to do.

### Junior extra questions

1. **How do you track whether security controls are working?**
   I define simple measures for key controls, such as the share of laptops with encryption or how fast access is removed for people who leave. I collect them regularly, ideally automatically, and report the trend. Controls that fail get an owner and a date to fix them.
2. **How do you handle a team that does not follow a policy?**
   I first talk to them to understand why, because the policy may be unclear or impractical. If the policy is valid, I help them find a workable way to follow it. If they need an exception, I document the risk and get approval from the right manager, with an end date.

### Senior extra questions

1. **How do you report information security risk to the board?**
   I keep it short and focused on the business: the top risks, their trend, what we are doing about them and what decisions we need. I avoid technical terms and use simple ratings. I connect each risk to business goals, so the board can set priorities and budget.
2. **How do you build a compliance program for a new regulation?**
   I first understand the regulation and whether it applies to us, then map its requirements to our existing controls to find the gaps. I plan the work with owners and deadlines, update policies and train staff. Finally I collect evidence and review compliance regularly.

## Incident Response

- id: `ir`
- Role label: Incident Response Analyst
- Profile role (setupRole): Incident Response
- Suggested skills: Digital forensics, Malware analysis, Evidence handling, Playbooks, Log analysis, Memory analysis, Containment, Reporting

### Role questions (Junior and Senior answers)

1. **What is an incident response playbook?**
   A playbook is a step-by-step guide for handling one type of incident, such as ransomware or a compromised account. It lists who to contact, what to check and which actions to take. Playbooks help the team respond quickly and the same way every time, even under pressure.
2. **How do you handle digital evidence correctly?**
   I collect evidence in a forensically sound way, for example by making a verified copy and recording its hash. I keep a chain of custody that shows who handled the evidence, when and why. I work on copies, never on the original, so the evidence stays reliable.
3. **Why is memory analysis useful in an investigation?**
   Memory holds information that is lost when a computer is turned off, such as running processes, network connections and some malware that never writes to disk. Capturing memory before shutting a system down can show what the attacker was doing. I use dedicated tools to capture and analyze it.
4. **How do you decide how to contain an incident?**
   I balance stopping the attack with keeping the business running and saving evidence. Options include isolating a device from the network, disabling an account or blocking an address. I agree on the action with the system owner when possible and record the time and the reason.
5. **What do you check first when an account may be compromised?**
   I check the recent sign-ins, their locations and devices, and any changes to the account, such as new mail forwarding rules, passwords or MFA methods. I look at what data the account accessed. Then I reset the credentials, end active sessions and check whether other accounts are involved.
6. **What is the difference between static and dynamic malware analysis?**
   Static analysis examines a file without running it, for example its hashes, strings and structure. Dynamic analysis runs the file in an isolated sandbox and watches what it does, such as the files it creates and the connections it makes. I only handle malware in a safe, isolated lab.
7. **What makes a good incident timeline?**
   A good timeline lists every important event with an exact time, the source of the evidence and what it means. I use a single time zone, usually UTC, to avoid confusion. The timeline shows how the attacker got in, what they did and when we responded.

### Fresher answers (first 3 role questions)

1. **What is an incident response playbook?**
   A playbook is a step-by-step guide for one type of incident, such as a hacked account. It tells the team who to call and what to do, so we act fast.
2. **How do you handle digital evidence correctly?**
   I make a verified copy of the evidence and work only on the copy. I record who handled it and when, which is called the chain of custody.
3. **Why is memory analysis useful in an investigation?**
   Memory shows what was running on the computer, such as processes and connections, and this is lost when the computer is turned off. So it can show what the attacker did.

### Junior extra questions

1. **How do you communicate during an active incident?**
   I share short, regular updates with the incident lead through an agreed channel, and I stick to facts: what we know, what we are doing and what we need. I avoid guessing. If the normal channels may be compromised, we use a separate, secure channel.
2. **How do you check that an attacker is fully removed from a system?**
   I look for every way the attacker kept access, such as new accounts, scheduled tasks, startup items or remote access tools. I compare the system with a known good state and often rebuild it from a clean image. Then I watch it closely for some time, because attackers often try to return.

### Senior extra questions

1. **How do you lead the response to a ransomware incident?**
   I start the response plan, bring the team together and contain the spread quickly by isolating affected systems. I protect and check the backups, keep management, legal and communications informed and follow the law on reporting. Recovery starts from clean systems and backups, and every decision is documented.
2. **How do you test that an incident response plan works?**
   I run tabletop exercises where the team and managers walk through a realistic scenario and make decisions. I also run technical drills, such as restoring from backup. Each exercise ends with a list of gaps, owners and dates, and the plan is updated.
