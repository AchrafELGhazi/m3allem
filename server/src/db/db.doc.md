# 🚀 M3allem Database Setup Guide

## 📋 Complete List of Models

We now have **8 database models** for the M3allem platform:

### Core Models:
1. **User** - Base user model (customers, professionals, admin)
2. **Professional** - Extended profile for professionals 
3. **Service** - Catalog of available services
4. **Booking** - Main transaction model
5. **Review** - Rating and feedback system
6. **Chat** - Chat rooms for bookings
7. **Message** - Individual chat messages
8. **Notification** - Push notifications and alerts

---

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# Database
MONGODB_URI_DEV=mongodb://localhost:27017/m3allem_dev
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/m3allem_prod

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Other required variables...
```

### 3. Start MongoDB Locally
Make sure MongoDB is running on your machine:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 4. Run Database Seeders
```bash
npm run seed
```

### 5. Start the Development Server
```bash
npm run dev
```

---

## 🧪 Test Data Created

After running the seeders, you'll have:

### 👤 **1 Admin Account**
- Email: `admin@m3allem.ma`
- Password: `Admin123!`

### 🛒 **3 Customer Accounts**
- `youssef.bennani@gmail.com`
- `fatima.elmansouri@hotmail.com` 
- `omar.tazi@yahoo.com`
- Password: `Customer123!`

### 🔧 **7 Professional Accounts**
- `hassan.electricien@m3allem.ma` (Electrician - Khrayfi)
- `said.plombier@m3allem.ma` (Plumber - M3allem)
- `khalid.peintre@m3allem.ma` (Painter - Snaaï)
- `mustapha.carreleur@m3allem.ma` (Tiler - Khrayfi)
- `abdellah.menuisier@m3allem.ma` (Carpenter - M3allem)
- `aicha.coiffeuse@m3allem.ma` (Hair Stylist - Khrayfi)
- `nadia.estheticienne@m3allem.ma` (Beauty Specialist - Snaaï)
- Password: `Professional123!`

### 🛠️ **20+ Services**
- Electrical (installation, repair)
- Plumbing (installation, pipe repair)
- Painting (interior, exterior)
- Tiling (floor, wall)
- Plastering (wall, ceiling)
- Furniture Assembly
- AC Services (installation, repair)
- Carpentry (custom work, doors/windows)
- Beauty Services (facial, manicure/pedicure)
- Hair Services (cut/styling, coloring)

---

## 🗄️ Database Structure

```
m3allem_dev/
├── users (11 documents)
│   ├── 1 admin
│   ├── 3 customers  
│   └── 7 professionals
├── professionals (7 documents)
├── services (20+ documents)
├── bookings (empty - to be populated via app)
├── reviews (empty)
├── chats (empty)
├── messages (empty)
└── notifications (empty)
```

---

## 🔍 Verify Setup

### Check Database Connection:
```bash
curl http://localhost:3000/health
```

### MongoDB Compass Connection:
```
mongodb://localhost:27017/m3allem_dev
```

### Test Login with Postman:
```http
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@m3allem.ma",
  "password": "Admin123!"
}
```

---

## 📞 Troubleshooting

### MongoDB Connection Issues:
- Make sure MongoDB is running locally
- Check connection string in `.env`
- Verify database name and credentials

### Seeding Errors:
- Run seeders in order (users → services → professionals)
- Clear existing data: `db.dropDatabase()` in MongoDB shell
- Check console for specific error messages