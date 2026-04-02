import { User } from "@/src/types/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"


type InitialState = {
    user: User | null;
    isAuthed: boolean;
}

const initialState: InitialState = {
    user: null,
    isAuthed: false,
}

export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setAuthed: (state, action: PayloadAction<boolean>) => {
            state.isAuthed = action.payload;
        },
    }
})


export const userSliceActions = slice.actions;

export default slice.reducer;