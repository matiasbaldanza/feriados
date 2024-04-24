const loadJsonFile = require('./loadJsonFile');

/**
 * Combines JSON data for holidays and holiday information.
 * @returns {Object|null} The parsed JSON object from the file or null in case of error.
 */

const formatHolidayData = (dataPath, holidays, year) => {
  const refs = loadJsonFile(dataPath, 'ref.json');

  if (!holidays || !refs) {
    return { error: `Data for year ${year} not found or reference data missing.` };
  }

  const monthNames = {
    enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
    julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12
  };

  let result = { 
    data: {
      year: year,
      Feriados: [] 
    }
  };

  holidays.forEach(monthObj => {
    const month = monthNames[monthObj.mes];
    Object.entries(monthObj).forEach(([day, id]) => {
      if (day !== 'mes') {
        day.split(',').forEach(singleDay => {
          const holidayDetails = Array.isArray(id) ? id : [id];
          holidayDetails.forEach(holidayId => {
            const ref = refs[holidayId];
            if (ref) {
              result.data.Feriados.push({
                dia: parseInt(singleDay),
                mes: month,
                id: holidayId,
                motivo: ref.motivo,
                tipo: ref.tipo,
                info: ref.info
              });
            }
          });
        });
      }
    });
  });

  return result;
};

module.exports = formatHolidayData;