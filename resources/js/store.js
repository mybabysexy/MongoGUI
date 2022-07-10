import {configureStore} from '@reduxjs/toolkit';
import tabsReducer from './reducers/tabsSlice';
import sidebarReducer from './reducers/sidebarSlice';

const store = configureStore({
    reducer: {
        tabs: tabsReducer,
        sidebar: sidebarReducer,
    }
})

export default store;
