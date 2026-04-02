# Blog Application (Next.js + Firestore)

## Overview

This project is a single-page blog application built with **Next.js**, **TypeScript**, and **Firebase Firestore**.
It allows users to browse, create, edit, and view blog posts.

---

## Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript
* **State Management:** Redux Toolkit
* **Database:** Firebase Firestore
* **Validation:** Zod
* **Styling:** Tailwind CSS

---

## Features

### Core Features

* View list of publications
* View detailed post page
* Create new post
* Edit existing post (only by author)
* Basic authentication (email/password stored in Firestore)

### Optional Features (implemented if applicable)

* Post sorting
* Comments system
* Delete posts

---

## Routes

| Route          | Description                      |
| -------------- | -------------------------------- |
| `/`            | Home page (list of publications) |
| `/auth`        | Authentication page              |
| `/post/[id]`   | Single post page                 |
| `/post/create` | Create new post                  |

---

## Project Structure

```
/app        - Next.js App Router pages
/lib        - Redux store, hooks, slices
/src
  /components - UI components
  /hooks - firestore hooks
  /services   - Firestore interaction logic
  /types      - TypeScript types
```

---

## Data Model

### User

```
{
  id: string;
  email: string;
  password: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Post

```
{
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    email: string;
  };
  messagesAmount: number;
  views: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Message

```
{
  id: string;
  content: string;
  author: {
    id: string;
    email: string;
  };
  postId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env`:

```
NEXT_PUBLIC_apiKey=...
NEXT_PUBLIC_authDomain=...
NEXT_PUBLIC_projectId=...
NEXT_PUBLIC_storageBucket=...
NEXT_PUBLIC_messagingSenderId=...
NEXT_PUBLIC_appId=...
```

---

### 3. Run the project

```bash
npm run dev
```

Open: http://localhost:3000

---

## Firestore Notes

* Data is stored in collections:

  * `users`
  * `posts`
  * `messages`
* Relations are implemented manually via `author` with fields `email` and `id`
* No joins — additional queries are used to resolve related data

---

## State Management

Redux Toolkit is used for:

* User authentication state
* Global user data

---

## Validation

Zod schemas are used for:

* Login/Registration form validation
* Post creation/edit validation
* Message creation validation

---

## Notes

* Firestore does not support relational queries — relations are resolved manually
* Authentication is simplified (not using Firebase Auth)
* Designed as a test assignment, not production-ready system

---
