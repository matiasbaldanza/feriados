const express = require('express');
const fs = require('fs');
const path = require('path');

const loadHolidayData = require('./src/utils/loadHolidayData');
const formatHolidayData = require('./src/utils/formatHolidayData');

// Load config
const dataPath = process.env.DATA_PATH || path.join(__dirname, '/data/')

const app = express();
const PORT = process.env.PORT || 3000;

const YEARS_AVAILABLE_FROM = 2024;
const YEARS_AVAILABLE_TO = 2024;

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
  const year = req.params.year;
  console.log(year);
  if (isNaN(parseInt(year))) {
    return res.status(404).send(
      {
        error: `'${year}' is not a valid year. Please indicate a year using the 'YYYY' numeric format`
      }
    )
  }

  if (
      year < YEARS_AVAILABLE_FROM || 
      year > YEARS_AVAILABLE_TO
    )
  {
    return res.status(404).send(
      { 
        error: `Data for the requested year ${year} is not available. Data currently available ranges from the year ${YEARS_AVAILABLE_FROM} to ${YEARS_AVAILABLE_TO}` 
      }
    );
  }

  const holidaysData = loadHolidayData(dataPath, year);
  if (holidaysData.error) {
    return res.status(404).send(holidaysData);
  }

  const formattedHolidays = formatHolidayData(dataPath, holidaysData, year)
  res.json(formattedHolidays);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});