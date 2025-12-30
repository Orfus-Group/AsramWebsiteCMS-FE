# ASRAM CMS - Sign In Page Implementation

## 📋 Overview

This is a pixel-perfect implementation of the ASRAM sign-in page with a well-structured architecture designed for future API integration.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── SignInPage.jsx          # Main sign-in page component
│   └── common/
│       ├── Button.jsx               # Reusable button component
│       ├── Checkbox.jsx             # Reusable checkbox component
│       ├── Input.jsx                # Reusable input component
│       └── Logo.jsx                 # ASRAM logo component
├── context/
│   └── AuthContext.jsx              # Global authentication state
├── hooks/
│   └── useAuth.js                   # Authentication hook
├── services/
│   ├── apiClient.js                 # HTTP client with interceptors
│   └── authService.js               # Authentication API service
├── utils/
│   └── validation.js                # Form validation utilities
├── App.jsx                          # Main app component
├── index.css                        # Global styles
└── main.jsx                         # App entry point
```

## 🎨 Design Implementation

### Pixel-Perfect Conversion
All measurements, colors, and typography match the provided Figma design:

- **Colors:**
  - Primary Blue: `#2B5697`
  - Text Primary: `#1E3A5F`
  - Text Secondary: `#6B7280`
  - Background: `#F8F9FA`
  - Border: `#D1D5DB`
  - Error: `#DC2626`

- **Typography:**
  - Headings: Playfair Display (Serif)
  - Body Text: Montserrat (Sans-serif)

- **Spacing:**
  - Form padding: `40px`
  - Input height: `44px`
  - Button height: `44px`
  - Gap between sections: `120px`

### Components

#### 1. **SignInPage** (`components/auth/SignInPage.jsx`)
Main authentication page with:
- Email/User ID input
- Password input with show/hide toggle
- Remember me checkbox
- Forgot password link
- Sign in button
- SSO sign-in option
- Request access link
- Form validation
- Error handling

#### 2. **Logo** (`components/common/Logo.jsx`)
Reusable logo component with:
- Full version (icon + text + tagline)
- Icon-only version
- Configurable via `variant` prop

#### 3. **Input** (`components/common/Input.jsx`)
Highly reusable input component with:
- Label support
- Icon support (left and right)
- Error state
- Disabled state
- Placeholder text
- Focus states
- Hover effects

#### 4. **Button** (`components/common/Button.jsx`)
Flexible button component with:
- Multiple variants: `primary`, `secondary`, `outline`, `text`
- Multiple sizes: `small`, `medium`, `large`
- Loading state with spinner
- Full width option
- Disabled state

#### 5. **Checkbox** (`components/common/Checkbox.jsx`)
Custom checkbox with:
- Custom styling
- Label support
- Checked state indicator
- Disabled state

## 🔌 API Integration Architecture

### Service Layer

#### **apiClient.js**
Centralized HTTP client with:
- Request/response interceptors
- Automatic auth token injection
- Error handling
- 401 redirect to login
- Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE)

```javascript
// Example usage
import { apiClient } from './services/apiClient';

const data = await apiClient.post('/auth/signin', { email, password });
```

#### **authService.js**
Authentication API endpoints:
- `signIn(credentials)` - Sign in with email/password
- `signInWithSSO()` - Initiate SSO flow
- `handleSSOCallback(code, state)` - Handle SSO callback
- `signOut()` - Sign out user
- `requestPasswordReset(email)` - Request password reset
- `resetPassword(token, newPassword)` - Reset password
- `refreshToken(refreshToken)` - Refresh auth token
- `verifyEmail(token)` - Verify email
- `requestAccess(data)` - Request new user access
- `getCurrentUser()` - Get current user profile
- `updateProfile(data)` - Update user profile

### State Management

#### **AuthContext.jsx**
Global authentication state using React Context:
- `user` - Current user object
- `isAuthenticated` - Authentication status
- `isLoading` - Loading state
- `error` - Error messages
- `signIn(credentials)` - Sign in method
- `signOut()` - Sign out method
- `updateUser(userData)` - Update user profile

#### **useAuth.js**
Custom hook for authentication:
- Form-level auth operations
- Local state management
- API integration ready

```javascript
// Example usage
const { signIn, isLoading, error } = useAuth();

await signIn({
  identifier: 'user@example.com',
  password: 'password123',
  rememberMe: true
});
```

### Form Validation

