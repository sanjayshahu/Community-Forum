# Community Forum

A full-stack discussion platform where students can browse posts from their enrolled courses, save/unsave posts, and manage saved posts.

---

## Tech Stack

- Next.js 16
- TypeScript
- PostgreSQL
- Drizzle ORM
- React Query
- Tailwind CSS

---

## Features

- Student feed
- Course-based authorization
- Save / Unsave posts
- Soft delete bookmarks
- Idempotent save
- Pagination
- Repository Pattern
- Service Layer
- React Query
- App Router

---

## Architecture

Client

↓

React Query

↓

API Routes

↓

Services

↓

Repositories

↓

Drizzle ORM

↓

PostgreSQL

---

## Database

### users

Stores students and moderators.

### courses

Stores available courses.

### course_enrollments

Many-to-many mapping.

### posts

Discussion posts.

### saved_posts

Stores bookmarked posts using soft delete.

---

## Folder Structure

src/

app/

server/

repositories/

services/

features/

providers/

lib/

---

## API Endpoints

### Feed

GET

/api/posts?page=1&limit=10

Returns

- paginated posts
- hasSaved
- savesCount

---

### Save Post

POST

/api/posts/:id/save

---

### Unsave Post

DELETE

/api/posts/:id/save

---

## Design Decisions

- Repository Pattern
- Service Layer
- Soft Delete
- Idempotent Save
- Database Pagination
- Hydrated SQL Fields

---

## Future Work

- Authentication
- Saved Posts page
- i18n
- Tests
- Optimistic UI
- Notifications

---

## Run

```bash
npm install

docker compose up -d

npm run db:generate

npm run db:migrate

npm run dev
```