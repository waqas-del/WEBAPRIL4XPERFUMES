import * as fs from 'fs';

async function download() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR-DPbyadf4F8LFQ8zmZfnTDrfmknmOk9IijaeSv2wDATIiz_33PZLVsp7jGlrYHPYlZfAhhqzONv8d/pub?output=csv';
  const response = await fetch(url);
  const text = await response.text();
  fs.writeFileSync('data.csv', text);
  console.log('Data saved to data.csv');
}

download();
