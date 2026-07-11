# Setup Instructions

## Prerequisites

- Node.js (v18 or later recommended)
- npm

## Install Dependencies

Install all required packages:

```bash
npm install
```

## Run the Frontend

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

## Run the Mock Backend

This project uses **json-server** as a mock backend.

Start the mock API server with:

```bash
npm run server
```

The mock backend will run on:

```
http://localhost:5000
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the frontend development server |
| `npm run server` | Start the json-server mock backend on port **5000** |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |