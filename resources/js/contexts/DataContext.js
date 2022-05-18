import React, {createContext} from 'react';

export const defaultData = {
    currentTab: '',
    tabs: [],
    activeSidebar: true,
};
const DataContext = createContext(defaultData);

export default DataContext;
