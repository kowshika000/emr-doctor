import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createLifeSupport = createAsyncThunk(
  "emr/addLifeSupport",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_LIFE_SUPPORT,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addLifeSupportSlice = createSlice({
  name: "LifeSupport",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLifeSupport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLifeSupport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createLifeSupport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addLifeSupportSlice.reducer;
