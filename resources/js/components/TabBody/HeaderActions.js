import React, {useContext, useCallback, useMemo} from 'react';
import cs from './style.module.scss';
import DataContext from "../../contexts/DataContext";

const HeaderActions = props => {
    const {data, setData} = useContext(DataContext);
    const currentTabData = useMemo(() => data.tabs.find(item => data.currentTab && item.id === data.currentTab.id), [data.currentTab, data.tabs]);

    const handleFilter = useCallback(() => {
        setData(prev => {
            return {
                ...prev,
                tabs: data.tabs.map(item => {
                    if (item.id === data.currentTab.id) {
                        return {
                            ...item,
                            filters: [
                                ...item.filters,
                                {
                                    id: (new Date()).getTime(),
                                    name: props.field,
                                    type: 'string',
                                    value: '',
                                    operator: '=',
                                    enabled: true
                                }
                            ]
                        }
                    }
                    return item;
                })
            }
        });
    }, [data]);

    return <div className={cs.tab_body__table__header_actions}>
        <button onClick={handleFilter}>Filter</button>
        <button>Project</button>
        <button>Sort</button>
    </div>
}

export default HeaderActions;
