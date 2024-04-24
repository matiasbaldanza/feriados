const loadJsonFile = require('./loadJsonFile');

// Helper function to load holiday data
const loadHolidayData = (dataPath, year) => {
  const filename = `${year}.json`;

  try {
    data = loadJsonFile(dataPath, filename);
    return data;
  } catch (error) {
    return { 
      error: `Error loading data for year ${year}: ${error.message}`
    };
  }
};

module.exports = loadHolidayData;