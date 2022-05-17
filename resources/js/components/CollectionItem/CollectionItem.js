import React, {useCallback, useContext} from "react";
import DataContext from "../../contexts/DataContext";

const CollectionItem = ({collection}) => {
    const {setData} = useContext(DataContext);

    const fetchData = useCallback((e) => {
        e.preventDefault();
        const newTab = {
            id: (new Date()).getTime(),
            name: collection,
            filters: [],
            projections: [],
            sorts: [],
        }
        setData(prev => ({
            ...prev,
            tabs: [
                ...prev.tabs,
                newTab
            ],
            currentTab: newTab
        }));
    }, []);


    return <li>
        <a href="#" onClick={fetchData}>
            { collection }
        </a>
    </li>
}

export default CollectionItem;
