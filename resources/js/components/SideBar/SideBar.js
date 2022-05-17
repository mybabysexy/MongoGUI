import React from 'react';
import cs from './style.module.scss';

const SideBar = props => {
    return (
        <div className={`${cs.sidebar} ${props.side === 'right' ? cs.sidebar__right : cs.sidebar__left}`}>
            <div className={cs['sidebar-inner']}>
                {props.children}
            </div>
        </div>
    );
}

export default SideBar;
