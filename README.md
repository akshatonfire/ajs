## Single Page Application with Angular
*Project 9 of Treehouse Full Stack JavaScript course*

### To run this project:
Run `git clone https://github.com/jprittie/Single-page-application-with-AngularJS.git` to clone the project. Run the `npm install` command to install the dependencies. Run the `npm start` command to start the project with the node server. Navigate to localhost:5000.

### Project objectives:
This project creates a Recipe Book single page application using AngularJS. Students must use their knowledge of AngularJS to create controllers, update the provided HTML templates with ng attributes, and create a service that calls into the provided Node.js REST API.

The AngularJS SPA will be a “front end” or “client” application that complements the provided Node.js “back end” or “server” application. The code for the Node.js application is included as part of this project so you can run the back end server locally.

The RecipeAPI.json.postman_collection file is a collection of Postman requests that you can use
to test and explore the provided REST API.

### Specific requirements:
The application must include two screens: a screen that displays a list of recipes and a detail screen that allows the user to add or edit recipes.

#### 1. Recipes view
* Displays a list of recipes
* Allows the user to filter the list by the selected category
* Allows the user to add a new recipe
* Allows the user to edit or delete a recipe

#### 2. Recipe Detail view
* Allows a user to add or edit a recipe
* Allows a user to provide a recipe name, description, category (from a list of values), prep time, and cook time
* Allows a user to provide a list of ingredients
* Each ingredient includes an item, condition, and quantity
* Allows a user to provide a list of steps
* Each step includes a description
