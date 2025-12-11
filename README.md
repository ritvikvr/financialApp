# financialApp

A comprehensive full-stack financial management application built with modern web technologies. Track expenses, manage budgets, analyze spending patterns, and achieve financial goals with an intuitive interface.

## 📋 Overview

financialApp is a complete financial management solution designed to help users take control of their personal finances. The application provides tools for expense tracking, budget management, financial analytics, and goal setting with a responsive web-based interface.

### Key Features:
- **Expense Tracking** - Log and categorize all expenses
- **Budget Management** - Create and monitor budgets by category
- **Financial Analytics** - Visualize spending patterns with charts
- **Goal Setting** - Set and track financial goals
- **Transaction History** - Complete transaction records with filters
- **Reports** - Generate detailed financial reports
- **Responsive Design** - Works on desktop, tablet, and mobile
- **User Authentication** - Secure login and registration

## 📁 Project Structure

```
financialApp/
├── Backend/          # Node.js/Express REST API
├── Frontend/         # React.js web interface
└── README.md         # Project documentation
```

### Backend Structure

```
Backend/
├── server.js         # Express server entry point
├── routes/           # API routes
├── controllers/      # Business logic
├── models/           # Database models
├── middleware/       # Authentication & validation
├── config/           # Configuration files
└── package.json      # Dependencies
```

### Frontend Structure

```
Frontend/
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── hooks/        # Custom hooks
│   ├── context/      # Context API
│   ├── styles/       # CSS files
│   └── App.js        # Main app component
├── public/           # Static assets
└── package.json      # Dependencies
```

## 🚀 Getting Started

### Prerequisites

**Backend:**
- Node.js 14+
- npm or yarn
- MongoDB
- Git

**Frontend:**
- Node.js 14+
- npm or yarn
- Modern web browser

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ritvikvr/financialApp.git
cd financialApp
```

#### 2. Setup Backend
```bash
cd Backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/financialapp" > .env
echo "JWT_SECRET=your_jwt_secret" >> .env
echo "PORT=5000" >> .env

# Run the server
npm start
```

#### 3. Setup Frontend
```bash
cd Frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start development server
npm start
```

## 💻 Technologies Used

### Backend

| Technology | Purpose |
|-----------|----------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Dotenv | Environment variables |

### Frontend

| Technology | Purpose |
|-----------|----------|
| React.js | UI framework |
| React Router | Navigation |
| Axios | HTTP client |
| Chart.js | Data visualization |
| Tailwind CSS | Styling |
| Context API | State management |
| Local Storage | Client-side storage |

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register     # Register new user
POST /api/auth/login        # Login user
POST /api/auth/logout       # Logout user
```

### Users
```
GET /api/users/profile      # Get user profile
PUT /api/users/profile      # Update user profile
DELETE /api/users/:id       # Delete user account
```

### Expenses
```
GET /api/expenses           # Get all expenses
GET /api/expenses/:id       # Get single expense
POST /api/expenses          # Create new expense
PUT /api/expenses/:id       # Update expense
DELETE /api/expenses/:id    # Delete expense
```

### Budgets
```
GET /api/budgets            # Get all budgets
GET /api/budgets/:id        # Get single budget
POST /api/budgets           # Create new budget
PUT /api/budgets/:id        # Update budget
DELETE /api/budgets/:id     # Delete budget
```

### Categories
```
GET /api/categories         # Get all categories
POST /api/categories        # Create new category
DELETE /api/categories/:id  # Delete category
```

## 📚 Features in Detail

### 1. Expense Tracking
- Add expenses with date, amount, category, and description
- Edit and delete existing expenses
- Filter expenses by date range, category, or amount
- View expense history with pagination
- Export expenses to CSV

### 2. Budget Management
- Create budgets for different categories
- Set monthly/yearly budget limits
- Track spending against budgets
- Get alerts when approaching budget limits
- Visualize budget utilization

### 3. Analytics & Reports
- Pie charts showing expense distribution
- Line charts for spending trends
- Monthly comparison reports
- Category-wise spending analysis
- Downloadable PDF reports

### 4. Financial Goals
- Set savings goals with target amounts
- Track progress toward goals
- Visual goal progress indicators
- Goal achievement notifications
- Custom goal categories

### 5. Dashboard
- Quick overview of financial status
- Recent transactions widget
- Budget status widget
- Expense summary widget
- Goal progress widget

## 🎯 Learning Objectives

After using this application, you will understand:

- **Full-Stack Development** - Building complete web applications
- **Frontend Development** - React.js and component-based architecture
- **Backend Development** - Node.js, Express, and REST APIs
- **Database Design** - MongoDB schema and relationships
- **Authentication** - JWT-based authentication and authorization
- **State Management** - Context API and local state management
- **Data Visualization** - Charts and graphs for data representation
- **Financial Concepts** - Expense tracking and budget management
- **API Design** - RESTful API architecture and practices
- **Error Handling** - Comprehensive error handling strategies

## 🏗️ Architecture

### Authentication Flow
```
User Registration
↓
Password Hashing (Bcrypt)
↓
Database Storage
↓
User Login
↓
Credential Verification
↓
JWT Token Generation
↓
Token Storage (Client)
↓
API Requests with Token
```

### Data Flow
```
User Input (Frontend)
↓
Validation (Frontend)
↓
API Request (HTTP)
↓
Server Validation (Backend)
↓
Database Operation
↓
Response Processing
↓
UI Update (Frontend)
```

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  currency: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  amount: Number,
  category: String,
  description: String,
  date: Date,
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Budget Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  category: String,
  limit: Number,
  period: String (monthly/yearly),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing** - Bcrypt for secure password storage
- **JWT Authentication** - Token-based authentication
- **Protected Routes** - Authentication middleware
- **CORS** - Cross-origin request handling
- **Input Validation** - Server-side validation
- **Error Messages** - Generic error responses
- **HTTP Only Cookies** - Secure token storage
- **Rate Limiting** - API request throttling

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Expense creation and deletion
- [ ] Budget creation and monitoring
- [ ] Category management
- [ ] Report generation
- [ ] Chart rendering
- [ ] Mobile responsiveness
- [ ] Data export functionality

## 📝 Configuration

### Backend .env
```
MONGODB_URI=mongodb://localhost:27017/financialapp
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_VERSION=1.0.0
```

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Verify connection string in .env
- Check network connectivity

### API Connection Error
- Verify backend server is running
- Check CORS configuration
- Verify API URL in frontend .env

### Authentication Issues
- Clear browser cache and cookies
- Check JWT token expiration
- Verify token storage in localStorage

## 📖 Learning Resources

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Authentication](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

```
MIT License

Copyright (c) 2024 Ritvik Verma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👤 Author

**Ritvik Verma** (@ritvikvr)
- Computer Science Engineering Student specializing in AI & Data Science
- Full-Stack Developer with expertise in MERN stack
- GitHub: [ritvikvr](https://github.com/ritvikvr)
- Interested in: Financial Technology, Full-Stack Development, AI Applications

## 🚀 Future Enhancements

- [ ] Multi-currency support
- [ ] Investment tracking
- [ ] Bill reminders
- [ ] Recurring expenses
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Collaboration features
- [ ] API rate limiting
- [ ] Data export (PDF, Excel)
- [ ] Dark mode support

---

**Take Control of Your Finances! 💰**

financialApp helps you understand your spending habits and make informed financial decisions. Start tracking your expenses today and build a better financial future!
