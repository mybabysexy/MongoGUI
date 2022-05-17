import React from 'react';
import cs from './style.module.scss';


const Body = (props) => {
    return (
        <div className={cs.body}>
            <div className={cs.body__wrapper}>
                {props.children}
            </div>
        </div>
    );
};

export default Body;