#### **validation.js**
Comprehensive validation utilities:
- `isValidEmail(email)` - Email validation
- `validatePassword(password)` - Password strength validation
- `isRequired(value)` - Required field validation
- `minLength(value, min)` - Min length validation
- `maxLength(value, max)` - Max length validation
- `isValidPhone(phone)` - Phone validation
- `isValidUrl(url)` - URL validation
- `validateForm(values, rules)` - Form-level validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SSO_CLIENT_ID=your_sso_client_id
VITE_SSO_REDIRECT_URI=http://localhost:5173/auth/callback
```

### Development

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🔗 Backend API Integration

### Required Endpoints

The frontend expects the following API endpoints:

#### Authentication
```
POST /api/auth/signin
Body: { identifier: string, password: string, rememberMe: boolean }
Response: { token: string, refreshToken: string, user: object, redirectUrl?: string }

GET /api/auth/sso/initiate
Response: { ssoUrl: string }

POST /api/auth/sso/callback
Body: { code: string, state: string }
Response: { token: string, refreshToken: string, user: object }

POST /api/auth/signout
Headers: { Authorization: Bearer <token> }

POST /api/auth/forgot-password
Body: { email: string }

POST /api/auth/reset-password
Body: { token: string, newPassword: string }

POST /api/auth/refresh
Body: { refreshToken: string }
Response: { token: string, refreshToken: string }

POST /api/auth/verify-email
Body: { token: string }

POST /api/auth/request-access
Body: { user data }

GET /api/auth/me
Headers: { Authorization: Bearer <token> }
Response: { user: object }

PUT /api/auth/profile
Headers: { Authorization: Bearer <token> }
Body: { user update data }
Response: { user: object }
```

### Token Management

The application handles tokens automatically:
- **Remember Me = true**: Tokens stored in `localStorage`
- **Remember Me = false**: Tokens stored in `sessionStorage`
- Tokens are automatically included in API requests
- Automatic redirect to login on 401 errors
- Token refresh support

## 🎯 Features

### Implemented
- ✅ Pixel-perfect UI matching Figma design
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Password visibility toggle
- ✅ Remember me functionality
- ✅ Responsive design
- ✅ SSO support
- ✅ Request access flow
- ✅ Forgot password flow
- ✅ Reusable components
- ✅ API service layer
- ✅ Global auth state
- ✅ Token management

### Future Enhancements
- 🔲 Multi-factor authentication (MFA)
- 🔲 Social login (Google, Microsoft, etc.)
- 🔲 Biometric authentication
- 🔲 Session timeout warnings
- 🔲 Password strength meter
- 🔲 CAPTCHA integration
- 🔲 Rate limiting feedback
- 🔲 Accessibility improvements (ARIA labels)

## 📱 Responsive Design

The sign-in page is fully responsive:
- **Desktop (1200px+)**: Side-by-side layout
- **Tablet (768px - 1199px)**: Stacked layout
- **Mobile (<768px)**: Full-width form

## 🔒 Security Considerations

1. **Password Security**
   - Password input uses type="password"
   - Optional visibility toggle
   - Client-side validation only (server should validate too)

2. **Token Storage**
   - Tokens stored in localStorage or sessionStorage
   - Consider using httpOnly cookies for enhanced security

3. **HTTPS**
   - Always use HTTPS in production
   - Update API_BASE_URL to use https://

4. **CSRF Protection**
   - Implement CSRF tokens on backend
   - Add CSRF token to apiClient if needed

5. **XSS Prevention**
   - React automatically escapes content
   - Avoid using dangerouslySetInnerHTML

## 📖 Usage Examples

### Using Auth Hook
```javascript
import { useAuth } from '../../hooks/useAuth';

function MyComponent() {
  const { signIn, isLoading, error } = useAuth();
  
  const handleLogin = async () => {
    try {
      await signIn({
        identifier: 'user@example.com',
        password: 'password',
        rememberMe: true
      });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
}
```

### Using Auth Context
```javascript
import { useAuthContext } from '../context/AuthContext';

function Profile() {
  const { user, isAuthenticated, signOut } = useAuthContext();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Form Validation
```javascript
import { validateForm } from '../utils/validation';

const rules = {
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Invalid email format' }
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
  ]
};

const errors = validateForm(formData, rules);
```

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Montserrat, Playfair Display)
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For questions or support, contact the ASRAM development team.
