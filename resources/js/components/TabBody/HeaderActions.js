import React, {useCallback, useMemo} from 'react';
import cs from './style.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {tabActions} from "../../reducers/tabsSlice";

const HeaderActions = props => {
    const {tabs, activeTabId} = useSelector(state => state.tabs);
    const dispatch = useDispatch();

    const currentTabData = useMemo(() => tabs.find(item => item.id === activeTabId), [
        activeTabId, tabs,
    ]);

    const handleFilter = useCallback(() => {
        const newFilters = [
            ...currentTabData.filters,
            {
                id: (new Date()).getTime(),
                name: props.field,
                type: 'string',
                value: '',
                operator: '=',
                enabled: true
            }
        ];
        dispatch(tabActions.setActiveTabFilters(newFilters));
    }, [currentTabData]);

    return <div className={cs.tab_body__table__header_actions}>
        <button onClick={handleFilter}>Filter</button>
        <button>Project</button>
        <button>Sort</button>
    </div>
}

export default HeaderActions;
