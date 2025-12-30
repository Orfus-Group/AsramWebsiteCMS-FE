# 🔐 Authentication Flow Documentation

## Sign-In Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER INTERACTION                           │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│              SignInPage Component (UI Layer)                        │
│  • Displays form with inputs (email, password, remember me)        │
│  • Handles user input and form submission                           │
│  • Shows validation errors and loading states                       │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  useAuth Hook (Business Logic)                      │
│  • Manages local component state (isLoading, error)                │
│  • Calls authService methods                                        │
│  • Handles success/error responses                                  │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│               authService (API Abstraction Layer)                   │
│  • Provides clean API methods (signIn, signOut, etc.)              │
│  • Calls apiClient with formatted data                              │
│  • Returns structured responses                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  apiClient (HTTP Client Layer)                      │
│  • Adds authentication headers (Bearer token)                       │
│  • Makes HTTP requests (fetch API)                                  │
│  • Handles responses and errors                                     │
│  • Redirects on 401 Unauthorized                                    │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Backend REST API                               │
│  • Validates credentials                                            │
│  • Generates JWT tokens                                             │
│  • Returns user data and tokens                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Response Flow (Back Up)                          │
│                                                                      │
│  Backend API → apiClient → authService → useAuth → SignInPage      │
│                                                                      │
│  • Store tokens in storage (localStorage/sessionStorage)            │
│  • Update AuthContext with user data                                │
│  • Redirect to dashboard or intended page                           │
└─────────────────────────────────────────────────────────────────────┘
```

## Detailed Flow Steps

### 1. User Submits Form

```javascript
// User clicks "Sign In" button
handleSubmit(e) → validateForm() → signIn()
```

**What Happens:**
- Form submission prevented (e.preventDefault())
- Form data validated (email, password required)
- If valid, calls useAuth.signIn()

### 2. useAuth Hook Processes Request

```javascript
const signIn = async (credentials) => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await authService.signIn(credentials);
    // Store tokens
    // Set user data
    // Redirect
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
}
```

**What Happens:**
- Sets loading state to show spinner
- Clears previous errors
- Calls authService.signIn()
- Handles success or failure

### 3. authService Makes API Call

```javascript
async signIn(credentials) {
  const response = await apiClient.post('/auth/signin', {
    identifier: credentials.identifier,
    password: credentials.password,
    rememberMe: credentials.rememberMe
  });
  
  return response.data;
}
```

**What Happens:**
- Formats request data
- Calls apiClient.post()
- Returns response data

### 4. apiClient Sends HTTP Request

```javascript
async post(url, data, config) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // if exists
    },
    body: JSON.stringify(data)
  });
  
  return handleResponse(response);
}
```

**What Happens:**
- Adds auth headers
- Makes fetch request
- Handles response

### 5. Backend Validates and Responds

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "email": "john.doe@asram.com",
    "name": "John Doe",
    "role": "admin"
  },
  "redirectUrl": "/dashboard"
}
```

### 6. Success Handler Stores Data

```javascript
// In useAuth hook
const storage = credentials.rememberMe ? localStorage : sessionStorage;
storage.setItem('authToken', response.token);
storage.setItem('refreshToken', response.refreshToken);

// Update global state (via AuthContext)
setUser(response.user);
setIsAuthenticated(true);

// Redirect
window.location.href = response.redirectUrl || '/dashboard';
```

## Error Flow

### Validation Errors (Client-Side)

```
User Input → Form Validation → Display Errors
                ↓
      Invalid (e.g., empty email)
                ↓
      Show error message under input
                ↓
      User corrects and resubmits
```

### API Errors (Server-Side)

```
API Request → Backend Validation → Error Response
                ↓
    Invalid credentials (401)
                ↓
    apiClient catches error
                ↓
    authService throws error
                ↓
    useAuth catches and sets error state
                ↓
    SignInPage displays error message
```

## Token Management Flow

### Initial Sign In

```
User signs in
    ↓
Backend generates tokens
    ↓
Store in localStorage (remember me) or sessionStorage
    ↓
Include in all API requests via Authorization header
```

### Token Expiration

```
API request with expired token
    ↓
Backend returns 401 Unauthorized
    ↓
apiClient intercepts 401
    ↓
Try to refresh token
    ↓
If refresh succeeds → Retry original request
If refresh fails → Clear tokens and redirect to /signin
```

### Refresh Token Flow

```javascript
// Automatic token refresh
const refreshToken = async () => {
  const storedRefreshToken = localStorage.getItem('refreshToken');
  
  const response = await authService.refreshToken(storedRefreshToken);
  
  // Update stored tokens
  storage.setItem('authToken', response.token);
  storage.setItem('refreshToken', response.refreshToken);
  
  return response;
}
```

## SSO Flow

### Initiate SSO

```
User clicks "Sign in with SSO"
    ↓
Call authService.signInWithSSO()
    ↓
Backend returns SSO provider URL
    ↓
Redirect to SSO provider (e.g., Microsoft, Google)
    ↓
User authenticates with SSO provider
    ↓
SSO redirects back with authorization code
    ↓
Frontend sends code to backend (/auth/sso/callback)
    ↓
Backend validates code and returns tokens
    ↓
Store tokens and redirect to dashboard
```

### SSO Callback Handler

