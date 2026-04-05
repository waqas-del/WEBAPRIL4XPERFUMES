import * as fs from 'fs';

async function fetchCsv() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQd1szVQfOnOE7IZF1Rfo1FgxhzDSx1F5vQX0tS4PNWW1t8wrJ_ifrAvkWF54Mzoroh6ieEeemh_trI/pub?output=csv';
  const res = await fetch(url);
  const text = await res.text();
  console.log(text);
}

fetchCsv();
