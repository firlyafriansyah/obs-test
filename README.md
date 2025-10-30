# OBS Test Web Submission

## Features

- User Management (CRUD operations)
- Responsive Grid and List Views
- Search Functionality

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- ESLint
- Redux (for state management)
- React Hook Form (for form management)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd obs-test-submission
```

2. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/     # Reusable React components
├── contexts/       # App contexts and Redux store
|   └── app/        # Redux store
|   └── features/   # Redux slices and features
├── hooks/          # Custom React hooks
├── models/         # TypeScript interfaces and types
└── services/       # API and service functions
```

## State Management

The application uses Redux for state management with the following slices:

- Users state
- View mode state (grid/list)
- Loading state
- Alert state

## Development

### Code Style

The project uses ESLint for code quality. To check for any code style issues:

```bash
npm run lint
```
