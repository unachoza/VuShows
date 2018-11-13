# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 2| Wireframes / Priority Matrix / Functional Components | Complete
|Day 3| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 4| Pseudocode / actual code | Complete
|Day 5| Initial Clickable Model  | Complete
|Day 6| MVP | Complete
|Day 7| Present | Completing


## Project Description

We have created an app that can search an API for TV shows and information about the seasons and episodes. This app allows the user to create a secure account with a user name and password. Once logged in, a user can search for a TV show and click on a list of search results pulled from the API and add these to their watch list. A user can log out and log back in to see their watch list is saved to their account. 

## Wireframes
https://res.cloudinary.com/dh41vh9dx/image/upload/v1541446190/Image_from_iOS.jpg

https://res.cloudinary.com/dh41vh9dx/image/upload/v1542123015/Image_from_iOS_2.jpg

Prototype:
https://invis.io/W7OYDF2AVZK

## Priority Matrix

https://res.cloudinary.com/duuqzvlvn/image/upload/v1541448252/unit03-project/Priority%20Matrix.jpg

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 

- Database building
- API call
- React front end with 6+ components, including Header and search bar
- User created favorites
- CRUD functionality
- Algorithmnic sorting & concatenation
- Using Trello to manage tasks and collaboration
- Layout and style your front-end with CSS
- Deployment

#### PostMVP 

- User Login
- Incorporate specifically tailored D3 visualizations
- Animation/ gif
- Quote Generator
- Series progress tracker

## React Architectural Design

Define the the React components and the architectural design of your app.

## Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into stateless/stateful components. 

| Component | Description | 
| --- | --- |  
| App | highest level component. Has login logic that is passed down, as well as Switch statement that takes user to login or create account page depending on account validation| 
| Body | A switch statment lives here that can will render all the subcomponents: favorites, show and search results  | 
| CreateUser | Renders form to allow user to make account and stores this data in database | 
| FaveShow | renders the show that was clicked on from search restuls | 
| Favorites | A function that pulls from the saved datalist of user favorites lives here and they are rendered.  | 
| Footer | The buttons with the functionality of HandleBack and HandleLogout live here | 
| Header | Renders Home icon and serach  | 
| Login | renders login info | 
| Main | All function logic lives here that are then passed down.   | 
| SearchResults | Renders datalist provided from Search| 
| Show | Where show info in rendered | 

| Home | This will render the parent layout | 
| TvShowList | This will render a list of tvshows | 
| TvShow | This will render individual tv shows | 
| TV Episode | This will render individual tv episodes | 
| Header | This will render the header include the nav | 
| Footer | This will render the footer include the nav | 

## Time Frames


| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Wire Framing and App Design | H | 4hrs| 4hrs | 4hrs |
| Creating Database | H | 6hrs| 3.5hrs | 12hr|
| Rendering Components | H | 8hrs| 3hr | 9hr|
| Collecting and Parsing API data | H | 5hrs| 4hrs | 4hrs |
| CRUD Functionality | H | 5hrs| 1h | 6hrs |
| Header with Search Bar | H | 8hrs| 4hrs| 4hrs |
| Front End Design | H | 10hrs| X | 10hrs |
| Algrhythmic Sorting and Concatination  | H | 10hrs| X | X |
| Artistry and CSS  | M | 12hrs| 2h | 6hrs |
| Local Storage and User Faves | M | 7hrs| 7hrs | 7hrs |
| CSS Animations | L | 6hrs| 2hrs | 2hrs |
| User Authentication & Hashing | M | 6hrs | 6hrs | 10hrs |
| Group Think / Merging | L | 4hrs | 4hrs | 4hrs |
| Experimenting | L | 0 | 1hr | 3hrs |
| Total | N/A | 81 | 2 | 73 |

## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description | 
| --- | :---: |  
| Capitalize | This will capitalize the first letter in a string of text | 
| Serach
| Favorites
| Toggle Favs

## Additional Libraries / Dependencies
    "axios": "^0.18.0",
    "body-scroll-lock": "^2.5.10",
    "react": "^16.6.0",
    "react-dom": "^16.6.0",
    "react-scripts": "^2

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

```
function reverse(string) {
    // here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  

 Fake user login became a real user login with Authentication functionality. Kozak made a lot of progress with this. 

## Issues and Resolutions
Time Management. increased communications. Work duplication. verion control. 

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier          

**RESOLUTION**: Missing comma after first object in sources {} object
