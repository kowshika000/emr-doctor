import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchSearchDiagnosis = createAsyncThunk(
  "emr_doctor/searchDiagnosis",

  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.SEARCH_DIAGNOSIS, {
        params: credentials,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const searchDiagnosisSlice = createSlice({
  name: "searchDiagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSearchDiagnosis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchSearchDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchDiagnosisSlice.reducer;
