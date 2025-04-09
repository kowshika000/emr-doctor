import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchSearchTreatment = createAsyncThunk(
  "emr_doctor/SearchTreatment",

  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.SEARCH_OP_TREATMENT,
        {
          params: credentials,
        }
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const searchTreatmentSlice = createSlice({
  name: "SearchTreatment",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchTreatment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSearchTreatment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchSearchTreatment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchTreatmentSlice.reducer;
