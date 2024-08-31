# Talent Verify

Talent Verify is a React-based frontend application that interacts with a Django REST API for managing companies and employees. This project includes user authentication and data fetching using Axios.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication using token-based authentication.
- Fetch and display a list of companies.
- Create new companies and employees.
- File upload functionality for employee data.

## Technologies

- **Frontend**: React, Axios
- **Backend**: Django REST Framework
- **Authentication**: Django Rest Framework Auth Token
- **State Management**: React hooks

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/talent-verify.git
   cd talent-verify
   ```

2. **Install dependencies:
   Make sure you have Node.js installed. Then run:

   ```bash
   npm install
   ```

   
4. **Run the application:
   <br>The application will be available at `http://localhost:3000`.
   ```bash
   npm start
  

## Usage

### Login

- Enter your username and password on the login page.
- Upon successful login, the token will be stored in local storage.

### View Companies

- After logging in, you will see a list of companies fetched from the API.

### Create a Company

- Implement a form to allow users to create new companies (not included in this version).
  
### Upload Employees
- Implement a file upload feature for bulk employee addition (not included in this version).
## Usage

### Login

- Enter your username and password on the login page.
- Upon successful login, the token will be stored in local storage.

### View Companies

- After logging in, you will see a list of companies fetched from the API.

### Create a Company

- Implement a form to allow users to create new companies (not included in this version).

### Upload Employees

- Implement a file upload feature for bulk employee addition (not included in this version).

## API Endpoints

### Authentication

- **Login**: `POST /api-token-auth/`
  - Body: 
    ```json
    { "username": "your_username", "password": "your_password" }
    ```
  - Response: 
    ```json
    { "token": "your_token" }
    ```

### Companies

- **Fetch Companies**: `GET /api/companies/`
- **Create Company**: `POST /api/companies/`
  - Body: 
    ```json
    { "name": "Company Name" }
    ```

### Employees

- **Fetch Employees**: `GET /api/employees/`
- **Create Employee**: `POST /api/employees/`
  - Body: 
    ```json
    { "name": "Employee Name", "company": "Company ID" }
    ```
- **Upload Employees**: `POST /api/employees/upload/`
  - Body: FormData containing the file to upload.

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository.**
2. **Create your feature branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```
 **Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```

 **Push to the branch:
    ```bash
    git push origin feature/YourFeature
    ```
 **Open a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

### Instructions for Use

- Replace `yourusername` in the clone command with your actual GitHub username.
- Add any additional details specific to your project as necessary.
- Ensure you have a `LICENSE` file if you mention licensing in the README.

This `README.md` provides a comprehensive guide for users and contributors, making your project more accessible and easier to understand.
