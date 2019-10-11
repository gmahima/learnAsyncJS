const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Handle all fetch requests

async function getJson() {
  try{
    const response = await fetch(url);
    return await response.json();
  }
  catch(error) {
    throw(error);
  }
}

async function getProfiles(url) {
  const astroList = await getJson(url);
  const profileList = astroList.people.map(async (person) => {
    const craft = person.craft;
    const personJson = await getJson(wikiUrl + person.name);
    return {...personJson, craft}
  })
  return Promise.all(profieList);
}
// Generate the markup for each profile
function generateHTML(data) {
  data.map( person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <span>${person.craft}</span>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  });
}

btn.addEventListener('click', async (event) => {
  event.target.textContent = "Loading...";
  getProfiles(astrosUrl)
  .then(generateHTML)
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    event.target.remove()
  }); 
});