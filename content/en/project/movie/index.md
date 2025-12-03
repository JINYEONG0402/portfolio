---
title: Building a Movie Website Using TMDB
date: 2024-06-02
image:
focal_point: 'top'
---

Building a Personalized Movie Website Using TMDB

<!--more-->

This project aims to build a personalized movie website by leveraging the TMDB (The Movie Database) API
to retrieve movie information and manage user-specific favorite movie lists. The frontend was developed using Vue.
js, and the application is designed to deliver real-time data such as movie posters, details, trending films, 
and new releases through TMDB’s API.

https://jymovie.netlify.app/

Development Environment & Tech Stack

Frontend Framework: Vue.js
API: TMDB (The Movie Database) API
Implementation Details:
Fetching API data using Axios
Page navigation and routing with Vue Router
Managing user favorite movies using Vuex or Local Storage

Key Features
1. User Registration & Login
Implemented user sign-up and login functionality
As part of the project concept, entering the TMDB API Key into the password field 
redirects the user to the home screen
2. Home Screen Layout
Automatically loads a main banner movie
Displays Trending Movies
Shows New Releases

3. User Favorite Movie Management
Users can select movies and save them to their personal favorites list
Saved movies can be viewed collectively in a dedicated “Favorites” page

User Favorite Movie Management

Users can select movies they are interested in and save them to their personal favorites list.
All saved movies are displayed on a separate page, allowing users to browse their collection in a dedicated “Favorites” view.
