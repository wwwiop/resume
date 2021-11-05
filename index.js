let query = {
  n: "dan",
  i: "bu-ni-si-ss-sl-tc-tm".split("-")
};

if (document.location.search) {
  query = {
    ...query,
    ...Object.fromEntries(document.location.search.substr(1).split("&").map(entry => entry.split("=")))
  };
  query.i = query.i.split("-");
}
let resumeID = query.n || "dan";

let resumeJSON;
fetch(`resumes/${resumeID}.json`)
.then(response => response.json())
.then(data => {

  resumeJSON = data;

  if (query.i.length > 0) {
    resumeJSON.sections.forEach( section => {
      section.items = section.items.filter(item => query.i.find( id => item.id == id))
    });
    resumeJSON.sections = resumeJSON.sections.filter(section => section.items.length > 0);
  }

  let phoneNumberPure = resumeJSON.phoneNumber.split("").filter(digit => digit.search(/\(|\)|\s|-/) == -1).join("");

  let resumeHTML = `
  <h1>${resumeJSON.name}</h1>
  <h2>${resumeJSON.address}<br>
  <a target="_blank" href="tel:${phoneNumberPure}">${resumeJSON.phoneNumber}</a> | <a target="_blank" href="mailto:${resumeJSON.emailAddress}">${resumeJSON.emailAddress}</a></h2>
  ${
    resumeJSON.sections.map(section => `
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