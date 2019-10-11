const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// function getJSON(url) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.onload = () => {
//       if(xhr.status === 200) {
//         let data = JSON.parse(xhr.responseText);
//         resolve(data);
//       }
//       else{
//         reject(Error(xhr.statusText));
//       }
//     };
//     xhr.onerror(() => {
//       reject(Error("network error"));
//     });
//     xhr.send();
//   }
//   )
// }

function getProfiles(json) {
  const profiles = json.people.map( person => {
      const craft = person.craft;
  return fetch(wikiUrl + person.name)
  .then((data) =>{ data.json()})
  .then((profile) => {
      return {...profile, craft}
  })
  .catch(() => {
      console.log(Error('error fetching wiki data'))
  });      
  }); 
  return Promise.all(profiles);
}

function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <span>${person.craft}</span>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  })
}

btn.addEventListener('click', (event) => {
  event.target.innerHTML = 'loading';

  fetch(astrosUrl)
  .then(data =>data.json())
  .then(getProfiles)
  .then(generateHTML)
  .catch(err => {
    peopleList.innerHTML = '<h2>Something went wrong</h2>';
    console.log(err)
  })
  .finally(() =>  event.target.remove());
 
});