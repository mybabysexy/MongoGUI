import React from 'react';
import cs from './style.module.scss';

const Welcome = () => {
    return (
        <div className={cs.welcome}>
            Choose collection to continue
        </div>
    );
};

export default Welcome;
