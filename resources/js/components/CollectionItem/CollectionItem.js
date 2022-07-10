import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {tabActions} from "../../reducers/tabsSlice";

const CollectionItem = ({collection}) => {
    const dispatch = useDispatch();

    const fetchData = useCallback((e) => {
        e.preventDefault();
        const newTab = {
            id: (new Date()).getTime(),
            name: collection,
            filters: [],
            projections: [],
            sorts: [],
        }
        dispatch(tabActions.addTab(newTab));
    }, []);

    return <li>
        <a href="#" onClick={fetchData}>
            { collection }
        </a>
    </li>
}

export default CollectionItem;
