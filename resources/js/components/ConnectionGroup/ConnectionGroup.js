import React, { useEffect, useState } from "react";
import CollectionItem from "../CollectionItem/CollectionItem";
import cs from './style.module.scss';

const ConnectionGroup = props => {
    const [collections, setCollections] = useState([]);

    const getCollections = () => {
        setCollections([]);
        window.axios.get('/api/collections').then(response => {
            setCollections(response.data);
        });
    };

    useEffect(() => {
        getCollections();
    }, []);

    return <div>
        <div className={`${cs.connections}`} >
            <h1 className={`${cs.connections__header}`}>Mongodb</h1>
            <button onClick={getCollections} className={`${cs.btn}`}>
                Reload
            </button>
        </div>
        <ul>
            {collections.map(collection => <CollectionItem key={collection} collection={collection} />)}
        </ul>
    </div>;
}

export default ConnectionGroup;
