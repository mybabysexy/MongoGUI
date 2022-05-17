import React, {useState, useMemo} from 'react';
import ReactDOM from 'react-dom';
import SideBar from "./components/SideBar/SideBar";
import Body from "./components/Body/Body";
import cs from './main.module.scss';
import DataContext, {defaultData} from "./contexts/DataContext";
import TabHeaders from "./components/TabHeaders/TabHeaders";
import Welcome from "./components/Welcome/Welcome";
import TabBody from "./components/TabBody/TabBody";
import ConnectionGroup from "./components/ConnectionGroup/ConnectionGroup";
import FilterItem from "./components/TabBody/FilterItem";

const Main = () => {
    const [data, setData] = useState(defaultData);
    const value = useMemo(() => ({data, setData}), [data]);
    const currentTabData = useMemo(() => data.tabs.find(item => data.currentTab && item.id === data.currentTab.id), [data.currentTab, data.tabs]);

    return (
        <DataContext.Provider value={value}>
            <div className={cs.wrapper}>
                <SideBar>
                    <ConnectionGroup />
                </SideBar>
                <Body>
                    {
                        data.tabs.length > 0 ? <>
                            <TabHeaders tabs={data.tabs}/>
                            {
                                data.tabs.map((tab, index) => <TabBody key={index} tab={tab}/>)
                            }
                        </> : <Welcome/>
                    }
                </Body>
                {
                    currentTabData && (currentTabData.filters.length || currentTabData.projections.length || currentTabData.sorts.length) ? <SideBar side={'right'}>
                        <button>Query</button>
                        {
                            currentTabData.filters.length ? <div>
                                <h3>Filters</h3>
                                {
                                    currentTabData.filters.map((filter, index) => <FilterItem key={index} filter={filter} />)
                                }
                            </div> : null
                        }
                    </SideBar> : null
                }
            </div>
        </DataContext.Provider>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main/>, document.getElementById('main'));
}
