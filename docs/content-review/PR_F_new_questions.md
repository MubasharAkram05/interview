# PR F: new questions for review

For review only. This file is not part of the app (the app reads src/data/more-questions.js).

Every category also has the shared opening and closing questions (not repeated here). Fresher shows the first 3 role questions with the simpler Fresher answer; Junior and Senior show all 7 role questions with the full answer, plus their 2 extra questions. Counts per level: Fresher 10, Junior 19, Senior 19.

- **UI/UX Design**
  - [UI/UX Design](#uiux-design)
  - [UX Researcher](#ux-researcher)
  - [Product Designer](#product-designer)
- **Video and Animation**
  - [Video Editor](#video-editor)
  - [Motion Graphics Designer](#motion-graphics-designer)
  - [2D Animator](#2d-animator)
  - [3D Animator](#3d-animator)
- **Content and Writing**
  - [Content Writer](#content-writer)
  - [Technical Writer](#technical-writer)
  - [Copywriter](#copywriter)

# Parent: UI/UX Design

## UI/UX Design

- id: `uiux`
- Role label: UI/UX Designer
- Profile role (setupRole): UI/UX Designer
- Suggested skills: Figma, Wireframing, Prototyping, User flows, Design systems, Accessibility, Visual hierarchy, Usability testing, Auto layout, Developer handoff
- Search keywords: ui/ux designer, figma, wireframe, user interface

### Role questions (Junior and Senior answers)

1. **What steps do you follow to design a new screen or feature?**
   I start by understanding the problem, the users and the goal, often with a little research. Then I map the user flow and sketch low-fidelity wireframes to try ideas quickly. I turn the best idea into a clickable prototype and test it with a few users. I improve the design from what I learn before I make the final screens.
2. **What is a user flow, and why do you make one?**
   A user flow shows the steps a user takes to finish a task, such as signing up or paying. It includes each screen, the choices and the error paths. It helps me find extra steps and dead ends before I design any screen. It also helps developers and testers see the whole journey.
3. **How do you create visual hierarchy on a screen?**
   I decide what the user must see first, such as the main heading or the main button. I use size, weight, colour and position to make that element stand out. Spacing groups related items and separates the rest. If everything looks important, nothing stands out, so I keep only one main action per screen.
4. **How do you set up components and tokens for a design system in Figma?**
   I start with tokens, such as colours, type styles and spacing, stored as Figma variables and styles. Then I build components with variants and auto layout, such as buttons, inputs and cards. I write simple usage notes for each component and keep the design system in a shared library. Changes are reviewed and announced, so every designer and developer uses the same version.
5. **How do you design for accessibility and colour contrast?**
   I follow WCAG, so normal text has a contrast ratio of at least 4.5 to 1 and large text and icons at least 3 to 1. I never use colour alone to show meaning, for example I add an icon or text to an error. I make touch targets large enough and keep a clear focus order for keyboard and screen reader users. I check my designs with contrast tools before handoff.
6. **How do you prepare a Figma file so developers can build it?**
   I name layers and frames clearly and use components and auto layout, so spacing is easy to read. I mark which screens are ready, using Dev Mode or a clear status label. I show all states, such as empty, loading, error and hover, and add notes for behaviour. I also meet the developers early and answer their questions during the build.
7. **Which Figma features do you use most in your work?**
   I use frames and auto layout to build screens that resize correctly. Components and variants keep repeated parts consistent, and variables store colours and spacing for themes such as dark mode. I use prototyping links and smart animate to make clickable flows for testing. Comments help me collect feedback from the team in one place.

### Fresher answers (first 3 role questions)

1. **What steps do you follow to design a new screen or feature?**
   I start with the problem and the users, then I map the flow and sketch wireframes. I build a prototype, test it with users and improve it.
2. **What is a user flow, and why do you make one?**
   A user flow shows the steps a user takes to finish a task, such as signing up. It helps me find extra steps before I design the screens.
3. **How do you create visual hierarchy on a screen?**
   I make the most important thing on the screen stand out with size, colour and position. I use spacing to group related items.

### Junior extra questions

1. **What is the difference between a wireframe, a mockup and a prototype?**
   A wireframe is a simple layout in grey boxes that shows structure and content, not style. A mockup is a static, high-fidelity design with real colours, fonts and images. A prototype is clickable, so people can try the flow as if it were the real product. I move from wireframe to prototype as the idea becomes clearer.
2. **How do you design a form that is easy to complete?**
   I ask only for the information that is really needed and group related fields. Each field has a visible label, not only a placeholder, and the keyboard type matches the input on phones. I show errors next to the field in plain words as soon as it helps. The main button clearly says what happens next, such as Create account.

### Senior extra questions

1. **How do you raise the quality of design across a product team?**
   I set shared principles and a design system, so quality does not depend on one person. I run regular design reviews with clear criteria, such as accessibility and consistency. I pair with newer designers and give specific, kind feedback. I also measure usability problems and track them like bugs, so they get fixed.
2. **How do you balance user needs, business goals and technical limits in a design?**
   I make the user problem and the business goal clear before I start, and I involve engineers early to learn the limits. I explore a few options and show the trade-offs of each one in time, cost and user value. Often a simpler first version solves most of the problem. I explain my recommendation and the reasons behind it.

## UX Researcher

- id: `uxresearch`
- Role label: UX Researcher
- Profile role (setupRole): UX Researcher
- Suggested skills: User interviews, Usability testing, Surveys, Personas, Journey maps, Affinity mapping, Research planning, Recruiting participants, Data analysis, Storytelling
- Search keywords: ux research, user research, usability study, user interviews

### Role questions (Junior and Senior answers)

1. **How do you plan and run a user interview?**
   I start with clear research questions and write a short guide with open questions, such as tell me about the last time you did this. I ask about real past behaviour, not about what people might do in the future. During the interview I listen more than I talk and ask follow-up questions like why and what happened next. I record with permission and take notes on quotes and key moments.
2. **How do you run a usability test?**
   I give participants realistic tasks, such as find and buy a product, and ask them to think aloud. I watch where they hesitate, make mistakes or give up, without helping them. Five to eight participants per round often find most of the big problems. I note how many people completed each task and the main issues I saw.
3. **When do you use a survey and when do you use interviews?**
   Interviews help me understand why people do things, with rich detail from a small group. Surveys help me measure how common something is across many people. I often use interviews first to find the important topics and then a survey to check how widely they apply. I keep survey questions short, neutral and easy to answer.
4. **How do you create personas and journey maps that people actually use?**
   I base them on real research data, not on guesses, and keep them short. A persona shows the goals, needs and frustrations of a group of users. A journey map shows the steps, feelings and pain points of a user over time, such as from first visit to purchase. I share them in workshops and link them to real decisions, so the team keeps using them.
5. **How do you recruit the right participants for research?**
   I define who I need, based on behaviour, such as people who shop online every week, not only on age. I write a short screener survey to filter the right people and avoid people who join many studies. I offer fair incentives and explain how their data will be used. I aim for a mix of people, so the results are not one-sided.
6. **How do you turn research notes into clear findings?**
   I collect observations and quotes on notes, then group them in an affinity map to find patterns. I separate what I saw from how I explain it. I rank findings by how many people they affect and how serious they are. Then I share a short summary with evidence, such as clips and quotes, and clear recommendations.
7. **How do you reduce bias in your research?**
   I avoid leading questions, so I ask how did you find this step instead of was this step easy. I recruit a varied group, so the results do not reflect only one type of user. I look for evidence that disagrees with my ideas, not only evidence that supports them. When I can, a colleague reviews my guide and my findings.

### Fresher answers (first 3 role questions)

1. **How do you plan and run a user interview?**
   I write a short guide with open questions about real past behaviour. I listen more than I talk and record only with permission.
2. **How do you run a usability test?**
   I give people real tasks and ask them to think aloud while I watch. I note where they get stuck without helping them.
3. **When do you use a survey and when do you use interviews?**
   Interviews explain why people do things, with a small group. Surveys measure how common something is across many people.

### Junior extra questions

1. **What is the difference between qualitative and quantitative research?**
   Qualitative research collects words and observations, such as interviews and usability tests, to understand why. Quantitative research collects numbers, such as survey results and analytics, to measure how many or how much. They answer different questions, so I often use both. For example, analytics shows where users drop off and interviews explain the reason.
2. **How do you protect participant privacy in research?**
   I explain the study and get clear consent before recording anything. I store recordings and notes securely and share only what the team needs. In reports I remove names and other details that could identify a person. I delete the data when the agreed time is over.

### Senior extra questions

1. **How do you decide which research method to use for a project?**
   I start from the decision the team needs to make and the questions behind it. Early on, when we do not understand the problem, I use interviews or field studies. When we have a design, I use usability tests, and when we need numbers, I use surveys or analytics. I also consider time, budget and the risk of getting it wrong.
2. **How do you make sure research findings change product decisions?**
   I involve product managers and designers from the planning stage, so they care about the results. I invite them to watch sessions, because seeing users struggle is very convincing. I share short, clear findings with recommendations at the right time, before decisions are made. I also keep a research library, so past findings are easy to find later.

## Product Designer

- id: `productdesign`
- Role label: Product Designer
- Profile role (setupRole): Product Designer
- Suggested skills: Problem framing, User research, Interaction design, Prototyping, Figma, Design systems, Product metrics, A/B testing, Design critique, Collaboration
- Search keywords: product design, end-to-end design, design critique, problem framing

### Role questions (Junior and Senior answers)

1. **How do you frame a problem before you start designing?**
   I write a short problem statement that says who has the problem, what it is and why it matters. I check it with research and data, so I am solving a real problem. I also agree on what success looks like, such as fewer failed sign-ups. A clear problem stops the team from jumping to a solution too early.
2. **How do you work with product managers and engineers?**
   I join planning early, so design, product and engineering agree on the problem together. I share rough ideas often, instead of waiting for a perfect design. Engineers help me understand what is easy or hard to build, and product managers help with priorities. I stay involved during the build and review the work before release.
3. **How do you design the first version of a new feature?**
   I find the one main job the feature must do well and design the simplest flow for it. I leave nice-to-have parts for later and write them down, so they are not lost. I test the core flow with users before we build it. After release I watch how people use it and plan the next improvements.
4. **How do you use metrics to judge a design change?**
   Before the change, I agree on the metric we want to improve, such as task completion or conversion, and record the current number. Where possible we run an A/B test, so we compare the new design with the old one fairly. I also watch guardrail metrics, so a gain in one place does not hurt another. Numbers show what changed, and research helps explain why.
5. **How do you run a design critique?**
   I start by sharing the goal of the design and the type of feedback I need, such as feedback on the flow, not on colours. People give feedback about the goal and the users, not about personal taste. I take notes, ask questions and do not defend every choice. After the session I decide what to change and share the next version.
6. **How do you handle trade-offs when time is short?**
   I list the options and show what each one costs and what users gain. I protect the parts that matter most to users, such as clarity and accessibility, and simplify the rest. Sometimes I design a full version and a smaller first step, so the team can choose. I make the trade-off visible, so it is a shared decision.
7. **What does end-to-end ownership mean for a product designer?**
   It means I own the design from the first problem to the result after launch. I take part in research, define the flows, design the screens and support the developers during the build. After release, I check the data and feedback to see whether the problem is solved. If not, I keep improving it instead of moving on.

### Fresher answers (first 3 role questions)

1. **How do you frame a problem before you start designing?**
   I write who has the problem, what it is and why it matters. I check it with research and agree on what success looks like.
2. **How do you work with product managers and engineers?**
   I join planning early and share rough ideas often. Engineers tell me what is hard to build, and product managers help with priorities.
3. **How do you design the first version of a new feature?**
   I design the simplest flow for the main job of the feature. I test it with users and leave extra parts for later.

### Junior extra questions

1. **How do you present your design to stakeholders?**
   I start with the problem and the goal, then show the user flow before the details. I explain the main decisions and the reasons behind them, using research or data where I can. I show the prototype instead of only still screens. I end with the open questions and the decisions I need from them.
2. **How do you design empty, error and loading states?**
   An empty state explains what will appear there and gives a clear first action, such as add your first project. An error message says what went wrong in plain words and how to fix it, without blaming the user. Loading states show progress, for example with a skeleton screen, so the app does not look broken. I design these states together with the main screen, not at the end.

### Senior extra questions

1. **How do you set the design direction for a product area?**
   I gather research, data and the business goals and look for the biggest user problems. I create a vision, often as a few key screens or a short video, to show where the product could go. I break it into steps the team can deliver and agree on them with product and engineering. I check the direction regularly and adjust it when we learn something new.
2. **How do you help grow other designers on the team?**
   I give specific feedback that explains the reason, not just my opinion. I let designers own real problems and support them instead of taking over. I share how I think through problems in reviews and pairing sessions. I also help them present their work, so they build confidence with stakeholders.

# Parent: Video and Animation

## Video Editor

- id: `video`
- Role label: Video Editor
- Profile role (setupRole): Video Editor
- Suggested skills: Premiere Pro, DaVinci Resolve, CapCut, Final Cut Pro, Color correction, Audio cleanup, Storytelling, Pacing, Export settings, File organization
- Search keywords: video editing, premiere pro, davinci resolve, capcut

### Role questions (Junior and Senior answers)

1. **What is your workflow when you edit a video from start to finish?**
   I read the brief and organize the footage, audio and graphics into clear folders and bins. I build a rough cut to get the story right, then a fine cut to fix timing and pacing. After that I add music, graphics, color correction and audio cleanup. I export a review copy, collect feedback and then deliver the final versions.
2. **How do you decide where to cut and how to set the pacing?**
   I cut when the action or the idea is complete, or to show a reaction that adds meaning. I use J-cuts and L-cuts, where the sound starts before or continues after the picture, to make scenes flow smoothly. Fast cuts suit energetic content, while slower cuts give emotional moments time. I watch the edit again with fresh eyes to find parts that drag.
3. **What is the difference between color correction and color grading?**
   Color correction fixes problems, so the footage looks natural and every shot matches, such as white balance and exposure. Color grading comes after and gives the video its mood or style, such as warm or cool tones. I use scopes, such as the waveform and the vectorscope, instead of trusting only my screen. In DaVinci Resolve I often use nodes to keep these steps separate.
4. **How do you clean up and balance audio in a video?**
   I remove background noise and hum with noise reduction, without making the voice sound robotic. I set clear dialogue levels and lower the music under speech, often with automatic ducking. I check the final loudness, because platforms such as YouTube normalize loud videos. Good audio matters a lot, because people stop watching when the sound is bad.
5. **Which export settings do you use for different platforms?**
   For most online platforms I export MP4 with H.264, or H.265 for smaller files, at the frame rate I shot in. For YouTube I use 16:9, such as 1920 by 1080 or 4K, and for Reels, TikTok and Shorts I use vertical 9:16 at 1080 by 1920. I keep text and faces inside the safe area, so the app buttons do not cover them. I also keep a high-quality master file for future edits.
6. **How do you organize files and use proxies on a big project?**
   I use the same folder structure on every project, such as footage, audio, graphics, music and exports, with clear names and dates. For heavy footage, such as 4K or RAW, I create proxies, which are smaller copies that edit smoothly. The editor links back to the full-quality files for the final export. I back up the project and the media in two places.
7. **Which editing tools do you use, and when?**
   I use Premiere Pro for most client work, because it works well with After Effects and other Adobe tools. DaVinci Resolve is strong for color grading and also has a free version. For quick social media edits on a phone, CapCut is fast and easy. I choose the tool based on the project, the deadline and what the client uses.

### Fresher answers (first 3 role questions)

1. **What is your workflow when you edit a video from start to finish?**
   I organize the footage first, then make a rough cut and a fine cut. After that I add music, color and audio fixes and export.
2. **How do you decide where to cut and how to set the pacing?**
   I cut when an action or idea is complete. Fast cuts suit energetic videos and slower cuts suit emotional moments.
3. **What is the difference between color correction and color grading?**
   Color correction fixes problems so shots look natural and match. Color grading adds a mood or style after that.

### Junior extra questions

1. **How do you handle client feedback on an edit?**
   I ask for feedback with timecodes, so I know exactly which moment they mean. I group the notes, ask questions when something is unclear and agree on how many review rounds are included. I make the changes and send a new version with a short list of what changed. If a note would hurt the video, I explain why and suggest another option.
2. **How do you add captions to a video?**
   I generate captions with the speech-to-text tool in my editor and then correct every line by hand. I keep each caption short, about two lines, and time it to the speech. I choose a clear font with good contrast and keep captions away from important parts of the frame. I also export a separate caption file, such as SRT, when the platform supports it.

### Senior extra questions

1. **How do you manage the post-production of a large project with several editors?**
   I set up a shared folder structure, naming rules and project templates before the work starts. I split the work, for example by episode or scene, and agree on deadlines for each stage. Shared storage or a collaboration tool keeps everyone on the same media. I review cuts regularly, so the style and quality stay consistent.
2. **How do you keep a video project on time and on budget?**
   I agree on the scope, the number of revisions and the delivery dates at the start. I plan each stage, such as rough cut, fine cut and final delivery, with buffer time. When the client asks for extra work, I explain the effect on time and cost before I start it. I share progress often, so there are no surprises at the end.

## Motion Graphics Designer

- id: `motion`
- Role label: Motion Graphics Designer
- Profile role (setupRole): Motion Graphics Designer
- Suggested skills: After Effects, Illustrator, Keyframes, Easing, Storyboarding, Typography, Lottie, Premiere Pro, Cinema 4D, Brand guidelines
- Search keywords: motion graphics, after effects, motion design, lottie

### Role questions (Junior and Senior answers)

1. **How do keyframes and easing make motion look natural?**
   Keyframes mark the start and end values of a change, such as position or scale, and the software fills in the frames between them. With linear timing, objects start and stop suddenly, which looks mechanical. Easing makes them speed up and slow down, like real objects. In After Effects I shape this in the graph editor with the speed and value graphs.
2. **Why do you make a storyboard before animating?**
   A storyboard shows the key frames of the animation with notes on timing and transitions. It lets the client approve the idea before I spend hours animating. I often add style frames, which show the final look of a few key moments. This saves time, because big changes are cheap at the storyboard stage and expensive later.
3. **How do you organize a project in After Effects?**
   I name layers and compositions clearly and use folders for footage, assets and pre-compositions. I use pre-comps to group parts of the animation, so the main timeline stays simple. I link repeated values with controls or simple expressions, so one change updates everything. A clean project is easier to change later and to share with other designers.
4. **How do you animate text so it stays readable?**
   I keep text on screen long enough to read, often a little longer than it takes me to read it twice. I use clear fonts, enough size and good contrast with the background. The motion should support the words, not distract from them, so I avoid too many effects at once. I also keep important text inside the safe area for every format.
5. **Which render and export settings do you use?**
   For a master file I export a high-quality format, such as ProRes, from Adobe Media Encoder. For web and social media I export MP4 with H.264 at the right size and frame rate. When I need a transparent background, I use a format with an alpha channel, such as ProRes 4444. I check the final file on the target platform before delivery.
6. **How do you keep motion graphics consistent with a brand?**
   I follow the brand guidelines for colours, fonts and logo use. I create a small motion style, such as how fast things move and which easing curves we use, and I apply it everywhere. Reusable templates, such as Essential Graphics templates for lower thirds, help other editors use the same style. I review new work against older brand videos.
7. **How do you prepare animations for websites and apps?**
   For simple vector animations I often use Lottie, which plays animations from a small JSON file and stays sharp at any size. I export it from After Effects with a plugin such as Bodymovin and test it on the target devices. I keep the animation light, with few layers and no heavy effects that Lottie does not support. For longer animations, a compressed video file may be better.

### Fresher answers (first 3 role questions)

1. **How do keyframes and easing make motion look natural?**
   Keyframes set the start and end of a change, and easing makes the motion speed up and slow down. This looks more natural than linear motion.
2. **Why do you make a storyboard before animating?**
   A storyboard shows the key moments of the animation before I start. The client can approve the idea early, which saves time.
3. **How do you organize a project in After Effects?**
   I name layers clearly and group parts into pre-comps. A clean project is easier to change later.

### Junior extra questions

1. **How do you take a static design and turn it into an animation?**
   I first ask what the animation must communicate and how long it should be. I prepare the design file in layers, for example in Illustrator, and import it into After Effects. I plan the order in which elements appear, so the eye follows the message. Then I animate the key moments first and refine the timing.
2. **How do you sync animation to music or a voice-over?**
   I import the audio first and mark the beats or the key words on the timeline. I place the main movements on these marks, so the motion feels connected to the sound. I check that the animation does not run ahead of the voice-over. Small timing changes of a few frames can make a big difference.

### Senior extra questions

1. **How do you build a motion design system for a brand?**
   I define a set of rules, such as timing values, easing curves, transitions and how the logo animates. I build templates and examples, so editors and designers can use the rules without starting from zero. I document everything in a short guide with examples. I review the system with the brand team and update it when the brand changes.
2. **How do you plan a large motion graphics project with a tight deadline?**
   I agree on the script, the storyboard and the style frames early, because changes are cheapest there. I split the work into scenes and share them between designers, using shared templates and assets. I plan review points with the client for each stage. I keep a simple tracker, so everyone knows what is done and what is next.

## 2D Animator

- id: `anim2d`
- Role label: 2D Animator
- Profile role (setupRole): 2D Animator
- Suggested skills: 12 principles of animation, Frame-by-frame animation, Toon Boom Harmony, Blender Grease Pencil, After Effects, Storyboarding, Animatics, Character rigging, Timing, Drawing
- Search keywords: 2d animation, toon boom, grease pencil, frame by frame

### Role questions (Junior and Senior answers)

1. **Which of the 12 principles of animation do you use most, and how?**
   The 12 principles include squash and stretch, anticipation, follow-through, slow in and slow out, arcs and timing. I use anticipation to prepare the viewer for a big action, such as a small crouch before a jump. Follow-through and overlapping action make hair and clothes keep moving after the body stops. Arcs make movements look natural instead of robotic.
2. **How do frame rate and timing affect a 2D animation?**
   Animation is often made for 24 frames per second. Many animators work on twos, which means one drawing for every two frames, so 12 drawings per second. Fast actions may need ones for smoothness, while slower holds can use fewer drawings. The number of frames between key poses decides whether a move feels heavy, light, fast or slow.
3. **When do you use a rig and when do you animate frame by frame?**
   Frame-by-frame animation means drawing each pose, which gives full freedom and a hand-made feel but takes more time. A rig, also called cut-out animation, splits the character into parts that I move and reuse, which is faster for long series. Rigs suit characters that appear in many scenes, while frame by frame suits special moments, such as big effects. Many projects mix both.
4. **What is an animatic, and why is it useful?**
   An animatic is the storyboard put on a timeline with rough timing, voice and sound. It shows how long each shot lasts and whether the story works before the real animation starts. Problems with pacing are cheap to fix at this stage. The whole team uses it as a guide during production.
5. **Which 2D animation tools do you use?**
   I use Toon Boom Harmony for professional character animation, both frame by frame and rigged. Blender with Grease Pencil lets me draw 2D animation inside a 3D scene and is free. After Effects is useful for simple character rigs, for example with tools such as Duik, and for compositing. I choose the tool that fits the style and the pipeline of the studio.
6. **How do you polish an animation after the main poses are done?**
   I check the spacing between drawings, so the motion speeds up and slows down correctly. I add small details, such as blinks, breathing and secondary actions, to make the character feel alive. I clean up the line work, so lines stay the same thickness and do not wobble. I watch it in a loop many times and fix anything that pulls the eye in the wrong way.
7. **How do you take feedback from a director or a lead animator?**
   I make sure I understand the note and the goal behind it, and I ask for a reference if it helps. I fix the most important notes first, such as acting and timing, before small details. I share a new version quickly and mark what changed. Feedback helps the shot fit the whole film, so I do not take it personally.

### Fresher answers (first 3 role questions)

1. **Which of the 12 principles of animation do you use most, and how?**
   I use anticipation before big actions and follow-through after them. Arcs and slow in and slow out make motion look natural.
2. **How do frame rate and timing affect a 2D animation?**
   Animation is often 24 frames per second, and many animators draw on twos. The number of frames between poses sets the speed and weight.
3. **When do you use a rig and when do you animate frame by frame?**
   Frame by frame means drawing every pose, which looks hand-made but takes time. A rig reuses character parts, which is faster for long series.

### Junior extra questions

1. **How do you animate a simple walk cycle?**
   I start with the key poses: the contact pose, where the heel touches the ground, and the passing pose. Then I add the down and up poses to show weight. I keep the timing even, so the cycle loops without a jump. I check the arcs of the head and hands and add small overlapping motion at the end.
2. **How do you show emotion through character animation?**
   I start with the acting idea, often by recording myself or using reference video. Strong, clear poses tell the viewer what the character feels, even without sound. Timing helps a lot, for example slow movements for sadness and fast, sharp ones for surprise. I also use the eyes and small details, because the face shows emotion first.

### Senior extra questions

1. **How do you keep the animation style consistent on a team project?**
   I prepare model sheets and turnarounds for each character, plus examples of key poses and expressions. I agree on rules for timing and line work with the team. I review shots regularly and give clear notes with drawn corrections where possible. A shared library of rigs and assets keeps everyone working with the same parts.
2. **How do you plan the animation schedule for a short series?**
   I break the work into episodes, scenes and shots and estimate each one by difficulty. I plan the stages, such as animatic, layout, animation, clean-up and compositing, with review points. I give complex shots to senior animators and reuse rigs and backgrounds where possible. I track progress every week and adjust the plan early when a shot takes longer.

## 3D Animator

- id: `anim3d`
- Role label: 3D Animator
- Profile role (setupRole): 3D Animator
- Suggested skills: Maya, Blender, Keyframe animation, Graph editor, Motion capture cleanup, Body mechanics, Acting, Rig testing, FBX export, Rendering
- Search keywords: 3d animation, maya animation, motion capture, graph editor

### Role questions (Junior and Senior answers)

1. **How do you check that a character rig is ready for animation?**
   I test the controls in extreme poses, such as a full crouch or arms raised high, to see if the mesh deforms cleanly. I check that the skin weights do not pull the wrong parts, for example around the shoulders and elbows. I test IK and FK switching and make sure the controls are easy to select. If I find problems, I send clear notes with screenshots to the rigger.
2. **What is the difference between keyframe animation and cleaning up motion capture?**
   In keyframe animation I create every pose myself, which gives full control over timing and style. Motion capture records a real actor, so it is realistic and fast for large amounts of movement. Mocap data needs cleanup, such as removing jitter, fixing foot sliding and correcting contact with the ground. Often I also add keyframes on top to push the acting.
3. **How do you show weight in a 3D animation?**
   Heavy objects take more time to start and stop moving, so I adjust the timing and spacing to show that. I make the body react to weight, for example bending the knees and leaning back when lifting something heavy. Contact poses, where the feet push against the ground, must look solid. I study reference video to see how real bodies move.
4. **How do you use the graph editor in your work?**
   The graph editor shows each animated value as a curve over time. I use it to smooth the motion, fix sudden spikes and control how fast a move speeds up and slows down. Flat curves show holds, and steep curves show fast motion. I clean up the curves after blocking, which makes the animation feel polished.
5. **How do you take an animation from blocking to final polish?**
   In blocking I set the key poses with stepped keys, so the director can approve the timing and acting. Then I add breakdown poses and switch to spline curves to see the full motion. In polish I fix arcs, add overlapping action and small details, such as fingers and eyes. I check the shot from the camera view, because that is what the audience sees.
6. **How do you deliver an animation for a render or for a game engine?**
   For film or video, I hand the shot to lighting and rendering, for example with Cycles in Blender or Arnold in Maya. For a game engine, I bake the animation and export it as FBX with the correct frame rate, scale and naming. I make clean loops for cycles, such as walks and idles. I always check the result in the engine or the render, not only in my scene.
7. **How do you work with the modeling and rigging team?**
   I share my needs early, such as the poses and facial expressions a character must make. I give feedback when the topology around joints, such as elbows and knees, does not bend well. I report rig problems with clear steps and examples instead of working around them silently. Good communication saves time for everyone in the pipeline.

### Fresher answers (first 3 role questions)

1. **How do you check that a character rig is ready for animation?**
   I test the rig in extreme poses and check that the mesh bends cleanly. I send clear notes to the rigger if something breaks.
2. **What is the difference between keyframe animation and cleaning up motion capture?**
   Keyframe animation means I create every pose myself. Motion capture records an actor, but the data needs cleanup.
3. **How do you show weight in a 3D animation?**
   Heavy things take longer to start and stop, so I adjust the timing. The body also bends and leans to show the weight.

### Junior extra questions

1. **Which 3D animation software do you use?**
   I use Maya, which is common in film and game studios, and Blender, which is free and very capable. Both have a graph editor, constraints and good tools for character animation. I learn the shortcuts and the pipeline tools of the studio I work with. The principles of animation are the same in every program.
2. **How do you use reference video for animation?**
   I record myself or find clips of real people doing the action, such as jumping or throwing. I study the timing, the weight shifts and the small details frame by frame. I use the reference as a guide, not something to copy exactly, and push the poses for appeal. Good reference makes the acting more believable.

### Senior extra questions

1. **How do you lead a team of animators on a project?**
   I set the animation style with example shots and clear rules for timing and acting. I assign shots based on each animator's strengths and give clear notes in dailies. I protect the team from last-minute changes by agreeing on approvals at each stage. I also share tips and tools, so the whole team improves.
2. **How do you plan animation for a game with many characters?**
   I list every animation each character needs, such as idle, walk, run, jump and attacks, and the transitions between them. I work with the game designers to know the timing they need for gameplay. I reuse animations between similar characters with retargeting where possible. I test each set in the engine early, so problems are found before the full set is made.

# Parent: Content and Writing

## Content Writer

- id: `contentwriter`
- Role label: Content Writer
- Profile role (setupRole): Content Writer
- Suggested skills: Writing, Editing, Research, SEO basics, Content planning, Proofreading, WordPress, Google Docs, Fact checking, Social media writing
- Search keywords: content writing, blog writing, article writing, seo writing

### Role questions (Junior and Senior answers)

1. **How do you choose the right tone for an audience?**
   I first learn who the readers are, what they already know and what they need from the piece. A beginner guide needs simple words and examples, while a piece for experts can go deeper. I follow the brand style guide if there is one. I read the draft as if I were the reader and change anything that sounds wrong for them.
2. **How do you research a topic and check your facts?**
   I start with reliable sources, such as official websites, research papers and experts, and I avoid copying other blogs. I check important facts, such as numbers and dates, in at least two trusted sources. I keep a list of sources and link to them where it helps the reader. If I cannot confirm a fact, I leave it out.
3. **How do you structure an article and write strong headlines?**
   I plan an outline with a clear introduction, sections with useful subheadings and a short conclusion. The headline tells the reader what they will get, for example how to start a vegetable garden in five steps. I keep paragraphs short and use lists where they help scanning. The first lines must show quickly why the article is worth reading.
4. **How do you edit your own writing?**
   I take a short break after the first draft, so I can read it with fresh eyes. I cut words and sentences that do not add value and replace long words with simple ones. I read it aloud to find sentences that sound awkward. Finally, I check spelling and grammar, sometimes with a tool, but I make the final decisions myself.
5. **What SEO basics do you follow when you write?**
   I start with what the reader is searching for and why, which is called search intent. I use the main keyword naturally in the title, a subheading and the first paragraph, without stuffing it everywhere. I write a clear meta title and description and add links to related pages. Above all, I write useful, original content, because that is what search engines aim to reward.
6. **How do you manage deadlines and revision requests?**
   I agree on the brief, the deadline and the number of revisions before I start. I plan my week with time for research, writing and editing, and I tell the client early if something will be late. I keep all feedback in one document and work through it point by point. When feedback conflicts, I ask the client to decide which direction to follow.
7. **How do you avoid plagiarism and over-reliance on AI tools?**
   I write in my own words and give credit when I use someone else's ideas, quotes or data. I can use AI tools for ideas or an outline if the client allows it, but I check every fact and rewrite the text in my own voice. I add my own experience and examples, which AI cannot invent honestly. I also run a plagiarism check before I submit important work.

### Fresher answers (first 3 role questions)

1. **How do you choose the right tone for an audience?**
   I learn who the readers are and what they need. Then I choose simple or deeper language and follow the style guide.
2. **How do you research a topic and check your facts?**
   I use reliable sources and check important facts in at least two places. If I cannot confirm a fact, I leave it out.
3. **How do you structure an article and write strong headlines?**
   I plan an outline with clear subheadings and short paragraphs. The headline tells the reader what they will get.

### Junior extra questions

1. **How do you write content for social media posts?**
   I keep it short and put the most important message in the first line, because people scroll fast. I match the style of each platform, for example more professional on LinkedIn and more casual on Instagram. I add a clear call to action, such as read more or share your view. I check the post on a phone before it goes live.
2. **How do you update an old article so it stays useful?**
   I check the facts, numbers and links and replace anything that is out of date. I look at what readers search for now and add missing questions or sections. I remove parts that no longer help and improve the title if needed. Then I update the date and share the article again.

### Senior extra questions

1. **How do you plan a content calendar?**
   I start from the business goals and the questions our audience asks. I plan topics for each month, with a mix of formats, such as guides, case studies and short posts. Each piece has an owner, a deadline and a goal, such as traffic or sign-ups. I review the results every month and adjust the plan.
2. **How do you measure whether content is working?**
   I agree on the goal of each piece first, such as visits, time on page, sign-ups or shares. I track these numbers with analytics tools and compare similar pieces. I also read comments and feedback to understand what readers value. I update or remove content that does not perform and do more of what works.

## Technical Writer

- id: `techwriter`
- Role label: Technical Writer
- Profile role (setupRole): Technical Writer
- Suggested skills: Technical writing, Markdown, Git, API documentation, OpenAPI, Docs as code, Style guides, Information architecture, Editing, Diagrams
- Search keywords: technical writing, documentation, api docs, docs as code

### Role questions (Junior and Senior answers)

1. **How do you write the same topic for different readers?**
   I first find out who will read the document, such as new users, administrators or developers, and what they want to do. Beginners need more context, examples and screenshots, while experts want quick reference and exact details. I often split the content into a getting started guide, how-to guides and reference pages. Each page has one clear purpose.
2. **How do you write clear step-by-step instructions?**
   I start with what the user will achieve and what they need before they begin. Each step has one action, starts with a verb and is numbered in the right order. I show the expected result after important steps, so users know they are on track. I test the steps myself on a clean setup before publishing.
3. **What makes good API documentation?**
   Good API docs explain how to authenticate, show each endpoint with its parameters and give real request and response examples. They list error codes and what to do about each one. A quick start guide helps developers make their first successful call in a few minutes. Reference pages are often generated from an OpenAPI file, and I add explanations and examples around them.
4. **How do you get information from engineers who are busy?**
   I prepare before I meet them by reading the code, the tickets and the specs. I ask specific questions and record the session if they agree. I send drafts for review with clear questions, so the review takes little time. I also try the feature myself, which often answers many questions.
5. **What is docs as code, and how do you work with it?**
   Docs as code means we write documentation like software, in plain text files such as Markdown, stored in Git next to the code. Changes go through pull requests and reviews, just like code changes. A static site generator, such as Docusaurus or MkDocs, builds the documentation website automatically. This keeps docs versioned and makes it easy for engineers to contribute.
6. **Why do you follow a style guide, and which ones do you know?**
   A style guide keeps the voice, words and format consistent across all documents, even when many people write them. It covers things like active voice, how to name buttons and how to write headings. Common public guides are the Microsoft Writing Style Guide and the Google developer documentation style guide. Teams often add their own word list on top.
7. **How do you keep documentation up to date?**
   I make documentation part of the definition of done, so a feature is not finished until its docs are updated. I follow release notes and tickets to know what changes. I review the most visited pages regularly and fix outdated parts. I also give readers an easy way to report problems, such as a feedback button on each page.

### Fresher answers (first 3 role questions)

1. **How do you write the same topic for different readers?**
   I find out who will read it and what they want to do. Beginners get more context and examples, and experts get quick reference.
2. **How do you write clear step-by-step instructions?**
   Each step has one action and starts with a verb. I test the steps myself before I publish them.
3. **What makes good API documentation?**
   Good API docs show how to authenticate, list each endpoint and give real request and response examples. They also explain error codes.

### Junior extra questions

1. **How do you use screenshots and diagrams in documentation?**
   I use a screenshot when it helps users find something on the screen, and I highlight the important part. I keep screenshots few, because they become outdated when the interface changes. Diagrams explain how parts of a system connect, which is hard to describe in text. I always add short text, so the page is useful without the image and works with screen readers.
2. **How do you write release notes?**
   I group changes into new features, improvements and fixes and lead with what matters most to users. Each item explains the change and the benefit in one or two short sentences. I mention breaking changes clearly and say what users must do. I link to the detailed documentation for more information.

### Senior extra questions

1. **How do you plan the structure of a large documentation site?**
   I study how users look for information, using search data, support tickets and interviews. I organize content by the tasks users want to do, not by the internal team structure. I separate tutorials, how-to guides, reference and explanations, so each page has one job. I test the navigation with real users and improve it over time.
2. **How do you measure the quality of documentation?**
   I look at page feedback, search terms that return no results and the number of support tickets about documented topics. Analytics show which pages people visit and where they leave. I also run small usability tests, where users try to finish a task using only the docs. I use these signals to choose which pages to improve first.

## Copywriter

- id: `copywriter`
- Role label: Copywriter
- Profile role (setupRole): Copywriter
- Suggested skills: Copywriting, Brand voice, Headlines, Calls to action, Ad copy, Email marketing, A/B testing, Editing, Research, Persuasive writing
- Search keywords: copywriting, ad copy, brand voice, call to action

### Role questions (Junior and Senior answers)

1. **How do you write in a brand voice that is not your own?**
   I study the brand guidelines, past campaigns and the words the brand uses and avoids. I describe the voice in a few simple words, such as friendly, confident and clear, and check every line against them. I read competitor copy to see what makes this brand different. When I am unsure, I write two versions and ask the client which one fits.
2. **How do you write a strong headline and call to action?**
   A strong headline is clear first and clever second, and it tells the reader what they get. I write many options, often ten or more, and choose the best one. A call to action should say exactly what happens next, such as start your free trial, not just click here. I keep both short and test them when I can.
3. **What is the difference between features and benefits in copy?**
   A feature is what a product has or does, such as a 5000 mAh battery. A benefit is what that means for the customer, such as using your phone all day without charging. People buy benefits, so I lead with them and use features as proof. I ask so what after each feature until I reach the real benefit.
4. **How do you test two versions of copy to find the one that works better?**
   I test one change at a time, such as the headline or the button text, so I know what made the difference. I write a clear idea before the test, for example a benefit-led headline will get more clicks. I wait until enough people have seen both versions before I decide. I keep a record of the results, so the team learns what works for our audience.
5. **When do you write short copy and when do you write long copy?**
   Short copy suits ads, social posts and simple products that people understand quickly. Long copy suits expensive or complex products, where people need more information and trust before they decide. The length depends on what the reader needs, not on a fixed rule. Even long copy must be easy to scan, with clear headings and short paragraphs.
6. **How do you work from a brief and handle feedback?**
   I make sure the brief says the goal, the audience, the main message, the tone and the deadline, and I ask questions if something is missing. I share a first draft early, sometimes with two directions. I ask for feedback that links to the brief, not only personal taste. If feedback changes the goal, I agree on an updated brief before I continue.
7. **How do you make sure your claims in copy are honest?**
   I only write claims that the client can prove, such as test results or real customer numbers. I avoid words like best or guaranteed unless there is clear evidence. I follow advertising rules and platform policies and add clear terms where needed, such as for offers. Honest copy builds trust, which is worth more than one quick sale.

### Fresher answers (first 3 role questions)

1. **How do you write in a brand voice that is not your own?**
   I study the brand guidelines and past campaigns and describe the voice in a few simple words. Then I check every line against them.
2. **How do you write a strong headline and call to action?**
   A headline should be clear and tell the reader what they get. A call to action should say exactly what happens next.
3. **What is the difference between features and benefits in copy?**
   A feature is what the product has, and a benefit is what it means for the customer. I lead with the benefit.

### Junior extra questions

1. **How do you write an email that people open and read?**
   I write a short, clear subject line that gives a reason to open, and a preview line that supports it. The email focuses on one main message and one call to action. I keep paragraphs short, because many people read on their phones. I test subject lines when the email platform allows it.
2. **How do you write copy for a landing page?**
   I start with a headline that matches the ad or link that brought the visitor. Then I explain the main benefits, show proof, such as reviews or results, and answer common doubts. The call to action appears more than once, so visitors do not have to scroll back. Every section should move the visitor closer to one action.

### Senior extra questions

1. **How do you develop the messaging for a new product launch?**
   I start with research on the audience, their problems and the competitors. I write a short positioning statement and a few key messages, each with proof points. I test the messages with real customers or small ad campaigns before the launch. Then I adapt them for each channel, such as the website, ads and emails, so they stay consistent.
2. **How do you guide other writers to keep copy consistent?**
   I create a simple voice and tone guide with examples of good and bad copy. I keep a shared word list for product names and phrases we always or never use. I review drafts with clear, specific feedback that explains the reason. Regular reviews of live copy help us find places where the voice has drifted.

# Overlap check

No question text is repeated in any two categories (checked by `tests/practice/categories.test.mjs`), and none repeats a question of PR E (#46, not merged yet; checked by script). Where a new question shares a topic with an existing one, I wrote it to ask something different. Those pairs are below.

| New question | Related existing question | Why both stay |
| --- | --- | --- |
| UI/UX: steps to design a new screen or feature | Graphic Design: walk me through your design process | Research, flows, prototype and test for a product screen vs a visual design process |
| UI/UX: prepare a Figma file so developers can build it | Graphic Design: hand over a design to developers | Figma components, states and Dev Mode vs handing over visual assets |
| UI/UX: components and tokens for a design system in Figma | Graphic Design: build and maintain a brand identity system; Frontend: build a design system for a frontend team | Design-side components and variables vs a brand system vs coded components |
| UI/UX: design for accessibility and colour contrast | Web Developer: make a website accessible | Design choices (contrast ratios, colour, targets) vs code (markup, ARIA, keyboard) |
| UI/UX: design a form that is easy to complete | Frontend: forms and validation in React | Labels, fields and messages vs form state and validation code |
| Product Designer: use metrics to judge a design change | Graphic Design: measure whether a design was successful; PR E Product Manager: A/B testing for product decisions | Product metrics for a UI change vs creative results vs the product decision |
| Product Designer: run a design critique | Graphic Design: handle negative feedback on your design | Running a team review vs receiving criticism |
| Product Designer: work with product managers and engineers | PR E Product Manager: work with the engineering team | The designer view vs the product manager view |
| UX Researcher: plan and run a user interview | PR E Product Manager: user research as a product manager; Marketing: research a target audience | Interview method in depth vs research as one PM task vs market research |
| UX Researcher: run a usability test | PR E Game Designer: run a playtest | Task completion in a product vs fun and difficulty in a game |
| Video Editor: color correction vs color grading | Graphic Design: RGB vs CMYK | Video color work vs print color models |
| Video Editor: export settings for platforms; Motion Graphics: render and export settings | (each other) | Edited video for each platform vs animation masters, alpha channels and web formats |
| Motion Graphics: keep motion consistent with a brand | Graphic Design: keep designs consistent across social media posts | Timing and easing rules vs static layouts |
| 2D Animator: 12 principles of animation; 3D Animator: show weight | (each other) | Principles in 2D drawing vs body mechanics in 3D |
| 3D Animator: check a rig before animating; work with the modeling and rigging team | PR E Game Artist: rig and animate a character for a game | Testing someone else's rig as an animator vs building the rig and skin weights as the artist |
| 3D Animator: deliver for a render or a game engine | PR E Game Artist: get your art working in the game engine | Baked animation and FBX timing vs model scale, pivots and materials |
| Content Writer: SEO basics | Marketing: identify a target audience | Writing for search intent vs choosing who to market to |
| Content Writer: choose the right tone for an audience; Copywriter: write in a brand voice | (each other) | Tone for readers of an article vs one brand voice across campaigns |
| Content Writer (Senior): measure whether content is working | Marketing: measure the success of a campaign | Article metrics vs campaign results |
| Copywriter: test two versions of copy | PR E Product Manager: A/B testing for product decisions; Data Analyst: what an A/B test is | Testing one line of copy vs product decisions vs the analysis |
| Technical Writer: docs as code with Markdown and Git | Software Developer: what you know about Git and version control | Documentation workflow vs Git basics |
