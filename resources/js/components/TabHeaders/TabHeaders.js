import React from 'react';
import cs from './style.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {tabActions} from "../../reducers/tabsSlice";

const TabHeaders = ({tabs}) => {
    const dispatch = useDispatch();
    const {activeTabId} = useSelector(state => state.tabs);

    const closeTab = (tab) => {
        dispatch(tabActions.removeTab(tab.id));
    }

    const setActiveTab = (e, tab) => {
        if(e.button === 1) {
            dispatch(tabActions.removeTab(tab.id));
            return;
        }
        dispatch(tabActions.setActiveTab(tab.id));
    }

    return <div className={cs.tabs}>
        {
            tabs.map((tab, index) => {
                return <div key={index} onMouseDown={e => setActiveTab(e, tab)} className={`${cs.tab} ${activeTabId === tab.id ? cs.tab_active:''}`}>
                    {tab.name}
                    <button className={cs.tabs__close} onClick={e => closeTab(tab)}>
                        x
                    </button>
                </div>
            })
        }
    </div>
}

export default TabHeaders;
