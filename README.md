# CS-465-FullStackDev

#Architecture

a. Express HTML: Express HTML is a templating engine used with the Express.js framework. It allows for server-side rendering of HTML pages by combining HTML templates with data from the back-end. With Express HTML, the server generates the HTML content and sends it as a response to the client's request. This approach is suitable for traditional multi-page applications where each page requires a server round-trip for rendering.
b. JavaScript: JavaScript is a programming language commonly used for front-end development. It runs on the client side and enables interactivity and dynamic behavior within web pages. JavaScript is responsible for manipulating the DOM (Document Object Model), handling user interactions, making asynchronous requests to the server, and updating the UI accordingly. It is the backbone of front-end development and vital to creating rich and interactive web applications.
c. Single-Page Application (SPA): SPAs are web applications that load a single HTML page and dynamically update the content without requiring a full page reload. SPAs are built using JavaScript frameworks like Angular, React, or Vue.js. The front end of a SPA is typically developed using JavaScript and utilizes client-side rendering to generate and update the UI. SPAs communicate with the back-end through APIs (Application Programming Interfaces) to fetch data and send requests for server-side processing.
Express HTML is a server-side rendering approach where the server generates HTML pages and sends them to the client upon request. It involves rendering the HTML on the server and sending complete HTML pages to the client for each request.
JavaScript is a client-side scripting language that runs directly in the browser. It allows for dynamic manipulation of the webpage, handling user interactions, and making asynchronous requests to the server to fetch data or perform actions without reloading the entire page.
SPAs utilize JavaScript frameworks to create a seamless and interactive user experience. They load a single HTML page and dynamically update its content based on user interactions, fetching data from the back-end through APIs and rendering the UI on the client side.
Some of the reasons why I decided to utilize MongoDB for the application are:
JSON-like Document Structure: MongoDB stores data in a JSON-like format called BSON (Binary JSON), which aligns well with the data interchange format used by JavaScript and front-end technologies. The JSON structure makes it easier to exchange data between the front and back end without extensive data transformation.
Compatibility with JavaScript: Since JavaScript is widely used on the front-end, using MongoDB as the back-end database allows for seamless integration and easier data manipulation between the front-end and back-end components, as both can work with JSON-like data structures.
Flexibility and Scalability: NoSQL databases like MongoDB offer schema flexibility, allowing for storing unstructured or semi-structured data. This flexibility is beneficial when dealing with evolving data requirements and enables more effortless scalability as the application's data needs grow.

# Functionality

JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and for machines to parse and generate. It is based on a subset of the JavaScript programming language and is often used to transmit data between a server and a web application in a format both can understand.
On the other hand, JavaScript is a programming language widely used for web development. It is primarily used to add interactivity and dynamic behavior to web pages. JavaScript allows developers to manipulate and modify the content and behavior of web pages in response to user actions or events.
JSON ties together the front-end and back-end development pieces by providing a standardized format for data interchange. When data is transmitted from the back-end to the front-end, it is often converted to JSON format. The front end can then parse this JSON data and use it to update the user interface or perform other operations dynamically. Similarly, when the front-end sends data to the back-end, it is often sent in JSON format, allowing the back-end to parse and process the data effectively.
Streamlining API Endpoints: Refactoring API endpoints can involve consolidating similar functionality into a single endpoint or breaking down a complex endpoint into smaller, more focused ones. This promotes code reusability, improves maintainability, and enhances the overall API design.

# Testing

Methods: In the context of a full-stack application, methods refer to the HTTP methods or verbs used to interact with the API endpoints. The commonly used methods are:
GET: Retrieves data from the server. It is used to retrieve resources or perform read operations.
POST: Sends data to the server to create a new resource. It is used for submitting data or performing write operations.
PUT Updates an existing resource on the server. It is used for modifying data.
DELETE: Deletes a specified resource on the server.
API testing involves ensuring that the methods are implemented correctly and the expected behavior is exhibited for each method. This includes verifying the correct response status codes, data retrieval, data creation, and data modification.
Endpoints: Endpoints are specific URLs or routes within the API that are used to perform certain actions or retrieve specific resources. Each endpoint typically corresponds to a specific functionality or resource in the application. For example:
/trips: Endpoint for retrieving a list of trips.
/trips/:tripCode: Endpoint for retrieving a specific trip by ID.
/trips/trip: Endpoint for creating a new trip.
API testing involves sending requests to these endpoints and validating the responses received. It ensures that the endpoints are correctly implemented, handle the requests appropriately, and return the expected data or perform the intended actions.
Security: Security is a critical aspect of a full-stack application, especially when handling sensitive user data and protecting against unauthorized access. Some security considerations in a full-stack application include:
Authentication: Verifying the identity of users accessing the application, typically through login mechanisms and authentication tokens. For instance, I used jwt modules to create authentication tokens.
Authorization: Determining the permissions and access rights of authenticated users to perform certain actions or access specific resources.
Data Encryption: Protecting sensitive data by encrypting it during transmission and storage. 
API testing should include
Testing the security measures implemented in the application, such as verifying that authentication and authorization mechanisms work correctly,
testing data encryption and decryption processes, and
Validating input validation and sanitization to mitigate security risks.
For the project, I utilized Postman to test the CRUD functionality and the endpoints verifying the status code generated.

# Reflection

The full-stack application developed was my first time working with MEAN stack to create a full-stack application. The challenges faced, and the research process have helped me understand how the stack can be leveraged to create a functional website. I feel confident to attempt another project, knowing I have a good foundation of where to start and can master the concepts within the discipline. 
