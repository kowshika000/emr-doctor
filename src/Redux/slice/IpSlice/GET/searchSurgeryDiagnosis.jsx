import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchSearchSurgeryDiagnosis = createAsyncThunk(
  "emr_doctor/searchSurgeryDiagnosis",

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

const searchSurgeryDiagnosisSlice = createSlice({
  name: "searchSurgeryDiagnosis",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSurgeryDiagnosis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSearchSurgeryDiagnosis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchSearchSurgeryDiagnosis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchSurgeryDiagnosisSlice.reducer;
