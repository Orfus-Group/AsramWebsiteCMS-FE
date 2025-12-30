# 📂 Project Structure

## Complete File Tree

```
asramwebsite-cms/
│
├── 📄 .env.example                    # Environment variables template
├── 📄 .gitignore                      # Git ignore rules
├── 📄 README.md                       # Original project readme
├── 📄 package.json                    # Dependencies
├── 📄 package-lock.json               # Locked dependencies
├── 📄 vite.config.js                  # Vite configuration
├── 📄 eslint.config.js                # ESLint configuration
├── 📄 index.html                      # HTML entry point
│
├── 📘 QUICKSTART.md                   # ⭐ Quick start guide
├── 📘 SIGNIN_README.md                # ⭐ Complete documentation
├── 📘 DESIGN_SYSTEM.md                # ⭐ Design specifications
├── 📘 AUTH_FLOW.md                    # ⭐ Authentication flow
├── 📘 PROJECT_SUMMARY.md              # ⭐ Project overview
│
├── 📁 public/
│   └── vite.svg                       # Placeholder icon
│
├── 📁 src/
│   │
│   ├── 📄 main.jsx                    # React entry point
│   ├── 📄 App.jsx                     # Main app component
│   ├── 📄 App.css                     # App styles
│   ├── 📄 index.css                   # Global styles + Tailwind
│   │
│   ├── 📁 components/
│   │   │
│   │   ├── 📁 auth/
│   │   │   └── 📄 SignInPage.jsx      # ⭐ Main sign-in page
│   │   │
│   │   └── 📁 common/
│   │       ├── 📄 Logo.jsx            # ⭐ ASRAM logo component
│   │       ├── 📄 Input.jsx           # ⭐ Reusable input
│   │       ├── 📄 Button.jsx          # ⭐ Reusable button
│   │       ├── 📄 Checkbox.jsx        # ⭐ Reusable checkbox
│   │       └── 📄 index.js            # Export helper
│   │
│   ├── 📁 context/
│   │   └── 📄 AuthContext.jsx         # ⭐ Global auth state
│   │
│   ├── 📁 hooks/
│   │   └── 📄 useAuth.js              # ⭐ Auth hook
│   │
│   ├── 📁 services/
│   │   ├── 📄 apiClient.js            # ⭐ HTTP client
│   │   ├── 📄 authService.js          # ⭐ Auth API service
│   │   └── 📄 index.js                # Export helper
│   │
│   ├── 📁 utils/
│   │   └── 📄 validation.js           # ⭐ Form validation
│   │
│   └── 📁 assets/
│       └── react.svg                  # React logo
│
├── 📁 dist/                           # Build output (generated)
│   └── ...
│
└── 📁 node_modules/                   # Dependencies (generated)
    └── ...
```

## Legend

- ⭐ = New files created for this implementation
- 📄 = File
- 📁 = Directory
- 📘 = Documentation

## File Count

### New Implementation Files: 13
- Components: 6 (SignInPage, Logo, Input, Button, Checkbox, index)
- Services: 3 (apiClient, authService, index)
- State: 2 (AuthContext, useAuth)
- Utils: 1 (validation)
- Config: 1 (.env.example)

### Documentation Files: 5
- QUICKSTART.md
- SIGNIN_README.md
- DESIGN_SYSTEM.md
- AUTH_FLOW.md
- PROJECT_SUMMARY.md

### Total New Files: 18

## Directory Purpose

### `/src/components/`
**Purpose**: UI components
- **`/auth/`**: Authentication-related pages and components
- **`/common/`**: Reusable UI components used throughout the app

### `/src/context/`
**Purpose**: React Context providers for global state management

### `/src/hooks/`
**Purpose**: Custom React hooks for reusable logic

### `/src/services/`
**Purpose**: API integration and external service communication

### `/src/utils/`
**Purpose**: Utility functions and helpers

### `/public/`
**Purpose**: Static assets served directly

### `/dist/`
**Purpose**: Production build output (created by `npm run build`)

## Import Patterns

