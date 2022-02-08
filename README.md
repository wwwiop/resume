# resume

I created this firstly as a test, and secondly as a convienient way to access and share my resume in mobile- and printer-firnedly HTML format via [wwwiop.github.io/resume](https://wwwiop.github.io/resume). Content of the resume can be curated with a query string.

### Presets

Flavors of my resume, which would have come in handdy at various times in the past:

* [Default Resume](https://wwwiop.github.io/resume) - short URL with no query string.
* [Software Resume](https://wwwiop.github.io/resume?p=sw) - emphasizes software experiences and skills.
* [Artistic Resume](https://wwwiop.github.io/resume?p=at) - emphasizes artistic experiences and skills.
* [CG Resume](https://wwwiop.github.io/resume/?p=cg) - emphasizes computer graphics experiences and skills.
* [Single-Page Software Resume](https://wwwiop.github.io/resume?p=sp) - for when brevity really counts.

### Query String Parameters

The content of the resume is determined by a query string which can specify different users, sets of experiences, or presets.

| Parameter | Default Value                   | Description                                                         | Example          |
| --------- | ------------------------------- | ------------------------------------------------------------------- | ---------------- |
| n         | "dan".                          | The name of resume data JSON file to use, minus the ".json" suffix. | n=dan            |
| i         | As defined in user's json file. | List of items to include, by ID, dash-seperated.                    | i=bu-ni-si-ss-sl |
| p         | As defined in user's json file. | Preset by which to set inclusions.                                  | p=sw             |