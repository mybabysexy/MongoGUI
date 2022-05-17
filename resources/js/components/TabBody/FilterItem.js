import React, {useContext, useCallback, useMemo, useState} from 'react';
import cs from './style.module.scss';
import DataContext from "../../contexts/DataContext";

const FilterItem = ({filter}) => {
    const {data, setData} = useContext(DataContext);
    const currentTabData = useMemo(() => data.tabs.find(item => data.currentTab && item.id === data.currentTab.id), [data.currentTab, data.tabs]);
    const currentFilter = useMemo(() => currentTabData.filters.find(item => item.id === filter.id), [currentTabData]);

    const handleRemove = useCallback(() => {
        setData(prev => {
            return {
                ...prev,
                tabs: data.tabs.map(item => {
                    if (item.id === data.currentTab.id) {
                        return {
                            ...item,
                            filters: item.filters.filter(item => item.id !== filter.id)
                        }
                    }
                    return item;
                })
            }
        });
    }, [filter, data]);

    const handleChange = useCallback((e, key) => {
        setData(prev => {
            return {
                ...prev,
                tabs: data.tabs.map(item => {
                    if (item.id === data.currentTab.id) {
                        return {
                            ...item,
                            filters: item.filters.map(item => {
                                if (item.id === filter.id) {
                                    return {
                                        ...item,
                                        [key]: e.target.value
                                    }
                                }
                                return item;
                            })
                        }
                    }
                    return item;
                })
            }
        });
    }, [filter, data]);

    return <div>
        <b>
            {filter.name}
        </b>
        <div className={cs.tab_body__table__header_action}>

            <select name={'operator-' + filter.id} id={'operator-' + filter.id}
                    value={currentFilter.operator} onChange={e => handleChange(e, 'operator')}>
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value="like">like</option>
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value=">=">&gt;=</option>
                <option value="<=">&lt;=</option>
            </select>
            <select name={'type-' + filter.id} id={'type-' + filter.id}
                    value={currentFilter.type} onChange={e => handleChange(e, 'type')}>
                <option value="string">string</option>
                <option value="int">int</option>
                <option value="float">float</option>
                <option value="bool">bool</option>
                <option value="json">json</option>
                <option value="eval">eval*</option>
            </select>
            <input type="text" value={currentFilter.value} onChange={e => handleChange(e, 'value')}/>
            <button onClick={handleRemove}>
                &times;
            </button>
        </div>
    </div>
}

export default FilterItem;
