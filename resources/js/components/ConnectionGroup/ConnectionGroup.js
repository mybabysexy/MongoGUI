import React, { useEffect, useState } from "react";
import CollectionItem from "../CollectionItem/CollectionItem";

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
        <div>
            <b>mongodb</b>
            <button onClick={getCollections}>
                reload
            </button>
        </div>
        <ul>
            {collections.map(collection => <CollectionItem key={collection} collection={collection} />)}
        </ul>
    </div>;
}

export default ConnectionGroup;
