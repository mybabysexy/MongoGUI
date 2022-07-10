import React from 'react';
import {createSlice} from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        active: false,
    },
    reducers: {
        activeSidebar: (state, action) => {
            state.active = true;
        },
        closeSidebar: (state, action) => {
            state.active = false;
        },
        setSidebar: (state, action) => {
            state.active = action.payload;
        }
    }
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice.reducer;
