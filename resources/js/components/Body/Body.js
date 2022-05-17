import React from 'react';
import cs from './style.module.scss';


const Body = (props) => {
    return (
        <div className={cs.body}>
            {props.children}
        </div>
    );
};

export default Body;
