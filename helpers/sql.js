const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

// dataToUpdate receives argument {} containing new values {key1: newValue, ...}
// then Object.keys extracts keys from key:value pairs and sets them as values in a array name 'keys'
// Then using keys.map, data is then mapped to the corresponding database columns to be updated
//  The return statement returns the updated keys and values  in the cols[] as a  key:value pairs separated by a comma.  






function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  
// dataToUpdate receives argument {} containing new values {key1: newValue, ...}

// then Object.keys extracts keys from key:value pairs and sets them as values in a array name 'keys'

  const keys = Object.keys(dataToUpdate);
 
  // Error handler to ensure data body is not empty.
  if (keys.length === 0) throw new BadRequestError("No data");


  // Then using keys.map, data is then mapped to the corresponding database columns to be updated
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );
  
  
  //  The return statement returns the keys and values in the cols[] as a  key:value pairs separated by a comma.  

  return {  

    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
