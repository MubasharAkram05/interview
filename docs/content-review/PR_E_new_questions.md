# PR E: new questions for review

For review only. This file is not part of the app (the app reads src/data/more-questions.js).

Every category also has the shared opening and closing questions (not repeated here). Fresher shows the first 3 role questions with the simpler Fresher answer; Junior and Senior show all 7 role questions with the full answer, plus their 2 extra questions. Counts per level: Fresher 10, Junior 19, Senior 19.

- **Game Development**
  - [Game Development](#game-development)
  - [Unity Developer](#unity-developer)
  - [Unreal Developer](#unreal-developer)
  - [Game Designer](#game-designer)
  - [Game Artist](#game-artist)
  - [Game Tester](#game-tester)
- **Testing and QA**
  - [QA Tester](#qa-tester)
  - [Automation Tester](#automation-tester)
- **Business and Product**
  - [Business Analyst](#business-analyst)
  - [Product Manager](#product-manager)
  - [Product Owner](#product-owner)
- **System Administrator**
  - [System Administrator](#system-administrator)

# Parent: Game Development

## Game Development

- id: `gamedev`
- Role label: Game Developer
- Profile role (setupRole): Game Developer
- Suggested skills: C#, C++, Unity, Unreal Engine, Game loop, Physics, Math for games, Performance profiling, Git, Debugging
- Search keywords: game developer, game programmer, game engine, gameplay

### Role questions (Junior and Senior answers)

1. **What is a game loop, and how does it work?**
   A game loop runs again and again while the game is open. In each pass it reads input, updates the game state and draws the next frame. I use delta time, the time since the last frame, so movement looks the same on fast and slow devices. Physics often runs on a fixed time step, so it stays stable.
2. **How do you choose a game engine for a project?**
   I look at the target platforms, the team skills and the type of game. Unity with C# is a strong choice for mobile, 2D and smaller 3D games. Unreal Engine with C++ and Blueprints suits high-end 3D graphics. Godot is a light, open-source option for small teams. I also check the licence terms and the cost before I decide.
3. **How does collision detection work in a game?**
   Each object gets a simple collider shape, such as a box, a sphere or a capsule, instead of its full mesh. The engine first finds pairs of objects that are close, which is the broad phase, and then checks the exact shapes, which is the narrow phase. A trigger only reports the overlap and does not push objects apart. For very fast objects I use continuous collision detection, so they do not pass through thin walls.
4. **How do you keep a game running at a smooth frame rate?**
   I set a target, such as 60 frames per second, and measure with the profiler before I change anything. Common fixes are fewer draw calls, smaller textures, simpler shaders and level of detail models for far objects. In code I avoid creating new objects every frame, because that triggers garbage collection pauses. I test on the weakest device we support, not only on my own computer.
5. **How do you manage game states such as menu, playing and paused?**
   I use a state machine, where the game is in exactly one state at a time, such as main menu, playing, paused or game over. Each state has clear enter and exit steps, for example pausing stops the game time and shows the pause menu. Only allowed changes can happen, so the game cannot jump from the menu straight to game over. This keeps the logic simple and easy to debug.
6. **What is an asset pipeline in game development?**
   The asset pipeline is the path that models, textures, sounds and animations take from the artist to the running game. Assets are exported in agreed formats, such as FBX or PNG, with clear names and folders. The engine imports them with the right compression and settings for each platform. A clean pipeline saves time and keeps the build size under control.
7. **How do you use version control on a game project?**
   I use Git for code and Git LFS for large binary files, such as textures and audio. Many larger studios use Perforce, because it handles huge files and lets people lock a file while they edit it. Binary files like scenes cannot be merged easily, so locking avoids lost work. I commit small changes with clear messages and keep the main branch always playable.

### Fresher answers (first 3 role questions)

1. **What is a game loop, and how does it work?**
   A game loop repeats while the game runs. Each time it reads input, updates the game and draws a new frame.
2. **How do you choose a game engine for a project?**
   I choose an engine based on the platform, the team and the game. Unity suits mobile and 2D games, and Unreal suits high-end 3D games.
3. **How does collision detection work in a game?**
   Objects get simple collider shapes, and the engine checks when two shapes touch. A trigger only reports the touch and does not block movement.

### Junior extra questions

1. **What is the difference between Update and a fixed time step in game code?**
   Update runs once per frame, so it runs more often on a fast device and less often on a slow one. A fixed time step runs at a steady rate, for example 50 times per second, whatever the frame rate is. I put input and visual changes in the frame update, and physics and forces in the fixed step. This keeps physics results the same on every device.
2. **How do you save and load player progress in a game?**
   I collect the data that matters, such as level, score and settings, into a small save object. I turn it into JSON or a binary format and write it to the save folder of the platform. I add a version number, so an older save can still load after an update. For online games the server keeps the important data, so players cannot edit it easily.

### Senior extra questions

1. **How do you plan the technical side of a new game?**
   I start with the target platforms, the frame rate goal and the memory and download budgets. I build a small vertical slice early to test the riskiest systems, such as networking or large levels. I agree on code structure, naming and the asset pipeline before the team grows. I also plan time for performance work and testing, not only for new features.
2. **A game crashes only on some phones. How do you track down the cause?**
   I collect crash reports with the device model, the OS version and the stack trace from a crash reporting tool. I look for a pattern, such as low memory devices or one graphics driver. Then I try to reproduce it on the same kind of device and add logs around the failing code. After the fix, I keep watching the crash rate for that group of devices.

## Unity Developer

- id: `unity`
- Role label: Unity Developer
- Profile role (setupRole): Unity Developer
- Suggested skills: C#, Unity, Prefabs, ScriptableObjects, Physics, Unity UI, Animation, Unity Profiler, Mobile optimization, Git
- Search keywords: unity, unity3d, monobehaviour, prefab

### Role questions (Junior and Senior answers)

1. **What is the order of Awake, Start, Update and FixedUpdate in a MonoBehaviour?**
   Awake runs first, when the object is loaded, even if the script is disabled. Start runs once before the first frame update, but only if the script is enabled. Update runs every frame, and FixedUpdate runs on the fixed physics time step, so it can run zero or several times in one frame. I set up references in Awake and use other objects in Start, when they are ready.
2. **What is the difference between a prefab and a ScriptableObject in Unity?**
   A prefab is a saved GameObject with its components, which I can place in a scene many times, such as an enemy or a bullet. A ScriptableObject is a data asset that does not live in a scene, such as the stats of a weapon. Many objects can read the same ScriptableObject, which saves memory and keeps settings in one place. I use prefab variants when I need small changes of one base prefab.
3. **What are coroutines in Unity, and when do you use them?**
   A coroutine is a method that returns IEnumerator and can pause with yield return, then continue on a later frame. I use it for timed steps, such as a fade or a spawn every two seconds, without a timer in Update. Coroutines run on the main thread, so they are not separate threads. A coroutine stops when its GameObject is disabled or destroyed.
4. **What is object pooling, and why is it useful in Unity?**
   Object pooling means I create a set of objects once, such as bullets, and reuse them instead of calling Instantiate and Destroy again and again. When a bullet is done, I disable it and return it to the pool. This avoids garbage collection spikes and keeps the frame rate smooth. Unity has a built-in ObjectPool class that I can use for this.
5. **How do you use layers and the collision matrix in Unity physics?**
   I put objects on layers, such as Player, Enemy and Ground. In the physics settings, the layer collision matrix decides which layers can collide, so enemy bullets can ignore other enemies. I also use a LayerMask in raycasts, so a ray only checks the layers I need. This makes physics faster and avoids strange collisions.
6. **How do you build a game UI in Unity that works on different screen sizes?**
   I use a Canvas with a Canvas Scaler set to scale with screen size and a reference resolution. I place elements with anchors, so they stay in the right corner on wide and tall screens. I keep the safe area in mind for phones with a notch. I split often-changing parts, such as a timer, onto their own canvas, so the whole UI does not rebuild every frame.
7. **How do you use the Unity Profiler and reduce the build size?**
   I connect the Profiler to a real device build and look at the CPU, rendering and memory sections to find the slowest part of a frame. The Frame Debugger shows how many draw calls a frame needs. For build size, I read the build report, compress textures and audio and remove unused assets and packages. Addressables let me load large content later instead of putting everything in the first download.

### Fresher answers (first 3 role questions)

1. **What is the order of Awake, Start, Update and FixedUpdate in a MonoBehaviour?**
   Awake runs first when the object loads, and Start runs once before the first frame. Update runs every frame, and FixedUpdate runs on the physics time step.
2. **What is the difference between a prefab and a ScriptableObject in Unity?**
   A prefab is a reusable GameObject that I can place many times in a scene. A ScriptableObject is a data asset that many objects can share.
3. **What are coroutines in Unity, and when do you use them?**
   A coroutine can pause with yield return and continue later, for example after one second. It runs on the main thread.

### Junior extra questions

1. **How do you move a character in Unity with physics?**
   I add a Rigidbody and a collider to the character and read the input in Update. Then I apply the movement in FixedUpdate, for example by setting the velocity or using MovePosition. I avoid changing the transform directly on a physics object, because that can break collisions. For simple platformers I often use a CharacterController instead.
2. **How do scripts talk to each other in Unity?**
   The simplest way is a reference set in the Inspector, or GetComponent on the same object, cached in Awake. For looser links I use C# events or UnityEvents, so one script raises an event and others listen. I avoid calling Find every frame, because it is slow. A ScriptableObject can also act as a shared channel between scenes.

### Senior extra questions

1. **How do you structure a large Unity project so the team can work well?**
   I split the code into assembly definitions, so changes compile faster and dependencies stay clear. I keep a clear folder structure and naming rules for scenes, prefabs and scripts. Scenes are split into smaller parts, so two people do not edit the same file at the same time. I use ScriptableObjects for settings and add automated tests for core game logic.
2. **How do you optimize a Unity game for low-end Android phones?**
   I profile on a real low-end phone, not in the editor. I reduce draw calls with batching and texture atlases, use compressed textures such as ASTC and lower the shadow and post-processing settings. In code I remove allocations in Update and pool objects. I also give players quality settings, so they can choose speed or better graphics.

## Unreal Developer

- id: `unreal`
- Role label: Unreal Developer
- Profile role (setupRole): Unreal Developer
- Suggested skills: C++, Blueprints, Unreal Engine 5, Gameplay Framework, Materials, Animation Blueprints, Replication, Unreal Insights, Perforce, Git
- Search keywords: unreal, unreal engine, ue5, blueprints

### Role questions (Junior and Senior answers)

1. **When do you use Blueprints and when do you use C++ in Unreal Engine?**
   Blueprints are visual scripts that are quick to build and easy for designers to change. C++ is faster and better for core systems, heavy logic and code that many classes share. A common approach is to write the base class in C++ and expose values and functions to Blueprints. Designers then build the details in a Blueprint child class.
2. **What is the difference between an Actor and a Component in Unreal?**
   An Actor is any object that can be placed in a level, such as a door, a light or the player. A Component is a part that adds a feature to an Actor, such as a mesh, a collision box or a health system. A Scene Component has a position, so it can be attached to other components. I build Actors from small, reusable Components instead of one large class.
3. **What do GameMode, Pawn and PlayerController do in Unreal?**
   The GameMode holds the rules of the game, such as how players join and when a match ends, and it exists only on the server. A Pawn is the body in the world that a player or the AI controls, and a Character is a Pawn with walking movement. The PlayerController reads the player input and possesses a Pawn. It stays when the Pawn dies, so the player can get a new one.
4. **How does replication work in Unreal multiplayer?**
   Unreal uses a server-authoritative model, so the server holds the true state of the game. Actors marked to replicate send chosen properties from the server to the clients. I mark a property with Replicated in its UPROPERTY and register it in GetLifetimeReplicatedProps. For actions, I use RPCs: a Server RPC sends a request from the client, and the server checks it before it acts.
5. **How do you work with materials and material instances in Unreal?**
   A material is a node graph that defines how a surface looks, such as its color, roughness and normal map. Changing a material can mean compiling new shaders, which takes time. A material instance uses a parent material and only changes exposed parameters, such as a color or a texture. I use instances for variations, because they are faster to create and cheaper at runtime.
6. **Why do you mark object pointers with UPROPERTY in Unreal C++?**
   Unreal has a garbage collector for UObjects. It only knows about a pointer when the pointer is marked with UPROPERTY, so it does not delete an object that is still in use. A raw pointer without UPROPERTY can point to an object that was already collected, which causes crashes. In Unreal Engine 5 I use TObjectPtr for these members and TWeakObjectPtr when I do not want to keep the object alive.
7. **How do you profile performance in Unreal Engine?**
   I start with the stat unit command to see whether the game thread, the render thread or the GPU is the slow part. Then I use Unreal Insights to record a session and find the expensive functions. For the GPU, I use the GPU profiler to see which passes cost the most. I always profile a packaged build on the target hardware, not only in the editor.

### Fresher answers (first 3 role questions)

1. **When do you use Blueprints and when do you use C++ in Unreal Engine?**
   Blueprints are visual scripts that are quick to build and change. C++ is faster, so I use it for core systems and expose parts to Blueprints.
2. **What is the difference between an Actor and a Component in Unreal?**
   An Actor is an object placed in a level, such as a door. A Component adds a feature to an Actor, such as a mesh or a collision box.
3. **What do GameMode, Pawn and PlayerController do in Unreal?**
   The GameMode holds the game rules on the server. The PlayerController reads input and controls a Pawn, which is the body in the world.

### Junior extra questions

1. **How do you expose a C++ variable or function to Blueprints?**
   For a variable I use UPROPERTY with specifiers such as EditAnywhere and BlueprintReadWrite, so designers can see and change it. For a function I use UFUNCTION with BlueprintCallable, so Blueprints can call it. BlueprintImplementableEvent lets the Blueprint provide the code for an event that C++ calls. I add a category, so the values are easy to find in the editor.
2. **What is the Enhanced Input system in Unreal Engine 5?**
   Enhanced Input is the input system in Unreal Engine 5. I create Input Actions, such as Jump or Move, and map keys and buttons to them in an Input Mapping Context. I can add or remove contexts at runtime, for example a different set while driving a car. Modifiers and triggers handle things like dead zones and holding a button.

### Senior extra questions

1. **How do you keep a large Unreal project fast to build and easy to change?**
   I split the code into modules and plugins with clear dependencies. I keep headers light with forward declarations, so a change does not rebuild half the project. I agree on which logic lives in C++ and which in Blueprints, so Blueprint graphs do not grow huge. I also use data assets and data tables for settings that designers change often.
2. **How do you reduce network bandwidth in an Unreal multiplayer game?**
   I replicate only what clients really need and use conditions, such as owner only, for private data. I lower the update frequency of less important Actors and use relevancy, so far away Actors are not sent at all. I prefer replicated properties over frequent RPCs for state. I measure with the network profiling tools before and after each change.

## Game Designer

- id: `gamedesigner`
- Role label: Game Designer
- Profile role (setupRole): Game Designer
- Suggested skills: Game mechanics, Level design, Prototyping, Game balance, Game design documents, Playtesting, Unity, Excel, Narrative design, Player psychology
- Search keywords: game design, level design, level designer, game mechanics

### Role questions (Junior and Senior answers)

1. **What is a core loop in game design?**
   The core loop is the main set of actions a player repeats, such as fight, collect rewards and upgrade, then fight again. It must be fun on its own, because the player spends most of the time inside it. Longer goals, such as unlocking new areas, sit on top of the core loop. When I design a game, I test the core loop first before I add more content.
2. **How do you balance a game economy?**
   I list the sources that give players currency, such as rewards, and the sinks that take it away, such as upgrades. I model the flow in a spreadsheet to see how much a player earns and spends per hour. If players earn too much, rewards lose value, and if they earn too little, they feel stuck. I check the real numbers from playtests and adjust in small steps.
3. **How do you design a good level?**
   I start with the goal of the level, such as teaching a new skill or testing what the player has learned. I build a quick blockout with simple shapes to test the layout and the pacing before any art is added. I guide the player with light, landmarks and paths instead of long text. I mix harder parts with quiet moments, so the player can rest.
4. **Why do you prototype a game idea, and how do you do it?**
   A prototype tests whether an idea is fun before the team spends months on it. I keep it fast and rough, for example a paper version of the rules or a grey box level with simple shapes. I test one question at a time, such as whether the jump feels good. If the idea is not fun, I change it or drop it early, when it is still cheap.
5. **How do you run a playtest and use the feedback?**
   I give players a clear task and watch them play without helping or explaining. I note where they get confused, stuck or bored, because what they do is often more useful than what they say. After the session I ask a few open questions. Then I look for patterns across several players before I change the design.
6. **What goes into a game design document?**
   A game design document describes the vision, the core loop, the mechanics, the controls, the levels and the progression. It also lists the target players and the platforms. I keep it short, clear and up to date, with pictures and examples, because a long document nobody reads does not help. Many teams now use a one-page summary and a wiki that grows with the game.
7. **How do you design monetization in a fair and ethical way?**
   I want players to pay because they enjoy the game, not because they feel tricked. I prefer cosmetic items and clear prices, and I avoid pay to win, where money beats skill. If there are random rewards, I show the odds clearly and follow the store rules and local laws. I am extra careful with games that children may play.

### Fresher answers (first 3 role questions)

1. **What is a core loop in game design?**
   The core loop is the main set of actions a player repeats, such as fight, collect and upgrade. It must be fun on its own.
2. **How do you balance a game economy?**
   I list where players get currency and where they spend it. I check the flow in a spreadsheet and adjust it after playtests.
3. **How do you design a good level?**
   I start with the goal of the level and build a simple blockout first. I guide the player with light and landmarks instead of long text.

### Junior extra questions

1. **How do you make a game easy to learn but hard to master?**
   I teach one mechanic at a time and let the player practise it in a safe place first. Then I combine mechanics in new ways, so there is more depth for skilled players. I keep the controls simple and add depth through choices, not more buttons. Playtests show me if the first minutes are clear enough.
2. **How do you tell whether a game is too hard or too easy?**
   I watch playtesters and track data, such as how many times players fail at each point and where they quit. A sudden drop in players at one level often means a difficulty spike. I compare new and experienced players, because they feel difficulty differently. Then I adjust things like enemy health, timing or checkpoints in small steps.

### Senior extra questions

1. **How do you keep the design vision clear across a large team?**
   I write a short vision statement and a few design pillars, such as fast combat or exploration, and check every feature against them. I share them often in reviews, so everyone knows why we make each decision. When a feature does not support a pillar, I cut or change it. I also keep the design document current, so new team members can catch up.
2. **How do you use player data to improve a live game?**
   I agree on the key metrics with the team, such as retention after day one and day seven, session length and where players drop off. When a number changes, I look at the data together with player feedback to find the reason. I test changes with A/B tests where it is fair and possible. I always respect player privacy and the store rules.

## Game Artist

- id: `gameartist`
- Role label: Game Artist
- Profile role (setupRole): Game Artist
- Suggested skills: Photoshop, Blender, Maya, Substance Painter, 2D art, 3D modeling, Texturing, Rigging, Animation, Unity
- Search keywords: game art, 3d artist, 2d artist, blender

### Role questions (Junior and Senior answers)

1. **What is your process for making a 3D game asset?**
   I start from concept art and references, then build a high-detail model if the asset needs it. I make a low poly game model, unwrap the UVs and bake details, such as a normal map, from the high model. Then I paint PBR textures, for example in Substance Painter. Finally I export the model, often as FBX, and check it in the engine.
2. **How do you create and prepare 2D sprites for a game?**
   I draw the sprite at the right size for the game, keeping the same pixel density for all characters. I keep animations in frames of the same size and pack sprites into a sprite sheet or atlas. I set the pivot point at the right place, such as the feet of a character. Then I check the sprites in the engine, because they can look different from my drawing tool.
3. **How do you optimize textures for a game?**
   I use the smallest texture size that still looks good on screen, often in power of two sizes such as 512 or 1024. I combine small textures into an atlas to reduce draw calls. I let the engine compress textures with the right format for each platform, such as ASTC on mobile. I also turn on mipmaps for 3D objects, so far objects use smaller versions.
4. **How do you rig and animate a character for a game?**
   I build a skeleton of bones that matches the character, then skin the mesh to the bones and paint the weights, so joints bend cleanly. I add controls and inverse kinematics to make posing faster. I animate key poses first and then add timing and follow-through. I keep bone names and counts within what the engine and the target devices can handle.
5. **How do you keep the art style consistent in a game?**
   I follow a style guide with the color palette, the shapes, the line style and example images. I compare new assets side by side with approved ones in the game, not only in my tool. I use shared materials and textures where possible. When several artists work together, we review our work together regularly to stay on the same style.
6. **What is a polygon budget, and how do you work within it?**
   A polygon budget is the number of triangles an asset may use, so the game runs well on the target devices. Main characters get more triangles than small props or far background objects. I put detail where the player looks and use normal maps for small surface details instead of more polygons. I also make lower detail versions, called LODs, for when the object is far away.
7. **How do you get your art working correctly in the game engine?**
   I agree on the scale, the units and the export settings with the developers before I start. I set the correct pivot, apply transforms and use clear names before I export. In the engine I check the import settings, the materials and the lighting. I test the asset in a real level on the target device, because that is what the player will see.

### Fresher answers (first 3 role questions)

1. **What is your process for making a 3D game asset?**
   I start from references, model the asset, unwrap the UVs and paint the textures. Then I export it and check it in the engine.
2. **How do you create and prepare 2D sprites for a game?**
   I draw sprites at a consistent size and pack them into a sprite sheet. I set the pivot point and check them in the engine.
3. **How do you optimize textures for a game?**
   I use small texture sizes that still look good and combine textures into an atlas. The engine compresses them for each platform.

### Junior extra questions

1. **What is the difference between a normal map and a height map?**
   A normal map stores the direction of the surface for each pixel, so light reacts as if there are small bumps, without extra polygons. A height map stores how high each point is, as a grey image. Height maps are often used for displacement or for parallax effects. In games, normal maps are more common because they are cheaper to render.
2. **How do you take feedback on your art from the art lead?**
   I listen carefully and ask questions until I understand the goal behind the feedback. I write down the changes and agree on what is most important. Then I update the asset and show it again in the game, not only as a picture. Feedback helps the whole game look better, so I do not take it personally.

### Senior extra questions

1. **How do you set up an art pipeline for a new game?**
   I agree with the tech team on the budgets for polygons, textures and materials for each platform. I write naming rules, folder rules and export settings, and I prepare templates and example assets. Where possible, we automate checks, such as texture size and naming, during import. I review the first assets in the engine early, so problems are found before many assets are made.
2. **How do you plan art production when the deadline is tight?**
   I list all the assets and sort them by how visible and important they are to the player. I use modular pieces and shared materials, so one set of parts builds many objects. I agree on a simple first version for every asset, then polish the most visible ones. I share progress and risks with the producer early, so the scope can change in time.

## Game Tester

- id: `gametester`
- Role label: Game Tester
- Profile role (setupRole): Game Tester
- Suggested skills: Test cases, Bug reporting, Jira, Regression testing, Playtesting, Compatibility testing, Performance testing, Exploratory testing, Attention to detail, Communication
- Search keywords: game qa, game testing, playtester, video game tester

### Role questions (Junior and Senior answers)

1. **How do you write test cases for a new game feature?**
   I read the design for the feature and list what the player should be able to do, such as buy an item in the shop. For each part I write steps, the expected result and edge cases, such as not enough coins or a full inventory. I also cover different devices, controls and languages if the game supports them. I keep the cases short, so other testers can run them quickly.
2. **What do you include in a bug report for a game?**
   I write a short, clear title, then the build number, the platform and the device. I add exact steps to reproduce the bug, the expected result and what actually happened. I note how often it happens, for example 3 out of 5 tries, and attach a video or screenshot. This lets the developer find and fix the bug without asking me again.
3. **What is regression testing in a game project?**
   Regression testing checks that new changes did not break things that worked before. After each new build, I run a set of important tests, such as starting the game, saving and loading and the main menus. When a bug is fixed, I test the fix and also the areas around it. This is important in games, because one change can affect many systems.
4. **How do you test the performance of a game?**
   I check the frame rate, the loading times, the memory use and the battery and heat on mobile. I test in the busiest scenes, such as many enemies or large open areas. I record the numbers on each device, so we can compare them between builds. If the frame rate drops, I report where it happens and how to reach that place.
5. **How do you test a game on many different devices?**
   I use a device list with low, mid and high-end models, different screen sizes and different operating system versions. I check that the game installs, starts, shows the UI correctly and runs smoothly on each one. I pay attention to notches, aspect ratios and controllers. When a bug appears on only one device, I note the exact model and version.
6. **What is the difference between playtesting and functional game testing?**
   Functional testing checks that the game works as designed, such as buttons, rules and saving. Playtesting checks the experience, such as whether the game is fun, clear and fair. In functional testing I follow test cases and report bugs. In playtesting I share how the game feels, where I got bored or confused and what I enjoyed.
7. **How do you report balance problems you notice while testing a game?**
   I describe the problem with facts, such as how many tries a level took or how one weapon wins every fight. I compare it with the design goal if I know it. I suggest it as feedback, not as a bug, unless the numbers are different from the design. The designers decide the change, but clear data helps them decide faster.

### Fresher answers (first 3 role questions)

1. **How do you write test cases for a new game feature?**
   I list what the player should be able to do in the feature and write steps and expected results. I also add edge cases, such as not enough coins.
2. **What do you include in a bug report for a game?**
   I add a clear title, the build and device, the steps, the expected and actual result and a video. Then the developer can repeat the bug easily.
3. **What is regression testing in a game project?**
   Regression testing checks that new changes did not break old features. I test the main parts of the game in every new build.

### Junior extra questions

1. **How do you test a game feature that has no written design?**
   I first ask the designer or the producer what the feature should do and write down the answers. Then I explore the feature freely and note anything that looks wrong or unclear. I compare it with similar features already in the game. I report open questions separately from bugs, so they are not lost.
2. **A bug happens only sometimes. How do you report it?**
   I try to repeat it many times and note what was different when it happened, such as the device, the network or the order of my actions. I record a video as soon as I see it again. In the report I write how often it happens, for example 2 out of 10 tries. I also attach logs if the build allows it.

### Senior extra questions

1. **How do you plan testing for a game launch on several platforms?**
   I list every platform and its store requirements, because consoles and app stores have their own certification rules. I plan full test passes, regression passes and a final check of the release build. I track open bugs by severity and agree with the team which ones must be fixed before launch. I also plan testing for the first update, because players will find new issues quickly.
2. **How do you decide which game bugs must be fixed before release?**
   I look at how badly the bug affects players and how many players will see it. Crashes, lost progress, payment problems and blockers that stop players are always top priority. Small visual issues in rare places can often wait for an update. I give the team clear facts, and the producer makes the final decision with us.

# Parent: Testing and QA

## QA Tester

- id: `qa`
- Role label: QA Tester
- Profile role (setupRole): QA Tester
- Suggested skills: Test cases, Test plans, Manual testing, Bug reporting, Jira, Regression testing, Exploratory testing, SDLC, STLC, Postman
- Search keywords: manual testing, manual tester, software tester, test cases

### Role questions (Junior and Senior answers)

1. **Which techniques do you use to design test cases?**
   I use equivalence partitioning, where I split input into groups that should behave the same and test one value from each group. With boundary value analysis I test the edges, such as 0, 1, 99 and 100 for a field that accepts 1 to 100. For rules with many conditions I use a decision table. These techniques find more bugs with fewer test cases.
2. **What is the difference between severity and priority of a bug?**
   Severity is how much the bug affects the system, such as a crash or data loss. Priority is how soon it must be fixed, which depends on the business. A spelling mistake in the company name on the home page is low severity but high priority. A crash in a rarely used old report can be high severity but lower priority.
3. **What is the difference between smoke, sanity and regression testing?**
   Smoke testing is a quick check of the main functions on a new build, such as login and the home page, to decide if the build is stable enough to test. Sanity testing is a short, focused check after a small change or bug fix. Regression testing is wider and checks that existing features still work after changes. Smoke and sanity are fast, while regression takes more time.
4. **What does a test plan contain?**
   A test plan describes the scope, which means what we will test and what we will not test. It lists the approach, the types of testing, the environments, the people and the schedule. It also sets the entry and exit criteria, for example when testing can start and when it is complete. Finally, it lists the risks and how we will reduce them.
5. **What is exploratory testing, and when is it useful?**
   Exploratory testing means I learn the feature, design tests and run them at the same time, without fixed scripts. I use a short mission, called a charter, and a time box, such as 60 minutes, and I take notes as I go. It is useful for new features, unclear requirements and finding bugs that scripted tests miss. It works best together with planned test cases, not instead of them.
6. **What are the SDLC and the STLC?**
   The SDLC is the software development life cycle, with phases such as requirements, design, development, testing, release and maintenance. The STLC is the software testing life cycle inside it. Its phases are requirement analysis, test planning, test case design, test environment setup, test execution and test closure. Testing should start early, at the requirements stage, because bugs found early are cheaper to fix.
7. **How do you test a login page?**
   I test valid login, wrong password, unknown user and empty fields, and check that the error messages are clear and do not reveal which part was wrong. I check the password field hides the text and that login works with the Enter key. I test locking after many failed attempts, logout and what happens when the session expires. I also check it on different browsers and on a phone.

### Fresher answers (first 3 role questions)

1. **Which techniques do you use to design test cases?**
   I split inputs into groups and test one value from each group. I also test the edges, such as the smallest and largest allowed values.
2. **What is the difference between severity and priority of a bug?**
   Severity is how badly a bug affects the system. Priority is how soon it must be fixed for the business.
3. **What is the difference between smoke, sanity and regression testing?**
   Smoke testing is a quick check that a new build is stable. Sanity testing checks a small change, and regression testing checks that old features still work.

### Junior extra questions

1. **What is the life cycle of a bug?**
   A new bug is reported and then reviewed and assigned to a developer. The developer fixes it and marks it as fixed, and then I retest it. If the fix works, I close the bug, and if not, I reopen it with details. Some bugs are marked as duplicate, rejected or deferred to a later release.
2. **How do you test an API with Postman?**
   I create a request with the method, the URL, the headers and the body, and send it. I check the status code, the response body and the response time. I write simple tests in Postman, for example that the status is 200 and a field has the right value. I also test wrong input, missing fields and missing authentication.

### Senior extra questions

1. **How do you decide what to test when time is short?**
   I use risk-based testing. I list the features and rate them by how likely they are to fail and how much damage a failure would cause. I test the high-risk areas first, such as payments, login and new code. I tell the team clearly what was not tested, so the release decision is made with full information.
2. **How do you measure and improve the quality of the testing process?**
   I track a few useful numbers, such as bugs found after release, how long bugs stay open and test coverage of the requirements. When a bug escapes to production, I look at why our tests missed it and add a test for it. I review test cases regularly and remove ones that no longer add value. I share the results with the team and focus on learning, not blame.

## Automation Tester

- id: `autotest`
- Role label: Automation Tester
- Profile role (setupRole): Automation Tester
- Suggested skills: Playwright, Selenium, JavaScript, TypeScript, Java, Page Object Model, API testing, Postman, CI/CD, Git
- Search keywords: test automation, selenium, playwright, sdet

### Role questions (Junior and Senior answers)

1. **What is the difference between Playwright and Selenium?**
   Selenium is an older and very widely used tool that controls browsers through the WebDriver standard and supports many languages. Playwright is newer, from Microsoft, and controls Chromium, Firefox and WebKit directly. Playwright waits for elements automatically and includes tracing, screenshots and parallel runs out of the box. I choose based on the project, the team language and the browsers we must support.
2. **How do you choose good locators in UI automation?**
   I prefer locators that match what the user sees, such as the role and the name of a button, or a stable test id added by the developers. I avoid long XPath or CSS paths that depend on the page layout, because they break when the design changes. In Playwright I use getByRole and getByTestId. Good locators are the main way to make tests stable.
3. **How do you handle waits in automated tests?**
   I never use fixed sleeps, because they make tests slow and still fail when the app is slower than expected. In Selenium I use explicit waits, which wait for a condition, such as an element being clickable. Playwright waits automatically before actions and has assertions that retry until they pass or time out. I wait for the right condition, such as a loaded response, not for time.
4. **What is the Page Object Model?**
   The Page Object Model puts the locators and actions of each page into its own class, such as a LoginPage with a login method. Tests call these methods instead of using locators directly. When the page changes, I update one class instead of many tests. It makes tests shorter, easier to read and easier to maintain.
5. **How do you run automated tests in a CI pipeline?**
   I add a step to the pipeline, for example in GitHub Actions or Jenkins, that installs the dependencies and runs the tests in headless browsers on every pull request. I run tests in parallel to keep the time short. The pipeline saves reports, screenshots and traces of failed tests as artifacts. A failing test blocks the merge, so problems are found before release.
6. **How do you automate API tests?**
   I send requests to the API in code, for example with the Playwright request context or REST Assured in Java, and check the status code, the response body and the schema. I cover valid requests, invalid input, missing authentication and edge cases. API tests are faster and more stable than UI tests, so I test most rules at the API level. I keep only the main user journeys as UI tests.
7. **What causes flaky tests, and how do you fix them?**
   A flaky test passes and fails on the same code. Common causes are timing problems, tests that depend on each other, shared test data and unstable test environments. I find the cause using traces, logs and by running the test many times. Then I fix the root cause, such as a better wait or independent test data, instead of just adding retries.

### Fresher answers (first 3 role questions)

1. **What is the difference between Playwright and Selenium?**
   Selenium is an older, widely used tool that uses WebDriver and many languages. Playwright is newer and waits for elements automatically.
2. **How do you choose good locators in UI automation?**
   I use locators that match what the user sees, such as a button name, or a stable test id. I avoid long XPath paths that break easily.
3. **How do you handle waits in automated tests?**
   I avoid fixed sleeps and wait for a condition instead, such as an element being visible. Playwright waits automatically before actions.

### Junior extra questions

1. **How do you manage test data in automated tests?**
   Each test creates the data it needs, for example a new user through the API, so tests do not depend on each other. I clean up the data after the test or use a fresh test environment. I keep fixed data, such as product names, in separate files instead of inside the test code. Passwords and keys come from environment variables, not from the code.
2. **Which tests should you automate first?**
   I start with tests that run often and give the most value, such as smoke tests and the main user journeys, for example login and checkout. Stable features are better to automate than features that change every week. Tests that are slow or boring to run by hand are also good candidates. Some checks, like how a page looks and feels, are still better done by a person.

### Senior extra questions

1. **How do you design a test automation framework for a team?**
   I choose the tools with the team, based on the app, the language and the CI setup. I structure the framework in layers, with page objects, API helpers, test data builders and shared configuration for each environment. I add clear reports, traces for failures and parallel runs from the start. I write guidelines and review test code like production code, so the framework stays clean.
2. **How do you keep a large automated test suite fast and reliable?**
   I follow the test pyramid, with many unit and API tests and fewer UI tests. I run tests in parallel and split them across machines in the pipeline. I track flaky tests, fix them quickly and remove tests that no longer add value. I run a fast smoke set on every pull request and the full suite on a schedule, such as every night.

# Parent: Business and Product

## Business Analyst

- id: `ba`
- Role label: Business Analyst
- Profile role (setupRole): Business Analyst
- Suggested skills: Requirements gathering, User stories, BRD, Process mapping, BPMN, Stakeholder management, Jira, Excel, SQL, UAT
- Search keywords: business analysis, brd, requirements, process mapping

### Role questions (Junior and Senior answers)

1. **How do you gather requirements from stakeholders?**
   I start by learning the business goal and who is affected. Then I use the right techniques, such as interviews, workshops, watching people do their work and reading existing documents. I ask open questions and write down what I hear, then confirm it with the stakeholders. I also look for the problem behind each request, not only the solution people ask for.
2. **How do you write a good user story with acceptance criteria?**
   A user story describes a need from the user point of view, for example: As a customer, I want to save my cart, so that I can buy later. It should be small enough for one sprint and easy to test. Acceptance criteria list the conditions that must be true, often written as Given, When, Then. They help the developers and the testers agree on what done means.
3. **What is the difference between a BRD and an FRD?**
   A BRD, or business requirements document, explains what the business needs and why, such as reducing order errors by half. It is written for business stakeholders. An FRD, or functional requirements document, explains how the system must behave to meet those needs, such as the fields and rules of a form. It is written mainly for the development and testing teams.
4. **How do you identify and manage stakeholders on a project?**
   I list everyone who is affected by the project or can influence it. I place them on a power and interest grid, so I know whom to manage closely and whom to keep informed. I agree on how often and how I will update each group. I keep good relations and record decisions, so there is no confusion later.
5. **How do you map a business process?**
   I first map the current process, the as-is, by talking to the people who do the work and watching it. I draw it as a flowchart or in BPMN, with swimlanes that show who does each step. Then I mark the delays, repeated work and errors. Together with the team, I design the improved process, the to-be.
6. **What is gap analysis, and how do you do it?**
   Gap analysis compares where the business is now with where it wants to be. I describe the current state and the target state, for example in processes, systems or skills. The difference between them is the gap. Then I list the actions needed to close each gap and agree on their priority with the stakeholders.
7. **What is your role in user acceptance testing?**
   In UAT, real business users check that the system meets their needs before it goes live. I help prepare the test scenarios from the requirements and the user stories. I support the users during testing, record the issues and work with the team to decide which ones must be fixed. At the end, I help collect the formal sign-off.

### Fresher answers (first 3 role questions)

1. **How do you gather requirements from stakeholders?**
   I learn the business goal first. Then I use interviews, workshops and existing documents, and I confirm what I wrote with the stakeholders.
2. **How do you write a good user story with acceptance criteria?**
   A user story describes a need from the user view: As a user, I want something, so that I get a benefit. Acceptance criteria say when it is done.
3. **What is the difference between a BRD and an FRD?**
   A BRD explains what the business needs and why. An FRD explains how the system must work to meet those needs.

### Junior extra questions

1. **How do you handle requirements that change during a project?**
   I accept that change is normal, but I manage it. I record each change, check its effect on scope, time and cost and discuss it with the right stakeholders. Once it is approved, I update the documents and the backlog and tell the team. This keeps everyone working from the same version.
2. **How do you use SQL or Excel in business analysis?**
   I use them to check facts with data instead of opinions. With SQL I pull data, such as the number of failed orders by region, to understand a problem. In Excel I clean the data, build pivot tables and simple charts for stakeholders. Data helps me confirm requirements and measure results after a change.

### Senior extra questions

1. **How do you handle stakeholders who want conflicting things?**
   I bring them together and focus the talk on the shared business goal and the facts. I show the effect of each option on cost, time, risk and value. If they still disagree, I agree on who makes the final decision, such as the sponsor. I record the decision and the reasons, so it does not come back later.
2. **How do you show the value of a project after it goes live?**
   Before the project starts, I agree on measurable goals, such as a shorter processing time or fewer complaints. I record the baseline numbers before the change. After go-live, I measure the same numbers and compare them. I share the results with the stakeholders, along with lessons learned for the next project.

## Product Manager

- id: `pm`
- Role label: Product Manager
- Profile role (setupRole): Product Manager
- Suggested skills: Product roadmap, Prioritization, User research, Product metrics, A/B testing, Agile, Jira, Figma, Market research, Stakeholder management
- Search keywords: product management, roadmap, mvp, product strategy

### Role questions (Junior and Senior answers)

1. **How do you build and share a product roadmap?**
   I start from the product vision and the goals for the next period, such as growing retention. I list the problems we want to solve, not a fixed list of features with exact dates. A simple now, next and later format works well, because plans change as we learn. I share the roadmap with the team and stakeholders and update it regularly.
2. **How do you prioritize features with RICE or MoSCoW?**
   RICE gives each idea a score: reach times impact times confidence, divided by effort. It helps me compare very different ideas with the same rule. MoSCoW sorts work into must have, should have, could have and will not have this time, which is useful for a fixed release. I use the scores to guide the talk with the team, not to replace judgement.
3. **What is an MVP, and how do you decide what goes into it?**
   An MVP, or minimum viable product, is the smallest version that solves the main problem well enough to learn from real users. I start from the one problem we want to test and the main user journey for it. Everything that is not needed for that journey waits for later. The goal is learning quickly, not shipping a weak product.
4. **Which metrics do you use to measure product success?**
   I choose one main metric that shows the value users get, sometimes called the North Star metric. I add supporting metrics, such as activation, retention, conversion and how often people use the key feature. I watch some guardrail metrics too, such as crashes or support tickets, so a gain in one area does not hurt another. I always connect the metrics to the product goals.
5. **How do you do user research as a product manager?**
   I talk to real users and ask about what they did in the past, not what they might want, because past behaviour is more reliable. I run usability tests, where I watch people use a prototype or the product. I combine this with data, such as where users drop off. I share the main findings with the team, often with short clips or quotes.
6. **How do you work with the engineering team?**
   I bring engineers in early, when we discuss the problem, not only when the design is ready. I explain the why, the user need and the goal, and let them suggest how to solve it. I keep the backlog clear and the priorities stable during a sprint. When there are trade-offs between scope and time, we decide them together.
7. **How do you say no to a feature request?**
   I thank the person and try to understand the problem behind the request. Then I explain how it compares with our current goals and priorities, using data where I can. I often say not now instead of never, and I record the idea for later. If there is a smaller way to help, I offer it.

### Fresher answers (first 3 role questions)

1. **How do you build and share a product roadmap?**
   I start from the product vision and goals and list the problems we want to solve. A now, next and later roadmap is simple and easy to update.
2. **How do you prioritize features with RICE or MoSCoW?**
   RICE scores ideas by reach, impact and confidence divided by effort. MoSCoW sorts work into must, should, could and will not have.
3. **What is an MVP, and how do you decide what goes into it?**
   An MVP is the smallest product that solves the main problem well enough to learn from users. Everything else waits for later.

### Junior extra questions

1. **How do you write a clear product requirement for a new feature?**
   I start with the problem, the users and the goal, and how we will measure success. Then I describe the main user flows and the important rules and edge cases. I add designs or simple sketches and list open questions. I review it with design and engineering before the work starts, so we agree on the scope.
2. **How do you use A/B testing to make product decisions?**
   I write a clear hypothesis first, such as a shorter sign-up form will raise completed sign-ups. Users are split at random into the current version and the new version. I decide the main metric and the needed sample size before the test starts. I wait until the test is complete and check the result is significant before I decide.

### Senior extra questions

1. **How do you set the product strategy for the next year?**
   I look at the market, the competitors, the company goals and what we learned from users and data. From this I choose a few clear bets that support the company goals, and I explain what we will not do. I turn the bets into measurable goals for the teams. I review the strategy every quarter, because the market can change.
2. **How do you decide to stop or remove a product feature?**
   I look at how many users use the feature, how much value it brings and how much it costs to maintain. If usage is low and the cost is high, removing it can make the product simpler. I talk to the users who rely on it and plan a clear notice and an alternative. Then I remove it in steps and watch the feedback.

## Product Owner

- id: `po`
- Role label: Product Owner
- Profile role (setupRole): Product Owner
- Suggested skills: Scrum, Backlog management, User stories, Acceptance criteria, Sprint planning, Jira, Stakeholder management, Agile, Prioritization, Definition of Done
- Search keywords: product owner, scrum, product backlog, sprint

### Role questions (Junior and Senior answers)

1. **How do you manage the product backlog?**
   I keep the backlog ordered, so the most valuable items are at the top and ready for the next sprints. Items near the top are small and clear, with acceptance criteria, while items further down can be rough ideas. I refine the backlog regularly with the team and remove items that are no longer useful. The backlog is visible to everyone, so stakeholders can see what is planned.
2. **What is your role in sprint planning?**
   I bring a proposed sprint goal and the top backlog items, already refined. I explain why each item matters and answer questions about the details. The developers decide how much work they can take on and how to do it. Together we agree on the sprint goal, so everyone knows what the sprint is for.
3. **How do you decide whether a user story is accepted?**
   I check the work against the acceptance criteria of the story and the team definition of done. I try it myself, ideally during the sprint, not only at the end, so there is time to fix small issues. If something is missing, I explain clearly what is not met. New ideas that come up become new backlog items instead of changes to the finished story.
4. **How do you keep stakeholders aligned on the product direction?**
   I share the product goal and the roadmap and explain the reasons behind the priorities. I invite stakeholders to the sprint review, where they see working software and give feedback. I meet key stakeholders regularly to hear their needs early. When needs conflict, I make the decision openly and explain it.
5. **How do you balance value and effort when you order the backlog?**
   I estimate the value of each item with stakeholders, for example through customer impact, revenue or risk reduction. The developers estimate the effort. Items with high value and low effort usually go first, while high effort items are split into smaller parts. I also consider dependencies and deadlines, such as a legal change.
6. **What is the difference between the definition of done and acceptance criteria?**
   The definition of done is a shared quality checklist for every item, such as code reviewed, tested and documented. Acceptance criteria are specific to one user story and describe what that story must do. A story is complete only when it meets both. The team owns the definition of done, while I write the acceptance criteria with the team.
7. **What is the difference between a product owner and a scrum master?**
   The product owner is responsible for the value of the product and for ordering the product backlog. The scrum master helps the team use Scrum well and removes problems that slow the team down. The product owner decides what is built first, while the scrum master helps with how the team works. Both support the developers, but they have different focus.

### Fresher answers (first 3 role questions)

1. **How do you manage the product backlog?**
   I keep the backlog ordered by value, with clear and small items at the top. I refine it with the team regularly.
2. **What is your role in sprint planning?**
   I bring the sprint goal and the top backlog items to sprint planning. The developers decide how much work they can take on.
3. **How do you decide whether a user story is accepted?**
   I check the story against its acceptance criteria and the definition of done. If something is missing, I explain it clearly.

### Junior extra questions

1. **How do you split a large user story into smaller ones?**
   I split it by user flow steps, by business rules or by types of data, so each smaller story still gives value to the user. For example, I can deliver payment by card first and other payment types later. Each story should still be testable on its own. I avoid splitting by technical layers, such as only the database part, because that gives no user value alone.
2. **What happens in a sprint review?**
   The team shows the work completed in the sprint to stakeholders, usually as a live demo. Stakeholders give feedback and we discuss what changed in the market or the business. I update the backlog based on what we learned. It is a working session to inspect and adapt, not just a presentation.

### Senior extra questions

1. **How do you manage a product backlog shared by several teams?**
   I keep one backlog for the product, so all teams work toward the same goal. We refine the top items together and agree which team takes which part, keeping dependencies visible. I work closely with the other product owners if there are any, so priorities do not clash. Regular joint reviews show the integrated product, not separate team results.
2. **How do you handle a stakeholder who wants to add work in the middle of a sprint?**
   I listen to understand how urgent and valuable the request really is. If it can wait, I add it to the backlog and consider it for the next sprint. If it is truly urgent, I discuss it with the team and remove other work of similar size, so the sprint goal is still possible. If the sprint goal no longer makes sense, I can cancel the sprint, but that is rare.

# Parent: System Administrator

## System Administrator

- id: `sysadmin`
- Role label: System Administrator
- Profile role (setupRole): System Administrator
- Suggested skills: Linux, Windows Server, Active Directory, Bash, PowerShell, Backup and recovery, Monitoring, Patching, Networking, Virtualization
- Search keywords: sysadmin, system admin, windows server, linux admin

### Role questions (Junior and Senior answers)

1. **A service on a Linux server has stopped. How do you find out why?**
   I check its status with systemctl status, which shows if it is running and the last log lines. Then I read the full logs with journalctl for that service and the application log files. I check common causes, such as a full disk with df, high memory use, a wrong config file or a port already in use. After I fix the cause, I restart the service and confirm it works.
2. **How do you manage users and file permissions on Linux and Windows servers?**
   On Linux I create users, add them to groups and set file permissions with chmod and chown, using read, write and execute for the owner, the group and others. Admin access goes through sudo instead of shared root logins. On Windows I use NTFS permissions and give access to groups, not single users. I follow least privilege and remove access when people change roles.
3. **What backup strategy do you use for company servers?**
   I follow the 3-2-1 rule: three copies of the data, on two different types of storage, with one copy offsite or in the cloud. I protect at least one copy from changes, for example an immutable or offline backup, in case of ransomware. I schedule backups based on how much data the business can afford to lose. Most importantly, I test restores regularly, because a backup that cannot be restored is useless.
4. **What do you monitor on servers, and which tools do you use?**
   I monitor CPU, memory, disk space, disk speed, network traffic and whether key services are running. I also watch logs for errors and failed logins. Tools such as Zabbix, Prometheus with Grafana or the cloud monitoring service collect the data and show dashboards. I set alerts with sensible limits, so the team hears about real problems without too much noise.
5. **How do you plan patching for Windows and Linux servers?**
   I keep a list of all servers and check for new updates regularly, with security patches first. I test patches on a test server or a small group before I roll them out widely. I install them in an agreed maintenance window, with a backup or snapshot taken first. On Windows I use an update tool such as Azure Update Manager or WSUS, and on Linux the package manager, such as apt or dnf.
6. **How do you use groups and Group Policy in Active Directory?**
   I organize users and computers into organizational units, such as by department. I give permissions to security groups, then add users to the groups, which is easier to manage than single users. Group Policy lets me apply settings to many computers at once, such as password rules, screen lock or mapped drives. I test a new policy on a small unit before linking it widely.
7. **How do you automate repeated admin tasks?**
   I write scripts in Bash on Linux and in PowerShell on Windows for tasks such as creating users, cleaning old logs or checking disk space. I schedule them with cron on Linux and Task Scheduler on Windows. Scripts log what they did and handle errors, so failures are easy to see. I keep the scripts in version control, so changes are tracked and shared.

### Fresher answers (first 3 role questions)

1. **A service on a Linux server has stopped. How do you find out why?**
   I check the service with systemctl status and read its logs with journalctl. I also check the disk, the memory and the config file.
2. **How do you manage users and file permissions on Linux and Windows servers?**
   On Linux I use groups and set permissions with chmod and chown. On Windows I give NTFS permissions to groups and follow least privilege.
3. **What backup strategy do you use for company servers?**
   I follow the 3-2-1 rule: three copies, two types of storage and one copy offsite. I also test restores regularly.

### Junior extra questions

1. **A Linux server is running out of space. How do you find what is using it?**
   I run df -h to see which file system is full, then du to find the largest folders, for example with du -sh on each folder and sorting the result. Common causes are large log files, old backups or temporary files. I also check for deleted files that a running process still holds open, with lsof. I clean up safely and set up log rotation, so it does not happen again.
2. **How do you connect to and manage remote servers securely?**
   For Linux I use SSH with key-based login and turn off password login and direct root login. For Windows I use Remote Desktop or PowerShell remoting, only over a VPN or a secure gateway, not open to the internet. I use strong, unique credentials and multi-factor authentication where possible. I also limit which IP addresses can connect.

### Senior extra questions

1. **How do you harden a new server before it goes into production?**
   I install only the needed software and services and close all unused ports with the firewall. I apply the latest patches, use secure remote access and set strong account and password policies. I turn on logging and send logs to a central system. I follow a standard baseline, such as the CIS benchmarks, and check the server against it.
2. **How do you manage changes to production servers safely?**
   I plan each change with a clear description, the risk, the steps and a rollback plan. Bigger changes go through a change approval process and are done in a maintenance window. I take a backup or snapshot first and tell the affected users. After the change, I check that everything works and record what was done.

# Overlap check

No question text is repeated in any two categories (checked by `tests/practice/categories.test.mjs`). Where a new question shares a topic with an existing one, I wrote it to ask something different. Those pairs are below.

| New question | Related existing question | Why both stay |
| --- | --- | --- |
| Game Tester: test cases for a game feature; QA Tester: test case design techniques | (each other) | Game feature coverage (devices, controls, languages) vs general techniques (partitions, boundaries, decision tables) |
| Game Tester: bug report for a game; QA Tester: bug life cycle | (each other) | What goes into one report vs the states a bug moves through |
| Game Tester: regression testing in a game project; QA Tester: smoke vs sanity vs regression | (each other) | Regression in game builds vs comparing three test types |
| Game Tester: test on many devices; Game Tester: performance | Mobile App Development: test a mobile app on different devices | Game frame rate, heat and controllers vs general app device coverage |
| Automation Tester: tests in a CI pipeline | DevOps: speed up a slow CI pipeline; Cloud Engineer: explain a CI/CD pipeline | Running browser tests in CI vs pipeline speed and pipeline basics |
| QA Tester: test an API with Postman; Automation Tester: automate API tests | (each other) | Manual checks in Postman vs API tests in code |
| QA Tester: test a login page | Cyber Security: why multi-factor authentication matters | Test cases for a login form vs a security control |
| System Administrator: service stopped on a Linux server | IT Support: computer is very slow; Cloud Engineer: service suddenly goes down | Linux service logs (systemctl, journalctl) vs a desktop problem and a cloud outage |
| System Administrator: groups and Group Policy in Active Directory | IT Support: what is Active Directory, and how do you reset a user password? | Groups, OUs and Group Policy vs the basics and a password reset |
| System Administrator: backup strategy (3-2-1, immutable copy) | Cloud Administrator: set up and test backups for cloud servers; DBA: backup and recovery with RPO and RTO | Company servers vs cloud servers vs databases |
| System Administrator: patching Windows and Linux servers | Cloud Administrator: keep cloud servers patched; DBA: patches for a production database | On-premises tools (WSUS, apt, dnf) vs cloud and database patching |
| System Administrator: what to monitor | Cloud Administrator: metrics and alerts for a new cloud server | Server monitoring tools (Zabbix, Prometheus) vs cloud server alerts |
| System Administrator (Junior): Linux server running out of space | Cloud Administrator: ticket for more disk space; DBA: database running out of disk space | Finding what uses the space (df, du, lsof) vs adding space vs database files |
| System Administrator: users and file permissions | DBA: database users and permissions | Linux and NTFS permissions vs database roles |
| Game Development: version control on a game project | Software Developer: what you know about Git and version control | Large binary files, Git LFS and file locking vs Git basics |
| Game Development: crash only on some phones | C / C++: crash in a large C++ program | Device-specific crash reports vs debugging a C++ crash |
| Unity: Profiler and build size; Unreal: profiling; Game Development: smooth frame rate | iOS: Instruments for performance | Engine tools vs Apple tools |
| Unreal: UPROPERTY and garbage collection | C# / .NET: garbage collection | The Unreal object collector vs the .NET runtime collector |
| Game Artist: art style consistency; Game Artist: work with the engine | Graphic Design: consistent social media posts; hand over a design to developers | Game assets in an engine vs print and social media design |
| Game Designer: player data in a live game; Product Manager: metrics for product success | Data Analyst: A/B test; Data Analyst: define a metric | Product and game decisions vs the analyst view of the same data |
| Product Manager: A/B testing for product decisions | Data Analyst: what an A/B test is and how to read it | Deciding with a test vs running the analysis |
| Business Analyst: stakeholders; Business Analyst (Senior): conflicting stakeholders | Data Analyst: stakeholders who disagree with your analysis | Requirements work vs defending an analysis |
| Product Owner: product owner vs scrum master; Product Manager: work with engineering | (each other) | Scrum roles vs day-to-day collaboration |
| Business Analyst: user story with acceptance criteria; Product Owner: definition of done vs acceptance criteria | (each other) | Writing a story vs the two quality checks |
