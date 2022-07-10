import React, {useCallback, useMemo} from 'react';
import cs from './style.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {tabActions} from "../../reducers/tabsSlice";

const FilterItem = ({filter}) => {
    const {tabs, activeTabId} = useSelector(state => state.tabs);
    const dispatch = useDispatch();

    const currentTabData = useMemo(() => tabs.find(item => item.id === activeTabId), [
        activeTabId, tabs,
    ]);
    const currentFilter = useMemo(() => currentTabData.filters.find(item => item.id === filter.id), [
        currentTabData
    ]);

    const handleRemove = useCallback(() => {
        dispatch(tabActions.removeActiveTabFilter(filter.id));
    }, [filter, currentTabData]);

    const handleChange = useCallback((e, key) => {
        const modifiedFilters = currentTabData.filters.map(item => {
            if (item.id === filter.id) {
                return {
                    ...item,
                    [key]: e.target.value
                }
            }
            return item;
        });
        dispatch(tabActions.setActiveTabFilters(modifiedFilters));
    }, [filter, currentTabData]);

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
