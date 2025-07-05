# Personal Website - Aditya Rahmad

![Website Screenshot](public/setup-image.avif)

## About The Project

This is the official personal website of Aditya Rahmad, a
software developer, writer, and tech enthusiast. This
platform serves as a central hub to showcase my projects,
share my thoughts through a blog, and provide a way to
connect with me.

The website is built with a focus on performance, modern
web standards, and a clean user experience.

## Features

- **Dynamic Blog:** Explore articles on web development,
  design patterns, and cutting-edge technologies.

- **Project Showcase:** Discover my latest personal and
  professional projects.

- **Interactive Chatbot (Archi):** Ask Archi anything
  about me or my work.

- **Contact Form:** Easily get in touch for
  collaborations or inquiries.

- **GitHub Activity Graph:** Visualize my coding
  consistency.

- **Responsive Design:** Optimized for various devices
  and screen sizes.

- **SEO Friendly:** Built with Next.js for optimal search
  engine visibility.

- **Dark/Light Mode:** Seamless theme switching for
  comfortable viewing.

## Technologies Used

This project is built using a modern web development stack:

- **Framework:** [Next.js](https://nextjs.org/) (App
  Router)

- **Language:** [TypeScript](https://www.typescriptlang.org/)

- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)

- **Animation:** [Framer Motion](https://www.framer.com/motion/)

- **Headless CMS:** [Sanity.io](https://www.sanity.io/)

- **Form Validation:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)

- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

To get a local copy up and running, follow these simple
steps.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version
  recommended)

- [Bun](https://bun.sh/) (or npm/yarn)

- [Git](https://git-scm.com/)

### Installation

1.  Clone the rep
    git clone https://github.com/AdityaZxxx/personal-website.git
    cd personal-website

2.  Install dependencie
    bun install # or npm install or yarn install

3.  Set up Sanity.io:
    - If you don't have a Sanity project, create one by
      running `sanity init` in the `sanity/` directory.

    - Configure your Sanity project ID and dataset in
      `sanity.config.ts` and `sanity.cli.ts`.

    - Ensure your Sanity project is running and
      accessible.

### Environment Variables

Create a `.env.local` file in the root of your project and
add the following environment variables:

Sanity.io
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-20 # Or your preferred API
version

For Contact Form (if using a service like Resend or SendGrid via your
API route)
Example: RESEND_API_KEY=your_resend_api_key

For Archi Chatbot (if using an external AI service like GeminiAI)
Example: GEMINI_API_KEY=your_gemini_api_key

_Make sure to replace placeholder values with your actual credentials._

### Running the Development Server

To run the development server:

bun dev # or npm run dev or yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production:

bun build or npm run build or yarn build. This command optimizes the application for production.

## Project Structure

├── app/ # Next.js App Router pages/routes
├── components/ # Reusable UI components (organized by feature/type)
├── blog/ # Blog-related components (cards, lists)
├── chat/ # Chatbot components
├── forms/ # Form components (e.g., ContactForm)
├── hero/ # Hero sections
├── layouts/ # Navbar, Footer
├── sections/ # Larger page sections (FeaturedBlog, GithubSection)
├── skeletons/ # Loading skeletons
└── ui/ # Shadcn/UI components
├── hooks/ # Custom React Hooks
├── lib/ # Utility functions, API clients (e.g., Sanity client)
├── public/ # Static assets (images, favicons)
├── sanity/ # Sanity Studio configuration
├── schemas/ # Sanity content schemas
└── types/ # TypeScript type definitions

## API Endpoints

- `/api/chat`: Handles communication with the AI chatbot.
- `/api/send-email`: Processes contact form submissions.
- `/api/gallery`: (If applicable) API for gallery data.
- `/api/handle-like`, `/api/handle-unlike`,
  `/api/handle-view`: (If applicable) API for interaction
  tracking.
- `/api/notify`, `/api/subscribe`: (If applicable) API
  for notifications/subscriptions.

  ## Deployment

  The project can be easily deployed to [Vercel](https://vercel.com/) directly from your GitHub repository. Ensure your environment variables are configured in Vercel's project settings.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

    1.  Fork the Project
    2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
    3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
    4.  Push to the Branch (`git push origin

feature/AmazingFeature`) 5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Aditya Rahmad - [adityaofficial714@gmail.com](mailto:adityaofficial714@gmail.com)

Project Link:

[https://github.com/AdityaZxxx/personal-website](https://github.com/AdityaZxxx/personal-website)
