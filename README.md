# Multi-Project Workspace

This repository contains multiple mini-projects, each designed to explore and demonstrate different aspects of web development. Each project is self-contained and focuses on a specific feature or functionality.

## Projects Overview

### 1. **F1 Countdown Timer**
A dynamic countdown timer for the next Formula 1 race.

#### Features:
- Displays the next Formula 1 race with:
  - Race name, circuit name, and location.
  - Date and time of the race.
  - Countdown to the race (days, hours, minutes, seconds).
- Dynamically updates the background and icon based on the upcoming race.
- Fully responsive design.

#### Key Files:
- `src/f1-countdown/components/CountdownTimer.tsx`: Main React component.
- `src/f1-countdown/data/races2025.json`: JSON file containing race schedule and metadata.
- `src/f1-countdown/styles`: SCSS styles for the countdown timer.

---

### 2. **Random Jokes Generator**
A fun project to generate random jokes.

#### Features:
- Fetches random jokes from an API.
- Allows toggling jokes on and off.
- Built with React.

#### Key Files:
- `src/random-jokes/components/JokesGenerator.tsx`: Main React component.
- `src/random-jokes/styles`: SCSS styles for the jokes generator.

---

## How to Run the Workspace
1. Clone the repository:
2. Install dependencies: `npm install`.
3. Start the app: `npm start`.

---
## Technologies Used
- React: For building user interfaces.
- TypeScript: For type-safe development.
- Sass (SCSS): For styling.
- Vite: For fast development and build tooling.