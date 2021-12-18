let defaultName = "dan";

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

  let phoneNumberPure = resumeData.phoneNumber.split("").filter(digit => digit.search(/\(|\)|\s|-/) == -1).join("");

  let resumeHTML = `
  <h1>${resumeData.name}</h1>
  <h2>${resumeData.address}<br>
  <a target="_blank" href="tel:${phoneNumberPure}">${resumeData.phoneNumber}</a> | <a target="_blank" href="mailto:${resumeData.emailAddress}">${resumeData.emailAddress}</a></h2>
  ${
    resumeData.sections.map(section => `
      <h3>${section.title}</h3>
      <div class="divider"></div>
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
    `).join("")
  }
  `;

  document.getElementById("resume").innerHTML = resumeHTML;
});