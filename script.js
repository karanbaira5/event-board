/* =========================================================
   CS445 LAB ASSIGNMENT 7
   CAMPUS EVENT BOARD — JSON AND XML
   ========================================================= */

/* A2: const for values that are not reassigned. */
const pageTitle = "Campus Event Board";
console.log("Project:", pageTitle);

/* B1: Select HTML elements using DOM selectors. */
const eventGrid = document.querySelector("#eventGrid");
const eventStatus = document.querySelector("#eventStatus");
const searchInput = document.querySelector("#eventSearch");
const searchStatus = document.querySelector("#searchStatus");
const clearSearchButton = document.querySelector("#clearSearch");

const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");

const eventForm = document.getElementById("eventForm");
const formMessage = document.querySelector("#formMessage");

const xmlTitleResult = document.querySelector("#xmlTitleResult");
const jsonRoundTrip = document.querySelector("#jsonRoundTrip");
const verifiedEvents = document.querySelector("#verifiedEvents");
const matchStatus = document.querySelector("#matchStatus");
const sizeComparison = document.querySelector("#sizeComparison");

/* A3: JSON is the main source of event data. */
let events = [];
let visibleEvents = [];

/* Set stores event IDs for which RSVP was clicked. */
const rsvpedEventIds = new Set();

/* A4: if/else control flow for seat status. */
function getEventStatus(seats) {
  if (seats === 0) {
    return "Full";
  } else if (seats < 5) {
    return "Few left";
  } else {
    return "Open";
  }
}

/* A6: Function with a parameter and return value. */
function formatEvent(event) {
  const mode = event.online ? "Online" : "In person";
  const fee = event.free ? "Free" : "Paid";

  return `${event.title} — ${formatDate(event.date)} — ${mode} — ${fee}`;
}

/* Helper function to display ISO dates in a readable format. */
function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/* A7: Arrow function with filter() array method. */
const getAvailableEvents = (eventArray) =>
  eventArray.filter((event) => event.seats > 0);

/* B2: Create and display event cards dynamically. */
function renderEvents(eventArray) {
  if (!eventGrid) return;

  eventGrid.replaceChildren();

  if (eventArray.length === 0) {
    const message = document.createElement("p");
    message.className = "no-events";
    message.textContent = "No events found.";
    eventGrid.appendChild(message);
    return;
  }

  /* A5: for...of loop processes each event. */
  for (const event of eventArray) {
    const card = document.createElement("article");
    card.classList.add("event-card");

    const title = document.createElement("h3");
    title.textContent = event.title;

    const date = document.createElement("p");
    date.textContent = `Date: ${formatDate(event.date)}`;

    const venue = document.createElement("p");
    venue.textContent = `Venue: ${event.venue || "Not specified"}`;

    const seats = document.createElement("p");
    seats.textContent = `Available seats: ${event.seats}`;

    const fee = document.createElement("p");
    fee.textContent = event.free ? "Entry: Free" : "Entry: Paid";

    const status = document.createElement("span");
    status.classList.add("event-status");

    const currentStatus = getEventStatus(event.seats);
    status.textContent = currentStatus;
    status.classList.add(currentStatus.toLowerCase().replace(" ", "-"));

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.textContent = "Details";
    detailsButton.classList.add("details-btn");
    detailsButton.dataset.action = "details";
    detailsButton.dataset.eventId = event.id;

    const rsvpButton = document.createElement("button");
    rsvpButton.type = "button";
    rsvpButton.classList.add("rsvp-btn");
    rsvpButton.dataset.action = "rsvp";
    rsvpButton.dataset.eventId = event.id;

    if (event.seats === 0) {
      rsvpButton.textContent = "Fully Booked";
      rsvpButton.disabled = true;
    } else if (rsvpedEventIds.has(event.id)) {
      rsvpButton.textContent = "RSVP Submitted";
      rsvpButton.disabled = true;
    } else {
      rsvpButton.textContent = "RSVP";
    }

    const details = document.createElement("div");
    details.classList.add("event-details");
    details.hidden = true;

    const description = document.createElement("p");
    description.textContent = event.description || "No description available.";

    const mode = document.createElement("p");
    mode.textContent = event.online ? "Mode: Online" : "Mode: In person";

    details.appendChild(description);
    details.appendChild(mode);

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(venue);
    card.appendChild(seats);
    card.appendChild(fee);
    card.appendChild(status);
    card.appendChild(details);
    card.appendChild(detailsButton);
    card.appendChild(rsvpButton);

    eventGrid.appendChild(card);
  }
}

