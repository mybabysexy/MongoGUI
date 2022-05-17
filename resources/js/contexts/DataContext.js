import React, {createContext} from 'react';

export const defaultData = {
    currentTab: '',
    tabs: [],
};
const DataContext = createContext(defaultData);

export default DataContext;
