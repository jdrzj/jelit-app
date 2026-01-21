# Jellit - Digestive Health Tracker

A mobile-first Expo app for tracking bowel movements and gaining insights into your digestive health. Built with React Native, Expo Router, and Supabase.

## Features

### Core Functionality
- **Quick Logging**: Log entries in under 10 seconds with essential metrics
- **Bristol Stool Scale**: Track consistency using the medical standard (Types 1-7)
- **Health Metrics**: Monitor urgency levels (1-5) and pain levels (1-5)
- **Mood Tracking**: Optional emoji-based mood logging
- **Notes**: Add context about food, stress, or medications
- **Secure Authentication**: Anonymous or email-based account options

### Screens
1. **Dashboard**: Weekly overview with frequency count, averages, and recent entries
2. **Quick Log**: Fast entry creation with expandable advanced options
3. **History**: Chronological list of all entries with expand-to-view details
4. **Insights**: Weekly and monthly trends with Bristol distribution and keyword analysis
5. **Settings**: Account management, data export placeholder, and privacy information

### Design Principles
- Calm, medical-friendly interface
- Soft blue color palette (#4A90E2)
- No jokes or inappropriate visuals
- Discreet and professional tone
- Accessibility-friendly components

## Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router (Tab-based)
- **Backend**: Supabase
  - PostgreSQL database
  - Row Level Security (RLS)
  - Anonymous + Email authentication
- **State Management**: React Context + Hooks

## Database Schema

### `entries` Table

```sql
id              uuid          Primary key, auto-generated
user_id         uuid          References auth.users, NOT NULL
timestamp       timestamptz   When the entry occurred (default: now)
bristol_score   int           Bristol scale 1-7, NOT NULL
urgency_level   int           Urgency rating 1-5, NOT NULL
pain_level      int           Pain rating 1-5, NOT NULL
mood_emoji      text          Optional mood emoji (default: '😐')
notes           text          Optional notes (default: '')
created_at      timestamptz   Record creation time (default: now)
```

### Security (RLS)

All entries are protected by Row Level Security policies:
- Users can only view their own entries
- Users can only create entries for themselves
- Users can only update their own entries
- Users can only delete their own entries

Each policy uses `auth.uid()` to verify user ownership.

## Project Structure

```
app/
├── (tabs)/           # Tab-based navigation group
│   ├── _layout.tsx   # Tab bar configuration
│   ├── index.tsx     # Dashboard screen
│   ├── log.tsx       # Quick log screen
│   ├── history.tsx   # History screen
│   ├── insights.tsx  # Insights screen
│   └── settings.tsx  # Settings screen
├── _layout.tsx       # Root layout with AuthProvider
└── +not-found.tsx    # 404 screen

components/
├── Button.tsx        # Reusable button component
├── Card.tsx          # Card wrapper component
└── LoadingScreen.tsx # Loading state component

contexts/
└── AuthContext.tsx   # Authentication state management

hooks/
├── useEntries.ts     # Data fetching and mutations
└── useFrameworkReady.ts # Framework initialization

lib/
└── supabase.ts       # Supabase client configuration

types/
├── database.ts       # Database TypeScript types
└── env.d.ts          # Environment variable types

utils/
├── constants.ts      # App constants (Bristol scale, labels)
└── dateUtils.ts      # Date formatting utilities
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally (optional)
- Supabase account (already configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Environment variables are already configured in `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. The database schema is already applied via Supabase migration

### Running the App

Start the development server:
```bash
npm run dev
```

This will open Expo DevTools. You can then:
- Press `w` to open in web browser
- Scan QR code with Expo Go app (iOS/Android)
- Press `a` to open Android emulator
- Press `i` to open iOS simulator

### Building for Production

Build for web:
```bash
npm run build:web
```

The output will be in the `dist/` directory.

## Usage Guide

### First Time Setup
1. Open the app - you'll see a welcome screen
2. Tap "Get Started" to create an anonymous account
3. Start logging entries from the Dashboard or Log tab

### Logging an Entry
1. Navigate to the "Log" tab
2. Select your Bristol type (1-7)
3. Adjust urgency and pain sliders
4. Optionally expand "Additional Options" for mood and notes
5. Tap "Save Entry"

### Viewing Insights
1. Navigate to the "Insights" tab
2. Toggle between "Week" and "Month" views
3. Review averages, Bristol distribution, and common keywords
4. Read the disclaimer about medical advice

### Creating a Permanent Account
1. Navigate to the "Settings" tab
2. Enter your email and password
3. Tap "Create Account"
4. Your anonymous data will be preserved

## Authentication Flow

1. **Anonymous Sign-In** (Default):
   - User taps "Get Started" on welcome screen
   - Anonymous account created automatically via Supabase
   - Data is saved and accessible immediately
   - Can be upgraded to email account later

2. **Email Sign-Up**:
   - Navigate to Settings
   - Enter email and password
   - Account created with email/password
   - Previous anonymous data can be migrated (manual process)

3. **Email Sign-In**:
   - Navigate to Settings
   - Enter existing credentials
   - Session restored across devices

## Data Privacy

- All data is stored securely in Supabase PostgreSQL
- Row Level Security ensures user data isolation
- Anonymous accounts keep data private until upgraded
- No data is shared with third parties
- Export functionality planned for future release

## Future Enhancements

- CSV/PDF data export
- Push notification reminders
- Calendar view in History
- Correlation insights (e.g., food triggers)
- Health app integration (Expo Health API)
- Dark mode support
- Multi-language support

## Disclaimer

This app is for informational and tracking purposes only. It is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional for medical advice.

## License

Copyright © 2024. All rights reserved.
