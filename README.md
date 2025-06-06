# Raghav's Portfolio Website

A personal portfolio website showcasing photography and videography work, services, and contact information. Built with React for the frontend.

## Live Demo

(Link to your deployed Vercel site here)

## Features

*   **Home Page:** Engaging introduction with hero section.
*   **About Page:** Professional background and work experience timeline.
*   **Gallery Page:** Filterable image gallery with a modal view for larger images.
*   **Projects Page:** Showcase of key projects (details to be added).
*   **Services Page:** Detailed list of videography and photography services, workflow, and conditions.
*   **Contact Page:** Contact form (powered by EmailJS) and direct contact information/social media links.
*   **Responsive Design:** Adapts to various screen sizes.
*   **Page Transitions:** Smooth loading animation between page navigations.

## Tech Stack

### Frontend
*   React
*   React Router
*   Framer Motion (for animations)
*   EmailJS (for client-side email sending from the contact form)
*   CSS (custom styling, responsive design)

### Backend (Alternative for Contact Form - not used by default in current client setup)
*   Node.js
*   Express
*   Nodemailer


## Prerequisites

*   Node.js (v14 or later recommended)
*   npm or yarn

## Installation & Setup

### Client (React App)

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables (Recommended for EmailJS):**
    For security, it's best to move your EmailJS credentials from `src/pages/Contact.jsx` to an environment file.
    Create a `.env` file in the `client` directory (`client/.env`):
    ```env
    REACT_APP_EMAILJS_SERVICE_ID=your_service_id
    REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
    REACT_APP_EMAILJS_USER_ID=your_user_id
    ```
    Replace `your_service_id`, `your_template_id`, and `your_user_id` with your actual EmailJS credentials.
    You'll need to update `client/src/pages/Contact.jsx` to use these variables (see suggestion below).

### Server (Optional Node.js Backend)

If you plan to use the Node.js backend for the contact form (instead of the client-side EmailJS):

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `server` directory (`server/.env`):
    ```env
    EMAIL=your_gmail_address
    EMAIL_PASSWORD=your_gmail_app_password_or_regular_password
    ```
    (Using an "App Password" is recommended if you have 2FA enabled on your Gmail account).

## Running the Project

### Client (Development)

From the `client` directory:
```bash
npm start
# or
yarn start


