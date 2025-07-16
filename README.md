# A New Leash on Life - Dog Adoption Platform

A web application for browsing and matching with adoptable dogs.

## Live Demo

<a href="https://new-leash-on-life.vercel.app" target="_blank" rel="noopener noreferrer">🌐 Visit A New Leash on Life</a>

**Demo Authentication**
- Use any name and email combination to log in (no account creation required)
- Sessions expire after one hour for security - simply log in again if needed

## Screenshot

![A New Leash on Life Application](./public/new-leash-on-life.png)

## Features Built
- **User Authentication**: Secure login with name/email validation
- **Search & Filtering**: Filter dogs by breed, age range, and location
- **Smart Sorting**: Multiple sort options (breed, name, age) with ascending/descending order
- **Pagination**: Efficient browsing through large datasets
- **Favorites System**: Heart/unheart dogs to build a favorites list
- **Matching**: Generate matches based on favorited dogs
- **Responsive Design**: Mobile-first design with smooth animations
- **Real-time Location Data**: Enriched location information for each dog

## Technical Highlights
- React + TypeScript for type safety
- TanStack Query for efficient data fetching and caching
- React Router v7 for modern routing
- Radix UI + Tailwind for accessible components
- Framer Motion for smooth animations
- Form validation with React Hook Form + Zod

## Browser Compatibility

View in Chrome or Firefox for the best experience.

To view in Safari you must allow sending cross-site cookies. Go to Safari > Preferences > Privacy and uncheck Prevent cross-site tracking.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone the repository:

```
git clone https://github.com/Joewebsta/new-leash-on-life.git
```

2. Navigate to the project directory:

```
cd new-leash-on-life
```

3. Install dependencies:

```
npm install
```

## Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).
