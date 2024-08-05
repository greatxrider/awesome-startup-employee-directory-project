# Awesome Startup Employee Directory

## Overview
The Awesome Startup Employee Directory is a web application designed to help remote employees share contact information efficiently. This project showcases the ability to communicate with APIs to fetch and display dynamic content without relying on frameworks, libraries, or plugins.

Using the Random User Generator API (https://randomuser.me/), the app fetches data for 12 random employees and displays their information in a user-friendly grid format. Each employee entry includes a thumbnail image, full name, email, and location. Clicking on an employee's image or name opens a modal window with more detailed information, such as the employee’s birthday and address.

This project emphasizes a deep understanding of how web tools work "under the hood" by requiring custom JavaScript for all functionality. It's an excellent addition to my portfolio, demonstrating skills in working with public APIs, making API requests, and asynchronously handling and displaying data.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Additional Notes](#additional-notes)
- [License](#license)

## Features
- Displaying a list of 58 employees with pagination controls.
- Dynamically updating the employee list based on search input.
- Responsive pagination based on search results.
- Modal window with detailed employee information.
- Modal Navigation: Added navigation functionality within the modal to toggle between employees.
- Added pagination functionality to move to another page of employees.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Navigate to the project directory.
3. Open index.html in a web browser.

## Usage
1. Open index.html in a web browser to view the employee directory.
2. Navigate through pages using pagination buttons.
3. Use the search bar to filter employees by name.
4. Click on an employee's image or name to view detailed information in a modal window.

## Technologies Used
• HTML5
• CSS3
• JavaScript

## Project Structure

project-root/
│
├── index.html
├── css/
│   ├── normalize.css
│   └── styles.css
├── js/
│   └── scripts.js
└── mockups/
    ├── employee_directory.png
    └── employee_overlay.png

## Additional Notes 
• This project emphasizes dynamic rendering of content using JavaScript.
• Contributions and feedback are welcome via GitHub pull requests.
• The project includes additional steps for preparing, building, and testing.
• The following style changes were made:
    - Background Color: The background color of the modal was changed to sky blue to improve the visual appeal.
    - Font Types: Custom fonts were used to enhance readability and aesthetics.
    - Title and Headers Position: The position of the title and headers was adjusted for better alignment and visual hierarchy.
    
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
