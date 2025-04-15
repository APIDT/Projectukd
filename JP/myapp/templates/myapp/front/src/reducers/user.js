import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticate } from "../utils";

// Асинхронна функція для логіну
export const login = createAsyncThunk(
    "user/login",
    async ({ payload, clearForm }, { rejectWithValue }) => {
        try {
            const user = await authenticate("login", payload);

            if (user.token) {
                clearForm();
                return user;
            }
            return rejectWithValue("Invalid credentials"); // Якщо токен не отримано
        } catch (error) {
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

// Асинхронна функція для реєстрації
export const signup = createAsyncThunk(
    "user/signup",
    async ({ payload, clearForm }, { rejectWithValue }) => {
        try {
            const user = await authenticate("signup", payload);

            if (user.token) {
                clearForm();
                return user;
            }
            return rejectWithValue("Signup failed");
        } catch (error) {
            return rejectWithValue(error.message || "Signup failed");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {
            token: "mock-token-123",
            name: "Тестовий Користувач",
            email: "test@ukd.com",
            role: "user",
            channels: [],
        },
        loading: false,
        error: null,
    },
    reducers: {
        addChannel(state, action) {
            state.data = {
                ...state.data,
                channels: [action.payload, ...(state.data.channels || [])],
            };
        },
        removeChannel(state, action) {
            state.data = {
                ...state.data,
                channels: (state.data.channels || []).filter(
                    (channel) => channel.id !== action.payload
                ),
            };
        },
        updateUser(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        logout(state) {
            state.data = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || {};
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || {};
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Signup failed";
            });
    },
});

export const { addChannel, removeChannel, updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
