# StartClass - Online Course Platform

## Overview

StartClass is a modern online course platform designed for career beginners aged 20-30. The platform enables anyone to become an instructor and share knowledge through practical, short-term educational content. Built with a React frontend and Express.js backend, it features a comprehensive course management system with video uploads, comments, and user authentication.

## System Architecture

The application follows a full-stack architecture with clear separation between client and server:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: TanStack Query for server state

## Key Components

### Frontend Architecture
- **Component Library**: Extensive use of shadcn/ui components built on Radix UI primitives
- **Routing**: Wouter for client-side routing
- **Theme System**: Custom theme provider with light/dark mode support
- **Form Management**: React Hook Form with Zod validation
- **File Uploads**: Multer integration for video and thumbnail uploads

### Backend Architecture
- **API Structure**: RESTful endpoints with Express.js
- **Database Layer**: Drizzle ORM with type-safe schema definitions
- **Authentication**: Passport.js with OpenID Connect strategy
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **File Handling**: Multer middleware for course video and thumbnail uploads

### Database Schema
- **Users**: Profile management with Replit Auth integration
- **Courses**: Video courses with metadata, categories, and pricing
- **Comments**: Threaded comment system for course discussions
- **Course Views**: Analytics tracking for course engagement
- **Sessions**: Secure session storage for authentication

## Data Flow

1. **Authentication Flow**: Users authenticate via Replit Auth, creating/updating user records
2. **Course Creation**: Instructors upload videos with metadata through form submissions
3. **Course Discovery**: Public course listing with search and filtering capabilities
4. **Course Viewing**: Video playback with view tracking and comment system
5. **User Interaction**: Comments, ratings, and course progress tracking

## External Dependencies

### Database & Storage
- **Neon Database**: PostgreSQL hosting with serverless capabilities
- **File Storage**: Local file system for video and image uploads

### Authentication
- **Replit Auth**: OpenID Connect provider for user authentication
- **Session Storage**: PostgreSQL-backed session management

### Frontend Libraries
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Icons**: Lucide React and React Icons
- **Date Handling**: date-fns for timestamp formatting
- **Form Validation**: Zod schema validation

### Backend Libraries
- **Database**: Drizzle ORM with PostgreSQL driver
- **File Processing**: Multer for multipart form handling
- **Session Management**: express-session with PostgreSQL store

## Deployment Strategy

The application is configured for Replit deployment with:

- **Development**: Vite dev server with Express.js backend
- **Production**: Static build served by Express with esbuild bundling
- **Database**: Environment-based configuration for Neon PostgreSQL
- **File Serving**: Express static middleware for uploaded content

### Build Process
1. Frontend build with Vite (React → static assets)
2. Backend build with esbuild (TypeScript → ESM)
3. Combined deployment with Express serving both API and static files

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `REPLIT_DOMAINS`: Allowed domains for OIDC
- `ISSUER_URL`: OpenID Connect issuer endpoint

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 07, 2025. Initial setup