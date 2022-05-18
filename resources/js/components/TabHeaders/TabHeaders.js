import React, {useContext} from 'react';
import cs from './style.module.scss';
import DataContext from "../../contexts/DataContext";

const TabHeaders = ({tabs}) => {
    const {data, setData} = useContext(DataContext);

    const closeTab = (tab) => {
        const filtered = data.tabs.filter(t => t.id !== tab.id);
        setData(prev => {
            return {
                ...prev,
                tabs: filtered,
                currentTab: filtered.slice(-1)[0]
            }
        });
    }

    const setActiveTab = (e, tab) => {
        if(e.button === 1) {
            const filtered = data.tabs.filter(t => t.id !== tab.id);
            setData(prev => {
                return {
                    ...prev,
                    tabs: filtered,
                    currentTab: filtered.slice(-1)[0]
                }
            });
            return;
        }
        setData(prev => {
            return {
                ...prev,
                currentTab: tab
            }
        });
    }

    return <div className={cs.tabs}>
        {
            tabs.map((tab, index) => {
                return <div key={index} onMouseDown={e => setActiveTab(e, tab)} className={`${cs.tab} ${data.currentTab && data.currentTab.id === tab.id ? cs.tab_active:''}`}>
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
