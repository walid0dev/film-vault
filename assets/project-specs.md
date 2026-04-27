# FilmVault: Project Specification

## 1. Project Overview

**FilmVault** is a Single Page Application (SPA) built with React that allows users to manage a personal movie catalog. In a world of ever-increasing content, FilmVault provides a simple, interactive, and centralized solution for organizing, rating, and discovering personal favorite films.

The primary goal is to develop a dynamic and responsive user interface for managing a movie collection, with all data persisted locally in the browser's `localStorage` to simulate a backend-less environment.

### Core Objectives:
- **Display & Manage:** Show a filterable and sortable list of movies.
- **CRUD Operations:** Enable users to add, view, update, and delete movies.
- **Rating & Filtering:** Implement a real-time rating and filtering system.

---

## 2. Functional Requirements

### 2.1. Movie Display
- Movies shall be displayed in a card-based layout.
- Each movie card must show the following information:
  - Title
  - Poster Image
  - Genre
  - Rating (e.g., as stars)

### 2.2. Movie Creation
- A button in the main navigation bar shall trigger a modal containing a movie creation form.
- The form must include the following fields:
  - `title` (text)
  - `description` (textarea)
  - `releaseYear` (number)
  - `genre` (text/select)
  - `director` (text)
  - `actors` (list of names, e.g., comma-separated)
  - `imageUrl` (URL)
  - `trailerUrl` (URL, e.g., YouTube)
  - `rating` (1 to 5)
- Upon submission, the new movie should be dynamically added to the main list without a page reload.

### 2.3. Movie Details View
- Clicking on a movie card shall navigate the user to a detailed view for that movie.
- This view must display all movie attributes:
  - Title, Description, Release Year, Genre, Director, Actors, Image, Trailer, and Rating.

### 2.4. Update & Delete
- The application must provide functionality to edit and delete a movie.
- These actions should be accessible from the movie detail view or the movie card.
- The movie list must update automatically to reflect any changes.

### 2.5. Rating System
- Users must be able to rate a movie on a scale of 1 to 5 stars.
- The rating should influence the movie's display, its ranking in sorted lists, and filtering results.

### 2.6. Movie Filtering
- The UI must include controls to filter the movie list based on:
  - **Genre**
  - **Minimum Rating**
- Filtering results must be applied in real-time as the user interacts with the controls.

### 2.7. Top-Rated Movies
- The application should highlight top-rated movies in dedicated UI sections:
  - **Hero Section:** Display the single highest-rated movie.
  - **Top 3 Section:** Showcase the top three best-rated movies.
  - **Main List:** Allow sorting the full list by rating.

### 2.8. UI Layout
The interface should be organized as follows:
1.  **Navbar:** Contains the "Add Movie" button.
2.  **Hero Section:** Features the top-rated movie.
3.  **"Top 3" Section:** Displays the three best-rated movies.
4.  **Main Movie List:** A filterable and sortable grid of all movies.

### 2.9. Data Persistence
- All movie data must be stored in the browser's `localStorage`.
- The application state (the movie list) must be rehydrated from `localStorage` on page load, ensuring data is preserved across sessions.

---

## 3. Bonus Feature: Trailer Playback

- A "Watch Trailer" button should be available in the movie detail view.
- Clicking this button will open a modal containing an embedded video player.
- The trailer will be displayed using an `<iframe>` pointing to the `trailerUrl` (e.g., a YouTube embed).

---

## 4. Technical & Performance Criteria

### 4.1. Key Learning Methods
- **Component-Based Architecture:** Decompose the UI into clear, reusable React components.
- **State Management:** Use the `useState` hook for managing component-level state correctly.
- **Event Handling:** Implement robust handling for user events (form submissions, clicks, filter changes).
- **Logic Implementation:** Write clean logic for CRUD operations, filtering, and sorting.

### 4.2. Performance & Evaluation Criteria
- **SPA Principles:** Demonstrate a strong understanding of building a dynamic interface without full page reloads.
- **State & Effects:** Correctly use `useState` for data management and `useEffect` for side effects like `localStorage` persistence.
- **Dynamic Rendering:** Efficiently render data using `map`, conditional rendering, and filtering logic.

---

## 5. Project Timeline & Deliverables

- **Project Duration:** 5 days
- **Launch Date:** April 27, 2026, 10:30 AM
- **Submission Deadline:** April 30, 2026, 11:59 PM
- **Final Push:** Sunday before 11:59 PM.

### Deliverables:
- Link to a Trello board for planning.
- Link to a presentation (e.g., slides, video).
- Link to the GitHub repository.
- Link to a Figma design file.
