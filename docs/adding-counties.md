# Adding Counties

Here are the steps to add web scraping functionality for new counties.

## Contents

- [Identify Target Sites](#identify-target-sites)
- [Plan data flow](#plan-data-flow)
- [Create scraping functions](#create-scraping-functions)

## Identify Target Sites

1. Search for the county's calendar, where they will usually post details about upcoming meetings for different committees. This will be the first target site.

2. Identify where on the calendar the meeting details are posted, and how to navigate to a meeting agenda. These agendas will be the next target sites.

## Plan data flow

1. On the agenda, we are looking for the following information:
   - County File Number
   - Hearing Date
   - Assessor Parcel Number
   - Requesting Party
   - Date Accepted
     
   Identify where this information is located on the page, and what patterns can be used to extract it. Note that the County File Number is a mandatory data point to extract for each project, as it will serve as the main identifier when cross referencing projects in the State Clearing House.

2. After extracting the project information, the next step will be to cross reference it with the State Clearing House to obtain more information. Details on how to do this can be found in the source code for SLO county.

3. Once all the information is gathered, it will be stored in the database and displayed on the frontend.

## Create scraping functions

The easiest way to onboard a new county will be to mirror the existing logic in the web scraping functions for SLO county. In general, here are the necessary steps to get it working:

- Endpoint to trigger the scraping process
    - Function to scrape agenda links from the county's calendar
    - Function to scrape the content from county's agendas and extract the necessary information
    - Function to cross reference the project information with the State Clearing House
    - Function to add the projects to the database
    - Function to update project metadata
 
## Integrating new counties in the frontend

Affected files:
- `frontend/src/components/projectTable.tsx`
- `frontend/src/components/scrapeButton.tsx`
- `frontend/src/app/about.page.tsx`

### Project Table

The table that displays scraped projcts should be filtered by county. With the dropdown menu, users should be able to select the county that they wish to load projects from. For each new county added, ensure that the corresponding county is listed as an option in the dropdown menu. When a given county is selected, the fetched projects should be filtered to display only the projects that correspond to that county, and associated labels should also be updated with the state change.

### Scraper Button

Additionally, ensure that the scraper button makes the request to the corresponding scraping API route.

### About Page

Make corresponding changes to the About page when adding additional counties. Sections that should be expanded upon include:
- *Data Sources*: Add cards that have links to additional data sources that were used/scraped from for each county
- *Web Scraping Approach*: Add details about the high-level web scraping flow through each data source and resource. Add diagrams as necessary.
- *Metadata*: Ensure metadata, including total hearings, total projects, and SCH %, are updated according to projects from newly added counties.
