const fs = require('fs');
const path = require('path');

/**
 * Loads JSON data from a specified file.
 * @param {string} dirPath - The directory path where the file is located.
 * @param {string} filename - The name of the file to read.
 * @returns {Object|null} The parsed JSON object from the file or null in case of error.
 */

const loadJsonFile = (dirPath, filename) => {
  try {
    const filePath = path.join(dirPath, filename);
    const data = fs.readFileSync(filePath, 'utf8');    
    try {
      return JSON.parse(data);  // Attempt to parse the data
    } catch (parseError) {
      console.error(`Parsing error in ${filename}: ${parseError}`);
      return null;  // Return null if parsing fails
    }
  } catch (error) {
    console.error(`Error loading ${filename} from ${dirPath}: ${error}`);
    return null;
  }
};

module.exports = loadJsonFile;
