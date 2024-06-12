# Adding Counties

Here are the steps to add web scraping functionality for new counties.

## Contents

- [Identify Target Sites](#identify-target-sites)
- [Plan data flow](#plan-data-flow)
- [Create scraping functions](#create-scraping-functions)

## Identify Target Sites

1. Search for the county's calendar, where they will usually post details about upcoming meetings, this will be the first target site.

2. Identify where on the calendar the meeting details are posted, and how to navigate to a meeting agenda. These agendas will be the next target sites.

## Plan data flow

1. On the agenda, we are looking for the following information:
   - County File Number
   - Hearing Date
   - Assessor Parcel Number
   - Requesting Party
   - Date Accepted
   Identify where this information is located on the page, and what patterns can be used to extract it.

2. After extracting the project information, the next step will be to cross reference it with the State Clearing House to obtain more information. Details on how to do this can be foudn in the source code for SLO county.

3. Once all the information is gathered, it will be stored in the database and displayed on the frontend.

## Create scraping functions

The easiest way to onboard a new county will be to mirror the existing logic in the web scraping functions for SLO county. In general, here the necessary steps to get it working:

- Endpoint to trigger the scraping process
    - Function to scrape the county's calendar
    - Function to scrape the county's agendas and extract the necessary information
    - Function to cross reference the project information with the State Clearing House
    - Function to add the projects to the database
    - Function to update project metadata
