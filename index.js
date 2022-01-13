let defaultName = "dan";
let backupURL = "pdf/resume.pdf";
let onError = function(error) {
  console.log(error);
  location.href = backupURL;
}

let settings = {
  name: defaultName,
  inclusions: null
};

if (document.location.search) {
  let queryString = document.location.search.split("?")[1];
  let queryStringEntries = queryString.split("&").map(entryString => entryString.split("="));
  let queryStringObj = Object.fromEntries(queryStringEntries);

  if (queryStringObj.n) settings.name = queryStringObj.n;
  if (queryStringObj.i) settings.inclusions = queryStringObj.i;
}

let resumeData;

let resumeEl = document.getElementById("resume");

resumeEl.innerHTML = "Loading Resume...";

fetch(`resumes/${settings.name}.json`)
.then(response => response.json())
.then(data => {
  resumeData = data;

  if (!settings.inclusions) settings.inclusions = resumeData.defaultInclusions;
  settings.inclusions = settings.inclusions.split("-");

  if (settings.inclusions.length > 0) {
    resumeData.sections.forEach( section => {
      section.items = section.items.filter(item => settings.inclusions.find( id => item.id == id))
    });
    resumeData.sections = resumeData.sections.filter(section => section.items.length > 0);
  }

  document.title = `${resumeData.name}'s Resume`;

  let phoneNumberPure = resumeData.phoneNumber.split("").filter(digit => digit.search(/\(|\)|\s|-/) == -1).join("");
  resumeData.sections.forEach(section => {
    section.twoColumns = section.items.length > 1
  })

  let resumeHTML = `
  <h1>${resumeData.name}</h1>
  <h2>${resumeData.address}<br></h2>
  <h2>  
    <a target="_blank" href="tel:${phoneNumberPure}">${resumeData.phoneNumber}</a>
    <span class="divider-vert"></span>
    <a target="_blank" href="mailto:${resumeData.emailAddress}">${resumeData.emailAddress}</a>
    <span class="divider-vert"></span>
    <a target="_blank" href="https://www.github.com/${resumeData.githubUsername}">github.com/${resumeData.githubUsername}</a>
  </h2>
  ${
    resumeData.sections.map(section => `
      <div class="section">
        <h3 id="${section.title}">${section.title}</h3>
        <div class="divider"></div>
        <div class="${section.twoColumns ? "two-columns" : ""}">
        ${
          section.items.map(item => `
            <div class="item-container">
              <h4>${item.title}</h4>
              ${item.subtitle || item.dateRange ? `
                <div class="subtitle">
                  ${item.subtitle ? `<span>${item.subtitle}</span>` : ``}
                  ${item.dateRange ? `<span>${item.dateRange}</span>` : ``}
                </div>
              ` : ``}
              <ul>
                ${
                  item.points.map(point => `
                    <li>${point}</li>
                  `).join("")
                }
              </ul>
            </div>
          `).join("")
        }
        </div>
      </div>
    `).join("")
  }
  `;

  resumeEl.innerHTML = resumeHTML;
})
.catch(onError);