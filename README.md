
# Acorn External Catalogue Stagging API Integration

This project is a simple web application that integrates a Laravel back-end with Laravel Mix (for assets compilation), React.js front-end and Material UI components to display a catalogue of learning content retrieved from the Acorn External Catalogue Stagging API. 

## Table of Contents

- [Prerequisites](#prerequisites)
- [Technologies Used](#technologies-used)
- [Environment Setup](#environment-setup)
- [API Integration](#api-integration)
- [Pages](#pages)
- [Testing](#testing)

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP**: Version 8.0 or higher
- **Composer**: Version 2.7.9 or higher
- **Node.js**: Version 20 or higher
- **npm**: Version 10.8.2 or higher
- **Git**: For versioning

## Technologies Used

- **Backend**: Laravel
- **Frontend**: React.js
- **Styling**: Material UI
- **Asset Management**: Laravel Mix
- **FrontEnd HTTP Client**: Axios
- **Backend HTTP Client**: GuzzleHttp

## Environment Setup

### Step 1: Clone the repository
Option 1: using HTTPS method in your terminal
```
https://github.com/Sarvesh-1712/acorn-external-catalogue.git
```
#### or #### 
Option 2: using GitHub CLI 
```
gh repo clone Sarvesh-1712/acorn-external-catalogue
```

And then open the terminal,
```
cd acorn-external-catalogue
```

Switch to master branch, 
```
git checkout master
```

### Step 2: Install the dependencies
Install the laravel related dependencies using,
```
composer install
```
- All the laravel packages must be installed correctly. Report any issues found to the respository.

Install the react related dependencies using,
```
npm install
```
- All the react.js packages must be installed correctly. Report any issues found to the respository.

Copy the env file
```
cp .env.example .env
```
- Include all additional variables provided in the email to an authorised person. 

### Step 3: Run the Development Environment 
1: Compile Assets using Laravel Mix and start the frontend development server:
```
npm run watch
```
- Running this command will automatically compile your assets whenever you make changes.

2: Start the local development server in a separate terminal, 
```
php artisan serv
```
- This notifies the development server running URL. Use that for viewing the web application built.

## API Integration

#### Endpoints
When you open the development environment, the following APIs are initiated:

From the frontend,
```
GET /contents
```
- React library using Axios for making this API call. 
- When the contents are being loaded, "Loading contents. Please wait" is shown.
- When the requests fails, "Error happened while fetching response" is shown.

Backend:
```
GET https://staging.acornlms.com/local/acorn_coursemanagement/index.php/api/1.1/external_catalogue/3?perPage=16
HEADER: [ 
   AUTHORIZATION: BEARER ACCESS_TOKEN
]
```
- Laravel uses GuzzleHttp client for handling the API response from the Acorn's server. 
- This fetches the Content items from which three main content types are considered for this implementation.
- Followed Inheritance concept having "Content" as base class and following as derived classes:
   - Course
   - Live learning
   - Program
- When constructing the overall response, the "badge color" (differs content types) and types are provided by respective content type component.

### Pages 
1. Home: 
```
APP_URL/
```
- Home page with title and a "View Catalogue" button. Clicking that navigates to Catalogue page mentioned later. 

2. Catalogue
```
APP_URL/catalogue
```
- Displays the list of contents using Material UI's Grid and Card Component. 
- Card Component includes:
     - Content Type
     - Image
     - Full Name
     - Summary
     - Show More / Less based on the summary length.


## Testing
Running the React tests using Jest
```
npm test
```

Running the Laravel tests using Mockery
```
php artisan test
```
