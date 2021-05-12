const csv = require('csv-parser');
const fs = require('fs');
const countryFinder = require("country-finder");

let undef = 0;
let undefCountries = [];

// fs.createReadStream('internet_data.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     let res = countryFinder.byName(row.country);
//     if(res == undefined) {
//       undef += 1;
//       undefCountries.push(row.country);
//     }
//     console.log(res);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//     console.log(undef);
//     console.log(undefCountries);
//   });

let all = countryFinder.all();
for(let i = 0; i < 130; i++) {
  console.log(all[i]);
}
console.log(all.length);