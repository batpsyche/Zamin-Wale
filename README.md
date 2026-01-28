# **Zaminwale Documentation**

## Project Setup

GO to the github copy the git clone link and paste it in your terminal and run the command.

```
git clone <Repository Link>
```

After cloning the project go to the project directory and run the command.

```
pnpm i
```
this will install all the dependencies for web application.

Use this command to run the application.

```
pnpm dev
```
---

## Introduction

This project Build with following technologies :
```
1.Next.Js
2.Tailwind CSS
3.Shadcn UI
4.React Hook Form
5.Radix Ui
6.Zustand
```

---

## Folder Structure

```
 public
    - assets

 src
    - actions
    |
    - app
    |    - (root)
    |    |    - about
    |    |    - about-99villa
    |    |    - awards
    |    |    - blogs
    |    |        - [blogId]
    |    |    
    |    |    - properties
    |    |    - search
    |    |        - top-location
    |    |            - [locationId]
    |    |    
    |    |    - testimonials
    |    |    - layout.jsx
    |    |    - page.jsx
    |    
    |    - (user)
    |    |    - (authenticate)
    |    |    |    - dashboard
    |    |    |    |    - edit
    |    |    |    |        - [propertyId]
    |    |    |    |
    |    |    |    |    - enquiry
    |    |    |    |
    |    |    |    |    - properties
    |    |    |    |        - enquiry
    |    |    |    |            - [propertyId]
    |    |    |    |        - visits
    |    |    |    |            - [propertyId]
    |    |    |    |
    |    |    |    |    - layout.jsx
    |    |    |    |    - page.jsx
    |    |    |    | 
    |    |    |    - post-property
    |    |    |         - create-property
    |    |    |         - page.jsx
    |    |    |   
    |    |    - auth
    |    |    |    - login
    |    |    |    - register
    |    |    |    - layout.jsx
    |    |    
    |    |    -layout.jsx
    |    
    |    
    - components
    |    - atoms
    |    - molecules
    |    - organisms
    |
    - constants
    - hooks
    - lib
    - mangagers
    - provider
    - store
```

### 1. Public Folder (public)

This folder contains all the static assets like images, icons, and other publicly accessible files. These files do not require processing and can be directly accessed via a URL.

Example contents:
- `favicon.ico` - The website's favicon.
- `logo.png` - Company or project logo.
- `robots.txt` - Used to manage search engine crawling.
- `manifest.json` - Defines metadata for progressive web apps (PWA).

---

### 2. Src Folder (src)

This folder contains all the source code of the application, including components, pages, utilities, hooks, and styles.

---

### 3. Actions Folder (src/actions)

This folder contains all API calls and other asynchronous actions. This helps in maintaining a cleaner codebase by keeping business logic separate from components.

Example structure:
```
src/actions/
  ├── auth.js      # Handles authentication-related API calls
  ├── user.js      # Fetches and manages user-related data
  ├── property.js  # Handles property-related API calls
```

---

### 4. App Folder (src/app)

This folder contains all the components and pages of the application. It serves as the main structure of the app and is responsible for routing.

---

### 5. Root Folder (src/app/root)

This folder contains all website pages that are accessible to the public. These pages do not require authentication and can be accessed by any user.

Example pages:
- `index.jsx` - The homepage.
- `about.jsx` - The about page.
- `contact.jsx` - The contact page.
- `blog.jsx` - Displays blog posts.

---

### 6. User Folder (src/app/user)

This folder contains all the user dashboard-related pages, such as creating and managing properties. Users must be authenticated to access these pages.

Example pages:
- `dashboard.jsx` - Displays user-specific information and controls.
- `create-property.jsx` - Allows users to create property listings.
- `settings.jsx` - Contains user account settings.

---

### 7. Authenticate Folder (src/app/user/authenticate)

This folder contains all authentication-related pages that require a user to be logged in.

Example pages:
- `dashboard.jsx` - User dashboard after successful authentication.
- `post-property.jsx` - Allows users to post properties after login.

Without authentication, users cannot access these pages.

---

### 8. Auth Folder (src/app/user/auth)

This folder contains authentication pages such as login and registration.

Example pages:
- `login.jsx` - Login page for existing users.
- `register.jsx` - Registration page for new users.

---

### 9. Layout Folder (layout.jsx)

This file serves as a server component where global settings like fonts, metadata, and SEO configurations (such as Open Graph tags for social sharing) are defined.

Key functionalities:
- Defines global styles.
- Loads font assets.
- Implements metadata for SEO optimization.
- Sets up a consistent layout structure across pages.

---

### 10. Page Folder (page.jsx)

This file serves as a client component where all page-related elements are managed. It primarily handles rendering and interactive elements on a page-by-page basis.

---

### 11. Components Folder (src/components)

This folder contains reusable components that are used across the application to maintain consistency and improve reusability.

---

### 12. Constants Folder (src/constants)

This folder contains static data in JSON format, such as blog content, API endpoints, and constant values used throughout the application.

Example contents:
- `blogs.js` - Stores blog post data.

---

### 13. Hooks Folder (src/hooks)

This folder contains custom React hooks that are used across the application.

Example hooks:
- `useAuth.js` - Manages authentication state and user sessions.

---

By following this structured organization, your application remains scalable, maintainable, and easy to navigate!


# Git Commands Guide

## 1. Git Add

```
git add <file>
git add .
```

### Explanation:
The `git add` command adds changes in the working directory to the staging area. This prepares the changes to be committed.

**Use cases:**
- `git add <file>`: Adds a specific file to the staging area.
- `git add .`: Adds all modified and new files to the staging area.

---

## 2. Git Commit

```
git commit -m "Your commit message"
```

### Explanation:
The `git commit` command records the changes in the repository with a message describing what was modified.

**Use cases:**
- `-m "Your commit message"`: Provides a message describing the commit.
- A commit saves changes locally but does not push them to a remote repository.

---

## 3. Git Push

```
git push origin <branch>
```

### Explanation:
The `git push` command sends the committed changes to a remote repository, making them available to others.

**Use cases:**
- `git push origin main`: Pushes changes from the local `main` branch to the remote repository.
- Used after making commits to share changes with a team.

---

## 4. Git Merge

```
git merge <branch>
```

### Explanation:
The `git merge` command integrates changes from one branch into another.

**Use cases:**
- `git merge feature-branch`: Merges `feature-branch` into the current branch.
- Used to combine completed work from different branches.
- May require resolving conflicts if the same lines of code were modified in both branches.

---

## 5. Git Pull

```
git pull origin <branch>
```

### Explanation:
The `git pull` command fetches and merges changes from a remote repository into the current branch.

**Use cases:**
- `git pull origin main`: Gets the latest updates from the remote `main` branch.
- Used to synchronize the local repository with the latest changes from collaborators.

---

By mastering these basic Git commands, you can efficiently manage version control and collaborate with your team!



