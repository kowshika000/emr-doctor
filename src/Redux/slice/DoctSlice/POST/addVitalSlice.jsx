import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchAddVital = createAsyncThunk(
  "emr/addVital",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_VITAL,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addVitalSlice = createSlice({
  name: "vital",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddVital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddVital.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAddVital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addVitalSlice.reducer;
