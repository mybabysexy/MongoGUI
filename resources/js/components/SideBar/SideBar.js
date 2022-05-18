import React, {useContext} from 'react';
import cs from './style.module.scss';
import DataContext from "../../contexts/DataContext";

const SideBar = props => {
    const {data} = useContext(DataContext);

    let classSideBar = `${cs.sidebar} ${props.side === 'right' ? cs.sidebar__right : cs.sidebar__left}`;

    if(data.activeSidebar && !props.side) {        
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
