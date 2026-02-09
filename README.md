# DS-RTE Analytics

React + TypeScript + SCSS app to analyze **Évaluation Charge DS-RTE** CSV files and generate analytics reports.

## Features

- **File input**: Upload a CSV file with columns `Tâche`, `Catégorie`, `Sprint`
- **Analytics reports**:
  - Summary cards (total tasks, sprints, categories, avg per sprint)
  - Charge by sprint (bar chart)
  - Distribution by category (bar chart)
  - Sprint breakdown by category

## CSV format

Expected columns:

- `Tâche` – Task ID/description
- `Categorie` – Category (e.g. Composant, Devops / Architecture, Site Storybook)
- `Sprint` – Sprint number

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Usage

1. Click **Importer un fichier CSV**
2. Select your `Évaluation Charge DS-RTE - Main.csv` file
3. View the generated analytics reports