```javascript
// Handle SSO callback (separate route/component)
const SSOCallbackPage = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  
  useEffect(() => {
    authService.handleSSOCallback(code, state)
      .then(response => {
        // Store tokens
        // Redirect to dashboard
      })
      .catch(error => {
        // Show error and redirect to sign-in
      });
  }, []);
}
```

## State Management

### Local Component State (useState)

Used in **SignInPage** for:
- Form data (email, password, rememberMe)
- Form validation errors
- Password visibility toggle

### Hook State (useAuth)

Used for:
- Loading state during API calls
- Error messages from API
- Temporary auth operations

### Global State (AuthContext)

Used for:
- Current user data
- Authentication status (isAuthenticated)
- Global auth methods (signIn, signOut)
- Persists across all components

## Session Management

### Remember Me = True

```
Tokens stored in localStorage
    ↓
Persist across browser sessions
    ↓
User stays logged in even after closing browser
    ↓
Tokens expire based on backend expiration time
```

### Remember Me = False

```
Tokens stored in sessionStorage
    ↓
Only persist during current browser session
    ↓
User logged out when browser/tab closes
    ↓
More secure for shared/public computers
```

## Security Considerations

### What's Implemented

✅ **Password Masking**: Password input type="password"
✅ **Client Validation**: Prevent empty submissions
✅ **Token Storage**: Separate storage for remember me
✅ **Auto Logout on 401**: Invalid tokens trigger logout
✅ **HTTPS Ready**: Works with HTTPS backends

### What's Needed for Production

🔲 **httpOnly Cookies**: Store tokens in httpOnly cookies (most secure)
🔲 **CSRF Tokens**: Include CSRF tokens in state-changing requests
🔲 **Rate Limiting**: Prevent brute force attacks
🔲 **Account Lockout**: Lock account after X failed attempts
🔲 **MFA**: Multi-factor authentication
🔲 **Password Requirements**: Enforce strong passwords
🔲 **Security Headers**: CSP, HSTS, X-Frame-Options

## API Request Examples

### Sign In Request

```http
POST /api/auth/signin HTTP/1.1
Host: api.asram.com
Content-Type: application/json

{
  "identifier": "john.doe@asram.com",
  "password": "SecurePassword123!",
  "rememberMe": true
}
```

### Sign In Response (Success)

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user-123",
    "email": "john.doe@asram.com",
    "name": "John Doe",
    "role": "admin",
    "permissions": ["read", "write", "admin"]
  },
  "redirectUrl": "/dashboard"
}
```

### Sign In Response (Error)

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": null
  }
}
```

### Authenticated Request

```http
GET /api/auth/me HTTP/1.1
Host: api.asram.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```

## Component Communication

```
┌──────────────────┐
│   SignInPage     │
│                  │
│  Uses:           │
│  • useAuth ────────────┐
│  • Input       │       │
│  • Button      │       │
│  • Logo        │       │
└──────────────────┘      │
                          │
┌──────────────────┐      │
│   AuthContext    │      │
│                  │◄─────┘
│  Provides:       │
│  • user          │
│  • isAuth        │
│  • signIn        │
│  • signOut       │
└──────────────────┘
         │
         │ consumed by
         ▼
┌──────────────────┐
│  Other Pages     │
│  • Dashboard     │
│  • Profile       │
│  • Settings      │
└──────────────────┘
```

## Validation Flow

### Form-Level Validation

```javascript
const validateForm = () => {
  const errors = {};
  
  // Email validation
  if (!formData.emailOrUserId.trim()) {
    errors.emailOrUserId = 'Email or User ID is required';
  }
  
  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  }
  
  return Object.keys(errors).length === 0; // true if valid
}
```

### Utility-Based Validation

```javascript
import { validateForm } from './utils/validation';

const rules = {
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Invalid email format' }
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'minLength', value: 8, message: 'Min 8 characters' }
  ]
};

const errors = validateForm(formData, rules);
```

## Redirect Flow

### After Successful Sign In

```
Sign in success
    ↓
Get redirectUrl from response (or default to /dashboard)
    ↓
window.location.href = redirectUrl
    ↓
Browser navigates to new page
    ↓
New page checks AuthContext for user data
    ↓
If authenticated → Show page content
If not → Redirect to /signin
```

### Protected Route Pattern

```javascript
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
}
```

## Complete Example Flow

### Happy Path (Successful Login)

1. **User enters credentials**: `john@asram.com` / `password123`
2. **User checks "Remember me"**
3. **User clicks "Sign In"**
4. **UI shows loading spinner**
5. **Form validates**: ✅ All fields filled
6. **API request sent**: POST /api/auth/signin
7. **Backend validates**: ✅ Credentials correct
8. **Backend returns**: tokens + user data
9. **Frontend stores**: tokens in localStorage (remember me = true)
10. **AuthContext updates**: user data set
11. **UI redirects**: window.location.href = '/dashboard'
12. **Dashboard loads**: Shows "Welcome, John!"

### Error Path (Invalid Credentials)

1. **User enters credentials**: `john@asram.com` / `wrongpassword`
2. **User clicks "Sign In"**
3. **Form validates**: ✅ All fields filled
4. **API request sent**: POST /api/auth/signin
5. **Backend validates**: ❌ Password incorrect
6. **Backend returns**: 401 Unauthorized
7. **apiClient catches**: error response
8. **useAuth sets error**: "Invalid email or password"
9. **UI shows error**: Red error message below form
10. **User tries again**: Corrects password and resubmits

---

**This flow ensures a robust, secure, and user-friendly authentication experience!**
