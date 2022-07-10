import React from 'react';
import {createSlice} from '@reduxjs/toolkit';

const tabsSlice = createSlice({
    name: 'tabs',
    initialState: {
        tabs: [],
        activeTabId: null,
    },
    reducers: {
        addTab: (state, action) => {
            state.tabs.push(action.payload);
            state.activeTabId = action.payload.id;
        },
        removeTab: (state, action) => {
            state.tabs = state.tabs.filter(tab => tab.id !== action.payload);
        },
        setActiveTab: (state, action) => {
            state.activeTabId = action.payload;
        },
        setActiveTabFilters: (state, action) => {
            state.tabs = state.tabs.map(tab => {
                    if (tab.id === state.activeTabId) {
                        tab.filters = action.payload;
                    }
                    return tab;
                }
            );
        },
        removeActiveTabFilter: (state, action) => {
            state.tabs = state.tabs.map(tab => {
                    if (tab.id === state.activeTabId) {
                        tab.filters = tab.filters.filter(filter => filter.id !== action.payload);
                    }
                    return tab;
                }
            );
        }
    }
});

export const tabActions = tabsSlice.actions;
export default tabsSlice.reducer;
