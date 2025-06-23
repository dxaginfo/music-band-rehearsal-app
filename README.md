# Rehearsal Scheduler

A comprehensive web application for scheduling and managing band rehearsals, designed to streamline the coordination process for bands and music groups.

## 🎵 Features

- **Schedule Management**: Create, edit, and manage rehearsal sessions
- **Availability Tracking**: Track band members' availability for optimal scheduling
- **Attendance Management**: Record and track attendance for accountability
- **Automated Notifications**: Send reminders and updates to band members
- **Venue Management**: Store and display rehearsal location details
- **Rehearsal Optimization**: Get smart suggestions for optimal rehearsal times
- **Rehearsal Notes**: Attach notes and materials to each session

## 🚀 Tech Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Material-UI component library
- FullCalendar for scheduling interface
- Chart.js for data visualization

### Backend
- Node.js with Express
- PostgreSQL database with Prisma ORM
- JWT authentication
- SendGrid for email notifications

## 📋 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/music-band-rehearsal-app.git
cd music-band-rehearsal-app
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# Create .env file in the backend directory
cp .env.example .env
# Edit .env file with your configuration
```

4. Set up the database
```bash
cd backend
npx prisma migrate dev
```

5. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## 🔧 Project Structure

```
├── frontend/                # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux state management
│   │   ├── services/        # API service layers
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx          # Main application component
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Node.js backend application
│   ├── prisma/              # Database schema and migrations
│   ├── src/                 # Source code
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── app.js           # Express application setup
│   └── package.json         # Backend dependencies
```

## 🔒 Security Features

- JWT authentication for secure user sessions
- Password hashing with bcrypt
- CSRF protection
- Rate limiting to prevent abuse
- Input validation and sanitization

## 🌟 Future Enhancements

- Mobile application
- Calendar integration (Google Calendar, Apple Calendar)
- Equipment tracking
- Performance analytics
- Integration with music practice apps

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request