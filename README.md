# resume

I created this firstly as a test, and secondly as a convienient way to access and share my resume in mobile- and printer-firnedly HTML format via [wwwiop.github.io/resume](https://wwwiop.github.io/resume). Content of the resume can be curated with a query string.

### Presets

Flavors of my resume, which would have come in handdy at various times in the past:

* [Default Resume](https://wwwiop.github.io/resume) - short URL with no query string.
* [Artistic Resume](https://wwwiop.github.io/resume?p=at) - handy for small jobs and volunteer projects.
* [CG Resume](https://wwwiop.github.io/resume/?p=cg) - a quick look at my 3D graphics experience.
* [Software Resume](https://wwwiop.github.io/resume?p=sw) - unfortunately leaves out my experience flipping burgers, as priceless as it may be to the tech industry.
* [Single-Page Software Resume](https://wwwiop.github.io/resume?p=sp) - for when brevity really counts.
* [Combo](https://wwwiop.github.io/resume?p=al) - everything, including food-service.

### Query String Parameters

The content of the resume is determined by a query string which can specify different users, sets of experiences, or presets.

| Parameter | Default Value                   | Description                                                         | Example          |
| --------- | ------------------------------- | ------------------------------------------------------------------- | ---------------- |
| n         | "dan".                          | The name of resume data JSON file to use, minus the ".json" suffix. | n=dan            |
| i         | As defined in user's json file. | List of items to include, by ID, dash-seperated.                    | i=bu-ni-si-ss-sl |
| p         | As defined in user's json file. | Preset by which to set inclusions.                                  | p=sw             |