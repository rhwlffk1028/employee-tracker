# HW12: Employee-Tracker

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  This project allows a business owner to view and manage the information of departments, roles, and employees in his or her company. This application uses SQL database technology to utilize and manage the data. Node package inquirer is used to provide user interface, where a user is prompted to view, add, or update the employee management system.

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
 
  ## Installation
  Fork this repo into your GitHub. Make sure the fork process has been completed without any issue by checking all files in your forked repo. Verify wheter you have node.js installed on your desktop or not by running the command `node -v` in your terminal. If you do not have node.js installed, please go to https://coding-boot-camp.github.io/full-stack/nodejs/how-to-install-nodejs and it will walk you through the process.

You also need MySQL in order to run this application. If you do not have MySQL installed on your device, then please install and create an account.

Once you completed the installation process, try to run `npm start`, it will probably give you an error BECAUSE the required dependencies are not installed yet into the root directory. Run `npm install` to install required dependancies (check package.json). Then, you should be able to run `npm start`.

  ## Usage
First, make sure you are in the folder where SQL database files are saved. Then, run MySQL (`mysql -u {username} -p{password}`). While MySQL is running, run `source schema.sql;` followed by `source seeds.sql;`. This will create the existing tables in the database. Then run `exit` to quit from MySQL.

Go back to the folder where index.js file is saved. Now, run `npm start` or `node index.js` to start the application. Please see the demo below:
  
  ![demo](./assets/employee-tracker-demo.gif)

  
  ## License
  This project is covered under MIT License.

  <details>
    <summary>
      See License
    </summary> 
  
  ```
  Copyright <2021> <Kevin Choi>

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  ```
  </details>
  

  ## Contributing
  No contribution will be accepted at this moment.

  ## Tests
  There are no tests available in this application.

  ## Questions
  If you have any questions, please contact me via

  * Email: [kevchoi1028@gmail.com](mailto:kevchoi1028@gmail.com)

  * GitHub: [https://github.com/rhwlffk1028](https://github.com/rhwlffk1028)

  * Linkedin: [https://linkedin.com/in/kevchoi](https://linkedin.com/in/kevchoi)