### Components
```javascript
// Individual imports
import SignInPage from './components/auth/SignInPage';
import { Button, Input, Logo } from './components/common';

// Direct imports
import Button from './components/common/Button';
```

### Services
```javascript
// Using index exports
import { apiClient, authService } from './services';

// Direct imports
import { authService } from './services/authService';
```

### Hooks
```javascript
import { useAuth } from './hooks/useAuth';
```

### Context
```javascript
import { AuthProvider, useAuthContext } from './context/AuthContext';
```

### Utils
```javascript
import { validateForm, isValidEmail } from './utils/validation';
```

## File Organization Principles

1. **Feature-Based**: Related files grouped together (e.g., auth components in `/auth/`)
2. **Layer-Based**: Clear separation by responsibility (components, services, hooks)
3. **Reusability**: Common components separate from feature-specific ones
4. **Scalability**: Easy to add new features without restructuring

## Recommended Structure for Future Features

### Adding a New Feature (e.g., "Dashboard")

```
src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardPage.jsx
│   │   ├── DashboardStats.jsx
│   │   └── DashboardChart.jsx
│   └── common/
│       └── ... (existing)
├── services/
│   ├── dashboardService.js        # New service
│   └── ... (existing)
└── hooks/
    ├── useDashboard.js            # New hook
    └── ... (existing)
```

### Adding More Pages

```
src/
├── components/
│   ├── auth/
│   │   ├── SignInPage.jsx
│   │   ├── ForgotPasswordPage.jsx     # New
│   │   ├── RequestAccessPage.jsx      # New
│   │   └── SSOCallbackPage.jsx        # New
│   └── ...
```

### Adding Routing (React Router)

```
src/
├── routes/
│   ├── index.jsx                  # Route definitions
│   ├── ProtectedRoute.jsx         # Auth guard
│   └── PublicRoute.jsx            # Public routes
├── App.jsx                        # Updated with router
└── ...
```

## Environment Variables

Create a `.env` file in the root:

```env
# Copy from .env.example
cp .env.example .env

# Then edit .env with your values:
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SSO_CLIENT_ID=your_sso_client_id
VITE_SSO_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_ENABLE_SSO=true
```

## Build & Deployment

### Development
```bash
npm run dev
# Output: Runs at http://localhost:5173
```

### Production Build
```bash
npm run build
# Output: dist/ folder with optimized files
```

### Preview Production Build
```bash
npm run preview
# Output: Serves dist/ folder locally
```

## Code Organization Best Practices

### Component Files
```javascript
// Imports at top
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

// Component definition
const MyComponent = () => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
};

// Export at bottom
export default MyComponent;
```

### Service Files
```javascript
// Import dependencies
import { apiClient } from './apiClient';

// Export object with methods
export const myService = {
  async method1() { ... },
  async method2() { ... }
};
```

### Hook Files
```javascript
// Import dependencies
import { useState, useCallback } from 'react';

// Export hook function
export const useMyHook = () => {
  // Hook logic
  return { /* public API */ };
};
```

## Dependency Management

### Current Dependencies
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "vite": "^7.x",
    "tailwindcss": "^4.x",
    "@vitejs/plugin-react": "^4.x",
    "eslint": "^9.x"
  }
}
```

### Potential Future Dependencies
```json
{
  "react-router-dom": "^6.x",    // For routing
  "axios": "^1.x",               // Alternative to fetch
  "react-query": "^5.x",         // Data fetching
  "react-hook-form": "^7.x",     // Form management
  "zod": "^3.x",                 // Schema validation
  "date-fns": "^3.x"             // Date utilities
}
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `SignInPage.jsx`, `Button.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.js`)
- **Services**: camelCase (e.g., `authService.js`, `apiClient.js`)
- **Utils**: camelCase (e.g., `validation.js`, `formatters.js`)
- **Constants**: UPPER_SNAKE_CASE in a file (e.g., `constants.js`)

## VSCode Recommended Extensions

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

## Git Ignore

```.gitignore
# Dependencies
node_modules/

# Build output
dist/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

---

**This structure provides a scalable, maintainable foundation for the ASRAM CMS application!**
