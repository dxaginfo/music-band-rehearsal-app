import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import { setAuthToken, removeAuthToken } from '../../utils/auth';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      return token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      return token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  removeAuthToken();
});

export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return rejectWithValue('No token found');
  }
  
  try {
    // Verify token with backend
    await api.get('/auth/verify');
    setAuthToken(token);
    return token;
  } catch (error) {
    localStorage.removeItem('token');
    removeAuthToken();
    return rejectWithValue('Invalid token');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        const token = action.payload;
        const decoded = jwtDecode<User>(token);
        
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = token;
        state.user = decoded;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload as string;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
        const token = action.payload;
        const decoded = jwtDecode<User>(token);
        
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = token;
        state.user = decoded;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload as string;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = null;
      })
      
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<string>) => {
        const token = action.payload;
        const decoded = jwtDecode<User>(token);
        
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = token;
        state.user = decoded;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;