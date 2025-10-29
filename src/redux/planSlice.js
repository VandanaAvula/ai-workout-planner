import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateWorkoutPlan } from "../api/aiService";

export const fetchWorkoutPlan = createAsyncThunk(
  "plan/fetchWorkoutPlan",
  async (prompt, { rejectWithValue }) => {
    try {
      const response = await generateWorkoutPlan(prompt);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  plan: [],
  loading: false,
  error: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    clearPlan: (state) => {
      state.plan = null;
      state.error = null;
      state.loading = false;
    },
    // addPlan: (state, action) => {
    //   const newPlan = action.payload;
    //   state.plan.push(newPlan);
    //   state.loading = false;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkoutPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plan.push(action.payload);
      })
      .addCase(fetchWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPlan } = planSlice.actions;
export const { addPlan } = planSlice.actions;
export default planSlice.reducer;
