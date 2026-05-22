
# BlogApp WriteArc — Backend

This is the **backend server** for the BlogApp *WriteArc* project.  
It provides RESTful APIs for user authentication, blog posts, and related features built with **Node.js**, **Express.js**, and **MongoDB**.

---

## 📌 Table of Contents

1. [About](#about)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Packages Installed](#-packages-installed)  
5. [Environment Variables](#-environment-variables)  
6. [Mongoose Schemas](#-mongoose-schemas)  
7. [API Route Groups](#-api-route-groups)  
8. [Directory Structure](#-directory-structure)  
9. [Installation](#-installation)  
10. [Run Server](#-run-server)  
11. [Live Backend API](#-live-backend-api)  
12. [API Endpoints](#-api-endpoints)  
13. [Role-Based Permissions](#-role-based-permissions)  
14. [Core Concepts Implemented](#-core-concepts-implemented)  
15. [Sample Flow](#-sample-flow)  
16. [Notes](#-notes)  
17. [Contributing](#-contributing)  
18. [License](#-license)

---

## 🧠 About

The backend handles all server-side logic and database interactions for the WriteArc blogging platform.

---

## ✨ Features

- JWT-based user authentication  
- CRUD operations for blogs  
- Clean Express routing  
- Middleware for validation and security  
- Modular folder structure  

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Multer + Cloudinary (image upload)  
- dotenv  

Great addition. Below is a **Backend README section** you can paste into `backend/README.md`.
It includes **packages**, **install commands**, and **exact schemas** used in your project.

---

# ⚙️ BlogApp WriteArc — Backend (Node + Express + MongoDB)

This is the backend server for **BlogApp – WriteArc**. It provides REST APIs for authentication, articles, comments, and role-based access for **USER**, **AUTHOR**, and **ADMIN**.

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication (httpOnly cookies)
* Multer (memory storage)
* Cloudinary (image hosting)
* CORS
* dotenv

---

## 📦 Packages Installed

Run these inside `backend/`:

```
npm init -y

npm install express mongoose jsonwebtoken bcryptjs cors dotenv multer cloudinary cookie-parser

npm install --save-dev nodemon
```

### What each package does

| Package       | Purpose               |
| ------------- | --------------------- |
| express       | Server & routing      |
| mongoose      | MongoDB ODM           |
| jsonwebtoken  | JWT auth              |
| bcryptjs      | Password hashing      |
| cors          | Cross-origin requests |
| dotenv        | Environment variables |
| multer        | Image upload (memory) |
| cloudinary    | Image hosting         |
| cookie-parser | Read httpOnly cookies |
| nodemon       | Dev auto-restart      |

---

## 🔐 Environment Variables

Create `.env` in `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

---

## 🧩 Mongoose Schemas

### 👤 User Schema

```
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already existed"],
    },
    password: { type: String, required: [true, "Password is required"] },
    profileImageUrl: { type: String },
    role: {
      type: String,
      enum: ["AUTHOR", "USER", "ADMIN"],
      required: [true, "{Value} is an invalid role"],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, strict: "throw", versionKey: false }
);

export const UserTypeModel = model("user", userSchema);
```

---

### 📝 Article Schema 

```
import { Schema, model } from "mongoose";

// Comment sub-schema
const userCommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  comment: { type: String },
});

// Article schema
const articleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Author ID required"],
    },
    title: { type: String, required: [true, "Title is required"] },
    category: { type: String, required: [true, "Category is required"] },
    content: { type: String, required: [true, "Content is required"] },
    comments: [userCommentSchema],
    isArticleActive: { type: Boolean, default: true },
  },
  { timestamps: true, strict: "throw", versionKey: false }
);

export const ArticleModel = model("article", articleSchema);
```

---

## 🌐 API Route Groups

| Base Route | Purpose                                   |
| ---------- | ----------------------------------------- |
| `/common`  | Login, logout, auth check                 |
| `/user`    | User registration, view articles, comment |
| `/author`  | Author registration, create/edit articles |

---

## ▶️ Run Server

```bash
nodemon server.js
# or
node server.js
```

Server runs at: `http://localhost:5000`

---

## 🔐 Core Concepts Implemented

* JWT in httpOnly cookies
* Role-based middleware (USER / AUTHOR / ADMIN)
* Soft delete using `isArticleActive`
* Embedded comment schema
* Strict schema validation
* Image upload → Multer → Cloudinary

---

## 🧪 Sample Flow

1. Register as USER / AUTHOR
2. Login → cookie stored
3. AUTHOR creates article
4. USER reads & comments
5. AUTHOR soft deletes / restores article

---

## 📁 Directory Structure

```

backend
├── APIs/
├── config/
├── middlewares/
├── models/
├── services/
├── server.js
├── package.json
└── nodemon.json

````

---

## 🚀 Installation

```bash
git clone https://github.com/ritesh-mogilamoni/blogapp-WriteArc.git
cd blogapp-WriteArc/backend
npm install
````

Create a `.env` file (see below).

---

## ▶️ Usage

Development mode (recommended):

```bash
nodemon server.js
```

Normal start:

```bash
node server.js
```

---

## 🌐 Live Backend API

**Base URL (Deployed):**

```
https://blogapp-writearc.onrender.com
```

---

## 🔗 API Endpoints

### 👤 Author APIs (`/author`)

* **POST** `/author/users` — Register author with profile image
* **POST** `/author/articles` — Create article (AUTHOR)
* **GET** `/author/articles/:authorId` — Get author's articles (AUTHOR)
* **PUT** `/author/articles` — Edit article (AUTHOR)
* **PATCH** `/author/articles/:id/status` — Soft delete / restore (AUTHOR)

### 🙋 User APIs (`/user`)

* **POST** `/user/users` — Register user with profile image
* **GET** `/user/articles` — Read all active articles (USER)
* **PUT** `/user/articles` — Add comment to article (USER)

### 🔐 Common APIs (`/common`)

* **POST** `/common/login` — Login USER / AUTHOR / ADMIN
* **GET** `/common/logout` — Logout
* **PUT** `/common/change-password` — Change password
* **GET** `/common/check-auth` — Page refresh authentication

---

## 🔐 Environment Variables

Create `.env` inside `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## 🧩 Role-Based Permissions

**USER**

* Read articles
* Comment on articles

**AUTHOR**

* Create articles
* Edit own articles
* Soft delete / restore own articles

**ADMIN**

* Supported by same authentication system (extendable)

---

## 📝 Notes

* Images uploaded using Multer memory storage → Cloudinary
* JWT stored in httpOnly cookies
* Articles use soft delete with `isArticleActive`
* Comments embedded inside articles and populated with user info

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch
3. Commit changes
4. Open Pull Request

---

## 📄 License

MIT License

```
