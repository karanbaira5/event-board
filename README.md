# Campus Event Board — CS445 Lab Assignment 7

**Institute:** IIIT Vadodara  
**Course:** CS445 — Basics of Web Programming  
**Project:** Campus Event Board  
**Team:** Team Sankalp

## Project Overview

Campus Event Board is a web-based platform that displays campus events. It uses JavaScript to dynamically render event cards and demonstrates how the same event data can be represented in JSON and XML.

This project extends the previous lab assignment by adding XML parsing, JSON round-trip conversion, data validation concepts and file-size comparison.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- XML
- DOMParser
- Fetch API

## Project Structure

```text
Event Manager/
│
├── index.html
├── style.css
├── base.css
├── theme-dark.css
├── script.js
├── events.json
├── events.xml
├── event-banner.jpg
├── images.ico
├── README.md
├── Notes.pdf
│
└── Screenshot/
```

## Features

### Existing Event Board Features

- Dynamic event cards
- Event search and filtering
- Hamburger navigation
- Dark mode
- Event details
- RSVP interaction
- Event form validation
- Responsive layout

### Lab Assignment 7 Features

- Event data stored in JSON.
- The same event data represented in XML.
- JSON loaded using Fetch API.
- XML loaded and parsed using DOMParser.
- First event title accessed from JSON and XML.
- JSON.stringify() and JSON.parse() round-trip.
- JSON and XML file-size comparison.
- Console output for testing.

## JSON and XML Structure

Each event contains:

- id
- title
- date
- seats
- free
- online
- venue
- description

The JSON format uses objects and arrays. The XML format uses an events root element, event child elements, and an id attribute.

## How to Run the Project

Do not open the HTML file directly using `file://`, because the browser may block Fetch API requests.

### Option 1: VS Code Live Server

1. Open the project folder in VS Code.
2. Install the Live Server extension if necessary.
3. Right-click `index.html`.
4. Select Open with Live Server.

### Option 2: Python HTTP Server

Open the terminal in the project directory:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## JavaScript Concepts Demonstrated

- const and let
- Arrays and objects
- Functions and return values
- Arrow functions
- Array filter()
- for...of loop
- DOM manipulation
- Event listeners and event bubbling
- Fetch API and async/await
- JSON.stringify() and JSON.parse()
- DOMParser
- XML element access
- TextEncoder and byte-size calculation
- Form validation
- try/catch error handling

## Important Limitations

- RSVP changes only the current browser session's data.
- Event proposals are not stored in a database.
- The project does not have a backend.
- JSON and XML are demonstration data files.
- Client-side validation does not replace server-side validation.

## Screenshots

Add your actual assignment screenshots to the `Screenshot/` folder.

Recommended screenshots:

1. Event cards rendered from JSON.
2. First XML event title displayed on the page.
3. JSON round-trip output.
4. JSON and XML byte-size comparison.
5. Invalid JSON validator error.
6. Corrected valid JSON.
7. Browser console output.

## GitHub Repository

Repository: https://github.com/karanbaira5/event-board

Live website: Add the verified GitHub Pages URL if enabled.

## Conclusion

This project demonstrates the use of JSON and XML for representing structured event data. It also demonstrates how JavaScript can fetch, parse, access, compare and display data in a web application.