import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const fetchIpSearch = createAsyncThunk(
  "emr_doctor/ipSearch",

  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.GET_IP_SEARCH_PATIENT, {
        params: credentials,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const ipSearchSlice = createSlice({
  name: "ipSearch",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIpSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchIpSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIpSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ipSearchSlice.reducer;
