Prompt no1:

Below are the requirements for my gen AI Task I want you to go through all these requirements in detail and help me design a blood donation app Group presentation and live demo 
Task: Each group, build a small full-stack app with LLM help and present it live (10 min demo 
+ 5 min Q&A). 
Before the session 
1. Pick a small domain (each group a different one) and a stack (state exact versions). 
2. Write a one-page spec: entities, 4 to 5 endpoints, 3 UI screens. 
3. Keep a prompt log: what you asked, what broke, what you fixed by hand. 
Presentation (all four parts, live) 
1. Frameworks and AI (2 min): Stack and tools used. One case of outdated syntax or a 
hallucinated package, and your fix. 
2. UI components (3 min): The same component from a vague prompt and a detailed 
prompt. Check accessibility, responsiveness and state. Show one UI problem fixed. 
3. Backend routes (3 min): CRUD routes working. Check validation, auth, unsafe queries, 
error handling and secrets. Show one real flaw fixed. 
4. Integration (2 min): Create, read, update and delete working end to end from the UI. 
Show one front-end/back-end mismatch and how you resolved it. 
5. Closing (1 min): Three lessons learned. 
Rules 
 Fix at least 3 non-trivial problems in the generated code. 
 Run it live (keep a backup recording). 
 Every member speaks, and any member may be asked to explain any function. 
 Be honest in the prompt log. First I want you to tell me what you understood from this prompt so I can make sure you have the right idea of things

Prompt no2:

Ok now I want a visualization of the blood donation app I want it to look realistic and somewhat natural/creative without the use of any unnecessary elements. It should look neat clutter free and presentable moreover, I don't want it to look way too empty and tacky rather I'd want it to look cohesive and relevant. Something people would want to connect to rather than just straight up AI and annoying. I would want a visualization of all pages required in my website.

Prompt no3:

Write the complete frontend React code for my blood donation website with 3 screens (Donor Directory, Register Donor, and Blood Requests) using Tailwind CSS with advanced route loaders.

Prompt no 4:

The code works well but in the donor and patient registration forms the city fields accept any number symbol or character ensure proper exception handling throughout the website along with consistency. No need to change any functionality retain every.

 Prompt no6 (Frontend Test cases):

Write testing code for my complete HemoLink project using Vitest and React Testing Library. Test all three screens, including forms, validations, buttons, filters, navigation, API functionality, and database operations. Check both valid and invalid inputs, identify bugs, and make sure the tests work with my existing React + Vite project without unnecessarily changing the original code.

Prompt no7:

Keep the testing simple. I don’t want too many testing files or complicated code. Create one main test file covering all three screens of HemoLink, with important positive and negative test cases. Focus on the main functionality and avoid unnecessary test cases.

 Prompt no8 (Backend Test Cases):

Provide test cases for backend. Normal, edge cases, an unusual but valid input. Make sure the test cases cover all portions of the code.  Test cases you provide should make us be confident that database is doing its job perfectly. Also make sure to use appropriate function names so that the test cases is ready to run and not use jest or any other way just simple execution through node.js.

Prompt no9 (Backend Implementation):

I want to implement MongoDB to my java vs code web project folder. I have a parent folder named Blood-Donor-Project, inside there are two sub-folders named Blood-Donor-Frontend and Blood-Donor-Backend. How to use MongoDB for my backend using npm. My project is built with Vite and Tailwind CSS.
 
Prompt no10:
 
I am getting this error when trying to run Backend, how to resolve this issue. Give clear steps. PS C:\affaff\Generative AI\Blood-Donor-Project\Blood-Donor-Backend> npx nodemon server.js
◇ injected env (2) from .env
Server running on http://localhost:5000
MongoDB connection error: Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.xmyutf7.mongodb.net
    at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:294:17) {
  errno: undefined,
  code: 'ECONNREFUSED',
  syscall: 'querySrv',
  hostname: '_mongodb._tcp.cluster0.xmyutf7.mongodb.net'

  Prompt no 11:
  
 when i am putting numbers and special symbols when searching for donors, it shows 'no match found' which i WANT but it does not work with all special characters like $, ^ does not throw error and when inputting +, ? it says unable to load route data which is inconsistent and throws the user off. I want it so that the 'no match found' appears for EVERY special character and number.



