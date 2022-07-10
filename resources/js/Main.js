import React, {useMemo} from 'react';
import ReactDOM from 'react-dom';
import SideBar from "./components/SideBar/SideBar";
import Body from "./components/Body/Body";
import cs from './main.module.scss';
import TabHeaders from "./components/TabHeaders/TabHeaders";
import Welcome from "./components/Welcome/Welcome";
import TabBody from "./components/TabBody/TabBody";
import ConnectionGroup from "./components/ConnectionGroup/ConnectionGroup";
import FilterItem from "./components/TabBody/FilterItem";
import Header from './components/Header/Header';
import { isMobile } from './helpers/utils';
import {QueryClientProvider, QueryClient} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {Provider, useSelector} from "react-redux";
import store from "./store";

const queryClient = new QueryClient();

const Main = () => {
    const {tabs, activeTabId} = useSelector(state => state.tabs);
    const currentTabData = useMemo(() => tabs.find(item => item.id === activeTabId), [
        activeTabId, tabs,
    ]);

    return (
        <>
            {isMobile() && <Header />}
            <div className={`${cs.wrapper} ${isMobile && cs['on-mobile']}`}>
                <SideBar>
                    <ConnectionGroup />
                </SideBar>
                <Body>
                    {
                        tabs.length > 0 ? <>
                            <TabHeaders tabs={tabs}/>
                            {
                                tabs.map((tab, index) => <TabBody key={index} tab={tab}/>)
                            }
                        </> : <Welcome/>
                    }
                </Body>
                {
                    currentTabData?.filters.length || currentTabData?.projections.length || currentTabData?.sorts.length ? <SideBar side={'right'}>
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
            <ReactQueryDevtools position={'bottom-right'} />
        </>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <Main/>
        </QueryClientProvider>
    </Provider>, document.getElementById('main'));
}
