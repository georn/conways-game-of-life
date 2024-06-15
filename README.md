# Conway's Game of Life

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-brightgreen)](https://conways-game-of-life-mv2yrvgga-guillermos-projects-cd31575a.vercel.app)

## Overview

This is a mini-project built for fun and to practice and review React concepts. The project implements Conway's Game of Life, a cellular automaton devised by the British mathematician John Horton Conway in 1970.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Styled Components**: Utilized for component-level styling.
- **Vercel**: Platform for deployment and hosting.
- **GitHub Actions**: For Continuous Integration and Continuous Deployment (CI/CD).

## Project Structure

The project is structured as follows:

- **src/components**: Contains the `Grid` component that renders the Game of Life grid.
- **src/App.js**: The main application file that includes the `Grid` component.
- **src/index.js**: The entry point of the React application.

## Features

- Interactive grid where users can toggle cells between alive and dead states.
- Automatic updating of the grid according to the rules of Conway's Game of Life.
- Deployed on Vercel for easy access and demonstration.

## How to Run the Project

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/conways-game-of-life.git
   cd conways-game-of-life
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
The app will be available at http://localhost:3000.

## Deployment

The project is deployed on Vercel. To deploy your own instance:

1. **Create a Vercel account at [Vercel](https://vercel.com/).**

2. **Install the Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Set up GitHub Actions for CI/CD:**
 - Add the `ci.yml` workflow file in `.github/workflows/ci.yml`.
 - Add the required secrets (`VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`) to your GitHub repository settings.

 4. **Deploy the project:**
 - Push your code to GitHub.
 - GitHub Actions will automatically run tests and deploy the project to Vercel if the tests pass.

## Project Goals

- Practice and reinforce React concepts.
- Gain experience with component-level styling using Styled Components.
- Deploy a project using Vercel and GitHub Actions to gain experience with modern deployment workflows.

## Future Enhancements

- <s> Add buttons for starting, stopping, and resetting the game. </s>
- Improve the styling for better user experience.
- Optimize performance for larger grids.
- <s> Add tests for the grid update logic and UI components. </s>