/* B1 and B2: Fetch JSON and render the event cards. */
async function loadEvents() {
  if (eventGrid) {
    eventGrid.textContent = "Loading events...";
  }

  if (eventStatus) {
    eventStatus.textContent = "Loading...";
  }

  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const rawJSON = await response.text();

    events = JSON.parse(rawJSON);
    visibleEvents = [...events];

    if (!Array.isArray(events)) {
      throw new Error("Event data must be a JSON array.");
    }

    console.log("Events loaded:", events);

    // Access first event title
console.log("First event title:", events[0].title);

// Access last event seats
console.log(
    "Last event seats:",
    events[events.length - 1].seats
);

    /* B2: Dot and index access. */
    if (events.length > 0) {
      console.log("First event title:", events[0].title);
      console.log("Last event seats:", events[events.length - 1].seats);
    }

    renderEvents(visibleEvents);

    if (eventStatus) {
      eventStatus.textContent = `${events.length} events loaded successfully.`;
    }

    /* B3: JSON round-trip — object to text to object. */
    performJSONRoundTrip(rawJSON);

    /* B5: Compare JSON and XML file sizes. */
    await compareFileSizes(rawJSON);

    /* B4: Read XML data. */
    await loadXML();
  } catch (error) {
    console.error("Error loading events:", error);

    if (eventGrid) {
      eventGrid.textContent =
        "Unable to load events. Check events.json and run the page using Live Server.";
    }

    if (eventStatus) {
      eventStatus.textContent = "Failed to load event data.";
    }
  }
}

/* B3: JSON Round-trip Demonstration */
function performJSONRoundTrip(rawJSON) {

    // Step 1: Convert JavaScript object into JSON string.
    const jsonString = JSON.stringify(events, null, 2);

    // Step 2: Convert JSON string back into JavaScript object.
    const parsedAgain = JSON.parse(jsonString);

    // Step 3: Read the original JSON data.
    const originalData = JSON.parse(rawJSON);

    // Step 4: Compare original and converted data.
    const matchesOriginal =
        JSON.stringify(parsedAgain) ===
        JSON.stringify(originalData);

    // Display the result on the webpage.
    if (jsonRoundTrip) {
        jsonRoundTrip.textContent = matchesOriginal
            ? "Success! JSON round-trip completed. The original and converted data match."
            : "Error! Original and converted JSON data do not match.";
    }

    // Display the number of verified events.
    if (verifiedEvents) {
        verifiedEvents.textContent = parsedAgain.length;
    }

    // Display comparison status.
    if (matchStatus) {
        matchStatus.textContent = matchesOriginal
            ? "100% Match"
            : "Mismatch";
    }

    // Display results in browser console.
    console.log("JSON.stringify output:", jsonString);
    console.log("JSON.parse output:", parsedAgain);
    console.log("Original data:", originalData);
    console.log("Round-trip successful:", matchesOriginal);
}

/* B4: Load XML and read the first title using DOMParser. */
async function loadXML() {
  if (!xmlTitleResult) return;

  xmlTitleResult.textContent = "Loading XML...";

  try {
    const response = await fetch("events.xml");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const xmlText = await response.text();

    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(xmlText, "application/xml");

    /* Check whether XML parsing produced an error. */
    const parserError = xmlDocument.querySelector("parsererror");

    if (parserError) {
      throw new Error("The XML file is not well-formed.");
    }

    const titles = xmlDocument.getElementsByTagName("title");

    if (titles.length === 0) {
      throw new Error("No event titles were found in XML.");
    }

    /* B4: Read the first XML title. */
    const firstTitle = titles[0].textContent;

    xmlTitleResult.textContent = `First event title from XML: ${firstTitle}`;

    console.log("First XML title:", firstTitle);
    // Count all event elements in XML.
const xmlEvents = xmlDocument.getElementsByTagName("event");

console.log("Total XML events:", xmlEvents.length);
  } catch (error) {
    console.error("XML loading error:", error);
    xmlTitleResult.textContent = "Unable to load XML. Check events.xml.";
  }
}

