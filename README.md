# 📱 Todo App

A beautiful, modern todo application built with React Native and Expo Router. Manage your tasks with a calendar view, track your progress, and stay organized!

## ✨ Features

### 🏠 Home Screen
- Welcome screen with quick navigation
- Direct access to tasks and calendar views

### ✅ Tasks Tab
- Add, complete, and delete tasks
- Real-time progress tracking
- Persistent storage with SQLite
- Device-based identification (no login required)

### 📅 Calendar View
- Monthly calendar with visual task indicators
- Navigate between months
- Quick "Today" button
- Color-coded task status:
  - 🟠 Orange dot: Has incomplete tasks
  - 🟢 Green dot: All tasks completed
  - 🟠🟢 Both: Partially completed

### 📆 Date Detail View
- View and manage tasks for specific dates
- Add tasks directly to any date
- Toggle completion status
- Delete tasks
- Beautiful date formatting

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo Router** - File-based routing system
- **TypeScript** - Type-safe development
- **Drizzle ORM** - Type-safe SQL queries
- **SQLite** - Local database storage
- **Expo Secure Store** - Secure device ID storage

## 📦 Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

## 🗂️ Project Structure

```
app/
├── _layout.tsx              # Root layout with Stack navigation
├── index.tsx                # Old home (redirects to tabs)
├── +not-found.tsx           # 404 error screen
└── (tabs)/                  # Tab navigation group
    ├── _layout.tsx          # Tab layout configuration
    ├── index.tsx            # Home tab
    ├── todos.tsx            # Tasks list tab
    ├── calendar.tsx         # Calendar view tab
    └── [date].tsx           # Dynamic date detail route

db/
├── schema.ts                # Drizzle ORM schema
└── index.ts                 # Database initialization

hooks/
└── useTodos.ts              # Custom hook for todo operations

utils/
└── deviceId.ts              # Device identification

contexts/
└── AuthContext.tsx          # Firebase auth (optional)
```

## 🎨 Key Features Explained

### Device-Based Identification
Each device gets a unique ID stored securely using Expo Secure Store. No login required - your data stays on your device!

### SQLite Database
Tasks are stored locally in a SQLite database using Drizzle ORM for type-safe queries. Data persists across app restarts.

### Calendar Integration
- Visual indicators show which days have tasks
- Tap any day to view and manage tasks for that specific date
- Color-coded status indicators for quick overview

### Tab Navigation
Three main tabs provide easy navigation:
1. **Home** - Quick overview and navigation
2. **Tasks** - Traditional list view
3. **Calendar** - Monthly calendar view

## 🚀 Usage

### Adding Tasks
1. Go to **Tasks** tab or tap a date on the **Calendar**
2. Type your task in the input field
3. Tap the blue + button or press Enter
4. Task appears immediately!

### Managing Tasks
- **Complete**: Tap the checkbox to mark as done
- **Delete**: Tap the trash icon to remove
- **View by Date**: Tap any date on the calendar to see tasks for that day

### Calendar Features
- **Navigate Months**: Use arrow buttons or swipe
- **Go to Today**: Tap "Today" button
- **View Details**: Tap any date to see its tasks
- **Visual Indicators**: Colored dots show task status

## 📱 Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android
- ❌ Web (SQLite not supported)

## 🔧 Development

### Database
The app uses SQLite with Drizzle ORM. The database is automatically created on first launch.

### State Management
- Local state with React hooks
- Custom `useTodos` hook for data operations
- Automatic refresh after mutations

### Routing
Expo Router handles navigation with:
- Stack navigation for root layout
- Tab navigation for main screens
- Dynamic routes for date details

## 📝 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web (limited)
npm run lint       # Run linter
```

## 🎯 Future Enhancements

- [ ] Task categories/tags
- [ ] Task priorities
- [ ] Recurring tasks
- [ ] Task search
- [ ] Export/import data
- [ ] Dark mode
- [ ] Notifications

## 📄 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own needs!

---

Built with ❤️ using React Native and Expo
