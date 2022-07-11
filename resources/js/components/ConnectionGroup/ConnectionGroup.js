import React, {useState} from "react";
import CollectionItem from "../CollectionItem/CollectionItem";
import cs from './style.module.scss';
import {isMobile} from '../../helpers/utils';
import {useQuery} from "react-query";
import {useDispatch} from "react-redux";
import {sidebarActions} from "../../reducers/sidebarSlice";

const ConnectionGroup = props => {
    const [filter, setFilter] = useState([]);
    const dispatch = useDispatch();

    const fetchData = () => window.axios.get('/api/collections');

    const onSuccess = (data) => {
        setFilter(data);
    }

    const {data: collections, refetch} = useQuery("collections", fetchData, {
        refetchOnWindowFocus: false,
        onSuccess,
        select({data}) {
            return data;
        },
    });

    const filterCollection = (keyword) => {
        if (!keyword) {
            setFilter(collections);
            return;
        }
        let collection_filter = collections.filter(v => {
            const value = v.toLowerCase();
            return value.includes(keyword.toLowerCase());
        });
        setFilter(collection_filter);
    }

    const closeSidebar = () => {
        dispatch(sidebarActions.setSidebar(false));
    }

    return <div>
        <div className={`${cs.connections}`}>
            <h1 className={`${cs.connections__header}`}>Mongodb</h1>
            <div className={`${cs['btn-group']}`}>
                <button onClick={refetch} className={`${cs.btn} ${isMobile() && cs.btn__secondary}`}>
                    Reload
                </button>
                {isMobile() && <button onClick={closeSidebar} className={`${cs.btn}`}>
                    x
                </button>}

            </div>
        </div>
        <div className={cs.connections__search}>
            <input type="text" onChange={v => filterCollection(v.target.value)} className={cs.form__controller}
                   placeholder="Tìm kiếm"/>
        </div>
        <div className={cs.connections__list}>
            <ul>
                {filter.map(collection => <CollectionItem key={collection} collection={collection}/>)}
            </ul>
        </div>
    </div>;
}

export default ConnectionGroup;
