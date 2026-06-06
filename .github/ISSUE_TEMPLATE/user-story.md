---
name: User Story
about: This template defines a user story
title: ''
labels: ''
assignees: ''

---

**As a** full-stack developer 
**I need** to  create a full-stack web application called "GiftLink" to connects users who wish to give away household items they no longer need
**So that** users who enjoy recycling can find free household items to match their tastes rather than purchasing new ones.

### Details and Assumptions
    * The application must include: home page, listings page, navigation bar, search function, item details page, registration page, login page, and an editable profile page.
* Backend services exist partially; I will complete them to be robust, secure (authentication, input validation, hashed passwords), and scalable (pagination, efficient queries).
* Frontend will be a single‑page application (or server‑rendered with dynamic updates) providing seamless UX.
* Data models: User (id, email, username, password_hash, location, profile_picture), Listing (id, title, description, category, location, images, user_id, created_at, status: available/claimed).
* Authentication: JWT or session‑based, with protected routes for profile editing and listing management.
* Search: filter by keyword (title/description), category, location; results paginated.
* Images: stored as URLs (cloud storage) or base64; thumbnails for listings page.
* Security: HTTPS, password hashing (bcrypt), input sanitisation, rate limiting on login/register.

### Acceptance Criteria
    gherkin
 Given I have developed the complete GiftLink application
When a visitor opens the home page
Then they see a navigation bar, welcome message, and a preview of recent listings
And they can register with email, username, and password, then log in

Given a registered user is logged in
When they browse the listings page and use the search/filter
Then they see only matching items with pagination
And clicking on an item shows the full details with the giver’s username and a “Contact Giver” button

Given a logged-in user goes to their profile page
When they edit their email, location, or password and save
Then the changes are persisted and a success message is shown
And the navigation bar updates to reflect their logged-in state

Given any user (including unauthenticated) views an item detail page
When they attempt to see the giver’s contact info
Then only a “Log in to contact” link is shown, not the full contact details
And after logging in, the contact option becomes available

Given multiple users access the application simultaneously
When they perform searches, view listings, and update profiles
Then the backend responds within acceptable time limits and no security issues (e.g., SQL injection, broken auth) are present
