const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const YEARS_AVAILABLE_FROM = 2024;
const YEARS_AVAILABLE_TO = 2024;


// Helper function to load holiday data
const loadHolidayData = (year) => {
  try {
    const filePath = path.join(__dirname, 'data', `${year}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { error: `Error loading data for year ${year}: ${error.message}` };
  }
};


// Base URL for version 1 of Argentine holidays API
const baseRoute = '/v1/ar';

// Redirect from root to base route
app.get('/', (req, res) => {
  res.redirect(`${baseRoute}/2024`);
});

app.get('/v1', (req, res) => {
  res.redirect(`${baseRoute}/2024`);
});

app.get('/v1/ar', (req, res) => {
  res.redirect(`${baseRoute}/2024`);
});

// API endpoint to get holidays for a given year
app.get(`${baseRoute}/:year`, (req, res) => {
  const { year } = req.params;
  if (year < YEARS_AVAILABLE_FROM || year > YEARS_AVAILABLE_TO) {
    return res.status(404).send({ error: "Data for the requested year is not available." });
  }
  const holidays = loadHolidayData(year);
  res.json(holidays);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});