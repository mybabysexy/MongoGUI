import React from 'react';
import cs from './style.module.scss';
import {useSelector} from "react-redux";

const SideBar = props => {
    const {active} = useSelector(state => state.sidebar);

    let classSideBar = `${cs.sidebar} ${props.side === 'right' ? cs.sidebar__right : cs.sidebar__left}`;

    if(active && !props.side) {
        classSideBar = `${cs.sidebar} ${props.side === 'right' ? cs.sidebar__right : cs.sidebar__left} ${cs['active-sidebar']}`;
    }

    return (
        <div className={classSideBar}>
            <div className={cs['sidebar-inner']}>
                {props.children}
            </div>
        </div>
    );
}

export default SideBar;
