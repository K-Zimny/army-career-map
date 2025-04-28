# Army Career Path Simulation App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

The Army Career Path Simulation App allows users to simulate a 20-year Army career path based on their preferences and interests. Users answer a series of questions, and the app generates a realistic career progression using the OpenAI API. The results include milestones such as rank promotions, earnings, benefits, and achievements.

## Features

- **Questionnaire**: Users answer five questions about their career preferences.
- **Career Path Simulation**: The app generates a 20-year career path with milestones every 5 years.
- **Dynamic UI**: The results are displayed in a user-friendly format, showing detailed information for each milestone.

## How It Works

1. **Questionnaire**:

   - Navigate to the `/questionnaire` route.
   - Answer the five questions about your career preferences.
   - Submit the form to generate a career path.

2. **Backend Processing**:

   - The app sends the questionnaire responses to the `/api/generateCareerPath` API route.
   - The backend uses the OpenAI API to generate a career path based on the user's answers.
   - The response includes milestones with details such as rank, earnings, benefits, and achievements.

3. **Simulated Career Path**:
   - After submitting the questionnaire, the app redirects to the `/simulate` route.
   - The `/simulate` page displays the generated career path, showing milestones every 5 years.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## File Structure

```
src/
├── app/
│   ├── questionnaire/         # Questionnaire page
│   │   └── page.jsx           # Questionnaire logic and UI
│   ├── simulate/              # Simulate page
│   │   └── page.jsx           # Displays the career path
│   └── api/
│       └── generateCareerPath.js # Backend API route for career path generation
├── data/
│   └── questionnaire.js       # Questionnaire data (questions and options)
├── store/
│   ├── questionnaireStore.js  # Zustand store for questionnaire state
│   └── simulationStore.js     # Zustand store for simulation state
```

## Environment Variables

Create a `.env` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
