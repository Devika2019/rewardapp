
# Rewards App

A small React application to view customers and their reward points. Bootstrapped with Create React App and styled with styled-components.

## Features

- Customer list with pagination
- Select a customer to view details (points per month)
- Theming via styled-components
- PropTypes for runtime prop validation
- Unit tests (Jest/React Testing Library)

## Prerequisites

- Node.js 16+ and npm (or Yarn)
- Works on Windows, macOS, Linux

## Quick start (Windows)

1. Install dependencies
   - npm: `npm install`

2. Start development server
   - npm: `npm start`  
   Open http://localhost:3000

3. Run tests
   - npm: `npm test`

4. Build for production
   - npm: `npm run build`  
   Output is in the `build/` folder.

## Project structure (important files)

- src/
  - components/
    - CustomerList.js — customer list with pagination and selection
  - App.js — root component
  - index.js — app entry
- public/ — static assets

## Environment

- Optional: create a `.env` file in project root for environment variables (see CRA docs).

## Contributing

1. Fork the repo
2. Create a feature branch
3. Open a PR with a clear description

## License

MIT
