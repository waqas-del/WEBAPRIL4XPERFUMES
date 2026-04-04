const fetch = require('node-fetch');
fetch('https://docs.google.com/forms/d/e/1FAIpQLSe_5eS5dX5iXRU6JvBvafqradZ5esz9d-5RrbHlUy2TSHWTBA/viewform')
  .then(r => r.text())
  .then(t => {
    const match = t.match(/var FB_PUBLIC_LOAD_DATA_ = (.*?);<\/script>/);
    if(match) {
      const data = JSON.parse(match[1]);
      data[1][1].forEach(q => console.log(q[1], '-> entry.' + q[4][0][0]));
    }
  });
