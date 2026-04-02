const https = require('https');

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR-DPbyadf4F8LFQ8zmZfnTDrfmknmOk9IijaeSv2wDATIiz_33PZLVsp7jGlrYHPYlZfAhhqzONv8d/pub?output=csv';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