/* B5: Compare the byte sizes of JSON and XML. */
async function compareFileSizes(rawJSON) {
  if (!sizeComparison) return;

  try {
    const response = await fetch("events.xml");

    if (!response.ok) {
      throw new Error("Unable to read XML file size.");
    }

    const xmlText = await response.text();

    /* TextEncoder calculates actual UTF-8 byte size. */
    const encoder = new TextEncoder();

    const jsonBytes = encoder.encode(rawJSON).length;
    const xmlBytes = encoder.encode(xmlText).length;

    sizeComparison.textContent =
      `events.json: ${jsonBytes} bytes | events.xml: ${xmlBytes} bytes. ` +
      (xmlBytes > jsonBytes
        ? "XML is larger."
        : jsonBytes > xmlBytes
          ? "JSON is larger."
          : "Both files have the same size.");

    console.log("JSON byte size:", jsonBytes);
    console.log("XML byte size:", xmlBytes);
  } catch (error) {
    console.error("File size error:", error);
    sizeComparison.textContent = "Unable to compare file sizes.";
  }
}

/* B6: Search events while the user types. */
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    visibleEvents = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm),
    );

    renderEvents(visibleEvents);

    if (searchStatus) {
      searchStatus.textContent = `${visibleEvents.length} event(s) found.`;
    }
  });

  /* B6: Escape key clears the search. */
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      visibleEvents = [...events];
      renderEvents(visibleEvents);

      if (searchStatus) {
        searchStatus.textContent = "Search cleared.";
      }
    }
  });
}

/* Clear search button. */
if (clearSearchButton) {
  clearSearchButton.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
    }

    visibleEvents = [...events];
    renderEvents(visibleEvents);

    if (searchStatus) {
      searchStatus.textContent = "Search cleared.";
    }
  });
}

/* B4: Hamburger menu toggles navigation. */
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
   navLinks.classList.toggle("is-open");

   const isExpanded = navLinks.classList.contains("is-open");

    menuButton.setAttribute("aria-expanded", String(isExpanded));
  });
}

/* B5: Event bubbling and event delegation. */
if (eventGrid) {
  eventGrid.addEventListener("click", (event) => {
    const clickedButton = event.target.closest("button");

    if (!clickedButton || !eventGrid.contains(clickedButton)) {
      return;
    }

    const action = clickedButton.dataset.action;
    const eventId = clickedButton.dataset.eventId;

    const selectedEvent = events.find((item) => item.id === eventId);

    if (!selectedEvent) return;

    /* Details button. */
    if (action === "details") {
      const card = clickedButton.closest(".event-card");
      const details = card.querySelector(".event-details");

      details.hidden = !details.hidden;

      clickedButton.textContent = details.hidden ? "Details" : "Hide Details";
    }

    /* RSVP button. */
    if (action === "rsvp") {
      if (selectedEvent.seats > 0) {
        selectedEvent.seats -= 1;
        rsvpedEventIds.add(eventId);

        console.log("RSVP completed:", selectedEvent.title);

        renderEvents(visibleEvents);

        if (eventStatus) {
          eventStatus.textContent = `RSVP submitted for ${selectedEvent.title}.`;
        }
      }
    }
  });
}

/* B8: Custom form validation. */
if (eventForm) {
  const organizerName = document.querySelector("#organizer-name");

  const contactNumber = document.querySelector("#contact-number");

  /* Custom validation for organizer name. */
  if (organizerName) {
    organizerName.addEventListener("input", () => {
      const name = organizerName.value.trim();

      organizerName.setCustomValidity(
        name.length < 2
          ? "Enter an organizer name with at least two characters."
          : "",
      );
    });
  }

  /* Custom validation for a 10-digit contact number. */
  if (contactNumber) {
    contactNumber.addEventListener("input", () => {
      contactNumber.setCustomValidity(
        /^[0-9]{10}$/.test(contactNumber.value)
          ? ""
          : "Enter exactly 10 digits.",
      );
    });
  }

  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!eventForm.checkValidity()) {
      eventForm.reportValidity();

      if (formMessage) {
        formMessage.textContent = "Please correct the errors in the form.";
      }

      return;
    }

    if (formMessage) {
      formMessage.textContent =
        "Validation passed. This demo does not save or send your proposal.";
    }

    console.log("Form validation passed.");
  });
}

/* Start the application. */
loadEvents();
