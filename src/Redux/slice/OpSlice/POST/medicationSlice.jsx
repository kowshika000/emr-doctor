import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createMedication = createAsyncThunk(
  "emr/addMedication",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_MEDICATION,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addMedicationSlice = createSlice({
  name: "Medication",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addMedicationSlice.reducer;
