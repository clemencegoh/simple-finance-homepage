# Simple Sample Finance App


## Running the app
(remember to install using `npm i`)
```bash
npm run dev
```

## Assumptions
- You do not need to handle authentication or authorization.
- Currency is uniform and handled in the backend.
- The backend is provided and already implements the described API. The server will be running on localhost:8860 .
- The backend will handle all business logic, including account creation, balance retrieval, and transaction processing.


## Tech stack used/Technical choices
- Next/React framework
- TailwindCSS with ShadCN/ui
    - Base UI library, tailwind for easy customizability
- No global state management tools used/needed (like Redux or Zustand)
    - Everything is/should be handled by backend.
    - Interestingly, no GET methods are allowed for querying existing account balances or existing transactions. Traditionally this would be handled by the backend via a database, and not a great practice to store on the Frontend using any sort of local storage. Opting instead to keep everything in memory so every run is a fresh one.
- Zod for validation, react-hook-form for form state management
 
