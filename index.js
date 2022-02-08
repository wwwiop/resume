// default resume json file name, found in "resumes" folder
let defaultName = "dan";
// defaults to this pdf if anything goes wrong loading the resume.
let backupURL = `pdf/${defaultName}.pdf`;
let onError = function(error) {
  console.log(error);
  //location.href = backupURL;
}

let settings = {
  name: defaultName,
  presetID: null,
  inclusions: null
};

if (document.location.search) {
  // convert query string to an object with values interpreted as strings
  let queryString = document.location.search.split("?")[1];
  let queryStringEntries = queryString.split("&").map(entryString => entryString.split("="));
  let queryStringObj = Object.fromEntries(queryStringEntries);

  // set setttings to query sring argument. leave it unchanged if argument is not found in query string
  settings.name = queryStringObj.n || settings.name;
  settings.presetID = queryStringObj.p || settings.presetID;
  settings.inclusions = queryStringObj.i || settings.inclusions;
}

let resumeData;

let resumeEl = document.getElementById("resume");

resumeEl.innerHTML = "Loading Resume...";

// fetch resume data from "resumes" folder
fetch(`resumes/${settings.name}.json`)
.then(response => response.json())
.then(data => {
  // give global access to resume data - helpful for debugging
  resumeData = data;
  
  // set resume inclusions
  if (!settings.inclusions) {
    // default the preset ID if one is not provided in query string
    if (!settings.presetID) settings.presetID = resumeData.defautPresetID;
    // use preset to get inclusions
    if (!settings.inclusions) {
      let preset = resumeData.presets.find(preset => preset.id == settings.presetID);
      if (!preset) {
        preset = resumeData.presets.find(preset => preset.id == resumeData.defautPresetID);
      }
      settings.inclusions = preset.inclusions;
    };
  };
  // convert inclusions from string to array of strings
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
    <a target="_blank" href="mailto:${resumeData.emailAddress}">${resumeData.emailAddress}</a>
    <a target="_blank" href="tel:${phoneNumberPure}">${resumeData.phoneNumber}</a>
    <a target="_blank" href="https://www.github.com/${resumeData.githubUsername}">github.com/${resumeData.githubUsername}</a>
  </h2>
  ${
    resumeData.sections.map(section => `
      <div class="section">
        <h3 id="${section.title}">${section.title}</h3>
        <div class="divider"></div>
        <div class="${section.twoColumns ? "two-columns" : ""}">
        ${
          section.items.map((item, index) => `
            <div class="item-container" style="${
              // set style to span two columns if it is the only element in its row
              (section.items.length % 2 == 1 && index == 0) ? `grid-column: 1 / 3` : ``
            }">
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