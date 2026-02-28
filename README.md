# Portfolio Website with Complete Admin Panel 🚀

A modern, professional portfolio website featuring a **fully functional admin panel** with real backend API and MongoDB database integration. Built with React, TypeScript, Three.js, and GSAP for stunning visuals, plus Express.js and MongoDB for powerful backend management.

## ✨ What's New - Complete Admin Panel!

This portfolio now includes a **100% working admin dashboard** where you can:
- ✅ Manage all your projects, skills, and career entries
- ✅ Handle contact form submissions
- ✅ Update content without touching code
- ✅ Upload images and files
- ✅ Secure authentication with JWT
- ✅ Real-time content updates

## 🎯 Features

### Frontend (Portfolio)
- 🎨 **Modern Design** - Clean, professional, and responsive
- 🎭 **3D Character Model** - Interactive WebGL character with Three.js
- 🎬 **Smooth Animations** - GSAP-powered scroll animations
- 📱 **Mobile-Friendly** - Fully responsive across all devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🌐 **Dynamic Content** - Real-time data from MongoDB

### Backend & Admin Panel
- 🔐 **Secure Authentication** - JWT-based login system
- 📊 **Dashboard** - Overview with statistics and recent activity
- 💼 **Projects Manager** - Full CRUD operations for projects
- 🎯 **Career Manager** - Manage work experience and timeline
- ⚡ **Skills Manager** - Add skills with icons and proficiency levels
- 📝 **About Editor** - Edit about section content
- 📧 **Messages Inbox** - View and manage contact form submissions
- ⚙️ **Settings** - Configure site metadata, SEO, and social links
- 🖼️ **File Upload** - Image upload with Multer
- 🔒 **Protected Routes** - Secure admin-only endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Windows Quick Start

Simply double-click `start.bat` or run in terminal:
```bash
start.bat
```

### Linux/Mac Quick Start

```bash
chmod +x start.sh
./start.sh
```

### Manual Installation

#### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

#### 2. Configure Environment Variables

**Frontend** - Create `.env` in root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### 3. Seed Database (Optional)

Populate database with sample data:
```bash
cd backend
npm run seed
cd ..
```

#### 4. Start Servers

**Terminal 1** - Start Backend:
```bash
cd backend
npm run dev
```

**Terminal 2** - Start Frontend:
```bash
npm run dev
```

## 🔐 Create Your Admin Account

### Using cURL:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "yourSecurePassword123"
  }'
```

### Using Postman or Thunder Client:

**POST** `http://localhost:5000/api/auth/register`

Body (JSON):
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "yourSecurePassword123"
}
```

**Important:** The first user to register automatically becomes a superadmin!

## 📱 Access Your Portfolio

- **Live Portfolio**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 📂 Project Structure

```
portfolio-website/
├── backend/
│   ├── models/           # MongoDB schemas
│   │   ├── Admin.js
│   │   ├── Project.js
│   │   ├── Career.js
│   │   ├── Skill.js
│   │   ├── About.js
│   │   ├── Contact.js
│   │   └── Settings.js
│   ├── routes/           # API endpoints
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── career.js
│   │   ├── skills.js
│   │   ├── about.js
│   │   ├── contact.js
│   │   └── settings.js
│   ├── middleware/       # Auth & file upload
│   │   ├── auth.js
│   │   └── upload.js
│   ├── uploads/          # Uploaded images
│   ├── server.js         # Express server
│   ├── seed.js           # Database seeder
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── Admin/        # Admin panel components
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProjectsManager.jsx
│   │   │   ├── CareerManager.jsx
│   │   │   ├── SkillsManager.jsx
│   │   │   ├── AboutManager.jsx
│   │   │   ├── ContactsManager.jsx
│   │   │   └── SettingsManager.jsx
│   │   ├── Character/    # 3D character
│   │   ├── About.tsx
│   │   ├── Career.tsx
│   │   ├── Work.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── LoadingProvider.tsx
│   ├── services/
│   │   └── api.js        # API service layer
│   ├── App.tsx           # Main app with routing
│   └── main.tsx
│
├── public/
│   ├── images/
│   ├── models/
│   └── ...
│
├── .env                  # Frontend config
├── start.bat             # Windows quick start
├── start.sh              # Linux/Mac quick start
├── ADMIN_SETUP.md        # Detailed admin setup
├── UPDATE_COMPONENTS.md  # Component integration guide
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin info (requires auth)
- `PUT /api/auth/change-password` - Change password (requires auth)

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get single project (public)
- `POST /api/projects` - Create project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)
- `PATCH /api/projects/:id/toggle` - Toggle active status (requires auth)

### Career
- `GET /api/career` - Get all career entries (public)
- `POST /api/career` - Create entry (requires auth)
- `PUT /api/career/:id` - Update entry (requires auth)
- `DELETE /api/career/:id` - Delete entry (requires auth)

