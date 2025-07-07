# Raghav's Portfolio Website

A personal portfolio website showcasing photography and videography work, services, and contact information. Built with React for the frontend.

## Live Demo

[View Live Demo](https://portfolio-website-final-raghavsobti37s-projects.vercel.app/)

## Features

*   **Home Page:** Engaging introduction with hero section.
*   **About Page:** Professional background and work experience timeline.
*   **Gallery Page:** Filterable image gallery with a modal view for larger images.
*   **Projects Page:** Showcase of key projects with video embeds and detailed information.
*   **Services Page:** Detailed list of videography and photography services, workflow, and conditions.
*   **Contact Page:** Contact form (powered by EmailJS) and direct contact information/social media links.
*   **Responsive Design:** Adapts to various screen sizes.
*   **Page Transitions:** Smooth loading animation between page navigations.

## Tech Stack

*   React
*   React Router
*   Framer Motion (for animations)
*   EmailJS (for client-side email sending from the contact form)
*   CSS (custom styling, responsive design)

## Prerequisites

*   Node.js (v14 or later recommended)
*   npm or yarn

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd portfolio-website-code
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables (Required for EmailJS):**
    Create a `.env` file in the root directory:
    ```env
    REACT_APP_EMAILJS_SERVICE_ID=your_service_id
    REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
    REACT_APP_EMAILJS_USER_ID=your_user_id
    ```
    Replace `your_service_id`, `your_template_id`, and `your_user_id` with your actual EmailJS credentials.

## Running the Project

### Development Mode

```bash
npm start
# or
yarn start
```

This will start the development server at `http://localhost:3000`.

### Production Build

```bash
npm run build
# or
yarn build
```

## Project Structure

```
portfolio-website-code/
├── public/
│   ├── index.html
│   ├── favicon.jpg
│   ├── manifest.json
│   ├── robots.txt
│   ├── gallery/           # Image gallery assets
│   └── thumbnails/        # Project thumbnails
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Gallery.jsx
│   │   ├── Project.jsx
│   │   ├── Contact.jsx
│   │   └── Services.jsx
│   ├── styles/
│   │   ├── main.css
│   │   ├── responsive.css
│   │   ├── navbar.css
│   │   ├── home.css
│   │   ├── about.css
│   │   ├── gallery.css
│   │   └── projects.css
│   ├── data/
│   │   └── projectsData.js
│   ├── images/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── build/                 # Production build output
├── package.json
├── .env                   # Environment variables
├── .gitignore
└── README.md
```

## Key Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Gallery System**: Interactive image gallery with modal views and navigation
- **Project Showcase**: Embedded YouTube and Instagram videos with detailed project information
- **Contact Form**: EmailJS integration for client-side email sending
- **Smooth Animations**: Framer Motion for page transitions and hover effects
- **Clean Architecture**: Modular CSS and component structure

## Important Notes

- **node_modules** is excluded from version control for better repository management
- **package-lock.json** and **yarn.lock** are excluded to maintain flexibility
- Always run `npm install` or `yarn install` after cloning the repository
- Make sure to set up your EmailJS credentials in the `.env` file for the contact form to work properly
- The `/build` directory contains the production-ready files for deployment

## Environment Variables

The following environment variables are required for the contact form to function:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id  
REACT_APP_EMAILJS_USER_ID=your_emailjs_user_id
```

## Deployment

This project is deployed on Vercel. For deployment:

1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting platform
3. Make sure environment variables are set in your hosting platform's dashboard

## Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Removes the single build dependency (irreversible)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm install` to ensure dependencies are up to date
5. Test your changes
6. Submit a pull request

## License

This project is for personal portfolio use.


