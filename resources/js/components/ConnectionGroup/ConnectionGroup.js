import React, { useEffect, useState,useContext } from "react";
import CollectionItem from "../CollectionItem/CollectionItem";
import cs from './style.module.scss';
import DataContext from "../../contexts/DataContext";
import { isMobile } from '../../helpers/utils';

const ConnectionGroup = props => {
    const {data, setData} = useContext(DataContext);
    const [collections, setCollections] = useState([]);
    const [filter,setFilter] = useState([]);

    const getCollections = () => {
        setCollections([]);
        setFilter([]);
        window.axios.get('/api/collections').then(response => {
            let {data} = response;
            if(!data) data = [];
            setCollections(data);
            setFilter(data);
        });
    };

    const filterCollection = (keyword) => {
        if(!keyword){
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
        setData(prev => {
            return {
                ...prev,
                activeSidebar: false
            }
        })
    }

    useEffect(() => {
        getCollections();
    }, []);

    return <div>
        <div className={`${cs.connections}`} >
            <h1 className={`${cs.connections__header}`}>Mongodb</h1>
            <div className={`${cs['btn-group']}`}>
                <button onClick={getCollections} className={`${cs.btn}`}>
                    Reload
                </button>
                {isMobile() && <button onClick={closeSidebar} className={`${cs.btn} ${cs.btn__secondary}`}>
                    Đóng
                </button>}
                
            </div>
        </div>
        <div className={cs.connections__search}>
            <input type="text" onChange={v => filterCollection(v.target.value)} className={cs.form__controller} placeholder="Tìm kiếm"/>
        </div>
        <ul>
            {filter.map(collection => <CollectionItem key={collection} collection={collection} />)}
        </ul>
    </div>;
}

export default ConnectionGroup;
