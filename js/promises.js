const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if(xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      }
      else{
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror(() => {
      reject(Error("network error"));
    });
    xhr.send();
  }
  )
}

function getProfiles(json) {
  const profiles = json.people.map( person => {
  return getJSON(wikiUrl + person.name, generateHTML);      
  }); 
  return Promise.all(profiles);
}

function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `;
  })
}

btn.addEventListener('click', (event) => {
  event.target.innerHTML = 'loading';

  getJSON(astrosUrl)
  .then(getProfiles)
  .then(generateHTML)
  .catch(err => {
    peopleList.innerHTML = '<h2>Something went wrong</h2>';
    console.log(err)
  })
  .finally(() =>  event.target.remove());
 
});