# Next.js Frontend for File Share with End-to-End Encryption

[![Watch the video](https://img.youtube.com/vi/t5w2dauFmhM/maxresdefault.jpg)](https://youtu.be/t5w2dauFmhM)


This is the frontend for the file sharing project, built using Next.js, with authentication handled by Auth.js and the UI components provided by ShadCN.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)
- [Donations](#donations)

## Features

- **File Upload**: Upload and share files securely with end-to-end encryption.
- **Authentication**: Secure user login and registration powered by Auth.js.
- **Responsive UI**: A modern, responsive design using ShadCN for consistent and reusable UI components.
- **File Listing**: Send and receive file lists between users.

## Technologies Used

- **Next.js**: The React framework for building fast and scalable applications with server-side rendering and static site generation.
- **Auth.js**: Authentication solution to handle secure login and user sessions.
- **ShadCN**: A customizable and consistent UI component library built on Radix and Tailwind CSS for creating beautiful UIs quickly.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: Superset of JavaScript that provides static typing, ensuring a robust and scalable codebase.

## Getting Started

To get a local copy of this project up and running, follow these steps:

### Prerequisites

- **Node.js** (16.x or higher) and **npm** (or **yarn**) installed. You can download Node.js [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AarambhDevHub/file-share-frontend.git
   cd file-share-frontend
   ```

2. Create a .env file in the root of the project with the following variables:

    ```
    API_BASE_URL=http://localhost:8000/api
    NEXTAUTH_SECRET=b06401cc634e3695e1aca5f08002377d948e937d3a4dd4772e4e8c5d5f58b8a2
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```
3. Install the necessary dependencies:

    ```
    npm install
    ```

4. Start the development server:

    ```
    npm run dev
    ```
    The app will be available at http://localhost:3000.

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- **`npm run build`**: Builds the app for production in the `out` folder. It bundles React in production mode and optimizes the build for the best performance.
- **`npm run start`**: Starts the production server after building the project.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Donations

If you find this project useful and would like to support its continued development, you can make a donation via [Buy Me a Coffee](https://buymeacoffee.com/aarambhdevhub).

Thank you for your support!
