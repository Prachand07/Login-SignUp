# Secure Login & Signup System with Node.js, Express, and MongoDB

This project implements a secure and responsive Login & Signup system. It includes robust backend validation, password encryption, and a sleek frontend experience with dynamic user data rendering after authentication.

---
# Features

- **User Registration & Login** with form switching
- **Data validation** on all fields:
  - Email format validation
  - Password strength indicator (based on length, digits, symbols, case)
  - First and last name length check
  - Mobile number format check (supports 10-digit & +91 prefix)
- **Password Encryption** using `bcrypt` for secure storage
- **MongoDB Integration** using `Mongoose` to store user data
- **SweetAlert2** pop-ups for success and error messages
- **Dynamic Dashboard**: After successful login, users are redirected to a dashboard that displays their:
  - Full name  
  - Email  
  - Mobile number  
  - Role (admin/employee)  
  - City  
  - Last login time  

---

# 🛠️ Technologies Used

### Frontend:
- HTML, CSS, JavaScript  
- SweetAlert2 for UI alerts

### Backend:
- Node.js with Express  
- MongoDB with Mongoose  
- Bcrypt for password hashing  

---

# Security

- Hashed Passwords with `bcrypt`  
- Validation Checks on both frontend and backend  
- No sensitive data is exposed to the client  

---

# 📄 Environment Variables

Make sure to set up your `.env` file with:

```env
MONGO_URI=your_mongodb_connection_string
