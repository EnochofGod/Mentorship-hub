# MentorMatch Frontend

A modern mentorship platform frontend built with React, enabling mentees and mentors to connect, schedule sessions, manage profiles, and provide feedback.

## Features

- User authentication (Admin, Mentor, Mentee)
- Profile management and editing
- Mentor discovery and requests
- Session booking and scheduling
- Availability management for mentors
- Feedback and rating system for sessions
- Admin dashboard for user and session management

## Tech Stack

- **Frontend:** React, JavaScript, Tailwind CSS
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Routing:** React Router

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
https://github.com/your-username/mentorship-platform-frontend.git
cd mentorship-platform-frontend

# Install dependencies
npm install
# or
yarn install
```

### Running the App
```bash
npm start
# or
yarn start
```
The app will run at [http://localhost:3000](http://localhost:3000).

### Environment Variables
Create a `.env` file if you need to override the API base URL:
```
REACT_APP_API_BASE_URL=https://your-backend-api-url/api
```

## Folder Structure
```
src/
  components/      # Reusable UI components
  contexts/        # React context providers (e.g., Auth)
  pages/           # Main app pages (Dashboard, Profile, Sessions, etc.)
  services/        # API service layer
  App.js           # Main app entry
  index.js         # React entry point
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.
