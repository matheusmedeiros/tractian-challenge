<h1 align="center">
  <br>
    <a href="https://youtu.be/1J0XT1CHVMI">
      <img src="https://img.youtube.com/vi/1J0XT1CHVMI/maxresdefault.jpg" alt="Project Demo Video" width="600">
    </a>
  <br>
  Tractian Frontend Challenge
  <br>
</h1>

<h4 align="center">A tree visualization application developed for Tractian's frontend challenge. Check out the live demo at <a href="https://tractian-challenge-nu.vercel.app/">https://tractian-challenge-nu.vercel.app/</a>.</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#optimizations">Optimizations</a> •
  <a href="#installation">Installation</a> •
  <a href="#technologies">Technologies</a>
</p>

## Features

The application provides a hierarchical visualization of Tractian's data:

- Tree structuring of locations and assets from the API
- Integrated filtering system:
  - Element name search
  - Energy sensor filtering
  - Critical status visualization
- Intuitive tree structure navigation
- Expandable/collapsible elements
- View state persistence during filtering

## Optimizations

The project was developed with a focus on performance and usability:

- Virtualization implementation for handling large data volumes
- Performance optimization through memoization
- Responsive design for all screen sizes
- Optimized filtering system preserving hierarchies
- Efficient state management with Zustand
- Caching and revalidation system using React Query

## Installation

### Prerequisites

Make sure you have installed:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/download/)

### Step by Step

```bash
# Clone the repository
$ git clone https://github.com/matheusmedeiros/tractian-challenge

# Navigate to the project folder
$ cd tractian-challenge

# Install dependencies
$ npm install

# Start development server
$ npm run dev
```

## Technologies

This project was built using:

- React
- Vite
- TypeScript
- Zustand
- React Query
- Tailwind

## Future Improvements

Given more time, these would be the next enhancements:

- Type Safety Enhancement: Implement Zod for runtime type validation and API response parsing, ensuring data consistency throughout the application's tree structure
- Accessibility improvements
- Preview components with mock to future endpoint implementation
- Add test to filter tree
- Add debounce to search filter
