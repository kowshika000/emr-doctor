import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createROS = createAsyncThunk(
  "emr/addROS",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_ROS,
        credentials
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addROSSlice = createSlice({
  name: "ros",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createROS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createROS.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createROS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addROSSlice.reducer;
