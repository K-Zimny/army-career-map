# Army Career Path Simulation App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

The Army Career Path Simulation App allows users to simulate a 20-year Army career path based on their preferences and interests. Users answer a series of questions, and the app generates a realistic career progression using the OpenAI API. The results include milestones such as rank promotions, earnings, benefits, and achievements.

## Features

- **Questionnaire**: Users answer four questions about their career preferences.
- **Career Path Simulation**: The app generates a 20-year career path with milestones every 5 years, which updates dynamically based on user choices.
- **Dynamic UI**: The results are displayed in a user-friendly format, showing detailed information for each milestone.
- **Reusable Components**: Includes reusable components like `CTA`, `CustomText`, and `ComponentWrapper` for consistent UI.
- **Interactive Walkthrough**: A guided walkthrough is available to help users navigate the app.

## How It Works

1. **Landing Page**:

   - Navigate to the `/` route.
   - View the Walkthrough notes on the left hand side, with option to toggle closed.

2. **Questionnaire**:

   - Navigate to the `/questionnaire` route.
   - Answer the four questions about your career preferences.
   - Submit the form to generate a career path.

3. **Backend Processing**:

   - The app sends the questionnaire responses to the `/api/generateCareerPath` API route.
   - The backend uses the OpenAI API to generate a career path based on the user's answers.
   - The response includes milestones with details such as rank, earnings, benefits, and achievements.

4. **Simulated Career Path**:

   - After submitting the questionnaire, the app redirects to the `/simulate` route.
   - The `/simulate` page displays the generated career path, showing milestones every 5 years.
   - At each milestone, the user is presented with two choices which will impact the next milestone and their career path.

5. **Results Page**:
   - The `/results` page summarizes the user's career path and provides additional resources like housing and retirement options by sending the users career path to `/api/generateResults`.
   - The results page also includes dynamically generated "Explore" links by sending the users entire career path to `/api/performWebSearch`, which uses GoArmy.com as a content source.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OMC-Critical-Mass/hackathon-career-map.git
   cd army-career-map
   ```

2. Install dependencies:

   ```npm install```

3. Create a .env file in the root directory and add your OpenAI API key:

   ```OPENAI_API_KEY=your_openai_api_key```

4. Run the development server:

   ```npm run dev```

5. Open http://localhost:3000 in your browser to see the app.