### Skills
- `GET /api/skills` - Get all skills (public)
- `POST /api/skills` - Create skill (requires auth)
- `PUT /api/skills/:id` - Update skill (requires auth)
- `DELETE /api/skills/:id` - Delete skill (requires auth)

### About
- `GET /api/about` - Get about information (public)
- `POST /api/about` - Create/Update about (requires auth)
- `PUT /api/about/:id` - Update about (requires auth)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all messages (requires auth)
- `GET /api/contact/:id` - Get single message (requires auth)
- `PATCH /api/contact/:id/status` - Update message status (requires auth)
- `PATCH /api/contact/:id/star` - Toggle star status (requires auth)
- `DELETE /api/contact/:id` - Delete message (requires auth)

### Settings
- `GET /api/settings` - Get site settings (public)
- `PUT /api/settings` - Update settings (requires auth)

## 🎨 Admin Panel Walkthrough

### 1. Dashboard
- View quick statistics (projects, careers, skills, messages)
- See recent contact messages
- Monitor new messages

### 2. Projects Manager
- **Add** new projects with images
- **Edit** existing projects
- **Delete** projects
- Set as **featured**
- Add **live demo** and **GitHub** links
- Custom **ordering**

### 3. Career Manager
- Add **work experience**
- Set **current position**
- Configure **dates** and **timeline**
- Custom **ordering**

### 4. Skills Manager
- Add **technical skills**
- Upload **skill icons/logos**
- Set **proficiency levels** (0-100%)
- **Categorize** skills (Frontend, Backend, Database, etc.)

### 5. About Section
- Edit **about me** content
- Add **skills list**
- Update **profile information**

### 6. Messages Inbox
- View **contact submissions**
- Mark as **read/replied/archived**
- **Star** important messages
- **Delete** messages
- **Filter** by status

### 7. Settings
- Configure **site metadata**
- Add **social media** links
- Set **SEO** information
- Update **contact** details

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Three.js** - 3D graphics
- **GSAP** - Animations
- **React Three Fiber** - React renderer for Three.js

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin requests

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Protected admin routes
- ✅ CORS configuration
- ✅ Input validation
- ✅ File upload restrictions (5MB limit, images only)
- ✅ XSS protection
- ✅ Environment variables for secrets

## 🌍 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Create account on hosting platform
2. Connect your repository
3. Set environment variables:
   - `PORT`
   - `MONGODB_URI` (use MongoDB Atlas)
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your frontend URL)
4. Deploy `backend` folder

### Frontend Deployment (Vercel/Netlify)

1. Update `VITE_API_URL` in `.env` to your production backend URL
2. Build project: `npm run build`
3. Deploy `dist` folder

### MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster (free tier available)
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 🐛 Troubleshooting

### MongoDB Connection Error
```
✅ Solution:
- Ensure MongoDB is running: `net start MongoDB` (Windows)
- Check MONGODB_URI in backend/.env
- For production, use MongoDB Atlas
```

### CORS Errors
```
✅ Solution:
- Verify FRONTEND_URL in backend/.env
- Check VITE_API_URL in frontend .env
- Ensure URLs match exactly (no trailing slashes)
```

### Port Already in Use
```
✅ Solution:
- Backend: Change PORT in backend/.env
- Frontend: Vite will auto-increment to next available port
- Or kill process: `npx kill-port 5000` or `npx kill-port 5173`
```

### Authentication Issues
```
✅ Solution:
- Clear browser localStorage
- Re-login with correct credentials
- Verify JWT_SECRET matches in backend
- Check token expiration (7 days default)
```

### File Upload Not Working
```
✅ Solution:
- Check uploads folder exists: `backend/uploads/`
- Verify file size < 5MB
- Ensure file is an image (jpg, png, webp, gif, svg)
- Check folder permissions
```

## 📚 Documentation

- [ADMIN_SETUP.md](ADMIN_SETUP.md) - Detailed admin panel setup
- [UPDATE_COMPONENTS.md](UPDATE_COMPONENTS.md) - Guide to use dynamic components
- [LICENSE](LICENSE) - MIT License

## 🎓 GSAP License Note

This project uses GSAP trial plugins for development. For production deployment:
- **Option 1**: Purchase GSAP Club membership: https://gsap.com/docs/v3/Installation/
- **Option 2**: Replace with standard GSAP plugins (free)

## 📦 Scripts

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Backend
```bash
npm run dev        # Start with nodemon
npm start          # Start production server
npm run seed       # Seed database with sample data
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by Tahir

## 🙏 Acknowledgments

- React Team
- Three.js Community
- GSAP Team (GreenSock)
- MongoDB Team
- Express.js Team
- All open source contributors

---

**⭐ If you find this project helpful, please consider giving it a star!**

**Made with ❤️ using React, TypeScript, Node.js, MongoDB, Three.js, and GSAP**
