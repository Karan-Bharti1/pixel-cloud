# 🖼️ Pixel Cloud - Frontend

**Pixel Cloud** is a full-stack Image Management System built using the MERN stack. The frontend allows users to:

- 🔐 Login via Google OAuth2
- 📁 Create, edit & manage albums
- 📸 Upload, tag, edit & delete images
- ❤️ Like/favorite images
- 💬 Add comments on images (private & public)
- 🗑️ Soft-delete & restore images (Recycle Bin)
- 📤 Share albums via email with secure viewer access

🌐 [Live App](https://pixel-cloud-three.vercel.app/login)  

🔗 [Backend Repo](https://github.com/Karan-Bharti1/pixel-cloud-backend)

📽️ [Video Demo](https://drive.google.com/file/d/1jHMs8GknZ-J80saN_85ML-Lkmlfp476O/view?usp=sharing)
---

## 🧱 Tech Stack

- **React.js + Vite** (Frontend Framework)
- **Redux Toolkit** (State Management)
- **React Router DOM** (Routing)
- **Axios** (API Handling)
- **Tailwind CSS** (Styling)
- **Google OAuth 2.0** (Authentication)
- **JWT** (Authorization & Protection)
- **Cloudinary** (Image Hosting)
- **Yet-Another-React-Lightbox** (Image Preview Modal)

---

## 🎨 Features

- 🔐 **Google OAuth Login**  
  Authenticated login using Google accounts. User info is auto-fetched.

- 📁 **Album Management**  
  Users can create, rename, delete, and restore albums.

- 🖼️ **Image Upload & Management**  
  Upload to specific albums, tag images, rename, soft-delete or restore them from Recycle Bin.

- ❤️ **Liked Images Section**  
  Users can like/favorite images and access them in a separate view.

- 💬 **Comment System**  
  Add comments on images (works for both owners & viewers), shows user name + time.

- 📤 **Share Albums via Email**  
  Share images securely via email. The viewer must log in using the shared email (Google Auth) to gain read-only & comment access.

- 🛑 **Role-Based UI**  
  Viewer sees a read-only interface, with a label: *“You are viewing as [Name]”*.

- 🖼️ **Lightbox Viewer**  
  Fullscreen preview with swipe & zoom, implemented using `yet-another-react-lightbox`.

- 🧑‍🎨 **Tooltips**  
  Image hover shows uploader name & profile photo.

- ✨ **Shimmer UI**  
  Skeleton loaders to improve UX during data loading.

---
## ⚖️ Folder Structure

```bash
pixel-cloud-frontend/
├── public/                     # Static files
├── src/
│   ├── assets/                # Icons, images
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Route-based views
│   ├── reduxSlice/            # Redux slices for albums, comments, images
│   ├── utils/                 # API configs & helpers
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Vite entry point
│   ├── store.js               # Redux store config
│   ├── url.js                 # Base API URL setup
│   ├── App.css                # Global styles
│   └── index.css              # Tailwind/base styles
├── index.html
├── package.json
└── .gitignore
```

## Author

- [Github](https://github.com/Karan-Bharti1)
- [LinkedIn](https://www.linkedin.com/in/bharti1999/)



## 🚀 About Me
Hi there! 👋.
I am currently learning Full Stack Web Development with a focus on the MERN stack (MongoDB, Express.js, React, and Node.js). I'm passionate about building dynamic, user-friendly web applications and continuously improving my skills.
