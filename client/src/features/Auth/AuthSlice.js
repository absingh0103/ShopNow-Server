//! IMPORTANT: Now We dont Need to pass User ID (user.id) as in Backend It will take loggedIn UserId Automatically from req.user and Then Add to Api Call. Hence From Frontend we just need to hit on paticular Api Path without userId

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, signOut, checkUser, resetPasswordRequest, resetPassword } from "./AuthApi";

const initialState = {
  loggedInUserToken:
    null ,/* It Contains only id and role of user all other details of user contained by userInfo in user slice */
  status: "idle",
  error: null ,
  userChecked:false,
  mailsent:false,
  passwordReset:false,
};

// For Signup
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

// For Login

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// to Check Whether user is Still Login or Not
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (rejectWithValue) => {
    try {
      const response = await checkUser();
      return response.data;
    } catch (error) {
      
      return rejectWithValue(error);
    }
  }
);

// Logout/SignOut User
export const signOutAsync = createAsyncThunk(
  "user/signOut", 
  async () => {
  const response = await signOut();
  return response.data;
});

// Forgot Password Request or Reset password Request
export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    }catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Forgot Password Request or Reset password Request
export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const AuthSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      // login
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailsent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
    .addCase(resetPasswordAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.passwordReset = true;
    })
    .addCase(resetPasswordAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
  },
});
 
// -->>> Selectors
// Here [state.auth.loggedInUserToken] auth name comes from store Where reducer name is given as auth:authReducer
// hence We need to use auth (Reducer anme everyTime to fetch data From Store)




export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked=(state)=> state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailsent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const selectStatus = (state) => state.auth.status;
export default AuthSlice.reducer;
