# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

To run the testing suite run 

### `npm run test`

### How did you approach solving the problem?
I began by reviewing the task description and understanding the requirements:

I identified the key features required:

Displaying patient data,
Implementing a search feature,
Implementing a sort feature,
Considering UI including sticky navs and a sticky search field.
Given the recommendation of spending 2-3 hours, I prioritized functional tasks over the styling of the app.

### Include any decision-making around libraries used, tooling choices
React: Chose React as the front-end framework due to my familiarity with it, its popularity, as well as the fact it's used at Accurx.
create-react-app: Used create-react-app to quickly start with a solid boilerplate. It provided integrated tooling and Jest for testing.
How did you verify your solution works correctly?
Testing: create-react-app starts with Jest already installed. As I built out the functionality, I added tests to ensure things worked as expected.
fetch Mock: Used fetch Mock to simulate API responses during testing, ensuring controlled and predictable test scenarios.

### How long did you spend on the exercise?
3.5 hours

### What would you add if you had more time and how?
If given more time, I would:

Expand the sort functionality to be able to sort by vaccine type or date.
Expand the filter functionality to filter by vaccine type or search for NHS number.
Include the date of vaccine in the table and display it in a user-friendly way.
Add more robust testing coverage.
Implement more robust error handling mechanisms for API calls.
Improve accessibility features such as adding ARIA labels, keyboard navigation, and maintaining focus states.
Evaluate and optimize performance.
