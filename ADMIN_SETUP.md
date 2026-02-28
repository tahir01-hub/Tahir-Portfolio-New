# Portfolio Admin Panel Setup Guide

## 🚀 Complete Admin Panel with Real Backend

This portfolio now includes a fully functional admin panel with MongoDB backend.

### 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 🔧 Installation Steps

#### 1. Install Frontend Dependencies

```bash
npm install
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 3. Configure Environment Variables

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

#### 4. Start MongoDB

Make sure MongoDB is running:
```bash
# Windows (if installed as service)
net start MongoDB

# Or use MongoDB Compass / MongoDB Atlas
```

#### 5. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

#### 6. Start Frontend

```bash
# In root directory
npm run dev
```

Frontend will run on: `http://localhost:5173`

### 🔐 First Time Setup

#### Create Admin Account

Make a POST request to create your first admin account:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Or use Postman/Insomnia/Thunder Client.

**Note:** The first admin account will automatically be a superadmin.

### 📱 Admin Panel Access

Navigate to: `http://localhost:5173/admin/login`

**Default Login (after creating your account):**
- Username: your_chosen_username
- Password: your_chosen_password

### 🎯 Features

#### Admin Panel Includes:
- ✅ Dashboard with statistics
- ✅ Projects Management (CRUD)
- ✅ Career/Experience Management
- ✅ Skills Management
- ✅ About Section Editor
- ✅ Contact Messages Viewer
- ✅ Site Settings
- ✅ File Upload Support
- ✅ JWT Authentication
- ✅ Secure Admin Routes

#### Public Portfolio Features:
- 🌐 Dynamic content from database
- 📧 Contact form with backend storage
- 🎨 Skills showcase from admin panel
- 💼 Projects portfolio
- 🎯 Career timeline

### 🗂️ Project Structure

```
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & upload middleware
│   ├── uploads/         # Uploaded files
│   └── server.js        # Express server
├── src/
│   ├── components/
│   │   └── Admin/       # Admin panel components
│   ├── context/         # React context (Auth)
│   ├── services/        # API service layer
│   └── App.tsx          # Main app with routing
```

### 🔌 API Endpoints

#### Auth
- POST `/api/auth/register` - Register admin
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current admin

#### Projects
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create project (Auth required)
- PUT `/api/projects/:id` - Update project (Auth required)
- DELETE `/api/projects/:id` - Delete project (Auth required)

#### Career
- GET `/api/career` - Get all career entries
- POST `/api/career` - Create entry (Auth required)
- PUT `/api/career/:id` - Update entry (Auth required)
- DELETE `/api/career/:id` - Delete entry (Auth required)

#### Skills
- GET `/api/skills` - Get all skills
- POST `/api/skills` - Create skill (Auth required)
- PUT `/api/skills/:id` - Update skill (Auth required)
- DELETE `/api/skills/:id` - Delete skill (Auth required)

#### About
- GET `/api/about` - Get about info
- POST `/api/about` - Create/Update about (Auth required)

#### Contact
- POST `/api/contact` - Submit contact form (Public)
- GET `/api/contact` - Get all messages (Auth required)
- PATCH `/api/contact/:id/status` - Update status (Auth required)

#### Settings
- GET `/api/settings` - Get settings
- PUT `/api/settings` - Update settings (Auth required)

### 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected admin routes
- CORS configuration
- Input validation
- File upload restrictions

### 🚀 Deployment

#### Backend Deployment (Heroku/Railway/Render)
1. Push backend folder to hosting
2. Set environment variables
3. Ensure MongoDB connection

#### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `dist` folder

### 📝 Usage Tips

1. **Adding Projects**: Upload images, add description, tools used
2. **Managing Career**: Add work experience with dates
3. **Skills Section**: Upload skill logos/icons
4. **Contact Messages**: View and manage incoming messages
5. **Settings**: Configure site metadata and social links

### 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MongoDB URI in .env

**CORS Errors:**
- Verify FRONTEND_URL in backend .env
- Check API_URL in frontend .env

**Auth Issues:**
- Clear localStorage
- Re-login with correct credentials

### 📞 Support

For issues or questions, check the API health endpoint:
`http://localhost:5000/api/health`

### 🎉 You're All Set!

Your portfolio now has a complete admin panel. Login and start managing your content!
