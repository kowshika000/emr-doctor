import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../../api/AxiosInstance";
import { API_ENDPOINTS } from "../../../api/apiEndPointend";

export const createDocument = createAsyncThunk(
  "emr/addDocument",
  async (credentials, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(credentials).forEach((key) => {
        formData.append(key, credentials[key]);
      });
      const response = await AxiosInstance.post(
        API_ENDPOINTS.ADD_DOCUMENT,
        formData
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const addDocumentSlice = createSlice({
  name: "Document",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addDocumentSlice.reducer;
