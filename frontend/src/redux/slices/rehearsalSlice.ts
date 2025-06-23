import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Rehearsal {
  id: string;
  bandId: string;
  venueId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'canceled' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  venue?: {
    id: string;
    name: string;
    address: string;
  };
}

interface RehearsalState {
  items: Rehearsal[];
  currentRehearsal: Rehearsal | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RehearsalState = {
  items: [],
  currentRehearsal: null,
  isLoading: false,
  error: null,
};

export const fetchRehearsals = createAsyncThunk(
  'rehearsals/fetchAll',
  async (bandId: string | null = null, { rejectWithValue }) => {
    try {
      const url = bandId ? `/rehearsals?bandId=${bandId}` : '/rehearsals';
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch rehearsals');
    }
  }
);

export const fetchRehearsalById = createAsyncThunk(
  'rehearsals/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/rehearsals/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch rehearsal');
    }
  }
);

export const createRehearsal = createAsyncThunk(
  'rehearsals/create',
  async (rehearsalData: Partial<Rehearsal>, { rejectWithValue }) => {
    try {
      const response = await api.post('/rehearsals', rehearsalData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create rehearsal');
    }
  }
);

export const updateRehearsal = createAsyncThunk(
  'rehearsals/update',
  async ({ id, data }: { id: string; data: Partial<Rehearsal> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/rehearsals/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update rehearsal');
    }
  }
);

export const deleteRehearsal = createAsyncThunk(
  'rehearsals/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/rehearsals/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete rehearsal');
    }
  }
);

const rehearsalSlice = createSlice({
  name: 'rehearsals',
  initialState,
  reducers: {
    clearRehearsalError: (state) => {
      state.error = null;
    },
    clearCurrentRehearsal: (state) => {
      state.currentRehearsal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all rehearsals
      .addCase(fetchRehearsals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRehearsals.fulfilled, (state, action: PayloadAction<Rehearsal[]>) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchRehearsals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Fetch rehearsal by id
      .addCase(fetchRehearsalById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRehearsalById.fulfilled, (state, action: PayloadAction<Rehearsal>) => {
        state.isLoading = false;
        state.currentRehearsal = action.payload;
        state.error = null;
      })
      .addCase(fetchRehearsalById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Create rehearsal
      .addCase(createRehearsal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRehearsal.fulfilled, (state, action: PayloadAction<Rehearsal>) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(createRehearsal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Update rehearsal
      .addCase(updateRehearsal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRehearsal.fulfilled, (state, action: PayloadAction<Rehearsal>) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentRehearsal?.id === action.payload.id) {
          state.currentRehearsal = action.payload;
        }
        state.error = null;
      })
      .addCase(updateRehearsal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Delete rehearsal
      .addCase(deleteRehearsal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRehearsal.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (state.currentRehearsal?.id === action.payload) {
          state.currentRehearsal = null;
        }
        state.error = null;
      })
      .addCase(deleteRehearsal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRehearsalError, clearCurrentRehearsal } = rehearsalSlice.actions;

export default rehearsalSlice.reducer;