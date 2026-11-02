# Campus Event Board
### CS445 — Lab Assignment 6 | IIIT Vadodara

## 1. Project Overview

The **Campus Event Board** is a web-based application developed to help students discover upcoming events, workshops, competitions, and cultural activities happening on campus.

The project uses HTML, CSS, and JavaScript to create an interactive and responsive website. Event information is stored in a JSON file and dynamically displayed using JavaScript.

## 2. Technologies Used

- **HTML5** – Structure of the website.
- **CSS3** – Styling, responsive layout, and dark theme.
- **JavaScript** – Dynamic content, event handling, search, and form validation.
- **JSON** – Storage of campus event information.
- **Git and GitHub** – Version control and project hosting.
- **GitHub Pages** – Static website deployment (if enabled).

## 3. Project Structure

```text
event-board/
│
├── index.html
├── style.css
├── base.css
├── theme-dark.css
├── script.js
├── events.json
├── README.md
├── NOTES_A6.pdf
├── event-banner.jpg
├── images.ico
│
└── screenshots/
    ├── 01-events-rendered.png
    ├── 02-search-filter.png
    ├── 03-fetch-loading.png
    ├── 04-fetch-success.png
    ├── 05-fetch-error.png
    ├── 06-form-validation-error.png
    ├── 07-form-validation-passed.png
    └── 08-console-output.png
```

*Note: The screenshots folder should be included after adding your actual screenshots. Keep any additional assets required by your project.*

## 4. Features

### A. Event Management
- Events are stored in `events.json`.
- Event cards are generated dynamically using JavaScript.
- Each event displays its title, category, date, venue, description, and available seats.
- Event status is displayed as Open, Few left, or Full.

### B. Search Functionality
- Search events by entering keywords.
- Results update as the user types.
- Clear button resets the search.
- Pressing Escape clears the search field.

### C. Responsive Navigation
- Hamburger menu for smaller screens.
- Navigation links open and close using JavaScript.
- Responsive layout for different screen sizes.

### D. RSVP Functionality
- Users can interact with event RSVP buttons.
- Available seat counts are updated in the current page session.
- Duplicate RSVP actions are handled using a JavaScript Set.

### E. Event Details
- Users can click the Details button to view additional event information.

### F. Event Submission Form
- Organizer name validation.
- Email validation.
- Event date and description fields.
- Contact number validation.
- Built-in HTML validation and custom JavaScript validation.
- Validation feedback for invalid and valid inputs.

### G. Fetch API
The project loads event information using `fetch()` and `async/await`.

It handles three states:

1. Loading – Displays a loading message while retrieving data.
2. Success – Displays the event cards after successfully loading JSON.
3. Error – Displays a friendly message if the data cannot be loaded.

### H. Dark Mode
- CSS-based dark theme.
- Theme toggle control.
- Separate styling for dark-mode elements.

## 5. JavaScript Concepts Implemented

This assignment demonstrates the following JavaScript concepts:

| Concept | Implementation |
|---|---|
| Variables | `const` and `let` |
| Data types | String, Number, Boolean, Object, Array, Set |
| Conditions | `if`, `else if`, `else` |
| Loops | `for...of` |
| Functions | Functions with parameters and return values |
| Arrow functions | Arrow functions with `filter()` |
| DOM selection | `querySelector()`, `querySelectorAll()`, `getElementById()` |
| DOM manipulation | `createElement()`, `textContent`, `appendChild()` |
| Events | `addEventListener()` |
| Event bubbling | `event.target` and event delegation |
| CSS manipulation | `classList` and attributes |
| Fetch API | `fetch()`, `async/await`, `try/catch` |
| Form validation | `required`, `pattern`, `setCustomValidity()` |
| Debugging | `console.log()` |

## 6. How to Run the Project

### Method 1: VS Code Live Server

1. Download or clone the repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. The website will open in your default browser.

### Method 2: Python Local Server

Open the terminal inside the project folder and execute:

```bash
python -m http.server 8000
```

Open the following address in your browser:

```text
http://localhost:8000
```

**Important:** Do not directly open `index.html` using a `file://` URL because the browser may block the JSON fetch request.

## 7. Testing

The following features should be tested:

- Event cards loading from JSON.
- Search filtering.
- Escape-to-clear functionality.
- Hamburger menu.
- RSVP functionality.
- Event Details button.
- Loading, Success, and Error states.
- Invalid form submission.
- Valid form submission.
- Dark theme.
- Browser Console output.

Screenshots demonstrating these features are included in the project submission.

## 8. Project Limitations

- RSVP changes are stored only in the current page's memory. They are not saved permanently.
- The event submission form performs client-side validation but does not send event proposals to a server.
- The project does not include a database or user authentication.
- Server-side validation and permanent event storage are not implemented.
- Event information is demonstration data stored in `events.json`.

## 9. GitHub Repository

**Repository:**  
https://github.com/karanbaira/event-board

**Live Website:**  
Add your verified GitHub Pages URL here if deployment is enabled.

## 10. Assignment Information

**Course:** CS445  
**Assignment:** Lab Assignment 6  
**Project:** Campus Event Board  
**Institute:** IIIT Vadodara

**Team Name:** Team Sankalp

**Team Members:**
- Name: ____________________
- Roll Number: ______________

(Add all team members.)

---

## 11. Conclusion

The Campus Event Board project demonstrates the practical implementation of JavaScript fundamentals, DOM manipulation, event handling, JSON data management, Fetch API, and form validation.

It provides an interactive platform for displaying and exploring campus events while demonstrating the concepts covered in Lab Assignment 6.

**End of README**